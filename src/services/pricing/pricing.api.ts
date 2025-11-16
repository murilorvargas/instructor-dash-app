import { BaseApiService } from '../api/base-api.service'
import type { CreateInstructorPricingRequest, InstructorPricingResponse, UpdatePricingPricesRequest,UpdatePricingStatusRequest } from './pricing.types'

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

  async updatePricingPrices(
    personKey: string,
    instructorKey: string,
    instructorPricingKey: string,
    data: UpdatePricingPricesRequest
  ): Promise<InstructorPricingResponse> {
    return await this.patch<InstructorPricingResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_pricing/${instructorPricingKey}`,
      data
    )
  }

  async updatePricingStatus(
    personKey: string,
    instructorKey: string,
    instructorPricingKey: string,
    data: UpdatePricingStatusRequest
  ): Promise<InstructorPricingResponse> {
    return await this.patch<InstructorPricingResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_pricing/${instructorPricingKey}/pricing_status`,
      data
    )
  }
}

export const pricingApi = new PricingApiService()

