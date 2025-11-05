'use client'

import type { InstructorPricingResponse } from '@/services/pricing/pricing.types'
import { pricingStore } from '@/stores/pricing.store'

interface PricingStoreInitializerProps {
  children: React.ReactNode
  initialPricings: InstructorPricingResponse[]
}

export function PricingStoreInitializer({ children, initialPricings }: PricingStoreInitializerProps) {
  pricingStore.setPricings(initialPricings)

  return <>{children}</>
}

