
import app from './app.js'
import { connectToDatabase } from './db/connnections.js'

connectToDatabase()
    .then(() => {
        app.listen(8000, () => console.log("server started and connected to db at port 8000"));
    })
    .catch((err) => console.log(err));
