import dotenv from 'dotenv';
import * as http from "http";
import App from "./app";
import {FlatRepository} from "./repository/flat.repository";

dotenv.config();
const port = process.env.PORT || 3070;

App.set("port", port);
const server = http.createServer(App);

FlatRepository.getInstance().insertScrapedData() 
 
server.listen(port); 
server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr?.port}`;
 });

module.exports = App;
