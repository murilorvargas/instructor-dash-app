'use client'

import { CheckIcon, CurrencyDollarIcon, PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { InfoCard } from '@/components/InfoCard'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { instructorStore } from '@/stores/instructor.store'
import { pricingStore } from '@/stores/pricing.store'

import { PricingPageAlert } from '../components/pricing-page-alert'

const categories = [
  { value: 'A', label: 'Categoria A - Motocicleta' },
  { value: 'B', label: 'Categoria B - Carro' },
  { value: 'C', label: 'Categoria C - Caminhão' },
  { value: 'D', label: 'Categoria D - Ônibus' },
  { value: 'E', label: 'Categoria E - Carreta' },
]

const categoryLabels: Record<string, string> = {
  A: 'Categoria A - Motocicleta',
  B: 'Categoria B - Carro',
  C: 'Categoria C - Caminhão',
  D: 'Categoria D - Ônibus',
  E: 'Categoria E - Carreta',
}

interface PricingPageViewProps {
  createDialogOpen: boolean
  onCreateDialogOpen: () => void
  onCreateDialogClose: () => void
  category: ('A' | 'B' | 'C' | 'D' | 'E') | ''
  onCategoryChange: (value: ('A' | 'B' | 'C' | 'D' | 'E') | '') => void
  priceInstructorVehicle: string
  onPriceInstructorVehicleChange: (value: string) => void
  priceStudentVehicle: string
  onPriceStudentVehicleChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  errors: Record<string, string>
  editPricesDialogOpen: boolean
  onEditPricesOpen: (pricingKey: string, currentPriceInstructor: number, currentPriceStudent: number) => void
  onEditPricesClose: () => void
  editPriceInstructorVehicle: string
  onEditPriceInstructorVehicleChange: (value: string) => void
  editPriceStudentVehicle: string
  onEditPriceStudentVehicleChange: (value: string) => void
  onEditPricesSubmit: (e: React.FormEvent) => void
  editPricesLoading: boolean
  editPricesErrors: Record<string, string>
  onEditStatusSubmit: (pricingKey: string, newStatus: 'active' | 'inactive') => void
  editStatusLoading: boolean
}

export const PricingPageView: React.FC<PricingPageViewProps> = observer(({
  createDialogOpen,
  onCreateDialogOpen,
  onCreateDialogClose,
  category,
  onCategoryChange,
  priceInstructorVehicle,
  onPriceInstructorVehicleChange,
  priceStudentVehicle,
  onPriceStudentVehicleChange,
  onSubmit,
  loading,
  errors,
  editPricesDialogOpen,
  onEditPricesOpen,
  onEditPricesClose,
  editPriceInstructorVehicle,
  onEditPriceInstructorVehicleChange,
  editPriceStudentVehicle,
  onEditPriceStudentVehicleChange,
  onEditPricesSubmit,
  editPricesLoading,
  editPricesErrors,
  onEditStatusSubmit,
  editStatusLoading,
}) => {
  const instructor = instructorStore.instructor!
  const activePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const inactivePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'inactive')
  const allPricings = pricingStore.pricings
  const availableCategories = categories.filter(cat => !pricingStore.hasPricingForCategory(cat.value as 'A' | 'B' | 'C' | 'D' | 'E'))
  const isPending = instructor.instructor_status === 'pending_approval'
  const isActive = instructor.instructor_status === 'active'
  const isRejected = instructor.instructor_status === 'rejected'

  const renderPricingCard = (pricing: typeof pricingStore.pricings[0]) => {
    const isPricingActive = pricing.instructor_pricing_status === 'active'
    
    return (
      <div
        key={pricing.instructor_pricing_key}
        className="bg-muted/50 rounded-lg p-4 sm:p-5 border border-border"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground text-base sm:text-lg">
            {categoryLabels[pricing.driver_license_category] || pricing.driver_license_category}
          </h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              isPricingActive 
                ? 'bg-primary/10 text-primary' 
                : 'bg-muted-foreground/10 text-muted-foreground'
            }`}>
              {isPricingActive ? 'Ativo' : 'Inativo'}
            </span>
            {isPricingActive ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditPricesOpen(
                    pricing.instructor_pricing_key,
                    pricing.price_per_hour_instructor_vehicle,
                    pricing.price_per_hour_student_vehicle
                  )}
                  disabled={!isActive}
                >
                  <PencilIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Editar Preços</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onEditStatusSubmit(pricing.instructor_pricing_key, 'inactive')
                  }}
                  disabled={!isActive || editStatusLoading}
                  loading={editStatusLoading}
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Desativar</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onEditStatusSubmit(pricing.instructor_pricing_key, 'active')
                }}
                disabled={!isActive || editStatusLoading}
                loading={editStatusLoading}
              >
                <CheckIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Ativar</span>
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">
              Com seu veículo
            </p>
            <p className="font-bold text-foreground text-lg sm:text-xl">
              R$ {pricing.price_per_hour_instructor_vehicle.toFixed(2)}/h
            </p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">
              Com veículo do aluno
            </p>
            <p className="font-bold text-foreground text-lg sm:text-xl">
              R$ {pricing.price_per_hour_student_vehicle.toFixed(2)}/h
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 px-3 sm:py-6 sm:px-4 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 break-words">
            Configuração de Preços
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Defina os valores das suas aulas por categoria de CNH
          </p>
        </div>

        <PricingPageAlert/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard
            title="Configurações de Preços das Aulas"
            className="lg:col-span-2"
            headerAction={
              <Button
                onClick={onCreateDialogOpen}
                disabled={!isActive || availableCategories.length === 0}
                size="sm"
                className="text-xs sm:text-sm shrink-0"
              >
                <PlusIcon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Adicionar Configuração de Preço</span>
                <span className="sm:hidden">Adicionar</span>
              </Button>
            }
          >
            {allPricings.length === 0 ? (
              <div className={`text-center py-12 ${!isActive ? 'opacity-50' : ''}`}>
                <CurrencyDollarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2 font-medium">
                  Nenhuma configuração de preço configurada
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPending
                    ? 'Aguarde a aprovação do seu perfil para configurar preços'
                    : isRejected
                    ? 'Seu perfil foi rejeitado. Entre em contato com suporte@habilitaai.app para mais informações'
                    : 'Clique em "Adicionar Configuração de Preço" para começar'}
                </p>
              </div>
            ) : (
              <div className={`space-y-6 ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
                {activePricings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Ativos</h3>
                    <div className="space-y-4">
                      {activePricings.map(pricing => renderPricingCard(pricing))}
                    </div>
                  </div>
                )}
                {inactivePricings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Inativos</h3>
                    <div className="space-y-4">
                      {inactivePricings.map(pricing => renderPricingCard(pricing))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </InfoCard>
        </div>

        <Dialog open={createDialogOpen} onClose={onCreateDialogClose} title="Criar Configuração de Preço" size="lg">
          {isRejected && (
            <Alert variant="error" className="mb-4">
              <p className="text-sm">
                Seu perfil foi rejeitado. Entre em contato com o suporte através do email <strong>suporte@habilitaai.app</strong> para mais informações.
              </p>
            </Alert>
          )}
          {isPending && (
            <Alert variant="warning" className="mb-4">
              <p className="text-sm">
                Seu perfil precisa estar aprovado para criar configurações de preços. Aguarde a aprovação do time do Habilita Aí.
              </p>
            </Alert>
          )}
          <form onSubmit={(e) => {
            if (!isActive) {
              e.preventDefault()
              return
            }
            onSubmit(e)
          }} className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <CurrencyDollarIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Defina os valores por hora para esta categoria
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você pode oferecer preços diferentes para aulas com seu veículo ou com o veículo do aluno.
                  </p>
                </div>
              </div>
            </div>

            <Select
              label="Categoria de CNH"
              value={category}
              onChange={e => onCategoryChange(e.target.value as 'A' | 'B' | 'C' | 'D' | 'E')}
              options={availableCategories.length > 0 ? availableCategories : [{ value: '', label: 'Todas as categorias já possuem configurações de preços' }]}
              error={errors.category}
              required
              disabled={!isActive || availableCategories.length === 0}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Preço/hora (com seu veículo)"
                type="number"
                step="0.01"
                min="0.01"
                value={priceInstructorVehicle}
                onChange={e => onPriceInstructorVehicleChange(e.target.value)}
                placeholder="0.00"
                error={errors.priceInstructorVehicle}
                required
                disabled={!isActive}
              />
              <Input
                label="Preço/hora (com veículo do aluno)"
                type="number"
                step="0.01"
                min="0.01"
                value={priceStudentVehicle}
                onChange={e => onPriceStudentVehicleChange(e.target.value)}
                placeholder="0.00"
                error={errors.priceStudentVehicle}
                required
                disabled={!isActive}
              />
            </div>

            {availableCategories.length === 0 && (
              <Alert variant="info" className="text-sm">
                Todas as categorias já possuem configurações de preços. Para alterar uma configuração existente, você precisará criar uma nova que substituirá a anterior.
              </Alert>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCreateDialogClose} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" loading={loading} disabled={!isActive || availableCategories.length === 0}>
                Criar Configuração de Preço
              </Button>
            </div>
          </form>
        </Dialog>

        <Dialog open={editPricesDialogOpen} onClose={onEditPricesClose} title="Editar Preços" size="lg">
          <form onSubmit={(e) => {
            if (!isActive) {
              e.preventDefault()
              return
            }
            onEditPricesSubmit(e)
          }} className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <CurrencyDollarIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Atualize os valores por hora
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você pode oferecer preços diferentes para aulas com seu veículo ou com o veículo do aluno.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Preço/hora (com seu veículo)"
                type="number"
                step="0.01"
                min="0.01"
                value={editPriceInstructorVehicle}
                onChange={e => onEditPriceInstructorVehicleChange(e.target.value)}
                placeholder="0.00"
                error={editPricesErrors.priceInstructorVehicle}
                required
                disabled={!isActive}
              />
              <Input
                label="Preço/hora (com veículo do aluno)"
                type="number"
                step="0.01"
                min="0.01"
                value={editPriceStudentVehicle}
                onChange={e => onEditPriceStudentVehicleChange(e.target.value)}
                placeholder="0.00"
                error={editPricesErrors.priceStudentVehicle}
                required
                disabled={!isActive}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onEditPricesClose} disabled={editPricesLoading}>
                Cancelar
              </Button>
              <Button type="submit" loading={editPricesLoading} disabled={!isActive}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  )
})
