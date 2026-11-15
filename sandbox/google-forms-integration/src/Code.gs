var M2_STATE_KEY_ = 'm2IntegrationTrial';
var M2_STUDENTS_ = [
  { id: 'fixture-001', name: 'Riley Carter - IP', attendance: 'In-person' },
  { id: 'fixture-002', name: 'Taylor Brooks', attendance: 'Online' }
];

function onOpen() {
  SpreadsheetApp.getUi().createMenu('M2 Integration Trial')
    .addItem('Create two test copies', 'createTrial')
    .addItem('Refresh verification', 'verifyTrial')
    .addItem('Trash trial outputs', 'cleanupTrial')
    .addToUi();
}

function m2WithLock_(action) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(10000);
  try { return action(); } finally { lock.releaseLock(); }
}

function m2Load_() {
  var raw = PropertiesService.getDocumentProperties().getProperty(M2_STATE_KEY_);
  return raw ? JSON.parse(raw) : null;
}

function m2Save_(state) {
  PropertiesService.getDocumentProperties().setProperty(M2_STATE_KEY_, JSON.stringify(state));
}

function m2Prompt_(title) {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(title, 'Paste the Google resource link.', ui.ButtonSet.OK_CANCEL);
  return result.getSelectedButton() === ui.Button.OK ? result.getResponseText().trim() : null;
}

function m2ResourceId_(url, type) {
  var pattern = type === 'form' ?
    /^https:\/\/docs\.google\.com\/forms\/(?:u\/\d+\/)?d\/([\w-]+)\/edit\/?(?:[?#].*)?$/ :
    /^https:\/\/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([\w-]+)\/?(?:[?#].*)?$/;
  var match = typeof url === 'string' && url.trim().match(pattern);
  if (!match) throw new Error('Use a Google Form editor link or a specific Drive folder link, as requested.');
  return match[1];
}

function m2CopyTitle_(name, templateTitle) {
  var student = name.trim().replace(/(?:^|\s+)-\s+IP\s*$/i, '').trim();
  var title = templateTitle.trim();
  if (!student || !title) throw new Error('Student and template titles must not be empty.');
  return student + ' - ' + title;
}

function m2Cell_(value) {
  return typeof value === 'string' && /^[=+@-]/.test(value) ? "'" + value : value;
}

// This is a limited structural comparison, not a full quiz/settings audit.
function m2Shape_(form) {
  return { description: form.getDescription(), quiz: form.isQuiz(), items: form.getItems().map(function (item) {
    return { type: String(item.getType()), title: item.getTitle(), help: item.getHelpText() };
  }) };
}

function m2Digest_(value) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify(value)));
}

function m2DestinationId_(form) {
  try { return form.getDestinationId() || null; }
  catch (error) {
    // Apps Script throws for an unlinked Form instead of returning null.
    if (error && error.message === 'The form currently has no response destination.') return null;
    throw error;
  }
}

function m2TemplateSnapshot_(form, file) {
  return { title: form.getTitle(), filename: file.getName(), shape: m2Digest_(m2Shape_(form)),
    updated: file.getLastUpdated().toISOString(), accepting: form.isAcceptingResponses(),
    published: form.supportsAdvancedResponderPermissions() ? form.isPublished() : 'legacy',
    destination: m2DestinationId_(form), responses: form.getResponses().length };
}

function m2Report_(state, check, result, detail) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(state.reportSheetId);
  if (!sheet) throw new Error('The trial report tab is missing. Restore it before continuing.');
  sheet.appendRow([new Date().toISOString(), check, result, String(detail || '')].map(m2Cell_));
}

