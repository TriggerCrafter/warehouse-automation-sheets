/**
 * lowStockTracker.gs
 * -------------------
 * Maintains a simple list of SKUs currently below threshold in a dedicated sheet.
 * - Adds newly low SKUs
 * - Removes SKUs that recovered above threshold
 * - Returns the newly added SKUs (useful for alerting)
 *
 * Portfolio-safe utility (no company data).
 */

/**
 * Track the set of SKUs currently below threshold.
 * @param {string[]} currentLowStockSKUs - List of SKUs detected as low stock right now.
 * @param {string} [trackingSheetName="Low Stock Tracking"]
 * @return {string[]} newlyAdded - SKUs that are newly low (not previously tracked)
 */
function trackLowStockChanges(currentLowStockSKUs, trackingSheetName = "Low Stock Tracking") {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(trackingSheetName) || ss.insertSheet(trackingSheetName);

  // Ensure header
  if (sh.getLastRow() === 0) sh.getRange(1, 1).setValue("SKU");

  // Read existing SKUs (column A starting row 2)
  const lastRow = sh.getLastRow();
  const existingRangeRows = Math.max(lastRow - 1, 0);
  const existingSKUs = existingRangeRows
    ? sh.getRange(2, 1, existingRangeRows, 1).getValues().flat().filter(Boolean)
    : [];

  const setExisting = new Set(existingSKUs);
  const setCurrent  = new Set((currentLowStockSKUs || []).filter(Boolean));

  // Compute deltas
  const newlyAdded   = currentLowStockSKUs.filter(sku => !setExisting.has(sku));
  const recovered    = existingSKUs.filter(sku => !setCurrent.has(sku));

  // Add new lows
  if (newlyAdded.length) {
    const start = sh.getLastRow() + 1;
    sh.getRange(start, 1, newlyAdded.length, 1)
      .setValues(newlyAdded.map(sku => [sku]));
  }

  // Remove recovered
  if (recovered.length) {
    const allRows = existingRangeRows
      ? sh.getRange(2, 1, existingRangeRows, 1).getValues()
      : [];
    const filtered = allRows.filter(row => !recovered.includes(row[0]));

    if (existingRangeRows) {
      sh.getRange(2, 1, existingRangeRows, 1).clearContent();
    }
    if (filtered.length) {
      sh.getRange(2, 1, filtered.length, 1).setValues(filtered);
    }
  }

  return newlyAdded;
}

/**
 * OPTIONAL DEMO HELPER
 * Collect low-stock SKUs from a "Low Stock Display" sheet (col A assumed = Item/SKU).
 * Lets you test trackLowStockChanges without wiring it into other scripts.
 */
function demoTrackFromDisplay_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const display = ss.getSheetByName("Low Stock Display");
  if (!display || display.getLastRow() < 2) return [];

  // Assume column A holds the SKU/Item identifier.
  const skus = display.getRange(2, 1, display.getLastRow() - 1, 1).getValues()
    .flat()
    .filter(Boolean);

  const newly = trackLowStockChanges(skus);
  Logger.log("Newly low SKUs: " + JSON.stringify(newly));
  return newly;
}
