import * as bodyParser from "body-parser";
import express from "express";
import { FlatController } from "./controller/flat.controller";
import 'dotenv/config'

class App {
    public express: express.Application;
    public flatController: FlatController;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.flatController = new FlatController();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.get('/api/flats', (req, res) => {
            this.flatController.getFlats().then((data: any) => res.json(data));
        });
        
        this.express.post('/api/flat', (req, res) => {
            console.log(req.body);
            this.flatController.createFlat(req.body.flat).then((data: any) => res.json(data));
        });
        
        this.express.put('/api/flat', (req, res) => {
            this.flatController.updateFlat(req.body.flat).then((data: any) => res.json(data));
        });
        
        this.express.delete('/api/flat/:id', (req, res) => {
            this.flatController.deleteFlat(req.params.id).then((data: any) => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;