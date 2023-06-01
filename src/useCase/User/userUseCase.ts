import { UserError } from "../../errors/userErrors/UserError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserDTO } from "./userDTO";

import bcrypt from  'bcrypt'
import jwt from 'jsonwebtoken'

export class UserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(data: IUserDTO) {
    const userAlreadyExists = await this.userRepository.getUserByEmail(data.email)

    if(userAlreadyExists) {
      throw UserError.UserAlreadyExists()
    }

    const hashPassword = await bcrypt.hash(data.password, 10)

    const user = new User(
      data.name,
      data.email,
      hashPassword  
    )

    await this.userRepository.saveUser(user)
  }

  async comparePassword(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)

    return result
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email)

    if(!user) {
      throw UserError.UserNotFound()
    } 

    const passwordMatch = await this.comparePassword(password, user.password)

    if(!passwordMatch) {
      throw UserError.UserNotFound()
    } 

    const token = jwt.sign({ email: user.email }, process.env.JWT_PASS ?? '', {expiresIn: '8h'})

    return token
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email)

    if(!user) {
      throw UserError.UserNotFound()
    }

    return user
  }

  async getUserById(id: string): Promise<User | null> {
    const user =  await this.userRepository.getUserById(id)

    if(!user) {
      throw new Error("Usuário não encontrado!")
    }

    return user
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUsers()

    return users
  }
}