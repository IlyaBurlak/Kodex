export const cleanMerriamWebsterText = (text: string): string => {
  let cleaned = text
    .replace(/\{sx\|([^}|]+)\|\|[^}]*\}/g, '$1')
    .replace(/\{bc\}/g, '')
    .replace(/\{it\}/g, '')
    .replace(/\{\/it\}/g, '')
    .replace(/\{b\}/g, '')
    .replace(/\{\/b\}/g, '')
    .replace(/\{sup\}/g, '')
    .replace(/\{inf\}/g, '')
    .replace(/\{ldquo\}/g, '"')
    .replace(/\{rdquo\}/g, '"')
    .replace(/\{\.\.\.\}/g, '…')
    .replace(/\{[^}]*\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
};
