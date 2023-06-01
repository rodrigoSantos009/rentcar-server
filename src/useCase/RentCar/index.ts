import { PrismaClient } from "@prisma/client";

import { userRepository, userUseCase } from "../User";
import { carRepository, carUseCase } from "../Car";

import { RentCarRepository } from "../../repositories/implements/rentCarRepository";
import { RentCarController } from "./rentCarController";
import { RentCarUseCase } from "./rentCarUseCase";

const prisma = new PrismaClient()

const rentCarRepository = new RentCarRepository(
  prisma
)

const rentCarUseCase = new RentCarUseCase(
  rentCarRepository,
  carRepository,
  userRepository
)

const rentCarController  = new RentCarController(
  rentCarUseCase,
)

export { rentCarUseCase, rentCarController }