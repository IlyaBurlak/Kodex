let currentInput = '0';
const resultInput = document.getElementById('result');

function updateDisplay() {
    resultInput.value = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === 'Ошибка') {
        currentInput = '0';
    }

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
        const result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Недопустимая операция');
        }

        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = '0';
        updateDisplay();
        showToast('Ошибка вычисления: ' + error.message);
    }
}

updateDisplay();