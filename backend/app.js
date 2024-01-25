import  express  from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
// Configure CORS to allow only requests from port 5173
const corsOptions = {
    origin: 'https://localhost:5173',  // Replace with your specific origin
    credentials : true,
    optionsSuccessStatus: 200,
};
  
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this line once the application is complete
app.use(morgan('dev'));

app.use('/api', appRouter);

export default app
