export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Exemple d'utilisation
// console.log(formatPrice(10000)); // Affichera "$10,000.00"
// console.log(formatPrice(1250.75, 'EUR')); // Affichera "€1,250.75"
// console.log(formatPrice(5000000, 'XOF')); // Affichera "F CFA 5,000,000.00"
