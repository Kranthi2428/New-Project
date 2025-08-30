// ===== HEADER LOGO REFRESH =====
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = "index.html"; // reload home page
  });
  
  // ===== SIDEBAR MENU =====
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");
  
  // Open sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
  });
  
  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
  }
  
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  
  // Close sidebar on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
  
  // ===== SLIDER SCRIPT =====
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  
  // 1. Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".dots span");
  
  // 2. Show slide function
  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
  
    currentSlide = (index + slides.length) % slides.length;
  
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // 3. Slide Creator function 

  document.querySelectorAll(".slides img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      const link = img.getAttribute("data-link");
      if (link) window.open(link, "_blank");
    });
  });
  
  // 3. Prev/Next buttons
  document.querySelector(".prev").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
  document.querySelector(".next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
  
  // 4. Auto-slide every 5s
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
  
  // 5. Init first slide
  showSlide(0);
  
  // ===== YEAR FOOTER =====
  document.getElementById("year").textContent = new Date().getFullYear();
  