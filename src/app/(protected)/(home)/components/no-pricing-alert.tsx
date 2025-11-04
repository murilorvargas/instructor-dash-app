'use client'

import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { pricingStore } from '@/stores/pricing.store'

export const NoPricingAlert: React.FC = observer(() => {
  const activePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const hasPricings = activePricings.length > 0

  if (hasPricings) {
    return null
  }

  return (
    <Alert variant="info" className="mb-4 sm:mb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-medium mb-1 break-words">
            Configure seus preços para aparecer nas buscas
          </p>
          <p className="text-xs sm:text-sm break-words">
            Para que os alunos possam encontrar e agendar aulas com você, é necessário criar pelo menos uma configuração de preço para alguma categoria de CNH.
          </p>
        </div>
      </div>
    </Alert>
  )
})

