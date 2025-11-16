import { makeAutoObservable } from 'mobx'

import type { InstructorVehicleResponse } from '@/services/vehicle/vehicle.types'

class VehicleStore {
  vehicles: InstructorVehicleResponse[] = []
  loading: boolean = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setVehicles(vehicles: InstructorVehicleResponse[]) {
    this.vehicles = vehicles
  }

  addVehicle(vehicle: InstructorVehicleResponse) {
    this.vehicles.push(vehicle)
  }

  updateVehicle(updatedVehicle: InstructorVehicleResponse) {
    const index = this.vehicles.findIndex(v => v.instructor_vehicle_key === updatedVehicle.instructor_vehicle_key)
    if (index !== -1) {
      this.vehicles[index] = updatedVehicle
    }
  }
}

export const vehicleStore = new VehicleStore()

