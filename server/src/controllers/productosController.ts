import {Request,Response} from 'express';
import pool from '../database';

class ProductosController
{
    public async listOne(req: Request, res: Response) : Promise <void> {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM productos WHERE producto_id = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]);
            return ;
        }
        res.json(false);
    }

    public async list(req: Request, res: Response ) : Promise<void> {
        try
        {
            const respuesta = await pool.query(
            'SELECT producto_id, producto_descripcion, producto_precio, producto_existencia, producto_estado, carrera_nombre, usuario_nombre, usuario_apellidos FROM productos_usuarios LEFT JOIN usuarios ON id_usuario = usuarios.usuario_id LEFT JOIN productos ON id_producto = productos.producto_id LEFT JOIN carreras ON productos.id_carrera_p = carreras.carrera_id');
            res.json( respuesta );
        }
        catch
        {
            res.json(false);
        }
    }

    public async create(req: Request, res: Response) : Promise<void> {
        try{
            const resp = await pool.query("INSERT INTO productos set ?", [req.body]);
            res.json(resp);
        }
        catch(error)
        {
            res.json(error);
        }
    }

    public async update(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE productos set ? WHERE producto_id = ?", [req.body, id]);
        res.json(resp);
    }

    public async delete(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("DELETE FROM productos WHERE producto_id = ?", [id]);
        res.json(resp);
    }

    public async listByCareer(req: Request, res: Response) : Promise<void> {
        const { carrera_id } = req.params;
        try
        {
            const respuesta = await pool.query('SELECT * from productos WHERE id_carrera_p = ?', [carrera_id]);
            res.json( respuesta );
        }
        catch
        {
            res.json(false);
        }
    }

    public async listByFilters(req: Request, res: Response) : Promise<void> {//filtros por estado, precio, existencia Ya funciona
        const { filtro,valor } = req.body;//filtros por estado, precio, existencia
        let consulta = `SELECT * FROM productos WHERE producto_${filtro}`;
        try{
        if (filtro === 'estado')
        {
            consulta+= ` = '${valor}'`;
            const respuesta = await pool.query(consulta);
            res.json(respuesta);
        }
        else if (filtro === 'precio')
        {
            consulta+= `>= ${valor}`;
            const respuesta = await pool.query(consulta);
            res.json(respuesta);
        }
        else if(filtro === 'existencia')
        {
            consulta+= `>= ${valor}`;
            console.log(consulta);
            const respuesta = await pool.query(consulta);
            res.json(respuesta);
        }
    }
    catch (e)
    {
        console.log(e);
        res.json(false);
    }
}
}

export const productosController = new ProductosController();