import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector(".datetime-picker");
const btn = document.querySelector(".button")
const timerVisual = document.querySelectorAll(".value")

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0])
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < Date.now()) {
            iziToast.show({
                title: "",
                message: "Please choose a date in the future",
            });
            btn.classList.remove("btn-enabled");
            btn.setAttribute("disabled","true");
        } else {
            btn.classList.add("btn-enabled")
            btn.removeAttribute("disabled")
        }
    },
  };
  
flatpickr(input, options);

btn.addEventListener("click",timerStart)

function timerStart(event) {
    btn.classList.remove("btn-enabled");
    btn.setAttribute("disabled","true");
    input.classList.add("input-disabled");
    input.setAttribute("disabled", "true");
    
    let userSelectedDateConverted;
    const interval = setInterval(() => {
        userSelectedDateConverted = convertMs(userSelectedDate - Date.now());
        timerVisual[0].textContent = addLeadingZero(userSelectedDateConverted.days);
        timerVisual[1].textContent = addLeadingZero(userSelectedDateConverted.hours);
        timerVisual[2].textContent = addLeadingZero(userSelectedDateConverted.minutes);
        timerVisual[3].textContent = addLeadingZero(userSelectedDateConverted.seconds);

        if (isTimeUp(userSelectedDateConverted)) {
            for (const el of timerVisual) {
                el.textContent = "00";
            };
            input.removeAttribute("disabled");
            input.classList.remove("input-disabled");
            clearInterval(interval);
        };
    }, 1000);
      
};

function isTimeUp(value) {
    return value.days === 0 && value.hours === 0 && value.minutes === 0 && value.seconds === 0;
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

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
};