export interface IPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

export interface ISearchPhotoResponse {
  results: IPhoto[];
  total: number;
  total_pages: number;
}

export interface IContext {
  photos: IPhoto[];
  setPhotos: (photo: IPhoto[]) => void;
  addPhoto: (photo: IPhoto) => void;
  deletePhoto: (id: string) => void;
}
