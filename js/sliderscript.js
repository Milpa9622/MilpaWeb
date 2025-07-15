    document.addEventListener('DOMContentLoaded', function() {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');
      const prevBtn = document.querySelector('.prev');
      const nextBtn = document.querySelector('.next');
      const dotsContainer = document.querySelector('.dots-container');
      
      // Dynamically set the slider width based on number of slides
      const slideCount = slides.length;
      slider.style.width = `${slideCount * 100}%`;
      
      // Set each slide width
      slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
      });
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      // Create dots
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
      
      // Get all dots
      const dots = document.querySelectorAll('.dot');
      
      // Go to specific slide
      function goToSlide(index) {
        currentIndex = index;
        const slideWidth = 100 / totalSlides;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots();
      }
      
      // Update active dot
      function updateDots() {
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      // Next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
      }
      
      // Previous slide
      function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
      }
      
      // Event listeners
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Auto slide (optional)
      let autoSlideInterval = setInterval(nextSlide, 5000);
      
      // Pause auto slide on hover
      const sliderContainer = document.querySelector('.slider-container');
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
      });
      
      // Optional: keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });
    });