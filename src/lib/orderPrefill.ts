export const ORDER_PREFILL_EVENT = 'novaai:order-prefill';

export type OrderType = 'سلامت و پزشکی' | 'دندانپزشکی' | 'صنعت و کنترل کیفیت' | 'خودرو و حمل‌ونقل' | 'سایر';

export type OrderPrefillDetail = {
  title: string;
  type: OrderType;
};

export function requestSimilarProject(title: string, type: OrderType) {
  window.dispatchEvent(new CustomEvent<OrderPrefillDetail>(ORDER_PREFILL_EVENT, { detail: { title, type } }));
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
