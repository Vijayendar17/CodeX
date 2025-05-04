import { NextResponse } from 'next/server'

export async function middleware(request) {
  const url = request.nextUrl.clone()
  const sessionToken = request.cookies.get('session_id')?.value

  // Redirect logged-in users away from login or intro page
  if (url.pathname === '/login' || url.pathname === '/intro') {
    if (sessionToken) {
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/intro',         
    '/home/:path*',
    '/api/:path*',
  ],
}
