export interface CreateInstructorPricingRequest {
  driver_license_category: 'A' | 'B' | 'C' | 'D' | 'E'
  lesson_type: string
  price_per_hour_instructor_vehicle: number
  price_per_hour_student_vehicle: number
}

export interface InstructorPricingResponse {
  instructor_pricing_key: string
  driver_license_category: string
  lesson_type: string
  price_per_hour_instructor_vehicle: number
  price_per_hour_student_vehicle: number
  instructor_pricing_status: string
  created_at: string
  updated_at: string
}

