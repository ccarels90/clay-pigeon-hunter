import React, { useCallback, useEffect, useState } from 'react';

const Controller = () => {
  const [alpha, setAlpha] = useState(0); // Helling
  const [beta, setBeta] = useState(0); // Helling
  const [gamma, setGamma] = useState(0); // Draaiing

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      if (alpha) setAlpha(alpha);
      if (beta) setBeta(beta);
      if (gamma) setGamma(gamma);
    },
    []
  );

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [handleDeviceOrientation]);

  return (
    <div>
      <h2>Controller</h2>
      <p>rotation around z-axis (alpha): {alpha}</p>
      <p>front back motion (beta): {beta}</p>
      <p>left to right (gamma): {gamma}</p>
    </div>
  );
};

export default Controller;
