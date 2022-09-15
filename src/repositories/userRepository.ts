import { AppDataSource } from "../data-source";
import { Funcionario } from "../entities/Funcionario";

export const userRepository = AppDataSource.getRepository(Funcionario)