export interface CreateInstructorRequest {
  instructor_description: string
  driver_license_number: string
  driver_license_issue_date: string
  driver_license_expiration_date: string
  driver_license_category: 'A' | 'B' | 'C' | 'D' | 'E'
  professional_certificate_number: string
  professional_certificate_issue_date: string
  professional_certificate_expiration_date: string
}

export interface InstructorResponse {
  instructor_key: string
  instructor_profile_photo_url: string
  instructor_description: string
  driver_license_number: string
  driver_license_issue_date: string
  driver_license_expiration_date: string
  driver_license_category: string
  professional_certificate_number: string
  professional_certificate_issue_date: string
  professional_certificate_expiration_date: string
  instructor_status: string
}

