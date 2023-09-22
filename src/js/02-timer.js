// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysDisplay: document.querySelector('[data-days]'),
  hoursDisplay: document.querySelector('[data-hours]'),
  minutesDisplay: document.querySelector('[data-minutes]'),
  secondsDisplay: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};
refs.startBtn.disabled = true;

let countInterval = null;
let targetDate = null;

const upTime = () => {
  const currentDate = new Date();
  const differenceTime = targetDate - currentDate;
  const timeComponents = convertMs(differenceTime);


  if(differenceTime < 0) {
    clearInterval(countInterval);
    refs.startBtn.disabled = true;
    refs.dateTimePicker.disabled = false;
    Notiflix.Report.info(
      'Please choose a date in the future'
    );
    return;
  }

}

const strCount = () => {
  targetDate = new Date(refs.inputData.value);
  countInterval = setInterval(upTime, 1000);
  refs.startBtn.disabled = true;
  refs.inputData.disabled = true;
}

refs.startBtn.addEventListener('click', strCount);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Report.failure(
        'Please choose a date in the future'
      );
      refs.startBtn.disabled = true;

    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.inputData, options);

function convertMs(upTime) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(upTime / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((upTime % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((upTime % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((upTime % day) % hour) % minute) / second));

  refs.daysDisplay.textContent = days;
  refs.hoursDisplay.textContent = hours;
  refs.minutesDisplay.textContent = minutes;
  refs.secondsDisplay.textContent = seconds;
  return `${days} : ${hours} : ${minutes} : ${seconds}`;


  // const currentDeys = days;
  // const currentHour = hours;
  // const currentMinutes = minutes;
  // const currentSeconds = seconds;
  // const formatTime = `${days} : ${hours} : ${minutes} : ${seconds}`;
  // refs.timer.textContent = `${formatTime}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}


