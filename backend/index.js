
import app from './app.js'
import { connectToDatabase } from './db/connections.js'
import WebSocket from './utils/websocket.js';

WebSocket();
connectToDatabase()
    .then(() => {
        app.listen(8000, () => console.log("server started at port 8000"));
    })
    .catch((err) => console.log(err));

