// ===============================
// HERO ANIMATION (ON LOAD)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-animate").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.15}s`;
    el.classList.add("show");
  });
});

// ===============================
// SCROLL REVEAL (SECTION BELOW HERO)
// ===============================
const revealElements = document.querySelectorAll(".reveal-up");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => observer.observe(el));

// ===============================
// CLEAN SCROLL (NO HASH)
// ===============================
document.querySelectorAll("[data-scroll]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });

    // bersihkan URL
    history.pushState("", document.title, window.location.pathname);

    // tutup mobile menu jika terbuka
    mobileMenu.classList.remove("open");
  });
});

// ===============================
// LOGO "ARI" → RESET HERO
// ===============================
const homeBtn = document.getElementById("homeBtn");

if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState("", document.title, window.location.pathname);

    // replay hero animation
    document.querySelectorAll(".hero-animate").forEach(el => {
      el.classList.remove("show");
      void el.offsetWidth;
      el.classList.add("show");
    });
  });
}

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

// ===============================
// FORCE CLEAN URL ON REFRESH
// ===============================
if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname);
}
