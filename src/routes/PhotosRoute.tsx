import { useContext } from 'react';
import Photos from '../components/PhotoList/Photos';
import { Context } from '../context/context';
import { IContext } from '../interfaces';
import { useEffectOnce } from '../utils/UseEffectOnce';
import styles from './PhotosRoute.module.css';

const PhotosRoute = () => {
  const { curPhotoIndex, photos, turnPage, page, slice } = useContext(
    Context
  ) as IContext;

  useEffectOnce(() => {
    turnPage('next');
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Photos</h1>
      </header>
      <Photos removeSearchResult={undefined} data={slice} action="remove" />
      <div className={styles.pagination}>
        {page > 1 && <button onClick={() => turnPage('prev')}>Prev</button>}
        <p aria-label="page number">{page}</p>
        {curPhotoIndex <= photos.length && (
          <button onClick={() => turnPage('next')}>Next</button>
        )}
      </div>
    </div>
  );
};

export default PhotosRoute;
