// ─────────────────────────────────────────────────────────────
// پروژه‌های بینایی ماشین در بخش نمونه کارها.
// تصاویر سه‌بعدی در public/projects/capabilities/{id}.webp
// برچسب وضعیت «قابل سفارش» استفاده نمی‌شود؛ دسته‌بندی کافی است.
// پروژه‌های سلامت پژوهشی / کمکی‌اند، نه ابزار تشخیص بالینی.
// ─────────────────────────────────────────────────────────────

import type { OrderType } from '../lib/orderPrefill';

export type CapabilityCategory = 'health' | 'tech';

export type Capability = {
  id: string;
  title: string;
  category: CapabilityCategory;
  orderType: OrderType;
  image: string;
  imageAlt: string;
  description: string;
  tags: string[];
};

export const categoryLabels: Record<CapabilityCategory, string> = {
  health: 'سلامت و پزشکی',
  tech: 'فناوری و صنعت',
};

export const capabilities: Capability[] = [
  {
    id: 'caries-yolo',
    title: 'تشخیص پوسیدگی در رادیوگرافی',
    category: 'health',
    orderType: 'دندانپزشکی',
    image: 'projects/capabilities/caries-yolo.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص پوسیدگی دندان',
    description:
      'سامانه‌ای برای مشخص‌کردن نواحی مشکوک به پوسیدگی در تصاویر رادیوگرافی دندان، با مدل‌های تشخیص اشیا مانند YOLO. این ابزار برای کمک به بررسی تصویر طراحی شده و جایگزین تشخیص بالینی نیست.',
    tags: ['YOLO', 'رادیوگرافی دندان', 'تشخیص اشیا'],
  },
  {
    id: 'panoramic-seg',
    title: 'شماره‌گذاری و جداسازی دندان در پانورامیک',
    category: 'health',
    orderType: 'دندانپزشکی',
    image: 'projects/capabilities/panoramic-seg.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ بخش‌بندی دندان در پانورامیک',
    description:
      'مدل بخش‌بندی برای جداسازی مرز دندان‌ها و شماره‌گذاری آن‌ها در تصاویر پانورامیک؛ مبنایی برای تحلیل ساختاری فک و دندان.',
    tags: ['Segmentation', 'تصویر پانورامیک', 'دندانپزشکی'],
  },
  {
    id: 'shade-matching',
    title: 'تشخیص رنگ دندان',
    category: 'health',
    orderType: 'دندانپزشکی',
    image: 'projects/capabilities/shade-matching.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تطبیق رنگ دندان',
    description:
      'مقایسهٔ رنگ دندان در عکس با راهنماهای رنگ استاندارد، با تکیه بر فضاهای رنگی و پردازش تصویر.',
    tags: ['OpenCV', 'فضای رنگ', 'دندانپزشکی دیجیتال'],
  },
  {
    id: 'physio-coach',
    title: 'مربی ورزش و فیزیوتراپی',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/physio-coach.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ مربی فیزیوتراپی',
    description:
      'تخمین حالت بدن برای محاسبهٔ زاویهٔ مفاصل، شمارش تکرار حرکت و هشدار در صورت انحراف فرم بدن در تمرین یا فیزیوتراپی.',
    tags: ['Pose Estimation', 'MediaPipe', 'فیزیوتراپی'],
  },
  {
    id: 'drowsiness',
    title: 'تشخیص خستگی و خواب‌آلودگی',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/drowsiness.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص خواب‌آلودگی',
    description:
      'پایش نشانه‌های صورت مانند پلک‌زدن و خمیازه برای تشخیص علائم خستگی و خواب‌آلودگی در رانندگی یا کار طولانی.',
    tags: ['Face Landmarks', 'MediaPipe', 'ایمنی'],
  },
  {
    id: 'posture',
    title: 'پایش وضعیت نشستن',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/posture.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ پایش وضعیت نشستن',
    description:
      'تحلیل وضعیت نشستن از روی وب‌کم و یادآوری در صورت قوز کردن یا جلو آمدن سر.',
    tags: ['Pose Estimation', 'وب‌کم', 'ارگونومی'],
  },
  {
    id: 'pill-count',
    title: 'شمارش قرص و سلول',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/pill-count.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ شمارش قرص و سلول',
    description:
      'شمارش قرص در سینی یا سلول در تصاویر میکروسکوپی، با آستانه‌گذاری و استخراج کانتور.',
    tags: ['OpenCV', 'شمارش اشیا', 'پردازش تصویر'],
  },
  {
    id: 'pneumonia',
    title: 'غربالگری ذات‌الریه در رادیوگرافی قفسهٔ سینه',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/pneumonia.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تحلیل رادیوگرافی قفسهٔ سینه',
    description:
      'طبقه‌بندی تصاویر رادیوگرافی قفسهٔ سینه برای غربالگری پژوهشی نشانه‌های مرتبط با ذات‌الریه. این سامانه ابزار تشخیص بالینی نیست.',
    tags: ['طبقه‌بندی تصویر', 'رادیوگرافی', 'یادگیری عمیق'],
  },
  {
    id: 'skin-lesion',
    title: 'غربالگری ضایعه‌های پوستی',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/skin-lesion.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ غربالگری ضایعهٔ پوستی',
    description:
      'غربالگری پژوهشی ضایعه‌های پوستی و تمایز خال‌های معمولی از نواحی نیازمند بررسی بیشتر. جایگزین معاینهٔ تخصصی نیست.',
    tags: ['طبقه‌بندی تصویر', 'درماتوسکوپی', 'یادگیری عمیق'],
  },
  {
    id: 'retinopathy',
    title: 'تحلیل رتینوپاتی دیابتی',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/retinopathy.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تحلیل تصویر شبکیه',
    description:
      'تحلیل تصاویر فوندوس شبکیه برای مشخص‌کردن نشانه‌های مرتبط با رتینوپاتی دیابتی در چارچوب پژوهش.',
    tags: ['تصویر شبکیه', 'طبقه‌بندی تصویر', 'پژوهش پزشکی'],
  },
  {
    id: 'rppg',
    title: 'اندازه‌گیری ضربان قلب از ویدیو',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/rppg.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ اندازه‌گیری ضربان از ویدیو',
    description:
      'تخمین غیرتماسی ضربان قلب از تغییرات بسیار ریز رنگ پوست در ویدیوی چهره (rPPG).',
    tags: ['rPPG', 'پردازش ویدیو', 'سیگنال حیاتی'],
  },
  {
    id: 'brain-tumor',
    title: 'جداسازی تومور مغزی در MRI',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/brain-tumor.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ بخش‌بندی MRI مغز',
    description:
      'بخش‌بندی ساختارهای مشکوک در تصاویر MRI مغز با معماری‌هایی مانند U-Net، به‌عنوان ابزار کمکی پژوهشی.',
    tags: ['U-Net', 'MRI', 'Segmentation'],
  },
  {
    id: 'wound-monitor',
    title: 'پایش روند بهبود زخم',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/wound-monitor.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ پایش بهبود زخم',
    description:
      'اندازه‌گیری مساحت زخم در عکس‌های متوالی برای پیگیری روند بهبود در طول زمان.',
    tags: ['اندازه‌گیری تصویر', 'OpenCV', 'پایش زمانی'],
  },
  {
    id: 'vision-assist',
    title: 'دستیار بینایی برای نابینایان',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/vision-assist.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ دستیار بینایی',
    description:
      'دستیار بینایی که اشیا یا متن را در میدان دید تشخیص می‌دهد و نتیجه را به‌صورت شنیداری اعلام می‌کند.',
    tags: ['تشخیص اشیا', 'دسترسی‌پذیری', 'بینایی ماشین'],
  },
  {
    id: 'gait-analysis',
    title: 'تحلیل راه رفتن',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/gait-analysis.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تحلیل راه رفتن',
    description:
      'استخراج شاخص‌هایی مانند طول قدم و تقارن حرکت از ویدیوی راه رفتن، برای پایش سالمندان یا روند توان‌بخشی.',
    tags: ['Pose Estimation', 'تحلیل حرکت', 'توان‌بخشی'],
  },
  {
    id: 'fall-detect',
    title: 'تشخیص زمین‌خوردن سالمند',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/fall-detect.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص زمین‌خوردن',
    description:
      'تشخیص زمین‌خوردن در ویدیوی محیطی و ارسال هشدار برای مراقبت از سالمندان.',
    tags: ['پردازش ویدیو', 'تشخیص رویداد', 'مراقبت'],
  },
  {
    id: 'food-calories',
    title: 'تخمین کالری از عکس غذا',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/food-calories.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تخمین کالری غذا',
    description:
      'شناسایی نوع غذا در عکس و تخمین تقریبی کالری بر اساس حجم ظاهری وعده.',
    tags: ['طبقه‌بندی تصویر', 'تخمین حجم', 'سلامت'],
  },
  {
    id: 'hand-tremor',
    title: 'اندازه‌گیری لرزش دست',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/hand-tremor.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ اندازه‌گیری لرزش دست',
    description:
      'اندازه‌گیری شدت و الگوی لرزش دست با ردیابی نقاط کلیدی دست در ویدیو.',
    tags: ['MediaPipe', 'ردیابی دست', 'تحلیل سیگنال'],
  },
  {
    id: 'sign-language',
    title: 'ترجمهٔ زبان اشاره',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/sign-language.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ ترجمهٔ زبان اشاره',
    description:
      'تبدیل حرکت دست در زبان اشاره به حرف یا واژه، برای تسهیل ارتباط.',
    tags: ['Hand Tracking', 'طبقه‌بندی ژست', 'دسترسی‌پذیری'],
  },
  {
    id: 'malaria-cells',
    title: 'تشخیص سلول مالاریا و سلول خونی',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/malaria-cells.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تحلیل اسمیر خون',
    description:
      'طبقه‌بندی تصاویر میکروسکوپی اسمیر خون برای مشخص‌کردن سلول‌های مشکوک به انگل مالاریا در بستر پژوهش.',
    tags: ['میکروسکوپی', 'طبقه‌بندی تصویر', 'پژوهش پزشکی'],
  },
  {
    id: 'med-adherence',
    title: 'پایش مصرف دارو',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/med-adherence.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ پایش مصرف دارو',
    description:
      'پایش تصویری مصرف دارو؛ بررسی این‌که دارو از بسته‌بندی برداشته و مصرف شده است یا نه.',
    tags: ['تشخیص اشیا', 'پردازش ویدیو', 'سلامت'],
  },
  {
    id: 'emotion-face',
    title: 'تشخیص احساس از چهره',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/emotion-face.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص احساس از چهره',
    description:
      'تشخیص حالت‌های چهره برای پایش استرس یا کاربردهای توان‌بخشی و ارتباطی.',
    tags: ['Facial Expression', 'طبقه‌بندی', 'بینایی ماشین'],
  },
  {
    id: 'ppe-detect',
    title: 'تشخیص ماسک و دستکش',
    category: 'health',
    orderType: 'سلامت و پزشکی',
    image: 'projects/capabilities/ppe-detect.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص ماسک و دستکش',
    description:
      'تشخیص استفاده از ماسک و دستکش در تصاویر محیط‌های درمانی یا آزمایشگاهی.',
    tags: ['تشخیص اشیا', 'YOLO', 'ایمنی محیط کار'],
  },
  {
    id: 'lane-detect',
    title: 'تشخیص خط جاده',
    category: 'tech',
    orderType: 'خودرو و حمل‌ونقل',
    image: 'projects/capabilities/lane-detect.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص خط جاده',
    description:
      'استخراج خطوط جاده از ویدیو با لبه‌یابی و تبدیل هاف، برای سامانه‌های کمک‌راننده.',
    tags: ['OpenCV', 'Hough Transform', 'خودرو'],
  },
  {
    id: 'traffic-signs',
    title: 'تشخیص تابلوهای راهنمایی',
    category: 'tech',
    orderType: 'خودرو و حمل‌ونقل',
    image: 'projects/capabilities/traffic-signs.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص تابلو راهنمایی',
    description:
      'شناسایی و طبقه‌بندی تابلوهای راهنمایی در تصاویر جاده‌ای.',
    tags: ['طبقه‌بندی تصویر', 'GTSRB', 'خودرو'],
  },
  {
    id: 'doc-scanner',
    title: 'اسکنر اسناد',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/doc-scanner.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ اسکنر اسناد',
    description:
      'یافتن گوشه‌های سند، اصلاح پرسپکتیو و بهبود کیفیت تصویر برای بایگانی دیجیتال.',
    tags: ['OpenCV', 'تصحیح پرسپکتیو', 'اسناد'],
  },
  {
    id: 'track-count',
    title: 'شمارش و ردیابی افراد و اشیا',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/track-count.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ ردیابی افراد و اشیا',
    description:
      'تشخیص، شمارش و ردیابی افراد یا اشیا در ویدیو با مدل‌های تشخیص و الگوریتم‌های ردیابی.',
    tags: ['YOLO', 'Tracking', 'پردازش ویدیو'],
  },
  {
    id: 'hand-gesture',
    title: 'تشخیص ژست دست',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/hand-gesture.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص ژست دست',
    description:
      'شناسایی ژست‌های دست برای تعامل بدون تماس با سامانه.',
    tags: ['MediaPipe', 'Hand Tracking', 'تعامل انسان و رایانه'],
  },
  {
    id: 'quality-control',
    title: 'کنترل کیفیت خط تولید',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/quality-control.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ کنترل کیفیت صنعتی',
    description:
      'بازرسی تصویری قطعات روی خط تولید برای پیدا کردن ترک، خراش یا نقص ظاهری.',
    tags: ['بازرسی صنعتی', 'تشخیص نقص', 'بینایی ماشین'],
  },
  {
    id: 'anpr-fa',
    title: 'پلاک‌خوان فارسی',
    category: 'tech',
    orderType: 'خودرو و حمل‌ونقل',
    image: 'projects/capabilities/anpr-fa.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ پلاک‌خوان فارسی',
    description:
      'تشخیص و خواندن پلاک خودروهای ایرانی از تصاویر دوربین.',
    tags: ['ANPR', 'OCR', 'پلاک ایرانی'],
  },
  {
    id: 'face-attendance',
    title: 'حضور و غیاب با تشخیص چهره',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/face-attendance.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ حضور و غیاب چهره',
    description:
      'ثبت حضور و غیاب با تشخیص چهره در محیط سازمان یا کلاس.',
    tags: ['تشخیص چهره', 'شناسایی هویت', 'سازمان'],
  },
  {
    id: 'object-measure',
    title: 'اندازه‌گیری اجسام با دوربین',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/object-measure.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ اندازه‌گیری با دوربین',
    description:
      'اندازه‌گیری طول و عرض اشیا در تصویر با کمک یک شیء مرجع، بدون تماس فیزیکی.',
    tags: ['OpenCV', 'کالیبراسیون', 'اندازه‌گیری'],
  },
  {
    id: 'hand-control',
    title: 'کنترل رایانه با حرکت دست',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/hand-control.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ کنترل رایانه با دست',
    description:
      'کنترل نشانگر یا فرمان‌های سادهٔ رایانه با حرکت و ژست دست.',
    tags: ['MediaPipe', 'ژست دست', 'تعامل'],
  },
  {
    id: 'smart-parking',
    title: 'پارکینگ هوشمند',
    category: 'tech',
    orderType: 'خودرو و حمل‌ونقل',
    image: 'projects/capabilities/smart-parking.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ پارکینگ هوشمند',
    description:
      'تشخیص جاهای خالی پارکینگ از تصویر دوربین بالا یا محیطی.',
    tags: ['تشخیص اشیا', 'پردازش تصویر', 'حمل‌ونقل'],
  },
  {
    id: 'plant-disease',
    title: 'تشخیص آفت و بیماری گیاه',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/plant-disease.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تشخیص بیماری گیاه',
    description:
      'شناسایی آفت یا بیماری گیاه از عکس برگ، برای پایش کشاورزی.',
    tags: ['طبقه‌بندی تصویر', 'کشاورزی', 'PlantVillage'],
  },
  {
    id: 'waste-sort',
    title: 'تفکیک زباله برای بازیافت',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/waste-sort.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ تفکیک زباله',
    description:
      'تفکیک تصویری مواد بازیافتی مانند پلاستیک، کاغذ و فلز.',
    tags: ['طبقه‌بندی تصویر', 'بازیافت', 'صنعت'],
  },
  {
    id: 'bg-removal',
    title: 'حذف پس‌زمینهٔ ویدیو',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/bg-removal.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ حذف پس‌زمینه',
    description:
      'حذف یا جایگزینی پس‌زمینهٔ ویدیو با بخش‌بندی معنایی، مناسب جلسه‌های آنلاین و تولید محتوا.',
    tags: ['Segmentation', 'پردازش ویدیو', 'تولید محتوا'],
  },
  {
    id: 'simple-ar',
    title: 'واقعیت افزودهٔ ساده',
    category: 'tech',
    orderType: 'سایر',
    image: 'projects/capabilities/simple-ar.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ واقعیت افزوده',
    description:
      'واقعیت افزودهٔ ساده؛ قرار دادن مدل یا تصویر روی نشانگر چاپی در تصویر دوربین.',
    tags: ['AR', 'تشخیص نشانگر', 'گرافیک'],
  },
  {
    id: 'photogrammetry',
    title: 'بازسازی سه‌بعدی از عکس',
    category: 'tech',
    orderType: 'صنعت و کنترل کیفیت',
    image: 'projects/capabilities/photogrammetry.webp',
    imageAlt: 'تصویر سه‌بعدی پروژهٔ فتوگرامتری',
    description:
      'بازسازی مدل سه‌بعدی از چند عکس با روش فتوگرامتری؛ نزدیک به مسیر اسکنر هوشمند.',
    tags: ['فتوگرامتری', 'بازسازی سه‌بعدی', 'اسکن'],
  },
];
