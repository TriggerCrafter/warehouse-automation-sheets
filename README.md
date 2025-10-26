# warehouse-automation-sheets
Low-code automation for warehouse operations (Google Sheets + Apps Script)
**Low Stock Monitor (`apps-script/LowStockMonitor.gs`)**
Watches all inventory sheets and auto-updates a "Low Stock Display" tab when any item’s stock drops below threshold.
- Adds or updates items under 150 units.
- Removes items once restocked.
- Ignores Archive and QR Generator sheets.
- Prevents recursive triggers and hidden-row edits.

This script demonstrates inventory monitoring, sheet logic, and event-driven automation in Google Apps Script.
