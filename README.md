# Meridian Ops: Operations Software for Small Manufacturers

A clickable prototype of a lightweight ERP for small job shops and manufacturers. It covers the work queue, quality and inventory in one simple tool.

During my co-op at Entegris I used SAP every day. It's powerful, but it's built for large companies, and a 20- or 50-person machine shop can't justify the cost or the complexity. Many of those shops end up running on whiteboards and spreadsheets. I wanted to explore what the essential parts of an ERP would look like if they were designed for the shop floor of a small manufacturer.

## What it does

- **Home:** what needs attention today (rush or blocked work orders, critical inventory, open quality issues), a summary by department, and weekly throughput and first-pass quality charts.
- **Queue:** work orders across production lines (CNC, laser, welding, assembly) with customer, due date, quantity, priority, material, operator and status. Each work order opens to a detail view.
- **Quality:** an inspection and nonconformance (NCR) log with result (pass, rework or scrap), defect, disposition and inspector.
- **Inventory:** materials on hand against reorder points, flagged as critical or low, with supplier lead times, unit cost, which work orders use each material, and purchase order tracking.
- **Settings:** company profile, production lines and departments, and team.

All companies, people and numbers in the prototype are made-up sample data.

## How it works

- Plain **HTML, CSS and JavaScript**, with no framework and no build step.
- Sample data (work orders, quality records, inventory, purchase orders) lives in arrays at the top of `app.js`, so you can change a scenario by editing the data.
- Charts are drawn as inline SVG, and the styling supports light and dark mode through CSS variables.
- It's a front-end prototype, so there's no backend yet and nothing is saved between sessions.

## Run it locally

Open `index.html` in a browser, or for auto-reload while editing:

```bash
npm install
npm start
```

In VS Code you can also use the **Live Server** extension and click **Go Live**. On Windows, double-click `Open Meridian Ops.bat`.

## What's next

- A real database and logins, so a team can use it together
- Scheduling that balances machine capacity against due dates
- Automatic purchase suggestions when inventory falls below reorder points
- AI features, such as drafting a corrective action from an NCR description

## Built with

HTML · CSS · JavaScript · SVG charts
