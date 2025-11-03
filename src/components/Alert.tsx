import React from 'react'

interface AlertProps {
  variant?: 'warning' | 'error' | 'success' | 'info'
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'warning',
  children,
  className = '',
}) => {
  return (
    <div
      className={`border rounded-xl p-4 sm:p-6 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

