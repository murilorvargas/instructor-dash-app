import type { ViaCepResponse } from './cep.types'

export class CepApiService {
  async searchCep(cep: string): Promise<ViaCepResponse> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    
    if (response.status !== 200) {
      throw new Error('Erro ao buscar CEP. Tente novamente.')
    }

    const data: ViaCepResponse = await response.json()
    
    if (data.erro) {
      throw new Error('CEP não encontrado')
    }

    return data
  }
}

export const cepApi = new CepApiService()

