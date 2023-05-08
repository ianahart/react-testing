import axios from 'axios';
import { AxiosError } from 'axios';
import { ISearchPhotoResponse } from '../interfaces';

export const getPhotos = async (term: string) => {
  try {
    const response = await axios.get<ISearchPhotoResponse>(
      `https://api.unsplash.com/search/photos?query=${term}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    );
    return {
      data: response,
      error: null,
    } as any;
  } catch (err: unknown | AxiosError) {
    if (err instanceof AxiosError && err.response) {
      return { error: err.response, data: null } as any;
    }
  }
};
