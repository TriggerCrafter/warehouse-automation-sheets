/**
 * qrGenerator.gs
 * ---------------
 * Builds a "QR Generator" sheet containing IN/OUT QR codes for each SKU and box quantity.
 * - Scans multiple category sheets
 * - Pulls Size, Color, SKU
 * - Writes Google Chart IMAGE() formulas for QR codes (portfolio-safe; no company data)
 *
 * How to run: Extensions → Apps Script → run generateQRCodes()
 */

function generateQRCodes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Example category sheet names (rename to match your demo)
  const sheetsToCheck = ["Category A", "Category B", "Category C", "Category D"];
  const outputSheetName = "QR Generator";

  // Quantities for IN/OUT labels
  const boxQuantities = [1, 10, 15, 25, 50];

  // Create or clear output sheet
  let out = ss.getSheetByName(outputSheetName);
  if (!out) {
    out = ss.insertSheet(outputSheetName);
  } else {
    out.clearContents();
  }

  // Headers
  const headers = ["Category", "Color", "Size", "SKU"];
  boxQuantities.forEach(qty => headers.push(`IN-${qty}`, `OUT-${qty}`));
  out.getRange(1, 1, 1, headers.length).setValues([headers]);

  let rowIndex = 2;

  sheetsToCheck.forEach(sheetName => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;

    const lastRow = sh.getLastRow();
    for (let r = 3; r <= lastRow; r++) {
      if (sh.isRowHiddenByFilter(r) || sh.isRowHiddenByUser(r)) continue;

      const size = sh.getRange(r, 1).getValue();   // Col A
      const color = sh.getRange(r, 2).getValue();  // Col B
      const sku = sh.getRange(r, 13).getValue();   // Col M
      if (!sku || !size || !color) continue;

      const rowData = [sheetName, color, size, sku];

      // Insert IMAGE() formulas that call Google Chart API for QR codes
      boxQuantities.forEach(qty => {
        const inText  = `${sku}-IN-${qty}`;
        const outText = `${sku}-OUT-${qty}`;
        const qrIn  = `=IMAGE("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(inText)}")`;
        const qrOut = `=IMAGE("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(outText)}")`;
        rowData.push(qrIn, qrOut);
      });

      out.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
      rowIndex++;
    }
  });
}
