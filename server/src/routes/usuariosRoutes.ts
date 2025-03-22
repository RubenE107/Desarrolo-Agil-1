import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

class UsuariosRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        this.router.get('/', usuariosController.list);
        this.router.get('/:id', usuariosController.listOne);
        this.router.post('/nuevo', usuariosController.create);
        this.router.put('/actualizar/:id', usuariosController.update);
        this.router.delete('/eliminar/:id', usuariosController.delete);
        }
}

const usuariosRoutes= new UsuariosRoutes();
export default usuariosRoutes.router;