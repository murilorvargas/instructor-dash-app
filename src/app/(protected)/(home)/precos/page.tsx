'use client'

import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { pricingApi } from '@/services/pricing/pricing.api'
import { instructorStore } from '@/stores/instructor.store'
import { personStore } from '@/stores/person.store'
import { pricingStore } from '@/stores/pricing.store'

import { PricingPageView } from './PageView'

const categories = [
  { value: 'A', label: 'Categoria A - Motocicleta' },
  { value: 'B', label: 'Categoria B - Carro' },
  { value: 'C', label: 'Categoria C - Caminhão' },
  { value: 'D', label: 'Categoria D - Ônibus' },
  { value: 'E', label: 'Categoria E - Carreta' },
]

function PricingPage() {
  const instructor = instructorStore.instructor!
  const person = personStore.person!
  const pricings = pricingStore.pricings.filter(p => p.instructor_pricing_status === 'active')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [category, setCategory] = useState<('A' | 'B' | 'C' | 'D' | 'E') | ''>('')
  const [priceInstructorVehicle, setPriceInstructorVehicle] = useState('')
  const [priceStudentVehicle, setPriceStudentVehicle] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
        lesson_type: 'practical',
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

  const availableCategories = categories.filter(cat => !pricingStore.hasPricingForCategory(cat.value as 'A' | 'B' | 'C' | 'D' | 'E'))
  const isActive = instructor.instructor_status === 'active'

  useEffect(() => {
    if (!createDialogOpen) {
      setCategory('')
      setPriceInstructorVehicle('')
      setPriceStudentVehicle('')
      setErrors({})
    }
  }, [createDialogOpen])

  return (
    <PricingPageView
      pricings={pricings}
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
      availableCategories={availableCategories}
      isActive={isActive}
    />
  )
}

export default observer(PricingPage)

