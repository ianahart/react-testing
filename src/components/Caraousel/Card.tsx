import { IPhoto } from '../../interfaces';
import styles from './Card.module.css';
import { AiOutlineFullscreen } from 'react-icons/ai';
interface ICardProps {
  item: IPhoto;
  direction: string;
  handleSetModalOpen: (open: boolean, item?: IPhoto) => void;
}

const Card = ({ item, direction, handleSetModalOpen }: ICardProps) => {
  const { urls, alt_description } = item;

  return (
    <>
      <div
        data-testid="container"
        className={`${styles.container} ${
          direction === 'next' ? styles.animateLeft : styles.animateRight
        }`}
      >
        <div className={styles.photo}>
          <img src={urls.small} alt={alt_description} data-testid="photo" />
        </div>
        <div className={styles.desc}>
          <p>{alt_description}</p>
        </div>
        <div className={styles.btn}>
          <button onClick={() => handleSetModalOpen(true, item)}>
            <AiOutlineFullscreen role="img" data-testid="svg-icon" />
            View
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
