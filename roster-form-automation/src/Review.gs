var REVIEW_HEADERS_ = ['Entry ID', 'Include', 'Student name', 'Attendance', 'Original OCR hint', 'Original OCR', 'Source screenshot', 'Upload ID'];
var REVIEW_LIMIT_ = 300;

function clearApproval_() {
  var props = reviewProperties_();
  props.deleteProperty('approvedRoster');
  Object.keys(props.getProperties()).filter(function (key) { return key.indexOf('approvalPart_') === 0; })
    .forEach(function (key) { props.deleteProperty(key); });
}

function saveApproval_(review) {
  var entries = JSON.stringify(review.entries);
  if (Utilities.newBlob(entries).getBytes().length > 250000) throw new Error('Approval exceeds the 250 KB storage limit. Shorten entry text or reduce roster size.');
  clearApproval_();
  var props = reviewProperties_();
  var characters = Array.from(entries);
  var parts = Math.ceil(characters.length / 1000);
  for (var i = 0; i < parts; i++) props.setProperty('approvalPart_' + i, characters.slice(i * 1000, (i + 1) * 1000).join(''));
  // Publish metadata last: incomplete writes cannot represent an approved snapshot.
  props.setProperty('approvedRoster', JSON.stringify({ signature: review.signature,
    approvedAt: new Date().toISOString(), parts: parts }));
}

function screenshotRows_(text, source) {
  if (typeof text !== 'string' || !text.trim() || text.length > 40000) throw new Error('OCR text is empty or too large.');
  if (!source || typeof source.id !== 'string' || !/^[a-zA-Z0-9-]{8,100}$/.test(source.id) ||
      typeof source.name !== 'string' || !source.name.trim() || source.name.length > 200) throw new Error('Screenshot source is missing. Extract the image again.');
  return draftRows_(text, function () { return Utilities.getUuid(); }).map(function (row) {
    return row.concat([source.name, source.id]);
  });
}

function reviewLock_(action) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(10000);
  try { return action(); } finally { lock.releaseLock(); }
}

function reviewProperties_() { return PropertiesService.getDocumentProperties(); }

function draftRows_(text, uuid) {
  return text.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean).map(function (line) {
    var staff = /\bIT Support\b|\bInstructor\b/i.test(line);
    var fragment = /^(?:IP|I|P)$/i.test(line) || /-\s*(?:I|P)\s*$/i.test(line);
    return [uuid(), !staff, line, fragment ? 'Unresolved' : (/-\s*IP$/.test(line) ? 'In-person' : 'Online'),
      staff ? 'Suggested staff exclusion; confirm.' : (fragment ? 'Possible split attendance suffix; correct or exclude fragment.' : ''), line];
  });
}

function safeCell_(value) {
  return typeof value === 'string' && /^[=+@-]/.test(value) ? "'" + value : value;
}

function startRosterReview(text, source) {
  return reviewLock_(function () {
    var props = reviewProperties_();
    if (props.getProperty('reviewSheet')) throw new Error('A review is already active. Resume it or cancel before starting another.');
    var rows = screenshotRows_(text, source);
    if (rows.length > REVIEW_LIMIT_) throw new Error('This review supports at most 300 entries.');
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.insertSheet('Roster Review ' + Utilities.getUuid().slice(0, 8));
    // Track immediately so a setup failure can be recovered without overwriting a user's sheet.
    props.setProperty('reviewSheet', String(sheet.getSheetId()));
    clearApproval_();
    sheet.getRange(1, 1, 1, 8).setValues([REVIEW_HEADERS_]).setFontWeight('bold');
    sheet.getRange(2, 2, REVIEW_LIMIT_, 1).insertCheckboxes();
    sheet.getRange(2, 4, REVIEW_LIMIT_, 1).setDataValidation(SpreadsheetApp.newDataValidation()
      .requireValueInList(['In-person', 'Online', 'Unresolved'], true).setAllowInvalid(false).build());
    sheet.getRange(2, 1, rows.length, 8).setValues(rows.map(function (row) { return row.map(safeCell_); }));
    sheet.setFrozenRows(1);
    sheet.hideColumns(1);
    sheet.hideColumns(8);
    sheet.setColumnWidth(2, 70);
    sheet.setColumnWidth(3, 260);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 320);
    sheet.setColumnWidth(6, 300);
    book.setActiveSheet(sheet);
    SpreadsheetApp.flush();
    return reviewPreview_();
  });
}

