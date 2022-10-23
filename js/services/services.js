export function addZero(num) {
   return num >= 0 && num < 10 ? `0${num}` : num
}

export const postData = async (url, data) => {
   let res = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: data
   });

   return await res.json();
};