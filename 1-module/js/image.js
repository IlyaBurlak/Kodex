document.getElementById('image1').addEventListener('change', function(e) {
    loadImage(e.target.files[0], 'preview1');
});

document.getElementById('image2').addEventListener('change', function(e) {
    loadImage(e.target.files[0], 'preview2');
});


const ALLOWED_FORMATS = ['image/jpg', 'image/jpeg' , 'image/png', 'image/webp', 'image/gif'];

function loadImage(file, previewId) {
    if (!file) return;

    if (!ALLOWED_FORMATS.includes(file.type)) {
        showError(previewId.replace('preview', 'image'),
            `Недопустимый формат файла. Разрешены: ${ALLOWED_FORMATS.join(', ')}`);
        return;
    }

    const reader = new FileReader();

    reader.onerror = function() {
        showError(previewId.replace('preview', 'image'),
            'Ошибка при чтении файла. Попробуйте другой файл.');
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

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let errorElement = document.getElementById(`${elementId}-error`);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = `${elementId}-error`;
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }

    errorElement.textContent = message;
    errorElement.style.display = 'block';

    const previewId = elementId.replace('image', 'preview');
    const preview = document.getElementById(previewId);
    if (preview) {
        preview.style.display = 'none';
    }
}

function toggleShapeOptions() {
    const operation = document.getElementById('image-operation').value;
    const shapeOptions = document.getElementById('shape-options');

    if (operation === 'crop') {
        shapeOptions.style.display = 'block';
        updateShapePreview();
    } else {
        shapeOptions.style.display = 'none';
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
    const image1 = document.getElementById('preview1').src;
    const resultContainer = document.getElementById('image-result');
    const resultImage = document.getElementById('result-image');

    if (!image1) {
        showError('image-result', 'Загрузите хотя бы одно изображение');
        return;
    }

    resultContainer.style.display = 'block';

    if (operation === 'merge') {
        const image2 = document.getElementById('preview2').src;

        if (!image2) {
            showError('image-result', 'Загрузите второе изображение для объединения');
            return;
        }

        mergeImages(image1, image2, resultImage);
    } else if (operation === 'crop') {
        const shape = document.getElementById('shape').value;
        cropImage(image1, shape, resultImage);
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
        showError('image-result', 'Ошибка при загрузке изображений');
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