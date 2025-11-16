'use client'

import type { InstructorVehicleResponse } from '@/services/vehicle/vehicle.types'
import { vehicleStore } from '@/stores/vehicle.store'

interface VehicleStoreInitializerProps {
  children: React.ReactNode
  initialVehicles: InstructorVehicleResponse[]
}

export function VehicleStoreInitializer({ children, initialVehicles }: VehicleStoreInitializerProps) {
  vehicleStore.setVehicles(initialVehicles)

  return <>{children}</>
}

