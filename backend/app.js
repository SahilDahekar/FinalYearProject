import  express  from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import { Server } from 'socket.io';
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
// Configure CORS to allow only requests from port 5173
const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your specific origin
    optionsSuccessStatus: 200,
};
  
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this line once the application is complete
app.use(morgan('dev'));

app.use('/api', appRouter);

const io = new Server(5001, {
    cors: {
      origin: '*',
    },
  });  

io.on('connection', (socket) => {
    console.log('Client connected');
    console.log(`socket connected to ${socket.id}`);
    socket.on('Message', (streamData) => {
      console.log(streamData,(arg,callback)=>{
        console.log(arg);
        callback("connected");
      });
    });
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
  });
export default app
