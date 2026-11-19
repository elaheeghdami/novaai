import { useState, type ReactNode } from 'react';
import { asset } from '../data/site';

/** Viewfinder corner brackets — a quiet computer-vision motif used on image frames. */
export function Corners() {
  const c = 'absolute h-4 w-4 border-white/70';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3">
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
    </div>
  );
}

type SlotProps = {
  src: string;
  alt: string;
  className?: string;
  placeholder: ReactNode;
};

/** Shows the image at `src` (relative to public/) if it exists, otherwise the placeholder. */
export function ImageSlot({ src, alt, className = '', placeholder }: SlotProps) {
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading');
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {state !== 'ok' && <div className="absolute inset-0">{placeholder}</div>}
      {state !== 'missing' && (
        <img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          onLoad={() => setState('ok')}
          onError={() => setState('missing')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            state === 'ok' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
