import { BaseApiService } from '../api/base-api.service'
import type { CreateInstructorRequest, InstructorResponse, UpdateInstructorDescriptionRequest } from './instructor.types'

export class InstructorApiService extends BaseApiService {
  async createInstructor(personKey: string, data: CreateInstructorRequest): Promise<InstructorResponse> {
    return await this.post<InstructorResponse>(`/person/${personKey}/instructor`, data)
  }

  async updateDescription(
    personKey: string,
    instructorKey: string,
    data: UpdateInstructorDescriptionRequest
  ): Promise<InstructorResponse> {
    return await this.patch<InstructorResponse>(
      `/person/${personKey}/instructor/${instructorKey}`,
      data
    )
  }
}

export const instructorApi = new InstructorApiService()

