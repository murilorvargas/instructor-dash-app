import React from 'react'

import { Button } from '@/components/Button'
import { FormContainer } from '@/components/FormContainer'
import { Input } from '@/components/Input'
import { StepIndicator } from '@/components/StepIndicator'
import { RegistrationFormData } from '@/services/person/forms/registration-form.types'
import { formatCEP } from '@/utils/cep-handlers'
import { formatCPF } from '@/utils/cpf-handlers'

interface PageViewProps {
  currentStep: number
  formData: RegistrationFormData
  errors: Record<string, string>
  isLoading: boolean
  isSearchingCep: boolean
  onFieldUpdate: (section: 'person' | 'address' | 'phone', field: string, value: string) => void
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
}

export const PageView: React.FC<PageViewProps> = ({
  currentStep,
  formData,
  errors,
  isLoading,
  isSearchingCep,
  onFieldUpdate,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <>
      <FormContainer
        title="Cadastro de Pessoa"
        subtitle="Preencha os dados abaixo"
      >
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={3} 
          stepNames={['Dados Pessoais', 'Endereço', 'Telefone']}
        />
        
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
            {currentStep === 1 && (
              <>
                <Input
                  id="first_name"
                  label="Nome *"
                  type="text"
                  value={formData.person.first_name}
                  onChange={(e) => onFieldUpdate('person', 'first_name', e.target.value)}
                  placeholder="Seu nome"
                  error={errors['person.first_name']}
                />

                <Input
                  id="last_name"
                  label="Sobrenome *"
                  type="text"
                  value={formData.person.last_name}
                  onChange={(e) => onFieldUpdate('person', 'last_name', e.target.value)}
                  placeholder="Seu sobrenome"
                  error={errors['person.last_name']}
                />

                <Input
                  id="document_number"
                  label="CPF *"
                  type="text"
                  value={formatCPF(formData.person.document_number)}
                  onChange={(e) => onFieldUpdate('person', 'document_number', e.target.value)}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  error={errors['person.document_number']}
                />

                <Input
                  id="birth_date"
                  label="Data de Nascimento *"
                  type="date"
                  value={formData.person.birth_date}
                  onChange={(e) => onFieldUpdate('person', 'birth_date', e.target.value)}
                  error={errors['person.birth_date']}
                />

                <Input
                  id="email"
                  label="Email *"
                  type="email"
                  value={formData.person.email}
                  onChange={(e) => onFieldUpdate('person', 'email', e.target.value)}
                  placeholder="seu@email.com"
                  error={errors['person.email']}
                />

                <Input
                  id="password"
                  label="Senha *"
                  type="password"
                  value={formData.person.password}
                  onChange={(e) => onFieldUpdate('person', 'password', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  error={errors['person.password']}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <Input
                  id="postal_code"
                  label="CEP *"
                  type="text"
                  value={formatCEP(formData.address.postal_code)}
                  onChange={(e) => onFieldUpdate('address', 'postal_code', e.target.value)}
                  placeholder="00000-000"
                  maxLength={9}
                  error={errors['address.postal_code']}
                  disabled={isSearchingCep}
                  loading={isSearchingCep}
                />

                <Input
                  id="street"
                  label="Rua *"
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => onFieldUpdate('address', 'street', e.target.value)}
                  placeholder="Nome da rua"
                  error={errors['address.street']}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="number"
                    label="Número *"
                    type="text"
                    value={formData.address.number}
                    onChange={(e) => onFieldUpdate('address', 'number', e.target.value)}
                    placeholder="123"
                    error={errors['address.number']}
                  />

                  <Input
                    id="complement"
                    label="Complemento"
                    type="text"
                    value={formData.address.complement}
                    onChange={(e) => onFieldUpdate('address', 'complement', e.target.value)}
                    placeholder="Apto, Bloco, etc"
                  />
                </div>

                <Input
                  id="neighborhood"
                  label="Bairro *"
                  type="text"
                  value={formData.address.neighborhood}
                  onChange={(e) => onFieldUpdate('address', 'neighborhood', e.target.value)}
                  placeholder="Nome do bairro"
                  error={errors['address.neighborhood']}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="city"
                    label="Cidade *"
                    type="text"
                    value={formData.address.city}
                    placeholder="Nome da cidade"
                    disabled
                    readOnly
                  />

                  <Input
                    id="state"
                    label="Estado *"
                    type="text"
                    value={formData.address.state}
                    placeholder="UF"
                    disabled
                    readOnly
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <Input
                  id="country_code"
                  label="Código do País *"
                  type="text"
                  value={formData.phone.country_code}
                  onChange={(e) => onFieldUpdate('phone', 'country_code', e.target.value)}
                  placeholder="55"
                  maxLength={2}
                />

                <Input
                  id="area_code"
                  label="DDD *"
                  type="text"
                  value={formData.phone.area_code}
                  onChange={(e) => onFieldUpdate('phone', 'area_code', e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="11"
                  maxLength={2}
                  error={errors['phone.area_code']}
                />

                <Input
                  id="phone_number"
                  label="Número *"
                  type="text"
                  value={formData.phone.number}
                  onChange={(e) => onFieldUpdate('phone', 'number', e.target.value.replace(/\D/g, '').slice(0, 9))}
                  placeholder="987654321"
                  maxLength={9}
                  error={errors['phone.number']}
                />
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
              {currentStep < 3 ? (
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

