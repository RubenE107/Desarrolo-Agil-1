"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
class Server {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use(express_1.default.static(__dirname + "/imagenes"));
    }
    config() {
        this.app.use(express_1.default.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.set('port', process.env.ALPORT || 3002);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //this.app.set('port',process.env.ALTPORT|| 3002);//Se usa el puerto 3000 o el que se le asigne
        //this.app.use(morgan('dev'));//Se usa morgan para ver las peticiones que se hacen al servidor
        //this.app.use(cors());//Se usa cors para que angular pueda acceder al servidor
        //this.app.use(express.json());//Se usa express para que el servidor pueda entender json
        //this.app.use(express.urlencoded({extended: false}));//Se usa express para que el servidor pueda entender los datos que se le envian desde un formulario
    }
    routes() {
        this.app.post('/uploadImagen', (req, res) => {
            console.log("upload image");
            const file = req.body.src;
            const id = req.body.id;
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary');
            fs_1.default.writeFile(`${__dirname}/imagenes/` + '/' + id + '.jpg', binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: id + '.jpg' });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port')); //Muestra un mensaje en consola
        });
    }
}
//Script
const server = new Server();
server.start();
