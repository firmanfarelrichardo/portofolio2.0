import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = nextUrl.pathname.startsWith("/login")
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard")

  if (isApiAuthRoute) {
    return
  }

  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl))
    }
    return
  }

  if (!isLoggedIn && isDashboardRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  return
})

// Konfigurasi Matcher (Agar middleware tidak berjalan di file statis/gambar)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}