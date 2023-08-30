import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    function checkIsMobile() {
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
      setIsMobileDevice(mobileRegex.test(navigator.userAgent));
    }

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobileDevice;
}
