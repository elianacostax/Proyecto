import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source"
import { Request, Response } from "express";
import { User } from "../entity/User";
import { json } from "stream/consumers";
import config from "../config/config";
import * as jwt from 'jsonwebtoken';
import { validate } from "class-validator";


class AuthController{
    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body;

        if(!(email && password)){
           return res.status(400).json({message: 'Username y password are required!'});
        }
            const userRepository = AppDataSource.getRepository(User);
            let user: User;

            try {
                user = await userRepository.findOneOrFail({ where:{email}}); 
            } catch (e) {
                return res.status(400).json({message: 'username or password incorrect'})
            }

            //Verificar password
            if (!user.checkPassword(password)) {
                return res.status(400).json({message: 'Usuario o clave incorrecto'})
            }

            const token = jwt.sign({id: user.id, email: user.email}, config.jwSecret, {expiresIn: '1h'})
            res.json({message: 'OK', token})
    }  
    
    static changePassword = async (req: Request, res: Response)=>{

        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;

        if (!(oldPassword && newPassword)) {
            res.status(408).json({message: ' Contraseña anterior y nueva es requerida '})
        }

        const userRepository  = AppDataSource.getRepository(User);
        let user : User;
        try {
            user = await userRepository.findOneOrFail(userId);
        } catch (e) {
            res.status(400).json({message: 'Error'})
        }
        
        if (! user.checkPassword(oldPassword)) {
            res.status(401).json({message: ' Contraseña anterior es incorrecta '})
        }

        user.password = newPassword;
        const validationOpt ={validationError:{target:false, value: false}};
        const errors = await validate(user, validationOpt);

        if (errors.length > 0) {
            res.status(400).json(errors)
        }

        //Hash Pass
        user.hashPassword();
        userRepository.save(user);

        res.json({message:'Contraseña cambiada'})
    }
}
export default AuthController;