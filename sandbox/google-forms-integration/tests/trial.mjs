import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/Code.gs', import.meta.url), 'utf8');
let assertions = 0;
function check(value, message) { if (!value) throw new Error(message); assertions++; }
function rejects(action, pattern) {
  let message = ''; try { action(); } catch (error) { message = error.message; }
  check(pattern.test(message), 'Expected error: ' + pattern + '; got: ' + message);
}

function harness(options = {}) {
  const files = {}, forms = {}, sheets = {}, properties = {};
  let copies = 0, createdSheets = 0;
  const folder = { getId: () => 'folder', isTrashed: () => false };
  function file(id, name, mime) {
    const item = { id, name, mime, trashed: false, parents: [],
      getId() { return this.id; }, getName() { return this.name; },
      setName(name) { this.name = name; return this; }, getMimeType() { return this.mime; },
      isTrashed() { return this.trashed; }, getLastUpdated: () => new Date('2026-11-13T00:00:00Z'),
      moveTo(folder) { this.parents = [folder]; return this; },
      getParents() { let index = 0; return { hasNext: () => index < this.parents.length, next: () => this.parents[index++] }; },
      setTrashed(value) { if (options.cleanupFailure === id) throw new Error('denied'); this.trashed = value; },
      makeCopy(name, folder) {
        copies++;
        if (options.failCopy === copies) throw new Error('Simulated copy failure');
        const id = 'copy-' + copies;
        const copy = file(id, name, this.mime); copy.parents = [folder];
        forms[id] = form(id, forms.template.getTitle());
        forms[id].destination = forms.template.destination;
        return copy;
      }
    };
    files[id] = item; return item;
  }
  function form(id, title) {
    return { id, title, responses: [], accepting: false, published: false, destination: 'old-response-sheet',
      getTitle() { return this.title; }, setTitle(value) { this.title = value; return this; },
      getDescription: () => 'Fictional test only', isQuiz: () => true,
      getItems: () => [{ getType: () => 'TEXT', getTitle: () => 'Test answer', getHelpText: () => 'Use fictional data' }],
      supportsAdvancedResponderPermissions: () => !options.legacy,
      isPublished() { return this.published; }, setPublished(value) { this.published = value; this.accepting = false; },
      isAcceptingResponses() { return this.accepting; }, setAcceptingResponses(value) { this.accepting = value; },
      getDestinationId() {
        if (options.destinationError) throw new Error(options.destinationError);
        if (!this.destination) throw new Error('The form currently has no response destination.');
        return this.destination;
      }, removeDestination() { this.destination = null; },
      getResponses() { return this.responses; },
      getPublishedUrl: () => 'https://docs.google.com/forms/d/e/' + id + '/viewform',
      getEditUrl: () => 'https://docs.google.com/forms/d/' + id + '/edit'
    };
  }
  function tab(id) {
    return { id, rows: [], getSheetId() { return this.id; }, appendRow(row) { this.rows.push(row); },
      setFrozenRows() {}, setColumnWidth() {}, setName() {}, autoResizeColumns() {},
      getRange() { return { setValues: rows => { sheets[id].rows = rows; } }; }
    };
  }
  const control = { getId: () => 'control', insertSheet() { const id = 101; sheets[id] = tab(id); return sheets[id]; },
    getSheetById: id => sheets[id] };
  file('template', 'Different Drive filename', 'application/vnd.google-apps.form');
  forms.template = form('template', 'OSHA Final Exam');
  if (options.unlinkedTemplate) forms.template.destination = null;
  forms.template.accepting = Boolean(options.openTemplate);
  if (options.sourceResponses) forms.template.responses = [{}];
  if (options.publishedTemplate) forms.template.published = true;
  if (options.wrongType) files.template.mime = 'application/pdf';
  const api = new Function('PropertiesService', 'SpreadsheetApp', 'DriveApp', 'FormApp', 'Utilities', source +
    '\nreturn {m2Create_,m2Verify_,m2Cleanup_,m2CopyTitle_,m2ResourceId_,m2Cell_,m2Load_};')(
    { getDocumentProperties: () => ({ getProperty: key => properties[key] || null,
      setProperty(key, value) { properties[key] = value; } }) },
    { getActiveSpreadsheet: () => control, create(name) {
      createdSheets++; const id = 'roster'; file(id, name, 'application/vnd.google-apps.spreadsheet');
      sheets[201] = tab(201);
      return { getId: () => id, getSheets: () => [sheets[201]], getUrl: () => 'https://docs.google.com/spreadsheets/d/roster/edit' };
    } },
    { getFileById(id) { if (!files[id]) throw new Error('File missing'); return files[id]; }, getFolderById: () => folder },
    { openById: id => forms[id] },
    { getUuid: () => 'test-run-1234', DigestAlgorithm: { SHA_256: 'sha256' },
      computeDigest: (algorithm, value) => value, base64Encode: value => value }
  );
  return { api, files, forms, sheets, properties, counts: () => ({ copies, createdSheets }) };
}

