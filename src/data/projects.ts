// ─────────────────────────────────────────────────────────────
// فهرست نمونه کارها — همهٔ اطلاعات پروژه‌ها فقط در همین فایل است.
//
// افزودن تصویر:
//   فایل تصویر را با همان نامی که در فیلد image نوشته شده در پوشهٔ
//   public/projects/ قرار دهید (مثلاً public/projects/dentotech.jpg).
//   نسبت پیشنهادی ۱۶:۱۰ است (مثلاً ۱۶۰۰×۱۰۰۰ پیکسل). تا وقتی فایل
//   وجود نداشته باشد، یک قاب جایگزین نمایش داده می‌شود.
//
// ویرایش توضیحات:
//   متن description را با توضیح دقیق خودتان جایگزین کنید.
//   هر عنصر آرایهٔ description یک پاراگراف جداست.
//
// وضعیت (status): یکی از 'active' | 'development' | 'academic' | 'soon'
// برچسب‌ها (tags): کلمات کوتاه برای نمایش زیر توضیحات.
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = 'active' | 'development' | 'academic' | 'soon';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  image: string; // مسیر نسبت به پوشهٔ public
  imageAlt: string;
  description: string[];
  tags: string[];
  link?: string; // اختیاری: لینک دمو یا مخزن گیت‌هاب
};

export const statusLabels: Record<ProjectStatus, string> = {
  active: 'فعال',
  development: 'در حال توسعه',
  academic: 'پروژهٔ دانشگاهی',
  soon: 'به‌زودی',
};

export const projects: Project[] = [
  {
    id: 'dentotech',
    title: 'dentotech',
    subtitle: 'دستیار هوشمند دندانپزشکی',
    status: 'active',
    image: 'projects/dentotech.jpg',
    imageAlt: 'تصویر پروژهٔ dentotech',
    description: [
      'dentotech یک دستیار هوشمند دندانپزشکی مبتنی بر هوش مصنوعی است که در پارک علم و فناوری به ثبت رسیده است. توسعهٔ این محصول، محور اصلی فعالیت فعلی من است.',
      // ← توضیح کامل‌تر پروژه (مسئله، راهکار، وضعیت فعلی) را اینجا اضافه کنید.
    ],
    tags: ['هوش مصنوعی', 'دندانپزشکی دیجیتال', 'پارک علم و فناوری'],
  },
  {
    id: 'smart-scanner',
    title: 'اسکنر هوشمند دندان',
    subtitle: 'محصول بعدی در نقشهٔ راه dentotech',
    status: 'development',
    image: 'projects/smart-scanner.jpg',
    imageAlt: 'تصویر اسکنر هوشمند دندان',
    description: [
      'اسکنر هوشمند دندان، گام بعدی نقشهٔ راه dentotech است و در مرحلهٔ توسعه قرار دارد. جزئیات فنی و تصاویر نمونهٔ اولیه پس از تکمیل در همین بخش منتشر می‌شود.',
      // ← توضیحات اسکنر را اینجا تکمیل کنید.
    ],
    tags: ['dentotech', 'اسکنر هوشمند', 'در حال توسعه'],
  },
  {
    id: 'autonomous-car',
    title: 'ربات خودروی خودران',
    subtitle: 'دانشگاه آزاد اسلامی تبریز',
    status: 'academic',
    image: 'projects/autonomous-car.jpg',
    imageAlt: 'تصویر ربات خودروی خودران دانشگاه آزاد تبریز',
    description: [
      'مشارکت در پروژهٔ ربات خودروی خودران دانشگاه آزاد اسلامی تبریز؛ تجربه‌ای عملی در کار تیمی روی یک سامانهٔ خودران.',
      // ← سهم خود در پروژه و نتایج آن را اینجا بنویسید.
    ],
    tags: ['خودروی خودران', 'رباتیک', 'پروژهٔ دانشگاهی'],
  },
  {
    id: 'company',
    title: 'شرکت در حال تأسیس',
    subtitle: 'کارآفرینی',
    status: 'soon',
    image: 'projects/company.jpg',
    imageAlt: 'تصویر شرکت',
    description: [
      'در حال تأسیس شرکت خودم هستم. نام، حوزهٔ فعالیت و جزئیات بیشتر پس از ثبت رسمی در این بخش اعلام می‌شود.',
    ],
    tags: ['کارآفرینی', 'به‌زودی'],
  },
];
