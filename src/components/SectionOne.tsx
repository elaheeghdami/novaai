import { ChevronLeft } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';

const services = ['بینایی ماشین', 'پژوهش در هوش مصنوعی', 'پایتون و OpenCV'];

// Placeholder portrait — replace public/portrait.jpg with the real photo (same filename).
const PORTRAIT = `${import.meta.env.BASE_URL}portrait.jpg`;
const EMAIL = 'elijun6174@gmail.com';

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
              className="font-mono text-sm text-white/90 drop-shadow-md"
            >
              / {s}
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300} className="max-w-xs sm:text-left">
          <p className="text-lg leading-loose text-white drop-shadow-md sm:text-xl">
            سیستم‌های بینایی می‌سازم که به ماشین‌ها کمک می‌کنند دقیق ببینند و بر اساس آنچه می‌بینند عمل کنند.
          </p>
        </Reveal>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150} className="mb-5">
            <Badge>مهندس کامپیوتر · بنیان‌گذار</Badge>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="text-[2rem] font-normal leading-[1.3] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              <span className="whitespace-nowrap">متخصص هوش مصنوعی</span>
              <br />
              <span className="whitespace-nowrap">و بینایی ماشین</span>
            </h1>
          </Reveal>
        </div>

        <Reveal delay={420} className="self-start scroll-mt-28 md:self-auto">
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <img
              src={PORTRAIT}
              alt="عکس الهه، متخصص هوش مصنوعی و بینایی ماشین"
              className="h-24 w-20 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1.5 pl-2">
              <span className="text-sm font-medium text-white">گفت‌وگو با الهه</span>
              <span className="font-mono text-[11px] text-white/60">بنیان‌گذار dentotech</span>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                ارسال ایمیل
                <ChevronLeft size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
