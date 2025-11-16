'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import type { RegistrationFormData } from '@/services/person/forms/registration-form.types'
import { personApi } from '@/services/person/person.api'
import { cepApi } from '@/services/cep/cep.api'
import { validateCPF } from '@/utils/cpf-handlers'
import { validateEmail } from '@/utils/email-handlers'
import { getKeycloakLoginUrl } from '@/utils/keycloak'

import { PageView } from './PageView'

export default function CadastroPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchingCep, setIsSearchingCep] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const lastSearchedCepRef = useRef<string>('')
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    person: {
      first_name: '',
      last_name: '',
      document_number: '',
      birth_date: '',
      email: '',
      password: '',
    },
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      postal_code: '',
      ibge_code: '',
    },
    phone: {
      country_code: '55',
      area_code: '',
      number: '',
    },
  })

  const updateField = (section: 'person' | 'address' | 'phone', field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    
    const errorKey = `${section}.${field}`
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.person.first_name) newErrors['person.first_name'] = 'Nome é obrigatório'
      if (!formData.person.last_name) newErrors['person.last_name'] = 'Sobrenome é obrigatório'
      if (!formData.person.document_number) {
        newErrors['person.document_number'] = 'CPF é obrigatório'
      } else if (!validateCPF(formData.person.document_number.replace(/\D/g, ''))) {
        newErrors['person.document_number'] = 'CPF inválido'
      }
      if (!formData.person.birth_date) newErrors['person.birth_date'] = 'Data de nascimento é obrigatória'
      if (!formData.person.email) {
        newErrors['person.email'] = 'Email é obrigatório'
      } else if (!validateEmail(formData.person.email)) {
        newErrors['person.email'] = 'Email inválido'
      }
      if (!formData.person.password) {
        newErrors['person.password'] = 'Senha é obrigatória'
      } else if (formData.person.password.length < 6) {
        newErrors['person.password'] = 'Senha deve ter no mínimo 6 caracteres'
      }
    }

    if (currentStep === 2) {
      if (!formData.address.postal_code) {
        newErrors['address.postal_code'] = 'CEP é obrigatório'
      } else if (formData.address.postal_code.replace(/\D/g, '').length !== 8) {
        newErrors['address.postal_code'] = 'CEP inválido'
      }
      if (!formData.address.street) newErrors['address.street'] = 'Rua é obrigatória'
      if (!formData.address.number) newErrors['address.number'] = 'Número é obrigatório'
      if (!formData.address.neighborhood) newErrors['address.neighborhood'] = 'Bairro é obrigatório'
      if (!formData.address.ibge_code) {
        newErrors['address.ibge_code'] = 'CEP inválido ou não encontrado. Verifique o CEP digitado.'
      }
    }

    if (currentStep === 3) {
      if (!formData.phone.area_code) {
        newErrors['phone.area_code'] = 'DDD é obrigatório'
      } else if (formData.phone.area_code.length !== 2) {
        newErrors['phone.area_code'] = 'DDD deve ter 2 dígitos'
      }
      if (!formData.phone.number) {
        newErrors['phone.number'] = 'Número é obrigatório'
      } else if (formData.phone.number.replace(/\D/g, '').length !== 9) {
        newErrors['phone.number'] = 'Número deve ter 9 dígitos'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSearchCep = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, '')
    if (cleanedCep.length !== 8) {
      return
    }

    if (lastSearchedCepRef.current === cleanedCep || isSearchingCep) {
      return
    }

    setIsSearchingCep(true)
    try {
      const cepData = await cepApi.searchCep(cleanedCep)

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          street: cepData.logradouro || '',
          neighborhood: cepData.bairro || '',
          city: cepData.localidade || '',
          state: cepData.uf || '',
          ibge_code: cepData.ibge || '',
        },
      }))

      lastSearchedCepRef.current = cleanedCep
      toast.success('Endereço preenchido automaticamente!')
    } catch (error: any) {
      const errorMessage = error?.message || 'Erro ao buscar CEP. Tente novamente.'
      toast.error(errorMessage)
    } finally {
      setIsSearchingCep(false)
    }
  }

  useEffect(() => {
    if (currentStep === 2) {
      const cleanedCep = formData.address.postal_code.replace(/\D/g, '')
      if (cleanedCep.length === 8 && lastSearchedCepRef.current !== cleanedCep && !isSearchingCep) {
        handleSearchCep(formData.address.postal_code)
      } else if (cleanedCep.length < 8) {
        lastSearchedCepRef.current = ''
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.address.postal_code, currentStep])

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsLoading(true)
    try {
      const payload = {
        first_name: formData.person.first_name,
        last_name: formData.person.last_name,
        document_number: formData.person.document_number.replace(/\D/g, ''),
        birth_date: formData.person.birth_date,
        email: formData.person.email,
        password: formData.person.password,
        address: {
          street: formData.address.street,
          number: formData.address.number,
          ...(formData.address.complement && { complement: formData.address.complement }),
          neighborhood: formData.address.neighborhood,
          ibge_code: formData.address.ibge_code,
          postal_code: formData.address.postal_code.replace(/\D/g, ''),
        },
        phone: formData.phone,
      }
      await personApi.createPerson(payload)
      toast.success('Cadastro realizado com sucesso! Redirecionando para o login...')
      
      setTimeout(() => {
        const loginUrl = getKeycloakLoginUrl()
        router.push(loginUrl)
      }, 2000)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.translation || 'Erro ao criar cadastro. Por favor, tente novamente.'
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <PageView
      currentStep={currentStep}
      formData={formData}
      errors={errors}
      isLoading={isLoading}
      isSearchingCep={isSearchingCep}
      onFieldUpdate={updateField}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
    />
  )
}
