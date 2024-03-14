# Chat App

## Steps to start the server

- run `cd server` to go to server folder
- run `yarn` or `npm install` to install the dependencies
- run `yarn build` or `npm run build`
- run `yarn start` or `npm run start` to start the server

server by default will be running at port 5000

## Steps to start the client

- run `cd client` to go to client folder
- run `yarn` or `npm install` to install the dependencies
- run `yarn dev` or `npm run dev` to start the client

you can access client by this url http://localhost:3000

## Architecture of this app

- app is build through node, express and websocket in backend and next.js and websocket in frontend.
- to handle multiple connection we are using websockets, server can communicate with multiple clients using websocket.
- when someone enters a message, it will be broadcasted to all the clients joined through websockets, we are using promises to handle concurrency here.

## Deployemnet link

app is deployed at this link https://kuvaka-assignment.vercel.app/

**_NOTE:_** You can access a demo working of this app from this [link](https://drive.google.com/file/d/1_tdmKJqSaR-CyS8xA8Dkyd0oVfioVwNA/view?usp=sharing)
