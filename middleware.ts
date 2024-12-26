import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhance middleware with custom logic
export default withMiddlewareAuthRequired(
  async (req: NextRequest) => {
    try {
      const res = NextResponse.next();
      const session = await getSession(req, res);
      
      // You can add custom logic here, for example:
      // - Check user roles
      // - Add custom headers
      // - Implement rate limiting
      // - Log access attempts
      
      if (session) {
        // Add user info to request headers if needed
        res.headers.set('x-user-email', session.user.email || '');
        return res;
      }

      // If no session, redirect to login
      return NextResponse.redirect(new URL('/api/auth/login', req.url));
    } catch (error) {
      console.error('Middleware error:', error);
      // Redirect to error page or home page in case of error
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
);

export const config = {
  matcher: [
    // Protected routes
    '/setting/:path*',
    '/api/protected/:path*',
    
    // Exclude authentication endpoints and public routes
    //'/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ]
}; 