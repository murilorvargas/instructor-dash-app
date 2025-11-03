'use client'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { InfoCard } from '@/components/InfoCard'
import { InfoRow } from '@/components/InfoRow'
import { instructorStore } from '@/stores/instructor.store'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const DriverLicenseCard: React.FC = observer(() => {
  const instructor = instructorStore.instructor!

  return (
    <InfoCard title="CNH - Carteira Nacional de Habilitação">
      <InfoRow label="Número" value={instructor.driver_license_number} />
      <InfoRow label="Categoria" value={
        <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg font-semibold text-sm">
          {instructor.driver_license_category}
        </span>
      } />
      <InfoRow label="Data de Emissão" value={formatDate(instructor.driver_license_issue_date)} />
      <InfoRow label="Data de Validade" value={formatDate(instructor.driver_license_expiration_date)} />
      <div className="mt-3">
        {new Date(instructor.driver_license_expiration_date) > new Date() ? (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary">
            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>CNH Válida</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-destructive">
            <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>CNH Expirada</span>
          </div>
        )}
      </div>
    </InfoCard>
  )
})