function appendRosterScreenshot(text, source, sheetId) {
  return reviewLock_(function () {
    var rows = screenshotRows_(text, source);
    var data = reviewData_();
    if (String(data.sheet.getSheetId()) !== String(sheetId)) throw new Error('The active review changed. Refresh before adding the screenshot.');
    var receiptKey = 'processedUpload_' + sheetId + '_' + source.id;
    var receipt = reviewProperties_().getProperty(receiptKey);
    if (receipt !== null || data.rows.some(function (row) { return row[7] === source.id; })) return reviewPreview_();
    var originalCount = rows.length;
    rows = excludeOverlaps_(data.rows, rows);
    var skipped = originalCount - rows.length;
    var last = data.rows.length;
    while (last && !data.rows[last - 1][0] && !data.rows[last - 1][2] && !data.rows[last - 1][3] && !data.rows[last - 1][5] && data.rows[last - 1][1] !== true) last--;
    if (last + rows.length > REVIEW_LIMIT_) throw new Error('Combined roster exceeds 300 staging rows. Existing entries are unchanged.');
    if (!rows.length) {
      reviewProperties_().setProperty(receiptKey, String(skipped));
      var unchanged = reviewPreview_(); unchanged.skippedOverlaps = skipped; return unchanged;
    }
    clearApproval_();
    var sheet = data.sheet;
    sheet.getRange(1, 7, 1, 2).setValues([REVIEW_HEADERS_.slice(6)]);
    sheet.getRange(last + 2, 2, rows.length, 1).insertCheckboxes();
    sheet.getRange(last + 2, 4, rows.length, 1).setDataValidation(SpreadsheetApp.newDataValidation()
      .requireValueInList(['In-person', 'Online', 'Unresolved'], true).setAllowInvalid(false).build());
    sheet.getRange(last + 2, 1, rows.length, 8).setValues(rows.map(function (row) { return row.map(safeCell_); }));
    sheet.hideColumns(8);
    SpreadsheetApp.flush();
    reviewProperties_().setProperty(receiptKey, String(skipped));
    var result = reviewPreview_(); result.skippedOverlaps = skipped; return result;
  });
}

function excludeOverlaps_(existing, incoming) {
  function key(row) { return String(row[2]).trim().replace(/\s+/g, ' ').toLowerCase() + '|' + row[3]; }
  var prior = Object.create(null);
  existing.forEach(function (row, index) {
    if (row[1] === true && row[7] && row[3] !== 'Unresolved') prior[key(row)] = { row: index + 2, upload: row[7] };
  });
  return incoming.filter(function (row) {
    var match = prior[key(row)];
    if (row[1] === true && match && match.upload !== row[7] && row[3] !== 'Unresolved') {
      return false;
    }
    return true;
  });
}

function reviewSheet_() {
  var id = reviewProperties_().getProperty('reviewSheet');
  var sheet = id && SpreadsheetApp.getActiveSpreadsheet().getSheetById(Number(id));
  if (!sheet) throw new Error('No active review sheet. Start a review or cancel the missing review.');
  return sheet;
}

