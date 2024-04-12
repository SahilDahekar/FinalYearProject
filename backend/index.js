
import app from './app.js'
import { connectToDatabase } from './db/connections.js'
import WebSocket from './utils/websocket.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const port = 8000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname + '/');

const key = fs.readFileSync(__dirname + '/certs/server.key');
const cert = fs.readFileSync(__dirname + '/certs/server.crt');
const options = {
  key: key,
  cert: cert
};

const server = https.createServer(options, app);

WebSocket();
connectToDatabase()
    .then(() => {
        // app.listen(8000, () => console.log("server started at port 8000"));
        server.listen(port, () => {
            console.log("server starting on port : " + port)
        });
    })
    .catch((err) => console.log(err));

