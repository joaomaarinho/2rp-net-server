import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

type JwtPayLoad = {
  id: number
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayLoad;

  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new UnauthorizedError("Não autorizado");
  }

  const { password, ...loggedUser } = user;

  req.user = loggedUser

  next();
};