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
  slice: IPhoto[];
  curPhotoIndex: number;
  setPhotos: (photo: IPhoto[]) => void;
  addPhoto: (photo: IPhoto) => void;
  deletePhoto: (id: string) => void;
  turnPage: (action: string, pageSize: number, initial?: boolean) => void;
  setPage: (page: number) => void;
  setCurPhotoIndex: (curIndex: number) => void;
  setSlice: (slice: IPhoto[]) => void;
  page: number;
}
