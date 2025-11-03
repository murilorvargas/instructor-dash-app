'use client'

import { useRef } from 'react'

import type { PersonResponse } from '@/services/person/person.types'
import { personStore } from '@/stores/person.store'

interface PersonStoreInitializerProps {
  children: React.ReactNode
  initialPerson: PersonResponse
}

export function PersonStoreInitializer({ children, initialPerson }: PersonStoreInitializerProps) {
  const initialized = useRef(false)
  
  if (!initialized.current && !personStore.person) {
    personStore.setPerson(initialPerson)
    initialized.current = true
  }

  return <>{children}</>
}

