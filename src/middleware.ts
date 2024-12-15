import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that unauthenticated users can access
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/products(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the current route is public
  if (isPublicRoute(req)) {
    return;
  }

  // For protected routes, ensure the user is authenticated
  await auth.protect();
});

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
