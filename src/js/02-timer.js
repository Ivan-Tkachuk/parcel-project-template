import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  input: document.getElementById('datetime-picker'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

refs.btnStart.disabled = true;
let selectedDate;
let deltaTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (new Date() >= selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    }
    if (new Date() < selectedDates[0]) {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', onStartTimer);

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    const timeOut = setInterval(() => {
      const currentTime = Date.now();
      deltaTime = selectedDate - currentTime;
      const time = convertMs(deltaTime);
      if (deltaTime <= 0) {
        clearInterval(timeOut);
        return;
      }

      updateClockface(time);
    }, 1000);
  },
};

function onStartTimer() {
  timer.start();
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
