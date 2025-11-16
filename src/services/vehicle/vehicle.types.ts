export interface CreateInstructorVehicleRequest {
  vehicle_license_plate: string
  vehicle_manufacturer_year: number
  vehicle_name: string
  vehicle_description: string
  instructor_vehicle_type: 'motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer'
}

export interface UpdateVehicleStatusRequest {
  instructor_vehicle_status: 'active' | 'inactive' | 'deleted'
}

export interface UpdateVehicleInfoRequest {
  vehicle_name: string
  vehicle_description: string
}

export interface InstructorVehicleResponse {
  instructor_vehicle_key: string
  vehicle_license_plate: string
  vehicle_manufacturer_year: number
  vehicle_name: string
  vehicle_description: string
  instructor_vehicle_type: string
  instructor_vehicle_status: string
  created_at: string
  updated_at: string
}

