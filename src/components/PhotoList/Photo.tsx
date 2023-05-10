import { IPhoto } from '../../interfaces';
import styles from './Photo.module.css';

interface IPhotoProps {
  item: IPhoto;
  handleOnClick: (searchResult: IPhoto) => void;
}

const Photo = ({ item, handleOnClick }: IPhotoProps) => {
  const { id, urls, alt_description } = item;
  return (
    <div
      role="button"
      onClick={() => handleOnClick({ id, urls, alt_description })}
      aria-label="photo"
      className={styles.gridItem}
    >
      <img src={urls.small} alt={alt_description} />
      {alt_description ? <p>{alt_description}</p> : <p>Description not provided</p>}
    </div>
  );
};

export default Photo;
