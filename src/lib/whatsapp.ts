export const FALLBACK_NUMBER = "529623257800";
export function generateWhatsAppUrl(message: string, number: string = FALLBACK_NUMBER) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
