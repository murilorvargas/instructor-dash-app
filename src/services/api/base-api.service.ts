import api from '@/lib/axios'

export abstract class BaseApiService {
  protected api = api

  protected async get<T>(path: string): Promise<T> {
    const response = await this.api.get(path)
    return response.data
  }

  protected async post<T>(path: string, data: any): Promise<T> {
    const response = await this.api.post(path, data)
    return response.data
  }

  protected async put<T>(path: string, data: any): Promise<T> {
    const response = await this.api.put(path, data)
    return response.data
  }

  protected async patch<T>(path: string, data: any): Promise<T> {
    const response = await this.api.patch(path, data)
    return response.data
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await this.api.delete(path)
    return response.data
  }
}
