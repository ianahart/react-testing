import { useState } from 'react';
import { IPhoto } from '../../interfaces';
import styles from './Photo.module.css';

interface IPhotoProps {
  item: IPhoto;
  handleOnClick: (searchResult: IPhoto) => void;
  action: string;
}

const Photo = ({ item, action, handleOnClick }: IPhotoProps) => {
  const { id, urls, alt_description } = item;
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <>
      <div
        role="button"
        onClick={() => handleOnClick({ id, urls, alt_description })}
        onMouseLeave={() => setMouseOver(false)}
        onMouseEnter={() => setMouseOver(true)}
        aria-label="photo"
        className={styles.gridItem}
      >
        <img src={urls.small} alt={alt_description} />
        {alt_description ? <p>{alt_description}</p> : <p>Description not provided</p>}
        {action === 'remove' && mouseOver && (
          <div className={styles.popOver}>
            <p>Click to remove</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Photo;
