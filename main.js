import * as HomePage from "./source/pages/home/home.js";
import * as SolPage from "./source/pages/sol/sol.js";
import * as ClockPage from "./source/pages/clock/clock.js";
import * as PanoramaPage from "./source/pages/panorama/panorama.js";
import * as LinesPage from "./source/pages/lines/lines.js";

const routes = {
  "/": HomePage,
  sol: SolPage,
  clock: ClockPage,
  panorama: PanoramaPage,
  lines: LinesPage,
};

async function loadContent(route) {
  const module = routes[route] || HomePage;

  document.getElementById("app").innerHTML = module.HTML;

  if (module.init) {
    module.init();
  } else {
    console.warn(`No init function for route: ${route}`);
  }
}

function router() {
  const hash = window.location.hash.slice(1); // Remove '#' from the hash
  loadContent(hash);
}

function navigate(path) {
  window.location.hash = path; // Update hash in URL
  router();
}
// Initialize router on page load and hash change
window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

// Attach navigation event to links
document.querySelectorAll("a[data-link]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href").slice(1); // Remove leading '/'
    navigate(href);
  });
});
