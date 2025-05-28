export function getCardType(number) {
  const cleaned = number.replace(/\D/g, '');

  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';
  return 'default';
}
export function getCardLogo(type) {
  switch (type) {
    case 'visa':
      return 'https://img.icons8.com/color/48/visa.png';
    case 'mastercard':
      return 'https://img.icons8.com/color/48/mastercard-logo.png';
    case 'amex':
      return 'https://img.icons8.com/color/48/amex.png';
    case 'discover':
      return 'https://img.icons8.com/color/48/discover.png';
    default:
      return 'https://img.icons8.com/color/48/bank-card-back-side.png';
  }
}