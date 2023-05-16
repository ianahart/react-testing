import { useState } from 'react';
import Carousel from '../components/Caraousel';
import Modal from '../components/Modal';
import { initialSinglePhotoState } from '../initialState';
import { IPhoto } from '../interfaces';
import styles from './HomeRoute.module.css';

const HomeRoute = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<IPhoto>(initialSinglePhotoState);

  const handleSetModalOpen = (open: boolean, item?: IPhoto) => {
    setModalOpen(open);
    if (item !== undefined && open) {
      setActivePhoto(item);
    }
  };

  return (
    <div className={styles.homeRouteContainer}>
      {!modalOpen && (
        <div className={styles.carouselContainer}>
          <Carousel activePhoto={activePhoto} handleSetModalOpen={handleSetModalOpen} />
        </div>
      )}
      <Modal handleSetModalOpen={handleSetModalOpen} modalOpen={modalOpen}>
        <div className={styles.modalPhoto}>
          <img src={activePhoto.urls.small} alt={activePhoto.alt_description} />
          <p>{activePhoto.alt_description}</p>
        </div>
      </Modal>
    </div>
  );
};

export default HomeRoute;
