'use client'

import type { PersonResponse } from '@/services/person/person.types'
import { personStore } from '@/stores/person.store'

interface PersonStoreInitializerProps {
  children: React.ReactNode
  initialPerson: PersonResponse
}

export function PersonStoreInitializer({ children, initialPerson }: PersonStoreInitializerProps) {
  personStore.setPerson(initialPerson)

  return <>{children}</>
}

