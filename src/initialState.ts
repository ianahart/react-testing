export const initialPhotoState = localStorage.getItem('photos')
  ? JSON.parse(localStorage.getItem('photos') ?? '')
  : [];
