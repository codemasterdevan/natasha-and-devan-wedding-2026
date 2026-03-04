// ==========================
// Global Elements (define ONCE)
// ==========================
const intro = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");

const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

const menuBtn = document.getElementById("menuBtn");
const burgerIcon = document.getElementById("burgerIcon");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("#mobileMenu a");

// Hide/show mobile menu UI until intro is completed
function setMobileMenuEnabled(enabled) {
  if (!menuBtn || !mobileMenu) return;

  if (enabled) {
    menuBtn.classList.remove("hidden");
    menuBtn.style.pointerEvents = "auto";
    menuBtn.setAttribute("aria-hidden", "false");

    // Keep menu closed by default when enabling
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.style.pointerEvents = "auto";
    mobileMenu.setAttribute("aria-hidden", "false");
  } else {
    // Force closed + hide button
    if (burgerIcon) burgerIcon.classList.remove("open");
    menuBtn.classList.add("hidden");
    menuBtn.classList.remove("open");
    menuBtn.style.pointerEvents = "none";
    menuBtn.setAttribute("aria-hidden", "true");

    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.style.pointerEvents = "none";
    mobileMenu.setAttribute("aria-hidden", "true");
  }
}

// ==========================
// DOM Ready (Intro Handling)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  if (!intro) return;

  // Prepare smooth fade-in
  if (mainContent) {
    mainContent.style.opacity = "0";
    mainContent.style.transition = "opacity 0.8s ease";
  }

  const introDone = sessionStorage.getItem("introCompleted") === "true";

  if (introDone) {
    intro.style.display = "none";
    document.body.classList.remove("overflow-hidden");

    if (progressBar) progressBar.classList.remove("hidden");
    if (backToTop) backToTop.classList.remove("hidden");

    // ✅ Allow mobile menu ONLY after intro
    setMobileMenuEnabled(true);

    setTimeout(() => {
      if (mainContent) mainContent.style.opacity = "1";
    }, 50);
  } else {
    // ✅ Hide mobile menu until they enter through intro
    setMobileMenuEnabled(false);

    // If you want content visible behind intro, keep this:
    if (mainContent) mainContent.style.opacity = "1";
  }
});


// ==========================
// Enter Site Intro Animation
// ==========================
function enterSite() {
  const flap = document.querySelector(".flap");
  if (!flap || !intro) return;

  flap.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      document.body.classList.remove("overflow-hidden");

      if (progressBar) progressBar.classList.remove("hidden");

      // Mark intro as completed for THIS SESSION ONLY
      sessionStorage.setItem("introCompleted", "true");

      // ✅ Now reveal/enable mobile menu
      setMobileMenuEnabled(true);
    }, 1000);
  }, 800);
}


// ==========================
// Generate Floating Sparkles
// ==========================
const container = document.getElementById("sparkles");

if (container) {
  for (let i = 0; i < 50; i++) {

    const s = document.createElement("span");
    s.textContent = "✦";

    s.style.position = "fixed";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.fontSize = 8 + Math.random() * 14 + "px";
    s.style.animationDuration = 4 + Math.random() * 6 + "s";
    s.style.animationDelay = Math.random() * 6 + "s";

    container.appendChild(s);
  }
}


// ==========================
// Scroll Progress Bar
// ==========================
window.addEventListener("scroll", () => {

  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;

  if (bar) bar.style.width = progress + "%";

});


// ==========================
// Mobile Menu (Full Controlled Version)
// ==========================
const menuBtn = document.getElementById("menuBtn");
const burgerIcon = document.getElementById("burgerIcon");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("#mobileMenu a");

if (menuBtn && burgerIcon && mobileMenu) {

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("translate-x-0");
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when clicking nav links
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  function openMenu() {
    burgerIcon.classList.add("open");
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    menuBtn.classList.add("open");

    // Lock scroll
    document.body.classList.add("overflow-hidden");

    // Fade out floating UI
    if (progressBar) {
      progressBar.style.opacity = "0";
      progressBar.style.pointerEvents = "none";
    }

    if (backToTop) {
      backToTop.style.opacity = "0";
      backToTop.style.pointerEvents = "none";
    }
  }

  function closeMenu() {
    burgerIcon.classList.remove("open");
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    menuBtn.classList.remove("open");

    // Restore scroll
    document.body.classList.remove("overflow-hidden");

    // Fade UI back in
    if (progressBar) {
      progressBar.style.opacity = "1";
      progressBar.style.pointerEvents = "auto";
    }

    if (backToTop) {
      backToTop.style.opacity = "1";
      backToTop.style.pointerEvents = "auto";
    }
  }
}


