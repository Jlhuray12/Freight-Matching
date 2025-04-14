import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function MessagingPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const room = 'room-123';

  useEffect(() => {
    socket.emit('joinRoom', { room });
    socket.on('receiveMessage', (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { room, message: input });
    setInput('');
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div>{messages.map((msg, i) => <p key={i}>{msg}</p>)}</div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}