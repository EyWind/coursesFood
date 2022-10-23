import { showModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "../services/services";

export default function forms(formsSelector, modalSelector, modalTimerId) {
   
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

            postData('http://localhost:3000/requests', json)
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

      showModal(modalSelector, modalTimerId);

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
         closeModal(modalSelector);
      }, 4000);
   }
}