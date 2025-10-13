import { ChangeEvent, FC } from "react";
import '../../styles/components/_image-preview.scss'
import '../../styles/components/_forms.scss'

interface ImageUploaderProps {
  label: string;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  disabled?: boolean;
}

const ImageUploader: FC<ImageUploaderProps> = ({
                                                              label,
                                                              onImageUpload,
                                                              preview,
                                                              disabled = false
                                                            }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        disabled={disabled}
      />
      {preview && (
        <div className="image-container">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;