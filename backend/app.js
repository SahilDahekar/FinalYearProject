import  express  from "express";
import { config} from "dotenv";
config();
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this line once the application is complete
app.use(morgan('dev'));

app.use('/api', appRouter);


export default app
