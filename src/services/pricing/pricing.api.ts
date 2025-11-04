import { BaseApiService } from '../api/base-api.service'
import type { CreateInstructorPricingRequest, InstructorPricingResponse } from './pricing.types'

export class PricingApiService extends BaseApiService {
  async createPricing(
    personKey: string,
    instructorKey: string,
    data: CreateInstructorPricingRequest
  ): Promise<InstructorPricingResponse> {
    return await this.post<InstructorPricingResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_pricing`,
      data
    )
  }
}

export const pricingApi = new PricingApiService()

