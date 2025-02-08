import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/add-blog", "/user-dashboard"]);
const isAdminRoute = createRouteMatcher(["/admin-dashboard"]);
const ClerkAdminId = process.env.NEXT_PUBLIC_CLERK_ADMIN_ID || '' ;


export default clerkMiddleware(async (auth, req) => {
  const {userId} = await auth()
  console.log(userId, ClerkAdminId)
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Restrict admin access to a specific user
  if (userId !== ClerkAdminId && isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  }
);

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all pages except static assets
};
