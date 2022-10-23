
export function closeModal(selector) {
   const modalWindow = document.querySelector(selector);

   modalWindow.classList.add('hide');
   modalWindow.classList.remove('show');
   document.body.style.overflow = '';
}

export function showModal(selector, modalTimerId, shoWmodalOnScroll) {
const modalWindow = document.querySelector(selector);

   modalWindow.classList.add('show');
   modalWindow.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   modalTimerId ? clearTimeout(modalTimerId) : null;

   shoWmodalOnScroll ? window.removeEventListener('scroll', shoWmodalOnScroll) : null;
   
}

export default function modal(triggerSelector, modalSelector, modalTimerId) {
   
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