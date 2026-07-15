import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return Response.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: {
        token: sessionCookie.value,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return Response.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }

    return Response.json({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}