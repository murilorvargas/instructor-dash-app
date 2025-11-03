import React from 'react'

interface FormContainerProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className={`bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl shadow-primary/20 relative z-10 transition-colors duration-200 ${className}`}>
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-foreground mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
