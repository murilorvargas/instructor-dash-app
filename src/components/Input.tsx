import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  loading?: boolean
}

export const Input: React.FC<InputProps> = ({ label, error, loading = false, className = '', ...props }) => {
  const spinner = (
    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
  )

  const isReadOnly = props.readOnly || props.disabled

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={props.id} className="font-semibold text-foreground text-base">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 bg-card text-card-foreground border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 ${loading ? 'pr-10' : ''} ${isReadOnly ? 'bg-muted/50 cursor-not-allowed opacity-70' : ''} ${className}`}
          {...props}
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {spinner}
          </div>
        )}
      </div>
      {error && (
        <span className="text-destructive text-sm">{error}</span>
      )}
    </div>
  )
}

export const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-foreground text-base">
      {children}
    </label>
  )
}