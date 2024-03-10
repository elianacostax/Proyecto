import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { MinLength, IsNotEmpty } from "class-validator"
import * as bcrypt from "bcryptjs"

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(5)
    name: string;

    @Column()
    @MinLength(5)
    lastname: string;

    @Column()
    @MinLength(5)
    email: string;

    @Column()
    @MinLength(5)
    faculty: string;

    @Column()
    phone: string;

    @Column()
    @MinLength(5)
    password: string;

    @Column()
    @IsNotEmpty()
    rol: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    //Encriptar contraseña
    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    //Verificar contraseña con la BD
    checkPassword(password:string):boolean{
    return bcrypt.compareSync(password, this.password)
    }
}
