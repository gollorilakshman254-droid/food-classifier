import { useRef, useState } from 'react';

/**
 * The circular "plate" is both the drop target and the image preview.
 */
export default function Plate({ imageUrl, imgRef, onImageLoad, busy, onFile, onOpenCamera }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  function handleChange(event) {
    const file = event.target.files?.[0];
    if (file) onFile(file);
    event.target.value = ''; // allow choosing the same file again
  }

  return (
    <div className="plate-wrap">
      <div
        className={`plate ${dragging ? 'is-dragging' : ''} ${busy ? 'is-busy' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <img ref={imgRef} src={imageUrl} alt="The photo you added" onLoad={onImageLoad} />
        ) : (
          <div className="plate-empty">
            <p className="plate-title">Drop a food photo here</p>
            <p className="plate-hint">or paste one from your clipboard</p>
          </div>
        )}
      </div>

      <div className="plate-actions">
        <button type="button" className="btn btn-primary" onClick={() => inputRef.current?.click()}>
          {imageUrl ? 'Choose another photo' : 'Choose a photo'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onOpenCamera}>
          Use camera
        </button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
      </div>
    </div>
  );
}
