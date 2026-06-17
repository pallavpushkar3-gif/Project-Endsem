// Category icons
const ICONS = {
  Food: "ti-bowl-chopsticks",
  Transport: "ti-bus",
  Shopping: "ti-shopping-bag",
  Bills: "ti-file-invoice",
  Health: "ti-heart-rate-monitor",
  Salary: "ti-building-bank",
  Freelance: "ti-briefcase",
  Other: "ti-dots",
};

// Load data from localStorage (or start with empty array)
let entries = JSON.parse(localStorage.getItem("et_entries") || "[]");
let currentType = "expense";
let currentFilter = "all";
let editId = null;

// Set today's date as default
document.getElementById("date").valueAsDate = new Date();

// ── Save to localStorage ──────────────────────────────────────────────
function save() {
  localStorage.setItem("et_entries", JSON.stringify(entries));
}

// ── Toggle income / expense ───────────────────────────────────────────
function setType(type) {
  currentType = type;
  document.getElementById("btn-expense").className =
    "type-btn" + (type === "expense" ? " active expense" : "");
  document.getElementById("btn-income").className =
    "type-btn" + (type === "income" ? " active income" : "");
}

// ── Toggle filter ─────────────────────────────────────────────────────
function setFilter(filter, el) {
  currentFilter = filter;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  render();
}

// ── Add or update an entry ────────────────────────────────────────────
function submitEntry() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  // Basic validation
  if (!desc || !amount || amount <= 0 || !date) {
    alert("Please fill in all fields with a valid amount.");
    return;
  }

  if (editId !== null) {
    // UPDATE existing entry
    const idx = entries.findIndex((e) => e.id === editId);
    if (idx > -1) {
      entries[idx] = {
        id: editId,
        desc,
        amount,
        category,
        date,
        type: currentType,
      };
    }
    editId = null;
    document.getElementById("form-title").textContent = "Add transaction";
    document.getElementById("submit-btn").innerHTML =
      '<i class="ti ti-plus"></i> Add entry';
  } else {
    // CREATE new entry — add to the front of the array
    entries.unshift({
      id: Date.now(),
      desc,
      amount,
      category,
      date,
      type: currentType,
    });
  }

  save();

  // Reset form
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").valueAsDate = new Date();
  setType("expense");

  render();
}

// ── Delete an entry ───────────────────────────────────────────────────
function deleteEntry(id) {
  if (!confirm("Delete this transaction?")) return;
  entries = entries.filter((e) => e.id !== id); // filter out the deleted one
  save();
  render();
}

// ── Load entry into form for editing ──────────────────────────────────
function editEntry(id) {
  const e = entries.find((x) => x.id === id);
  if (!e) return;

  document.getElementById("desc").value = e.desc;
  document.getElementById("amount").value = e.amount;
  document.getElementById("category").value = e.category;
  document.getElementById("date").value = e.date;
  setType(e.type);

  editId = id;
  document.getElementById("form-title").textContent = "Edit transaction";
  document.getElementById("submit-btn").innerHTML =
    '<i class="ti ti-check"></i> Save changes';
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Format currency ───────────────────────────────────────────────────
function fmt(n) {
  return (
    "₹" +
    n.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

// ── Render everything ─────────────────────────────────────────────────
function render() {
  // 1. Compute totals using reduce
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  document.getElementById("total-income").textContent = fmt(income);
  document.getElementById("total-expense").textContent = fmt(expense);

  const balEl = document.getElementById("total-balance");
  balEl.textContent = fmt(Math.abs(balance));
  balEl.className = "stat-value " + (balance >= 0 ? "income" : "negative");

  // 2. Category breakdown bar chart
  const catMap = {};
  entries
    .filter((e) => e.type === "expense")
    .forEach((e) => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });

  const cats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const catEl = document.getElementById("cat-chart");

  if (cats.length === 0) {
    catEl.innerHTML =
      '<p style="font-size:13px;color:#888780">No expenses yet.</p>';
  } else {
    const max = cats[0][1];
    catEl.innerHTML = cats
      .map(
        ([cat, amt]) => `
          <div class="bar-wrap">
            <div class="bar-label">
              <span><i class="ti ${ICONS[cat] || "ti-dots"}"></i> ${cat}</span>
              <span>${fmt(amt)}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${Math.round((amt / max) * 100)}%"></div>
            </div>
          </div>
        `,
      )
      .join("");
  }

  // 3. Transaction list
  const filtered =
    currentFilter === "all"
      ? entries
      : entries.filter((e) => e.type === currentFilter);

  document.getElementById("tx-count").textContent =
    filtered.length + " transaction" + (filtered.length !== 1 ? "s" : "");

  const list = document.getElementById("tx-list");

  if (filtered.length === 0) {
    list.innerHTML = `
          <div class="empty">
            <i class="ti ti-receipt-off" style="font-size:28px;display:block;margin-bottom:8px"></i>
            No transactions yet. Add one above.
          </div>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (e) => `
        <div class="tx">
          <div class="tx-icon ${e.type}">
            <i class="ti ${ICONS[e.category] || "ti-dots"}"></i>
          </div>
          <div class="tx-info">
            <div class="tx-desc">${e.desc}</div>
            <div class="tx-meta">
              ${e.category} · ${new Date(
                e.date + "T00:00:00",
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div class="tx-amount ${e.type}">
            ${e.type === "income" ? "+" : "-"}${fmt(e.amount)}
          </div>
          <div class="tx-actions">
            <button class="icon-btn" onclick="editEntry(${e.id})" aria-label="Edit">
              <i class="ti ti-edit" style="font-size:16px"></i>
            </button>
            <button class="icon-btn" onclick="deleteEntry(${e.id})" aria-label="Delete">
              <i class="ti ti-trash" style="font-size:16px"></i>
            </button>
          </div>
        </div>
      `,
    )
    .join("");
}

// Initial render
render();