function evaluateRows_(rows) {
  var entries = [], errors = [], warnings = [], excluded = 0, seen = {}, names = Object.create(null);
  rows.forEach(function (row, index) {
    if (!row[0] && !row[2] && !row[3] && !row[5] && row[1] !== true) return;
    var name = String(row[2] || '').trim();
    if (row[1] !== true && row[1] !== false) errors.push('Row ' + (index + 2) + ': choose Include or exclude.');
    if (row[0]) {
      if (seen[row[0]]) errors.push('Row ' + (index + 2) + ': duplicate entry ID. Add a new row without copying its ID.');
      seen[row[0]] = true;
    }
    if (row[1] !== true) {
      excluded++;
      if (String(row[4]).indexOf('Auto-excluded overlap') === 0) warnings.push('Row ' + (index + 2) + ' (' + name + '): ' + row[4]);
      return;
    }
    var issue = '';
    if (!name) issue = 'enter a name or exclude the row';
    else if (name.length > 200 || /^[=+@]/.test(name)) issue = 'enter a plain name of at most 200 characters';
    else if (/^(?:IP|I|P)$/i.test(name) || /-\s*(?:I|P)\s*$/i.test(name)) issue = 'resolve the split attendance suffix';
    else if (!['In-person', 'Online'].includes(row[3])) issue = 'choose attendance';
    else if (row[3] === 'In-person' && !/- IP$/.test(name)) issue = 'retain the - IP suffix for in-person attendance';
    else if (row[3] === 'Online' && /-\s*IP$/i.test(name)) issue = 'attendance conflicts with the - IP suffix';
    if (issue) errors.push('Row ' + (index + 2) + ': ' + issue + '.');
    var key = name.replace(/\s*-\s*IP$/i, '').replace(/\s+/g, ' ').toLowerCase();
    if (names[key]) warnings.push('Possible overlap: rows ' + names[key] + ' and ' + (index + 2) + ' (' + name + '). Exclude an overlap or confirm these are distinct students.');
    else names[key] = index + 2;
    entries.push({ id: row[0], name: name, attendance: row[3], sourceRow: index + 2, source: row[6] || 'Earlier review / manual entry' });
  });
  if (!entries.length) errors.push('Include at least one student.');
  entries.sort(function (a, b) {
    return Number(b.attendance === 'In-person') - Number(a.attendance === 'In-person') || a.sourceRow - b.sourceRow;
  });
  return { entries: entries, errors: errors, warnings: warnings, excluded: excluded,
    inPerson: entries.filter(function (entry) { return entry.attendance === 'In-person'; }).length };
}

function reviewData_() {
  var sheet = reviewSheet_();
  if (sheet.getLastRow() > REVIEW_LIMIT_ + 1) throw new Error('This review supports at most 300 rows below its header.');
  var range = sheet.getRange(2, 1, Math.max(1, sheet.getLastRow() - 1), 8);
  var rows = range.getValues();
  if (range.getFormulas().some(function (row) { return row.some(Boolean); })) throw new Error('Remove formulas from the review sheet; use plain text only.');
  rows.forEach(function (row, index) {
    if (!row[0] && (row[2] || row[1] === true)) {
      row[0] = Utilities.getUuid();
      sheet.getRange(index + 2, 1).setValue(row[0]);
    }
  });
  SpreadsheetApp.flush();
  var signature = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
    JSON.stringify({ sheet: sheet.getSheetId(), rows: rows })));
  return { sheet: sheet, rows: rows, signature: signature };
}

function reviewPreview_() {
  var data = reviewData_();
  var result = evaluateRows_(data.rows);
  var stored = reviewProperties_().getProperty('approvedRoster');
  var approved = stored && JSON.parse(stored);
  result.approved = Boolean(approved && approved.signature === data.signature && !result.errors.length);
  if (result.approved && approved.parts !== undefined) {
    var content = '';
    for (var part = 0; part < approved.parts; part++) content += reviewProperties_().getProperty('approvalPart_' + part) || '';
    result.approved = content === JSON.stringify(result.entries);
  }
  if (stored && !result.approved) clearApproval_();
  result.signature = data.signature;
  result.sheetName = data.sheet.getName();
  result.sheetId = data.sheet.getSheetId();
  return result;
}

function getRosterReview() { return reviewLock_(reviewPreview_); }

function approveRoster(signature) {
  return reviewLock_(function () {
    var review = reviewPreview_();
    if (review.signature !== signature) throw new Error('The roster changed. Refresh the review before approving.');
    if (review.errors.length) throw new Error('Resolve review errors before approval.');
    saveApproval_(review);
    return reviewPreview_();
  });
}

function cancelRosterReview() {
  return reviewLock_(function () {
    clearApproval_();
    var props = reviewProperties_();
    Object.keys(props.getProperties()).filter(function (key) { return key.indexOf('processedUpload_') === 0; })
      .forEach(function (key) { props.deleteProperty(key); });
    reviewProperties_().deleteProperty('reviewSheet');
    return 'Review canceled. Its sheet remains for your records; no Forms or output spreadsheet were created.';
  });
}

function onEdit(event) {
  if (event && String(event.range.getSheet().getSheetId()) === reviewProperties_().getProperty('reviewSheet')) {
    clearApproval_();
  }
}
