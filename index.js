// 1. TEAM DATA
var teamMembers = [
  {
    name: "Arjun Kumar",
    bio: "Loves building clean UIs and making sure everything works together.",
    skills: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
    initials: "AK",
  },
  {
    name: "Priya Mehta",
    bio: "Turns ideas into beautiful, user-friendly interfaces.",
    skills: ["CSS", "Figma", "Responsive Design"],
    github: "https://github.com",
    initials: "PM",
  },
  {
    name: "Rohan Sharma",
    bio: "Handles all the fetch calls and async logic for the team.",
    skills: ["fetch", "async/await", "REST APIs"],
    github: "https://github.com",
    initials: "RS",
  },
  {
    name: "Neha Desai",
    bio: "Makes sure data saves and loads correctly across the app.",
    skills: ["localStorage", "CRUD", "Array Methods"],
    github: "https://github.com",
    initials: "ND",
  },
  {
    name: "Vikram Rao",
    bio: "Builds drag-and-drop, quizzes, and all the fun interactive bits.",
    skills: ["Drag & Drop", "Events", "DOM"],
    github: "https://github.com",
    initials: "VR",
  },
];

// 2. PROJECTS DATA — update links when apps are done
var projects = [
  {
    name: "1. Team Portfolio",
    description:
      "This page! A team landing page with dark mode and a contact form.",
    link: "#",
  },
  {
    name: "2. Quiz App",
    description:
      "A multiple-choice quiz that tracks your score and gives instant feedback.",
    link: "./quiz_app/quiz.html",
  },
  {
    name: "3. Expense Tracker",
    description:
      "Log income and expenses. Data saves to localStorage so it never disappears.",
    link: "./expense_tracker/expense.html",
  },
  {
    name: "4. Live News Feed",
    description:
      "Fetches real news articles from the NewsAPI with search and category filters.",
    link: "#",
  },
  {
    name: "5. GitHub Explorer",
    description:
      "Search any GitHub username to see their profile, repos, and language stats.",
    link: "./github_explorer/dev.html",
  },
  {
    name: "6. Kanban Board",
    description:
      "A drag-and-drop task board with To Do, In Progress, and Done columns.",
    link: "./kanban_task_board/task_board.html",
  },
];

// 3. RENDER TEAM CARDS
function renderTeam() {
  var grid = document.getElementById("team-grid");

  for (var i = 0; i < teamMembers.length; i++) {
    var member = teamMembers[i];

    // Build skill badges
    var skillsHTML = "";
    for (var j = 0; j < member.skills.length; j++) {
      skillsHTML += '<span class="skill-badge">' + member.skills[j] + "</span>";
    }

    // Build the card HTML
    var card = '<div class="team-card">';
    card += '<div class="avatar-placeholder">' + member.initials + "</div>";
    card += "<h3>" + member.name + "</h3>";
    card += '<p class="role">' + member.role + "</p>";
    card += "<p>" + member.bio + "</p>";
    card += '<div class="skills">' + skillsHTML + "</div>";
    card += '<a href="' + member.github + '" target="_blank">GitHub →</a>';
    card += "</div>";

    grid.innerHTML += card;
  }
}

// 4. RENDER PROJECT CARDS
function renderProjects() {
  var grid = document.getElementById("projects-grid");

  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];

    var card = '<div class="project-card">';
    card += "<h3>" + project.name + "</h3>";
    card += "<p>" + project.description + "</p>";
    card += '<a href="' + project.link + '">View project →</a>';
    card += "</div>";

    grid.innerHTML += card;
  }
}

// 5. DARK MODE TOGGLE (saves to localStorage)
function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById("theme-btn");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    btn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    btn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme when page opens
function loadTheme() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-btn").textContent = "☀️ Light Mode";
  }
}

// 6. CONTACT FORM VALIDATION
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from refreshing

    var isValid = true;

    // Get field values
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    // Check name
    if (name === "") {
      document.getElementById("name").classList.add("invalid");
      document.getElementById("name-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("name").classList.remove("invalid");
      document.getElementById("name-error").classList.remove("show");
    }

    // Check email (must contain @ and .)
    var emailOk = email.includes("@") && email.includes(".");
    if (!emailOk) {
      document.getElementById("email").classList.add("invalid");
      document.getElementById("email-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("email").classList.remove("invalid");
      document.getElementById("email-error").classList.remove("show");
    }

    // Check message length
    if (message.length < 10) {
      document.getElementById("message").classList.add("invalid");
      document.getElementById("message-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("message").classList.remove("invalid");
      document.getElementById("message-error").classList.remove("show");
    }

    // If all checks passed, show success
    if (isValid) {
      document.getElementById("success-msg").style.display = "block";
      document.getElementById("contact-form").reset();
    }
  });

// 7. START EVERYTHING
loadTheme();
renderTeam();
renderProjects();