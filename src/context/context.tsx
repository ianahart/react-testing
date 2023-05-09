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
    const exists = photos.find((p) => p.url === photo.url);
    return exists ? true : false;
  };

  const addPhoto = (photo: IPhoto) => {
    if (photoExists(photo)) return;
    setPhotos((prevState) => [...prevState, photo]);
    localStorage.setItem('photos', JSON.stringify([...photos, photo]));
  };

  return (
    <Context.Provider value={{ photos, setPhotos, addPhoto }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
