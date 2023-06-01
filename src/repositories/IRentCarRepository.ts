import { RentCar } from "entities/RentCar";

export interface IRentCarRepository {
  rentCar(data: RentCar): Promise<void>

  getRentedCar(id: string): Promise<RentCar | null>

  getRentedCars(): Promise<RentCar[]>
}