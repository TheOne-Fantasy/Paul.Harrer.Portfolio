import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On ne s'occupe que de la route /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');

    // Si pas de cookie, on redirige vers /login
    if (!session || session.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Config pour ne faire tourner ce middleware que sur /admin
export const config = {
  matcher: '/admin/:path*',
};
