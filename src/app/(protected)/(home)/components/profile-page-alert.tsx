'use client'

import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { instructorStore } from '@/stores/instructor.store'
import { pricingStore } from '@/stores/pricing.store'

export const ProfilePagelAlert: React.FC = observer(() => {
  const instructor = instructorStore.instructor!
  const activePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const hasPricings = activePricings.length > 0
  const isPending = instructor.instructor_status === 'pending_approval'
  const isActive = instructor.instructor_status === 'active'

  return (
    <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
      {isPending && (
        <Alert variant="warning">
          <div className="flex items-start gap-3 sm:gap-4">
            <ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium mb-1 break-words">
                Seu perfil está pendente de aprovação
              </p>
              <p className="text-xs sm:text-sm break-words">
                Seu perfil não pode ser visualizado por alunos até que o time do Habilita Aí realize a aprovação.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {isActive && !hasPricings && (
        <Alert variant="info">
          <div className="flex items-start gap-3 sm:gap-4">
            <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium mb-1 break-words">
                Configure seus preços para aparecer nas buscas
              </p>
              <p className="text-xs sm:text-sm break-words">
                Seu perfil está aprovado, mas só ficará visível para alunos após você configurar pelo menos um preço de aula. Acesse a página de <strong>Configuração de Preços</strong> para começar.
              </p>
            </div>
          </div>
        </Alert>
      )}
    </div>
  )
})

