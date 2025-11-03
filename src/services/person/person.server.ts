import axios from 'axios'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getKeycloakLoginUrlFromHeaders, getKeycloakLogoutUrlFromHeaders,getPersonKeyFromToken } from '@/utils/keycloak'

import type { PersonResponse } from './person.types'

export async function getPersonServer(): Promise<PersonResponse> {
  const cookieStore = cookies()
  const idToken = cookieStore.get('keycloak-id-token')?.value
  const token = cookieStore.get('keycloak-token')?.value

  if (!idToken || !token) {
    redirect(getKeycloakLoginUrlFromHeaders(headers()))
  }

  const personKey = getPersonKeyFromToken(token)
  if (!personKey) {
    redirect(getKeycloakLoginUrlFromHeaders(headers()))
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
    const response = await axios.get<PersonResponse>(`${apiUrl}/person/${personKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (_error) {    
    redirect(getKeycloakLogoutUrlFromHeaders(idToken, headers()))
  }
}

