'use client'

import { CheckIcon, PencilIcon, PlusIcon, TruckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { InfoCard } from '@/components/InfoCard'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { instructorStore } from '@/stores/instructor.store'
import { vehicleStore } from '@/stores/vehicle.store'

import { VehiclePageAlert } from '../components/vehicle-page-alert'

const vehicleTypes = [
  { value: 'motorcycle', label: 'Motocicleta' },
  { value: 'light_vehicle', label: 'Veículo Leve' },
  { value: 'heavy_vehicle', label: 'Veículo Pesado' },
  { value: 'bus', label: 'Ônibus' },
  { value: 'truck_trailer', label: 'Caminhão com Reboque' },
]

const vehicleTypeLabels: Record<string, string> = {
  motorcycle: 'Motocicleta',
  light_vehicle: 'Veículo Leve',
  heavy_vehicle: 'Veículo Pesado',
  bus: 'Ônibus',
  truck_trailer: 'Caminhão com Reboque',
}

interface VehiclePageViewProps {
  createDialogOpen: boolean
  onCreateDialogOpen: () => void
  onCreateDialogClose: () => void
  vehicleLicensePlate: string
  onVehicleLicensePlateChange: (value: string) => void
  vehicleManufacturerDate: number | ''
  onVehicleManufacturerYearChange: (value: number | '') => void
  vehicleName: string
  onVehicleNameChange: (value: string) => void
  vehicleDescription: string
  onVehicleDescriptionChange: (value: string) => void
  vehicleType: ('motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer') | ''
  onVehicleTypeChange: (value: ('motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer') | '') => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  errors: Record<string, string>
  editInfoDialogOpen: boolean
  onEditInfoOpen: (vehicleKey: string, currentName: string, currentDescription: string) => void
  onEditInfoClose: () => void
  editVehicleName: string
  onEditVehicleNameChange: (value: string) => void
  editVehicleDescription: string
  onEditVehicleDescriptionChange: (value: string) => void
  onEditInfoSubmit: (e: React.FormEvent) => void
  editInfoLoading: boolean
  editInfoErrors: Record<string, string>
  onEditStatusSubmit: (vehicleKey: string, newStatus: 'active' | 'inactive' | 'deleted') => void
  editStatusLoading: boolean
}

export const VehiclePageView: React.FC<VehiclePageViewProps> = observer(({
  createDialogOpen,
  onCreateDialogOpen,
  onCreateDialogClose,
  vehicleLicensePlate,
  onVehicleLicensePlateChange,
  vehicleManufacturerDate,
  onVehicleManufacturerYearChange,
  vehicleName,
  onVehicleNameChange,
  vehicleDescription,
  onVehicleDescriptionChange,
  vehicleType,
  onVehicleTypeChange,
  onSubmit,
  loading,
  errors,
  editInfoDialogOpen,
  onEditInfoOpen,
  onEditInfoClose,
  editVehicleName,
  onEditVehicleNameChange,
  editVehicleDescription,
  onEditVehicleDescriptionChange,
  onEditInfoSubmit,
  editInfoLoading,
  editInfoErrors,
  onEditStatusSubmit,
  editStatusLoading,
}) => {
  const instructor = instructorStore.instructor!
  const activeVehicles = vehicleStore.vehicles.filter(v => v.vehicle_status === 'active')
  const inactiveVehicles = vehicleStore.vehicles.filter(v => v.vehicle_status === 'inactive')
  const deletedVehicles = vehicleStore.vehicles.filter(v => v.vehicle_status === 'deleted')
  const allVehicles = vehicleStore.vehicles
  const isPending = instructor.instructor_status === 'pending_approval'
  const isActive = instructor.instructor_status === 'active'
  const isRejected = instructor.instructor_status === 'rejected'

  const renderVehicleCard = (vehicle: typeof vehicleStore.vehicles[0]) => {
    const isVehicleActive = vehicle.vehicle_status === 'active'
    const isVehicleDeleted = vehicle.vehicle_status === 'deleted'
    
    return (
      <div
        key={vehicle.vehicle_key}
        className="bg-muted/50 rounded-lg p-4 sm:p-5 border border-border"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground text-base sm:text-lg">
              {vehicle.vehicle_name}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {vehicleTypeLabels[vehicle.vehicle_type] || vehicle.vehicle_type}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              isVehicleActive 
                ? 'bg-primary/10 text-primary' 
                : isVehicleDeleted
                ? 'bg-destructive/10 text-destructive'
                : 'bg-muted-foreground/10 text-muted-foreground'
            }`}>
              {isVehicleActive ? 'Ativo' : isVehicleDeleted ? 'Excluído' : 'Inativo'}
            </span>
            {isVehicleActive && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditInfoOpen(
                    vehicle.vehicle_key,
                    vehicle.vehicle_name,
                    vehicle.vehicle_description
                  )}
                  disabled={!isActive}
                >
                  <PencilIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Editar</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onEditStatusSubmit(vehicle.vehicle_key, 'inactive')
                  }}
                  disabled={!isActive || editStatusLoading}
                  loading={editStatusLoading}
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Desativar</span>
                </Button>
              </>
            )}
            {!isVehicleActive && !isVehicleDeleted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onEditStatusSubmit(vehicle.vehicle_key, 'active')
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
        <div className="space-y-3 text-sm sm:text-base">
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">
              Placa
            </p>
            <p className="font-bold text-foreground">
              {vehicle.vehicle_license_plate}
            </p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">
              Descrição
            </p>
            <p className="text-foreground">
              {vehicle.vehicle_description}
            </p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">
              Ano de Fabricação
            </p>
            <p className="text-foreground">
              {vehicle.vehicle_manufacturer_year}
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
            Meus Veículos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gerencie os veículos que você utiliza para dar aulas
          </p>
        </div>

        <VehiclePageAlert/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard
            title="Veículos Cadastrados"
            className="lg:col-span-2"
            headerAction={
              <Button
                onClick={onCreateDialogOpen}
                disabled={!isActive}
                size="sm"
                className="text-xs sm:text-sm shrink-0"
              >
                <PlusIcon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Adicionar Veículo</span>
                <span className="sm:hidden">Adicionar</span>
              </Button>
            }
          >
            {allVehicles.length === 0 ? (
              <div className={`text-center py-12 ${!isActive ? 'opacity-50' : ''}`}>
                <TruckIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2 font-medium">
                  Nenhum veículo cadastrado
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPending
                    ? 'Aguarde a aprovação do seu perfil para cadastrar veículos'
                    : isRejected
                    ? 'Seu perfil foi rejeitado. Entre em contato com suporte@habilitaai.app para mais informações'
                    : 'Clique em "Adicionar Veículo" para começar'}
                </p>
              </div>
            ) : (
              <div className={`space-y-6 ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
                {activeVehicles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Ativos</h3>
                    <div className="space-y-4">
                      {activeVehicles.map(vehicle => renderVehicleCard(vehicle))}
                    </div>
                  </div>
                )}
                {inactiveVehicles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Inativos</h3>
                    <div className="space-y-4">
                      {inactiveVehicles.map(vehicle => renderVehicleCard(vehicle))}
                    </div>
                  </div>
                )}
                {deletedVehicles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-destructive mb-3">Excluídos</h3>
                    <div className="space-y-4">
                      {deletedVehicles.map(vehicle => renderVehicleCard(vehicle))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </InfoCard>
        </div>

        <Dialog open={createDialogOpen} onClose={onCreateDialogClose} title="Cadastrar Veículo" size="lg">
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
                Seu perfil precisa estar aprovado para cadastrar veículos. Aguarde a aprovação do time do Habilita Aí.
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
                <TruckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Informações do veículo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Preencha todas as informações do veículo que você utiliza para dar aulas.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Placa do Veículo"
                value={vehicleLicensePlate}
                onChange={e => onVehicleLicensePlateChange(e.target.value.toUpperCase())}
                placeholder="ABC1234"
                error={errors.vehicleLicensePlate}
                required
                disabled={!isActive}
                maxLength={7}
              />
              <Input
                label="Ano de Fabricação"
                type="number"
                value={vehicleManufacturerDate}
                onChange={e => {
                  const value = e.target.value
                  onVehicleManufacturerYearChange(value === '' ? '' : parseInt(value) || '')
                }}
                placeholder="2020"
                min={2000}
                max={new Date().getFullYear() + 1}
                error={errors.vehicleManufacturerDate}
                required
                disabled={!isActive}
              />
            </div>

            <Select
              label="Tipo de Veículo"
              value={vehicleType}
              onChange={e => onVehicleTypeChange(e.target.value as 'motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer')}
              options={vehicleTypes}
              error={errors.vehicleType}
              required
              disabled={!isActive}
            />

            <Input
              label="Nome do Veículo"
              value={vehicleName}
              onChange={e => onVehicleNameChange(e.target.value)}
              placeholder="Ex: Honda CG 160"
              error={errors.vehicleName}
              required
              disabled={!isActive}
              maxLength={255}
            />

            <Textarea
              label="Descrição do Veículo"
              value={vehicleDescription}
              onChange={e => onVehicleDescriptionChange(e.target.value)}
              placeholder="Descreva características do veículo..."
              error={errors.vehicleDescription}
              required
              disabled={!isActive}
              maxLength={255}
              rows={4}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCreateDialogClose} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" loading={loading} disabled={!isActive}>
                Cadastrar Veículo
              </Button>
            </div>
          </form>
        </Dialog>

        <Dialog open={editInfoDialogOpen} onClose={onEditInfoClose} title="Editar Informações do Veículo" size="lg">
          <form onSubmit={(e) => {
            if (!isActive) {
              e.preventDefault()
              return
            }
            onEditInfoSubmit(e)
          }} className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <TruckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Atualize as informações do veículo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você pode alterar o nome e a descrição do veículo.
                  </p>
                </div>
              </div>
            </div>

            <Input
              label="Nome do Veículo"
              value={editVehicleName}
              onChange={e => onEditVehicleNameChange(e.target.value)}
              placeholder="Ex: Honda CG 160"
              error={editInfoErrors.vehicleName}
              required
              disabled={!isActive}
              maxLength={255}
            />

            <Textarea
              label="Descrição do Veículo"
              value={editVehicleDescription}
              onChange={e => onEditVehicleDescriptionChange(e.target.value)}
              placeholder="Descreva características do veículo..."
              error={editInfoErrors.vehicleDescription}
              required
              disabled={!isActive}
              maxLength={255}
              rows={4}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onEditInfoClose} disabled={editInfoLoading}>
                Cancelar
              </Button>
              <Button type="submit" loading={editInfoLoading} disabled={!isActive}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  )
})

