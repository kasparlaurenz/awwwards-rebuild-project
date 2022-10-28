import { useEffect, useState } from 'react';

const useIsScrolled = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = (event: Event) => {
    if (window.scrollY > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};

export default useIsScrolled;
