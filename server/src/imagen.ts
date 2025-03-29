import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

class Server {
    public app: Application;//Se crea una variable app de tipo Application

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname + "/imagenes"));
    }

    config(): void {//Se configura el puerto
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.set('port', process.env.ALPORT || 3002);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: false }));

        //this.app.set('port',process.env.ALTPORT|| 3002);//Se usa el puerto 3000 o el que se le asigne
        //this.app.use(morgan('dev'));//Se usa morgan para ver las peticiones que se hacen al servidor
        //this.app.use(cors());//Se usa cors para que angular pueda acceder al servidor
        //this.app.use(express.json());//Se usa express para que el servidor pueda entender json
        //this.app.use(express.urlencoded({extended: false}));//Se usa express para que el servidor pueda entender los datos que se le envian desde un formulario
    }

    routes(): void {
        this.app.post('/uploadImagen', (req, res) => {
            console.log("upload image")
            const file = req.body.src;
            const id = req.body.id;
            const binaryData =
                Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""),
                    'base64').toString('binary');
            fs.writeFile(`${__dirname}/imagenes/` +  '/' + id + '.jpg', binaryData,
                "binary", (err) => {
                    console.log(err);
                });
            res.json({ fileName: id + '.jpg' });
        });
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {//Escucha continuamente el puerto que se le asigno
            console.log('Server on port', this.app.get('port'));//Muestra un mensaje en consola
        });
    }
}

//Script
const server = new Server();
server.start();