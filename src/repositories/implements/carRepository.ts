import { PrismaClient } from "@prisma/client";
import { Car } from "entities/Car";
import { ICarRepository } from "repositories/ICarRepository";

export class CarRepository implements ICarRepository {
  constructor(
    private prisma: PrismaClient  
  ) {}

  async saveCar(car: Car): Promise<void> {
    await this.prisma.car.create({
      data: {
        model: car.model,
        year: car.year,
        doors: car.doors,
        passengers: car.passengers,
        rentalPrice: car.rentalPrice,
        available: car.available
      }
    })
  }

  async addImageToCar(image: string, carId: string): Promise<void> {
    await this.prisma.carImage.create({
      data: {
        url: image,
        car: {
          connect: {
            id: carId
          }
        }
      }
    })
  }

  async getCarByModel(model: string): Promise<Car | null> {
    return await this.prisma.car.findFirst({
      where: {
        model
      }
    })
  }

  async getCars(): Promise<Car[]> {
    return await this.prisma.car.findMany({
      include: {
        car_image: true
      }
    })
  }

  async getCarById(id: string): Promise<Car | null> {
    return await this.prisma.car.findUnique({
      where: {
        id
      },
      include: {
        car_image: true
      }
    })
  }

  async deleteCar(id: string): Promise<void> {
    await this.prisma.car.delete({
      where: {
        id
      }
    })
  }
}