function createTrial() {
  var ui = SpreadsheetApp.getUi();
  try {
    if (m2Load_()) throw new Error('This control Sheet already has a trial. Verify or clean up its outputs; use a new blank control Sheet for another trial.');
    var templateUrl = m2Prompt_('Disposable test template Form editor link');
    if (templateUrl === null) return;
    var folderUrl = m2Prompt_('Dedicated private test folder link');
    if (folderUrl === null) return;
    if (ui.alert('Create test resources?', 'This creates exactly two fictional student Forms and one roster spreadsheet. Use a private test folder and a closed, empty test template. No responder access is granted automatically.', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
    var state = m2WithLock_(function () { return m2Create_(templateUrl, folderUrl); });
    ui.alert('Trial copies created. Open the Trial report tab and the roster URL recorded there. Publish/configure the copies manually, then test access and use Refresh verification.');
  } catch (error) { ui.alert('Trial stopped: ' + error.message); }
}

function m2Create_(templateUrl, folderUrl) {
  if (m2Load_()) throw new Error('A trial is already recorded. Automatic rerun is disabled to avoid duplicate copies.');
  var templateId = m2ResourceId_(templateUrl, 'form');
  var folderId = m2ResourceId_(folderUrl, 'folder');
  var templateFile = DriveApp.getFileById(templateId);
  if (templateFile.getMimeType() !== 'application/vnd.google-apps.form') throw new Error('The template must be a Google Form.');
  var template = FormApp.openById(templateId);
  var folder = DriveApp.getFolderById(folderId);
  if (folder.isTrashed() || templateFile.isTrashed()) throw new Error('Template and folder must not be in Trash.');
  var before = m2TemplateSnapshot_(template, templateFile);
  if (before.accepting || before.responses !== 0 || before.published === true) {
    throw new Error('Use a disposable template with no responses, closed to responses and unpublished where supported. Do not change a live class Form for this trial.');
  }
  m2CopyTitle_(M2_STUDENTS_[0].name, before.title);
  var state = { runId: Utilities.getUuid(), phase: 'creating', templateId: templateId, folderId: folderId,
    controlId: SpreadsheetApp.getActiveSpreadsheet().getId(), templateBefore: before, created: [], forms: [] };
  m2Save_(state);
  try {
    var report = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Trial report ' + state.runId.slice(0, 8));
    state.reportSheetId = report.getSheetId();
    m2Save_(state);
    report.appendRow(['UTC timestamp', 'Check', 'Result', 'Details']);
    report.setFrozenRows(1);
    report.setColumnWidth(2, 240); report.setColumnWidth(4, 550);
    m2Report_(state, 'Trial started', 'PENDING', 'Two fixed fictional students; access and full question preservation require manual checks.');

    M2_STUDENTS_.forEach(function (student) {
      var title = m2CopyTitle_(student.name, before.title);
      var copy = templateFile.makeCopy(title, folder);
      // Save each returned ID before configuring it. Ambiguous API failures still
      // require manual folder inspection; this trial does not implement recovery.
      state.created.push(copy.getId());
      m2Save_(state);
      var form = FormApp.openById(copy.getId());
      if (form.supportsAdvancedResponderPermissions()) form.setPublished(false);
      else form.setAcceptingResponses(false);
      form.setTitle(title);
      copy.setName(title);
      if (m2DestinationId_(form)) form.removeDestination();
      if (form.getResponses().length !== 0) throw new Error('A copied Form unexpectedly contains responses; inspect it before proceeding.');
      state.forms.push({ entryId: student.id, name: student.name, attendance: student.attendance,
        id: copy.getId(), title: title, responderUrl: form.getPublishedUrl(), editorUrl: form.getEditUrl() });
      m2Save_(state);
      m2Report_(state, 'Copy created', 'ACCESS UNTESTED', title + ' | editor: ' + form.getEditUrl());
    });

    var roster = SpreadsheetApp.create('M2 Integration Trial ' + state.runId.slice(0, 8));
    state.rosterId = roster.getId(); state.created.push(state.rosterId);
    m2Save_(state);
    DriveApp.getFileById(state.rosterId).moveTo(folder);
    var rows = [['Entry ID', 'Reviewed name', 'Attendance', 'Form title', 'Responder URL', 'Form ID', 'Access status']];
    state.forms.forEach(function (entry) {
      rows.push([entry.entryId, entry.name, entry.attendance, entry.title, entry.responderUrl, entry.id, 'Manual verification pending']);
    });
    var rosterTab = roster.getSheets()[0];
    rosterTab.setName('Test roster');
    rosterTab.getRange(1, 1, rows.length, rows[0].length).setValues(rows.map(function (row) { return row.map(m2Cell_); }));
    rosterTab.setFrozenRows(1);
    rosterTab.autoResizeColumns(1, 4);
    state.phase = 'created'; m2Save_(state);
    m2Report_(state, 'Roster created', 'ACCESS UNTESTED', roster.getUrl());
    m2Verify_(state);
    return state;
  } catch (error) {
    state.phase = 'failed'; m2Save_(state);
    if (state.reportSheetId) {
      try { m2Report_(state, 'Creation stopped', 'FAILED', error.message + ' Inspect the test folder before cleanup or another trial.'); }
      catch (reportError) { /* Original error remains the useful failure. */ }
    }
    throw error;
  }
}

function m2InFolder_(file, folderId) {
  var parents = file.getParents();
  while (parents.hasNext()) if (parents.next().getId() === folderId) return true;
  return false;
}

function verifyTrial() {
  var ui = SpreadsheetApp.getUi();
  try {
    m2WithLock_(function () {
      var state = m2Load_();
      if (!state || state.phase !== 'created') throw new Error('Create a successful trial first. A failed trial needs manual inspection and cleanup.');
      m2Verify_(state);
    });
    ui.alert('Verification observations appended to the Trial report. Review FAIL, REVIEW, and ERROR rows and complete the manual access checklist.');
  } catch (error) { ui.alert('Verification stopped: ' + error.message); }
}

function m2Verify_(state) {
  var current;
  try {
    var template = FormApp.openById(state.templateId);
    current = m2TemplateSnapshot_(template, DriveApp.getFileById(state.templateId));
  } catch (error) {
    m2Report_(state, 'Template snapshot unchanged', 'ERROR', 'Unable to read template: ' + error.message);
    throw error;
  }
  var fields = { title: 'Form title', filename: 'Drive filename', shape: 'Question structure',
    responses: 'Response count', destination: 'Response destination', published: 'Publication',
    accepting: 'Accepting responses', updated: 'Modification timestamp' };
  var summary = 'PASS';
  Object.keys(fields).forEach(function (key) {
    var before = state.templateBefore[key], after = current[key];
    var result = before === after ? 'PASS' : key === 'updated' ? 'REVIEW' : 'FAIL';
    if (result === 'FAIL' || (result === 'REVIEW' && summary === 'PASS')) summary = result;
    var detail = result === 'PASS' ? 'Unchanged.' :
      key === 'shape' ? 'Structure differs from baseline. Inspect item order/type/title/help, description, and quiz flag; not a full settings audit.' :
      'Expected: ' + JSON.stringify(before) + '; observed: ' + JSON.stringify(after) + '.';
    if (key === 'updated' && result === 'REVIEW') detail += ' Timestamp alone does not establish a content change; inspect the template.';
    m2Report_(state, 'Template: ' + fields[key], result, detail);
  });
  m2Report_(state, 'Template snapshot unchanged', summary, 'See individual template checks above. Original baseline retained; not a full settings audit.');
  var ids = state.forms.map(function (entry) { return entry.id; });
  m2Report_(state, 'Two distinct copies', ids.length === 2 && new Set(ids).size === 2 && ids.indexOf(state.templateId) === -1 ? 'PASS' : 'FAIL', 'Unique IDs, distinct from template.');
  state.forms.forEach(function (entry) {
    var form = FormApp.openById(entry.id), file = DriveApp.getFileById(entry.id);
    m2Report_(state, entry.entryId + ': title/filename', form.getTitle() === entry.title && file.getName() === entry.title ? 'PASS' : 'FAIL', entry.title);
    m2Report_(state, entry.entryId + ': folder', m2InFolder_(file, state.folderId) ? 'PASS' : 'FAIL', 'Destination membership.');
    m2Report_(state, entry.entryId + ': item structure', m2Digest_(m2Shape_(form)) === state.templateBefore.shape ? 'PASS' : 'FAIL', 'Item order/type/title/help, description, and quiz flag only. Manually inspect choices, required flags, scoring, images, and branching.');
    m2Report_(state, entry.entryId + ': no linked response sheet', !m2DestinationId_(form) ? 'PASS' : 'FAIL', 'Responses remain in each Form.');
    m2Report_(state, entry.entryId + ': response count', 'OBSERVED', form.getResponses().length);
    m2Report_(state, entry.entryId + ': publication', 'OBSERVED', 'accepting=' + form.isAcceptingResponses() + ', published=' +
      (form.supportsAdvancedResponderPermissions() ? form.isPublished() : 'legacy'));
    m2Report_(state, entry.entryId + ': responder link', form.getPublishedUrl() === entry.responderUrl ? 'PASS' : 'FAIL', 'Link identity only; student access is a manual test.');
  });
  m2Report_(state, 'Roster folder', m2InFolder_(DriveApp.getFileById(state.rosterId), state.folderId) ? 'PASS' : 'FAIL', 'Output roster membership.');
  m2Report_(state, 'Respondent access / response isolation', 'MANUAL CHECK REQUIRED', 'Expected staged counts: 0/0, then 1/0 after first submission, then 1/1 after second. Verify signed-out behavior and personal-account access.');
}

function cleanupTrial() {
  var ui = SpreadsheetApp.getUi();
  if (ui.alert('Trash trial outputs?', 'Only recorded trial Forms and the generated roster will be moved to Trash. The template, folder, control Sheet, and report are retained. Inspect the folder for untracked files after a failed run.', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  try {
    m2WithLock_(function () {
      var state = m2Load_();
      if (!state) throw new Error('No trial is recorded.');
      m2Cleanup_(state);
    });
    ui.alert('Recorded outputs moved to Trash. The report and trial record are retained. Inspect the test folder for any untracked files.');
  } catch (error) { ui.alert('Cleanup incomplete: ' + error.message); }
}

function m2Cleanup_(state) {
  var failures = [];
  state.created.forEach(function (id) {
    if ([state.templateId, state.folderId, state.controlId].indexOf(id) !== -1) { failures.push('Protected resource in cleanup list'); return; }
    try { DriveApp.getFileById(id).setTrashed(true); }
    catch (error) { failures.push('Could not trash a recorded output; inspect Drive permissions.'); }
  });
  state.phase = failures.length ? 'cleanup_partial' : 'cleaned'; m2Save_(state);
  if (state.reportSheetId) m2Report_(state, 'Cleanup', failures.length ? 'FAILED' : 'RECORDED OUTPUTS TRASHED', 'Template/control retained; inspect the folder for untracked resources after failures.');
  if (failures.length) throw new Error(failures.join(' '));
}
