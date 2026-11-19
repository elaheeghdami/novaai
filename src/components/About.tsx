import Reveal from './Reveal';
import Badge from './Badge';

const facts: { label: string; value?: string; chips?: string[] }[] = [
  { label: 'تحصیلات', value: 'کارشناسی مهندسی کامپیوتر — دانشگاه آزاد اسلامی تبریز' },
  { label: 'حوزهٔ تخصصی', value: 'هوش مصنوعی، با تمرکز بر بینایی ماشین' },
  { label: 'مهارت‌ها', chips: ['Python', 'OpenCV', 'Computer Vision'] },
  { label: 'فعالیت فعلی', value: 'توسعهٔ dentotech و تأسیس شرکت' },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <Reveal delay={100}>
            <Badge>درباره من</Badge>
          </Reveal>
          <Reveal delay={180}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-5xl">
              از پروژهٔ دانشگاهی
              <br />
              تا محصول واقعی
            </h2>
          </Reveal>
          <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-8 text-white/85 text-shadow-soft sm:text-base sm:leading-9">
            <Reveal delay={260} as="p">
              کارشناس مهندسی کامپیوتر از دانشگاه آزاد اسلامی تبریز هستم و در حوزهٔ هوش مصنوعی، با تمرکز بر بینایی
              ماشین، فعالیت می‌کنم. ابزار اصلی کارم پایتون و کتابخانهٔ OpenCV است.
            </Reveal>
            <Reveal delay={320} as="p">
              تجربهٔ عملی‌ام با مشارکت در پروژهٔ ربات خودروی خودران دانشگاه آزاد تبریز شکل گرفت؛ کاری تیمی روی
              سامانه‌ای که باید محیط اطرافش را درک کند.
            </Reveal>
            <Reveal delay={380} as="p">
              امروز روی dentotech کار می‌کنم، دستیار هوشمند دندانپزشکی که در پارک علم و فناوری به ثبت رسیده است. گام
              بعدی این مسیر، اسکنر هوشمند دندان است. هم‌زمان در حال تأسیس شرکت خودم هستم.
            </Reveal>
          </div>
        </div>

        <Reveal delay={300} className="self-end">
          <dl className="rounded-2xl border border-white/15 bg-white/10 px-6 backdrop-blur-md">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`grid gap-2 py-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6 ${
                  i < facts.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                <dt className="text-xs text-white/55 sm:pt-1">{f.label}</dt>
                <dd className="text-[15px] leading-7 text-white">
                  {f.value}
                  {f.chips && (
                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {f.chips.map((c) => (
                        <span key={c} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-wide text-white">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
