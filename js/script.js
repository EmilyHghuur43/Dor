document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav ul li a');
    
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                if (pageYOffset >= (sectionTop - headerHeight - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || 
                    link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('feedback-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to the server
            // For demonstration, we'll just show a success message
            const modal = document.getElementById('success-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
            
            // Reset form
            this.reset();
        });
    }

    // Modal close
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('success-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Service tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Gallery lightbox (would need additional HTML/CSS)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Here you would typically open a lightbox with the full image
                // For simplicity, we'll just log to console
                console.log('Opening gallery item:', this.querySelector('img').src);
            });
        });
    }
});

// Price calculator functionality
function initPriceCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const serviceType = document.getElementById('service-type').value;
            const area = parseFloat(document.getElementById('area').value);
            const material = document.getElementById('material').value;
            
            if (!serviceType || !area || isNaN(area)) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            let pricePerUnit = 0;
            
            // Примерные цены для калькулятора (можно заменить на реальные)
            switch(serviceType) {
                case 'asphalt':
                    pricePerUnit = material === 'premium' ? 700 : (material === 'economy' ? 450 : 550);
                    break;
                case 'paving':
                    pricePerUnit = material === 'premium' ? 1500 : (material === 'economy' ? 600 : 900);
                    break;
                case 'fence':
                    pricePerUnit = material === 'premium' ? 4500 : (material === 'economy' ? 1800 : 2500);
                    break;
                case 'foundation':
                    pricePerUnit = material === 'premium' ? 5500 : (material === 'economy' ? 3500 : 4500);
                    break;
                default:
                    pricePerUnit = 0;
            }
            
            const total = Math.round(area * pricePerUnit);
            document.querySelector('.calculator-result .result-value').textContent = 
                total.toLocaleString('ru-RU') + ' руб.';
            document.querySelector('.calculator-result').style.display = 'block';
        });
    }
}

function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');  // Исправлено: убраны лишние точки
    const galleryItems = document.querySelectorAll('.gallery-item');  // Исправлено: убраны лишние точки

    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.project-slider .slide');
  let currentSlide = 0;
  
  // Показываем первый слайд
  slides[currentSlide].classList.add('active');
  
  // Функция для переключения слайдов
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  // Добавляем кнопки навигации (опционально)
  const sliderNav = document.createElement('div');
  sliderNav.className = 'slider-nav';
  
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Назад';
  prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
  
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Вперед';
  nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
  
  sliderNav.appendChild(prevButton);
  sliderNav.appendChild(nextButton);
  
  document.querySelector('.project-slider').after(sliderNav);
  
  // Автопереключение (опционально)
  let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  
  // Остановка автопереключения при наведении
  const slider = document.querySelector('.project-slider');
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  });
});