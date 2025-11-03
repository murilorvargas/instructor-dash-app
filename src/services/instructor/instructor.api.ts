import { BaseApiService } from '../api/base-api.service'
import type { CreateInstructorRequest, InstructorResponse } from './instructor.types'

export class InstructorApiService extends BaseApiService {
  async createInstructor(personKey: string, data: CreateInstructorRequest): Promise<InstructorResponse> {
    return await this.post<InstructorResponse>(`/person/${personKey}/instructor`, data)
  }
}

export const instructorApi = new InstructorApiService()

