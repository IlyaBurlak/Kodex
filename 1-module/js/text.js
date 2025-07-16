function replaceText() {
    const text = document.getElementById('text-input').value;
    const findChar = document.getElementById('text-find').value;
    const replaceChar = document.getElementById('text-replace').value;
    const resultContainer = document.getElementById('text-result');
    const resultContent = document.getElementById('text-result-content');

    if (!text.trim()) {
        showToast('Введите текст');
        return;
    }

    if (!findChar) {
        showToast('Введите символ для замены');
        return;
    }

    if (findChar.length > 1) {
        showToast('Введите только один символ для замены');
        return;
    }

    if (replaceChar.length > 1) {
        showToast('Введите только один символ замены');
        return;
    }

    const result = text.replace(new RegExp(escapeRegExp(findChar), 'g'), replaceChar);
    resultContent.textContent = result;
    resultContainer.style.display = 'block';
}