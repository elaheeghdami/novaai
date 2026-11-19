import { Hexagon } from 'lucide-react';
import Reveal from './Reveal';
import { EMAIL } from '../data/site';
import { projects } from '../data/projects';

const fa = (n: number) => n.toLocaleString('fa-IR');

const links = [
  { label: 'درباره من', href: '#about' },
  { label: 'نمونه کارها', sup: fa(projects.length), href: '#work' },
  { label: 'تماس', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px]">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0}>
          <a href="#top" className="flex items-center gap-2.5 text-white">
            <Hexagon size={24} strokeWidth={1.5} />
            <span className="font-display text-lg font-semibold sm:text-xl">الهه</span>
          </a>
        </Reveal>

        <ul className="hidden items-center gap-9 md:flex lg:gap-11">
          {links.map((link, i) => (
            <Reveal as="li" key={link.href} delay={100 + i * 100}>
              <a href={link.href} className="text-sm text-white/85 transition-colors duration-300 hover:text-white">
                {link.label}
                {link.sup && <sup className="mr-1 text-[10px] text-white/60">{link.sup}</sup>}
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
