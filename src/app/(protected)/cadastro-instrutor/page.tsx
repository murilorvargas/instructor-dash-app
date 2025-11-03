'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import type { InstructorFormData } from '@/services/instructor/forms/instructor-form.types'
import { instructorApi } from '@/services/instructor/instructor.api'
import type { CreateInstructorRequest } from '@/services/instructor/instructor.types'
import { personStore } from '@/stores/person.store'
import { getKeycloakLoginUrl } from '@/utils/keycloak'

import { PageView } from './PageView'

function InstructorCadastroPage() {
  const router = useRouter()
  const personKey = personStore.person?.person_key as string;
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<InstructorFormData>({
    instructor_description: '',
    driver_license_number: '',
    driver_license_issue_date: '',
    driver_license_expiration_date: '',
    driver_license_category: 'B',
    professional_certificate_number: '',
    professional_certificate_issue_date: '',
    professional_certificate_expiration_date: '',
  })

  const updateField = (field: keyof InstructorFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.instructor_description) {
        newErrors.instructor_description = 'Descrição é obrigatória'
      }
      if (!formData.driver_license_number) {
        newErrors.driver_license_number = 'Número da CNH é obrigatório'
      }
      if (!formData.driver_license_issue_date) {
        newErrors.driver_license_issue_date = 'Data de emissão da CNH é obrigatória'
      }
      if (!formData.driver_license_expiration_date) {
        newErrors.driver_license_expiration_date = 'Data de validade da CNH é obrigatória'
      }
      if (!formData.driver_license_category) {
        newErrors.driver_license_category = 'Categoria da CNH é obrigatória'
      }
    }

    if (currentStep === 2) {
      if (!formData.professional_certificate_number) {
        newErrors.professional_certificate_number = 'Número do certificado profissional é obrigatório'
      }
      if (!formData.professional_certificate_issue_date) {
        newErrors.professional_certificate_issue_date = 'Data de emissão do certificado é obrigatória'
      }
      if (!formData.professional_certificate_expiration_date) {
        newErrors.professional_certificate_expiration_date = 'Data de validade do certificado é obrigatória'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 2))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsLoading(true)
    try {
      const payload: CreateInstructorRequest = {
        instructor_description: formData.instructor_description,
        driver_license_number: formData.driver_license_number,
        driver_license_issue_date: formData.driver_license_issue_date,
        driver_license_expiration_date: formData.driver_license_expiration_date,
        driver_license_category: formData.driver_license_category,
        professional_certificate_number: formData.professional_certificate_number,
        professional_certificate_issue_date: formData.professional_certificate_issue_date,
        professional_certificate_expiration_date: formData.professional_certificate_expiration_date,
      }      
      await instructorApi.createInstructor(personKey, payload)
      toast.success('Cadastro de instrutor realizado com sucesso! Atualizando permissões...')
      
      setTimeout(() => {
        const loginUrl = getKeycloakLoginUrl()
        router.push(loginUrl)
      }, 2000)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.translation || 'Erro ao criar cadastro de instrutor. Por favor, tente novamente.'
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
      onFieldUpdate={updateField}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
    />
  )
}

export default observer(InstructorCadastroPage)

