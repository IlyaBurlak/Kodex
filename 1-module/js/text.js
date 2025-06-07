function replaceText() {
    const text = document.getElementById('text-input').value;
    const findChar = document.getElementById('text-find').value;
    const replaceChar = document.getElementById('text-replace').value;
    const resultContainer = document.getElementById('text-result');
    const resultContent = document.getElementById('text-result-content');

    if (!text) {
        showError('text-result', 'Введите текст');
        return;
    }

    if (!findChar) {
        showError('text-result', 'Введите символ для замены');
        return;
    }

    const result = text.replace(new RegExp(escapeRegExp(findChar), 'g'), replaceChar);
    resultContent.textContent = result;
    resultContainer.style.display = 'block';
}