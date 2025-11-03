import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { getKeycloakLoginUrlFromRequest } from '@/utils/keycloak'

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string | undefined,
}

function hasInstructorRole(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const clientRoles = payload.resource_access?.['instructor-dash']?.roles || []
  return clientRoles.includes('instructor')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
  }

  if (!code) {
    return NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
  }

  const redirectUri = `${request.nextUrl.origin}/callback`

  const tokenRequestBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    client_id: keycloakConfig.clientId,
    redirect_uri: redirectUri,
  })

  if (keycloakConfig.clientSecret) {
    tokenRequestBody.append('client_secret', keycloakConfig.clientSecret)
  }

  let tokenResponse
  try {
    tokenResponse = await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      tokenRequestBody.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
  } catch (_error: any) {
    return NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
  }

  if (!tokenResponse.data?.access_token) {
    return NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
  }

  const tokenData = tokenResponse.data

  const cookieStore = cookies()
  cookieStore.set('keycloak-id-token', tokenData.id_token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokenData.expires_in,
  })

  cookieStore.set('keycloak-token', tokenData.access_token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokenData.expires_in,
  })

  if (tokenData.refresh_token) {
    cookieStore.set('keycloak-refresh-token', tokenData.refresh_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  if (!hasInstructorRole(tokenData.access_token)) {
    return NextResponse.redirect(new URL('/cadastro-instrutor', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}

