import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timeInputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};
refs.startBtnEl.setAttribute('disabled', 'disabled');
refs.startBtnEl.addEventListener('click', onStartButtonClick);
const currentDate = Date.now();
let startTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    let difTime = selectedDates[0] - currentTime;
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.init({position: 'center-top'});
      Notiflix.Notify.failure('Date must be in the future');
      return;
    }
    refs.startBtnEl.removeAttribute('disabled', 'disabled');
    startTime = selectedDates[0];
    const { days, hours, minutes, seconds } = convertMs(difTime);
    refs.daysRef.textContent = addLeadingZero(days);
    refs.hoursRef.textContent = addLeadingZero(hours);
    refs.minutesRef.textContent = addLeadingZero(minutes);
    refs.secondsRef.textContent = addLeadingZero(seconds);
  },
};
const pickerDate = flatpickr(refs.timeInputEl, options);

function onStartButtonClick() {
  refs.startBtnEl.setAttribute('disabled', 'disabled');
  const timerID = setInterval(() => {
    const currentTime = Date.now();
    let difTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(difTime);
    refs.daysRef.textContent = addLeadingZero(days);
    refs.hoursRef.textContent = addLeadingZero(hours);
    refs.minutesRef.textContent = addLeadingZero(minutes);
    refs.secondsRef.textContent = addLeadingZero(seconds);
    if (difTime < 0) {
      clearInterval(timerID);
      refs.daysRef.textContent = '00';
      refs.hoursRef.textContent = '00';
      refs.minutesRef.textContent = '00';
      refs.secondsRef.textContent = '00';
    }
  }, 1000);
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
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

