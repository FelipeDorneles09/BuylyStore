import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definindo as rotas públicas, incluindo qualquer path
const isPublicRoute = createRouteMatcher([
  "/:path*",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
  // Se não for uma rota pública, aplica a proteção de autenticação
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
