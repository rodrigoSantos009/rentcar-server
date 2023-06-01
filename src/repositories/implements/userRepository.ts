import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

import { PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaClient
  ) {}

  async saveUser(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }
}