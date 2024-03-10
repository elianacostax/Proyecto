import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";


const router = Router();

//Consultar todos los usuarios
router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

//Consultar un solo usuario
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

//Crear un nuevo usuario
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

//editar usuario
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);

//Eliminar usuario
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;
