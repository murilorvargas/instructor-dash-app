import { makeAutoObservable } from 'mobx'

import type { InstructorPricingResponse } from '@/services/pricing/pricing.types'

class PricingStore {
  pricings: InstructorPricingResponse[] = []
  loading: boolean = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setPricings(pricings: InstructorPricingResponse[]) {
    this.pricings = pricings
  }

  addPricing(pricing: InstructorPricingResponse) {
    this.pricings.push(pricing)
  }

  updatePricing(updatedPricing: InstructorPricingResponse) {
    const index = this.pricings.findIndex(p => p.instructor_pricing_key === updatedPricing.instructor_pricing_key)
    if (index !== -1) {
      this.pricings[index] = updatedPricing
    }
  }

  hasPricingForCategory(category: ('A' | 'B' | 'C' | 'D' | 'E')): boolean {
    return this.pricings.some(p => p.driver_license_category === category)
  }
}

export const pricingStore = new PricingStore()

