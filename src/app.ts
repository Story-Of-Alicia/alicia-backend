import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { ENV_VARS } from './constants/envs'
import alicia1PlayerRoutes from './routes/alicia_1/player';
import { handleWebSocketConnection } from './websocket';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use('/alicia1/player', alicia1PlayerRoutes);

wss.on('connection', handleWebSocketConnection);

export { server, app };