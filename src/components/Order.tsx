import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpLeft, CheckCircle2, Mail } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import { EMAIL } from '../data/site';
import { ORDER_PREFILL_EVENT, type OrderPrefillDetail, type OrderType } from '../lib/orderPrefill';

const TYPES: OrderType[] = ['سلامت و پزشکی', 'دندانپزشکی', 'صنعت و کنترل کیفیت', 'خودرو و حمل‌ونقل', 'سایر'];

const BUDGETS = [
  '',
  'کمتر از ۲۰ میلیون تومان',
  '۲۰ تا ۵۰ میلیون تومان',
  '۵۰ تا ۱۰۰ میلیون تومان',
  'بیش از ۱۰۰ میلیون تومان',
  'قابل مذاکره',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'mt-2 w-full rounded-xl border border-white/20 bg-black/55 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-white/50 focus:bg-black/70';

export default function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<OrderType | ''>('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [reference, setReference] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<OrderPrefillDetail>).detail;
      if (!detail) return;
      setType(detail.type);
      setReference(detail.title);
      setMessage((current) =>
        current.trim() ? current : `مایلم پروژه‌ای مشابه «${detail.title}» سفارش دهم.\n`,
      );
      setStatus('idle');
    };
    window.addEventListener(ORDER_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(ORDER_PREFILL_EVENT, onPrefill);
  }, []);

  const mailtoHref = () => {
    const lines = [
      `نام: ${name}`,
      `ایمیل: ${email}`,
      phone ? `شماره تماس: ${phone}` : '',
      type ? `نوع پروژه: ${type}` : '',
      budget ? `بودجه تقریبی: ${budget}` : '',
      reference ? `پروژهٔ مرجع: ${reference}` : '',
      '',
      'شرح نیاز:',
      message,
    ]
      .filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== ''))
      .join('\n');
    return `mailto:${EMAIL}?subject=${encodeURIComponent('سفارش جدید از سایت')}&body=${encodeURIComponent(lines)}`;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !type || !message.trim()) return;
    setStatus('submitting');
    setErrorText('');
    const payload: Record<string, string> = {
      نام: name.trim(),
      ایمیل: email.trim(),
      'نوع پروژه': type,
      'شرح نیاز': message.trim(),
      _subject: 'سفارش جدید از سایت',
      _template: 'table',
      _captcha: 'false',
      _honey: honey,
    };
    if (phone.trim()) payload['شماره تماس'] = phone.trim();
    if (budget) payload['بودجه تقریبی'] = budget;
    if (reference) payload['پروژهٔ مرجع'] = reference;

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: { success?: string | boolean; message?: string } = await res.json().catch(() => ({}));
      const ok = res.ok && (data.success === true || data.success === 'true');
      if (!ok) throw new Error(data.message || 'send-failed');
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setType('');
      setBudget('');
      setMessage('');
      setReference('');
    } catch {
      setStatus('error');
      setErrorText('ارسال سفارش با مشکل روبه‌رو شد. می‌توانید از ایمیل مستقیم استفاده کنید.');
    }
  };

  return (
    <section id="order" className="scroll-mt-20 px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <div>
          <Reveal delay={100}>
            <Badge>ثبت سفارش پروژه</Badge>
          </Reveal>
          <Reveal delay={180}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.4] text-white text-shadow-soft sm:text-5xl">
              پروژهٔ بعدی‌تان را شروع کنیم
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/85 text-shadow-soft sm:text-base sm:leading-9">
              اگر به سامانه‌ای در حوزهٔ بینایی ماشین، سلامت یا صنعت نیاز دارید، شرح نیازتان را بنویسید تا دربارهٔ
              محدوده، زمان و نحوهٔ همکاری گفت‌وگو کنیم.
            </p>
          </Reveal>
        </div>

        <Reveal delay={220}>
          {status === 'success' ? (
            <div className="rounded-2xl border border-white/20 bg-black/60 px-6 py-10 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={22} strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-xl text-white">سفارش شما ارسال شد</h3>
                  <p className="mt-3 text-[15px] leading-8 text-white/80">
                    پیام‌تان به دستم رسید. در کوتاه‌ترین زمان ممکن پاسخ می‌دهم. اگر لازم بود جزئیات بیشتری اضافه کنید،
                    همان رشته‌نامه را از ایمیل ادامه بدهید.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-white/75 transition-colors hover:text-white"
                  >
                    ارسال سفارش دیگر
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="relative rounded-2xl border border-white/20 bg-black/60 p-5 backdrop-blur-xl sm:p-6"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-white/70">
                  نام
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="نام و نام خانوادگی"
                  />
                </label>
                <label className="block text-sm text-white/70">
                  ایمیل
                  <input
                    required
                    type="email"
                    name="email"
                    dir="ltr"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClass} text-right`}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block text-sm text-white/70">
                  شماره تماس
                  <span className="mr-2 text-xs text-white/40">اختیاری</span>
                  <input
                    type="tel"
                    name="phone"
                    dir="ltr"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${inputClass} text-right`}
                    placeholder="۰۹۱۲…"
                  />
                </label>
                <label className="block text-sm text-white/70">
                  نوع پروژه
                  <select
                    required
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as OrderType | '')}
                    className={`${inputClass} [color-scheme:dark]`}
                  >
                    <option value="" disabled>
                      انتخاب کنید
                    </option>
                    {TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-white/70 sm:col-span-2">
                  بودجه تقریبی
                  <span className="mr-2 text-xs text-white/40">اختیاری</span>
                  <select
                    name="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  >
                    <option value="">انتخاب کنید</option>
                    {BUDGETS.filter(Boolean).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                {reference && (
                  <div className="sm:col-span-2 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/80">
                    پروژهٔ مرجع: <span className="text-white">{reference}</span>
                    <input type="hidden" name="reference" value={reference} />
                  </div>
                )}
                <label className="block text-sm text-white/70 sm:col-span-2">
                  شرح نیاز
                  <textarea
                    required
                    name="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-y leading-7`}
                    placeholder="هدف پروژه، داده‌ها یا تصاویری که در اختیار دارید، و زمان تقریبی را بنویسید."
                  />
                </label>
              </div>

              {/* Honeypot: must stay empty. */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  وب‌سایت
                  <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
                </label>
              </div>

              {status === 'error' && (
                <div className="mt-5 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-100">
                  <p>{errorText}</p>
                  <a href={mailtoHref()} className="mt-2 inline-flex items-center gap-1.5 text-white hover:underline">
                    <Mail size={15} strokeWidth={1.6} />
                    ارسال از طریق ایمیل
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group mt-6 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/15 px-5 py-2.5 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'submitting' ? 'در حال ارسال…' : 'ارسال سفارش'}
                {status !== 'submitting' && (
                  <ArrowUpLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
