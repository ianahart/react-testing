import { useContext } from 'react';
import { Context } from '../../context/context';
import { IContext, ISearchResult } from '../../interfaces';
import styles from './Photos.module.css';

interface IPhotosProps {
  searchResults: ISearchResult[];
  action: string;
  removeSearchResult: (id: string) => void;
}

const Photos = ({ searchResults, action, removeSearchResult }: IPhotosProps) => {
  const { addPhoto } = useContext(Context) as IContext;

  const handleOnClick = (searchResult: ISearchResult) => {
    const { id, urls, alt_description } = searchResult;
    if (action === 'add') {
      addPhoto({ id, alt_description, url: urls.small });
      removeSearchResult(id);
    } else {
      // deletePhoto(id)
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
            <img src={searchResult.urls.thumb} alt={searchResult.alt_description} />
          </div>
        );
      })}
    </div>
  );
};

export default Photos;
