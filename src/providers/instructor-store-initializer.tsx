'use client'

import { useRef } from 'react'

import type { InstructorResponse } from '@/services/instructor/instructor.types'
import { instructorStore } from '@/stores/instructor.store'

interface InstructorStoreInitializerProps {
  children: React.ReactNode
  initialInstructor: InstructorResponse | null
}

export function InstructorStoreInitializer({ children, initialInstructor }: InstructorStoreInitializerProps) {
  const initialized = useRef(false)
  
  if (!initialized.current && !instructorStore.instructor && initialInstructor) {
    instructorStore.setInstructor(initialInstructor)
    initialized.current = true
  }

  return <>{children}</>
}

