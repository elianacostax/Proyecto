import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source"

export const checkRole = (roles:Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        const {id} = res.locals.jwtPayload;
        const userRepository = AppDataSource.getRepository(User);

        let user: User;

        try {
            user = await userRepository.findOneBy(id)
        } catch (e) {
            return res.status(401).json({message: 'No autorizado' })
        }

        //Verificar si el rol coincide

        const {rol} = user;

        if (roles.includes(rol)) {
            next();
        }else{
            res.status(401).json({message: 'No autorizado' })
        }
    }
}