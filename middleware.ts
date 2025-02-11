import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/add-blog", "/user-dashboard"]);
const isAdminRoute = createRouteMatcher(["/admin-dashboard"]);

// Utility function to remove trailing spaces
function removeTrailingSpaces(str: string | null | undefined): string {
  return str ? str.trim() : "";
}

// Get Clerk Admin ID from environment variables and trim spaces
const ClerkAdminId = process.env.NEXT_PUBLIC_CLERK_ADMIN_ID;

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const userIdfromClerk = removeTrailingSpaces(userId);

  // console.log("userIdfromClerk:", `${userIdfromClerk}`);
  // console.log("ClerkAdminId:", `${ClerkAdminId}`);
  // console.log(userIdfromClerk === ClerkAdminId); // Strict comparison

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Restrict admin access to a specific user
  if (userIdfromClerk !== ClerkAdminId && isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all pages except static assets
};
