'use client'

import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { InfoCard } from '@/components/InfoCard'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import type { InstructorPricingResponse } from '@/services/pricing/pricing.types'

import { PricingPageAlert } from '../components/pricing-page-alert'

const categoryLabels: Record<string, string> = {
  A: 'Categoria A - Motocicleta',
  B: 'Categoria B - Carro',
  C: 'Categoria C - Caminhão',
  D: 'Categoria D - Ônibus',
  E: 'Categoria E - Carreta',
}

interface PricingPageViewProps {
  pricings: InstructorPricingResponse[]
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
  isActive: boolean
}

export const PricingPageView: React.FC<PricingPageViewProps> = ({
  pricings,
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
  isActive,
}) => {

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

        <PricingPageAlert />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard
            title="Configurações de Preços das Aulas"
            className="lg:col-span-2"
            headerAction={
              <Button
                onClick={onCreateDialogOpen}
                disabled={!isActive || availableCategories.length === 0}
              >
                <PlusIcon className="w-4 h-4" />
                Adicionar Configuração de Preço
              </Button>
            }
          >
            {pricings.length === 0 ? (
              <div className={`text-center py-12 ${!isActive ? 'opacity-50' : ''}`}>
                <CurrencyDollarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2 font-medium">
                  Nenhuma configuração de preço configurada
                </p>
                <p className="text-sm text-muted-foreground">
                  {!isActive
                    ? 'Aguarde a aprovação do seu perfil para configurar preços'
                    : 'Clique em "Adicionar Configuração de Preço" para começar'}
                </p>
              </div>
            ) : (
              <div className={`space-y-4 ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
                {pricings.map(pricing => (
                  <div
                    key={pricing.instructor_pricing_key}
                    className="bg-muted/50 rounded-lg p-4 sm:p-5 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-base sm:text-lg">
                        {categoryLabels[pricing.driver_license_category] || pricing.driver_license_category}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        Ativo
                      </span>
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
                ))}
              </div>
            )}
          </InfoCard>
        </div>

        <Dialog open={createDialogOpen} onClose={onCreateDialogClose} title="Criar Configuração de Preço" size="lg">
          {!isActive && (
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
      </div>
    </div>
  )
}

