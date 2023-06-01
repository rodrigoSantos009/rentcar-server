export class CarError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Car Error"
  }

  public static CarAlreadyExists() {
    return new CarError('Modelo de carro já existe')
  } 

  public static CarNotFound() {
    return new CarError('Carro não encontrado!')
  }
}