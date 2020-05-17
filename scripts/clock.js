let hour;
let minute;

const answer = document.querySelector('#answer');
const submitButton = document.querySelector('#submit');
const resetButton = document.querySelector('#reset');
const hourHand = document.querySelector('#hour-hand-wrapper');
const minuteHand = document.querySelector('#minute-hand-wrapper');


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
        console.log("Incorrect input");
    } else {
        if (answerHour === hour && answerMinute === minute) {
            console.log("Good!");
        } else if (answerHour === hour) {
            console.warn(`Hour is good, but you were wrong about ${Math.abs(minute - answerMinute)} minutes.`);
        } else if(answerMinute === minute) {
            console.warn(`Minutes are good, but you were wrong about ${Math.abs(hour - answerHour)} hours.`);
        } else {
            console.error(`Unfortunately, your answer is incorrect.`);
        }
    }
}

addClickListeners();
window.onload = initializeClock;
