export class RentCar {
  constructor(
    public rented_at: Date,
    public returned_at: Date | null,
    public user_id: string,
    public car_id: string
  ) {}
}
