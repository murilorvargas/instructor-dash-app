import React from 'react'

import { Button } from '@/components/Button'
import { FormContainer } from '@/components/FormContainer'
import { Input } from '@/components/Input'
import { StepIndicator } from '@/components/StepIndicator'
import type { InstructorFormData } from '@/services/instructor/forms/instructor-form.types'

interface PageViewProps {
  currentStep: number
  formData: InstructorFormData
  errors: Record<string, string>
  isLoading: boolean
  onFieldUpdate: (field: keyof InstructorFormData, value: string) => void
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
}

export const PageView: React.FC<PageViewProps> = ({
  currentStep,
  formData,
  errors,
  isLoading,
  onFieldUpdate,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <>
      <FormContainer
        title="Cadastro de Instrutor"
        subtitle="Complete seu cadastro como instrutor"
      >
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={2} 
          stepNames={['CNH', 'Certificado Profissional']}
        />
        
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
          {currentStep === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição do Instrutor *
                </label>
                <textarea
                  id="instructor_description"
                  value={formData.instructor_description}
                  onChange={(e) => onFieldUpdate('instructor_description', e.target.value)}
                  placeholder="Descreva sua experiência como instrutor..."
                  rows={4}
                  className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.instructor_description && (
                  <p className="mt-1 text-sm text-destructive">{errors.instructor_description}</p>
                )}
              </div>

              <Input
                id="driver_license_number"
                label="Número da CNH *"
                type="text"
                value={formData.driver_license_number}
                onChange={(e) => onFieldUpdate('driver_license_number', e.target.value.replace(/\D/g, ''))}
                placeholder="00000000000"
                maxLength={11}
                error={errors.driver_license_number}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="driver_license_issue_date"
                  label="Data de Emissão da CNH *"
                  type="date"
                  value={formData.driver_license_issue_date}
                  onChange={(e) => onFieldUpdate('driver_license_issue_date', e.target.value)}
                  error={errors.driver_license_issue_date}
                />

                <Input
                  id="driver_license_expiration_date"
                  label="Data de Validade da CNH *"
                  type="date"
                  value={formData.driver_license_expiration_date}
                  onChange={(e) => onFieldUpdate('driver_license_expiration_date', e.target.value)}
                  error={errors.driver_license_expiration_date}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria da CNH *
                </label>
                <select
                  id="driver_license_category"
                  value={formData.driver_license_category}
                  onChange={(e) => onFieldUpdate('driver_license_category', e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="AB">AB</option>
                  <option value="AC">AC</option>
                  <option value="AD">AD</option>
                  <option value="AE">AE</option>
                  <option value="CD">CD</option>
                  <option value="DE">DE</option>
                  <option value="ACD">ACD</option>
                  <option value="ADE">ADE</option>
                </select>
                {errors.driver_license_category && (
                  <p className="mt-1 text-sm text-destructive">{errors.driver_license_category}</p>
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Input
                id="professional_certificate_number"
                label="Número do Certificado Profissional *"
                type="text"
                value={formData.professional_certificate_number}
                onChange={(e) => onFieldUpdate('professional_certificate_number', e.target.value)}
                placeholder="Número do certificado"
                error={errors.professional_certificate_number}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="professional_certificate_issue_date"
                  label="Data de Emissão do Certificado *"
                  type="date"
                  value={formData.professional_certificate_issue_date}
                  onChange={(e) => onFieldUpdate('professional_certificate_issue_date', e.target.value)}
                  error={errors.professional_certificate_issue_date}
                />

                <Input
                  id="professional_certificate_expiration_date"
                  label="Data de Validade do Certificado *"
                  type="date"
                  value={formData.professional_certificate_expiration_date}
                  onChange={(e) => onFieldUpdate('professional_certificate_expiration_date', e.target.value)}
                  error={errors.professional_certificate_expiration_date}
                />
              </div>
            </>
          )}

          <div className="flex gap-4 mt-8 justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={onPrevious}
                variant="outline"
              >
                ← Voltar
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 2 ? (
              <Button
                type="button"
                onClick={onNext}
                variant="primary"
              >
                Continuar →
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading}
                variant="primary"
                loading={isLoading}
              >
                Finalizar
              </Button>
            )}
          </div>
        </form>
      </FormContainer>
    </>
  )
}

