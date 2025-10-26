/**
 * AutoTimestamp.gs
 * ----------------
 * Automatically logs timestamps when stock values are edited.
 * - Watches sheets "Main" and "Overstock"
 * - Adds a timestamp when new stock is entered
 * - Clears the timestamp if the cell is emptied
 * 
 * Portfolio-safe version (no company data)
 */
function onEditTimestamp(e) {
  const sh = e.range.getSheet();
  if (!["Main", "Overstock"].includes(sh.getName())) return;

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const stockCol = headers.indexOf("Stock") + 1;
  const timeCol = headers.indexOf("Last Updated") + 1;
  if (e.range.getColumn() !== stockCol || timeCol === 0) return;

  const row = e.range.getRow();
  const value = e.value;
  const timeCell = sh.getRange(row, timeCol);
  value ? timeCell.setValue(new Date()) : timeCell.clearContent();
}
