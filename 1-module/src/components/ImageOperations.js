import React, { useState, useRef, useEffect } from 'react';

const ImageOperations = ({ showToast }) => {
    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [operation, setOperation] = useState('merge');
    const [shape, setShape] = useState('circle');
    const [resultImage, setResultImage] = useState(null);
    const canvasRef = useRef(null);

    const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    useEffect(() => {
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
        }
    }, []);

    const handleImageUpload = (setPreview) => (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!ALLOWED_FORMATS.includes(file.type)) {
            showToast(`Недопустимый формат. Разрешены: ${ALLOWED_FORMATS.join(', ')}`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const processImage = async () => {
        if (!preview1) {
            showToast('Загрузите изображение 1');
            return;
        }

        if (operation === 'merge' && !preview2) {
            showToast('Загрузите изображение 2');
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            showToast('Ошибка инициализации canvas');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            showToast('Ошибка получения контекста canvas');
            return;
        }

        try {
            if (operation === 'merge') {
                await mergeImages(canvas, ctx, preview1, preview2);
            } else {
                await cropImage(canvas, ctx, preview1, shape);
            }
        } catch (error) {
            showToast(`Ошибка обработки изображения: ${error.message}`);
        }
    };

    const mergeImages = (canvas, ctx, src1, src2) => {
        return new Promise((resolve, reject) => {
            const img1 = new Image();
            const img2 = new Image();

            img1.onerror = img2.onerror = () => reject(new Error('Ошибка загрузки изображения'));

            img1.src = src1;
            img2.src = src2;

            img1.onload = () => {
                img2.onload = () => {
                    try {
                        canvas.width = img1.width + img2.width;
                        canvas.height = Math.max(img1.height, img2.height);

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img1, 0, 0);
                        ctx.drawImage(img2, img1.width, 0);

                        setResultImage(canvas.toDataURL());
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                };
            };
        });
    };

    const cropImage = (canvas, ctx, src, shapeType) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
            img.src = src;

            img.onload = () => {
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    ctx.globalCompositeOperation = 'destination-in';

                    const centerX = img.width / 2;
                    const centerY = img.height / 2;
                    const size = Math.min(img.width, img.height) * 0.8;

                    ctx.beginPath();

                    switch(shapeType) {
                        case 'circle':
                            ctx.arc(centerX, centerY, size/2, 0, Math.PI * 2);
                            break;
                        case 'square':
                            ctx.rect(centerX - size/2, centerY - size/2, size, size);
                            break;
                        case 'triangle':
                            ctx.moveTo(centerX, centerY - size/2);
                            ctx.lineTo(centerX + size/2, centerY + size/2);
                            ctx.lineTo(centerX - size/2, centerY + size/2);
                            ctx.closePath();
                            break;
                    }

                    ctx.fill();
                    setResultImage(canvas.toDataURL());
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
        });
    };

    return (
        <div className="image-operations">
            <div className="image-preview-container">
                <div className="input-group">
                    <label>Изображение 1:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload(setPreview1)}
                    />
                    {preview1 && (
                        <div className="image-container">
                            <img src={preview1} alt="Preview 1" className="preview-image" />
                        </div>
                    )}
                </div>

                <div className="input-group">
                    <label>Изображение 2:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload(setPreview2)}
                        disabled={operation === 'crop'}
                    />
                    {preview2 && operation !== 'crop' && (
                        <div className="image-container">
                            <img src={preview2} alt="Preview 2" className="preview-image" />
                        </div>
                    )}
                </div>
            </div>

            <div className="input-group">
                <label>Операция:</label>
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                >
                    <option value="merge">Объединение</option>
                    <option value="crop">Обрезка</option>
                </select>
            </div>

            {operation === 'crop' && (
                <div className="input-group">
                    <label>Форма:</label>
                    <select
                        value={shape}
                        onChange={(e) => setShape(e.target.value)}
                    >
                        <option value="circle">Круг</option>
                        <option value="square">Квадрат</option>
                        <option value="triangle">Треугольник</option>
                    </select>
                </div>
            )}

            <button onClick={processImage}>Обработать</button>

            {resultImage && (
                <div className="result-container">
                    <label>Результат:</label>
                    <img src={resultImage} alt="Result" className="result-image" />
                </div>
            )}
        </div>
    );
};

export default ImageOperations;