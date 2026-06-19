// On localhost (Live Server) there is no serverless function, so call NewsAPI
// directly with the key. When deployed (e.g. Vercel) use the secure proxy so the
// key stays server-side.
const isLocal = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const NEWS_API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = isLocal
  ? `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}&q=`
  : "/api/news?q="; // same-origin call to our Vercel serverless function
 
// Cache config
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const newsCache = {}; // { [query]: { articles: [...], timestamp: number } }
 
window.addEventListener("load", function () {
  fetchNews("India");
});
 
function reload() {
  window.location.reload();
}
 
async function fetchNews(query) {
  const cacheKey = query.toLowerCase();
  const cached = newsCache[cacheKey];
  const now = Date.now();
 
  // Serve from cache if it exists and hasn't expired
  if (cached && now - cached.timestamp < CACHE_DURATION_MS) {
    console.log(`Serving "${query}" from cache`);
    bindData(cached.articles);
    return;
  }
 
  try {
    const res = await fetch(`${url}${encodeURIComponent(query)}`);
    const data = await res.json();
 
    if (!res.ok || data.status === "error" || !Array.isArray(data.articles)) {
      if (cached) {
        console.warn(`API error, serving stale cache for "${query}"`);
        bindData(cached.articles);
        return;
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
 
    // Save to cache
    newsCache[cacheKey] = {
      articles: data.articles,
      timestamp: now,
    };
 
    bindData(data.articles);
  } catch (err) {
    console.error("Failed to fetch news:", err);
 
    // Last resort: serve stale cache if available, even if expired
    if (cached) {
      bindData(cached.articles);
    } else {
      const cardsContainer = document.getElementById("cards-container");
      cardsContainer.innerHTML = `<p class="error-msg">Unable to load news right now. Please try again later.</p>`;
    }
  }
}
 
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
 
  cardsContainer.innerHTML = "";
 
  if (!Array.isArray(articles) || articles.length === 0) {
    cardsContainer.innerHTML = `<p class="error-msg">No articles found.</p>`;
    return;
  }
 
  articles.forEach(function (article) {
    if (!article.urlToImage) {
      return;
    }
    const cardClone = newsCardTemplate.content.cloneNode(true);
 
    fillDataInCard(cardClone, article);
 
    cardsContainer.appendChild(cardClone);
  });
}
 
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
 
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
 
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
 
  newsSource.innerHTML = `${article.source.name} · ${date}`;
 
  cardClone.firstElementChild.addEventListener("click", function () {
    window.open(article.url, "_blank");
  });
}
 
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  if (curSelectedNav != null) {
    curSelectedNav.classList.remove("active");
  }
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
 
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
 
searchButton.addEventListener("click", function () {
  const query = searchText.value;
 
  if (!query) {
    return;
  }
 
  fetchNews(query);
 
  if (curSelectedNav != null) {
    curSelectedNav.classList.remove("active");
  }
  curSelectedNav = null;
});