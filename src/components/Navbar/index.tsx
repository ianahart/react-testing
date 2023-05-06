import Desktop from './Desktop';
import { useEffect, useState } from 'react';
import Mobile from './Mobile';

const Navbar = () => {
  const [navbarWidth, setNavbarWidth] = useState<number>(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleResize = (event: Event) => {
    const target = event.target as Window;
    setNavbarWidth(target.innerWidth);

    navbarWidth >= 501 ? setIsMobileOpen(false) : setIsMobileOpen(true);
  };

  useEffect(() => {
    if (navbarWidth === 0) {
      setNavbarWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navbarWidth, handleResize]);

  return (
    <>
      {isMobileOpen ? (
        <Mobile setIsMobileOpen={setIsMobileOpen} />
      ) : (
        <Desktop setIsMobileOpen={setIsMobileOpen} navbarWidth={navbarWidth} />
      )}
    </>
  );
};

export default Navbar;