// ==========================
// Countdown
// ==========================
const targetDate = new Date("August 17, 2026 15:15:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {

  if (!daysEl) return;

  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==========================
// Fade-in Animation on Scroll
// ==========================
const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0");
      entry.target.classList.add("opacity-100");
    }
  });
});

faders.forEach(el => {
  el.classList.add("opacity-0", "transition", "duration-1000");
  observer.observe(el);
});

// ==========================
// Music Toggle
// ==========================
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

if (musicBtn && music) {
  music.volume = 0.4; // soft level

  musicBtn.addEventListener("click", () => {

    if (music.paused) {
      music.play();
      musicText.textContent = "Pause Music";
      musicBtn.classList.remove("music-off");
    } else {
      music.pause();
      musicText.textContent = "Play Music";
      musicBtn.classList.add("music-off");
    }

  });
}

// ==========================
// Timeline Animation
// ==========================
document.addEventListener("DOMContentLoaded", function() {
  var timelineBlocks = document.querySelectorAll(".timeline-block");

  // hide timeline blocks which are outside the viewport
  timelineBlocks.forEach(function(block) {
    if (block.getBoundingClientRect().top > window.innerHeight * 0.75) {
      block.querySelectorAll('.timeline-icon, .timeline-content').forEach(function(elem) {
        elem.classList.add('is-hidden');
      });
    }
  });

  // on scrolling, show/animate timeline blocks when enter the viewport
  window.addEventListener("scroll", function() {
    timelineBlocks.forEach(function(block) {
      if (block.getBoundingClientRect().top <= window.innerHeight * 0.75 && block.querySelector('.timeline-icon').classList.contains('is-hidden')) {
        block.querySelectorAll('.timeline-icon, .timeline-content').forEach(function(elem) {
          elem.classList.remove('is-hidden');
          elem.classList.add('bounce-in');
        });
      }
    });
  });
});


// --------------------------
// Global Utility Functions
// --------------------------

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// --------------------------
// DOM Ready
// --------------------------

document.addEventListener("DOMContentLoaded", function () {

    const imageFolder = "./assets/images/gallery/";

    const images = [
      "19488d32-e211-4bcf-a1bb-3ee4adb8ba01.jpeg",
      "526d5651-66ff-4f3a-8dad-fe4399ca4868.jpeg",
      "583335716_10161911867106434_5252318009244233_n.jpg",
      "583925007_10161911868301434_5852538330777140823_n.jpg",
      "585284870_10161912445701434_9094274571671415102_n.jpg",
      "69bc6813-ba0e-4540-9679-59a674c1a43b.jpeg",
      "6a4c230a-ea81-4d0b-8ed7-ba300d2fd79a.jpeg",
      "72385734-89ea-4092-9744-ebb81e57ca5e.jpeg",
      "b8640718-51a4-4726-9724-ece42bb4f712.jpeg",
      "cbd7a17c-4504-4c7a-8429-6c8b036af6f2.jpeg",
      "d28e8ea6-c48d-43b9-8c68-dce22b589980.jpeg",
      "d32468fc-e782-4058-a3d2-ba09f91403c9.jpeg",
      "dc92fb85-0ba8-4981-8c82-9152bd2cb63b.jpeg",
      "ec8ce731-2aee-4a66-a510-1e79ef431117.jpeg"
    ];

    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid) return;

    const randomImages = shuffle([...images]).slice(0, 9);

    randomImages.forEach(filename => {
        const link = document.createElement("a");
        link.href = imageFolder + filename;
        link.className = "glightbox rounded-xl shadow-lg overflow-hidden col-img";
        link.setAttribute("data-gallery", "wedding-gallery");

        const img = document.createElement("img");
        img.src = imageFolder + filename;
        img.alt = "Wedding photograph";
        img.className = "hover:scale-105 transition duration-500";

        link.appendChild(img);
        galleryGrid.appendChild(link);
    });

    const lightbox = GLightbox({
        selector: '.glightbox'
    });

    // VERY IMPORTANT for dynamically added items
    lightbox.reload();

});

// ==========================
// Back to Top
// ==========================
const backToTop = document.getElementById("backToTop");

if (backToTop) {

  // Show only after scrolling
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
      backToTop.classList.remove("hidden");
    } else {
      backToTop.classList.add("hidden");
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}
