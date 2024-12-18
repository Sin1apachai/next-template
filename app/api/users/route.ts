import { db } from '@/db';
import { res_users } from '@/db/schema';
import { ResUsersModel } from '@/models/res_users';

export async function GET() {
    try {
        const allUsers = await db.select().from(res_users);
        return Response.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body: ResUsersModel = await request.json();
        if (!body.name || !body.email || !body.password) {
            return Response.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        console.log(body.password)
        const newUser = await db
            .insert(res_users)
            .values({ name: body.name, email: body.email, password: body.password })
            .returning();

        return Response.json(newUser[0], { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
