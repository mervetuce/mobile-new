import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = checkAuth(request)

  // If not authenticated and trying to access admin routes (except login/reset)
  if (!isAuthenticated && !request.nextUrl.pathname.match(/\/admin\/(auth\/login|auth\/reset-password)/)) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/admin/auth/login", request.url))
  }

  // If authenticated and trying to access login/reset pages
  if (isAuthenticated && request.nextUrl.pathname.match(/\/admin\/(auth\/login|auth\/reset-password)/)) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

// This function would check for authentication tokens, cookies, etc.
function checkAuth(request: NextRequest): boolean {
  // In a real app, you would check for auth tokens, session cookies, etc.
  // For this example, we'll just return false to simulate an unauthenticated user
  return false
}

export const config = {
  matcher: ["/admin/:path*"],
}

