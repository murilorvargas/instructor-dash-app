import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
}

export const Select: React.FC<SelectProps> = ({ label, error, className = '', options, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={props.id} className="font-semibold text-foreground text-base">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full pl-4 pr-4 py-3 bg-card text-card-foreground border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none ${error ? 'border-destructive' : ''} ${className}`}
          {...props}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
          aria-hidden="true"
        />
      </div>
      {error && (
        <span className="text-destructive text-sm">{error}</span>
      )}
    </div>
  )
}

