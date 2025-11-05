'use client'

import type { InstructorResponse } from '@/services/instructor/instructor.types'
import { instructorStore } from '@/stores/instructor.store'

interface InstructorStoreInitializerProps {
  children: React.ReactNode
  initialInstructor: InstructorResponse
}

export function InstructorStoreInitializer({ children, initialInstructor }: InstructorStoreInitializerProps) {
  instructorStore.setInstructor(initialInstructor)

  return <>{children}</>
}

