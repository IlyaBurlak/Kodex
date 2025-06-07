let currentInput = '0';
const resultInput = document.getElementById('result');

function updateDisplay() {
    resultInput.value = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function calculate() {
    try {
        const expression = currentInput.replace(/×/g, '*');
        currentInput = eval(expression).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Ошибка';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

updateDisplay();