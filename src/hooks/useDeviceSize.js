import { useMemo, useState, useEffect } from 'react';

export function useDeviceSize() {
  const [dimensions, setDimensions] = useState({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });
  const handleResize = () => {
    setDimensions({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const deviceType = useMemo(() => {
    if (dimensions.width < 768) {
      return 'mobile';
    }
    if (dimensions.width < 1280) {
      return 'tablet';
    }
    return 'desktop';
  }, [dimensions.width]);

  return {
    width: dimensions.width,
    height: dimensions.height,
    deviceType,
  };
}
