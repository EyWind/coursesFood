/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calcBMR.js":
/*!*******************************!*\
  !*** ./js/modules/calcBMR.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calcBMR)
/* harmony export */ });
function calcBMR() {
   /* Calc */

   const calcRes = document.querySelector('.calculating__result span'),
         activeClass = 'calculating__choose-item_active';

   let gender,
       height, 
       weight, 
       age, 
       ratio;

   if (localStorage.getItem('gender')) {
      gender = localStorage.getItem('gender');
   } else {
      gender = 'female';
      localStorage.setItem('gender', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.37;
      localStorage.setItem('ratio', 1.37);
   }

   function calcBMR() {
      if (!gender || !height || !weight || !age || !ratio) {
         calcRes.textContent = '____';
         return;
      }

      if (gender === 'female') {
         calcRes.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         calcRes.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   };

   calcBMR()

   function getStaticData (selector, active) {
      const elements = document.querySelectorAll(`${selector} div`);

      elements.forEach(e => {

         e.classList.remove(active);
         if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) e.classList.add(active);
         if (e.getAttribute('id') === localStorage.getItem('gender')) e.classList.add(active);
         
         e.addEventListener('click', () => {
            if (e.getAttribute('data-ratio')) {
               ratio = +e.getAttribute('data-ratio');
               localStorage.setItem('ratio', +e.getAttribute('data-ratio'));
            } else {
               gender = e.getAttribute('id');
               localStorage.setItem('gender', e.getAttribute('id'));
            }
            elements.forEach(e => e.classList.remove(active));
            e.classList.add(active);

            calcBMR();
         });
      });
   };

   function getDynamicData(selector) {
      let item = document.querySelector(`#${selector}`);

      item.addEventListener('input', () => {

         if (/\D/ig.test(item.value)) {
            item.style.border = '1px solid red';
            item.value = item.value.replace(/\D/ig, '');
         } else {

            item.style.border = 'none';
            
            switch (item.getAttribute('id')) {
               case('height'):
                  height = item.value;
                  break;
               case('weight'):
                  weight = item.value;
                  break;
               case('age'):
                  age = item.value;
                  break;
            };
         }
         
         calcBMR();
      });
   }

   const calcInputs = document.querySelectorAll('.calculating__choose_medium input');

   calcInputs.forEach(e => {
      getDynamicData(e.getAttribute('id'));
   })

   getStaticData('#gender', activeClass);
   getStaticData('.calculating__choose_big', activeClass);

}

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cards)
/* harmony export */ });
function cards() {
   /* Cards */

   const menuContainer = document.querySelector('.menu__field .container');
   menuContainer.style.alignItems = 'stretch';

   const getData = async (url) => {
      let res = await fetch(url);

      if(!res.ok) {
         throw new Error(`Something went wrong with ${url}, status is ${res.status}`)
      }

      return await res.json();
   };

   function createMenuItem ({img, altimg, title, descr, price}) {
      const item = document.createElement('div');
      item.classList.add('menu__item');
      item.innerHTML = ` 
         <img src="${img}" alt="${altimg}">
         <h3 class="menu__item-subtitle">${title}</h3>
         <div class="menu__item-descr">${descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
         </div>
      `;

      return item;
   }

   getData('http://localhost:3000/menu')
      .then(data => data.forEach(e => menuContainer.append(createMenuItem(e))));
}

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formsSelector, modalSelector, modalTimerId) {
   
   const formList = document.querySelectorAll(formsSelector),
         msgs = {
            loading: 'img/form/spinner.svg',
            done: 'it is done, soon we will contact you!',
            error: 'something went wrong :('
         }

   function bindPostForm(f) {
      f.forEach(form => {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = document.createElement('img');
            message.src = msgs.loading;
            message.style.cssText = `
               display: block;
               margin: 0 auto;
            `;
            form.after(message);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showModalMsg(msgs.done);
            })
            .catch(() => showModalMsg(msgs.error))
            .finally(() => {
               form.reset();
               message.remove();
            })
            
         });
      });
   }

   bindPostForm(formList);

   function showModalMsg(msg) {
      const prevModal = document.querySelector('.modal__content');
      prevModal.classList.remove('show');
      prevModal.classList.add('hide');

      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector, modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__content');
      thanksModal.innerHTML = `
         <div data-close class="modal__close">×</div>
         <div class="modal__title">${msg}</div>
      `;

      document.querySelector('.modal__dialog').append(thanksModal);

      setTimeout(() => {
         thanksModal.remove();
         prevModal.classList.remove('hide');
         prevModal.classList.add('show');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
      }, 4000);
   }
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (/* binding */ modal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });

