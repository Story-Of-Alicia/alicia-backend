import WebSocket, { WebSocket as WebSocketType } from 'ws';
import jwt from 'jsonwebtoken';
import { ENV_VARS } from './constants/envs'
import { federationClient } from './federationClient';

interface JwtPayload {
    _username: string
}

export const handleWebSocketConnection = (ws: WebSocketType, req: any) => {
  const secret = ENV_VARS.JWT_SECRET;
  if(!secret) {
    throw new Error('JWT Secret not set');
  }

  // TODO: extract JWT properly based on federation api
  const token = req.headers.authorization?.split(' ')[1];

  // verify JWT
  jwt.verify(token, secret, (err, decoded) => {
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
    ws.on('message', (rawMessage) => {
      // forward to federation api
      let message = JSON.parse(rawMessage.toString())

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