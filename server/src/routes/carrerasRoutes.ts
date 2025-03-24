import { Router } from 'express';
import { carrerasController } from '../controllers/carrerasController';

class CarrerasRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        this.router.get('/', carrerasController.list);
        this.router.get('/:id', carrerasController.listOne);
        this.router.post('/nuevo', carrerasController.create);
        this.router.put('/actualizar/:id', carrerasController.update);
        this.router.delete('/eliminar/:id', carrerasController.delete);
        }
}

const carrerasRoutes= new CarrerasRoutes();
export default carrerasRoutes.router;