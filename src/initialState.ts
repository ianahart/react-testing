export const initialPhotoState = localStorage.getItem('photos')
  ? JSON.parse(localStorage.getItem('photos') ?? '')
  : [];

export const initialSinglePhotoState = {
  id: '',
  urls: { small: '' },
  alt_description: '',
};
