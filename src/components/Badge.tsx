import type { ReactNode } from 'react';

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border-r-2 border-white bg-white/15 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
      {children}
    </span>
  );
}
