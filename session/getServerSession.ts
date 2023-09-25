
import { getServerSession } from "next-auth";
import prisma from '@/app/libs/prismadb'
export async function getSession() {
    return await getServerSession()
}


export async function getCurrentUser() {
    const session = await getServerSession()
    if(!session){
        return null
    }

    try {
        const currentUser  = await prisma.user.findUnique({
            where:{
                email:session.user?.email as string
            }
        })

        if(!currentUser){
            return null
        }

        return currentUser
        
    } catch (error) {
        return null
    }
}