function closeModal(selector) {
   const modalWindow = document.querySelector(selector);

   modalWindow.classList.add('hide');
   modalWindow.classList.remove('show');
   document.body.style.overflow = '';
}

function showModal(selector, modalTimerId, shoWmodalOnScroll) {
const modalWindow = document.querySelector(selector);

   modalWindow.classList.add('show');
   modalWindow.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   modalTimerId ? clearTimeout(modalTimerId) : null;

   shoWmodalOnScroll ? window.removeEventListener('scroll', shoWmodalOnScroll) : null;
   
}

function modal(triggerSelector, modalSelector, modalTimerId) {
   
   const modalTrigger = document.querySelectorAll(triggerSelector),
         modalWindow = document.querySelector(modalSelector);
         
   modalTrigger.forEach(e => {
      e.addEventListener('click', () => showModal(modalSelector, modalTimerId));
   });
   
   modalWindow.addEventListener('click', (e) => {
      e.target === modalWindow || e.target.getAttribute('data-close') == '' ? closeModal(modalSelector) : null;
   });

   document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && modalWindow.classList.contains('show') ? closeModal(modalSelector) : null;
   });
   
   function shoWmodalOnScroll() {
      const n = Math.ceil(window.pageYOffset) + document.documentElement.clientHeight;
      if (n >= document.documentElement.scrollHeight) showModal(modalSelector, modalTimerId, shoWmodalOnScroll);
   }
   
   window.addEventListener('scroll', shoWmodalOnScroll);
}

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function slider({wrapperSelector, innerSelector, current, total, prev, next, slidesSelector, praent}) {

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

   sliderTotal.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(slides.length);

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
      sliderCurrent.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs(parentSelector, contentSelector, tabsSelector, activeClass) {
   const tabsParent = document.querySelector(parentSelector),
   tabContent = document.querySelectorAll(contentSelector),
   tabs = document.querySelectorAll(tabsSelector);

   function hideContent() {
      tabContent.forEach(e => {
         e.classList.add('hide')
         e.classList.remove('show', 'fade')
      });
      tabs.forEach(e => e.classList.remove(activeClass));
   }

   function showContent(i = 0) {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');

      tabs[i].classList.add(activeClass);
   }

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.matches('.' + activeClass.replace(/_active/ig, ''))) {
         tabs.forEach((el, i) => {
            if (el == target) {
               hideContent();
               showContent(i);
            }
         });
      };
   });

   hideContent();
   showContent();

}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function timer(timerSelector) {
   
   const now = new Date().getFullYear(),
   endTime = `${now}-12-31`;

   function getRemainingTime(deadLine) {
      let days, hours, minutes, seconds;
      const t = Date.parse(deadLine) - Date.parse(new Date());

      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = parseInt(t / (1000 * 60 * 60 * 24)),
         hours = parseInt((t / (1000 * 60 * 60)) % 24),
         minutes = parseInt((t / (1000 * 60)) % 60),
         seconds = parseInt((t / 1000) % 60);
      }

      return {t, days, hours, minutes, seconds}
   }

   function setTime(selector, deadLine) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTime, 1000);

      updateTime();
            
      function updateTime() {
         const t = getRemainingTime(deadLine);

         days.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(t.days);
         hours.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(t.hours);
         minutes.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(t.minutes);
         seconds.textContent = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.addZero)(t.seconds);

         if (t.total <= 0) clearInterval(timeInterval);
      }
   }

   setTime(timerSelector, endTime);
}

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": () => (/* binding */ addZero),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
function addZero(num) {
   return num >= 0 && num < 10 ? `0${num}` : num
}

const postData = async (url, data) => {
   let res = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: data
   });

   return await res.json();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calcBMR__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calcBMR */ "./js/modules/calcBMR.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











window.addEventListener('DOMContentLoaded', () => {

   const modalTimerId = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 3000);

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer');
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
   (0,_modules_calcBMR__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_form__WEBPACK_IMPORTED_MODULE_5__["default"])('form', '.modal', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
      wrapperSelector: '.offer__slider-wrapper',
      innerSelector: '.offer__slider-inner',
      current: '#current',
      total: '#total',
      prev: '.offer__slider-prev',
      next: '.offer__slider-next',
      slidesSelector: '.offer__slide',
      praent: '.offer__slider'
   });
   
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map