import { useState, createContext } from 'react';
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

  const turnPage = (action: string, initial?: boolean) => {
    action === 'next' ? nextPage(initial) : prevPage();
  };

  const nextPage = (initial?: boolean) => {
    let curSlice;
    const PAGE_SIZE = 5;
    if (initial) {
      setPage(1);
      curSlice = photos.slice(0, PAGE_SIZE);
      setCurPhotoIndex(PAGE_SIZE);
    } else {
      setPage((prevState) => prevState + 1);
      curSlice = photos.slice(curPhotoIndex, PAGE_SIZE + curPhotoIndex);
      setCurPhotoIndex((prevState) => prevState + PAGE_SIZE);
    }
    setSlice(curSlice);
  };

  const prevPage = () => {
    const PAGE_SIZE = 5;
    setPage((prevState) => prevState - 1);
    const curSlice = photos.slice(
      curPhotoIndex - PAGE_SIZE * 2,
      curPhotoIndex - PAGE_SIZE
    );

    setSlice(curSlice);
    setCurPhotoIndex((prevState) => prevState - PAGE_SIZE);
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
