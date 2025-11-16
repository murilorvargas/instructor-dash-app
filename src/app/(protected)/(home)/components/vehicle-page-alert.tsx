'use client'

import { ExclamationTriangleIcon, TruckIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { instructorStore } from '@/stores/instructor.store'
import { vehicleStore } from '@/stores/vehicle.store'

export const VehiclePageAlert: React.FC = observer(() => {
  const instructor = instructorStore.instructor!
  const activeVehicles = vehicleStore.vehicles.filter(v => v.instructor_vehicle_status === 'active')
  const isApproved = instructor.instructor_status === 'active'
  const isRejected = instructor.instructor_status === 'rejected'
  const isPending = instructor.instructor_status === 'pending_approval'
  const hasVehicles = activeVehicles.length > 0

  return (
    <div className="mb-6">
      {isRejected && (
        <Alert variant="error">
          <div className="flex items-start gap-3">
            <XCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium mb-1">
                Seu perfil foi rejeitado
              </p>
              <p className="text-xs sm:text-sm">
                Seu perfil não pode ser visualizado por alunos e você não pode cadastrar veículos. Entre em contato com o suporte através do email <strong>suporte@habilitaai.app</strong> para mais informações.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {isPending && (
        <Alert variant="warning">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium mb-1">
                Seu perfil precisa estar aprovado para cadastrar veículos
              </p>
              <p className="text-xs sm:text-sm">
                Aguarde a aprovação do time do Habilita Aí. Após a aprovação, você poderá cadastrar seus veículos.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {isApproved && !hasVehicles && (
        <Alert variant="info">
          <div className="flex items-start gap-3">
            <TruckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-medium mb-1">
                Cadastre seus veículos
              </p>
              <p className="text-xs sm:text-sm">
                Adicione os veículos que você utiliza para dar aulas. Isso ajuda os alunos a conhecerem melhor seus recursos.
              </p>
            </div>
          </div>
        </Alert>
      )}
    </div>
  )
})

