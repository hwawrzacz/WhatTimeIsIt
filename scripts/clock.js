let hour;
let minute;

const answer = document.querySelector('#answer');
const submitButton = document.querySelector('.submit');
const resetButton = document.querySelector('.reset');
const hourHand = document.querySelector('#hour-hand-wrapper');
const minuteHand = document.querySelector('#minute-hand-wrapper');

const toastManager = new Toast();

const addClickListeners = () => {
    submitButton.addEventListener('click', handleSubmit);
    resetButton.addEventListener('click', handleReset);
}

const initializeClock = () => {
    generateNewTime();
    repositionClocksHands();
}

const repositionClocksHands = () => {
    const minuteRotation = minute * 360 / 60;
    const hourRotation = (hour + (minuteRotation / 360)) * 360 / 12;

    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    hourHand.style.transform = `rotate(${hourRotation}deg)`;
}

const generateNewTime = () => {
    hour = Math.round(Math.random() * 100) % 12;
    minute = Math.round(Math.random() * 100) % 60;

    console.log(hour);
    console.log(minute);
}

const resetAnswer = () => {
    answer.value = null;
}

const handleReset = () => {
    initializeClock();
    resetAnswer();
}

const handleSubmit = () => {
    checkAnswer();
}

const checkAnswer = () => {
    const answerTab = answer.value.split(':');
    const answerHour = parseInt(answerTab[0]) % 12;
    const answerMinute = parseInt(answerTab[1]) % 60;

    if (Number.isNaN(answerHour) || Number.isNaN(answerMinute)) {
        const message = 'Nie podano godziny'
        toastManager.showToastError(message);
    } else {
        if (answerHour === hour && answerMinute === minute) {
            toastManager.showToastSuccess();
            setTimeout(handleReset, 3000);
        }
        else if (answerHour === hour) {
            const value = Math.abs(minute - answerMinute);
            const suffix = value == 1 ? 'ę' : [2, 3, 4].includes(value % 10) ? 'y' : '';
            const message = `Godzina się zgadza, ale pomyliłeś się o ${value} minut${suffix}.`;
            toastManager.showToastAlmost(message);
        }
        else if (answerMinute === minute) {
            const value = Math.abs(hour - answerHour);
            const suffix = value == 1 ? 'ę' : [2, 3, 4].includes(value % 10) ? 'y' : '';
            const message = `Minuty się zgadzają, ale pomyliłeś się o ${value} godzin${suffix}.`;
            toastManager.showToastAlmost(message);
        }
        else {
            toastManager.showToastFailure();
        }
    }
}

addClickListeners();
window.onload = initializeClock;
