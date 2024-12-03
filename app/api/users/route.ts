import { PrismaClient } from "@prisma/client";
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalItems = await prisma.resUsers.count();
    const users = await prisma.resUsers.findMany({
      skip: skip,
      take: limit,
    });
    const totalPages = Math.ceil(totalItems / limit);

    return new Response(
      JSON.stringify({ users, totalItems, totalPages, currentPage: page }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}