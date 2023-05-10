import { useState, createContext } from 'react';
import { IContext, IPhoto } from '../interfaces';
import { initialPhotoState } from '../initialState';

export const Context = createContext<IContext | null>({} as IContext);

interface IChildren {
  children?: React.ReactNode;
}

const ContextProvider = ({ children }: IChildren) => {
  const [photos, setPhotos] = useState<IPhoto[]>(initialPhotoState);

  const photoExists = (photo: IPhoto) => {
    const exists = photos.find((p) => p.urls.small === photo.urls.small);
    return exists ? true : false;
  };

  const deletePhoto = (id: string) => {
    const updatedPhotos = photos.filter((v) => v.id !== id);
    setPhotos(updatedPhotos);
    localStorage.setItem('photos', JSON.stringify(updatedPhotos));
  };

  const addPhoto = (photo: IPhoto) => {
    if (photoExists(photo)) return;
    setPhotos((prevState) => [...prevState, photo]);
    localStorage.setItem('photos', JSON.stringify([...photos, photo]));
  };

  return (
    <Context.Provider value={{ photos, setPhotos, addPhoto, deletePhoto }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
