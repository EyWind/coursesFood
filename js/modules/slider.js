import { addZero } from "../services/services";

export default function slider({wrapperSelector, innerSelector, current, total, prev, next, slidesSelector, praent}) {

   const sliderWrapper = document.querySelector(wrapperSelector),
         sliderInner = document.querySelector(innerSelector),
         sliderCurrent = document.querySelector(current),
         sliderTotal = document.querySelector(total),
         sliderPrev = document.querySelector(prev),
         sliderNext = document.querySelector(next),
         slides = document.querySelectorAll(slidesSelector),
         slideWidth = parseInt(window.getComputedStyle(sliderWrapper).width),
         sliderParent = document.querySelector(praent);
   
   let slideIndex = 1,
       offset = 0;

   sliderTotal.textContent = addZero(slides.length);

   slides.forEach(e => e.style.width = `${slideWidth}px`)

   sliderWrapper.style.cssText = `
      overflow: hidden;
      position: relative;
   `;
   
   sliderInner.style.cssText = `
      display: flex;
      width: ${100 * slides.length}%;
      transition: .5s all;
   `;

   function changeSlide () {
      if (offset > slideWidth * ( slides.length - 1)) {
         offset = 0;
         slideIndex = 1;
      } else if (offset < 0) {
         offset = slideWidth * ( slides.length - 1);
         slideIndex = slides.length;
      };

      dots.forEach(e => e.classList.remove('activeDot'));
      dots[slideIndex - 1].classList.add('activeDot');

      sliderInner.style.transform = `translateX(-${offset}px)`;
      sliderCurrent.textContent = addZero(slideIndex);
   }

   sliderNext.addEventListener('click', () => {
      slideIndex++      
      offset += slideWidth;
      changeSlide();
   });

   sliderPrev.addEventListener('click', () => {
      slideIndex--
      offset -= slideWidth;
      changeSlide();
   });

   /* Dots */
   
   sliderParent.style.position = 'relative';
   
   const dotsWrapper = document.createElement('ul');
   dotsWrapper.style.cssText = `
      display: flex;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      height: 20px;
      align-items: center;
   `;

   sliderParent.append(dotsWrapper);

   function createDots() {

      const dot = document.createElement('li');
      dot.setAttribute('data-dot', '');
      dot.style.cssText = `
         display: block;
         border: 2px solid rgba(146, 242, 255, 8);
         width: 25px;
         height: 7px;
         margin: 0 5px;
         transition: .5s all;
         cursor: pointer;
      `;
        
      dotsWrapper.append(dot);
   }
   
   slides.forEach(e => {
      createDots();
   });

   const dots = document.querySelectorAll('[data-dot]');

   dots.forEach((e, i) => {
      e.addEventListener('click', () => {
         slideIndex = i + 1;
         offset = slideWidth * i;
         changeSlide();
      });
   });

   changeSlide();
}