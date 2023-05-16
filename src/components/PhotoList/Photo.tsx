import { useState } from 'react';
import { IPhoto } from '../../interfaces';
import styles from './Photo.module.css';
import PhotoEdit from './PhotoEdit';

interface IPhotoProps {
  item: IPhoto;
  handleOnClick: (searchResult: IPhoto) => void;
  action: string;
}

const Photo = ({ item, action, handleOnClick }: IPhotoProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { id, urls, alt_description } = item;
  const altDescription = alt_description ? alt_description : 'Description not provided';

  const handleShowEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setShowEdit(true);
  };

  return (
    <>
      <div
        onMouseLeave={() => setMouseOver(false)}
        onMouseEnter={() => setMouseOver(true)}
        aria-label="photo"
        className={styles.gridItem}
      >
        <img src={urls.small} alt={altDescription} />
        {!showEdit ? (
          <p onClick={handleShowEdit}>{altDescription}</p>
        ) : (
          <PhotoEdit
            id={item.id}
            setShowEdit={setShowEdit}
            altDescription={altDescription}
          />
        )}
        {mouseOver && (
          <div className={styles.popOver}>
            <p role="button" onClick={() => handleOnClick({ id, urls, alt_description })}>
              {action === 'remove' ? 'Click to remove' : 'Click to add'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Photo;
