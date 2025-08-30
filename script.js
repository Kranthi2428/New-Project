// Load and display products
let allProducts = [];

// Load products from JSON
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    allProducts = await response.json();
    displayProducts(allProducts);
    populateCategories();
    updateProductCount();
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('empty').classList.remove('hidden');
  }
}

// Display products in grid
function displayProducts(products) {
  const grid = document.getElementById('product-grid');
  const empty = document.getElementById('empty');
  
  if (products.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  
  empty.classList.add('hidden');
  grid.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-content">
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
        <div class="meta">${product.category} • ${product.tag}</div>
        <a href="${product.link}" target="_blank" class="btn">View Product</a>
      </div>
    </div>
  `).join('');
}

// Populate category dropdown
function populateCategories() {
  const categorySelect = document.getElementById('category');
  const categories = [...new Set(allProducts.map(p => p.category))];
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Update product count in footer
function updateProductCount() {
  document.getElementById('count').textContent = allProducts.length;
}

// Search and filter functionality
function filterProducts() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const selectedCategory = document.getElementById('category').value;
  const sortBy = document.getElementById('sort').value;
  
  let filtered = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.category.toLowerCase().includes(searchTerm) ||
                         product.tag.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
      break;
    case 'price-desc':
      filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  
  displayProducts(filtered);
}

// Sidebar functionality
function initSidebar() {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.getElementById("overlay");
  
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  
  menuBtn.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
}

// Slider functionality
function initSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll(".dots span");
  
  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }
  
  // Navigation buttons
  document.querySelector(".prev").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
  
  document.querySelector(".next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
  
  // Auto-slide
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
  
  // Make slider images clickable
  document.querySelectorAll(".slides img").forEach(img => {
    img.addEventListener("click", () => {
      const link = img.getAttribute("data-link");
      if (link) window.open(link, "_blank");
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Initialize components
  initSidebar();
  initSlider();
  loadProducts();
  
  // Add event listeners for search and filter
  document.getElementById('search').addEventListener('input', filterProducts);
  document.getElementById('category').addEventListener('change', filterProducts);
  document.getElementById('sort').addEventListener('change', filterProducts);
  
  // Logo click to refresh
  document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});