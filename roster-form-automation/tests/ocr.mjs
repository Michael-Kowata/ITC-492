import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/Code.gs', import.meta.url), 'utf8');
let count = 0;
function check(value, label) { if (!value) throw new Error(label); count++; }
let statusCode = 200;
let body = JSON.stringify({ responses: [{ fullTextAnnotation: { text: 'Riley Carter - IP\n' } }] });
let calls = 0;
const extract = new Function('ScriptApp', 'PropertiesService', 'Utilities', 'UrlFetchApp', source + '\nreturn extractScreenshot;')(
  { getOAuthToken: () => 'test-token' },
  { getScriptProperties: () => ({ getProperty: () => 'test-project' }) },
  { base64Encode: () => 'mock-image' },
  { fetch(url, options) {
    calls++;
    check(url === 'https://vision.googleapis.com/v1/images:annotate', 'fixed endpoint');
    check(options.headers.Authorization === 'Bearer test-token', 'OAuth header');
    check(options.headers['x-goog-user-project'] === 'test-project', 'quota project');
    const request = JSON.parse(options.payload).requests[0];
    check(request.features[0].type === 'TEXT_DETECTION', 'OCR feature');
    check(request.image.content === 'mock-image', 'inline image');
    return { getResponseCode: () => statusCode, getContentText: () => body };
  } }
);
const png = { getBytes: () => [-119,80,78,71,13,10,26,10], getContentType: () => 'image/png' };
check(extract({ screenshot: png }).text === 'Riley Carter - IP\n', 'raw suffix retained');
body = JSON.stringify({ responses: [{}] });
check(extract({ screenshot: png }).text === '', 'no text response');
body = JSON.stringify({ responses: [{ textAnnotations: [{ description: 'Fallback' }] }] });
check(extract({ screenshot: png }).text === 'Fallback', 'annotation fallback');
function rejects(form, pattern) {
  let message = '';
  try { extract(form); } catch (error) { message = error.message; }
  check(pattern.test(message), 'expected error: ' + pattern);
}
const before = calls;
rejects({}, /Choose/);
rejects({ screenshot: { ...png, getBytes: () => [] } }, /nonempty/);
rejects({ screenshot: { ...png, getBytes: () => ({ length: 5242881 }) } }, /5 MiB/);
rejects({ screenshot: { ...png, getContentType: () => 'text/plain' } }, /PNG or JPEG/);
rejects({ screenshot: { ...png, getBytes: () => [1,2,3,4,5,6,7,8] } }, /PNG or JPEG/);
check(calls === before, 'invalid files never call API');
for (const code of [401,403,429,500,400]) {
  statusCode = code;
  rejects({ screenshot: png }, /authorization|access denied|quota|unavailable|rejected/i);
}
statusCode = 200;
body = '{invalid';
rejects({ screenshot: png }, /unreadable/);
body = '{}';
rejects({ screenshot: png }, /no image result/);
body = JSON.stringify({ responses: [{ error: { message: 'private details' } }] });
rejects({ screenshot: png }, /could not process/);
console.log(count + ' OCR assertions passed with mocked Google services.');
