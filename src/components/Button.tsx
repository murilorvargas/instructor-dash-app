import Link from 'next/link'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  loading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'text-[#023436] hover:bg-gray-100 hover:text-primary',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`
  const spinner = (
    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {loading && <span className="absolute inset-0 flex items-center justify-center">{spinner}</span>}
        <span className={`inline-flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>{children}</span>
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {loading && <span className="absolute inset-0 flex items-center justify-center">{spinner}</span>}
      <span className={`inline-flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>{children}</span>
    </button>
  )
}