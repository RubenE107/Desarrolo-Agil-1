import { Router } from 'express';
import { productosController } from '../controllers/productosController';

class ProductosRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        this.router.get('/', productosController.list);
        this.router.get('/:id', productosController.listOne);
        this.router.post('/nuevo', productosController.create);
        this.router.put('/actualizar/:id',productosController.update);
        this.router.delete('/eliminar/:id',productosController.delete);
        }
}

const productosRoutes= new ProductosRoutes();
export default productosRoutes.router;