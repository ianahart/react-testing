import { useContext } from 'react';
import { Context } from '../../context/context';
import { IContext, IPhoto } from '../../interfaces';
import Photo from './Photo';
import styles from './Photos.module.css';

interface IPhotosProps {
  data: IPhoto[];
  action: string;
  removeSearchResult?: (id: string) => void;
}

const Photos = ({ data, action, removeSearchResult }: IPhotosProps) => {
  const { addPhoto, deletePhoto } = useContext(Context) as IContext;

  const handleOnClick = (searchResult: IPhoto) => {
    const { id, urls, alt_description } = searchResult;

    if (action === 'add') {
      addPhoto({ id, alt_description, urls: { small: urls.small } });
      if (removeSearchResult !== undefined) {
        removeSearchResult(id);
      }
    } else {
      deletePhoto(id);
    }
  };

  return (
    <div aria-label="photos" className={styles.grid}>
      {data.map((item) => {
        return <Photo key={item.id} item={item} handleOnClick={handleOnClick} />;
      })}
    </div>
  );
};

export default Photos;
