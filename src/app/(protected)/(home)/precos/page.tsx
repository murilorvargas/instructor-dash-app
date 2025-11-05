'use client'

import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { pricingApi } from '@/services/pricing/pricing.api'
import { instructorStore } from '@/stores/instructor.store'
import { personStore } from '@/stores/person.store'
import { pricingStore } from '@/stores/pricing.store'

import { PricingPageView } from './PageView'


function PricingPage() {
  const instructor = instructorStore.instructor!
  const person = personStore.person!
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [category, setCategory] = useState<('A' | 'B' | 'C' | 'D' | 'E') | ''>('')
  const [priceInstructorVehicle, setPriceInstructorVehicle] = useState('')
  const [priceStudentVehicle, setPriceStudentVehicle] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [editPricesDialogOpen, setEditPricesDialogOpen] = useState(false)
  const [editingPricingKey, setEditingPricingKey] = useState<string | null>(null)
  const [editPriceInstructorVehicle, setEditPriceInstructorVehicle] = useState('')
  const [editPriceStudentVehicle, setEditPriceStudentVehicle] = useState('')
  const [editPricesLoading, setEditPricesLoading] = useState(false)
  const [editPricesErrors, setEditPricesErrors] = useState<Record<string, string>>({})

  const [editStatusLoading, setEditStatusLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!category) {
      newErrors.category = 'Selecione uma categoria'
    } else if (pricingStore.hasPricingForCategory(category)) {
      newErrors.category = 'Já existe uma configuração de preço para esta categoria'
    }

    const priceInstructor = parseFloat(priceInstructorVehicle)
    if (!priceInstructorVehicle || isNaN(priceInstructor) || priceInstructor <= 0) {
      newErrors.priceInstructorVehicle = 'Preço deve ser maior que zero'
    }

    const priceStudent = parseFloat(priceStudentVehicle)
    if (!priceStudentVehicle || isNaN(priceStudent) || priceStudent <= 0) {
      newErrors.priceStudentVehicle = 'Preço deve ser maior que zero'
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
      const newPricing = await pricingApi.createPricing(person.person_key, instructor.instructor_key, {
        driver_license_category: category as 'A' | 'B' | 'C' | 'D' | 'E',
        price_per_hour_instructor_vehicle: parseFloat(priceInstructorVehicle),
        price_per_hour_student_vehicle: parseFloat(priceStudentVehicle),
      })
      
      pricingStore.addPricing(newPricing)
      toast.success('Configuração de preço criada com sucesso!')

      setCategory('')
      setPriceInstructorVehicle('')
      setPriceStudentVehicle('')
      setCreateDialogOpen(false)
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao criar configuração de preço'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const validateEditPrices = () => {
    const newErrors: Record<string, string> = {}

    const priceInstructor = parseFloat(editPriceInstructorVehicle)
    if (!editPriceInstructorVehicle || isNaN(priceInstructor) || priceInstructor <= 0) {
      newErrors.priceInstructorVehicle = 'Preço deve ser maior que zero'
    }

    const priceStudent = parseFloat(editPriceStudentVehicle)
    if (!editPriceStudentVehicle || isNaN(priceStudent) || priceStudent <= 0) {
      newErrors.priceStudentVehicle = 'Preço deve ser maior que zero'
    }

    setEditPricesErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEditPricesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEditPrices() || !editingPricingKey) {
      return
    }

    setEditPricesLoading(true)
    setEditPricesErrors({})

    try {
      const updated = await pricingApi.updatePricingPrices(
        person.person_key,
        instructor.instructor_key,
        editingPricingKey,
        {
          price_per_hour_instructor_vehicle: parseFloat(editPriceInstructorVehicle),
          price_per_hour_student_vehicle: parseFloat(editPriceStudentVehicle),
        }
      )

      pricingStore.updatePricing(updated)
      toast.success('Preços atualizados com sucesso!')

      setEditPricesDialogOpen(false)
      setEditingPricingKey(null)
      setEditPriceInstructorVehicle('')
      setEditPriceStudentVehicle('')
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao atualizar preços'
      toast.error(errorMessage)
    } finally {
      setEditPricesLoading(false)
    }
  }

  const handleEditPricesOpen = (pricingKey: string, currentPriceInstructor: number, currentPriceStudent: number) => {
    setEditingPricingKey(pricingKey)
    setEditPriceInstructorVehicle(currentPriceInstructor.toString())
    setEditPriceStudentVehicle(currentPriceStudent.toString())
    setEditPricesErrors({})
    setEditPricesDialogOpen(true)
  }

  const handleEditPricesClose = () => {
    setEditPricesDialogOpen(false)
    setEditingPricingKey(null)
    setEditPriceInstructorVehicle('')
    setEditPriceStudentVehicle('')
    setEditPricesErrors({})
  }

  const handleEditStatusSubmit = async (pricingKey: string, newStatus: 'active' | 'inactive') => {
    setEditStatusLoading(true)

    try {
      const updated = await pricingApi.updatePricingStatus(
        person.person_key,
        instructor.instructor_key,
        pricingKey,
        {
          instructor_pricing_status: newStatus,
        }
      )

      pricingStore.updatePricing(updated)
      toast.success(
        newStatus === 'active' ? 'Configuração de preço ativada com sucesso!' : 'Configuração de preço desativada com sucesso!'
      )
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao atualizar status'
      toast.error(errorMessage)
    } finally {
      setEditStatusLoading(false)
    }
  }


  useEffect(() => {
    if (!createDialogOpen) {
      setCategory('')
      setPriceInstructorVehicle('')
      setPriceStudentVehicle('')
      setErrors({})
    }
  }, [createDialogOpen])

  useEffect(() => {
    if (!editPricesDialogOpen) {
      setEditingPricingKey(null)
      setEditPriceInstructorVehicle('')
      setEditPriceStudentVehicle('')
      setEditPricesErrors({})
    }
  }, [editPricesDialogOpen])

  return (
    <PricingPageView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpen={() => setCreateDialogOpen(true)}
      onCreateDialogClose={() => setCreateDialogOpen(false)}
      category={category}
      onCategoryChange={setCategory}
      priceInstructorVehicle={priceInstructorVehicle}
      onPriceInstructorVehicleChange={setPriceInstructorVehicle}
      priceStudentVehicle={priceStudentVehicle}
      onPriceStudentVehicleChange={setPriceStudentVehicle}
      onSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      editPricesDialogOpen={editPricesDialogOpen}
      onEditPricesOpen={handleEditPricesOpen}
      onEditPricesClose={handleEditPricesClose}
      editPriceInstructorVehicle={editPriceInstructorVehicle}
      onEditPriceInstructorVehicleChange={setEditPriceInstructorVehicle}
      editPriceStudentVehicle={editPriceStudentVehicle}
      onEditPriceStudentVehicleChange={setEditPriceStudentVehicle}
      onEditPricesSubmit={handleEditPricesSubmit}
      editPricesLoading={editPricesLoading}
      editPricesErrors={editPricesErrors}
      onEditStatusSubmit={handleEditStatusSubmit}
      editStatusLoading={editStatusLoading}
    />
  )
}

export default observer(PricingPage)

