import prisma from "@/app/libs/prismadb"
import{NextResponse} from 'next/server'
import { getCurrentUser } from "@/session/getServerSession"
export async function POST(
    request:Request
) {
    const body = await request.json()
    const currentUser = await getCurrentUser()
    const{
        YOM,
        availability,
        drive,
        mileage,
        engineSize,
        fuelType,
        HP,
        transmission,
        torque,
        aspiration,
        acceleration,
        make,
        image,
        seller,
        estimatedArrival,
        price,
        type,
        
    }= body

    try {

        const res = await prisma.car.create({
            data:{
                
                YOM,
                availability,
                drive,
                mileage:parseInt(mileage,10),
                engineSize,
                fuelType,
                HP,
                transmission,
                torque,
                aspiration,
                acceleration,
                make,
                model,
                image,
                seller,
                estimatedArrival,
                userId:currentUser?.id
            }
        })
        NextResponse.json(res)
        
    } catch (error) {
        return NextResponse.error()
    }
}