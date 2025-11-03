'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { instructorStore } from '@/stores/instructor.store'
import { InfoCard } from '@/components/InfoCard'

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

