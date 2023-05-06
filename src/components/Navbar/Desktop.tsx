import Links from './Links';
import styles from './Desktop.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';

interface IDesktopProps {
  navbarWidth: number;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
}

const Desktop = ({ navbarWidth, setIsMobileOpen }: IDesktopProps) => {
  return (
    <>
      {navbarWidth <= 500 ? (
        <div onClick={() => setIsMobileOpen(true)} className={styles.hamburgerIcon}>
          <RxHamburgerMenu role="button" />
        </div>
      ) : (
        <div className={styles.container}>
          <Links />
        </div>
      )}
    </>
  );
};

export default Desktop;
