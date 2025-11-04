'use client'

import { useRef } from 'react'

import type { InstructorPricingResponse } from '@/services/pricing/pricing.types'
import { pricingStore } from '@/stores/pricing.store'

interface PricingStoreInitializerProps {
  initialPricings: InstructorPricingResponse[]
  children: React.ReactNode
}

export function PricingStoreInitializer({ initialPricings, children }: PricingStoreInitializerProps) {
  const initialized = useRef(false)
  
  if (!initialized.current && pricingStore.pricings.length === 0) {
    pricingStore.setPricings(initialPricings)
    initialized.current = true
  }

  return <>{children}</>
}

