export const formatCEP = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
  return value
}

