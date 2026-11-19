import { useState } from 'react';
import { ChevronRight, Hexagon } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';

const services = ['COMPUTER VISION', 'AI RESEARCH', 'PYTHON & OPENCV'];

// Drop a portrait at public/portrait.jpg and it replaces the placeholder automatically.
const PORTRAIT = `${import.meta.env.BASE_URL}portrait.jpg`;
const EMAIL = 'elijun6174@gmail.com';

function Portrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-white/80">
          <Hexagon size={24} strokeWidth={1.5} />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">E</span>
        </div>
      )}
      {!failed && (
        <img
          src={PORTRAIT}
          alt="elahe, Computer Vision Engineer and founder of dentotech"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}

export default function SectionOne() {
  return (
    <section id="about" className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s}
              delay={150 + i * 120}
              className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
            >
              / {s}
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            I build vision systems that help machines see clearly — and act on what they see.
          </p>
        </Reveal>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150} className="mb-5">
            <Badge>Computer Engineer · Founder</Badge>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              See. Understand.
              <br />
              Build.
            </h1>
          </Reveal>
        </div>

        <Reveal delay={420} className="self-start scroll-mt-28 md:self-auto">
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <Portrait />
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk with Elahe</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Founder of dentotech
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Send an email
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
