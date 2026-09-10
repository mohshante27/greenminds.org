// script.js - Simplified with Working Looping Sliders
// Fixed: mobile menu toggle, safe guards, testimonial carousel support

document.addEventListener('DOMContentLoaded', function() {
    console.log('Green Minds - Initializing all sliders...');
    
    // Initialize all functionality
    initMobileNavigation();
    updateBreadcrumb();
    initSearch();
    initSlideshow();
    initTeamSlider();
    initPartnersSlider();
    initCoreValuesScrolling();
    initTestimonialCarousel();
});

/* ============================================================
   MOBILE NAVIGATION (FIXED)
   ============================================================ */
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const headerNavContent = document.getElementById('headerNavContent');
    
    if (!mobileMenuBtn || !headerNavContent) return;
    
    // Toggle menu on burger click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();   // critical: stops the outside-click handler from instantly closing it
        headerNavContent.classList.toggle('mobile-open');
        
        // Swap burger ↔ X icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (headerNavContent.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when a nav link is clicked
    headerNavContent.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            headerNavContent.classList.remove('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', function(event) {
        if (window.innerWidth > 768) return;
        if (!event.target.closest('.header-nav-container')) {
            headerNavContent.classList.remove('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when resizing back to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            headerNavContent.classList.remove('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/* ============================================================
   BREADCRUMB
   ============================================================ */
function updateBreadcrumb() {
    const breadcrumbElement = document.getElementById('currentPage');
    if (!breadcrumbElement) return;
    
    const currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '' || currentPage === 'index.html') {
        breadcrumbElement.textContent = 'Home';
        return;
    }
    
    const pageName = currentPage.replace('.html', '').replace(/-/g, ' ');
    breadcrumbElement.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Base URL prefix depending on folder depth
    const isInPages = window.location.pathname.includes('/pages/');
    const base = isInPages ? '' : 'pages/';
    const homeBase = isInPages ? '../' : '';
    
    const searchData = [
        { title: "Home", description: "Green Minds Youth Initiative home page", url: homeBase + "index.html" },
        { title: "About Us", description: "Learn about our mission and vision", url: base + "about.html" },
        { title: "Projects", description: "Our environmental initiatives", url: base + "projects.html" },
        { title: "Sustainable Farming", description: "Climate-smart agriculture program", url: base + "project-agriculture.html" },
        { title: "Green Schools", description: "Environmental education program", url: base + "project-education.html" },
        { title: "Snail Farming", description: "Sustainable aquaculture program", url: base + "project-heliculture.html" },
        { title: "Zero Waste", description: "Waste management and recycling", url: base + "waste-management.html" },
        { title: "Donate", description: "Support our cause", url: base + "donate.html" },
        { title: "Contact", description: "Get in touch with us", url: base + "contact.html" }
    ];
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        
        displayResults(results);
    }
    
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<h4>${result.title}</h4><p>${result.description}</p>`;
                item.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                searchResults.appendChild(item);
            });
        }
        
        searchResults.style.display = 'block';
    }
    
    searchInput.addEventListener('input', performSearch);
    if (searchButton) searchButton.addEventListener('click', performSearch);
    
    // Close results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
}

/* ============================================================
   MAIN SLIDESHOW (Home page hero)
   ============================================================ */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].style.display = 'block';
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    
    showSlide(0);
    setInterval(nextSlide, 5000);
    
    const prevBtn = document.querySelector('.slideshow-container .prev');
    const nextBtn = document.querySelector('.slideshow-container .next');
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    console.log('Main slideshow initialized with', slides.length, 'slides');
}

/* ============================================================
   TEAM SLIDER
   ============================================================ */
function initTeamSlider() {
    const slider = document.querySelector('.team-slider');
    const slides = document.querySelectorAll('.team-slide');
    const prevBtn = document.querySelector('.team-slider-btn.prev');
    const nextBtn = document.querySelector('.team-slider-btn.next');
    const dots = document.querySelectorAll('.team-slider-dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 25; // 25 = gap
        const maxIndex = Math.max(0, slides.length - getSlidesPerView());
        
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;
        
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        const activeDotIndex = Math.floor(currentIndex / getSlidesPerView());
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }
    
    function nextSlide() { currentIndex++; updateSlider(); }
    function prevSlide() { currentIndex--; updateSlider(); }
    
    updateSlider();
    setInterval(nextSlide, 4000);
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * getSlidesPerView();
            updateSlider();
        });
    });
    
    window.addEventListener('resize', updateSlider);
    
    console.log('Team slider initialized with', slides.length, 'slides');
}

/* ============================================================
   PARTNERS SLIDER
   ============================================================ */
function initPartnersSlider() {
    const slider = document.querySelector('.partners-slider');
    const slides = document.querySelectorAll('.partner-card');
    const prevBtn = document.querySelector('.partner-slider-btn.prev');
    const nextBtn = document.querySelector('.partner-slider-btn.next');
    const dots = document.querySelectorAll('.partner-slider-dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 4;
    }
    
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 30; // 30 = gap
        const maxIndex = Math.max(0, slides.length - getSlidesPerView());
        
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;
        
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        const activeDotIndex = Math.floor(currentIndex / getSlidesPerView());
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }
    
    function nextSlide() { currentIndex++; updateSlider(); }
    function prevSlide() { currentIndex--; updateSlider(); }
    
    updateSlider();
    setInterval(nextSlide, 3500);
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * getSlidesPerView();
            updateSlider();
        });
    });
    
    window.addEventListener('resize', updateSlider);
    
    console.log('Partners slider initialized with', slides.length, 'slides');
}

/* ============================================================
   CORE VALUES SCROLLING (About page)
   ============================================================ */
function initCoreValuesScrolling() {
    const scrollContainer = document.getElementById('valuesScroll');
    if (!scrollContainer) return;
    
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    
    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
}

/* ============================================================
   TESTIMONIAL CAROUSEL (Project pages)
   ============================================================ */
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    let currentSlide = 0;
    let autoTimer = null;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = n;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function startAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAuto();  // restart timer on manual navigation
        });
    });
    
    // Pause auto-rotation on hover (desktop)
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            if (autoTimer) clearInterval(autoTimer);
        });
        carousel.addEventListener('mouseleave', startAuto);
    }
    
    startAuto();
    console.log('Testimonial carousel initialized with', slides.length, 'slides');
}

/* ============================================================
   GLOBAL HELPERS (used by onclick attributes in HTML)
   ============================================================ */
window.plusSlides = function(n) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const currentActive = document.querySelector('.slide.active');
    let currentIndex = Array.from(slides).indexOf(currentActive);
    if (currentIndex === -1) currentIndex = 0;
    
    let newIndex = currentIndex + n;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    
    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });
    
    slides[newIndex].style.display = 'block';
    slides[newIndex].classList.add('active');
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[newIndex]) dots[newIndex].classList.add('active');
};

window.currentSlide = function(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    const index = n - 1;
    slides[index].style.display = 'block';
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
};

window.scrollValues = function(direction) {
    const scrollContainer = document.getElementById('valuesScroll');
    if (scrollContainer) {
        scrollContainer.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
};