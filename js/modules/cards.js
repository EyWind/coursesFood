export default function cards() {
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