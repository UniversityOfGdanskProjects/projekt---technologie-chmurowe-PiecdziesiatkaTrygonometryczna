import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Cookies from 'js-cookie';

const Chat = () => {
  const [userId] = useState(Cookies.get('userId') || '');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:9001', {
      username: 'newuser',
      password: '123',
    });

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT server');
      setIsConnected(true);
      mqttClient.subscribe('chat');
    });

    mqttClient.on('error', (error) => {
      console.error('Error connecting to MQTT server', error);
    });

    mqttClient.on('message', (topic, message) => {
      console.log(`Received message on ${topic}: ${message}`);
      const receivedMessage = JSON.parse(message.toString());
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const sendMessage = () => {
    if (!isConnected || newMessage.trim() === '' || !userId) return;

    const messageObject = {
      userId,
      text: newMessage,
    };

    console.log('Publishing message', messageObject);
    client.publish('chat', JSON.stringify(messageObject));

    if (messageObject.userId !== userId) {
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    }

    setNewMessage('');
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userId}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Wiadomość..."
        />
        <button onClick={sendMessage} disabled={!isConnected}>
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default Chat;
