import { IContext, IPhoto } from '../interfaces';

let mockSlice: IPhoto[] = [
  { id: '1', urls: { small: 'https://test.com/1' }, alt_description: 'some photo 1' },
  {
    id: '2',
    urls: { small: 'https://www.test.com/2' },
    alt_description: 'some photo 2',
  },
  {
    id: '3',
    urls: { small: 'https://www.test.com/3' },
    alt_description: 'some photo 3',
  },
  {
    id: '4',
    urls: { small: 'https://www.test.com/4' },
    alt_description: 'some photo 4',
  },
  {
    id: '5',
    urls: { small: 'https://www.test.com/5' },
    alt_description: 'some photo 5',
  },
];

export const mockStore: IContext = {
  photos: [],
  slice: mockSlice,
  curPhotoIndex: 0,
  setPhotos: jest.fn(),
  addPhoto: jest.fn(),
  deletePhoto: jest.fn(),
  turnPage: jest.fn(),
  page: 1,
};
