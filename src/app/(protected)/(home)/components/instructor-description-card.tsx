'use client'

import { observer } from 'mobx-react-lite'
import React from 'react'

import { InfoCard } from '@/components/InfoCard'
import { instructorStore } from '@/stores/instructor.store'

export const InstructorDescriptionCard: React.FC = observer(() => {
  const instructor = instructorStore.instructor!

  return (
    <InfoCard title="Descrição Profissional" className="lg:col-span-2">
      <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line break-words">
        {instructor.instructor_description}
      </p>
    </InfoCard>
  )
})

