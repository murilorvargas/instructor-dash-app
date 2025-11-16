import { makeAutoObservable } from 'mobx'

import type { InstructorVehicleResponse } from '@/services/vehicle/vehicle.types'

class VehicleStore {
  vehicles: InstructorVehicleResponse[] = []

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
    const index = this.vehicles.findIndex(v => v.vehicle_key === updatedVehicle.vehicle_key)
    if (index !== -1) {
      this.vehicles[index] = updatedVehicle
    }
  }
}

export const vehicleStore = new VehicleStore()
