import * as bodyParser from "body-parser";
import express from "express";
import { FlatController } from "./controller/flat.controller";
import 'dotenv/config';
import cors from 'cors';
import url from 'url'

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
        this.express.use(cors())
    }

    private routes(): void {
        this.express.get('/api/flats', (req, res) => {
            let urlParsed = url.parse(req.url, true)

            let limit = undefined
            let offset = undefined

            if (urlParsed.query.limit && !Array.isArray(urlParsed.query.limit)) {
                limit = parseInt(urlParsed.query.limit)
            }

            if (urlParsed.query.offset && !Array.isArray(urlParsed.query.offset)) {
                offset = parseInt(urlParsed.query.offset)
            }

            this.flatController.getFlats(limit, offset).then((data: any) => res.json(data));
        });

        this.express.get('/api/flatsNumber', (req, res) => {
            this.flatController.getFlatsNumber().then((data: any) => res.json(data));
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
            res.send("Welcome to ScrapedFlats");
        });

        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;