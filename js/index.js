'use strict';

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calcBMR from "./modules/calcBMR";
import forms from "./modules/form";
import slider from "./modules/slider";
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

   const modalTimerId = setTimeout( () => showModal('.modal', modalTimerId), 3000);

   tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
   modal('[data-modal]', '.modal', modalTimerId);
   timer('.timer');
   cards();
   calcBMR();
   forms('form', '.modal', modalTimerId);
   slider({
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

