function generateArrayInputs() {
    const count = parseInt(document.getElementById('array-count').value);

    if (isNaN(count)) {
        showError('array-result', 'Введите корректное количество элементов');
        return;
    }

    if (count < 2 || count > 10) {
        showError('array-result', 'Количество элементов должно быть от 2 до 10');
        return;
    }

    generateArray('array1-inputs', count);
    generateArray('array2-inputs', count);
}

function generateArray(containerId, count) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'array-input';
        input.placeholder = `Элемент ${i + 1}`;
        container.appendChild(input);
    }
}

function calculateArray() {
    const operation = document.getElementById('array-operation').value;
    const resultContainer = document.getElementById('array-result');
    const resultContent = document.getElementById('array-result-content');

    if (operation === 'add') {
        const array1 = getArrayFromInputs('array1-inputs');
        const array2 = getArrayFromInputs('array2-inputs');

        if (array1.length !== array2.length) {
            showError('array-result', 'Массивы должны быть одинаковой длины');
            return;
        }

        const result = array1.map((num, i) => num + array2[i]);
        resultContent.innerHTML = `[${result.join(', ')}]`;
        resultContainer.style.display = 'block';
    } else if (operation === 'average') {
        const array = getArrayFromInputs('array1-inputs');
        const sum = array.reduce((acc, num) => acc + num, 0);
        const average = sum / array.length;
        resultContent.innerHTML = average.toFixed(2);
        resultContainer.style.display = 'block';
    }
}

function getArrayFromInputs(containerId) {
    const inputs = document.getElementById(containerId).querySelectorAll('input');
    const array = [];

    inputs.forEach(input => {
        const num = parseFloat(input.value);
        array.push(isNaN(num) ? 0 : num);
    });

    return array;
}