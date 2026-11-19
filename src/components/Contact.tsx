import { ArrowUpLeft, Github, Mail } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import { EMAIL, GITHUB } from '../data/site';

const channels = [
  { label: 'ایمیل', value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail, external: false },
  { label: 'گیت‌هاب', value: 'github.com/elaheeghdami', href: GITHUB, icon: Github, external: true },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen scroll-mt-20 flex-col justify-end px-5 pb-10 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 md:px-12 md:pb-12"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
        <div>
          <Reveal delay={100}>
            <Badge>تماس</Badge>
          </Reveal>
          <Reveal delay={180}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-5xl lg:text-6xl">
              همکاری و ارتباط
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/85 text-shadow-soft sm:text-base sm:leading-9">
              برای همکاری در پروژه‌های بینایی ماشین، گفت‌وگو دربارهٔ dentotech و اسکنر هوشمند دندان، یا هر پرسش
              حرفه‌ای، از طریق ایمیل با من در ارتباط باشید.
            </p>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-6 backdrop-blur-md">
            {channels.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex items-center gap-4 py-5 ${i < channels.length - 1 ? 'border-b border-white/15' : ''}`}
              >
                <c.icon size={20} strokeWidth={1.5} className="shrink-0 text-white/70" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-white/55">{c.label}</div>
                  <div dir="ltr" className="mt-1 truncate text-right text-base text-white">
                    {c.value}
                  </div>
                </div>
                <ArrowUpLeft
                  size={18}
                  className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={400} className="mt-16">
        <div className="flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear().toLocaleString('fa-IR', { useGrouping: false })} الهه — همهٔ حقوق محفوظ است.</span>
          <span>متخصص هوش مصنوعی و بینایی ماشین</span>
        </div>
      </Reveal>
    </section>
  );
}
