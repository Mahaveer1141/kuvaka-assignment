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

  ws.on("message", async (message: string) => {
    const parsedMessage: IMessage = JSON.parse(message);
    // storing all messages as promises in array
    const broadcastMessage: Promise<void>[] = [];

    wss.clients.forEach((client: WebSocket) => {
      // sending message only if clients connection is on
      if (client.readyState === WebSocket.OPEN) {
        parsedMessage.mine = client === ws;
        broadcastMessage.push(sendMessage(client, parsedMessage));
      }
    });
    // resolving all the promises
    try {
      await Promise.all(broadcastMessage);
    } catch (err) {
      console.error(err);
    }
  });
});

// function that create and return a promise for sending a message to client
async function sendMessage(
  client: WebSocket,
  message: IMessage,
): Promise<void> {
  return new Promise((resolve, reject) => {
    client.send(JSON.stringify(message), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
