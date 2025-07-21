import React, { Component } from 'react';

class ImageOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image1: null,
            image2: null,
            preview1: null,
            preview2: null,
            operation: 'merge',
            shape: 'circle',
            resultImage: null,
            showResult: false
        };
        this.canvasRef = React.createRef();
    }

    ALLOWED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    loadImage = (file, callback) => {
        if (!file) return;

        if (!this.ALLOWED_FORMATS.includes(file.type)) {
            this.props.showToast(`Недопустимый формат файла. Разрешены: ${this.ALLOWED_FORMATS.join(', ')}`);
            return;
        }

        const reader = new FileReader();

        reader.onerror = () => {
            this.props.showToast('Ошибка при чтении файла. Попробуйте другой файл.');
        };

        reader.onload = (event) => {
            callback(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    handleImage1Change = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        this.loadImage(file, (preview) => {
            this.setState({
                image1: file,
                preview1: preview
            });
        });
    };

    handleImage2Change = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        this.loadImage(file, (preview) => {
            this.setState({
                image2: file,
                preview2: preview
            });
        });
    };

    handleOperationChange = (e) => {
        this.setState({ operation: e.target.value });
    };

    handleShapeChange = (e) => {
        this.setState({ shape: e.target.value });
    };

    processImage = () => {
        const { image1, image2, operation, shape } = this.state;

        if (!image1) {
            this.props.showToast('Загрузите изображение 1');
            return;
        }

        if (operation === 'merge' && !image2) {
            this.props.showToast('Загрузите изображение 2 для объединения');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const processImage = () => {
            if (operation === 'merge') {
                this.mergeImages(canvas, ctx);
            } else if (operation === 'crop') {
                this.cropImage(canvas, ctx, shape);
            }
        };

        if (operation === 'merge') {
            const img1 = new Image();
            const img2 = new Image();

            img1.src = this.state.preview1;
            img2.src = this.state.preview2;

            Promise.all([
                new Promise(resolve => { img1.onload = resolve; }),
                new Promise(resolve => { img2.onload = resolve; })
            ]).then(processImage);
        } else {
            const img = new Image();
            img.src = this.state.preview1;
            img.onload = processImage;
        }
    };

    mergeImages = (canvas, ctx) => {
        const img1 = new Image();
        const img2 = new Image();

        img1.src = this.state.preview1;
        img2.src = this.state.preview2;

        img1.onload = () => {
            img2.onload = () => {
                canvas.width = img1.width + img2.width;
                canvas.height = Math.max(img1.height, img2.height);

                ctx.drawImage(img1, 0, 0);
                ctx.drawImage(img2, img1.width, 0);

                this.setState({
                    resultImage: canvas.toDataURL(),
                    showResult: true
                });
            };
        };
    };

    cropImage = (canvas, ctx, shape) => {
        const img = new Image();
        img.src = this.state.preview1;

        img.onload = () => {
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

            this.setState({
                resultImage: canvas.toDataURL(),
                showResult: true
            });
        };
    };

    render() {
        const { preview1, preview2, operation, shape, resultImage, showResult } = this.state;

        return (
            <div>
                <div className="input-group">
                    <label htmlFor="image1">Изображение 1:</label>
                    <input
                        type="file"
                        id="image1"
                        accept="image/*"
                        onChange={this.handleImage1Change}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="image2">Изображение 2:</label>
                    <input
                        type="file"
                        id="image2"
                        accept="image/*"
                        onChange={this.handleImage2Change}
                        disabled={operation === 'crop'}
                    />
                </div>

                <div className="image-preview">
                    <div className="image-container">
                        <div>Изображение 1</div>
                        {preview1 && <img src={preview1} alt="Preview 1" />}
                    </div>
                    <div className="image-container" style={{ display: operation === 'crop' ? 'none' : 'flex' }}>
                        <div>Изображение 2</div>
                        {preview2 && <img src={preview2} alt="Preview 2" />}
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="image-operation">Операция:</label>
                    <select
                        id="image-operation"
                        value={operation}
                        onChange={this.handleOperationChange}
                    >
                        <option value="merge">Объединить изображения</option>
                        <option value="crop">Обрезать изображение</option>
                    </select>
                </div>

                {operation === 'crop' && (
                    <div className="shape-options">
                        <label htmlFor="shape">Форма для обрезки:</label>
                        <select
                            id="shape"
                            value={shape}
                            onChange={this.handleShapeChange}
                        >
                            <option value="circle">Круг</option>
                            <option value="square">Квадрат</option>
                            <option value="triangle">Треугольник</option>
                        </select>

                        <div className="shape-preview">
                            <div style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#667eea',
                                borderRadius: shape === 'circle' ? '50%' : '0',
                                ...(shape === 'triangle' ? {
                                    width: '0',
                                    height: '0',
                                    borderLeft: '50px solid transparent',
                                    borderRight: '50px solid transparent',
                                    borderBottom: '100px solid #667eea',
                                    backgroundColor: 'transparent'
                                } : {})
                            }} />
                        </div>
                    </div>
                )}

                <button className="process-btn" onClick={this.processImage}>Обработать</button>

                {showResult && (
                    <div className="result-container">
                        <div className="result-title">Результат:</div>
                        {resultImage && <img src={resultImage} alt="Result" style={{ maxWidth: '100%' }} />}
                    </div>
                )}
            </div>
        );
    }
}

export default ImageOperations;