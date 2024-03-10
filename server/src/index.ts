import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import * as cors from 'cors';
import  helmet from 'helmet';
import routes from "./routes";

const PORT  = process.env.PORT || 3000; 


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();

    //Middlewares
    app.use(cors());
    app.use(helmet());

    app.use(express.json())

    //Rutas
    app.use('/', routes);

    // start express server
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

    

}).catch(error => console.log(error))
