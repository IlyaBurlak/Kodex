import React, { useEffect, useRef, useState, useCallback } from 'react';
import { withToast } from "./ToastContext";
import { InputGroup } from './InputGroup';
import { ResultContainer } from './ResultContainer';
import { ImageUploader } from './ImageUploader';

type OperationType = 'merge' | 'crop';
type ShapeType = 'circle' | 'square' | 'triangle';

interface ImageOperationsProps {
    showToast: (message: string, type?: 'error' | 'success' | 'info' | 'warning') => void;
}

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ImageOperations: React.FC<ImageOperationsProps> = ({ showToast }) => {
    const [preview1, setPreview1] = useState<string | null>(null);
    const [preview2, setPreview2] = useState<string | null>(null);
    const [operation, setOperation] = useState<OperationType>('merge');
    const [shape, setShape] = useState<ShapeType>('circle');
    const [resultImage, setResultImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            const canvas = document.createElement('canvas');
            canvasRef.current = canvas;
        }
    }, []);

    const handleImageUpload = useCallback((setPreview: React.Dispatch<React.SetStateAction<string | null>>) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (!ALLOWED_FORMATS.includes(file.type)) {
              showToast(`Недопустимый формат. Разрешены: ${ALLOWED_FORMATS.join(', ')}`);
              return;
          }

          const reader = new FileReader();
          reader.onload = (e) => setPreview(e.target?.result as string);
          reader.readAsDataURL(file);
      }, [showToast]);

    const processImage = useCallback(async (): Promise<void> => {
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
            showToast('Изображение успешно обработано!', 'success');
        } catch (error) {
            showToast(`Ошибка обработки изображения: ${(error as Error).message}`);
        }
    }, [preview1, preview2, operation, shape, showToast]);

    const mergeImages = useCallback((
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      src1: string,
      src2: string
    ): Promise<void> => {
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
    }, []);

    const cropImage = useCallback((
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      src: string,
      shapeType: ShapeType
    ): Promise<void> => {
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
    }, []);

    return (
      <div className="image-operations">
          <div className="image-preview-container">
              <ImageUploader
                label="Изображение 1:"
                onImageUpload={handleImageUpload(setPreview1)}
                preview={preview1}
              />

              <ImageUploader
                label="Изображение 2:"
                onImageUpload={handleImageUpload(setPreview2)}
                preview={preview2}
                disabled={operation === 'crop'}
              />
          </div>

          <InputGroup label="Операция:">
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as OperationType)}>
                  <option value="merge">Объединение</option>
                  <option value="crop">Обрезка</option>
              </select>
          </InputGroup>

          {operation === 'crop' && (
            <InputGroup label="Форма:">
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as ShapeType)}>
                    <option value="circle">Круг</option>
                    <option value="square">Квадрат</option>
                    <option value="triangle">Треугольник</option>
                </select>
            </InputGroup>
          )}
          <button onClick={processImage}>Обработать</button>

          {resultImage && (
            <ResultContainer label="Результат:">
                <img src={resultImage} alt="Result" className="result-image" />
            </ResultContainer>
          )}
      </div>
    );
};

export default withToast(ImageOperations);