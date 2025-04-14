import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function MessagingScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const room = 'room-123';

  useEffect(() => {
    socket.emit('joinRoom', { room });
    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { room, message: input });
    setInput('');
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(_, i) => i.toString()}
      />
      <TextInput value={input} onChangeText={setInput} placeholder="Message..." />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}