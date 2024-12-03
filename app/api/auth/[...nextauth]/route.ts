import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'admin@companyinfo.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(
                credentials: Record<string, string> | undefined,
                req
            ): Promise<{ id: string; name: string; email: string; role: string } | null> {
                if (!credentials) return null;
                const user = await prisma.resUsers.findUnique({
                    where: { email: credentials.email },
                });
                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } else {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
