import WebSocket, { WebSocket as WebSocketType } from 'ws';
import jwt from 'jsonwebtoken';
import { ENV_VARS } from './constants/envs'
import { federationClient } from './federationClient';

export const handleWebSocketConnection = (ws: WebSocketType, req: any) => {
  // extract JWT
  const token = req.headers.authorization?.split(' ')[1];

  // verify JWT
  jwt.verify(token, ENV_VARS.JWT_SECRET, (err, decoded) => {
    if (err) {
      // invalid
      ws.close();
      return;
    }

    // valid
    const username = decoded.username;

    // create instance
    const federation = new federationClient();

    // websocket
    ws.on('message', (message) => {
      // forward to federation api
      federation.handleMessage(message, username).then((response) => {
        // send response to client
        ws.send(response);
      });
    });

    ws.on('close', () => {
      // clean up?
    });
  });
};