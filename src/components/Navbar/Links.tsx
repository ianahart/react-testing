import { Link } from 'react-router-dom';
import styles from './Links.module.css';

const Links = () => {
  return (
    <>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <Link className={styles.link} to="/add">
        Add Photo
      </Link>
      <Link className={styles.link} to="/photos">
        Photos
      </Link>
    </>
  );
};

export default Links;
