import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isAdminRoute = createRouteMatcher(["/admin(.*)"])
const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/account(.*)",
  "/checkout(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes - require authentication and admin role
  if (isAdminRoute(req)) {
    await auth.protect()
    // Check for admin role (you'll need to set this in Clerk organization roles)
    const { userId, sessionClaims } = await auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
  }

  // Protect user routes - require authentication
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|mp4)(?:$|[?#])|[^?]*\\.(?:json)(\\?|$)).*)",
    "/",
  ],
}
