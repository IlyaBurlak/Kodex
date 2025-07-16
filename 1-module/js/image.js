document.getElementById('image1').addEventListener('change', function(e) {
    loadImage(e.target.files[0], 'preview1');
});

document.getElementById('image2').addEventListener('change', function(e) {
    loadImage(e.target.files[0], 'preview2');
});

const ALLOWED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function loadImage(file, previewId) {
    if (!file) return;

    if (!ALLOWED_FORMATS.includes(file.type)) {
        showToast(`Недопустимый формат файла. Разрешены: ${ALLOWED_FORMATS.join(', ')}`);
        return;
    }

    const reader = new FileReader();

    reader.onerror = function() {
        showToast('Ошибка при чтении файла. Попробуйте другой файл.');
    };

    reader.onload = function(event) {
        const preview = document.getElementById(previewId);
        if (!preview) return;

        preview.src = event.target.result;
        preview.style.display = 'block';

        const errorElement = document.getElementById(`${previewId}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    };

    reader.readAsDataURL(file);
}

function toggleShapeOptions() {
    const operation = document.getElementById('image-operation').value;
    const shapeOptions = document.getElementById('shape-options');
    const image2Input = document.getElementById('image2').parentNode;
    const preview2Container = document.querySelector('.image-container:nth-child(2)');

    if (operation === 'crop') {
        shapeOptions.style.display = 'block';
        image2Input.classList.add('hidden');
        preview2Container.classList.add('hidden');
        updateShapePreview();
    } else {
        shapeOptions.style.display = 'none';
        image2Input.classList.remove('hidden');
        preview2Container.classList.remove('hidden');
    }
}

function updateShapePreview() {
    const shape = document.getElementById('shape').value;
    const preview = document.getElementById('shape-preview');
    preview.innerHTML = '';

    const shapeElement = document.createElement('div');
    shapeElement.style.width = '100px';
    shapeElement.style.height = '100px';
    shapeElement.style.backgroundColor = '#667eea';

    switch (shape) {
        case 'circle':
            shapeElement.style.borderRadius = '50%';
            break;
        case 'square':
            shapeElement.style.borderRadius = '0';
            break;
        case 'triangle':
            shapeElement.style.width = '0';
            shapeElement.style.height = '0';
            shapeElement.style.borderLeft = '50px solid transparent';
            shapeElement.style.borderRight = '50px solid transparent';
            shapeElement.style.borderBottom = '100px solid #667eea';
            shapeElement.style.backgroundColor = 'transparent';
            break;
    }

    preview.appendChild(shapeElement);
}

function processImage() {
    const operation = document.getElementById('image-operation').value;
    const preview1 = document.getElementById('preview1');
    const resultContainer = document.getElementById('image-result');
    const resultImage = document.getElementById('result-image');

    const file1 = document.getElementById('image1').files[0];
    if (!file1) {
        showToast('Загрузите изображение 1');
        return;
    }

    if (!ALLOWED_FORMATS.includes(file1.type)) {
        showToast('Недопустимый формат изображения 1');
        return;
    }

    if (operation === 'merge') {
        const file2 = document.getElementById('image2').files[0];
        if (!file2) {
            showToast('Загрузите изображение 2 для объединения');
            return;
        }

        if (!ALLOWED_FORMATS.includes(file2.type)) {
            showToast('Недопустимый формат изображения 2');
            return;
        }
    }

    if (!preview1.src || preview1.style.display === 'none') {
        showToast('Изображение 1 не загружено');
        return;
    }

    resultContainer.style.display = 'block';

    if (operation === 'merge') {
        const preview2 = document.getElementById('preview2');
        if (!preview2.src || preview2.style.display === 'none') {
            showToast('Изображение 2 не загружено');
            return;
        }
        mergeImages(preview1.src, preview2.src, resultImage);
    } else if (operation === 'crop') {
        const shape = document.getElementById('shape').value;
        cropImage(preview1.src, shape, resultImage);
    }
}

function mergeImages(image1Src, image2Src, resultElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img1 = new Image();
    const img2 = new Image();

    img1.src = image1Src;
    img2.src = image2Src;

    Promise.all([
        new Promise((resolve) => { img1.onload = resolve; }),
        new Promise((resolve) => { img2.onload = resolve; })
    ]).then(() => {
        canvas.width = img1.width + img2.width;
        canvas.height = Math.max(img1.height, img2.height);

        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, img1.width, 0);

        resultElement.src = canvas.toDataURL();
        resultElement.style.display = 'block';
    }).catch(error => {
        console.error('Ошибка при загрузке изображений:', error);
        showToast('Ошибка при обработке изображений');
    });
}

function cropImage(imageSrc, shape, resultElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'destination-in';

        const centerX = img.width / 2;
        const centerY = img.height / 2;
        const size = Math.min(img.width, img.height) * 0.8;

        ctx.beginPath();

        switch (shape) {
            case 'circle':
                ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.rect(centerX - size / 2, centerY - size / 2, size, size);
                break;
            case 'triangle':
                ctx.moveTo(centerX, centerY - size / 2);
                ctx.lineTo(centerX + size / 2, centerY + size / 2);
                ctx.lineTo(centerX - size / 2, centerY + size / 2);
                ctx.closePath();
                break;
        }

        ctx.fill();

        resultElement.src = canvas.toDataURL();
        resultElement.style.display = 'block';
    };

    img.src = imageSrc;
}

document.getElementById('image-operation').addEventListener('change', toggleShapeOptions);
updateShapePreview();