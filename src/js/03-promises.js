import Notiflix from 'notiflix';
const formRef = document.querySelector('form');
function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const obj = {}
    formData.forEach((value, key) => obj[key] = +value);
    for (let i = 0; i < obj.amount; i++) {
    createPromise(i + 1, obj.delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
        obj.delay += obj.step       
    }
}
function createPromise( position, delay ) {
    const flag = Math.random() > 0.3
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (flag) {
              resolve({position, delay})
            }
            reject({position, delay})
      }, delay)  
    })
}
formRef.addEventListener('submit', onSubmit)