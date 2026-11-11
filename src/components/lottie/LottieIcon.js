import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a Lordicon animation without pulling lottie-web (~300kB) or the
 * animation JSON into the initial bundle. Both are fetched after mount, so the
 * surrounding UI paints immediately and the icon fades in once it is ready.
 *
 * `loadIcon` must be a stable function returning a dynamic import of the JSON,
 * e.g. defined at module scope: const loadIcon = () => import('../Icons/x.json')
 *
 * `once`      - play on mount only (default replays every second, like the hero buttons)
 * `hover`     - replay when the pointer enters the icon (default true)
 * `colorize`  - tint the icon strokes (Lordicon wired-outline icons are black by default)
 */
const LottieIcon = ({ loadIcon, size = '100%', once = false, hover = true, colorize, className = '', style }) => {
  const [loaded, setLoaded] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = () =>
      Promise.all([import('@lordicon/react'), loadIcon()])
        .then(([lib, iconModule]) => {
          if (cancelled) return;
          setLoaded({
            Player: lib.Player,
            icon: iconModule.default || iconModule,
          });
        })
        .catch(() => {});

    // Wait for the page's own assets (fonts, hero images) before pulling the
    // animation runtime, so the icons never compete with the first paint.
    const start = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 2000 });
      else setTimeout(load, 300);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
    };
  }, [loadIcon]);

  useEffect(() => {
    if (loaded) {
      playerRef.current?.playFromBeginning();
    }
  }, [loaded]);

  const replay = () => playerRef.current?.playFromBeginning();

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, lineHeight: 0, ...style }}
      onMouseEnter={hover ? replay : undefined}
      aria-hidden="true"
    >
      {loaded && (
        <loaded.Player
          ref={playerRef}
          icon={loaded.icon}
          size="100%"
          colorize={colorize}
          onComplete={() => {
            if (!once) setTimeout(replay, 1000);
          }}
        />
      )}
    </span>
  );
};

export default LottieIcon;
