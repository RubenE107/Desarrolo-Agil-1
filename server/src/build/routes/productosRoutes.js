"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productosController_1.productosController.list);
        this.router.get('/:id', productosController_1.productosController.listOne);
        this.router.post('/nuevo', productosController_1.productosController.create);
        this.router.put('/actualizar/:id', productosController_1.productosController.update);
        this.router.delete('/eliminar/:id', productosController_1.productosController.delete);
        this.router.get('/carrera/:carrera_id', productosController_1.productosController.listByCareer);
        this.router.post('/filtrar', productosController_1.productosController.listByFilters);
        this.router.post('/create', productosController_1.productosController.create);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
