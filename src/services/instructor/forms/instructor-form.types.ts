export interface InstructorFormData {
  instructor_description: string
  driver_license_number: string
  driver_license_issue_date: string
  driver_license_expiration_date: string
  driver_license_category: 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'AD' | 'AE' | 'CD' | 'DE' | 'ACD' | 'ADE'
  professional_certificate_number: string
  professional_certificate_issue_date: string
  professional_certificate_expiration_date: string
}

