import { NextRequest } from "next/server"

export function hasInstructorDashRole(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const clientRoles = payload.resource_access?.['instructor-dash']?.roles || []
  return clientRoles.includes('instructor')
}

export function getPersonKeyFromToken(token: string): string {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload?.sub
}

export function getKeycloakLogoutUrl(): string {
  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string
  
  const callbackUrl = `${window.location.origin}/callback`
  const idToken = document.cookie.split('; ').find(row => row.startsWith('keycloak-id-token'))?.split('=')[1]
  const logoutUrl = new URL(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`)
  logoutUrl.searchParams.set('id_token_hint', idToken as string)
  logoutUrl.searchParams.set('post_logout_redirect_uri', callbackUrl)
  return logoutUrl.toString()
}

export function getKeycloakLogoutUrlFromHeaders(idToken: string, headers: Headers): string {
  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string
  
  const host = headers.get('host')
  const protocol = headers.get('x-forwarded-proto')
  const origin = `${protocol}://${host}`
  const callbackUrl = `${origin}/callback`
  const logoutUrl = new URL(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`)
  logoutUrl.searchParams.set('id_token_hint', idToken)
  logoutUrl.searchParams.set('post_logout_redirect_uri', callbackUrl)
  return logoutUrl.toString()
}

export function getKeycloakLoginUrl(): string {
  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string

  const loginUrl = new URL(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`)
  loginUrl.searchParams.set('client_id', clientId)
  loginUrl.searchParams.set('redirect_uri', `${window.location.origin}/callback`)
  loginUrl.searchParams.set('response_type', 'code')
  loginUrl.searchParams.set('scope', 'openid profile roles')
  return loginUrl.toString()
}

export function getKeycloakLoginUrlFromRequest(request: NextRequest): string {
  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string
  
  const loginUrl = new URL(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`)
  loginUrl.searchParams.set('client_id', clientId)
  loginUrl.searchParams.set('redirect_uri', `${request.nextUrl.origin}/callback`)
  loginUrl.searchParams.set('response_type', 'code')
  loginUrl.searchParams.set('scope', 'openid profile roles')
  
  return loginUrl.toString()
}

export function getKeycloakLoginUrlFromHeaders(headers: Headers): string {
  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL as string
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string
  const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string

  const host = headers.get('host')
  const protocol = headers.get('x-forwarded-proto')
  const origin = `${protocol}://${host}`

  const loginUrl = new URL(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`)
  loginUrl.searchParams.set('client_id', clientId)
  loginUrl.searchParams.set('redirect_uri', `${origin}/callback`)
  loginUrl.searchParams.set('response_type', 'code')
  loginUrl.searchParams.set('scope', 'openid profile roles')
  
  return loginUrl.toString()
}