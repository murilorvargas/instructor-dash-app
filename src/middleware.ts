import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getKeycloakLoginUrlFromRequest, hasInstructorDashRole } from '@/utils/keycloak'



export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const publicRoutes = ['/login', '/cadastro', '/callback']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  const idToken = request.cookies.get('keycloak-id-token')?.value
  const token = request.cookies.get('keycloak-token')?.value
  
  if (!idToken || !token) {
    return NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
  }

  let payload: any
  try {
    payload = JSON.parse(atob(token.split('.')[1]))
  } catch (_error) {
    const response = NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
    response.cookies.delete('keycloak-token')
    return response
  }
  const exp = payload.exp * 1000
  if (Date.now() >= exp) {
    const response = NextResponse.redirect(getKeycloakLoginUrlFromRequest(request))
    response.cookies.delete('keycloak-token')
    return response
  }

  if (pathname === '/cadastro-instrutor') {
    return NextResponse.next()
  }

  if (!hasInstructorDashRole(token)) {
    return NextResponse.redirect(new URL('/cadastro-instrutor', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
