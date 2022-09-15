import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      phone,
      matricula,
      position,
      description,
      isActive,
    } = req.body;

    const emailExists = await userRepository.findOneBy({ email });
    if (emailExists) {
      throw new BadRequestError("Email ja cadastrado");
    }
    const matriculaExists = await userRepository.findOneBy({ matricula });
    if (matriculaExists) {
      throw new BadRequestError("Matricula ja cadastrada");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      phone,
      matricula,
      position,
      password: hashedPassword,
      description,
      isActive,
    });

    await userRepository.save(newUser);

    console.log(newUser);
    console.log("error2");
    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { id: user.id, email },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "24h" }
    );

    const { password: _, ...userLogin } = user;

    return res
      .json({
        user: userLogin,
        token: token,
      })
      .header("Authorization", "Bearer " + token);
  }

  async getProfile(req: Request, res: Response) {
    const token = req.header("Authorization")?.split(" ")[1];

    return res.json(req.user);
  }

  async logout(req: Request, res: Response) {
    return res.header("Authorization", "");
  }
}
