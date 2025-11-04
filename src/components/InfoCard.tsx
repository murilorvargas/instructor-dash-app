import React from 'react'

interface InfoCardProps {
  title: string
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = '', headerAction }) => (
  <div className={`bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden ${className}`}>
    <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
      <h3 className="text-base sm:text-lg font-bold text-foreground break-words">
        {title}
      </h3>
      {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

