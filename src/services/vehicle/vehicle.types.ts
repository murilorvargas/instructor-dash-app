export interface CreateInstructorVehicleRequest {
  vehicle_license_plate: string
  vehicle_manufacturer_year: number
  vehicle_name: string
  vehicle_description: string
  vehicle_type: 'motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer'
}

export interface UpdateVehicleStatusRequest {
  vehicle_status: 'active' | 'inactive' | 'deleted'
}

export interface UpdateVehicleInfoRequest {
  vehicle_name: string
  vehicle_description: string
}

export interface InstructorVehicleResponse {
  vehicle_key: string
  vehicle_license_plate: string
  vehicle_manufacturer_year: number
  vehicle_name: string
  vehicle_description: string
  vehicle_type: string
  vehicle_status: string
  created_at: string
  updated_at: string
}

