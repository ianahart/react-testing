import { IContext, IPhoto } from '../interfaces';

let mockSlice: IPhoto[] = [
  { id: '1', urls: { small: 'https://test.com/1' }, alt_description: 'some photo 1s' },
  {
    id: '2',
    urls: { small: 'https://www.test.com/2' },
    alt_description: 'some photo 2s',
  },
  {
    id: '3',
    urls: { small: 'https://www.test.com/3' },
    alt_description: 'some photo 3s',
  },
];

const mockPhotos: IPhoto[] = [
  { id: '1', urls: { small: 'https://test.com/1' }, alt_description: 'some photo 1p' },
  {
    id: '2',
    urls: { small: 'https://www.test.com/2' },
    alt_description: 'some photo 2p',
  },
  {
    id: '3',
    urls: { small: 'https://www.test.com/3' },
    alt_description: 'some photo 3p',
  },
  {
    id: '4',
    urls: { small: 'https://www.test.com/4' },
    alt_description: 'some photo 4p',
  },
  {
    id: '5',
    urls: { small: 'https://www.test.com/5' },
    alt_description: 'some photo 5p',
  },
];

export const mockStore: IContext = {
  photos: mockPhotos,
  slice: mockSlice,
  curPhotoIndex: 0,
  setCurPhotoIndex: jest.fn(),
  setPhotos: jest.fn(),
  addPhoto: jest.fn(),
  deletePhoto: jest.fn(),
  turnPage: jest.fn(),
  updatePhoto: jest.fn(),
  page: 1,
  setPage: jest.fn(),
  setSlice: jest.fn(),
};
