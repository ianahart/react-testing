import Carousel from '../components/Caraousel';
import styles from './HomeRoute.module.css';

const HomeRoute = () => {
  return (
    <div className={styles.homeRouteContainer}>
      <div className={styles.carouselContainer}>
        <Carousel />
      </div>
    </div>
  );
};

export default HomeRoute;
