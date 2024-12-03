import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const pathname = request.nextUrl.pathname;

    if (!token && pathname === '/web/login') {
        return NextResponse.next();
    }

    if (!token && pathname !== '/web/login') {
        const loginUrl = new URL('/web/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/web/:path*'],
};
