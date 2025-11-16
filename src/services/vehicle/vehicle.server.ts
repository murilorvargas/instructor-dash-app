import axios from 'axios'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getKeycloakLoginUrlFromHeaders, getKeycloakLogoutUrlFromHeaders, getPersonKeyFromToken, hasInstructorDashRole } from '@/utils/keycloak'

import type { InstructorVehicleResponse } from './vehicle.types'

export async function getAllVehiclesServer(
  instructorKey: string
): Promise<InstructorVehicleResponse[]> {
  const cookieStore = cookies()
  const idToken = cookieStore.get('keycloak-id-token')?.value
  const token = cookieStore.get('keycloak-token')?.value

  if (!idToken || !token) {
    redirect(getKeycloakLoginUrlFromHeaders(headers()))
  }

  if (!hasInstructorDashRole(token)) {
    redirect('/cadastro-instrutor')
  }

  const personKey = getPersonKeyFromToken(token)
  if (!personKey) {
    redirect(getKeycloakLoginUrlFromHeaders(headers()))
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
    const response = await axios.get<InstructorVehicleResponse[]>(
      `${apiUrl}/person/${personKey}/instructor/${instructorKey}/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (_error: any) {
    redirect(getKeycloakLogoutUrlFromHeaders(idToken, headers()))
  }
}

