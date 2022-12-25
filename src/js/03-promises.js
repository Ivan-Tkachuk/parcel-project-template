import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onGeneratePromise);

function onGeneratePromise(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let quantity = Number(amount.value);

  for (let i = 0; i < quantity; i += 1) {
    const delay = firstDelay + delayStep * i;
    let position = i + 1;
    createPromise(position, delay).then(onSuccess).catch(onError);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
