import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../src/Sidebar.html', import.meta.url), 'utf8');
let checks = 0;
function check(value, message) { if (!value) throw new Error(message); checks++; }
const elements = {};
const document = {
  getElementById(id) {
    return elements[id] ||= { children: [], handlers: {},
      addEventListener(event, callback) { this.handlers[event] = callback; },
      replaceChildren() { this.children = []; },
      appendChild(child) { this.children.push(child); }
    };
  },
  createElement() { return {}; }
};
const showReview = new Function('document', 'window', html.match(/<script>([\s\S]*?)<\/script>/)[1] + '\nreturn showReview;')(
  document, { addEventListener() {} }
);
const review = { signature: 'test', sheetId: 1, sheetName: 'Review', errors: [], warnings: [],
  excluded: 0, inPerson: 0, approved: false,
  entries: Array.from({ length: 300 }, (_, i) => ({ name: 'Student ' + i, attendance: 'Online', source: 'sample.png' })) };
showReview(review);
check(elements.reviewNames.children.length === 300, 'all entries retained');
check(elements.reviewNamesPanel.open === false, 'large preview collapsed');
check(elements.setupPanel.open === false, 'setup collapses during review');
check(elements.reviewNamesLabel.textContent === 'Preview roster (300)', 'preview count');
check(elements.reviewSummary.textContent.includes('300 online'), 'online count');
check(html.indexOf('id="approveReview"') < html.indexOf('id="reviewNamesPanel"'), 'approval precedes list');
check(html.includes('max-height: 220px; overflow-y: auto'), 'bounded list styles');
elements.confirmApproval.checked = true;
elements.confirmApproval.handlers.change.call(elements.confirmApproval);
check(elements.approveReview.disabled === false, 'valid roster enables approval after confirmation');
showReview({ ...review, errors: ['Resolve attendance'], warnings: ['Possible overlap'] });
check(elements.reviewIssuesPanel.open === true, 'blocking errors expand');
check(elements.reviewIssueCount.textContent === '1 blocking errors; 1 overlap warnings.', 'counts remain visible');
check(elements.reviewErrors.children.length === 2, 'both messages retained');
elements.confirmApproval.checked = true;
elements.confirmApproval.handlers.change.call(elements.confirmApproval);
check(elements.approveReview.disabled === true, 'errors still block approval');
showReview({ ...review, approved: true });
check(elements.confirmApproval.checked === false, 'refresh resets confirmation');
check(elements.approveReview.disabled === true, 'approved roster not reapproved');
console.log(checks + ' compact sidebar assertions passed (mock DOM; not visual verification).');
