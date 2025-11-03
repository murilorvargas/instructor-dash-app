import axios, { AxiosError } from 'axios'

import { getKeycloakLoginUrl } from '@/utils/keycloak'

const publicRoutes = {
  '/person': ['post'],
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const publicRoute = publicRoutes[config.url as keyof typeof publicRoutes]
    if (publicRoute && publicRoute.includes(config.method as string)) {
      return config
    }

    const keyCloakToken = document.cookie ? document.cookie.split('; ').find(row => row.startsWith('keycloak-token')) : null
    if (!keyCloakToken) {
      window.location.href = getKeycloakLoginUrl()
      return config
    }

    const tokenValue = keyCloakToken.split('=')[1]
    let payload: any
    try {
      payload = JSON.parse(atob(tokenValue.split('.')[1]))
    } catch (_error) {
      window.location.href = getKeycloakLoginUrl()
      return config
    }

    const exp = payload.exp * 1000
    if (Date.now() >= exp) {
      window.location.href = getKeycloakLoginUrl()
      return config
    }      
    config.headers.Authorization = `Bearer ${tokenValue}`
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    const errorData = error.response?.data as any
    const hasAuthErrorCode = errorData?.code === 'IDG40100001'
    
    if (hasAuthErrorCode) {
      window.location.href = getKeycloakLoginUrl()
      return Promise.reject(error)
    }
    
    return Promise.reject(error)
  }
)

export default api
