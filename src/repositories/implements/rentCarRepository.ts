import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { RentCar } from "entities/RentCar";
import { IRentCarRepository } from "repositories/IRentCarRepository";

export class RentCarRepository implements IRentCarRepository {
  constructor(
    private prisma: PrismaClient  
  ) {}

  async rentCar(data: RentCar): Promise<void> {
    await this.prisma.rentals.create({
      data: {
        rented_at: data.rented_at,    
        returned_at: data.returned_at,
        user: {
          connect: {
            id: data.user_id
          },      
        },
        car: {
          connect: {
            id: data.car_id
          }
        }
      }
    })

    await this.prisma.car.update({
      where: {
        id: data.car_id
      },
      data: {
        available: false
      }
    })

    const today = dayjs().startOf('day').toDate()
    const returnCar = dayjs(data.returned_at).toDate()

    if(today === returnCar) {
      await this.prisma.car.update({
        where: {
          id: data.car_id
        },
        data: {
          available: true
        }
      })
    }
  }

  async getRentedCar(id: string): Promise<RentCar | null> {
    return await this.prisma.rentals.findUnique({
      where: {
        id
      }
    })
  }

  async getRentedCars(): Promise<RentCar[]> {
    return await this.prisma.rentals.findMany()
  }
}