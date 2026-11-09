import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/Review.gs', import.meta.url), 'utf8');
const raw = readFileSync(new URL('../../sandbox/google-cloud-vision/observations/owner-output-01.txt', import.meta.url), 'utf8');
let checks = 0;
function check(value, label) { if (!value) throw new Error(label); checks++; }
let id = 0;
const props = {};
let values = [];
let formulas = [];
const sheet = {
  getSheetId: () => 12, getName: () => 'Test review', getLastRow: () => values.length + 1,
  hideColumns() {},
  getRange(row, col, height) { return {
    getValues: () => values.map(row => row.slice()),
    getFormulas: () => formulas,
    setValue(value) { values[row - 2][col - 1] = value; },
    setValues(data) {
      if (row === 1) return this;
      data.forEach((cells, offset) => { values[row - 2 + offset] = cells.slice(); }); return this;
    },
    insertCheckboxes() { return this; },
    setDataValidation() { return this; }
  }; }
};
const properties = {
  getProperties: () => ({ ...props }),
  getProperty: key => props[key] || null,
  setProperty(key, value) { props[key] = value; },
  deleteProperty(key) { delete props[key]; }
};
const api = new Function('PropertiesService', 'SpreadsheetApp', 'Utilities', 'LockService', source +
  '\nreturn {draftRows_, evaluateRows_, safeCell_, getRosterReview, approveRoster, cancelRosterReview, onEdit, appendRosterScreenshot, screenshotRows_, excludeOverlaps_};')(
  { getDocumentProperties: () => properties },
  { getActiveSpreadsheet: () => ({ getSheetById: () => sheet }), flush() {},
    newDataValidation: () => ({ requireValueInList() { return this; }, setAllowInvalid() { return this; }, build() { return {}; } }) },
  { getUuid: () => 'id-' + (++id), DigestAlgorithm: { SHA_256: 'sha256' },
    computeDigest: (algorithm, text) => text, base64Encode: text => text,
    newBlob: text => ({ getBytes: () => Array.from(text) }) },
  { getDocumentLock: () => ({ waitLock() {}, releaseLock() {} }) }
);
values = api.draftRows_(raw, () => 'id-' + (++id));
check(values.length === 20, 'preserve split raw rows');
check(values[0][1] === false && values[1][1] === false, 'staff suggested exclusion');
check(values[8][3] === 'Unresolved' && values[9][3] === 'Unresolved', 'split suffix flagged');
check(api.evaluateRows_(values).errors.length === 2, 'split blocks approval');
values[8][2] = 'Quinn Harmon - IP'; values[8][3] = 'In-person'; values[9][1] = false;
const fixed = api.evaluateRows_(values);
check(!fixed.errors.length && fixed.entries.length === 17 && fixed.inPerson === 2, 'corrected roster counts');
check(fixed.entries[0].name === 'Riley Carter - IP' && fixed.entries[1].name === 'Quinn Harmon - IP', 'IP first');
const duplicate = api.draftRows_('Alex Example\nAlex Example', () => 'id-' + (++id));
check(api.evaluateRows_(duplicate).entries.length === 2 && duplicate[0][0] !== duplicate[1][0], 'duplicate names independent');
check(api.safeCell_('=IMPORTXML()').startsWith("'"), 'spreadsheet formula escaped');
check(api.evaluateRows_([]).errors.length === 1, 'empty roster blocked');
check(api.evaluateRows_([['x',true,'','Online','','']]).errors.length === 1, 'blank name blocked');
check(api.evaluateRows_([['x',true,'Alex - IP','Online','','']]).errors.length === 1, 'online suffix conflict');
check(api.evaluateRows_([['x',true,'Alex','In-person','','']]).errors.length === 1, 'in-person suffix required');
check(api.evaluateRows_([['x',true,'Alex','','','']]).errors.length === 1, 'missing attendance blocked');
check(api.draftRows_('Alex (Host)', () => 'host')[0][1], 'host role alone is not staff');
const prior = [['old-id',true,'Alex Example','Online','','','first.png','first-upload']];
const incoming = [['new-id',true,'Alex Example','Online','','','second.png','second-upload']];
const excluded = api.excludeOverlaps_(prior, incoming);
check(excluded.length === 0, 'cross-image exact match omitted');
check(incoming[0][1] === true && prior[0][1] === true, 'dedup does not mutate original rows');
check(api.excludeOverlaps_(prior, [[...incoming[0].slice(0,7), 'first-upload']])[0][1], 'same-image equal names preserved');
check(api.excludeOverlaps_([], incoming.concat(incoming))[1][1], 'within-image duplicates preserved');
check(api.excludeOverlaps_(prior, [['new-id',true,'Alex Example - IP','In-person','','','two.png','second-upload']])[0][1], 'attendance conflict remains for review');
check(api.evaluateRows_(prior.concat(excluded)).warnings.length === 0, 'skipped overlaps produce no row warnings');
function rejects(action, pattern) {
  let message = ''; try { action(); } catch (error) { message = error.message; }
  check(pattern.test(message), 'expected rejection: ' + pattern);
}
props.reviewSheet = '12';
let preview = api.getRosterReview();
check(!preview.approved, 'initial draft');
check(api.approveRoster(preview.signature).approved, 'valid explicit approval');
function snapshotEntries() {
  const meta = JSON.parse(props.approvedRoster);
  return JSON.parse(Array.from({ length: meta.parts }, (_, i) => props['approvalPart_' + i]).join(''));
}
check(snapshotEntries().length === 17, 'chunked snapshot saved');
values[2][2] = 'Taylor Corrected';
check(!api.getRosterReview().approved && !props.approvedRoster, 'edit invalidates persisted snapshot');
rejects(() => api.approveRoster(preview.signature), /changed/);
values.push(['', true, 'Added Student', 'Online', '', '']);
preview = api.getRosterReview();
check(Boolean(values[20][0]) && preview.entries.length === 18, 'new row gets stable ID');
values[20][3] = 'Unresolved';
rejects(() => api.approveRoster(api.getRosterReview().signature), /Resolve/);
values[20][3] = 'Online';
values[20][0] = values[2][0];
check(api.getRosterReview().errors.some(error => error.includes('duplicate entry ID')), 'copied IDs rejected');
values[20][0] = 'new-id';
formulas = [['', '', '=1+1', '', '', '']];
rejects(() => api.getRosterReview(), /formulas/);
formulas = [];
api.approveRoster(api.getRosterReview().signature);
api.onEdit({ range: { getSheet: () => sheet } });
check(!props.approvedRoster, 'edit trigger clears approval');
check(!Object.keys(props).some(key => key.startsWith('approvalPart_')), 'edit clears snapshot chunks');
api.approveRoster(api.getRosterReview().signature);
const beforeAppend = JSON.stringify(values);
const secondSource = { id: 'upload-0002', name: 'second.png' };
let combined = api.appendRosterScreenshot('Taylor Corrected\nNew Student - IP', secondSource, 12);
check(!combined.approved && !props.approvedRoster, 'append invalidates approval');
check(JSON.stringify(values.slice(0, 21)) === beforeAppend, 'existing corrections and IDs preserved');
check(values[21][6] === 'second.png' && values[21][7] === 'upload-0002', 'source tracked');
check(combined.warnings.some(warning => warning.includes('Taylor Corrected')), 'overlap flagged not deleted');
check(combined.entries.length === 20, 'overlap retained for human decision');
api.appendRosterScreenshot('Taylor Corrected\nNew Student - IP', secondSource, 12);
check(values.length === 23, 'retry same upload is idempotent');
rejects(() => api.appendRosterScreenshot('Person', { id: 'upload-0003', name: 'third.png' }, 99), /active review changed/);
check(values.length === 23, 'wrong review unchanged');
rejects(() => api.appendRosterScreenshot('', { id: 'upload-0004', name: 'empty.png' }, 12), /empty/);
values = Array.from({ length: 300 }, (_, i) => ['large-' + i, true, 'Student ' + i, 'Online', '', '', 'sample.png', 'large-upload']);
api.approveRoster(api.getRosterReview().signature);
check(snapshotEntries().length === 300, '300-entry chunked snapshot');
const approvalBeforeLimit = props.approvedRoster;
rejects(() => api.appendRosterScreenshot('Overflow', { id: 'upload-0005', name: 'extra.png' }, 12), /300/);
check(props.approvedRoster === approvalBeforeLimit && values.length === 300, 'capacity failure preserves prior approval and rows');
const allOverlap = api.appendRosterScreenshot('Student 0\nStudent 1', { id: 'upload-all-overlap', name: 'repeat.png' }, 12);
check(allOverlap.skippedOverlaps === 2 && values.length === 300, 'all-overlap upload adds zero rows even at capacity');
check(props.approvedRoster === approvalBeforeLimit, 'no new rows preserves approval');
api.appendRosterScreenshot('Student 0\nStudent 1', { id: 'upload-all-overlap', name: 'repeat.png' }, 12);
check(values.length === 300, 'empty append receipt prevents retry duplication');
api.cancelRosterReview();
check(!props.reviewSheet && !props.approvedRoster, 'cancel clears active state');
check(values.length === 300, 'cancel retains review evidence');
rejects(() => api.getRosterReview(), /No active/);
console.log(checks + ' review assertions passed with mocked Sheets and storage.');
