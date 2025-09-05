import React, { useState } from 'react';

function Remote() {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);
  const socket = new WebSocket('ws://localhost:3000');

const joinRoom = () => {
  socket.send(JSON.stringify({ type: 'join', roomId }));
  setJoined(true);
};
const sendTrigger = () => {
  socket.send(JSON.stringify({ type: 'trigger', roomId }));
};
retun (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
<h2>
