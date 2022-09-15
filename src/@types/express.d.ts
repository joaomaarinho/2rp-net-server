import { Funcionario } from "../entities/Funcionario";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Funcionario>
        }
    }
}