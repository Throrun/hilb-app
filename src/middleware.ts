import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};

export function middleware(request: NextRequest) {
    const cookiePassword = request.cookies.get("password")?.value;
    const isAuthenticated = cookiePassword === process.env.PASSWORD;
    const { pathname } = request.nextUrl;

    if (!pathname.endsWith("/login") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
