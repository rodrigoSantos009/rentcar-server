import { User } from "../entities/User";

export interface IUserRepository {
  saveUser(user: User): Promise<void>

  getUserByEmail(email: string): Promise<User | null>

  getUserById(id: string): Promise<User | null>

  getUsers(): Promise<User[]>
}