const template = 'https://docs.google.com/forms/d/template/edit';
const folder = 'https://drive.google.com/drive/folders/folder';
const h = harness();
check(h.api.m2CopyTitle_('Riley Carter - IP', 'OSHA Final Exam') === 'Riley Carter - OSHA Final Exam', 'attendance suffix stripped');
check(h.api.m2CopyTitle_('Anne-Marie Example', 'Quiz') === 'Anne-Marie Example - Quiz', 'internal hyphen retained');
check(h.api.m2CopyTitle_('IP Student', 'Quiz') === 'IP Student - Quiz', 'non-suffix IP retained');
check(h.api.m2CopyTitle_('Taylor Brooks', 'Quiz') === 'Taylor Brooks - Quiz', 'online naming');
rejects(() => h.api.m2CopyTitle_(' - IP', 'Quiz'), /empty/);
check(h.api.m2ResourceId_('https://docs.google.com/forms/u/0/d/template/edit?usp=sharing', 'form') === 'template', 'account-specific editor URL');
check(h.api.m2ResourceId_('https://drive.google.com/drive/u/0/folders/folder?usp=drive_link', 'folder') === 'folder', 'account-specific folder URL');
rejects(() => h.api.m2ResourceId_('https://forms.gle/test', 'form'), /editor link/);
rejects(() => h.api.m2ResourceId_('https://docs.google.com.evil.example/forms/d/template/edit', 'form'), /editor link/);
check(h.api.m2Cell_('=IMPORTXML()') === "'=IMPORTXML()", 'formula-like title escaped in Sheets');
const sourceBefore = JSON.stringify(h.forms.template);
const state = h.api.m2Create_(template, folder);
check(state.phase === 'created' && h.counts().copies === 2 && h.counts().createdSheets === 1, 'two copies and one roster');
check(state.forms[0].title === 'Riley Carter - OSHA Final Exam', 'uses Form title not Drive filename');
check(h.files['copy-1'].name === state.forms[0].title && h.forms['copy-1'].title === state.forms[0].title, 'both names set');
check(state.forms[0].name === 'Riley Carter - IP', 'reviewed name retained');
check(state.forms[0].id !== state.forms[1].id, 'distinct copies');
check(h.forms['copy-1'].destination === null && h.forms['copy-2'].destination === null, 'copied response destinations removed');
check(!h.forms['copy-1'].published && !h.forms['copy-2'].accepting, 'copies remain closed');
check(h.files.roster.parents[0].getId() === 'folder', 'roster moved to folder');
check(h.sheets[201].rows.length === 3 && h.sheets[201].rows[1][4] === state.forms[0].responderUrl, 'roster links mapped');
check(JSON.stringify(h.forms.template) === sourceBefore && h.files.template.name === 'Different Drive filename', 'source untouched');
rejects(() => h.api.m2Create_(template, folder), /already recorded/);
check(h.counts().copies === 2, 'rerun creates nothing');
check(h.sheets[101].rows.some(row => row[1] === 'Template snapshot unchanged' && row[2] === 'PASS'), 'template comparison logged');
check(!h.sheets[101].rows.some(row => row[2] === 'FAIL'), 'initial structural checks pass');
h.forms['copy-1'].responses.push({});
h.api.m2Verify_(state);
check(h.sheets[101].rows.some(row => row[1] === 'fixture-001: response count' && row[3] === '1'), 'first response observed');
check(h.forms['copy-2'].responses.length === 0, 'second count remains zero in mock');
h.forms['copy-2'].responses.push({}); h.api.m2Verify_(state);
check(h.sheets[101].rows.some(row => row[1] === 'fixture-002: response count' && row[3] === '1'), 'second response observed');
check(h.sheets[101].rows.some(row => row[2] === 'MANUAL CHECK REQUIRED'), 'access not inferred');
h.api.m2Cleanup_(state);
check(state.phase === 'cleaned' && h.files['copy-1'].trashed && h.files['copy-2'].trashed && h.files.roster.trashed, 'only recorded outputs trashed');
check(!h.files.template.trashed && h.sheets[101].rows.length > 1, 'template and report retained');
rejects(() => h.api.m2Create_(template, folder), /already recorded/);
for (const option of ['openTemplate', 'sourceResponses', 'publishedTemplate', 'wrongType']) {
  const invalid = harness({ [option]: true });
  rejects(() => invalid.api.m2Create_(template, folder), /disposable|Google Form/);
  check(invalid.counts().copies === 0 && invalid.api.m2Load_() === null, 'invalid template rejected before writes');
}
const failed = harness({ failCopy: 2 });
rejects(() => failed.api.m2Create_(template, folder), /Simulated/);
const failedState = failed.api.m2Load_();
check(failedState.phase === 'failed' && failedState.created.length === 1, 'partial output tracked');
rejects(() => failed.api.m2Create_(template, folder), /already recorded/);
failed.api.m2Cleanup_(failedState);
check(failed.files['copy-1'].trashed, 'failed-run cleanup');
const legacy = harness({ legacy: true }); legacy.api.m2Create_(template, folder);
check(!legacy.forms['copy-1'].accepting, 'legacy form closed without publication API');
const unlinked = harness({ unlinkedTemplate: true });
const unlinkedState = unlinked.api.m2Create_(template, folder);
check(unlinkedState.templateBefore.destination === null, 'unlinked template accepted');
unlinked.api.m2Verify_(unlinkedState);
check(!unlinked.sheets[101].rows.some(row => row[2] === 'FAIL'), 'unlinked copies and template verify successfully');
const destinationDenied = harness({ destinationError: 'Permission denied' });
rejects(() => destinationDenied.api.m2Create_(template, folder), /Permission denied/);
check(destinationDenied.counts().copies === 0 && destinationDenied.api.m2Load_() === null, 'unrelated destination errors stop before writes');
const denied = harness({ cleanupFailure: 'copy-1' });
const deniedState = denied.api.m2Create_(template, folder);
rejects(() => denied.api.m2Cleanup_(deniedState), /Could not trash/);
check(deniedState.phase === 'cleanup_partial' && denied.files['copy-2'].trashed, 'cleanup continues after individual failure');
const protectedRun = harness(); const protectedState = protectedRun.api.m2Create_(template, folder);
protectedState.created.push('template');
rejects(() => protectedRun.api.m2Cleanup_(protectedState), /Protected resource/);
check(!protectedRun.files.template.trashed, 'cleanup refuses template ID');
const comparison = harness();
const comparisonState = comparison.api.m2Create_(template, folder);
const baseline = JSON.stringify(comparisonState.templateBefore);
function latestChecks() {
  comparison.sheets[101].rows = [];
  comparison.api.m2Verify_(comparisonState);
  return comparison.sheets[101].rows;
}
let rows = latestChecks();
check(rows.filter(row => row[1].startsWith('Template: ') && row[2] === 'PASS').length === 8, 'all unchanged fields pass');
comparison.files.template.getLastUpdated = () => new Date('2026-11-15T00:00:00Z');
rows = latestChecks();
check(rows.some(row => row[1] === 'Template snapshot unchanged' && row[2] === 'REVIEW'), 'timestamp-only summary requires review');
check(rows.some(row => row[1] === 'Template: Modification timestamp' && row[3].includes('2026-11-13') && row[3].includes('2026-11-15')), 'timestamp shows old and new values');
const changes = [
  ['Form title', () => { comparison.forms.template.title = 'Changed title'; }],
  ['Drive filename', () => { comparison.files.template.name = 'Changed filename'; }],
  ['Question structure', () => { comparison.forms.template.getDescription = () => 'Changed description'; }],
  ['Response count', () => { comparison.forms.template.responses.push({}); }],
  ['Response destination', () => { comparison.forms.template.destination = null; }],
  ['Publication', () => { comparison.forms.template.published = true; }],
  ['Accepting responses', () => { comparison.forms.template.accepting = true; }]
];
for (const [label, mutate] of changes) {
  mutate(); rows = latestChecks();
  check(rows.some(row => row[1] === 'Template: ' + label && row[2] === 'FAIL'), label + ' difference identified');
  check(rows.some(row => row[1] === 'Template snapshot unchanged' && row[2] === 'FAIL'), 'failure takes precedence over timestamp review');
}
check(JSON.stringify(comparisonState.templateBefore) === baseline && JSON.stringify(comparison.api.m2Load_().templateBefore) === baseline, 'original baseline preserved in memory and storage');
comparison.forms.template.getTitle = () => { throw new Error('Permission denied'); };
comparison.sheets[101].rows = [];
rejects(() => comparison.api.m2Verify_(comparisonState), /Permission denied/);
check(comparison.sheets[101].rows.length === 1 && comparison.sheets[101].rows[0][2] === 'ERROR', 'read failure recorded as error without false passes');
console.log(assertions + ' sandbox trial assertions passed with mocked Google services.');
