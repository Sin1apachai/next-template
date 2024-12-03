import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const dataSignIn = await request.json();
        const hashedPassword = bcrypt.hashSync(dataSignIn.password, 10);

        const user = await prisma.resUsers.create({
            data: {
                email: dataSignIn.email,
                password: hashedPassword,
                name: dataSignIn.name,
                role: dataSignIn.role || 'member',
            },
        });
        return Response.json({ message: 'User created', user });
    } catch (error) {
        return Response.json({ error: 'User could not be created' });
    }
}
