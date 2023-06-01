import { Request, Response } from "express";
import { CarUseCase } from "./carUseCase";

type ImageFile = string

export class CarController {
  constructor(
    private carUseCase: CarUseCase  
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { model, 
      year,
      doors,
      passengers,
      rentalPrice,
      available 
    } = req.body

    try {
      const car = await this.carUseCase.execute({
      model, 
      year,
      doors,
      passengers,
      rentalPrice,
      available
    })

    return res.status(201).json(car)
    } catch(e) {
      return res.status(400).json()
    }
  }  

  async addImageToCar(req: Request, res: Response) {
    const image = req.file?.filename as ImageFile
    const carId = req.params.id

    try {
      await this.carUseCase.addImageToCar(image, carId)
      return res.status(201).json()
    } catch(e) {
      console.error(`Failed to add image ${image} to car with ID ${carId}: ${e}`)
      return res.status(400).json({ e })
    }
  }

  async getCar(req: Request, res: Response) {
    const { model } = req.body

    try {
      const car = await this.carUseCase.getCarByModel(model)

      return res.status(200).json(car)
    } catch(e) {
      return res.status(400).json()
    }
  }

  async getCarById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const user = await this.carUseCase.getCarById(id)

      return res.status(200).json(user)
    } catch(e) {
      return res.status(400).json({ e })
    }
  }

  async getCars(req: Request, res: Response) {
    try {
      const cars = await this.carUseCase.getCars()
      
      return res.status(200).json(cars)
    } catch(e) {
      return res.status(400).json()
    }
  }

  async deleteCar(req: Request, res: Response) {
    const { id } = req.params

    try {
      await this.carUseCase.deleteCar(id)

      return res.status(200).json()
    } catch(e) {
      return res.status(400).json({ e })
    }
  }
}