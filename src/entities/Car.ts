export class Car {
  constructor(
    public model: string,
    public year: number,
    public doors: number,
    public passengers: number,
    public rentalPrice: number,
    public available: boolean
  ) {}
}