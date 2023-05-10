import { useContext } from 'react';
import Photos from '../components/PhotoList/Photos';
import { Context } from '../context/context';
import { IContext } from '../interfaces';
import styles from './PhotosRoute.module.css';

const PhotosRoute = () => {
  const { photos } = useContext(Context) as IContext;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Photos</h1>
      </header>
      <Photos removeSearchResult={undefined} data={photos} action="remove" />
    </div>
  );
};

export default PhotosRoute;
