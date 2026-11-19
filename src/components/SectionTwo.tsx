import { ChevronLeft } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';

const EMAIL = 'elijun6174@gmail.com';
const GITHUB = 'https://github.com/elaheeghdami';

const capabilities = [
  {
    index: '01',
    title: 'dentotech',
    body: 'دستیار هوشمند دندانپزشکی، ثبت‌شده در پارک علم و فناوری. قدم بعدی: اسکنر هوشمند دندان.',
  },
  {
    index: '02',
    title: 'ربات خودروی خودران',
    body: 'مشارکت در پروژه ربات خودروی خودران دانشگاه آزاد تبریز.',
  },
  {
    index: '03',
    title: 'شرکت در حال تأسیس',
    body: 'در حال تأسیس شرکت خودم هستم. به‌زودی خبرهای بیشتری می‌دهم.',
  },
];

export default function SectionTwo() {
  return (
    <section id="work" className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={120}>
          <Badge>نمونه کارها</Badge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-left">
          <p className="text-lg leading-loose text-white drop-shadow-md sm:text-xl">
            کارشناس مهندسی کامپیوتر از دانشگاه آزاد اسلامی تبریز؛ حالا بینایی ماشین را به ابزارهایی کاربردی تبدیل می‌کنم.
          </p>
        </Reveal>
      </div>

      {/* Bottom area */}
      <div className="mt-12 flex flex-1 flex-col justify-end gap-12 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl font-normal leading-[1.3] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              به ماشین‌ها
              <br />
              دیدن می‌آموزم.
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm leading-loose text-white/80 drop-shadow-md sm:text-base">
              از ربات خودروی خودران تا دستیار هوشمند دندانپزشکی، جایی کار می‌کنم که پیکسل‌ها به تصمیم تبدیل
              می‌شوند — با پایتون و OpenCV، آرام، دقیق، فریم به فریم.
            </p>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              گیت‌هاب من
              <ChevronLeft size={14} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              ایمیل بزنید
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
                  <ChevronLeft
                    size={16}
                    className="text-white/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-white"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-7 text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Reveal delay={500} className="mt-12">
        <div
          id="contact"
          className="flex scroll-mt-28 flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>© {new Date().getFullYear()} الهه — همه حقوق محفوظ است</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${EMAIL}`} dir="ltr" className="font-[Inter] transition-colors duration-300 hover:text-white">
              {EMAIL}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr" className="font-[Inter] transition-colors duration-300 hover:text-white"
            >
              github.com/elaheeghdami
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
