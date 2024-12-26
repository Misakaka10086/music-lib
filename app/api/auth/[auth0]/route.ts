import { handleAuth } from '@auth0/nextjs-auth0';

// Note: The Next.js warning about `params.auth0` can be safely ignored
// as the Auth0 SDK handles the dynamic route parameters internally
export const GET = handleAuth(); 