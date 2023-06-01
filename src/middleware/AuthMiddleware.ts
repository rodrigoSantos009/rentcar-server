import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userUseCase } from "../useCase/User";

type JWTPayload = {
  email: string;
  exp: number;
};

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  try {
    const { email, exp } = jwt.verify(
      token,
      process.env.JWT_PASS ?? ""
    ) as JWTPayload;

    const user = await userUseCase.getUserByEmail(email);

    if (!user) {
      throw new Error("Não autorizado");
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;

    if (Date.now() >= exp * 10000) {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error("Não autorizado!");
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_PASS ?? ""
      ) as JWTPayload;

      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_PASS ?? "",
        { expiresIn: "15m" }
      );

      res.setHeader("Authorization", `Bearer ${accessToken}`);
    }

    next();
  } catch (e) {
    throw new Error("Não autorizado!");
  }
};
