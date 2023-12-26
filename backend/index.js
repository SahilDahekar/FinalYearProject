import dotenv from "dotenv";
import express from "express";

dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Stream Sync Backend");
})

app.listen(PORT, () => {
    console.log(`Sever listening on port ${PORT}`);
});