// Language colors (from github-colors)
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  R: "#198CE7",
  default: "#888780",
};

let allRepos = [];

// ── Helpers
function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 60) return diff + "m ago";
  if (diff < 1440) return Math.floor(diff / 60) + "h ago";
  if (diff < 43200) return Math.floor(diff / 1440) + "d ago";
  return Math.floor(diff / 43200) + "mo ago";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id, d) {
  document.getElementById(id).style.display = d || "";
}

// ── Search ────────────────────────────────────────────────────────────
async function search() {
  const user = document.getElementById("username").value.trim();
  if (!user) return;

  // Reset UI
  hide("profile-card");
  hide("lang-card");
  hide("repos-section");
  hide("error-box");
  hide("rate-warn");
  show("loading-profile");

  try {
    // Fetch profile and repos in parallel
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}`),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`,
      ),
    ]);

    hide("loading-profile");

    if (uRes.status === 403 || rRes.status === 403) {
      show("rate-warn", "flex");
      return;
    }

    if (!uRes.ok) {
      document.getElementById("error-msg").textContent =
        uRes.status === 404
          ? 'User "' + user + '" not found.'
          : "GitHub API error: " + uRes.status;
      show("error-box");
      return;
    }

    const u = await uRes.json();
    const repos = rRes.ok ? await rRes.json() : [];

    renderProfile(u);
    allRepos = Array.isArray(repos) ? repos : [];
    renderRepos();
    renderLangChart(allRepos);
  } catch (err) {
    hide("loading-profile");
    document.getElementById("error-msg").textContent =
      "Network error. Check your connection.";
    show("error-box");
  }
}

// ── Render profile ────────────────────────────────────────────────────
function renderProfile(u) {
  document.getElementById("avatar").src = u.avatar_url;
  document.getElementById("profile-name").textContent = u.name || u.login;
  document.getElementById("profile-login").textContent = "@" + u.login;
  document.getElementById("profile-bio").textContent = u.bio || "";
  document.getElementById("st-repos").textContent = fmt(u.public_repos);
  document.getElementById("st-followers").textContent = fmt(u.followers);
  document.getElementById("st-following").textContent = fmt(u.following);
  document.getElementById("st-gists").textContent = fmt(u.public_gists);

  const links = [];
  if (u.location)
    links.push(
      `<span class="profile-link"><i class="ti ti-map-pin"></i>${u.location}</span>`,
    );
  if (u.company)
    links.push(
      `<span class="profile-link"><i class="ti ti-building"></i>${u.company}</span>`,
    );
  if (u.blog)
    links.push(
      `<a class="profile-link" href="${u.blog}" target="_blank" rel="noopener"><i class="ti ti-link"></i>${u.blog.replace(/^https?:\/\//, "")}</a>`,
    );
  links.push(
    `<a class="profile-link" href="https://github.com/${u.login}" target="_blank" rel="noopener"><i class="ti ti-external-link"></i>View on GitHub</a>`,
  );
  document.getElementById("profile-links").innerHTML = links.join("");

  show("profile-card");
}

// ── Render repos ──────────────────────────────────────────────────────
function renderRepos() {
  const sorted = [...allRepos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );

  document.getElementById("repo-count").textContent =
    sorted.length + " repositor" + (sorted.length === 1 ? "y" : "ies");

  show("repos-section");

  const list = document.getElementById("repos-list");

  if (sorted.length === 0) {
    list.innerHTML =
      '<div class="empty"><i class="ti ti-folder-off" style="font-size:26px;display:block;margin-bottom:8px"></i>No public repositories.</div>';
    return;
  }

  list.innerHTML = sorted
    .map(
      (r) => `
        <div class="repo">
          <div class="repo-top">
            <div class="repo-name">
              <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
            </div>
            ${r.fork ? '<span class="fork-badge">fork</span>' : ""}
          </div>
          ${r.description ? `<div class="repo-desc">${r.description}</div>` : '<div style="height:4px"></div>'}
          <div class="repo-bottom">
            ${
              r.language
                ? `
              <span class="repo-stat">
                <span class="lang-dot" style="background:${LANG_COLORS[r.language] || LANG_COLORS.default}"></span>
                ${r.language}
              </span>`
                : ""
            }
            <span class="repo-stat"><i class="ti ti-star"></i>${fmt(r.stargazers_count)}</span>
            <span class="repo-stat"><i class="ti ti-git-fork"></i>${fmt(r.forks_count)}</span>
            <span class="repo-stat"><i class="ti ti-clock"></i>${timeAgo(r.pushed_at)}</span>
          </div>
        </div>
      `,
    )
    .join("");
}

// ── Language breakdown chart ──────────────────────────────────────────
function renderLangChart(repos) {
  const map = {};
  repos.forEach((r) => {
    if (r.language) map[r.language] = (map[r.language] || 0) + 1;
  });

  const entries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  if (!entries.length) return;

  const totalWithLang = repos.filter((r) => r.language).length;
  const max = entries[0][1];

  document.getElementById("lang-bars").innerHTML = entries
    .map(([lang, count]) => {
      const pct = Math.round((count / totalWithLang) * 100);
      const color = LANG_COLORS[lang] || LANG_COLORS.default;
      return `
          <div class="lang-row">
            <span class="lang-label">
              <span class="lang-dot" style="background:${color}"></span>
              ${lang}
            </span>
            <div class="lang-track">
              <div class="lang-fill" style="width:${Math.round((count / max) * 100)}%;background:${color}"></div>
            </div>
            <span class="lang-pct">${pct}%</span>
          </div>`;
    })
    .join("");

  show("lang-card");
}