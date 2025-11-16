import { BaseApiService } from '../api/base-api.service'
import type {
  CreateInstructorVehicleRequest,
  InstructorVehicleResponse,
  UpdateVehicleInfoRequest,
  UpdateVehicleStatusRequest,
} from './vehicle.types'

export class VehicleApiService extends BaseApiService {
  async createVehicle(
    personKey: string,
    instructorKey: string,
    data: CreateInstructorVehicleRequest
  ): Promise<InstructorVehicleResponse> {
    return await this.post<InstructorVehicleResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_vehicle`,
      data
    )
  }

  async updateVehicleStatus(
    personKey: string,
    instructorKey: string,
    instructorVehicleKey: string,
    data: UpdateVehicleStatusRequest
  ): Promise<InstructorVehicleResponse> {
    return await this.patch<InstructorVehicleResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_vehicle/${instructorVehicleKey}/vehicle_status`,
      data
    )
  }

  async updateVehicleInfo(
    personKey: string,
    instructorKey: string,
    instructorVehicleKey: string,
    data: UpdateVehicleInfoRequest
  ): Promise<InstructorVehicleResponse> {
    return await this.patch<InstructorVehicleResponse>(
      `/person/${personKey}/instructor/${instructorKey}/instructor_vehicle/${instructorVehicleKey}`,
      data
    )
  }
}

export const vehicleApi = new VehicleApiService()

