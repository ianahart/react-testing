import { useContext } from 'react';
import Photos from '../components/PhotoList/Photos';
import { Context } from '../context/context';
import { IContext } from '../interfaces';
import styles from './PhotosRoute.module.css';

const PhotosRoute = () => {
  const { photos } = useContext(Context) as IContext;
  return (
    <div className={styles.container}>
      <Photos removeSearchResult={undefined} searchResults={photos} action="remove" />
    </div>
  );
};

export default PhotosRoute;
