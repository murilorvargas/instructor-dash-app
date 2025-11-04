'use client'

import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { instructorApi } from '@/services/instructor/instructor.api'
import { instructorStore } from '@/stores/instructor.store'
import { personStore } from '@/stores/person.store'

import { PageView } from './PageView'

function Dashboard() {
  const instructor = instructorStore.instructor!
  const person = personStore.person!
  const [editDescriptionOpen, setEditDescriptionOpen] = useState(false)
  const [description, setDescription] = useState(instructor.instructor_description)
  const [descriptionLoading, setDescriptionLoading] = useState(false)
  const [descriptionError, setDescriptionError] = useState<string | undefined>(undefined)

  const handleDescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDescriptionError(undefined)
    setDescriptionLoading(true)

    try {
      const updated = await instructorApi.updateDescription(person.person_key, instructor.instructor_key, {
        instructor_description: description,
      })
      instructorStore.updateDescription(updated.instructor_description)
      toast.success('Descrição atualizada com sucesso!')
      setEditDescriptionOpen(false)
    } catch (err: any) {
      const errorMessage = err.response?.data?.translation || 'Erro ao atualizar descrição'
      setDescriptionError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setDescriptionLoading(false)
    }
  }

  const handleEditDescriptionOpen = () => {
    setDescription(instructor.instructor_description)
    setDescriptionError(undefined)
    setEditDescriptionOpen(true)
  }

  const handleEditDescriptionClose = () => {
    setEditDescriptionOpen(false)
    setDescription(instructor.instructor_description)
    setDescriptionError(undefined)
  }

  return (
    <PageView
      editDescriptionOpen={editDescriptionOpen}
      onEditDescriptionOpen={handleEditDescriptionOpen}
      onEditDescriptionClose={handleEditDescriptionClose}
      description={description}
      onDescriptionChange={setDescription}
      onDescriptionSubmit={handleDescriptionSubmit}
      descriptionLoading={descriptionLoading}
      descriptionError={descriptionError}
    />
  )
}

export default observer(Dashboard)

