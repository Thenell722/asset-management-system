import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";


export async function POST(request) {

  const data = await request.json();


  const user = await prisma.user.findUnique({
    where:{
      email:data.email
    }
  });


  if(!user){

    return Response.json(
      {
        message:"Invalid credentials"
      },
      {
        status:401
      }
    );

  }


  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password
  );


  if(!passwordMatch){

    return Response.json(
      {
        message:"Invalid credentials"
      },
      {
        status:401
      }
    );

  }


  const token = crypto.randomUUID();


  await prisma.session.create({

    data:{
      token,
      userId:user.id,
      expiresAt:new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 7
      )
    }

  });


  const cookieStore = await cookies();


  cookieStore.set(
    "session",
    token,
    {
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      maxAge:60 * 60 * 24 * 7,
      path:"/"
    }
  );


  return Response.json({

    message:"Login successful"

  });

}