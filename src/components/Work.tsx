import { ArrowUpLeft, ImagePlus } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import { Corners, ImageSlot } from './Frame';
import { projects, statusLabels, type ProjectStatus } from '../data/projects';

const statusDot: Record<ProjectStatus, string> = {
  active: 'bg-emerald-300',
  development: 'bg-amber-300',
  academic: 'bg-sky-300',
  soon: 'bg-white/60',
};

const num = (i: number) => String(i + 1).padStart(2, '0');

function ProjectPlaceholder({ path }: { path: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/15 via-white/5 to-white/10">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <ImagePlus size={30} strokeWidth={1.25} className="relative text-white/70" />
      <span className="relative text-sm text-white/75">جای تصویر پروژه</span>
      <code dir="ltr" className="relative rounded bg-black/25 px-2 py-0.5 text-[11px] text-white/60">
        public/{path}
      </code>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal delay={100}>
            <Badge>نمونه کارها</Badge>
          </Reveal>
          <Reveal delay={180}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-5xl">
              پروژه‌ها
            </h2>
          </Reveal>
        </div>
        <Reveal delay={240} className="max-w-sm sm:text-left">
          <p className="text-[15px] leading-8 text-white/85 text-shadow-soft sm:text-base">
            منتخبی از پروژه‌هایی که در آن‌ها مشارکت داشته‌ام یا در حال توسعهٔ آن‌ها هستم.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className={`flex flex-col gap-8 md:items-center md:gap-14 ${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            <Reveal delay={120} className="md:w-7/12">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md">
                <div className="relative">
                  <ImageSlot
                    src={p.image}
                    alt={p.imageAlt}
                    placeholder={<ProjectPlaceholder path={p.image} />}
                    className="aspect-[16/10] w-full rounded-xl"
                  />
                  <Corners />
                </div>
              </div>
            </Reveal>

            <div className="md:w-5/12">
              <Reveal delay={200} className="flex items-center gap-4">
                <span className="text-xs tabular-nums tracking-[0.15em] text-white/55" dir="ltr">
                  {num(i)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
                  {statusLabels[p.status]}
                </span>
              </Reveal>
              <Reveal delay={260}>
                <h3 className="mt-5 font-display text-3xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/65">{p.subtitle}</p>
              </Reveal>
              <Reveal delay={320} className="mt-5 max-w-lg space-y-4 text-[15px] leading-8 text-white/85 text-shadow-soft">
                {p.description.map((d, j) => (
                  <p key={j}>{d}</p>
                ))}
              </Reveal>
              <Reveal delay={380} className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs text-white/75">
                    {t}
                  </span>
                ))}
              </Reveal>
              {p.link && (
                <Reveal delay={420} className="mt-6">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-white/85 transition-colors duration-300 hover:text-white"
                  >
                    مشاهدهٔ پروژه
                    <ArrowUpLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                  </a>
                </Reveal>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
