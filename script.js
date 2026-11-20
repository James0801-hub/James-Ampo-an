document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. TYPING ANIMATION IN HERO SECTION
  ========================================= */
  const phrases = [
    "Multimedia Computing.",
    "Modern Web Design.",
    "Interactive UI & Graphics.",
    "Creative Coding & Games."
  ];
  const typingElement = document.getElementById("typingText");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* =========================================
     2. GRAPHICAL USER INTERFACE: LOGIN & LOGOUT
  ========================================= */
  const loginModal = document.getElementById("loginModal");
  const openLoginBtn = document.getElementById("openLoginBtn");
  const closeLoginBtn = document.getElementById("closeLoginBtn");
  const loginForm = document.getElementById("loginForm");
  const authControls = document.getElementById("authControls");
  const userDashboardBar = document.getElementById("userDashboardBar");
  const loggedUserDisplay = document.getElementById("loggedUserDisplay");
  const logoutBtn = document.getElementById("logoutBtn");
  const editProfileQuickBtn = document.getElementById("editProfileQuickBtn");
  const heroBio = document.getElementById("heroBio");

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3200);
  }

  function updateAuthUI() {
    const savedUser = localStorage.getItem("bsemcPortfolioUser");
    if (savedUser) {
      authControls.innerHTML = `<span style="font-size:0.85rem; color:#38bdf8; font-weight:600;">Hi, ${savedUser}</span>`;
      loggedUserDisplay.textContent = savedUser;
      userDashboardBar.classList.remove("hidden");
    } else {
      authControls.innerHTML = `<button id="openLoginBtn" class="btn btn-primary btn-sm">Log In</button>`;
      userDashboardBar.classList.add("hidden");
      document.getElementById("openLoginBtn").addEventListener("click", () => {
        loginModal.classList.remove("hidden");
      });
    }
  }

  // Open & Close Modal
  openLoginBtn.addEventListener("click", () => loginModal.classList.remove("hidden"));
  closeLoginBtn.addEventListener("click", () => loginModal.classList.add("hidden"));
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.add("hidden");
  });

  // Handle Login Submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("loginUsername").value.trim();
    if (usernameInput) {
      localStorage.setItem("bsemcPortfolioUser", usernameInput);
      loginModal.classList.add("hidden");
      updateAuthUI();
      showToast(`Logged in successfully as ${usernameInput}!`);
    }
  });

  // Handle Logout
  logoutBtn.addEventListener("click", () => {
    const currentUser = localStorage.getItem("bsemcPortfolioUser");
    localStorage.removeItem("bsemcPortfolioUser");
    updateAuthUI();
    showToast(`Logged out (${currentUser}). Session ended.`);
  });

  // Logged-In Feature: Quick Edit Hero Bio
  editProfileQuickBtn.addEventListener("click", () => {
    const newBio = prompt("Update your portfolio introduction bio:", heroBio.textContent.trim());
    if (newBio && newBio.trim().length > 0) {
      heroBio.textContent = newBio.trim();
      showToast("Portfolio bio updated live!");
    }
  });

  // Check login state on page load
  updateAuthUI();

  /* =========================================
     3. INTERACTIVE CONTACT FORM
  ========================================= */
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("senderName").value.trim();
    formFeedback.textContent = `Thank you, ${name}! Your message has been sent to James B. Ampo-an.`;
    showToast("Message sent to jimsberongoy@gmail.com!");
    contactForm.reset();
  });

  /* =========================================
     4. SCROLL REVEAL & ACTIVE NAV HIGHLIGHT
  ========================================= */
  const reveals = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function handleScroll() {
    const triggerBottom = window.innerHeight * 0.86;
    reveals.forEach((sec) => {
      const boxTop = sec.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        sec.classList.add("visible");
      }
    });

    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});