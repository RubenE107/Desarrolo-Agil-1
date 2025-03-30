export class Producto{
    producto_id: number;
    producto_descripcion: string;
    producto_precio: number;
    producto_existencia: number;
    producto_estado: number;
    carrera_nombre: string;
    usuario_nombre: string;
    usuario_apellidos: string;

    constructor() {
        this.producto_id = 1;
        this.producto_descripcion = '';
        this.producto_precio = 1;
        this.producto_existencia = 1;
        this.producto_estado = 1;
        this.carrera_nombre = '';
        this.usuario_nombre = '';
        this.usuario_apellidos = '';
    }
}
