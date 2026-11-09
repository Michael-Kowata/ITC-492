import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/Batch.gs', import.meta.url), 'utf8');
const html = readFileSync(new URL('../src/Sidebar.html', import.meta.url), 'utf8');
let checks = 0;
function check(value, message) { if (!value) throw new Error(message); checks++; }
let active = null, rows = [], ocrCalls = 0;
const process = new Function('reviewLock_', 'reviewProperties_', 'reviewSheet_', 'reviewData_', 'reviewPreview_',
  'screenshotRows_', 'Utilities', 'extractScreenshot', 'startRosterReview', 'appendRosterScreenshot', source + '\nreturn processRosterScreenshot;')(
  fn => fn(), () => ({ getProperty: key => key === 'reviewSheet' ? active : null }), () => ({ getSheetId: () => Number(active) }),
  () => ({ rows }), () => ({ sheetId: Number(active) }), () => [],
  { base64Decode: () => [1], newBlob: bytes => bytes },
  () => { ocrCalls++; return { text: 'Student', elapsedMs: 1 }; },
  (text, origin) => { active = '12'; rows.push(['','','','','','','',origin.id]); return { sheetId: 12 }; },
  (text, origin, target) => { check(target === 12, 'append target'); rows.push(['','','','','','','',origin.id]); return { sheetId: 12 }; }
);
const image = { type: 'image/png', base64: 'AQ==' };
check(process(image, { id: 'upload-0001', name: 'one.png' }, null).review.sheetId === 12, 'create draft');
check(process(image, { id: 'upload-0001', name: 'one.png' }, null).reused && ocrCalls === 1, 'lost first response retry avoids OCR and append');
process(image, { id: 'upload-0002', name: 'two.png' }, 12);
check(ocrCalls === 2 && rows.length === 2, 'second image appended');
function rejects(fn, message) { let rejected = false; try { fn(); } catch { rejected = true; } check(rejected, message); }
rejects(() => process(image, { id: 'upload-0003' }, 99), 'changed target refused');
rejects(() => process({ type: 'image/png', base64: '!' }, { id: 'upload-0003' }, 12), 'malformed payload refused');
check(ocrCalls === 2, 'rejected inputs do not call OCR');
active = null;
rejects(() => process(image, { id: 'upload-0003' }, 12), 'canceled review refused');

const elements = {};
const document = { getElementById(id) { return elements[id] ||= { handlers: {}, children: [],
  addEventListener(event, fn) { this.handlers[event] = fn; }, replaceChildren() { this.children = []; },
  appendChild(child) { this.children.push(child); } }; }, createElement() { return {}; } };
let failSecond = true, targets = 0;
const calls = [];
const google = { script: { get run() {
  let success, failure;
  return { withSuccessHandler(fn) { success = fn; return this; }, withFailureHandler(fn) { failure = fn; return this; },
    getRosterBatchTarget() { targets++; success(null); },
    processRosterScreenshot(payload, origin, target) {
      calls.push(origin.id);
      if (origin.id === 'second' && failSecond) { failure(new Error('Temporary failure')); return; }
      success({ review: { sheetId: 12, sheetName: 'Review', signature: 's', entries: [], errors: [], warnings: [], excluded: 0, inPerson: 0 }, text: 'Student' });
    }
  };
} } };
class FileReader { readAsDataURL() { this.result = 'data:image/png;base64,AQ=='; this.onload(); } }
const api = new Function('document', 'window', 'google', 'FileReader', html.match(/<script>([\s\S]*?)<\/script>/)[1] +
  '\nreturn {runBatch, setBatch(items) {batch=items;}, items() {return batch;}};')(
  document, { addEventListener() {} }, google, FileReader
);
api.setBatch(['first','second','third'].map(id => ({ file: { name: id + '.png', type: 'image/png' }, source: { id, name: id + '.png' }, state: 'Queued' })));
await api.runBatch(false);
check(api.items().map(item => item.state).join(',') === 'Added,Failed,Added', 'partial failure preserves successes');
check(elements.retryBatch.hidden === false, 'retry offered');
failSecond = false;
await api.runBatch(true);
check(calls.join(',') === 'first,second,third,second', 'retry only failed file');
check(targets === 1, 'retry retains original target');
check(elements.retryBatch.hidden && !elements.extract.disabled, 'successful batch unlocks controls');
check(elements.batchStatus.children.length === 3, 'per-image status retained');
elements.screenshot.files = Array.from({ length: 4 }, () => ({ type: 'image/png', size: 100, name: 'four.png' }));
elements.setup.handlers.submit({ preventDefault() {} });
check(elements.status.textContent === 'Select 1 to 3 screenshots.', 'four-file batch rejected before upload');
check(calls.length === 4, 'invalid selection makes no RPC requests');
console.log(checks + ' batch assertions passed (mock services and DOM).');
