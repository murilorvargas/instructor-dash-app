'use client'

import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { vehicleApi } from '@/services/vehicle/vehicle.api'
import { instructorStore } from '@/stores/instructor.store'
import { personStore } from '@/stores/person.store'
import { vehicleStore } from '@/stores/vehicle.store'

import { VehiclePageView } from './PageView'

function VehiclePage() {
  const instructor = instructorStore.instructor!
  const person = personStore.person!
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState('')
  const [vehicleManufacturerDate, setVehicleManufacturerDate] = useState<number | ''>('')
  const [vehicleName, setVehicleName] = useState('')
  const [vehicleDescription, setVehicleDescription] = useState('')
  const [vehicleType, setVehicleType] = useState<('motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer') | ''>('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [editInfoDialogOpen, setEditInfoDialogOpen] = useState(false)
  const [editingVehicleKey, setEditingVehicleKey] = useState<string | null>(null)
  const [editVehicleName, setEditVehicleName] = useState('')
  const [editVehicleDescription, setEditVehicleDescription] = useState('')
  const [editInfoLoading, setEditInfoLoading] = useState(false)
  const [editInfoErrors, setEditInfoErrors] = useState<Record<string, string>>({})

  const [editStatusLoading, setEditStatusLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!vehicleLicensePlate || vehicleLicensePlate.length !== 7) {
      newErrors.vehicleLicensePlate = 'A placa deve ter exatamente 7 caracteres'
    }

    const year = typeof vehicleManufacturerDate === 'number' ? vehicleManufacturerDate : parseInt(vehicleManufacturerDate)
    if (!vehicleManufacturerDate || isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      newErrors.vehicleManufacturerDate = 'O ano de fabricação deve ser um ano válido entre 1900 e ' + (new Date().getFullYear() + 1)
    }

    if (!vehicleType) {
      newErrors.vehicleType = 'Selecione um tipo de veículo'
    }

    if (!vehicleName || vehicleName.trim().length === 0) {
      newErrors.vehicleName = 'O nome do veículo é obrigatório'
    }

    if (!vehicleDescription || vehicleDescription.trim().length === 0) {
      newErrors.vehicleDescription = 'A descrição do veículo é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const newVehicle = await vehicleApi.createVehicle(person.person_key, instructor.instructor_key, {
        vehicle_license_plate: vehicleLicensePlate.toUpperCase(),
        vehicle_manufacturer_year: typeof vehicleManufacturerDate === 'number' ? vehicleManufacturerDate : parseInt(vehicleManufacturerDate),
        vehicle_name: vehicleName.trim(),
        vehicle_description: vehicleDescription.trim(),
        vehicle_type: vehicleType as 'motorcycle' | 'light_vehicle' | 'heavy_vehicle' | 'bus' | 'truck_trailer',
      })
      
      vehicleStore.addVehicle(newVehicle)
      toast.success('Veículo cadastrado com sucesso!')

      setVehicleLicensePlate('')
      setVehicleManufacturerDate('')
      setVehicleName('')
      setVehicleDescription('')
      setVehicleType('')
      setCreateDialogOpen(false)
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao cadastrar veículo'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const validateEditInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!editVehicleName || editVehicleName.trim().length === 0) {
      newErrors.vehicleName = 'O nome do veículo é obrigatório'
    }

    if (!editVehicleDescription || editVehicleDescription.trim().length === 0) {
      newErrors.vehicleDescription = 'A descrição do veículo é obrigatória'
    }

    setEditInfoErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEditInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEditInfo() || !editingVehicleKey) {
      return
    }

    setEditInfoLoading(true)
    setEditInfoErrors({})

    try {
      const updated = await vehicleApi.updateVehicleInfo(
        person.person_key,
        instructor.instructor_key,
        editingVehicleKey,
        {
          vehicle_name: editVehicleName.trim(),
          vehicle_description: editVehicleDescription.trim(),
        }
      )

      vehicleStore.updateVehicle(updated)
      toast.success('Informações do veículo atualizadas com sucesso!')

      setEditInfoDialogOpen(false)
      setEditingVehicleKey(null)
      setEditVehicleName('')
      setEditVehicleDescription('')
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao atualizar informações do veículo'
      toast.error(errorMessage)
    } finally {
      setEditInfoLoading(false)
    }
  }

  const handleEditInfoOpen = (vehicleKey: string, currentName: string, currentDescription: string) => {
    setEditingVehicleKey(vehicleKey)
    setEditVehicleName(currentName)
    setEditVehicleDescription(currentDescription)
    setEditInfoErrors({})
    setEditInfoDialogOpen(true)
  }

  const handleEditInfoClose = () => {
    setEditInfoDialogOpen(false)
    setEditingVehicleKey(null)
    setEditVehicleName('')
    setEditVehicleDescription('')
    setEditInfoErrors({})
  }

  const handleEditStatusSubmit = async (vehicleKey: string, newStatus: 'active' | 'inactive' | 'deleted') => {
    setEditStatusLoading(true)

    try {
      const updated = await vehicleApi.updateVehicleStatus(
        person.person_key,
        instructor.instructor_key,
        vehicleKey,
        {
          vehicle_status: newStatus,
        }
      )

      vehicleStore.updateVehicle(updated)
      const statusMessages = {
        active: 'Veículo ativado com sucesso!',
        inactive: 'Veículo desativado com sucesso!',
        deleted: 'Veículo excluído com sucesso!',
      }
      toast.success(statusMessages[newStatus])
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao atualizar status do veículo'
      toast.error(errorMessage)
    } finally {
      setEditStatusLoading(false)
    }
  }

  useEffect(() => {
    if (!createDialogOpen) {
      setVehicleLicensePlate('')
      setVehicleManufacturerDate('')
      setVehicleName('')
      setVehicleDescription('')
      setVehicleType('')
      setErrors({})
    }
  }, [createDialogOpen])

  useEffect(() => {
    if (!editInfoDialogOpen) {
      setEditingVehicleKey(null)
      setEditVehicleName('')
      setEditVehicleDescription('')
      setEditInfoErrors({})
    }
  }, [editInfoDialogOpen])

  return (
    <VehiclePageView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpen={() => setCreateDialogOpen(true)}
      onCreateDialogClose={() => setCreateDialogOpen(false)}
      vehicleLicensePlate={vehicleLicensePlate}
      onVehicleLicensePlateChange={setVehicleLicensePlate}
      vehicleManufacturerDate={vehicleManufacturerDate}
      onVehicleManufacturerYearChange={(value) => setVehicleManufacturerDate(value)}
      vehicleName={vehicleName}
      onVehicleNameChange={setVehicleName}
      vehicleDescription={vehicleDescription}
      onVehicleDescriptionChange={setVehicleDescription}
      vehicleType={vehicleType}
      onVehicleTypeChange={setVehicleType}
      onSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      editInfoDialogOpen={editInfoDialogOpen}
      onEditInfoOpen={handleEditInfoOpen}
      onEditInfoClose={handleEditInfoClose}
      editVehicleName={editVehicleName}
      onEditVehicleNameChange={setEditVehicleName}
      editVehicleDescription={editVehicleDescription}
      onEditVehicleDescriptionChange={setEditVehicleDescription}
      onEditInfoSubmit={handleEditInfoSubmit}
      editInfoLoading={editInfoLoading}
      editInfoErrors={editInfoErrors}
      onEditStatusSubmit={handleEditStatusSubmit}
      editStatusLoading={editStatusLoading}
    />
  )
}

export default observer(VehiclePage)

