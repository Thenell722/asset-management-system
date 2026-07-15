import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request){

    const data = await request.json();


    const existingUser = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });


    if(existingUser){

        return Response.json(
            {
                message:"User already exists"
            },
            {
                status:400
            }
        );

    }


    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );


    const user = await prisma.user.create({

        data:{
            name:data.name,
            email:data.email,
            password:hashedPassword
        }

    });


    return Response.json(user);

}