'use client'

import React from 'react'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Textarea } from '@/components/Textarea'

interface EditDescriptionDialogProps {
  open: boolean
  onClose: () => void
  description: string
  onDescriptionChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  error?: string
}

export const EditDescriptionDialog: React.FC<EditDescriptionDialogProps> = ({
  open,
  onClose,
  description,
  onDescriptionChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <Dialog open={open} onClose={onClose} title="Editar Descrição Profissional" size="lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <Textarea
          label="Descrição"
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
          placeholder="Descreva sua experiência, metodologia de ensino, especialidades..."
          error={error}
          required
          maxLength={500}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

