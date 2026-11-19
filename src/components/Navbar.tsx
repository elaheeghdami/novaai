import { Hexagon } from 'lucide-react';
import Reveal from './Reveal';

const EMAIL = 'elijun6174@gmail.com';

const links = [
  { label: 'پروژه‌ها', sup: '۳', href: '#work' },
  { label: 'درباره من', href: '#about' },
  { label: 'تماس', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/15">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0}>
          <a href="#about" className="flex items-center gap-2 text-white">
            <Hexagon size={24} strokeWidth={1.5} />
            <span className="text-lg font-medium sm:text-xl">الهه</span>
          </a>
        </Reveal>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {links.map((link, i) => (
            <Reveal as="li" key={link.label} delay={100 + i * 100}>
              <a href={link.href} className="text-sm text-white/85 transition-colors duration-300 hover:text-white">
                {link.label}
                {link.sup && <sup className="mr-0.5 font-mono text-[10px] text-white/60">{link.sup}</sup>}
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={500}>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            ارتباط با من
          </a>
        </Reveal>
      </nav>
    </header>
  );
}
