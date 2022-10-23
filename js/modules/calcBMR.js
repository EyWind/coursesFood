export default function calcBMR() {
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