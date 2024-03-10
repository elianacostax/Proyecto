import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { error } from "console";

export class UserController {

   static getAll = async (req: Request, res: Response)=>{
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    if(users.length > 0){
        res.send(users);
    }else{
        res.status(404).json({message: 'not result'})
    }
   }

   static getById = async (req: Request, res:Response)=>{
    const id = req.params;
    const userRepository = AppDataSource.getRepository(User);
    try {
        const user = await userRepository.findOneBy(id);
        res.send(user)
    } catch (e) {
        res.status(404).json({message: 'not result'})
    }
   }

   static newUser = async (req: Request, res: Response)=>{
    const {name, lastname, email, faculty, phone, password, rol } = req.body;

    const user = new User();

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.faculty = faculty;
    user.phone = phone;
    user.password = password;
    user.rol = rol;

    //Validaciones
    const validationOpt =  {validationError:{target:false, value:false}};
    const errors = await validate(user, validationOpt);
    if(errors.length > 0){
        return res.status(400).json(errors)
    }

   
    const userRepository = AppDataSource.getRepository(User)
    try {
        user.hashPassword();
        await userRepository.save(user)
    } catch (e) {
        return res.status(409).json({message: 'Usuario ya existe'})
    }
    //Todo OK
    res.send('Usuario creado');
   }

   static editUser = async (req: Request, res:Response)=>{
    let user;
    const id = req.params;
    const {name, lastname, email, faculty, phone, password} = req.body;

    const userRepository = AppDataSource.getRepository(User);

    //Validacion usuario
    try {
        user = await userRepository.findOneBy(id);
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.faculty = faculty;
        user.phone = phone;
        user.password = password;
    } catch (e) {
        return res.status(404).json({message: 'Usuario no existe'})
    }
    const validationOpt =  {validationError:{target:false, value:false}};
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    //Try to save user
    try {
        await userRepository.save(user);
    } catch (e) {
        return res.status(409).json({message: 'usuario ya esta en uso'})
    }
    res.status(201).json({message: 'usuario actualizado'})
   }

   static deleteUser = async (req: Request, res:Response)=>{
   const id = req.params;
   const userRepository = AppDataSource.getRepository(User);
   let user:User;
   try {
    user = await userRepository.findOneBy(id);
   } catch (e) {
    return res.status(404).json({message: 'Usuario no existe'})
   }

   //Eliminar usuario

    userRepository.delete(id);
    res.status(201).json({message: 'Usuario eliminado'})
    }
}