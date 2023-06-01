export class UserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UserError"
  }

  public static UserAlreadyExists() {
    return new UserError('Usúario já existe!');
  }

  public static UserNotFound() {
    return new UserError('Email ou senha incorretos!')
  }
} 