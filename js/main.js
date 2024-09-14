const btn = document.querySelector('#btn')
const count = document.querySelector('#count')
let num = 0
let clicked = false
let intervalId = null;
let accelerationInterval = null;
let clickCount = 0;
const baseInterval = 5500;
const minInterval = 0.1;

const handleClick = () => {
    num++;
    count.textContent = num;
}

const calculateInterval = () => {
    return Math.max(baseInterval / ((clickCount + 1) **2), minInterval);
}

const accelerate = () => {
    clickCount++;
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
    const newInterval = calculateInterval();
    intervalId = setInterval(handleClick, newInterval);
};

const handleMouseDown = () => {
    if (accelerationInterval === null) {
        accelerate(); // 즉시 한 번 실행
        accelerationInterval = setInterval(accelerate, 100); // 100ms마다 가속
    }
};
const handleMouseUp = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    if (accelerationInterval !== null) {
        clearInterval(accelerationInterval);
        accelerationInterval = null;
    }
    clickCount = 0; // 리셋
};
btn.addEventListener('click', handleClick)
btn.addEventListener('mousedown', handleMouseDown)
btn.addEventListener('mouseup', handleMouseUp)
btn.addEventListener('mouseleave', handleMouseUp)