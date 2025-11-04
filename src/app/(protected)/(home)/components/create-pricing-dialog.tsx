'use client'

import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'

interface CreatePricingDialogProps {
  open: boolean
  onClose: () => void
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

export const CreatePricingDialog: React.FC<CreatePricingDialogProps> = ({
  open,
  onClose,
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
  return (
    <Dialog open={open} onClose={onClose} title="Criar Configuração de Preço" size="lg">
      {!isApproved && (
        <Alert variant="warning" className="mb-4">
          <p className="text-sm">
            Seu perfil precisa estar aprovado para criar configurações de preços. Aguarde a aprovação do time do Habilita Aí.
          </p>
        </Alert>
      )}
      <form
        onSubmit={e => {
          if (isDisabled) {
            e.preventDefault()
            return
          }
          onSubmit(e)
        }}
        className="space-y-6"
      >
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
          options={
            availableCategories.length > 0
              ? availableCategories
              : [{ value: '', label: 'Todas as categorias já possuem configurações de preços' }]
          }
          error={errors.category}
          required
          disabled={isDisabled || availableCategories.length === 0}
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
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </div>

        {availableCategories.length === 0 && (
          <Alert variant="info" className="text-sm">
            Todas as categorias já possuem configurações de preços. Para alterar uma configuração existente, você precisará criar uma nova que substituirá a anterior.
          </Alert>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} disabled={isDisabled || availableCategories.length === 0}>
            Criar Configuração de Preço
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

