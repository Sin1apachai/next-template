import { db } from '@/db'
import { res_users } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface UpdateUserBody {
  name?: string
  email?: string
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง id จาก string เป็น integer จาก parameter ที่รับเข้ามา
    const id = parseInt(params.id)

    // ดึงข้อมูล user จากฐานข้อมูล
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    // ถ้าไม่พบ user ให้ส่ง response แจ้ง error
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // ส่ง response กลับไปพร้อมข้อมูล
    return Response.json(user)
  } catch (error) {
    // จัดการกรณีเกิด error
    console.error('Error fetching user:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง id จาก string เป็น integer
    const id = parseInt(params.id)
    // รับข้อมูลที่ต้องการอัพเดทจาก request body
    const body: UpdateUserBody = await request.json()
    const { name, email } = body

    // ตรวจสอบว่ามีข้อมูลที่จะอัพเดทหรือไม่
    if (!name && !email) {
      return Response.json(
        { error: 'Name or email is required for update' },
        { status: 400 }
      )
    }

    // สร้าง object สำหรับเก็บข้อมูลที่จะอัพเดท
    const updateData: { name?: string; email?: string } = {}
    if (name) updateData.name = name
    if (email) updateData.email = email

    // อัพเดทข้อมูล user ในฐานข้อมูล
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning()

    // ถ้าไม่พบ user ให้ส่ง response แจ้ง error
    if (!updatedUser) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // ส่ง response กลับไปพร้อมข้อมูล user ที่อัพเดทแล้ว
    return Response.json(updatedUser)
  } catch (error) {
    // จัดการกรณีเกิด error
    console.error('Error updating user:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง id จาก string เป็น integer
    const id = parseInt(params.id)
    // ลบข้อมูล user จากฐานข้อมูล
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning()

    // ถ้าไม่พบ user ให้ส่ง response แจ้ง error
    if (!deletedUser) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // ส่ง response แจ้งว่าลบข้อมูลสำเร็จ
    return Response.json({ message: 'User deleted successfully' })
  } catch (error) {
    // จัดการกรณีเกิด error
    console.error('Error deleting user:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}