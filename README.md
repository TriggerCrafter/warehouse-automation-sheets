## Low-Code Automation for Warehouse Operations
**Google Sheets + Apps Script Portfolio Suite**

This repository demonstrates a modular automation system built for inventory and workflow management using Google Apps Script. Each script represents a functional component from a real-world warehouse system—optimized for low-stock tracking, reporting, and QR-based product management.

---

### Included Scripts

#### LowStockMonitor.gs
Watches all inventory sheets and auto-updates a “Low Stock Display” tab when any item’s stock drops below threshold.
- Adds or updates items under 150 units.
- Removes items once restocked.
- Ignores Archive and QR Generator sheets.
- Prevents recursive triggers and hidden-row edits.
Demonstrates event-driven automation and inventory monitoring logic.

---

#### autoTimestamp.gs
Automatically logs timestamps when stock levels are updated or cleared.
Demonstrates edit-based automation and column mapping logic.

---

#### emailAlert.gs
Sends a formatted HTML email summary of low-stock items, including clickable product links and category details.
Demonstrates data aggregation, conditional formatting, and HTML-based communication automation.

---

#### qrGenerator.gs
Builds a “QR Generator” sheet that creates IN/OUT QR codes per SKU and box quantity using Google Chart IMAGE() formulas.
Demonstrates integration with external APIs and batch data processing.

---

#### lowStockTracker.gs
Tracks newly low and recovered SKUs in a dedicated sheet and returns new lows for alerting.
Demonstrates persistent state tracking across script executions.

---

### Tech Used
- Google Apps Script (JavaScript-based)
- Google Sheets API
- MailApp (email automation)
- Google Chart API (QR generation)

---

### Summary
This project demonstrates how low-code scripting can transform manual warehouse tasks into automated workflows—increasing efficiency, data accuracy, and visibility across departments.

## 🧩 Live Google Sheets Demo
You can view and test the working automation demo here:  
[👉 Open the Live Sheet]([https://docs.google.com/spreadsheets/d/1HRHeu6oak5yTB2g5CMZHrP2e9SnhTUuJPyjdA4ECR3c/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1QynRZrxogKwNCfDZ5f82QQpSQ2FQrX8Nkg9Mx5jDoVU/edit?usp=sharing))

This sheet demonstrates:
- Real-time stock tracking
- Barcode scan simulation
- Low stock highlighting
- Automated “Low Stock Display” tab updates

