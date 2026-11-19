import { ChevronLeft, User } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import { Corners, ImageSlot } from './Frame';
import { EMAIL } from '../data/site';

const services = ['بینایی ماشین', 'هوش مصنوعی کاربردی', 'Python و OpenCV'];

// عکس پرتره: فایل public/portrait.jpg را با عکس خودتان (نسبت ۴:۵) جایگزین کنید.
const PORTRAIT = 'portrait.jpg';

function PortraitPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white/20 to-white/5">
      <User size={56} strokeWidth={1} className="text-white/60" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-between gap-14 px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2.5">
          {services.map((s, i) => (
            <Reveal as="li" key={s} delay={150 + i * 120} className="text-sm text-white/90 text-shadow-soft">
              / {s}
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300} className="max-w-sm sm:text-left">
          <p className="text-base leading-8 text-white text-shadow-soft sm:text-lg sm:leading-9">
            طراحی و پیاده‌سازی سامانه‌های بینایی ماشین؛ از پردازش تصویر تا محصولی که در دنیای واقعی به کار گرفته
            می‌شود.
          </p>
        </Reveal>
      </div>

      {/* Bottom: headline, portrait, summary */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-16">
        <div className="md:col-start-1 md:row-start-1">
          <Reveal delay={150} className="mb-6">
            <Badge>مهندس کامپیوتر · بنیان‌گذار dentotech</Badge>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="font-display text-[2.1rem] font-medium leading-[1.35] text-white text-shadow-soft sm:text-6xl lg:text-7xl">
              <span className="whitespace-nowrap">متخصص هوش مصنوعی</span>
              <br />
              <span className="whitespace-nowrap">و بینایی ماشین</span>
            </h1>
          </Reveal>
        </div>

        <Reveal delay={420} className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-end">
          <figure className="flex w-fit items-end gap-4 rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md md:flex-col md:items-stretch md:gap-0">
            <div className="relative">
              <ImageSlot
                src={PORTRAIT}
                alt="عکس پرترهٔ الهه"
                placeholder={<PortraitPlaceholder />}
                className="h-[220px] w-[176px] rounded-xl md:h-[340px] md:w-[272px]"
              />
              <Corners />
            </div>
            <figcaption className="flex flex-col gap-1.5 pb-1 md:flex-row md:items-center md:justify-between md:px-2 md:pb-1.5 md:pt-3.5">
              <div>
                <div className="font-display text-base font-semibold text-white">الهه</div>
                <div className="mt-0.5 text-xs text-white/65">بنیان‌گذار dentotech</div>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 md:mt-0"
              >
                ارسال ایمیل
                <ChevronLeft size={14} />
              </a>
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-start-1 md:row-start-2">
          <Reveal delay={480}>
            <p className="max-w-xl text-sm leading-8 text-white/85 text-shadow-soft sm:text-base sm:leading-8">
              کارشناس مهندسی کامپیوتر از دانشگاه آزاد اسلامی تبریز، با تمرکز بر بینایی ماشین. در حال توسعهٔ dentotech،
              دستیار هوشمند دندانپزشکی ثبت‌شده در پارک علم و فناوری، و تأسیس شرکت خودم هستم.
            </p>
          </Reveal>
          <Reveal delay={560} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              مشاهدهٔ نمونه کارها
              <ChevronLeft size={14} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              دربارهٔ من
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
