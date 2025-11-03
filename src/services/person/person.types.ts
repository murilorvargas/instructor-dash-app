export interface CreatePersonAddressRequest {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  postal_code: string
}

export interface CreatePersonPhoneRequest {
  country_code: string
  area_code: string
  number: string
}

export interface CreatePersonRequest {
  first_name: string
  last_name: string
  document_number: string
  birth_date: string
  email: string
  password: string
  address: CreatePersonAddressRequest
  phone: CreatePersonPhoneRequest
}

export interface PersonAddressResponse {
  person_address_key: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  postal_code: string
}

export interface PersonPhoneResponse {
  person_phone_key: string
  country_code: string
  area_code: string
  number: string
}

export interface PersonResponse {
  person_key: string
  first_name: string
  last_name: string
  document_number: string
  birth_date: string
  email: string
  address: PersonAddressResponse
  phone: PersonPhoneResponse
}

