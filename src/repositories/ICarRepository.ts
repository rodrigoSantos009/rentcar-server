import { Car } from "entities/Car";

export interface ICarRepository {
  saveCar(car: Car): Promise<void>

  addImageToCar(image: string, carId: string): Promise<void>

  getCarByModel(model: string): Promise<Car | null>

  getCars(): Promise<Car[]>

  getCarById(id: string): Promise<Car | null>

  deleteCar(id: string): Promise<void>
}