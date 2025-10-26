/**
 * onEdit Trigger – Low Stock Monitor
 * -----------------------------------
 * When stock values change in any inventory sheet:
 * - If stock < 150 → add/update entry in "Low Stock Display"
 * - If stock >= 150 → remove from "Low Stock Display"
 * Skips Archive sheets and QR Generator.
 * 
 * Author: Argon
 * Portfolio Version – safe to share (no company data)
 */

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  const displaySheetName = "Low Stock Display";

  // Prevent self-triggering or irrelevant sheets
  if (sheetName === displaySheetName) return;
  if (sheetName.startsWith("Archive") || sheetName === "QR Generator") return;

  const range = e.range;
  const row = range.getRow();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Skip header row or if "Stock" column not found
  if (row === 1 || !headers.includes("Stock")) return;

  const stockCol = headers.indexOf("Stock") + 1;
  const itemCol = headers.indexOf("Item") + 1;
  const linkCol = headers.indexOf("Band Image") + 1;

  const displaySheet = e.source.getSheetByName(displaySheetName);
  if (!displaySheet) return;

  const stock = sheet.getRange(row, stockCol).getValue();
  const item = sheet.getRange(row, itemCol).getValue();
  const richText = sheet.getRange(row, linkCol).getRichTextValue();
  const url = richText ? richText.getLinkUrl() : "";

  const displayData = displaySheet.getDataRange().getValues();
  const itemList = displayData.map(r => r[0]); // Column A = Item
  const indexInDisplay = itemList.indexOf(item);

  // Skip hidden rows
  if (sheet.isRowHiddenByFilter(row) || sheet.isRowHiddenByUser(row)) return;

  if (stock < 150) {
    // Add or update entry
    if (indexInDisplay === -1) {
      displaySheet.appendRow([item, stock, sheetName, new Date(), "", url]);
    } else {
      displaySheet.getRange(indexInDisplay + 1, 2).setValue(stock);
      displaySheet.getRange(indexInDisplay + 1, 4).setValue(new Date());
      displaySheet.getRange(indexInDisplay + 1, 6).setValue(url);
    }
  } else if (indexInDisplay !== -1) {
    // Remove if restocked
    displaySheet.deleteRow(indexInDisplay + 1);
  }
}
