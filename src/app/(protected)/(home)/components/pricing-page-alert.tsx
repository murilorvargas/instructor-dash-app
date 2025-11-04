'use client'

import { CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { instructorStore } from '@/stores/instructor.store'
import { pricingStore } from '@/stores/pricing.store'

export const PricingPageAlert: React.FC = observer(() => {
  const instructor = instructorStore.instructor!
  const activePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const isApproved = instructor.instructor_status === 'active'
  const hasPricings = activePricings.length > 0

  if (isApproved && hasPricings) {
    return null
  }

  return (
    <div className="mb-6">
      {!isApproved && (
        <Alert variant="warning">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium mb-1">
                Seu perfil precisa estar aprovado para configurar preços
              </p>
              <p className="text-xs sm:text-sm">
                Aguarde a aprovação do time do Habilita Aí. Após a aprovação, você poderá configurar seus preços. <strong>Seu perfil só ficará visível para os alunos após você configurar pelo menos um preço de aula.</strong>
              </p>
            </div>
          </div>
        </Alert>
      )}

      {isApproved && !hasPricings && (
        <Alert variant="info">
          <div className="flex items-start gap-3">
            <CurrencyDollarIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-medium mb-1">
                Configure seus preços para aparecer nas buscas
              </p>
              <p className="text-xs sm:text-sm">
                <strong>Seu perfil só ficará visível para os alunos após você configurar pelo menos um preço de aula.</strong> Crie pelo menos um preço por categoria de CNH para começar a aparecer nas buscas.
              </p>
            </div>
          </div>
        </Alert>
      )}
    </div>
  )
})

