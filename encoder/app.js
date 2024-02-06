import express from "express";
import puppeteer from 'puppeteer';
import {io} from 'socket.io-client';
import { spawn } from 'child_process';
import path from 'path';

const app = express();
const port = 3000;
let rooms = [];
const socket = io('http://localhost:5001'); // Replace with your Mediasoup server address

socket.on('connection-success', ({ socketId }) => {
    console.log(`Connected to Mediasoup server with socket ID: ${socketId}`);
    
    socket.on('room-start', (roomName) => {
        console.log(`Starting room: ${roomName}`);
        if (!rooms.includes(roomName)) {
            rooms.push(roomName);
            joinRoomAndStartStreaming(roomName);
        } else {
            console.log(`Room ${roomName} already exists`);
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from Mediasoup server');
});

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

const joinRoomAndStartStreaming = async (roomName) => {
    socket.emit('joinRoom', { roomName }, ({ rtpCapabilities }) => {
        console.log(`Joined room ${roomName} with rtpCapabilities:`, rtpCapabilities);

        puppeteer.launch().then(async (browser) => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:${port}/join/${roomName}`);

            socket.emit('createWebRtcTransport', {}, (transportOptions) => {
                console.log('Received transport options:', transportOptions);
            });
        }).catch((err) => {
            console.error('Error launching Puppeteer:', err);
        });
    });
};
