import { Request, Response } from "express";
import { UserUseCase } from "./userUseCase";

export class UserController {
  constructor(
    private userUseCase: UserUseCase  
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      const user = await this.userUseCase.execute({
      name, 
      email,
      password
    })

    return res.status(201).json(user)
    } catch(e) {
      return res.status(400).json()
    }
  }  

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const userAuthenticate = await this.userUseCase.authenticate(
        email, 
        password
      )

      return res.status(200).json(userAuthenticate)
    } catch(e) {
      console.error(e)
      return res.status(400).json({ e })
    }
  }

  async getPerfil(req: Request, res: Response) {
    try {
      return res.status(200).json(req.user)
    } catch(e) {
      return res.status(400).json()
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userUseCase.getUsers()

      return res.status(200).json(users)
    } catch(e) {
      return res.status(400).json()
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const user = await this.userUseCase.getUserById(id)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const { password:_, ...rest } = user

      return res.status(200).json(rest)
    } catch(e) {
      return res.status(400).json({ e })
    }
  }
}