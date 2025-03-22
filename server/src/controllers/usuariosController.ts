import {Request,Response} from 'express';
import pool from '../database';

class UsuariosController
{
    public async listOne(req: Request, res: Response) : Promise <void> {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id]);
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
            const respuesta = await pool.query('SELECT * from usuarios');
            res.json( respuesta );
        }
        catch
        {
            res.json(false);
        }
    }

    public async create(req: Request, res: Response) : Promise<void> {
        try{
            const resp = await pool.query("INSERT INTO usuarios set ?",[req.body]);
            res.json(resp);
        }
        catch(error)
        {
            res.json(error);
        }
    }

    public async update(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE usuarios set ? WHERE usuario_id = ?", [req.body, id]);
        res.json(resp);
    }

    public async delete(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("DELETE FROM usuarios WHERE usuario_id =?",[id]);
        res.json(resp);
    }
}

export const usuariosController = new UsuariosController();