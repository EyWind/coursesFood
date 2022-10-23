import { addZero } from "../services/services";

export default function timer(timerSelector) {
   
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

         days.textContent = addZero(t.days);
         hours.textContent = addZero(t.hours);
         minutes.textContent = addZero(t.minutes);
         seconds.textContent = addZero(t.seconds);

         if (t.total <= 0) clearInterval(timeInterval);
      }
   }

   setTime(timerSelector, endTime);
}