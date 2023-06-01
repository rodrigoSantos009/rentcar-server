import { ICarRepository } from "repositories/ICarRepository";
import { RentCar } from "../../entities/RentCar";
import { IRentCarRepository } from "../../repositories/IRentCarRepository";
import { IRentCarDTO } from "./rentCarDTO";
import { IUserRepository } from "repositories/IUserRepository";
//import { RentCarError } from "errors/rentCarErrors/RentCarError";
import { RentCarError } from "../../errors/rentCarErrors/RentCarError"

export class RentCarUseCase {
  constructor(
    private rentCarRepository: IRentCarRepository,
    private carRepository: ICarRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: IRentCarDTO) {
    const car = await this.carRepository.getCarById(data.car_id)

    const user = await this.userRepository.getUserById(data.user_id)

    if(!car?.available) {
      throw RentCarError.CarAlreadyRentedError()
    }

    if(!user) {
      throw RentCarError.UserNotFoundError()
    }

    const rentCar = new RentCar(
      data.rented_at,
      data.returned_at,
      data.user_id,
      data.car_id,
    )

    await this.rentCarRepository.rentCar(rentCar)
  }

  async getRentedCar(id: string) {
    const rentedCars = await this.rentCarRepository.getRentedCar(id)

    return rentedCars
  }

  async getRentedCars(): Promise<RentCar[]> {
    const rentedCars = await this.rentCarRepository.getRentedCars()

    console.log('rented cars:', rentedCars)
    
    return rentedCars
  }
}