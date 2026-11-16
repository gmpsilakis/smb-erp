(function () {
  "use strict";

  // ─── Data ────────────────────────────────────────────────────────────────────

  var DEPARTMENTS = [
    { id: "cutting",  name: "Cutting & Forming",    lines: ["CNC-1", "CNC-2", "Laser-1"] },
    { id: "joining",  name: "Joining",              lines: ["Weld-1"] },
    { id: "assembly", name: "Assembly & Finishing", lines: ["Assembly-1"] },
  ];

  var JOBS = [
    { wo: "WO-1042", part: "Bracket, mounting L-24",     customer: "Halden Fixtures",      line: "CNC-1",      due: "Sep 26", qty: 120, priority: "Rush",     status: "In progress", material: "AL-6061 plate 1/2\"",    operator: "R. Okafor",  notes: "Second op — deburr and bag per print rev C." },
    { wo: "WO-1044", part: "Shaft collar, 1.25in",       customer: "Foundry Robotics",     line: "CNC-1",      due: "Sep 29", qty:  60, priority: "Standard", status: "Scheduled",   material: "4140 round bar",          operator: "Unassigned", notes: "" },
    { wo: "WO-1050", part: "Bearing housing, 40mm",      customer: "Foundry Robotics",     line: "CNC-1",      due: "Oct 1",  qty:  24, priority: "Standard", status: "Scheduled",   material: "AL-6061 round 4\"",       operator: "Unassigned", notes: "" },
    { wo: "WO-0991", part: "Pivot pin, hardened",        customer: "Northfield Industrial",line: "CNC-1",      due: "Sep 24", qty:  48, priority: "Rush",     status: "Complete",    material: "4140 bar stock",          operator: "R. Okafor",  notes: "Shipped Sep 24.", outboundStatus: "Shipped", shipDate: "Sep 24", trackingRef: "BOL-4421" },
    { wo: "WO-1052", part: "Standoff, hex 25mm",         customer: "Voss Automation",      line: "CNC-1",      due: "Oct 5",  qty: 200, priority: "Standard", status: "Scheduled",   material: "AL-6061 hex bar",         operator: "Unassigned", notes: "" },
    { wo: "WO-1038", part: "Gusset plate, 3/8",          customer: "Halden Fixtures",      line: "CNC-2",      due: "Sep 25", qty: 200, priority: "Rush",     status: "Blocked",     material: "A36 plate 3/8\"",         operator: "T. Marsh",   notes: "Waiting on plate stock — PO-2291 not yet received." },
    { wo: "WO-1046", part: "Hinge base",                 customer: "Coastal Metalworks",   line: "CNC-2",      due: "Oct 2",  qty:  80, priority: "Standard", status: "Scheduled",   material: "AL-6061 plate 1/4\"",    operator: "Unassigned", notes: "" },
    { wo: "WO-1048", part: "Access door panel",          customer: "Northfield Industrial",line: "CNC-2",      due: "Oct 4",  qty:  30, priority: "Standard", status: "Scheduled",   material: "AL-6061 plate 3/16\"",   operator: "Unassigned", notes: "" },
    { wo: "WO-1053", part: "Cover plate, slotted",       customer: "Halden Fixtures",      line: "CNC-2",      due: "Sep 28", qty:  50, priority: "Standard", status: "In progress", material: "A36 plate 1/4\"",         operator: "T. Marsh",   notes: "" },
    { wo: "WO-0995", part: "Motor mount plate",          customer: "Foundry Robotics",     line: "CNC-2",      due: "Sep 22", qty:  12, priority: "Rush",     status: "Complete",    material: "AL-6061 plate 1/2\"",    operator: "T. Marsh",   notes: "Shipped Sep 22.", outboundStatus: "Shipped", shipDate: "Sep 22", trackingRef: "BOL-4418" },
    { wo: "WO-1055", part: "Spacer block, 50mm",         customer: "Voss Automation",      line: "CNC-2",      due: "Oct 7",  qty:  40, priority: "Standard", status: "Scheduled",   material: "Delrin rod 3\"",          operator: "Unassigned", notes: "" },
    { wo: "WO-1035", part: "Enclosure panel, front",     customer: "Voss Automation",      line: "Laser-1",    due: "Sep 25", qty:  45, priority: "Rush",     status: "In progress", material: "Stainless 304, 14ga",     operator: "J. Pinto",   notes: "Nesting complete, cutting started 7:40am." },
    { wo: "WO-1040", part: "Enclosure panel, side",      customer: "Voss Automation",      line: "Laser-1",    due: "Sep 25", qty:  90, priority: "Rush",     status: "Scheduled",   material: "Stainless 304, 14ga",     operator: "Unassigned", notes: "Runs right after WO-1035 on same sheet layout." },
    { wo: "WO-1029", part: "Angle bracket set",          customer: "Northfield Industrial",line: "Laser-1",    due: "Oct 3",  qty: 300, priority: "Standard", status: "Scheduled",   material: "A36 plate 1/4\"",         operator: "Unassigned", notes: "" },
    { wo: "WO-1056", part: "Bracket, cable tray",        customer: "Coastal Metalworks",   line: "Laser-1",    due: "Sep 30", qty:  60, priority: "Standard", status: "Blocked",     material: "Stainless 304, 14ga",     operator: "J. Pinto",   notes: "Program not approved — needs DXF revision from customer." },
    { wo: "WO-0988", part: "Shield plate, lower",        customer: "Halden Fixtures",      line: "Laser-1",    due: "Sep 20", qty: 100, priority: "Standard", status: "Complete",    material: "A36 plate 3/16\"",        operator: "J. Pinto",   notes: "Complete and shipped.", outboundStatus: "Shipped", shipDate: "Sep 20", trackingRef: "BOL-4417" },
    { wo: "WO-1031", part: "Frame, lower weldment",      customer: "Coastal Metalworks",   line: "Weld-1",     due: "Sep 27", qty:  18, priority: "Standard", status: "In progress", material: "1x1 sq tube, 11ga",       operator: "D. Alvarez", notes: "Fit-up done for 12 of 18; fixture shared with WO-1033." },
    { wo: "WO-1033", part: "Frame, upper weldment",      customer: "Coastal Metalworks",   line: "Weld-1",     due: "Sep 27", qty:  18, priority: "Standard", status: "Blocked",     material: "1x1 sq tube, 11ga",       operator: "D. Alvarez", notes: "Waiting on WPS sign-off after NCR-221 on similar joint." },
    { wo: "WO-1020", part: "Skid base weldment",         customer: "Northfield Industrial",line: "Weld-1",     due: "Oct 6",  qty:   6, priority: "Standard", status: "Scheduled",   material: "3x3 sq tube, 1/4\"",      operator: "Unassigned", notes: "" },
    { wo: "WO-1057", part: "Table frame weldment",       customer: "Halden Fixtures",      line: "Weld-1",     due: "Oct 8",  qty:   4, priority: "Standard", status: "Scheduled",   material: "2x2 sq tube, 11ga",       operator: "Unassigned", notes: "" },
    { wo: "WO-0982", part: "Pallet support weldment",    customer: "Northfield Industrial",line: "Weld-1",     due: "Sep 18", qty:  10, priority: "Standard", status: "Complete",    material: "2x3 rect tube, 3/16\"",   operator: "D. Alvarez", notes: "Shipped Sep 19.", outboundStatus: "Shipped", shipDate: "Sep 19", trackingRef: "BOL-4415" },
    { wo: "WO-1015", part: "Control panel assy",         customer: "Voss Automation",      line: "Assembly-1", due: "Sep 26", qty:  45, priority: "Rush",     status: "In progress", material: "Hardware kit HK-118",      operator: "S. Lund",    notes: "Waiting on 22 enclosure panels from Laser-1 to finish run." },
    { wo: "WO-1009", part: "Hinge sub-assembly",         customer: "Coastal Metalworks",   line: "Assembly-1", due: "Oct 1",  qty:  80, priority: "Standard", status: "Scheduled",   material: "Hardware kit HK-104",      operator: "Unassigned", notes: "" },
    { wo: "WO-0998", part: "Bracket assy, painted",      customer: "Halden Fixtures",      line: "Assembly-1", due: "Sep 24", qty: 120, priority: "Rush",     status: "Complete",    material: "n/a",                     operator: "S. Lund",    notes: "Shipped 6:15am, packing slip PS-1187.", outboundStatus: "Shipped", shipDate: "Sep 24", trackingRef: "PS-1187" },
    { wo: "WO-1058", part: "Door closer assy",           customer: "Coastal Metalworks",   line: "Assembly-1", due: "Oct 3",  qty:  20, priority: "Standard", status: "Scheduled",   material: "Hardware kit HK-107",      operator: "Unassigned", notes: "" },
    { wo: "WO-1059", part: "Relay panel, 12-circuit",    customer: "Voss Automation",      line: "Assembly-1", due: "Sep 29", qty:   8, priority: "Rush",     status: "In progress", material: "Hardware kit HK-122",      operator: "S. Lund",    notes: "Wiring complete for 5 of 8 units." },
    { wo: "WO-0975", part: "Sensor mount kit",           customer: "Foundry Robotics",     line: "Assembly-1", due: "Sep 15", qty:  30, priority: "Standard", status: "Complete",    material: "Hardware kit HK-099",      operator: "S. Lund",    notes: "Complete Sep 15. Holding for customer shipping instructions.", outboundStatus: "Awaiting shipment" },
  ];

  var QUALITY = [
    { id: "NCR-224", date: "Sep 24", wo: "WO-1035", part: "Enclosure panel, front",  inspector: "M. Reyes",   result: "Rework", defect: "Edge burr along top flange",            disposition: "Deburr and re-inspect before ship",     rootCause: "Cut speed too high on 14ga run; parameter flagged for laser program." },
    { id: "NCR-223", date: "Sep 23", wo: "WO-1031", part: "Frame, lower weldment",   inspector: "D. Alvarez", result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-222", date: "Sep 23", wo: "WO-0998", part: "Bracket assy, painted",   inspector: "M. Reyes",   result: "Pass",   defect: "—",                                     disposition: "Released to shipping",                  rootCause: "—" },
    { id: "NCR-221", date: "Sep 22", wo: "WO-1033", part: "Frame, upper weldment",   inspector: "T. Marsh",   result: "Rework", defect: "Weld porosity, corner joint",           disposition: "Reweld pending updated WPS sign-off",   rootCause: "Suspect gas coverage on corner pass; under review with weld lead." },
    { id: "NCR-220", date: "Sep 21", wo: "WO-1038", part: "Gusset plate, 3/8",       inspector: "T. Marsh",   result: "Scrap",  defect: "Hole pattern out of tolerance",         disposition: "Scrapped, 4 pcs",                       rootCause: "Fixture offset not reset after tool change; op instruction updated." },
    { id: "NCR-219", date: "Sep 19", wo: "WO-1015", part: "Control panel assy",      inspector: "S. Lund",    result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-218", date: "Sep 18", wo: "WO-1009", part: "Hinge sub-assembly",      inspector: "S. Lund",    result: "Rework", defect: "Missing thread-lock on 2 fasteners",   disposition: "Reworked in place",                     rootCause: "Traveler step skipped; checklist item added to work instruction." },
    { id: "NCR-217", date: "Sep 17", wo: "WO-1042", part: "Bracket, mounting L-24",  inspector: "R. Okafor",  result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-216", date: "Sep 15", wo: "WO-0975", part: "Sensor mount kit",        inspector: "M. Reyes",   result: "Pass",   defect: "—",                                     disposition: "Shipped",                               rootCause: "—" },
    { id: "NCR-215", date: "Sep 14", wo: "WO-1059", part: "Relay panel, 12-circuit", inspector: "S. Lund",    result: "Rework", defect: "Loose terminal on position 7",          disposition: "Re-torque and re-test",                 rootCause: "Tool calibration issue; torque wrench sent for recalibration." },
    { id: "NCR-214", date: "Sep 12", wo: "WO-1053", part: "Cover plate, slotted",    inspector: "R. Okafor",  result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-213", date: "Sep 11", wo: "WO-1056", part: "Bracket, cable tray",     inspector: "M. Reyes",   result: "Scrap",  defect: "Wrong alloy material used",            disposition: "Scrapped batch, 6 pcs",                 rootCause: "Material certs not checked at setup; added to setup traveler." },
    { id: "NCR-212", date: "Sep 10", wo: "WO-0995", part: "Motor mount plate",       inspector: "T. Marsh",   result: "Pass",   defect: "—",                                     disposition: "Released to shipping",                  rootCause: "—" },
    { id: "NCR-211", date: "Sep 8",  wo: "WO-0991", part: "Pivot pin, hardened",     inspector: "R. Okafor",  result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-210", date: "Sep 5",  wo: "WO-0982", part: "Pallet support weldment", inspector: "D. Alvarez", result: "Rework", defect: "Undercut on longitudinal weld",         disposition: "Weld repaired and re-inspected",        rootCause: "Travel speed excessive; welding parameters reviewed with operator." },
    { id: "NCR-209", date: "Sep 3",  wo: "WO-0988", part: "Shield plate, lower",     inspector: "M. Reyes",   result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-208", date: "Sep 1",  wo: "WO-1044", part: "Shaft collar, 1.25in",    inspector: "R. Okafor",  result: "Pass",   defect: "—",                                     disposition: "Released to next op",                   rootCause: "—" },
    { id: "NCR-207", date: "Aug 29", wo: "WO-1020", part: "Skid base weldment",      inspector: "D. Alvarez", result: "Rework", defect: "Gap exceeds tolerance at joint B",      disposition: "Reweld joint B",                        rootCause: "Fixture wear; shimmed and re-qualified fixture." },
  ];

  var INVENTORY = [
    { sku: "STL-PL-3803",    desc: "A36 steel plate, 3/8\"",      onHand:  240, unit: "sq ft", reorder:  400, status: "Critical", supplier: "Rondell Metals",        lead:  9, lastRecv: "Sep 8",  unitCost:  4.20, usedBy: ["WO-1038"] },
    { sku: "STL-PL-1403",    desc: "A36 steel plate, 1/4\"",      onHand:  610, unit: "sq ft", reorder:  500, status: "Low",      supplier: "Rondell Metals",        lead:  9, lastRecv: "Sep 15", unitCost:  3.10, usedBy: ["WO-1029","WO-1053"] },
    { sku: "STL-PL-3163",    desc: "A36 steel plate, 3/16\"",     onHand:  820, unit: "sq ft", reorder:  600, status: "OK",       supplier: "Rondell Metals",        lead:  9, lastRecv: "Sep 18", unitCost:  2.60, usedBy: ["WO-0988","WO-0982"] },
    { sku: "AL-PL-6061-12",  desc: "AL-6061 plate, 1/2\"",        onHand:  180, unit: "sq ft", reorder:  150, status: "OK",       supplier: "Bayfield Aluminum",     lead:  6, lastRecv: "Sep 19", unitCost:  8.50, usedBy: ["WO-1042","WO-0995"] },
    { sku: "AL-PL-6061-14",  desc: "AL-6061 plate, 1/4\"",        onHand:   95, unit: "sq ft", reorder:  150, status: "Low",      supplier: "Bayfield Aluminum",     lead:  6, lastRecv: "Sep 10", unitCost:  7.20, usedBy: ["WO-1046"] },
    { sku: "AL-PL-6061-316", desc: "AL-6061 plate, 3/16\"",       onHand:  310, unit: "sq ft", reorder:  200, status: "OK",       supplier: "Bayfield Aluminum",     lead:  6, lastRecv: "Sep 21", unitCost:  6.80, usedBy: ["WO-1048"] },
    { sku: "SS-COIL-304-14", desc: "Stainless 304 coil, 14ga",    onHand: 1120, unit: "lb",    reorder:  800, status: "OK",       supplier: "Northwind Steel Supply",lead: 12, lastRecv: "Sep 12", unitCost:  3.90, usedBy: ["WO-1035","WO-1040","WO-1056"] },
    { sku: "TUBE-SQ-11-1",   desc: "Sq. tube 1x1, 11ga",          onHand:  340, unit: "ft",    reorder:  250, status: "OK",       supplier: "Rondell Metals",        lead:  9, lastRecv: "Sep 5",  unitCost:  1.85, usedBy: ["WO-1031","WO-1033"] },
    { sku: "TUBE-SQ-11-2",   desc: "Sq. tube 2x2, 11ga",          onHand:  155, unit: "ft",    reorder:  200, status: "Low",      supplier: "Rondell Metals",        lead:  9, lastRecv: "Sep 3",  unitCost:  3.40, usedBy: ["WO-1057"] },
    { sku: "TUBE-SQ-14-3",   desc: "Sq. tube 3x3, 1/4\"",         onHand:   88, unit: "ft",    reorder:  120, status: "Critical", supplier: "Rondell Metals",        lead:  9, lastRecv: "Aug 28", unitCost:  7.20, usedBy: ["WO-1020"] },
    { sku: "WIRE-ER70S6",    desc: "MIG wire ER70S-6, .035",      onHand:    4, unit: "spool", reorder:    8, status: "Critical", supplier: "Praxis Welding Supply", lead:  4, lastRecv: "Sep 2",  unitCost: 42.00, usedBy: ["WO-1031","WO-1033","WO-1020"] },
    { sku: "HK-118",         desc: "Hardware kit, control panel", onHand:   52, unit: "kit",   reorder:   40, status: "OK",       supplier: "Voss Automation (KD)",  lead: 15, lastRecv: "Aug 29", unitCost: 18.50, usedBy: ["WO-1015"] },
    { sku: "HK-104",         desc: "Hardware kit, hinge assy",    onHand:  110, unit: "kit",   reorder:   80, status: "OK",       supplier: "Voss Automation (KD)",  lead: 15, lastRecv: "Sep 16", unitCost: 12.00, usedBy: ["WO-1009"] },
    { sku: "HK-122",         desc: "Hardware kit, relay panel",   onHand:   14, unit: "kit",   reorder:   20, status: "Low",      supplier: "Voss Automation (KD)",  lead: 15, lastRecv: "Sep 5",  unitCost: 31.00, usedBy: ["WO-1059"] },
    { sku: "PC-BLK-RAL9005", desc: "Powder coat, black RAL9005",  onHand:   60, unit: "lb",    reorder:   50, status: "OK",       supplier: "Praxis Coatings",       lead:  7, lastRecv: "Sep 14", unitCost:  8.00, usedBy: ["WO-0998"] },
    { sku: "FAST-M6-SHCS",   desc: "M6x16 socket head cap screw", onHand:  640, unit: "pc",    reorder: 1000, status: "Low",      supplier: "Praxis Welding Supply", lead:  3, lastRecv: "Sep 20", unitCost:  0.18, usedBy: ["WO-1009","WO-1015"] },
  ];

  var PURCHASE_ORDERS = [
    { id: "PO-2291", sku: "STL-PL-3803",    desc: "A36 steel plate, 3/8\"",     supplier: "Rondell Metals",         qty: 600,  unit: "sq ft", status: "Sent",               orderDate: "Sep 20", expectedDate: "Sep 29", notes: "Rush — WO-1038 blocked on stock" },
    { id: "PO-2289", sku: "TUBE-SQ-14-3",   desc: "Sq. tube 3x3, 1/4\"",        supplier: "Rondell Metals",         qty: 200,  unit: "ft",    status: "Sent",               orderDate: "Sep 19", expectedDate: "Oct 3",  notes: "" },
    { id: "PO-2285", sku: "WIRE-ER70S6",    desc: "MIG wire ER70S-6, .035",     supplier: "Praxis Welding Supply",  qty: 12,   unit: "spool", status: "Partially received", orderDate: "Sep 15", expectedDate: "Sep 25", notes: "4 of 12 spools received Sep 22" },
    { id: "PO-2280", sku: "AL-PL-6061-14",  desc: "AL-6061 plate, 1/4\"",       supplier: "Bayfield Aluminum",      qty: 300,  unit: "sq ft", status: "Draft",              orderDate: "Sep 27", expectedDate: "Oct 5",  notes: "" },
    { id: "PO-2271", sku: "SS-COIL-304-14", desc: "Stainless 304 coil, 14ga",   supplier: "Northwind Steel Supply", qty: 2000, unit: "lb",    status: "Received",           orderDate: "Aug 30", expectedDate: "Sep 12", notes: "Received Sep 11" },
    { id: "PO-2268", sku: "HK-122",         desc: "Hardware kit, relay panel",  supplier: "Voss Automation (KD)",   qty: 30,   unit: "kit",   status: "Draft",              orderDate: "Sep 26", expectedDate: "Oct 15", notes: "" },
  ];

  var OPT_INSPECTORS = ["M. Reyes", "D. Alvarez", "T. Marsh", "R. Okafor", "S. Lund", "J. Pinto"];
  var OPT_RESULTS    = ["Pass", "Rework", "Scrap"];
  var OPT_UNITS      = ["sq ft", "lb", "ft", "spool", "kit", "pc", "each", "roll", "sheet", "yd"];

  var HIST_THROUGHPUT = [7, 9, 5, 11, 8, 12, 6];
  var HIST_PASS_RATE  = [88, 91, 85, 94, 89, 82, 90];
  var WEEK_LABELS     = ["Wk 35","Wk 36","Wk 37","Wk 38","Wk 39","Wk 40","Wk 41","Wk 42"];

  function buildWeeklyData() {
    var done = JOBS.filter(function(j){return j.status==="Complete";}).length;
    var rq   = QUALITY.slice(0, 6);
    var rate = Math.round(rq.filter(function(q){return q.result==="Pass";}).length / rq.length * 100);
    return {
      throughput: WEEK_LABELS.map(function(w,i){return{week:w,value:i<7?HIST_THROUGHPUT[i]:done};}),
      passRate:   WEEK_LABELS.map(function(w,i){return{week:w,value:i<7?HIST_PASS_RATE[i]:rate};}),
    };
  }

  var STATUS_TONE = {
    "Blocked":   "critical", "Critical": "critical", "Scrap":    "critical",
    "In progress":"warn",    "Low":      "warn",      "Rework":   "warn",
    "Complete":  "ok",       "OK":       "ok",        "Pass":     "ok",
    "Scheduled": "neutral",
    "Awaiting shipment": "warn", "Shipped": "ok", "Moved to next operation": "ok",
    "Draft": "neutral", "Sent": "neutral", "Partially received": "warn", "Received": "ok",
  };

  // ─── Date helpers ─────────────────────────────────────────────────────────────

  var TODAY = new Date(2026, 8, 29);
  var MONTH_IDX = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};

  function parseDue(s) {
    if (!s) return null;
    var p = s.trim().split(" ");
    var m = MONTH_IDX[p[0]], d = parseInt(p[1], 10);
    return (m != null && !isNaN(d)) ? new Date(2026, m, d) : null;
  }

  function daysUntil(dueStr) {
    var d = parseDue(dueStr);
    return d ? Math.round((d - TODAY) / 86400000) : null;
  }

  function daysAgo(dateStr) {
    var d = parseDue(dateStr);
    return d ? Math.round((TODAY - d) / 86400000) : null;
  }

  function daysHtml(n) {
    if (n === null) return '<span class="days-ok">—</span>';
    if (n < 0)  return '<span class="days-late">' + Math.abs(n) + 'd late</span>';
    if (n === 0) return '<span class="days-late">Today</span>';
    if (n <= 3) return '<span class="days-soon">+' + n + 'd</span>';
    return '<span class="days-ok">+' + n + 'd</span>';
  }

  // ─── State ────────────────────────────────────────────────────────────────────

  var noteStore      = Object.create(null);
  var attachStore    = Object.create(null);
  var currentDept    = null;
  var currentPage    = "home";
  var currentWO      = null;
  var currentMaterial= null;
  var currentCustomer= null;
  var navHistory     = [];
  var attnSort       = "urgency";
  var qualFilter     = "All";
  var invFilter      = "All";
  var invActiveTab   = "materials";
  var dateRange      = 30;

  // ─── Utils ───────────────────────────────────────────────────────────────────

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function chip(text) {
    return '<span class="chip ' + (STATUS_TONE[text] || "neutral") + '">' + text + "</span>";
  }

  function sel(id) { return document.getElementById(id); }

  function ff(label, inputHtml, wide) {
    return '<div class="form-group' + (wide ? " form-group--wide" : "") + '">' +
      '<label class="form-label">' + label + '</label>' + inputHtml + '</div>';
  }

  function mkSelect(id, options, placeholder) {
    var o = placeholder ? '<option value="">' + placeholder + '</option>' : "";
    options.forEach(function(v){ o += '<option>' + v + '</option>'; });
    return '<select class="form-input" id="' + id + '">' + o + '</select>';
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function findJob(wo) {
    for (var i = 0; i < JOBS.length; i++) { if (JOBS[i].wo === wo) return JOBS[i]; }
    return null;
  }

  function findMaterial(sku) {
    for (var i = 0; i < INVENTORY.length; i++) { if (INVENTORY[i].sku === sku) return INVENTORY[i]; }
    return null;
  }

  // Entity link helpers — event delegation handles clicks
  function woLink(wo, label) {
    return '<button class="wo-link" data-wo="' + esc(wo) + '">' + esc(label || wo) + '</button>';
  }
  function matLink(sku, label) {
    return '<button class="mat-link" data-sku="' + esc(sku) + '">' + esc(label || sku) + '</button>';
  }
  function customerLink(name) {
    return '<button class="customer-link" data-customer="' + esc(name) + '">' + esc(name) + '</button>';
  }

  // ─── SVG Charts ──────────────────────────────────────────────────────────────

  function svgBarChart(data, colorExpr) {
    var W=580,H=210,pL=42,pR=16,pT=18,pB=40,cW=W-pL-pR,cH=H-pT-pB;
    var maxV=Math.max.apply(null,data.map(function(d){return d.value;}))||10;
    maxV=Math.ceil(maxV/5)*5;
    var n=data.length,slotW=cW/n,barW=Math.min(slotW*0.55,44);
    var grid="",bars="",labels="";
    for(var s=0;s<=4;s++){
      var gy=pT+cH-(cH*s/4);
      grid+='<line x1="'+pL+'" y1="'+gy.toFixed(1)+'" x2="'+(pL+cW)+'" y2="'+gy.toFixed(1)+'" style="stroke:var(--border);stroke-width:1"/>';
      grid+='<text x="'+(pL-6)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" style="font-size:10px;fill:var(--text-muted);font-family:IBM Plex Mono,monospace">'+Math.round(maxV/4*s)+'</text>';
    }
    data.forEach(function(d,i){
      var bx=pL+i*slotW+(slotW-barW)/2,bh=Math.max(d.value/maxV*cH,2),by=pT+cH-bh;
      bars+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+barW.toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="3" style="fill:'+colorExpr+';opacity:0.82"/>';
      labels+='<text x="'+(bx+barW/2).toFixed(1)+'" y="'+(pT+cH+15)+'" text-anchor="middle" style="font-size:10px;fill:var(--text-muted);font-family:IBM Plex Sans,sans-serif">'+d.week+'</text>';
    });
    return '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">'+grid+bars+labels+'</svg>';
  }

  function svgLineChart(data,colorExpr,gradId){
    var W=540,H=190,pL=46,pR=16,pT=16,pB=40,cW=W-pL-pR,cH=H-pT-pB,minV=65,maxV=100,range=maxV-minV,n=data.length;
    var grid="";
    [70,80,90,100].forEach(function(v){
      var gy=pT+cH-((v-minV)/range*cH);
      grid+='<line x1="'+pL+'" y1="'+gy.toFixed(1)+'" x2="'+(pL+cW)+'" y2="'+gy.toFixed(1)+'" style="stroke:var(--border);stroke-width:1"/>';
      grid+='<text x="'+(pL-6)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" style="font-size:10px;fill:var(--text-muted);font-family:IBM Plex Mono,monospace">'+v+'%</text>';
    });
    var pts=data.map(function(d,i){return[pL+(i/(n-1))*cW,pT+cH-((d.value-minV)/range*cH)];});
    var line=pts.map(function(p,i){return(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1);}).join(" ");
    var area=line+" L"+pts[n-1][0].toFixed(1)+","+(pT+cH)+" L"+pts[0][0].toFixed(1)+","+(pT+cH)+" Z";
    var dots=pts.map(function(p){return'<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.5" style="fill:'+colorExpr+'"/>';}).join("");
    var labs=data.map(function(d,i){return'<text x="'+(pL+(i/(n-1))*cW).toFixed(1)+'" y="'+(pT+cH+15)+'" text-anchor="middle" style="font-size:10px;fill:var(--text-muted);font-family:IBM Plex Sans,sans-serif">'+d.week+'</text>';}).join("");
    return '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">'+
      '<defs><linearGradient id="'+gradId+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:'+colorExpr+';stop-opacity:0.18"/><stop offset="100%" style="stop-color:'+colorExpr+';stop-opacity:0.02"/></linearGradient></defs>'+
      grid+'<path d="'+area+'" style="fill:url(#'+gradId+')"/><path d="'+line+'" style="stroke:'+colorExpr+';stroke-width:2;fill:none"/>'+dots+labs+'</svg>';
  }

  function svgDonutChart(segments){
    var cx=110,cy=110,R=84,r=54,total=segments.reduce(function(s,sg){return s+sg.value;},0);
    if(!total) return '<svg viewBox="0 0 220 220" style="width:100%;height:auto;display:block"><text x="110" y="115" text-anchor="middle" style="fill:var(--text-muted);font-size:13px">No data</text></svg>';
    var slices="",angle=-Math.PI/2;
    segments.forEach(function(sg){
      if(!sg.value) return;
      var sw=(sg.value/total)*Math.PI*2;
      var x1=cx+R*Math.cos(angle),y1=cy+R*Math.sin(angle);
      var x2=cx+R*Math.cos(angle+sw),y2=cy+R*Math.sin(angle+sw);
      var xi1=cx+r*Math.cos(angle),yi1=cy+r*Math.sin(angle);
      var xi2=cx+r*Math.cos(angle+sw),yi2=cy+r*Math.sin(angle+sw);
      slices+='<path d="M '+x1.toFixed(2)+' '+y1.toFixed(2)+' A '+R+' '+R+' 0 '+(sw>Math.PI?1:0)+' 1 '+x2.toFixed(2)+' '+y2.toFixed(2)+' L '+xi2.toFixed(2)+' '+yi2.toFixed(2)+' A '+r+' '+r+' 0 '+(sw>Math.PI?1:0)+' 0 '+xi1.toFixed(2)+' '+yi1.toFixed(2)+' Z" style="fill:'+sg.color+';opacity:0.88"/>';
      angle+=sw;
    });
    return '<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;max-height:220px">'+slices+
      '<text x="'+cx+'" y="'+(cy-5)+'" text-anchor="middle" style="font-size:26px;font-weight:700;fill:var(--text);font-family:IBM Plex Mono,monospace">'+total+'</text>'+
      '<text x="'+cx+'" y="'+(cy+15)+'" text-anchor="middle" style="font-size:11px;fill:var(--text-muted);font-family:IBM Plex Sans,sans-serif">open WOs</text></svg>';
  }

  // ─── Home ─────────────────────────────────────────────────────────────────────

  function renderHome() {
    // Date-filtered KPIs
    var qualHolds = QUALITY.filter(function(q) {
      if (q.result === "Pass") return false;
      var ago = daysAgo(q.date);
      return ago !== null && ago <= dateRange;
    }).length;
    var duePeriod = JOBS.filter(function(j) {
      if (j.status === "Complete") return false;
      var d = daysUntil(j.due);
      return d !== null && d >= -3 && d <= dateRange;
    }).length;

    // Always-current KPIs
    var atRisk  = JOBS.filter(function(j){return j.status==="Blocked";}).length;
    var matShort= INVENTORY.filter(function(m){return m.status!=="OK";}).length;

    var periodLabel = dateRange + "d";

    sel("homeKPIs").innerHTML =
      hKpi("Jobs at risk", atRisk, atRisk>0?"critical":"ok",
        "blocked · current state",
        "Work orders with status = Blocked right now. Not date-filtered — reflects current shop floor state.") +
      hKpi("Material shortages", matShort, matShort>3?"critical":matShort>0?"warn":"ok",
        "Low or Critical · current",
        "Inventory items currently below or approaching reorder threshold. Not date-filtered — always current.") +
      hKpi("Quality holds", qualHolds, qualHolds>3?"critical":qualHolds>0?"warn":"ok",
        "non-pass · last " + periodLabel,
        "NCR records with result = Rework or Scrap opened in the selected period. Denominator = all NCRs in that window.") +
      hKpi("Due in " + periodLabel, duePeriod, duePeriod>8?"warn":"",
        "open jobs, next " + dateRange + " days",
        "Open work orders with due dates falling within the next " + dateRange + " days (includes recently overdue). Updated by period filter.");

    renderAttentionQueue();

    var weekly = buildWeeklyData();
    sel("chartThroughput").innerHTML = svgBarChart(weekly.throughput, "var(--accent)");

    var openJobs = JOBS.filter(function(j){return j.status!=="Complete";});
    var byStatus = {};
    openJobs.forEach(function(j){byStatus[j.status]=(byStatus[j.status]||0)+1;});
    var segs = [
      {label:"Scheduled",   value:byStatus["Scheduled"]  ||0, color:"var(--text-muted)"},
      {label:"In progress", value:byStatus["In progress"]||0, color:"var(--warn)"},
      {label:"Blocked",     value:byStatus["Blocked"]    ||0, color:"var(--critical)"},
    ];
    sel("chartDonut").innerHTML = svgDonutChart(segs);
    sel("donutLegend").innerHTML = segs.map(function(s){
      return '<div class="legend-item"><span class="legend-dot" style="background:'+s.color+'"></span><span class="legend-label">'+s.label+'</span><span class="legend-val mono">'+s.value+'</span></div>';
    }).join("");
    sel("chartQuality").innerHTML = svgLineChart(weekly.passRate, "var(--ok)", "qualGrad");
  }

  function hKpi(label, value, tone, foot, tooltip) {
    return '<div class="home-kpi">' +
      '<div class="label">' + esc(label) + (tooltip ? '<span class="metric-def" title="' + esc(tooltip) + '">&#x24D8;</span>' : '') + '</div>' +
      '<div class="value' + (tone ? " " + tone : "") + '">' + value + '</div>' +
      '<div class="foot">' + esc(foot) + '</div>' +
      '</div>';
  }

  // ─── Attention queue ─────────────────────────────────────────────────────────

  function buildAttnItems() {
    var items = [];
    JOBS.filter(function(j){return j.status==="Blocked";}).forEach(function(j){
      var days = daysUntil(j.due);
      items.push({
        tone:"critical", title:j.wo+" — "+j.part, sub:j.notes||("Blocked on "+j.line),
        typeLabel:"Blocked", owner:j.operator!=="Unassigned"?j.operator:j.line,
        customer:j.customer, due:j.due, days:days,
        urgency:days!==null&&days<0?100:85, isUrgent:true,
        actionLabel:"View job", onOpen:function(){openWODetail(j,"Home");}
      });
    });
    QUALITY.filter(function(q){return q.result!=="Pass";}).forEach(function(q){
      var job = findJob(q.wo);
      var days = job ? daysUntil(job.due) : null;
      items.push({
        tone:q.result==="Scrap"?"critical":"warn",
        title:q.id+" — "+q.part, sub:q.defect!=="—"?q.defect:q.disposition,
        typeLabel:q.result, owner:q.inspector,
        customer:job?job.customer:"—", due:job?job.due:"—", days:days,
        urgency:q.result==="Scrap"?75:50, isUrgent:q.result==="Scrap",
        actionLabel:"View NCR", onOpen:function(){openQuality(q);}
      });
    });
    INVENTORY.filter(function(m){return m.status==="Critical";}).forEach(function(m){
      var affected = JOBS.filter(function(j){return m.usedBy.indexOf(j.wo)>=0&&j.status!=="Complete";});
      var customers = affected.map(function(j){return j.customer;}).filter(function(v,i,a){return a.indexOf(v)===i;});
      items.push({
        tone:"critical", title:m.desc,
        sub:m.sku+" · "+m.onHand+" "+m.unit+" on hand · reorder at "+m.reorder,
        typeLabel:"Critical stock", owner:m.supplier,
        customer:customers.length?customers.join(", "):"—",
        due:"Order now", days:-m.lead, urgency:70, isUrgent:true,
        actionLabel:"View material", onOpen:function(){openMaterialDetail(m,"Home");}
      });
    });
    INVENTORY.filter(function(m){return m.status==="Low";}).forEach(function(m){
      var affected = JOBS.filter(function(j){return m.usedBy.indexOf(j.wo)>=0&&j.status!=="Complete";});
      if (!affected.length) return;
      var customers = affected.map(function(j){return j.customer;}).filter(function(v,i,a){return a.indexOf(v)===i;});
      items.push({
        tone:"warn", title:m.desc,
        sub:m.sku+" · approaching reorder ("+m.onHand+"/"+m.reorder+" "+m.unit+")",
        typeLabel:"Low stock", owner:m.supplier,
        customer:customers.join(", "), due:"Order soon", days:5,
        urgency:40, isUrgent:false,
        actionLabel:"View material", onOpen:function(){openMaterialDetail(m,"Home");}
      });
    });
    return items;
  }

  function renderAttentionQueue() {
    var items = buildAttnItems();
    sel("attnCount").textContent = items.length;
    var sorted = items.slice();
    if (attnSort==="urgency") sorted.sort(function(a,b){return b.urgency-a.urgency||(a.days||0)-(b.days||0);});
    else if (attnSort==="due") sorted.sort(function(a,b){return(a.days||999)-(b.days||999);});
    else sorted.sort(function(a,b){return a.customer.localeCompare(b.customer);});

    if (!sorted.length) {
      sel("attnTableWrap").innerHTML='<div class="attn-empty">No active issues — all clear.</div>'; return;
    }
    var html='<table class="attn-table"><thead><tr>'+
      '<th></th><th>Issue</th><th>Type</th>'+
      '<th class="attn-col-owner">Owner</th>'+
      '<th class="attn-col-customer">Customer</th>'+
      '<th>Due</th><th>Days</th><th></th>'+
      '</tr></thead><tbody>';
    sorted.forEach(function(it,i){
      var dayCell = (it.due==="Order now"||it.due==="Order soon")
        ? '<span class="days-late">'+esc(it.due)+'</span>'
        : daysHtml(it.days);
      html+='<tr data-attn-idx="'+i+'">'+
        '<td class="td-accent"><div class="td-accent-bar '+it.tone+'"></div></td>'+
        '<td><div class="issue-title">'+esc(it.title)+'</div><div class="issue-sub">'+esc(it.sub)+'</div></td>'+
        '<td>'+chip(it.typeLabel)+'</td>'+
        '<td class="attn-col-owner" style="font-size:13px;color:var(--text-muted)">'+esc(it.owner)+'</td>'+
        '<td class="attn-col-customer" style="font-size:13px">'+customerLink(it.customer)+'</td>'+
        '<td style="font-size:13px;font-family:\'IBM Plex Mono\',monospace">'+esc(it.due)+'</td>'+
        '<td class="td-days">'+dayCell+'</td>'+
        '<td><button class="attn-action-btn'+(it.isUrgent?" urgent":"")+'">'+esc(it.actionLabel)+'</button></td>'+
        '</tr>';
    });
    html += '</tbody></table>';
    sel("attnTableWrap").innerHTML = html;

    sel("attnTableWrap").querySelectorAll("tr[data-attn-idx]").forEach(function(tr){
      var idx = parseInt(tr.getAttribute("data-attn-idx"), 10);
      tr.addEventListener("click", function(e){
        if (e.target.closest(".attn-action-btn")||e.target.closest(".customer-link")) return;
        sorted[idx].onOpen();
      });
      var btn = tr.querySelector(".attn-action-btn");
      if (btn) btn.addEventListener("click", function(e){ e.stopPropagation(); sorted[idx].onOpen(); });
    });
  }

  // ─── Date range filter ────────────────────────────────────────────────────────

  sel("dateRangeBar").querySelectorAll(".range-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      dateRange = parseInt(btn.getAttribute("data-days"), 10);
      sel("dateRangeBar").querySelectorAll(".range-btn").forEach(function(b){b.classList.remove("active");});
      btn.classList.add("active");
      renderHome();
    });
  });

  sel("attnSortBar").querySelectorAll(".sort-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      attnSort = btn.getAttribute("data-sort");
      sel("attnSortBar").querySelectorAll(".sort-btn").forEach(function(b){b.classList.remove("active");});
      btn.classList.add("active");
      renderAttentionQueue();
    });
  });

  // ─── Work Center Queue ────────────────────────────────────────────────────────

  function renderDeptGrid() {
    var grid = sel("deptGrid"); grid.innerHTML = "";
    DEPARTMENTS.forEach(function(dept){
      var dj   = JOBS.filter(function(j){return dept.lines.indexOf(j.line)>=0;});
      var open = dj.filter(function(j){return j.status!=="Complete";});
      var inP  = open.filter(function(j){return j.status==="In progress";});
      var blk  = open.filter(function(j){return j.status==="Blocked";});
      var card = el("button","dept-card");
      card.innerHTML=
        '<div class="dept-name">'+esc(dept.name)+'</div>'+
        '<div class="dept-lines mono">'+dept.lines.join(" &middot; ")+'</div>'+
        '<div class="dept-kpis">'+
          '<div class="dept-kpi"><span class="dkpi-val">'+open.length+'</span><span class="dkpi-lbl">open</span></div>'+
          '<div class="dept-kpi"><span class="dkpi-val warn">'+inP.length+'</span><span class="dkpi-lbl">in progress</span></div>'+
          '<div class="dept-kpi"><span class="dkpi-val critical">'+blk.length+'</span><span class="dkpi-lbl">blocked</span></div>'+
        '</div>'+
        '<div class="dept-status-bar">'+buildSchedBar(open)+'</div>';
      card.addEventListener("click", function(){enterDept(dept);});
      grid.appendChild(card);
    });
    renderRecentCompletions();
  }

  function renderRecentCompletions() {
    var completed = JOBS.filter(function(j){return j.status==="Complete";}).slice(0,5);
    var wrap = sel("recentCompletions"); if (!wrap) return;
    if (!completed.length) { wrap.innerHTML=""; return; }
    var html='<div class="recent-completions-wrap">'+
      '<div class="recent-completions-title">Recent completions</div>'+
      '<div class="table-wrap"><table><thead><tr>'+
      '<th>Work order</th><th>Part</th><th>Customer</th><th>Line</th><th>Due</th>'+
      '</tr></thead><tbody>';
    completed.forEach(function(j){
      html+='<tr class="row-btn" data-wo="'+esc(j.wo)+'">'+
        '<td class="mono">'+woLink(j.wo)+'</td>'+
        '<td>'+esc(j.part)+'</td>'+
        '<td>'+customerLink(j.customer)+'</td>'+
        '<td class="mono cell-muted">'+esc(j.line)+'</td>'+
        '<td class="mono cell-muted">'+esc(j.due)+'</td>'+
        '</tr>';
    });
    html+='</tbody></table></div></div>';
    wrap.innerHTML = html;
    wrap.querySelectorAll("tr.row-btn[data-wo]").forEach(function(tr){
      tr.addEventListener("click", function(e){
        if (e.target.closest(".wo-link")||e.target.closest(".customer-link")) return;
        var j = findJob(tr.getAttribute("data-wo"));
        if (j) openWODetail(j, "Work Center Queue");
      });
    });
  }

  function buildSchedBar(jobs) {
    var total=jobs.length; if(!total) return '<div class="sbar"></div>';
    var s=0,p=0,b=0;
    jobs.forEach(function(j){if(j.status==="Scheduled")s++;else if(j.status==="In progress")p++;else if(j.status==="Blocked")b++;});
    return '<div class="sbar">'+
      (s?'<span class="sbar-seg neutral" style="width:'+(s/total*100).toFixed(1)+'%"></span>':'')+
      (p?'<span class="sbar-seg warn"    style="width:'+(p/total*100).toFixed(1)+'%"></span>':'')+
      (b?'<span class="sbar-seg critical" style="width:'+(b/total*100).toFixed(1)+'%"></span>':'')+
      '</div>';
  }

  function enterDept(dept) {
    currentDept=dept; sel("deptGrid").hidden=true;
    sel("recentCompletions").hidden=true; sel("deptBoard").hidden=false;
    sel("deptBreadcrumbName").textContent=dept.name; renderBoard(dept.lines);
  }
  function exitDept() {
    currentDept=null; sel("deptGrid").hidden=false;
    if (sel("recentCompletions")) sel("recentCompletions").hidden=false;
    sel("deptBoard").hidden=true;
  }

  function renderBoard(lines) {
    var board=sel("board"); board.innerHTML="";
    lines.forEach(function(line){
      var jobs = JOBS.filter(function(j){return j.line===line;});
      var lane = el("div","lane");
      lane.innerHTML='<div class="lane-head"><span class="lname">'+esc(line)+'</span><span class="lcount mono">'+jobs.length+"</span></div>";
      var body = el("div","lane-body");
      jobs.forEach(function(j){
        var card = el("button","card");
        var obTag = (j.status==="Complete" && j.outboundStatus && j.outboundStatus!=="n/a")
          ? '<span class="outbound-tag '+(j.outboundStatus==="Shipped"?"shipped":"awaiting")+'">'+
            esc(j.outboundStatus)+(j.shipDate?" · "+esc(j.shipDate):"")+'</span>'
          : "";
        card.innerHTML='<span class="wo"><span>'+esc(j.wo)+"</span>"+chip(j.status)+"</span>"+
          '<span class="part">'+esc(j.part)+"</span>"+
          '<span class="meta"><span>'+esc(j.customer)+'</span><span>'+esc(j.due)+"</span></span>"+
          obTag;
        card.addEventListener("click", function(){ openWODetail(j, "Work Center Queue · " + line); });
        body.appendChild(card);
      });
      lane.appendChild(body); board.appendChild(lane);
    });
  }

  // ─── Quality filter + table ───────────────────────────────────────────────────

  function renderQualFilterPills() {
    var counts={"All":QUALITY.length,"Pass":0,"Rework":0,"Scrap":0};
    QUALITY.forEach(function(q){counts[q.result]=(counts[q.result]||0)+1;});
    var defs=[{label:"All",cls:""},{label:"Pass",cls:"pill-ok"},{label:"Rework",cls:"pill-warn"},{label:"Scrap",cls:"pill-crit"}];
    sel("qualFilterPills").innerHTML=defs.map(function(p){
      return '<button class="filter-pill '+p.cls+(qualFilter===p.label?" active":"")
        +'" data-filter="'+p.label+'">'+p.label+' <span class="pill-count">'+(counts[p.label]||0)+'</span></button>';
    }).join("");
    sel("qualFilterPills").querySelectorAll(".filter-pill").forEach(function(btn){
      btn.addEventListener("click",function(){
        qualFilter=btn.getAttribute("data-filter");
        renderQualFilterPills(); renderQualityTable();
      });
    });
  }

  function renderQualityTable() {
    var body=sel("qualityBody"); body.innerHTML="";
    var search=(sel("qualSearch")&&sel("qualSearch").value||"").trim().toLowerCase();
    var rows=QUALITY.filter(function(q){
      if(qualFilter!=="All"&&q.result!==qualFilter) return false;
      if(search) return q.id.toLowerCase().indexOf(search)>=0||q.wo.toLowerCase().indexOf(search)>=0||
                        q.part.toLowerCase().indexOf(search)>=0||q.inspector.toLowerCase().indexOf(search)>=0;
      return true;
    });
    if(!rows.length){
      var empty=el("tr"); empty.innerHTML='<td colspan="6" style="text-align:center;color:var(--text-muted);padding:20px">No records match the filter.</td>';
      body.appendChild(empty); return;
    }
    rows.forEach(function(q){
      var tr=el("tr","row-btn");
      tr.innerHTML='<td class="mono cell-muted">'+esc(q.date)+'</td><td class="mono">'+esc(q.id)+'</td>'+
        '<td class="mono">'+woLink(q.wo)+'</td><td>'+esc(q.part)+'</td>'+
        '<td>'+esc(q.inspector)+'</td><td>'+chip(q.result)+'</td>';
      tr.addEventListener("click",function(e){
        if(e.target.closest(".wo-link")) return;
        openQuality(q);
      });
      body.appendChild(tr);
    });
  }

  // ─── Inventory filter + table ─────────────────────────────────────────────────

  function renderInvFilterPills() {
    var counts={"All":INVENTORY.length,"OK":0,"Low":0,"Critical":0};
    INVENTORY.forEach(function(m){counts[m.status]=(counts[m.status]||0)+1;});
    var defs=[{label:"All",cls:""},{label:"OK",cls:"pill-ok"},{label:"Low",cls:"pill-warn"},{label:"Critical",cls:"pill-crit"}];
    sel("invFilterPills").innerHTML=defs.map(function(p){
      return '<button class="filter-pill '+p.cls+(invFilter===p.label?" active":"")
        +'" data-filter="'+p.label+'">'+p.label+' <span class="pill-count">'+(counts[p.label]||0)+'</span></button>';
    }).join("");
    sel("invFilterPills").querySelectorAll(".filter-pill").forEach(function(btn){
      btn.addEventListener("click",function(){
        invFilter=btn.getAttribute("data-filter");
        renderInvFilterPills(); renderInventoryTable();
      });
    });
  }

  function renderInventoryTable() {
    var body=sel("inventoryBody"); body.innerHTML="";
    var search=(sel("invSearch")&&sel("invSearch").value||"").trim().toLowerCase();
    var rows=INVENTORY.filter(function(m){
      if(invFilter!=="All"&&m.status!==invFilter) return false;
      if(search) return m.sku.toLowerCase().indexOf(search)>=0||m.desc.toLowerCase().indexOf(search)>=0||
                        m.supplier.toLowerCase().indexOf(search)>=0;
      return true;
    });
    if(!rows.length){
      var empty=el("tr"); empty.innerHTML='<td colspan="6" style="text-align:center;color:var(--text-muted);padding:20px">No items match the filter.</td>';
      body.appendChild(empty); return;
    }
    rows.forEach(function(m){
      var tr=el("tr","row-btn");
      tr.innerHTML='<td class="mono">'+matLink(m.sku)+'</td><td>'+esc(m.desc)+'</td>'+
        '<td class="mono">'+esc(m.onHand+" "+m.unit)+'</td>'+
        '<td class="mono cell-muted">'+esc(m.reorder+" "+m.unit)+'</td>'+
        '<td style="font-size:13px;color:var(--text-muted)">'+esc(m.supplier)+'</td>'+
        '<td>'+chip(m.status)+'</td>';
      tr.addEventListener("click",function(e){
        if(e.target.closest(".mat-link")) return;
        openMaterialDetail(m,"Inventory");
      });
      body.appendChild(tr);
    });
  }

  // ─── Purchase Orders ─────────────────────────────────────────────────────────

  function nextPOId() {
    var max = 0;
    PURCHASE_ORDERS.forEach(function(po){ var n=parseInt(po.id.replace("PO-",""),10); if(n>max)max=n; });
    return "PO-"+(max+1);
  }

  function renderPOTable() {
    var body = sel("poBody"); if (!body) return;
    body.innerHTML = "";
    if (!PURCHASE_ORDERS.length) {
      var empty = el("tr"); empty.innerHTML='<td colspan="8" style="text-align:center;color:var(--text-muted);padding:20px">No purchase orders.</td>';
      body.appendChild(empty); return;
    }
    PURCHASE_ORDERS.forEach(function(po){
      var tr = el("tr");
      tr.innerHTML =
        '<td class="mono">'+esc(po.id)+'</td>'+
        '<td>'+matLink(po.sku,po.sku)+'<div style="font-size:12px;color:var(--text-muted)">'+esc(po.desc)+'</div></td>'+
        '<td style="font-size:13px;color:var(--text-muted)">'+esc(po.supplier)+'</td>'+
        '<td class="mono">'+esc(po.qty+" "+po.unit)+'</td>'+
        '<td>'+chip(po.status)+'</td>'+
        '<td class="mono cell-muted">'+esc(po.orderDate)+'</td>'+
        '<td class="mono cell-muted">'+esc(po.expectedDate)+'</td>'+
        '<td style="font-size:12px;color:var(--text-muted)">'+esc(po.notes)+'</td>';
      body.appendChild(tr);
    });
  }

  function switchInvTab(tab) {
    invActiveTab = tab;
    sel("invTabs").querySelectorAll(".inv-tab").forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-invtab")===tab); });
    sel("materialsContent").hidden = (tab !== "materials");
    sel("poContent").hidden        = (tab !== "pos");
    sel("addInvBtn").hidden        = (tab !== "materials");
    sel("recvInvBtn").hidden       = (tab !== "materials");
    sel("createPOBtn").hidden      = (tab !== "pos");
    sel("invSectionTitle").textContent = (tab === "pos") ? "Purchase Orders" : "Materials on hand";
  }

  function openCreatePOModal(prefillSku) {
    var poId = nextPOId();
    var mat  = prefillSku ? findMaterial(prefillSku) : null;
    var skuOpts = INVENTORY.map(function(m){
      return '<option value="'+esc(m.sku)+'"'+(m.sku===prefillSku?" selected":"")+'>'+esc(m.sku)+' — '+esc(m.desc)+'</option>';
    }).join("");
    openModal("Create purchase order",
      '<div class="modal-form-grid">'+
        ff("PO number",'<input class="form-input" value="'+esc(poId)+'" readonly>',false)+
        ff("Material / SKU",'<select class="form-input" id="fpSku"><option value="">Select…</option>'+skuOpts+'</select>',true)+
        ff("Supplier",'<input class="form-input" id="fpSupplier" value="'+(mat?esc(mat.supplier):"")+'" placeholder="Supplier name">',false)+
        ff("Qty to order",'<input class="form-input" id="fpQty" type="number" min="1" value="'+(mat?mat.reorder:"")+'" placeholder="0">',false)+
        ff("Order date",'<input class="form-input" id="fpOrderDate" placeholder="e.g. Sep 29">',false)+
        ff("Expected date",'<input class="form-input" id="fpExpDate" placeholder="e.g. Oct 10">',false)+
        ff("Notes",'<input class="form-input" id="fpNotes" placeholder="Optional">',true)+
      '</div>'+
      '<div class="modal-actions"><button class="btn" id="modalCancel">Cancel</button>'+
      '<button class="btn primary" id="modalSave">Create PO</button></div>'
    );
    sel("fpSku").addEventListener("change", function(){
      var m2 = findMaterial(sel("fpSku").value);
      if (m2) { sel("fpSupplier").value=m2.supplier; sel("fpQty").value=m2.reorder; }
    });
    sel("modalCancel").addEventListener("click", closeModal);
    sel("modalSave").addEventListener("click", function(){
      var sku = sel("fpSku").value;
      if (!sku) { alert("Select a material."); return; }
      var m3 = findMaterial(sku);
      PURCHASE_ORDERS.unshift({
        id: poId, sku: sku, desc: m3?m3.desc:sku,
        supplier: sel("fpSupplier").value||"—",
        qty: parseFloat(sel("fpQty").value)||0,
        unit: m3?m3.unit:"—",
        status: "Draft",
        orderDate: sel("fpOrderDate").value||"—",
        expectedDate: sel("fpExpDate").value||"—",
        notes: sel("fpNotes").value||""
      });
      closeModal();
      renderPOTable();
    });
  }

  // ─── Settings ────────────────────────────────────────────────────────────────

  function renderSettings() {
    var wrap=sel("settingsLines"); if(!wrap) return; wrap.innerHTML="";
    DEPARTMENTS.forEach(function(dept){
      var g=document.createElement("div"); g.className="settings-dept-group";
      g.innerHTML='<div class="settings-dept-label">'+esc(dept.name)+'</div>'+
        '<div class="settings-lines-row">'+dept.lines.map(function(l){return'<span class="settings-line-tag">'+esc(l)+'</span>';}).join("")+'</div>';
      wrap.appendChild(g);
    });
  }

  // ─── WO Detail page ──────────────────────────────────────────────────────────

  function outboundCard(job) {
    var st = job.outboundStatus || "Awaiting shipment";
    var rows = dkv("Status", chip(st));
    if (job.shipDate) rows += dkv("Ship date", '<span class="mono">' + esc(job.shipDate) + '</span>');
    if (job.trackingRef) rows += dkv("Tracking / ref", '<span class="mono">' + esc(job.trackingRef) + '</span>');
    return '<div class="detail-card"><div class="detail-card-title">Outbound</div>' +
      '<div class="detail-kv-grid">' + rows + '</div></div>';
  }

  function openWODetail(job, backLabel) {
    pushHistory(backLabel || "Back");
    currentWO = job;
    renderWODetailPage(job);
  }

  function renderWODetailPage(job) {
    currentPage = "wo-detail";
    document.querySelectorAll(".page").forEach(function(p){p.hidden=p.getAttribute("data-page")!=="wo-detail";});
    document.querySelectorAll(".nav-item,.tabbar button").forEach(function(b){b.removeAttribute("aria-current");});
    sel("pageTitle").textContent = job.wo;
    sel("pageDesc").textContent = job.part + " · " + job.customer;
    window.scrollTo(0,0);

    // Back button
    var backLabel = navHistory.length ? navHistory[navHistory.length-1].label : "Back";
    sel("woDetailNav").innerHTML = '<button class="back-btn" id="woBackBtn">&#8592; '+esc(backLabel)+'</button>';
    sel("woBackBtn").addEventListener("click", goBack);

    // Related quality records for this job
    var relQual = QUALITY.filter(function(q){return q.wo===job.wo;});
    var qualHtml = relQual.length
      ? relQual.map(function(q){
          return '<div class="related-item" data-ncr="'+esc(q.id)+'">'+
            '<div class="related-item-left">'+
              '<div class="related-title">'+esc(q.id)+' &mdash; '+esc(q.result)+'</div>'+
              '<div class="related-sub">'+esc(q.date)+' · '+esc(q.inspector)+(q.defect!=="—"?" · "+esc(q.defect):"")+'</div>'+
            '</div>'+chip(q.result)+'</div>';
        }).join("")
      : '<div class="related-empty">No inspection records for this job.</div>';

    // Related materials
    var relMats = INVENTORY.filter(function(m){return m.usedBy.indexOf(job.wo)>=0;});
    var matsHtml = relMats.length
      ? relMats.map(function(m){
          return '<div class="related-item" data-sku="'+esc(m.sku)+'">'+
            '<div class="related-item-left">'+
              '<div class="related-title">'+matLink(m.sku)+'</div>'+
              '<div class="related-sub">'+esc(m.desc)+' · '+esc(m.onHand+" "+m.unit)+' on hand</div>'+
            '</div>'+chip(m.status)+'</div>';
        }).join("")
      : '<div class="related-empty">No materials cross-referenced.</div>';

    sel("woDetailContent").innerHTML =
      '<div class="detail-header">'+
        '<div class="detail-header-top">'+
          '<div>'+
            '<div class="detail-kicker">Work order</div>'+
            '<div class="detail-title">'+esc(job.wo)+'</div>'+
            '<div class="detail-subtitle">'+esc(job.part)+'</div>'+
          '</div>'+
          chip(job.status)+
        '</div>'+
        '<div class="detail-meta">'+
          metaItem("Customer", customerLink(job.customer))+
          metaItem("Production line", '<span class="mono" style="font-size:13px">'+esc(job.line)+'</span>')+
          metaItem("Quantity", job.qty+' '+esc("pc"))+
          metaItem("Due", esc(job.due))+
          metaItem("Priority", esc(job.priority))+
          metaItem("Operator", esc(job.operator))+
        '</div>'+
      '</div>'+
      '<div class="detail-body">'+
        '<div class="detail-col">'+
          '<div class="detail-card">'+
            '<div class="detail-card-title">Job details</div>'+
            '<div class="detail-kv-grid">'+
              dkv("Material / kit", esc(job.material)||"—")+
              dkv("Status", chip(job.status))+
              dkv("Priority", esc(job.priority))+
              dkv("Quantity", job.qty)+
              dkv("Operator", esc(job.operator))+
              dkv("Line", esc(job.line))+
            '</div>'+
            (job.notes?'<div style="margin-top:16px"><div class="detail-kv-label" style="margin-bottom:6px">Traveler note</div><div class="detail-notes">'+esc(job.notes)+'</div></div>':"")+
          '</div>'+
          '<div class="detail-card">'+
            '<div class="detail-card-title">Quality inspections</div>'+
            '<div class="related-list" id="woQualList">'+qualHtml+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="detail-col">'+
          '<div class="detail-card">'+
            '<div class="detail-card-title">Materials consumed</div>'+
            '<div class="related-list">'+matsHtml+'</div>'+
          '</div>'+
          (job.status==="Complete" ? outboundCard(job) : '')+
        '</div>'+
      '</div>';

    // Wire quality related items → open quality panel
    sel("woDetailContent").querySelectorAll(".related-item[data-ncr]").forEach(function(item){
      var ncr = item.getAttribute("data-ncr");
      item.addEventListener("click", function(e){
        if(e.target.closest(".mat-link")||e.target.closest(".wo-link")) return;
        var q = QUALITY.filter(function(x){return x.id===ncr;})[0];
        if(q) openQuality(q);
      });
    });
  }

  function metaItem(label, val) {
    return '<div class="detail-meta-item"><div class="detail-meta-label">'+esc(label)+'</div><div class="detail-meta-val">'+val+'</div></div>';
  }
  function dkv(label, val) {
    return '<div class="detail-kv"><div class="detail-kv-label">'+esc(label)+'</div><div class="detail-kv-val">'+val+'</div></div>';
  }

  // ─── Material Detail page ─────────────────────────────────────────────────────

  function openMaterialDetail(mat, backLabel) {
    pushHistory(backLabel || "Back");
    currentMaterial = mat;
    renderMaterialDetailPage(mat);
  }

  function renderMaterialDetailPage(mat) {
    currentPage = "material-detail";
    document.querySelectorAll(".page").forEach(function(p){p.hidden=p.getAttribute("data-page")!=="material-detail";});
    document.querySelectorAll(".nav-item,.tabbar button").forEach(function(b){b.removeAttribute("aria-current");});
    sel("pageTitle").textContent = mat.sku;
    sel("pageDesc").textContent = mat.desc + " · " + mat.supplier;
    window.scrollTo(0,0);

    var backLabel = navHistory.length ? navHistory[navHistory.length-1].label : "Back";
    sel("matDetailNav").innerHTML = '<button class="back-btn" id="matBackBtn">&#8592; '+esc(backLabel)+'</button>';
    sel("matBackBtn").addEventListener("click", goBack);

    // Jobs that use this material
    var usedByJobs = JOBS.filter(function(j){return mat.usedBy.indexOf(j.wo)>=0;});
    var usedHtml = usedByJobs.length
      ? usedByJobs.map(function(j){
          var days = daysUntil(j.due);
          return '<div class="related-item" data-wo="'+esc(j.wo)+'">'+
            '<div class="related-item-left">'+
              '<div class="related-title">'+woLink(j.wo)+'<span style="font-size:12px;color:var(--text-muted);margin-left:8px">'+esc(j.part)+'</span></div>'+
              '<div class="related-sub">'+esc(j.customer)+' · '+esc(j.line)+' · due '+esc(j.due)+'</div>'+
            '</div>'+
            '<div style="display:flex;align-items:center;gap:8px">'+daysHtml(days)+chip(j.status)+'</div>'+
          '</div>';
        }).join("")
      : '<div class="related-empty">Not linked to any work orders.</div>';

    // POs for this material
    var relPOs = PURCHASE_ORDERS.filter(function(po){ return po.sku === mat.sku; });
    var poHtml = relPOs.length
      ? relPOs.map(function(po){
          return '<div class="related-item"><div class="related-item-left">'+
            '<div class="related-title mono">'+esc(po.id)+'</div>'+
            '<div class="related-sub">'+esc(po.qty+" "+po.unit)+' · Exp. '+esc(po.expectedDate)+'</div>'+
            '</div>'+chip(po.status)+'</div>';
        }).join("")
      : '<div class="related-empty">No purchase orders for this material.</div>';

    // Fake receipt history
    var receipts = generateReceipts(mat, 3);
    var recHtml = receipts.map(function(r){
      return '<div class="receipt-row">'+
        '<div><span class="receipt-qty">'+r.qty+' '+esc(mat.unit)+'</span>'+
        '<div style="font-size:12px;color:var(--text-muted);margin-top:2px">'+esc(r.date)+'</div></div>'+
        '<span class="receipt-ref">'+esc(r.ref)+'</span>'+
      '</div>';
    }).join("");

    sel("matDetailContent").innerHTML =
      '<div class="detail-header">'+
        '<div class="detail-header-top">'+
          '<div>'+
            '<div class="detail-kicker">Inventory</div>'+
            '<div class="detail-title">'+esc(mat.sku)+'</div>'+
            '<div class="detail-subtitle">'+esc(mat.desc)+'</div>'+
          '</div>'+
          chip(mat.status)+
        '</div>'+
        '<div class="detail-meta">'+
          metaItem("On hand", '<span class="mono">'+mat.onHand+" "+esc(mat.unit)+'</span>')+
          metaItem("Reorder point", '<span class="mono">'+mat.reorder+" "+esc(mat.unit)+'</span>')+
          metaItem("Supplier", esc(mat.supplier))+
          metaItem("Lead time", mat.lead+" days")+
          metaItem("Last received", esc(mat.lastRecv))+
          metaItem("Unit cost", "$"+mat.unitCost.toFixed(2))+
        '</div>'+
      '</div>'+
      '<div class="detail-body">'+
        '<div class="detail-col">'+
          '<div class="detail-card">'+
            '<div class="detail-card-title">Used by work orders</div>'+
            '<div class="related-list">'+usedHtml+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="detail-col">'+
          '<div class="detail-card">'+
            '<div class="detail-card-title">Receiving history</div>'+
            recHtml+
          '</div>'+
          '<div class="detail-card">'+
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border)">'+
              '<div style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--text-muted)">Purchase orders</div>'+
              (mat.status!=="OK"?'<button class="btn" style="font-size:12px;padding:4px 10px" id="matCreatePOBtn">+ Create PO</button>':'')+
            '</div>'+
            '<div class="related-list">'+poHtml+'</div>'+
          '</div>'+
        '</div>'+
      '</div>';

    // Wire "used by" rows
    sel("matDetailContent").querySelectorAll(".related-item[data-wo]").forEach(function(item){
      var wo = item.getAttribute("data-wo");
      item.addEventListener("click",function(e){
        if(e.target.closest(".wo-link")||e.target.closest(".customer-link")) return;
        var j = findJob(wo); if(j) openWODetail(j, mat.sku);
      });
    });
    var matPOBtn = sel("matCreatePOBtn");
    if (matPOBtn) matPOBtn.addEventListener("click", function(e){ e.stopPropagation(); openCreatePOModal(mat.sku); });
  }

  function generateReceipts(mat, count) {
    var receipts = [];
    var d = parseDue(mat.lastRecv) || new Date(2026, 8, 1);
    var poBase = 2240 + (mat.sku.charCodeAt(0) % 60);
    for (var i = 0; i < count; i++) {
      var recv = new Date(d.getTime() - i * Math.max(mat.lead, 7) * 3 * 86400000);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      receipts.push({
        date: months[recv.getMonth()] + " " + recv.getDate() + ", 2026",
        qty: Math.round(mat.reorder * (1.1 + i * 0.15)),
        ref: "PO-" + (poBase - i)
      });
    }
    return receipts;
  }

  // ─── Customer Detail page ─────────────────────────────────────────────────────

  function openCustomerDetail(name, backLabel) {
    pushHistory(backLabel || "Back");
    currentCustomer = name;
    renderCustomerDetailPage(name);
  }

  function renderCustomerDetailPage(name) {
    currentPage = "customer-detail";
    document.querySelectorAll(".page").forEach(function(p){p.hidden=p.getAttribute("data-page")!=="customer-detail";});
    document.querySelectorAll(".nav-item,.tabbar button").forEach(function(b){b.removeAttribute("aria-current");});
    sel("pageTitle").textContent = name;
    sel("pageDesc").textContent = "Customer profile";
    window.scrollTo(0,0);

    var backLabel = navHistory.length ? navHistory[navHistory.length-1].label : "Back";
    sel("custDetailNav").innerHTML = '<button class="back-btn" id="custBackBtn">&#8592; '+esc(backLabel)+'</button>';
    sel("custBackBtn").addEventListener("click", goBack);

    var custJobs = JOBS.filter(function(j){return j.customer===name;});
    var open = custJobs.filter(function(j){return j.status!=="Complete";});
    var done = custJobs.filter(function(j){return j.status==="Complete";});
    var blocked = custJobs.filter(function(j){return j.status==="Blocked";});

    var openHtml = open.length
      ? open.map(function(j){
          var days = daysUntil(j.due);
          return '<tr class="row-btn" data-wo="'+esc(j.wo)+'">'+
            '<td class="mono">'+woLink(j.wo)+'</td>'+
            '<td>'+esc(j.part)+'</td>'+
            '<td class="mono cell-muted">'+esc(j.line)+'</td>'+
            '<td>'+chip(j.status)+'</td>'+
            '<td class="mono cell-muted">'+esc(j.due)+'</td>'+
            '<td class="td-days">'+daysHtml(days)+'</td>'+
            '</tr>';
        }).join("")
      : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:16px">No open jobs.</td></tr>';

    var doneHtml = done.length
      ? done.map(function(j){
          return '<tr class="row-btn" data-wo="'+esc(j.wo)+'">'+
            '<td class="mono">'+woLink(j.wo)+'</td>'+
            '<td>'+esc(j.part)+'</td>'+
            '<td class="mono cell-muted">'+esc(j.line)+'</td>'+
            '<td>'+chip(j.status)+'</td>'+
            '<td class="mono cell-muted">'+esc(j.due)+'</td>'+
            '<td></td>'+
            '</tr>';
        }).join("")
      : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:16px">No completed jobs.</td></tr>';

    sel("custDetailContent").innerHTML =
      '<div class="detail-header">'+
        '<div class="detail-header-top">'+
          '<div>'+
            '<div class="detail-kicker">Customer</div>'+
            '<div class="detail-title">'+esc(name)+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="cust-summary-grid" style="margin-top:16px">'+
          custStat(open.length, "Open jobs")+
          custStat(done.length, "Completed")+
          custStat(blocked.length, "Blocked", blocked.length>0?"critical":"")+
        '</div>'+
      '</div>'+
      '<div class="detail-card" style="margin-bottom:16px">'+
        '<div class="detail-card-title">Open jobs</div>'+
        '<div class="table-wrap overflow-x"><table>'+
        '<thead><tr><th>WO#</th><th>Part</th><th>Line</th><th>Status</th><th>Due</th><th>Days</th></tr></thead>'+
        '<tbody id="custOpenBody">'+openHtml+'</tbody>'+
        '</table></div>'+
      '</div>'+
      '<div class="detail-card">'+
        '<div class="detail-card-title">Completed jobs</div>'+
        '<div class="table-wrap overflow-x"><table>'+
        '<thead><tr><th>WO#</th><th>Part</th><th>Line</th><th>Status</th><th>Due</th><th></th></tr></thead>'+
        '<tbody id="custDoneBody">'+doneHtml+'</tbody>'+
        '</table></div>'+
      '</div>';

    sel("custDetailContent").querySelectorAll("tr.row-btn[data-wo]").forEach(function(tr){
      tr.addEventListener("click",function(e){
        if(e.target.closest(".wo-link")||e.target.closest(".customer-link")) return;
        var j = findJob(tr.getAttribute("data-wo")); if(j) openWODetail(j, name);
      });
    });
  }

  function custStat(val, lbl, tone) {
    return '<div class="cust-stat">'+
      '<div class="cust-stat-val'+(tone?" "+tone:"")+'">'+val+'</div>'+
      '<div class="cust-stat-lbl">'+esc(lbl)+'</div>'+
      '</div>';
  }

  // ─── Navigation history ───────────────────────────────────────────────────────

  function pushHistory(label) {
    navHistory.push({
      pageId: currentPage, dept: currentDept,
      qualFilter: qualFilter, invFilter: invFilter,
      currentWO: currentWO, currentMaterial: currentMaterial, currentCustomer: currentCustomer,
      label: label || "Back",
      scrollTop: window.scrollY
    });
  }

  function goBack() {
    if (!navHistory.length) { goTo("home"); return; }
    var prev = navHistory.pop();

    qualFilter = prev.qualFilter;
    invFilter  = prev.invFilter;

    if (prev.pageId === "wo-detail" && prev.currentWO) {
      currentWO = prev.currentWO; renderWODetailPage(currentWO); return;
    }
    if (prev.pageId === "material-detail" && prev.currentMaterial) {
      currentMaterial = prev.currentMaterial; renderMaterialDetailPage(currentMaterial); return;
    }
    if (prev.pageId === "customer-detail" && prev.currentCustomer) {
      currentCustomer = prev.currentCustomer; renderCustomerDetailPage(currentCustomer); return;
    }

    // Going back to a main page
    currentWO = null; currentMaterial = null; currentCustomer = null;
    _applyPage(prev.pageId);
    if (prev.pageId === "queue" && prev.dept) { enterDept(prev.dept); }
    if (prev.pageId === "quality") { renderQualFilterPills(); renderQualityTable(); }
    if (prev.pageId === "inventory") { renderInvFilterPills(); renderInventoryTable(); }
    setTimeout(function(){ window.scrollTo(0, prev.scrollTop||0); }, 10);
  }

  // ─── Global search ────────────────────────────────────────────────────────────

  function initGlobalSearch() {
    var input=sel("globalSearch"), results=sel("searchResults");
    input.addEventListener("input",function(){
      var q=input.value.trim().toLowerCase();
      if(q.length<2){results.classList.remove("open");return;}
      var hits=[];
      JOBS.filter(function(j){
        return j.wo.toLowerCase().indexOf(q)>=0||j.part.toLowerCase().indexOf(q)>=0||
               j.customer.toLowerCase().indexOf(q)>=0||j.material.toLowerCase().indexOf(q)>=0;
      }).slice(0,5).forEach(function(j){
        hits.push({title:j.wo+" — "+j.part,sub:j.customer+" · "+j.line+" · "+j.status,
          open:function(){goTo("queue");openWODetail(j,"Search");}});
      });
      QUALITY.filter(function(q2){
        return q2.id.toLowerCase().indexOf(q)>=0||q2.part.toLowerCase().indexOf(q)>=0||q2.wo.toLowerCase().indexOf(q)>=0;
      }).slice(0,3).forEach(function(q2){
        hits.push({title:q2.id+" — "+q2.part,sub:q2.result+" · "+q2.inspector+" · "+q2.date,
          open:function(){goTo("quality");openQuality(q2);}});
      });
      INVENTORY.filter(function(m){
        return m.sku.toLowerCase().indexOf(q)>=0||m.desc.toLowerCase().indexOf(q)>=0||m.supplier.toLowerCase().indexOf(q)>=0;
      }).slice(0,3).forEach(function(m){
        hits.push({title:m.sku+" — "+m.desc,sub:m.status+" · "+m.onHand+" "+m.unit+" · "+m.supplier,
          open:function(){goTo("inventory");openMaterialDetail(m,"Search");}});
      });
      if(!hits.length){
        results.innerHTML='<div class="search-result-empty">No results for &ldquo;'+esc(input.value)+'&rdquo;</div>';
      } else {
        results.innerHTML=hits.map(function(h,i){
          return '<div class="search-result-item" data-idx="'+i+'">'+
            '<div class="search-result-title">'+esc(h.title)+'</div>'+
            '<div class="search-result-sub">'+esc(h.sub)+'</div></div>';
        }).join("");
        results.querySelectorAll(".search-result-item").forEach(function(item,i){
          item.addEventListener("click",function(){hits[i].open();input.value="";results.classList.remove("open");});
        });
      }
      results.classList.add("open");
    });
    document.addEventListener("click",function(e){if(!e.target.closest(".global-search-wrap"))results.classList.remove("open");});
    input.addEventListener("keydown",function(e){if(e.key==="Escape"){input.value="";results.classList.remove("open");}});
  }

  // ─── Event delegation for entity links ───────────────────────────────────────

  document.addEventListener("click", function(e) {
    var wl = e.target.closest(".wo-link");
    if (wl) { e.stopPropagation(); var j=findJob(wl.getAttribute("data-wo")); if(j) openWODetail(j, currentPageLabel()); return; }
    var ml = e.target.closest(".mat-link");
    if (ml) { e.stopPropagation(); var m=findMaterial(ml.getAttribute("data-sku")); if(m) openMaterialDetail(m, currentPageLabel()); return; }
    var cl = e.target.closest(".customer-link");
    if (cl) { e.stopPropagation(); openCustomerDetail(cl.getAttribute("data-customer"), currentPageLabel()); return; }
  });

  function currentPageLabel() {
    var labels = {home:"Home",queue:"Work Center Queue",quality:"Quality",inventory:"Inventory",settings:"Settings","wo-detail":currentWO?currentWO.wo:"WO","material-detail":currentMaterial?currentMaterial.sku:"Material","customer-detail":currentCustomer||"Customer"};
    return labels[currentPage] || "Back";
  }

  // ─── Modal ────────────────────────────────────────────────────────────────────

  function openModal(title,html){
    sel("modalTitle").textContent=title; sel("modalBody").innerHTML=html;
    sel("modalScrim").classList.add("open");
  }
  function closeModal(){ sel("modalScrim").classList.remove("open"); sel("modalBody").innerHTML=""; }

  sel("modalClose").addEventListener("click",closeModal);
  sel("modalScrim").addEventListener("click",function(e){if(e.target===sel("modalScrim"))closeModal();});

  // ─── New Work Order ───────────────────────────────────────────────────────────

  function nextWOId(){ var max=0; JOBS.forEach(function(j){var n=parseInt(j.wo.replace("WO-",""),10);if(n>max)max=n;}); return "WO-"+(max+1); }

  function openAddJobModal(){
    var woId=nextWOId();
    var lines=[]; DEPARTMENTS.forEach(function(d){d.lines.forEach(function(l){lines.push(l);});});
    var custSet={}; JOBS.forEach(function(j){custSet[j.customer]=1;});
    openModal("New work order",
      '<div class="modal-form-grid">'+
        ff("Work order #",'<input class="form-input" value="'+esc(woId)+'" readonly>',false)+
        ff("Due date",'<input class="form-input" id="fjDue" placeholder="e.g. Oct 15">',false)+
        ff("Part / description",'<input class="form-input" id="fjPart" placeholder="Part name or description">',true)+
        ff("Customer",'<select class="form-input" id="fjCustomer"><option value="">Select…</option>'+Object.keys(custSet).map(function(c){return'<option>'+esc(c)+'</option>';}).join("")+'</select>',false)+
        ff("Production line",mkSelect("fjLine",lines,"Select…"),false)+
        ff("Quantity",'<input class="form-input" id="fjQty" type="number" min="1" placeholder="0">',false)+
        ff("Priority",mkSelect("fjPriority",["Standard","Rush"],null),false)+
        ff("Material",'<input class="form-input" id="fjMaterial" placeholder="Material or hardware kit">',true)+
        ff("Operator",mkSelect("fjOperator",OPT_INSPECTORS.concat(["Unassigned"]),"Assign…"),false)+
        ff("Notes",'<input class="form-input" id="fjNotes" placeholder="Traveler notes (optional)">',true)+
      '</div>'+
      '<div class="modal-actions"><button class="btn" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Create work order</button></div>'
    );
    sel("modalCancel").addEventListener("click",closeModal);
    sel("modalSave").addEventListener("click",function(){
      var part=sel("fjPart").value.trim(),line=sel("fjLine").value,customer=sel("fjCustomer").value;
      if(!part||!line||!customer){alert("Part, line, and customer are required.");return;}
      JOBS.unshift({wo:woId,part:part,customer:customer,line:line,
        due:sel("fjDue").value||"TBD",qty:parseInt(sel("fjQty").value)||1,
        priority:sel("fjPriority").value,status:"Scheduled",
        material:sel("fjMaterial").value||"—",operator:sel("fjOperator").value||"Unassigned",notes:sel("fjNotes").value||""});
      closeModal(); renderDeptGrid(); renderHome(); updateNavCounts();
    });
  }

  // ─── New Inspection ───────────────────────────────────────────────────────────

  function nextNCRId(){ var max=0; QUALITY.forEach(function(q){var n=parseInt(q.id.replace("NCR-",""),10);if(n>max)max=n;}); return "NCR-"+(max+1); }

  function openAddQualModal(){
    var ncrId=nextNCRId();
    var woOpts=JOBS.map(function(j){return'<option value="'+esc(j.wo)+'">'+esc(j.wo)+" — "+esc(j.part)+"</option>";}).join("");
    openModal("New inspection record",
      '<div class="modal-form-grid">'+
        ff("NCR ID",'<input class="form-input" value="'+esc(ncrId)+'" readonly>',false)+
        ff("Date",'<input class="form-input" id="fqDate" placeholder="e.g. Sep 29">',false)+
        ff("Work order",'<select class="form-input" id="fqWO"><option value="">Select…</option>'+woOpts+'</select>',false)+
        ff("Inspector",mkSelect("fqInspector",OPT_INSPECTORS,"Select…"),false)+
        ff("Result",mkSelect("fqResult",OPT_RESULTS,"Select…"),false)+
        ff("Defect / finding",'<input class="form-input" id="fqDefect" placeholder="Describe defect, or — if none">',true)+
        ff("Disposition",'<input class="form-input" id="fqDisp" placeholder="What action was taken?">',true)+
        ff("Root cause",'<input class="form-input" id="fqRoot" placeholder="Root cause, or — if none">',true)+
      '</div>'+
      '<div class="modal-actions"><button class="btn" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Add inspection</button></div>'
    );
    sel("modalCancel").addEventListener("click",closeModal);
    sel("modalSave").addEventListener("click",function(){
      var wo=sel("fqWO").value,result=sel("fqResult").value;
      if(!wo||!result){alert("Work order and result are required.");return;}
      var job=findJob(wo);
      QUALITY.unshift({id:ncrId,date:sel("fqDate").value||"—",wo:wo,part:job?job.part:"—",
        inspector:sel("fqInspector").value||"—",result:result,defect:sel("fqDefect").value||"—",
        disposition:sel("fqDisp").value||"—",rootCause:sel("fqRoot").value||"—"});
      closeModal(); renderQualFilterPills(); renderQualityTable(); renderHome(); updateNavCounts();
    });
  }

  // ─── New Inventory Item ───────────────────────────────────────────────────────

  function openAddInvModal(){
    var suppSet={}; INVENTORY.forEach(function(m){suppSet[m.supplier]=1;});
    openModal("New inventory item",
      '<div class="modal-form-grid">'+
        ff("SKU",'<input class="form-input" id="fiSku" placeholder="e.g. AL-PL-6061-38">',false)+
        ff("Status",mkSelect("fiStatus",["OK","Low","Critical"],null),false)+
        ff("Description",'<input class="form-input" id="fiDesc" placeholder="Material description">',true)+
        ff("On hand",'<input class="form-input" id="fiOnHand" type="number" min="0" placeholder="0">',false)+
        ff("Unit",mkSelect("fiUnit",OPT_UNITS,null),false)+
        ff("Reorder point",'<input class="form-input" id="fiReorder" type="number" min="0" placeholder="0">',false)+
        ff("Unit cost ($)",'<input class="form-input" id="fiCost" type="number" min="0" step="0.01" placeholder="0.00">',false)+
        ff("Supplier",'<select class="form-input" id="fiSupplier"><option value="">Select…</option>'+Object.keys(suppSet).map(function(s){return'<option>'+esc(s)+'</option>';}).join("")+'</select>',false)+
        ff("Lead time (days)",'<input class="form-input" id="fiLead" type="number" min="0" placeholder="0">',false)+
        ff("Last received",'<input class="form-input" id="fiLastRecv" placeholder="e.g. Sep 29">',false)+
      '</div>'+
      '<div class="modal-actions"><button class="btn" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Add item</button></div>'
    );
    sel("modalCancel").addEventListener("click",closeModal);
    sel("modalSave").addEventListener("click",function(){
      var sku=sel("fiSku").value.trim(),desc=sel("fiDesc").value.trim();
      if(!sku||!desc){alert("SKU and description are required.");return;}
      INVENTORY.unshift({sku:sku,desc:desc,onHand:parseFloat(sel("fiOnHand").value)||0,
        unit:sel("fiUnit").value,reorder:parseFloat(sel("fiReorder").value)||0,
        status:sel("fiStatus").value,supplier:sel("fiSupplier").value||"—",
        lead:parseInt(sel("fiLead").value)||0,lastRecv:sel("fiLastRecv").value||"—",
        unitCost:parseFloat(sel("fiCost").value)||0,usedBy:[]});
      closeModal(); renderInvFilterPills(); renderInventoryTable(); renderHome(); updateNavCounts();
    });
  }

  // ─── Receive Material ─────────────────────────────────────────────────────────

  function openRecvMaterialModal(){
    var skuOpts=INVENTORY.map(function(m){return'<option value="'+esc(m.sku)+'">'+esc(m.sku)+' — '+esc(m.desc)+'</option>';}).join("");
    openModal("Receive material",
      '<div class="modal-form-grid">'+
        ff("SKU / material",'<select class="form-input" id="frSku"><option value="">Select…</option>'+skuOpts+'</select>',true)+
        ff("Qty received",'<input class="form-input" id="frQty" type="number" min="1" placeholder="0">',false)+
        ff("Date received",'<input class="form-input" id="frDate" placeholder="e.g. Sep 29">',false)+
        ff("Reference (PO#, lot#)",'<input class="form-input" id="frRef" placeholder="Optional">',true)+
      '</div>'+
      '<div class="modal-actions"><button class="btn" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Receive</button></div>'
    );
    sel("modalCancel").addEventListener("click",closeModal);
    sel("modalSave").addEventListener("click",function(){
      var sku=sel("frSku").value,qty=parseFloat(sel("frQty").value);
      if(!sku||!qty){alert("SKU and quantity are required.");return;}
      var item=findMaterial(sku);
      if(item){
        item.onHand+=qty; item.lastRecv=sel("frDate").value||"—";
        if(item.onHand>=item.reorder) item.status="OK";
        else if(item.onHand>=item.reorder*0.5) item.status="Low";
        else item.status="Critical";
      }
      closeModal(); renderInvFilterPills(); renderInventoryTable(); renderHome(); updateNavCounts();
    });
  }

  // ─── Button wiring ────────────────────────────────────────────────────────────

  sel("addJobBtn").addEventListener("click",openAddJobModal);
  sel("addQualBtn").addEventListener("click",openAddQualModal);
  sel("addInvBtn").addEventListener("click",openAddInvModal);
  sel("recvInvBtn").addEventListener("click",openRecvMaterialModal);
  sel("createPOBtn").addEventListener("click",function(){ openCreatePOModal(null); });
  sel("qualSearch").addEventListener("input",renderQualityTable);
  sel("invSearch").addEventListener("input",renderInventoryTable);
  sel("invTabs").querySelectorAll(".inv-tab").forEach(function(btn){
    btn.addEventListener("click",function(){ switchInvTab(btn.getAttribute("data-invtab")); });
  });

  // ─── CSV Export ──────────────────────────────────────────────────────────────

  function toCSV(rows,fields){
    var lines=[fields.join(",")];
    rows.forEach(function(row){lines.push(fields.map(function(f){
      var v=String(row[f]!=null?row[f]:"");
      if(v.search(/[",\n]/)>=0) v='"'+v.replace(/"/g,'""')+'"';
      return v;
    }).join(","));});
    return lines.join("\n");
  }
  function downloadCSV(filename,csv){
    var blob=new Blob([csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();
    setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(url);},100);
  }

  sel("exportSchedBtn").addEventListener("click",function(){downloadCSV("jobs.csv",toCSV(JOBS,["wo","part","customer","line","due","qty","priority","status","material","operator","notes"]));});
  sel("exportQualBtn").addEventListener("click",function(){downloadCSV("quality.csv",toCSV(QUALITY,["id","date","wo","part","inspector","result","defect","disposition","rootCause"]));});
  sel("exportInvBtn").addEventListener("click",function(){
    if (invActiveTab==="pos") {
      downloadCSV("purchase_orders.csv",toCSV(PURCHASE_ORDERS,["id","sku","desc","supplier","qty","unit","status","orderDate","expectedDate","notes"]));
    } else {
      downloadCSV("inventory.csv",toCSV(INVENTORY.map(function(m){return Object.assign({},m,{usedBy:m.usedBy.join("; ")});}),["sku","desc","onHand","unit","reorder","status","supplier","lead","lastRecv","usedBy"]));
    }
  });

  // ─── Quality side panel (kept as panel per design decision) ───────────────────

  var panel=sel("panel"),scrim=sel("scrim"),panelKicker=sel("panelKicker"),panelTitle=sel("panelTitle"),panelBody=sel("panelBody");

  function kv(k,v){return'<div class="kv"><div class="k">'+esc(k)+'</div><div class="v">'+v+"</div></div>";}

  function openPanel(kicker,title,bodyHtml,noteKey){
    panelKicker.textContent=kicker; panelTitle.textContent=title; panelBody.innerHTML=bodyHtml;
    if(noteKey){
      var wrap=el("div","panel-note");
      wrap.innerHTML='<label for="noteField">Shop note</label><textarea class="note" id="noteField" placeholder="Add a note…"></textarea><div class="panel-actions" style="margin-top:8px;"><button class="btn primary" id="noteSave">Save note</button><span class="save-toast" id="noteToast">Saved</span></div>';
      panelBody.appendChild(wrap);
      var field=wrap.querySelector("#noteField"); field.value=noteStore[noteKey]||"";
      wrap.querySelector("#noteSave").addEventListener("click",function(){
        noteStore[noteKey]=field.value; var t=wrap.querySelector("#noteToast");
        t.classList.add("show"); setTimeout(function(){t.classList.remove("show");},1400);
      });
    }
    panel.classList.add("open"); scrim.classList.add("open"); panel.setAttribute("aria-hidden","false");
  }
  function closePanel(){panel.classList.remove("open");scrim.classList.remove("open");panel.setAttribute("aria-hidden","true");}

  sel("panelClose").addEventListener("click",closePanel);
  scrim.addEventListener("click",closePanel);
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){closePanel();closeModal();}});

  function renderAttachItem(f) {
    var isImg = f.type && f.type.indexOf("image/") === 0;
    var isPdf = f.type === "application/pdf" || (f.name && /\.pdf$/i.test(f.name));
    var inner = (isImg && f.dataUrl && f.dataUrl !== "placeholder")
      ? '<img src="' + f.dataUrl + '" alt="">'
      : '<span class="attach-thumb-placeholder">' + (isPdf ? "PDF" : "IMG") + '</span>';
    return '<div class="attach-item"><div class="attach-thumb">' + inner + '</div>' +
      '<span class="attach-name">' + esc(f.name) + '</span></div>';
  }

  function openQuality(q) {
    var key = "qual:" + q.id;
    var atts = attachStore[key] || [];
    var attachHtml =
      '<div class="attach-section">' +
        '<div class="attach-section-title">Attachments' + (atts.length ? ' (' + atts.length + ')' : '') + '</div>' +
        '<div class="attach-list" id="alist-' + esc(q.id) + '">' + atts.map(renderAttachItem).join("") + '</div>' +
        '<label class="btn" style="cursor:pointer;font-size:12.5px;padding:6px 12px">' +
          'Attach file&hellip;<input type="file" id="afile-' + esc(q.id) + '" accept="image/*,.pdf" multiple style="display:none">' +
        '</label>' +
      '</div>';
    openPanel(q.id, q.part,
      '<div class="kv-grid">' + kv("Work order", woLink(q.wo)) + kv("Part", q.part) + kv("Inspector", q.inspector) +
      kv("Date", q.date) + kv("Result", chip(q.result)) + kv("Defect", q.defect) + '</div>' +
      '<div class="kv"><div class="k">Disposition</div><div class="v" style="font-weight:400">' + esc(q.disposition) + '</div></div>' +
      '<div class="kv"><div class="k">Root cause</div><div class="v" style="font-weight:400">' + esc(q.rootCause) + '</div></div>' +
      attachHtml,
      key);
    var fi = sel("afile-" + q.id);
    if (fi) fi.addEventListener("change", function() {
      if (!attachStore[key]) attachStore[key] = [];
      Array.from(fi.files).forEach(function(file) {
        var reader = new FileReader();
        reader.onload = function(ev) {
          var entry = { name: file.name, type: file.type, dataUrl: ev.target.result };
          attachStore[key].push(entry);
          var list = sel("alist-" + q.id);
          if (list) { var d = document.createElement("div"); d.innerHTML = renderAttachItem(entry); list.appendChild(d.firstChild); }
        };
        reader.readAsDataURL(file);
      });
      fi.value = "";
    });
  }

  // ─── Main navigation ─────────────────────────────────────────────────────────

  var PAGES={
    home:      {title:"Home",              desc:"Active issues and shop performance."},
    queue:     {title:"Work Center Queue", desc:"Open work orders by department and production line."},
    quality:   {title:"Quality",           desc:"Inspection results and non-conformance history."},
    inventory: {title:"Inventory",         desc:"Material stock levels against reorder points."},
    settings:  {title:"Settings",          desc:"Company profile, production lines, and team."},
  };

  function _applyPage(pageId) {
    document.querySelectorAll(".page").forEach(function(p){p.hidden=p.getAttribute("data-page")!==pageId;});
    document.querySelectorAll(".nav-item,.tabbar button").forEach(function(b){
      if(b.getAttribute("data-page")===pageId) b.setAttribute("aria-current","page");
      else b.removeAttribute("aria-current");
    });
    var pg=PAGES[pageId]||PAGES.home;
    sel("pageTitle").textContent=pg.title; sel("pageDesc").textContent=pg.desc;
    closePanel();
    if(pageId==="queue") exitDept();
    window.scrollTo(0,0);
    currentPage=pageId;
  }

  function goTo(pageId) {
    navHistory=[];
    currentWO=null; currentMaterial=null; currentCustomer=null;
    _applyPage(pageId);
  }

  document.querySelectorAll(".nav-item,.tabbar button").forEach(function(b){
    b.addEventListener("click",function(){goTo(b.getAttribute("data-page"));});
  });
  sel("deptBack").addEventListener("click",exitDept);

  function updateNavCounts(){
    var queueCount  = JOBS.filter(function(j){return j.status!=="Complete";}).length;
    var qualCount   = QUALITY.filter(function(q){return q.result!=="Pass";}).length;
    var invCount    = INVENTORY.filter(function(m){return m.status!=="OK";}).length;
    sel("navCountQueue").textContent = queueCount;
    sel("navCountQual").textContent  = qualCount;
    sel("navCountInv").textContent   = invCount;
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────────

  // Pre-populate fake attachments for demo
  attachStore["qual:NCR-224"] = [{name:"edge-burr-closeup.jpg",   type:"image/jpeg",       dataUrl:"placeholder"}];
  attachStore["qual:NCR-221"] = [{name:"weld-porosity-inspect.jpg",type:"image/jpeg",       dataUrl:"placeholder"},
                                  {name:"NCR-221-wps-deviation.pdf", type:"application/pdf", dataUrl:null}];
  attachStore["qual:NCR-220"] = [{name:"hole-pattern-overlay.jpg", type:"image/jpeg",       dataUrl:"placeholder"}];

  renderHome();
  renderDeptGrid();
  renderQualFilterPills();
  renderQualityTable();
  renderInvFilterPills();
  renderInventoryTable();
  renderPOTable();
  renderSettings();
  updateNavCounts();
  initGlobalSearch();
  goTo("home");

})();
