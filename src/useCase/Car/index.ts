import { PrismaClient } from "@prisma/client";
import { CarRepository } from "../../repositories/implements/carRepository";
import { CarController } from "./carController";
import { CarUseCase } from "./carUseCase";

const prisma = new PrismaClient()

const carRepository = new CarRepository(
  prisma
)

const carUseCase = new CarUseCase(
  carRepository  
)

export const carController  = new CarController(
  carUseCase  
)

export { carUseCase, carRepository }