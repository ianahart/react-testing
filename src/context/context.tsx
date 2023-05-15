import { useState, createContext, useEffect } from 'react';
import { IContext, IPhoto } from '../interfaces';
import { initialPhotoState } from '../initialState';

export const Context = createContext<IContext | null>({} as IContext);

interface IChildren {
  children?: React.ReactNode;
}

const ContextProvider = ({ children }: IChildren) => {
  const [photos, setPhotos] = useState<IPhoto[]>(initialPhotoState);
  const [slice, setSlice] = useState<IPhoto[]>([]);
  const [curPhotoIndex, setCurPhotoIndex] = useState(0);
  const [page, setPage] = useState(0);

  const turnPage = (action: string, pageSize: number, initial?: boolean) => {
    action === 'next' ? nextPage(pageSize, initial) : prevPage(pageSize);
  };

  const nextPage = (pageSize: number, initial?: boolean) => {
    let curSlice;
    if (initial || curPhotoIndex >= photos.length) {
      setPage(1);
      curSlice = photos.slice(0, pageSize);
      setCurPhotoIndex(pageSize);
    } else {
      setPage((prevState) => prevState + 1);
      curSlice = photos.slice(curPhotoIndex, pageSize + curPhotoIndex);
      setCurPhotoIndex((prevState) => prevState + pageSize);
    }
    setSlice(curSlice);
  };

  const prevPage = (pageSize: number) => {
    let curSlice;
    if (curPhotoIndex - pageSize <= 0) {
      curSlice = photos.slice(
        photos.length - Math.floor(photos.length % pageSize),
        photos.length
      );
      setPage(Math.ceil(photos.length / pageSize));
      setCurPhotoIndex(photos.length);
    } else {
      const start = curPhotoIndex - pageSize * 2 < 0 ? 0 : curPhotoIndex - pageSize * 2;
      curSlice = photos.slice(start, curPhotoIndex - pageSize);
      setPage((prevState) => prevState - 1);
      setCurPhotoIndex((prevState) => prevState - pageSize);
    }
    setSlice(curSlice);
  };

  const photoExists = (photo: IPhoto) => {
    const exists = photos.find((p) => p.urls.small === photo.urls.small);
    return exists ? true : false;
  };

  const deletePhoto = (id: string) => {
    const updatedPhotos = photos.filter((v) => v.id !== id);
    const updatedSlice = slice.filter((v) => v.id !== id);
    setSlice(updatedSlice);
    setPhotos(updatedPhotos);
    localStorage.setItem('photos', JSON.stringify(updatedPhotos));
  };

  const addPhoto = (photo: IPhoto) => {
    if (photoExists(photo)) return;
    setPhotos((prevState) => [...prevState, photo]);
    localStorage.setItem('photos', JSON.stringify([...photos, photo]));
  };

  return (
    <Context.Provider
      value={{
        photos,
        setPhotos,
        addPhoto,
        deletePhoto,
        turnPage,
        page,
        slice,
        curPhotoIndex,
        setSlice,
        setPage,
        setCurPhotoIndex,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
