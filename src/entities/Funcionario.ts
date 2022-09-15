import { Column, Entity, MaxKey, MinKey, PrimaryGeneratedColumn } from "typeorm";
// import { IsEmail, MinLength, MaxLength } from "class-validator";

@Entity("funcionario")
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  // @IsEmail()
  email: string;

  @Column({ type: "varchar" })
  phone: number;

  @Column({ type: "varchar", unique: true })
  // @MaxLength(8)
  matricula: string;

  @Column({ type: "varchar" })
  position: string;

  @Column({ type: "varchar" })
  // @MinLength(12)
  password: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "boolean" })
  isActive: boolean;
}
