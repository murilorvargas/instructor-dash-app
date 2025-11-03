export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  
  if (/^(\d)\1+$/.test(cleaned)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleaned.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cleaned.charAt(10))) return false
  
  return true
}

export const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return value
}

