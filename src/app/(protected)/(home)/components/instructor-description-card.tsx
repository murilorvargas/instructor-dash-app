'use client'

import { PencilIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Button } from '@/components/Button'
import { InfoCard } from '@/components/InfoCard'
import { instructorStore } from '@/stores/instructor.store'
import { EditDescriptionDialog } from './edit-description-dialog'

interface InstructorDescriptionCardProps {
  editOpen: boolean
  onEditOpen: () => void
  onEditClose: () => void
  description: string
  onDescriptionChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  error?: string
}

export const InstructorDescriptionCard: React.FC<InstructorDescriptionCardProps> = observer(({
  editOpen,
  onEditOpen,
  onEditClose,
  description,
  onDescriptionChange,
  onSubmit,
  loading,
  error,
}) => {
  const instructor = instructorStore.instructor!

  return (
    <>
      <InfoCard
        title="Descrição Profissional"
        className="lg:col-span-2"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditOpen}
          >
            <PencilIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
        }
      >
        <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line break-words">
          {instructor.instructor_description}
        </p>
      </InfoCard>
      <EditDescriptionDialog
        open={editOpen}
        onClose={onEditClose}
        description={description}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </>
  )
})

