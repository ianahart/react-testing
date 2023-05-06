import Links from './Links';
import styles from './Mobile.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect, useRef } from 'react';

interface IMobileProps {
  setIsMobileOpen: (isMobileOpen: boolean) => void;
}

const Mobile = ({ setIsMobileOpen }: IMobileProps) => {
  const menuRef = useRef<HTMLElement>(null);

  const clickAway = useCallback(
    (e: Event) => {
      const target = e.target as Element;
      if (menuRef.current === null) return;
      if (!menuRef.current.contains(target) && target.role !== 'button') {
        setIsMobileOpen(false);
      }
    },
    [setIsMobileOpen]
  );

  useEffect(() => {
    window.addEventListener('click', clickAway);
    return () => window.removeEventListener('click', clickAway);
  }, [clickAway]);

  return (
    <nav ref={menuRef} className={styles.container}>
      <div onClick={() => setIsMobileOpen(false)} className={styles.closeIcon}>
        <AiOutlineClose />
      </div>
      <Links />
    </nav>
  );
};

export default Mobile;
