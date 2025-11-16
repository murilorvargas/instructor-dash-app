export interface PersonFormData {
  first_name: string
  last_name: string
  document_number: string
  birth_date: string
  email: string
  password: string
}

export interface AddressFormData {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  postal_code: string
  ibge_code: string
}

export interface PhoneFormData {
  country_code: string
  area_code: string
  number: string
}

export interface RegistrationFormData {
  person: PersonFormData
  address: AddressFormData
  phone: PhoneFormData
}

