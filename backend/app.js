import  express  from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import { Server } from 'socket.io';
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { ChildProcess, spawn } from 'child_process';
import { inputSettings , twitchSettings } from "./utils/ffmpeg.js";
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
  const twitch = "rtmp://live.twitch.tv/app/stream_key";
  const ffmpegInput = inputSettings.concat(
    // youtubeSettings(youtubeDestinationUrl),
    twitchSettings(twitch)
    // facebookSettings(facebook),
    // customRtmpSettings(customRTMP)
  );
  const ffmpeg = spawn('ffmpeg', ffmpegInput);

  // If FFmpeg stops for any reason, close the WebSocket connection.
  ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    // ws.terminate()
  });

  // Handle STDIN pipe errors by logging to the console.
  // These errors most commonly occur when FFmpeg closes and there is still
  // data to write.  If left unhandled, the server will crash.
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e);
  });

  // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString());
  });

  // When data comes in from the WebSocket, write it to FFmpeg's STDIN.
  socket.on('message', (msg) => {
    console.log('DATA', msg);
    ffmpeg.stdin.write(msg);
  });

  // If the client disconnects, stop FFmpeg.
  socket.conn.on('close', (e) => {
    console.log('kill: SIGINT');
    ffmpeg.kill('SIGINT');
  });
  });
export default app
