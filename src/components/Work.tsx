import { useMemo, useState } from 'react';
import { ArrowUpLeft, ImagePlus } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import { Corners, ImageSlot } from './Frame';
import { projects, statusLabels, type ProjectStatus } from '../data/projects';
import { capabilities, categoryLabels, type Capability, type CapabilityCategory } from '../data/capabilities';
import { requestSimilarProject } from '../lib/orderPrefill';

const statusDot: Record<ProjectStatus, string> = {
  active: 'bg-emerald-300',
  development: 'bg-amber-300',
  academic: 'bg-sky-300',
  soon: 'bg-white/60',
};

const num = (i: number) => String(i + 1).padStart(2, '0');

const filters: Array<{ id: 'all' | CapabilityCategory; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'health', label: categoryLabels.health },
  { id: 'tech', label: categoryLabels.tech },
];

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

function CapabilityCard({ item, index }: { item: Capability; index: number }) {
  return (
    <article className="cap-card" style={{ ['--i' as string]: index }}>
      <div className="cap-card-inner rounded-2xl border border-white/20 bg-black/55 backdrop-blur-xl">
        <div className="cap-glow" aria-hidden="true" />
        <div className="relative">
          <div className="cap-float">
            <ImageSlot src={item.image} alt={item.imageAlt} className="aspect-[16/10] w-full rounded-t-2xl" placeholder={<ProjectPlaceholder path={item.image} />} />
          </div>
          <Corners />
          <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-md">
            {categoryLabels[item.category]}
          </span>
        </div>
        <div className="relative z-[1] px-4 pb-4 pt-4 sm:px-5">
          <h3 className="font-display text-lg font-medium leading-7 text-white text-shadow-soft sm:text-xl sm:leading-8">
            {item.title}
          </h3>
          <p className="mt-2 text-[13px] leading-7 text-white/80 sm:text-sm sm:leading-7">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-black/15 px-2.5 py-0.5 text-[11px] text-white/70">
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => requestSimilarProject(item.title, item.orderType)}
            className="group mt-4 inline-flex items-center gap-1 text-sm text-white/85 transition-colors duration-300 hover:text-white"
          >
            سفارش پروژه مشابه
            <ArrowUpLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<'all' | CapabilityCategory>('all');
  const visible = useMemo(
    () => (filter === 'all' ? capabilities : capabilities.filter((item) => item.category === filter)),
    [filter],
  );
  const showHealthNote = filter !== 'tech';

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

      <div id="more-work" className="mt-28 scroll-mt-24 border-t border-white/15 pt-16 md:mt-32 md:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal delay={80}>
              <Badge>بینایی ماشین</Badge>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="mt-6 font-display text-3xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-4xl">
                پروژه‌های تخصصی حوزهٔ سلامت و فناوری
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-[15px] leading-8 text-white/85 text-shadow-soft sm:text-base">
                مجموعه‌ای از سامانه‌های بینایی ماشین که در حوزه‌های سلامت، پزشکی، صنعت و فناوری طراحی و پیاده‌سازی
                کرده‌ام. اگر به پروژه‌ای مشابه نیاز دارید، از دکمهٔ سفارش یا فرم ثبت سفارش استفاده کنید.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="فیلتر حوزهٔ پروژه‌ها">
            {filters.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(chip.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm backdrop-blur-md transition-colors duration-300 ${
                    active
                      ? 'border-white/40 bg-white/20 text-white'
                      : 'border-white/20 bg-black/35 text-white/80 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {showHealthNote && (
          <p className="mt-5 max-w-3xl text-xs leading-6 text-white/55">
            پروژه‌های حوزهٔ سلامت در چارچوب پژوهش و ابزارهای کمکی تعریف می‌شوند و جایگزین تشخیص یا درمان بالینی نیستند.
          </p>
        )}

        <div key={filter} className="cap-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 70, 420)}>
              <CapabilityCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
