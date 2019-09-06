
import express from 'express';
import { Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
var admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert("aqui-debe-colocarse-tu-llave-admin-key.json"), //nombre y ubicacion del archivo json
    databaseURL: "https://nombre-de-tu-aplicacion.firebaseio.com"
    // mas info: https://www.arsys.es/blog/programacion/firebase-node-admin/
});
export class Server {
    public app: express.Application;
    public puerto: any;
    public conexion: any;
    /**
     *
     */
    constructor() {
        this.app = express();
        this.configureCors();
        this.puerto = process.env.PORT || 3000;
        this.configureBodyParser();
        this.routes();

    }
    configureCors() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
            res.header('Allow', 'GET, POST, DELETE');
            next();
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    connectFirebase() {
        var database = admin.database();
        var usersRef = database.ref("users");
        usersRef.set({
            alanisawesome: {
                date_of_birth: "June 23, 1912",
                full_name: "Alan Turing"
            },
            gracehop: {
                date_of_birth: "December 9, 1906",
                full_name: "Grace Hopper"
            },
            eduardoderivero: {
                date_of_birth:"August 01, 1992",
                full_name:"Eduardo de Rivero"
            }
        });

        // Para mas info visitar: https://firebase.google.com/docs/database/admin/save-data?hl=es-419
    }
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('La API/RESt ha escuchado tus suplicas :D');
        });
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo correctamente en el puerto ' + this.puerto);
            this.connectFirebase();
        });
    }

}