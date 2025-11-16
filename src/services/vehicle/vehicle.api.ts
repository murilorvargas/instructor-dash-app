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
      `/person/${personKey}/instructor/${instructorKey}/vehicle`,
      data
    )
  }

  async updateVehicleStatus(
    personKey: string,
    instructorKey: string,
    vehicleKey: string,
    data: UpdateVehicleStatusRequest
  ): Promise<InstructorVehicleResponse> {
    return await this.patch<InstructorVehicleResponse>(
      `/person/${personKey}/instructor/${instructorKey}/vehicle/${vehicleKey}/vehicle_status`,
      data
    )
  }

  async updateVehicleInfo(
    personKey: string,
    instructorKey: string,
    vehicleKey: string,
    data: UpdateVehicleInfoRequest
  ): Promise<InstructorVehicleResponse> {
    return await this.patch<InstructorVehicleResponse>(
      `/person/${personKey}/instructor/${instructorKey}/vehicle/${vehicleKey}`,
      data
    )
  }
}

export const vehicleApi = new VehicleApiService()

