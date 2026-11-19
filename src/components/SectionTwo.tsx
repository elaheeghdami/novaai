import { ChevronRight } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';

const EMAIL = 'elijun6174@gmail.com';
const GITHUB = 'https://github.com/elaheeghdami';

const capabilities = [
  {
    index: '01',
    title: 'dentotech',
    body: 'An AI dental assistant, registered at a Science and Technology Park. A smart dental scanner comes next.',
  },
  {
    index: '02',
    title: 'Autonomous car robot',
    body: 'Computer vision for Islamic Azad University Tabriz’s self-driving car robot project.',
  },
  {
    index: '03',
    title: 'Company in progress',
    body: 'Founding my own AI venture, built around computer vision. More soon.',
  },
];

export default function SectionTwo() {
  return (
    <section id="work" className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={120}>
          <Badge>Selected Work</Badge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Computer Engineering, Islamic Azad University Tabriz. Now turning computer vision into tools people use.
          </p>
        </Reveal>
      </div>

      {/* Bottom area */}
      <div className="mt-12 flex flex-1 flex-col justify-end gap-12 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Teaching machines
              <br />
              to see.
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              From a self-driving robot on campus to an AI assistant for dentistry, I work where pixels become
              decisions — with Python and OpenCV, quietly, precisely, frame by frame.
            </p>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              View GitHub
              <ChevronRight size={14} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              Email me
            </a>
          </Reveal>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {capabilities.map((c, i) => (
            <Reveal
              key={c.index}
              delay={300 + i * 110}
              className={`group flex gap-5 py-5 ${i < capabilities.length - 1 ? 'border-b border-white/15' : ''}`}
            >
              <span className="w-6 shrink-0 pt-1 font-mono text-[11px] tabular-nums tracking-[0.15em] text-white/55">{c.index}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-medium text-white sm:text-lg">{c.title}</h3>
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Reveal delay={500} className="mt-12">
        <div
          id="contact"
          className="flex scroll-mt-28 flex-col gap-2 border-t border-white/15 pt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>© {new Date().getFullYear()} elahe</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${EMAIL}`} className="normal-case tracking-normal transition-colors duration-300 hover:text-white">
              {EMAIL}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="normal-case tracking-normal transition-colors duration-300 hover:text-white"
            >
              github.com/elaheeghdami
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
