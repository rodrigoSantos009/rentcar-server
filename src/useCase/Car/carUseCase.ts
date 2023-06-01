import { CarError } from "../../errors/CarErrors/CarError";
import { Car } from "../../entities/Car";
import { ICarRepository } from "../../repositories/ICarRepository";
import { ICarDTO } from "./carDTO";

export class CarUseCase {
  constructor(
    private carRepository: ICarRepository
  ) {}

  async execute(data: ICarDTO) {
    const carAlreadyExists = await this.carRepository.getCarByModel(data.model)

    if(carAlreadyExists) {
      throw CarError.CarAlreadyExists()
    }

    const car = new Car(
      data.model,
      data.year,
      data.doors,
      data.passengers,
      data.rentalPrice,
      data.available
    )

    await this.carRepository.saveCar(car)
  }
  async addImageToCar(image: string, carId: string): Promise<void> {
    const carExists = await this.carRepository.getCarById(carId)

    if(!carExists) {
      throw CarError.CarNotFound()
    }

    await this.carRepository.addImageToCar(image, carId)
  }

  async getCarByModel(model: string): Promise<Car | null> {
    const car =  await this.carRepository.getCarByModel(model)

    if(!car) {
      throw CarError.CarNotFound()
    }

    return car
  }

  async getCars(): Promise<Car[]> {
    const cars = await this.carRepository.getCars()

    return cars
  }

  async getCarById(id: string): Promise<Car | null> {
    const car = await this.carRepository.getCarById(id)

    if(!car) {
      throw CarError.CarNotFound()
    }

    return car
  }

  async deleteCar(id: string) {
    await this.carRepository.deleteCar(id)
  }
}