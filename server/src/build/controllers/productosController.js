"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductosController {
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM productos WHERE producto_id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.json(false);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT producto_id, producto_descripcion, producto_precio, producto_existencia, producto_estado, carrera_nombre, usuario_nombre, usuario_apellidos FROM productos_usuarios LEFT JOIN usuarios ON id_usuario = usuarios.usuario_id LEFT JOIN productos ON id_producto = productos.producto_id LEFT JOIN carreras ON productos.id_carrera_p = carreras.carrera_id');
                res.json(respuesta);
            }
            catch (_a) {
                res.json(false);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield database_1.default.query("INSERT INTO productos set ?", [req.body]);
                res.json(resp);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE productos set ? WHERE producto_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM productos WHERE producto_id = ?", [id]);
            res.json(resp);
        });
    }
    listByCareer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carrera_id } = req.params;
            try {
                const respuesta = yield database_1.default.query('SELECT * from productos WHERE id_carrera_p = ?', [carrera_id]);
                res.json(respuesta);
            }
            catch (_a) {
                res.json(false);
            }
        });
    }
}
exports.productosController = new ProductosController();
