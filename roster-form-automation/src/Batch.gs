function getRosterBatchTarget() {
  return reviewLock_(function () {
    var id = reviewProperties_().getProperty('reviewSheet');
    return id ? reviewSheet_().getSheetId() : null;
  });
}

// Check again after OCR through start/append, so an intervening cancel cannot
// silently send an image to a different review. The client retains IDs on retry.
function processRosterScreenshot(image, source, target) {
  screenshotRows_('validation', source);
  var previous = reviewLock_(function () {
    var active = reviewProperties_().getProperty('reviewSheet');
    if (!active) {
      if (target !== null) throw new Error('The review was canceled. Start a new batch.');
      return null;
    }
    var data = reviewData_();
    if (target !== null && String(target) !== String(active)) throw new Error('The active review changed. Start a new batch.');
    if (reviewProperties_().getProperty('processedUpload_' + active + '_' + source.id) !== null ||
        data.rows.some(function (row) { return row[7] === source.id; })) return reviewPreview_();
    if (target === null) throw new Error('A review was created since this batch started. Refresh and start a new batch.');
    return null;
  });
  if (previous) return { review: previous, text: null, reused: true };
  if (!image || !['image/png', 'image/jpeg'].includes(image.type) || typeof image.base64 !== 'string' ||
      !image.base64.length || image.base64.length > 4 * Math.ceil(5 * 1024 * 1024 / 3) ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(image.base64)) throw new Error('Invalid image payload or image exceeds 5 MiB.');
  var bytes;
  try { bytes = Utilities.base64Decode(image.base64); }
  catch (error) { throw new Error('The image could not be decoded. Select it again.'); }
  var result = extractScreenshot({ screenshot: Utilities.newBlob(bytes, image.type, source.name) });
  if (!result.text.trim()) throw new Error('No text detected. Try a clearer screenshot.');
  var review = target === null ? startRosterReview(result.text, source) : appendRosterScreenshot(result.text, source, target);
  return { review: review, text: result.text, elapsedMs: result.elapsedMs, reused: false };
}
