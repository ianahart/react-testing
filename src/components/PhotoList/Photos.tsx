import { useContext } from 'react';
import { Context } from '../../context/context';
import { IContext, IPhoto } from '../../interfaces';
import styles from './Photos.module.css';

interface IPhotosProps {
  searchResults: IPhoto[];
  action: string;
  removeSearchResult?: (id: string) => void;
}

const Photos = ({ searchResults, action, removeSearchResult }: IPhotosProps) => {
  const { addPhoto, deletePhoto } = useContext(Context) as IContext;

  const handleOnClick = (searchResult: IPhoto) => {
    const { id, urls, alt_description } = searchResult;

    if (action === 'add') {
      console.log(searchResult);
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
      {searchResults.map((searchResult) => {
        return (
          <div
            onClick={() => handleOnClick(searchResult)}
            aria-label="photo"
            key={searchResult.id}
            className={styles.gridItem}
          >
            <img src={searchResult.urls.small} alt={searchResult.alt_description} />
          </div>
        );
      })}
    </div>
  );
};

export default Photos;
