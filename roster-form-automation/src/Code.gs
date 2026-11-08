function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Roster Forms')
    .addItem('Open setup', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  var sidebar = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Roster Forms');
  SpreadsheetApp.getUi().showSidebar(sidebar);
}

// The form element is sent by google.script.run; its file input becomes a Blob.
function extractScreenshot(form) {
  var blob = form && form.screenshot;
  if (!blob || typeof blob.getBytes !== 'function') {
    throw new Error('Choose a PNG or JPEG screenshot.');
  }
  var bytes = blob.getBytes();
  var mime = blob.getContentType();
  if (!bytes.length || bytes.length > 5 * 1024 * 1024) {
    throw new Error('Choose a nonempty image no larger than 5 MiB.');
  }
  var png = bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every(function (b, i) {
    return (bytes[i] & 255) === b;
  });
  var jpeg = bytes.length >= 3 && (bytes[0] & 255) === 255 &&
    (bytes[1] & 255) === 216 && (bytes[2] & 255) === 255;
  if (!((mime === 'image/png' && png) || (mime === 'image/jpeg' && jpeg))) {
    throw new Error('The file must contain a PNG or JPEG image.');
  }
  var headers = { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() };
  var project = PropertiesService.getScriptProperties().getProperty('VISION_PROJECT_ID');
  if (project) headers['x-goog-user-project'] = project.trim();
  var started = Date.now();
  var response;
  try {
    response = UrlFetchApp.fetch('https://vision.googleapis.com/v1/images:annotate', {
      method: 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify({ requests: [{
        image: { content: Utilities.base64Encode(bytes) },
        features: [{ type: 'TEXT_DETECTION' }]
      }] }),
      muteHttpExceptions: true
    });
  } catch (error) {
    throw new Error('Could not reach Cloud Vision. Check connectivity and Apps Script authorization, then retry.');
  }
  var code = response.getResponseCode();
  if (code !== 200) throw new Error(visionError_(code));
  var data;
  try { data = JSON.parse(response.getContentText()); }
  catch (error) { throw new Error('Cloud Vision returned an unreadable response. Retry the trial.'); }
  var result = data && data.responses && data.responses[0];
  if (!result) throw new Error('Cloud Vision returned no image result. Retry the trial.');
  if (result.error) throw new Error('Cloud Vision could not process this image. Check the image and project configuration.');
  var text = (result.fullTextAnnotation && result.fullTextAnnotation.text) ||
    (result.textAnnotations && result.textAnnotations[0] && result.textAnnotations[0].description) || '';
  return { text: text, elapsedMs: Date.now() - started };
}

function visionError_(code) {
  if (code === 401) return 'Google authorization expired or is missing. Reauthorize the script and retry.';
  if (code === 403) return 'Cloud Vision access denied. Check the linked Cloud project, enabled Vision API, billing, cloud-platform scope, and account permissions. If needed, set VISION_PROJECT_ID in Script Properties to the billing project ID.';
  if (code === 429) return 'Cloud Vision quota exceeded. Check project quotas and wait before retrying.';
  if (code >= 500) return 'Cloud Vision is temporarily unavailable. Retry later.';
  return 'Cloud Vision rejected the request (HTTP ' + code + '). Check the image and project configuration.';
}
