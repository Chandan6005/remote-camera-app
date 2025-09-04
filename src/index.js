import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../client')));

const rooms = new Map();

wss.on('connection', ws => {
  ws.on('message', msg => {
    const data = JSON.parse(msg);
    const { type, roomId } = data;

    if (type === 'join') {
      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId).add(ws);
      ws.roomId = roomId;
    }

    if (type == 'trigger') {
      const clients = rooms.get(roomId) || [];
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('capture');
        }
      });
    }
  });

  ws.on('close', () => {
    const room = rooms.get(ws.roomId);
    if (room) {
      room.delete(ws);
      if (room.size === 0) rooms.delete(ws.roomId);
    }
  });
});
server.listen(3000, () => console.log('Server running on http://localhost:3000'));