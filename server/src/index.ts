import express from "express";
import cors from "cors";
import "dotenv/config";
import { WebSocket } from "ws";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

interface IMessage {
  username: string;
  message: string;
  time: string;
  mine?: boolean;
}

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", (message: string) => {
    const parsedMessage: IMessage = JSON.parse(message);

    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        parsedMessage.mine = client === ws;
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });
});
