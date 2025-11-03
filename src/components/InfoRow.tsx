import React from 'react'

interface InfoRowProps {
  label: string
  value: string | React.ReactNode
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border/50 last:border-0 w-full">
    <span className="text-sm font-medium text-muted-foreground sm:min-w-[120px] flex-shrink-0">{label}:</span>
    <span className="text-sm sm:text-base text-foreground font-medium break-words min-w-0 flex-1">{value || '-'}</span>
  </div>
)

