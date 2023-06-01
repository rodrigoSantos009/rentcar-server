import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../repositories/implements/userRepository";
import { UserController } from "./userController";
import { UserUseCase } from "./userUseCase";

const prisma = new PrismaClient()

const userRepository = new UserRepository(
  prisma
)

const userUseCase = new UserUseCase(
  userRepository  
)

const userController  = new UserController(
  userUseCase  
)

export { userUseCase, userController, userRepository }