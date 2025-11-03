'use client'

import React from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import { instructorStore } from '@/stores/instructor.store'
import { InfoCard } from '@/components/InfoCard'
import { InfoRow } from '@/components/InfoRow'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const ProfessionalCertificateCard: React.FC = observer(() => {
  const instructor = instructorStore.instructor!

  return (
    <InfoCard title="Certificado Profissional">
      <InfoRow label="Número" value={instructor.professional_certificate_number} />
      <InfoRow label="Data de Emissão" value={formatDate(instructor.professional_certificate_issue_date)} />
      <InfoRow label="Data de Validade" value={formatDate(instructor.professional_certificate_expiration_date)} />
      <div className="mt-3">
        {new Date(instructor.professional_certificate_expiration_date) > new Date() ? (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary">
            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Certificado Válido</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-destructive">
            <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Certificado Expirado</span>
          </div>
        )}
      </div>
    </InfoCard>
  )
})

