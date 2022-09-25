import express from "express";
import config from "./config";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.routes"

const app = express()

//Configuracion
app.set('port', config.port)

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use(usersRoutes)

export default app