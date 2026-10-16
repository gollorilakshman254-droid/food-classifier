/** Center-crops an image element to a small square JPEG data URL for the history strip. */
export function makeThumbnail(img, size = 96) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);

  return canvas.toDataURL('image/jpeg', 0.7);
}

export const MAX_FILE_MB = 15;

export function validateImageFile(file) {
  if (!file) return 'No file was selected.';
  if (!file.type.startsWith('image/')) return 'That file is not an image. Choose a JPG, PNG or WebP photo.';
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `That photo is larger than ${MAX_FILE_MB} MB. Choose a smaller one.`;
  return null;
}
