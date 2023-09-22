import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('click', onSubmit)

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const resolveld = Math.random() > 0.3;
    setTimeout(() => {
      if (resolveld) {
        resolve({position, delay});
      } else {
          reject({position, delay});
        }
    }, delay);
  })
}

function onSubmit(evt) {
  evt.preventDefault();
  const {delay, step, amount} = evt.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);
  for (let i = 1; i <= inputAmount; i += 1) {
    inputDelay += inputStep;
    createPromise(i, inputDelay).then(({position, delay}) => {
      Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`);
    });
    evt.currentTarget.reset();
  }
}

