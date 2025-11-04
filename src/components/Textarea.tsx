import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={props.id} className="font-semibold text-foreground text-base">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-card text-card-foreground border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 resize-none min-h-[120px] ${className}`}
        {...props}
      />
      {error && <span className="text-destructive text-sm">{error}</span>}
    </div>
  )
}

