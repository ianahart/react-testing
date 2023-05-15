import { IPhoto } from '../../interfaces';
import styles from './Card.module.css';
import { AiOutlineFullscreen } from 'react-icons/ai';
interface ICardProps {
  item: IPhoto;
  direction: string;
}

const Card = ({ item, direction }: ICardProps) => {
  const { urls, alt_description } = item;
  return (
    <div
      className={`${styles.container} ${
        direction === 'next' ? styles.animateLeft : styles.animateRight
      }`}
    >
      <div className={styles.photo}>
        <img src={urls.small} alt={alt_description} />
      </div>
      <div className={styles.desc}>
        <p>{alt_description}</p>
      </div>
      <div className={styles.btn}>
        <button>
          <AiOutlineFullscreen />
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
