import { BaseApiService } from '../api/base-api.service'
import type { CreatePersonRequest, PersonResponse } from './person.types'

export class PersonApiService extends BaseApiService {
  async createPerson(data: CreatePersonRequest): Promise<PersonResponse> {
    return await this.post<PersonResponse>('/person', data)
  }
}

export const personApi = new PersonApiService()