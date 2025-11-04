'use client'

import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Button } from '@/components/Button'
import { InfoCard } from '@/components/InfoCard'
import { pricingStore } from '@/stores/pricing.store'

import { CreatePricingDialog } from './create-pricing-dialog'

const categoryLabels: Record<string, string> = {
  A: 'Categoria A - Motocicleta',
  B: 'Categoria B - Carro',
  C: 'Categoria C - Caminhão',
  D: 'Categoria D - Ônibus',
  E: 'Categoria E - Carreta',
}

interface PricingCardProps {
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
  availableCategories: Array<{ value: string; label: string }>
  isApproved: boolean
  isDisabled: boolean
}

export const PricingCard: React.FC<PricingCardProps> = observer(({
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
  availableCategories,
  isApproved,
  isDisabled,
}) => {
  const activePricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const pricings = activePricings

  return (
    <>
      <InfoCard title="Configurações de Preços das Aulas" className="lg:col-span-2">
        <div className="space-y-4">
          {pricings.length === 0 ? (
            <div className="text-center py-8">
              <CurrencyDollarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não configurou preços para suas aulas
              </p>
              <Button onClick={onCreateDialogOpen}>
                <PlusIcon className="w-4 h-4" />
                Criar Primeira Configuração de Preço
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {pricings.map(pricing => (
                  <div
                    key={pricing.instructor_pricing_key}
                    className="bg-muted/50 rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">
                        {categoryLabels[pricing.driver_license_category] || pricing.driver_license_category}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {pricing.instructor_pricing_status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Com seu veículo: </span>
                        <span className="font-semibold text-foreground">
                          R$ {pricing.price_per_hour_instructor_vehicle.toFixed(2)}/h
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Com veículo do aluno: </span>
                        <span className="font-semibold text-foreground">
                          R$ {pricing.price_per_hour_student_vehicle.toFixed(2)}/h
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={onCreateDialogOpen}
                className="w-full"
              >
                <PlusIcon className="w-4 h-4" />
                Adicionar Nova Configuração de Preço
              </Button>
            </>
          )}
        </div>
      </InfoCard>
      <CreatePricingDialog
        open={createDialogOpen}
        onClose={onCreateDialogClose}
        category={category}
        onCategoryChange={onCategoryChange}
        priceInstructorVehicle={priceInstructorVehicle}
        onPriceInstructorVehicleChange={onPriceInstructorVehicleChange}
        priceStudentVehicle={priceStudentVehicle}
        onPriceStudentVehicleChange={onPriceStudentVehicleChange}
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        availableCategories={availableCategories}
        isApproved={isApproved}
        isDisabled={isDisabled}
      />
    </>
  )
})

