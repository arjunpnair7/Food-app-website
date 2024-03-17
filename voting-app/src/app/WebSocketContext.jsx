'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';

// Create a context for the WebSocket functionality
const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

  // WebSocketProvider component
export const WebSocketProvider = ({ children }) => {
// State for the STOMP client instance
const [stompClient, setStompClient] = useState(null);
const [roomCode, setRoomCode] = useState(null);
const [data, setData] = useState(null);

const initializeStompClient = () => {
const socket = new WebSocket('wss://food-app-backend-izbg.onrender.com');
// const socket = new WebSocket('ws://localhost:8080/ws'); // WebSocket server URL
const client = Stomp.over(socket);
    client.connect({}, () => {
        setStompClient(client);
    });
};

const subscribeToRoom = (code) => {
    setRoomCode(code)
    console.log("Subscribe to room"); 
    if (stompClient && code) {
      const subscription = stompClient.subscribe(`/room/${code}`, (message) => {
        console.log(message.body);
        // Handle message
        setData(JSON.parse(message.body));
        
      });
      // You might want to store the subscription for later use or cleanup
    }
  };

  useEffect(() => {
    initializeStompClient();
    // Cleanup function to disconnect the STOMP client when the component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);


  return (
    <WebSocketContext.Provider value={{ stompClient, setRoomCode, subscribeToRoom, data, roomCode}}>
      {children}
    </WebSocketContext.Provider>
  );
};
