import React from 'react'

interface InfoCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = '' }) => (
  <div className={`bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden ${className}`}>
    <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 break-words">
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

