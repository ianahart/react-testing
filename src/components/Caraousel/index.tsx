import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { IContext } from '../../interfaces';
import Card from './Card';
import { useEffectOnce } from '../../utils/UseEffectOnce';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillCircleFill,
} from 'react-icons/bs';
import styles from './Carousel.module.css';

const Carousel = () => {
  const PAGE_SIZE = 3;
  const { slice, turnPage, page, photos } = useContext(Context) as IContext;
  const [direction, setDirection] = useState('next');
  const [paginationBullets, setPaginationBullets] = useState<number[]>([]);

  useEffect(() => {
    const bulletLimit = Math.ceil(photos.length / PAGE_SIZE);
    const bullets = Array.from(Array(bulletLimit).keys());
    setPaginationBullets(bullets);
  }, [photos.length]);

  useEffectOnce(() => {
    turnPage('next', PAGE_SIZE, true);
  });

  const handleOnNextPage = () => {
    setDirection('next');
    turnPage('next', PAGE_SIZE);
  };

  const handleOnPrevPage = () => {
    setDirection('prev');
    turnPage('prev', PAGE_SIZE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paginationButtons}>
        <div
          data-testid="slideshow-prev"
          role="button"
          onClick={handleOnPrevPage}
          className={styles.paginationButton}
        >
          <BsFillArrowLeftCircleFill />
        </div>
        <div
          data-testid="slideshow-next"
          role="button"
          onClick={handleOnNextPage}
          className={styles.paginationButton}
        >
          <BsFillArrowRightCircleFill />
        </div>
      </div>
      <div data-testid="slideshow-photos" className={styles.carousel}>
        {slice.map((item) => {
          return <Card key={item.id} item={item} direction={direction} />;
        })}
      </div>
      <div data-testid="slideshow-pagination" className={styles.pagination}>
        {paginationBullets.map((p, index) => {
          return (
            <div
              key={index}
              className={`${styles.paginationDot} ${
                page === p + 1 ? styles.activePaginationDot : ''
              } `}
            >
              <BsFillCircleFill role="img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
