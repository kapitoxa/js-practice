function slider() {
    'use strict';
    
    let slideIndex = 1;
    let slides = document.querySelectorAll('.slider-item');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let dotsWrap = document.querySelector('.slider-dots');
    let dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    
    function showSlides(activeSlideIndex) {
        if (activeSlideIndex > slides.length) {
            slideIndex = 1;
        }

        if (activeSlideIndex < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(nextSlideIndex) {
        showSlides(slideIndex += nextSlideIndex);
    }

    function currenSlide(currenSlideIndex) {
        showSlides(slideIndex = currenSlideIndex);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currenSlide(i);
            }
        }
    });
}

module.exports = slider;