// 1. THE DATA — all tasks are stored here
//    Each task has: id, title, column
var tasks = [];

// This keeps track of which card is being dragged
var draggingId = null;

// 2. SAVE & LOAD from localStorage
//    So tasks survive a page refresh
function saveTasks() {
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var saved = localStorage.getItem("kanban-tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// 3. RENDER — clears the board and redraws
//    all cards from the tasks array
function renderBoard() {
  // Clear all three columns
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  // Loop through tasks and put each in the right column
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var cardHTML = buildCardHTML(task);
    document.getElementById(task.column).innerHTML += cardHTML;
  }

  // Update the count badges
  updateCounts();
}

// 4. BUILD CARD HTML
//    Takes a task object, returns HTML string
function buildCardHTML(task) {
  var html = "";
  html += '<div class="card" id="card-' + task.id + '" draggable="true"';
  html += ' ondragstart="onDragStart(event, ' + task.id + ')"';
  html += ' ondragend="onDragEnd(event)">';

  html +=
    '<div class="card-title" id="title-' +
    task.id +
    '">' +
    task.title +
    "</div>";

  html += '<div class="card-actions">';
  html += '<button onclick="startEdit(' + task.id + ')">✏️ Edit</button>';
  html +=
    '<button class="btn-delete" onclick="deleteTask(' +
    task.id +
    ')">🗑 Delete</button>';
  html += "</div>";

  html += "</div>";
  return html;
}

// 5. ADD TASK
//    Reads the input, creates a new task object
function addTask() {
  var input = document.getElementById("task-input");
  var select = document.getElementById("column-select");
  var errorMsg = document.getElementById("add-error");

  var title = input.value.trim();

  // Validate
  if (title === "") {
    errorMsg.classList.add("show");
    return;
  }

  errorMsg.classList.remove("show");

  // Create new task object
  var newTask = {
    id: Date.now(), // unique number based on timestamp
    title: title,
    column: select.value,
  };

  tasks.push(newTask);
  saveTasks();
  renderBoard();

  // Clear the input
  input.value = "";
  input.focus();
}

// Allow pressing Enter to add a task
document
  .getElementById("task-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

// 6. DELETE TASK
//    Removes a task from the array by its id
function deleteTask(id) {
  // Filter out the task with this id
  var newTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;

  saveTasks();
  renderBoard();
}

// 7. EDIT TASK
//    Replaces the card title with a text input
function startEdit(id) {
  var titleEl = document.getElementById("title-" + id);
  var currentTitle = titleEl.textContent;

  // Replace the title text with an input box
  titleEl.innerHTML =
    '<input class="card-edit-input" id="edit-input-' +
    id +
    '" value="' +
    currentTitle +
    '" />' +
    '<button onclick="saveEdit(' +
    id +
    ')">Save</button>';

  document.getElementById("edit-input-" + id).focus();
}

function saveEdit(id) {
  var newTitle = document.getElementById("edit-input-" + id).value.trim();

  if (newTitle === "") return; // Don't save empty titles

  // Find the task and update its title
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].title = newTitle;
      break;
    }
  }

  saveTasks();
  renderBoard();
}

// 8. DRAG AND DROP
//    Uses the HTML5 Drag and Drop API

// Called when user starts dragging a card
function onDragStart(event, id) {
  draggingId = id;
  // Add the "dragging" class to make it look faded
  document.getElementById("card-" + id).classList.add("dragging");
}

// Called when dragging ends (whether dropped or cancelled)
function onDragEnd(event) {
  if (draggingId) {
    var card = document.getElementById("card-" + draggingId);
    if (card) card.classList.remove("dragging");
  }
}

// Called when a card is dragged over a column — allows dropping
function onDragOver(event) {
  event.preventDefault(); // IMPORTANT: without this, drop won't fire
  event.currentTarget.classList.add("drag-over");
}

// Called when the card leaves a column area
function onDragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

// Called when a card is dropped into a column
function onDrop(event, targetColumn) {
  event.currentTarget.classList.remove("drag-over");

  if (draggingId === null) return;

  // Find the task and update its column
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === draggingId) {
      tasks[i].column = targetColumn;
      break;
    }
  }

  draggingId = null;
  saveTasks();
  renderBoard();
}

// 9. UPDATE COUNTS
//    Shows how many cards are in each column
function updateCounts() {
  var todoCount = 0;
  var inprogressCount = 0;
  var doneCount = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].column === "todo") todoCount++;
    if (tasks[i].column === "inprogress") inprogressCount++;
    if (tasks[i].column === "done") doneCount++;
  }

  document.getElementById("count-todo").textContent = todoCount;
  document.getElementById("count-inprogress").textContent = inprogressCount;
  document.getElementById("count-done").textContent = doneCount;
}

// 10. DARK MODE TOGGLE
function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById("theme-btn");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    btn.textContent = "🌙 Dark Mode";
    localStorage.setItem("kanban-theme", "light");
  } else {
    body.classList.add("dark");
    btn.textContent = "☀️ Light Mode";
    localStorage.setItem("kanban-theme", "dark");
  }
}

function loadTheme() {
  var saved = localStorage.getItem("kanban-theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-btn").textContent = "☀️ Light Mode";
  }
}
// 11. START EVERYTHING
loadTheme();
loadTasks();
renderBoard();