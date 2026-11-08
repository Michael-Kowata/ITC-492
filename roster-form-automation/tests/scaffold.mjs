import { readFileSync } from 'node:fs';

const code = readFileSync(new URL('../src/Code.gs', import.meta.url), 'utf8');
const html = readFileSync(new URL('../src/Sidebar.html', import.meta.url), 'utf8');
let checks = 0;
function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks++;
}
const menu = {
  addItem(label, handler) { assert(handler === 'showSidebar', 'menu handler'); return this; },
  addToUi() { checks++; }
};
const ui = {
  createMenu(name) { assert(name === 'Roster Forms', 'menu name'); return menu; },
  showSidebar(output) { assert(output.title === 'Roster Forms', 'sidebar title'); }
};
const htmlService = {
  createHtmlOutputFromFile(name) {
    assert(name === 'Sidebar', 'HTML filename');
    return { setTitle(title) { this.title = title; return this; } };
  }
};
new Function('SpreadsheetApp', 'HtmlService', code + '\nonOpen(); showSidebar();')(
  { getUi: () => ui }, htmlService
);
const element = { addEventListener() {}, removeAttribute() {} };
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const validate = new Function('document', 'window', script + '\nreturn inputError;')(
  { getElementById: () => element }, { addEventListener() {} }
);
const form = 'https://docs.google.com/forms/d/fictional-template/edit';
const folder = 'https://drive.google.com/drive/folders/fictional-folder';
const png = { type: 'image/png', size: 100 };
assert(validate(form, folder, png) === '', 'valid PNG');
assert(validate(form, folder, { type: 'image/jpeg', size: 100 }) === '', 'valid JPEG');
assert(validate(form, folder.replace('drive/folders', 'drive/u/0/folders'), png) === '', 'account folder');
assert(validate(form.replace('/edit', '/viewform'), folder, png), 'reject responder link');
assert(validate(form.replace('docs.google.com', 'evil.example'), folder, png), 'reject other host');
assert(validate(form, 'https://example.com/folder', png), 'reject other folder');
assert(validate(form, folder, null), 'missing image');
assert(validate(form, folder, { type: 'text/plain', size: 100 }), 'unsupported type');
assert(validate(form, folder, { ...png, size: 0 }), 'empty image');
assert(validate(form, folder, { ...png, size: 5242881 }), 'oversized image');
assert(validate(form, folder, { ...png, size: 5242880 }) === '', 'size boundary');
console.log(`${checks} scaffold assertions passed (mocked services; not a browser or Google integration test).`);
