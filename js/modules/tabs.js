export default function tabs(parentSelector, contentSelector, tabsSelector, activeClass) {
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