'use client'

import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import { instructorStore } from '@/stores/instructor.store'
import { Alert } from '@/components/Alert'

export const PendingApprovalAlert: React.FC = observer(() => {
  const instructor = instructorStore.instructor!

  if (instructor.instructor_status !== 'pending_approval') {
    return null
  }

  return (
    <Alert variant="warning" className="mb-4 sm:mb-6">
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
  )
})

