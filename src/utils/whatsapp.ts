export function getWhatsAppUrl(
  phoneNumber: string,
  productName: string,
  quantity?: number,
  customMessage?: string
): string {
  // Clean phone number to digits only
  let cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0') && cleanNumber.length === 11) {
    cleanNumber = '234' + cleanNumber.slice(1);
  }

  let text = customMessage;
  if (!text) {
    if (quantity && quantity > 1) {
      text = `Hello, I'm interested in the ${productName}. I would like to order ${quantity} unit(s).`;
    } else {
      text = `Hello, I'm interested in the ${productName}. I would like to place an order.`;
    }
  }

  const encodedText = encodeURIComponent(text || '');
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
