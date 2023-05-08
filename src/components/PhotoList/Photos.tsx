import { ISearchResult } from '../../interfaces';
import styles from './Photos.module.css';

interface IPhotosProps {
  searchResults: ISearchResult[];
}

const Photos = ({ searchResults }: IPhotosProps) => {
  return (
    <div aria-label="photos" className={styles.grid}>
      {searchResults.map((searchResult) => {
        return (
          <div aria-label="photo" key={searchResult.id} className={styles.gridItem}>
            <img src={searchResult.urls.thumb} alt={searchResult.alt_description} />
          </div>
        );
      })}
    </div>
  );
};

export default Photos;
