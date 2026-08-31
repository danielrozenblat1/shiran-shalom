import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a Lordicon animation without pulling lottie-web (~300kB) or the
 * animation JSON into the initial bundle. Both are fetched after mount, so the
 * surrounding UI paints immediately and the icon fades in once it is ready.
 *
 * `loadIcon` must be a stable function returning a dynamic import of the JSON,
 * e.g. defined at module scope: const loadIcon = () => import('../Icons/x.json')
 */
const LottieIcon = ({ loadIcon, size = '100%', offset = -100 }) => {
  const [loaded, setLoaded] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([import('@lordicon/react'), loadIcon()])
      .then(([lib, iconModule]) => {
        if (cancelled) return;
        setLoaded({
          Player: lib.Player,
          icon: iconModule.default || iconModule,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [loadIcon]);

  useEffect(() => {
    if (loaded) {
      playerRef.current?.playFromBeginning();
    }
  }, [loaded]);

  if (!loaded) return null;

  const { Player, icon } = loaded;

  return (
    <Player
      ref={playerRef}
      icon={icon}
      size={size}
      offset={offset}
      onComplete={() => {
        setTimeout(() => playerRef.current?.playFromBeginning(), 1000);
      }}
    />
  );
};

export default LottieIcon;
