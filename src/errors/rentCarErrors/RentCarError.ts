export class RentCarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RentCarError";
  }

  public static CarAlreadyRentedError() {
    return new RentCarError('Carro já está alugado!');
  }

  public static UserNotFoundError() {
    return new RentCarError('Usúario não encontrado!');
  }
}
