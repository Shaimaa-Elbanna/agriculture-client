import { useEffect } from 'react';
import { AdjustData, DataPayload, SocketData } from '../components/LineChart/types';
import { io } from 'socket.io-client';

export function useSocket(url: string, onDataReceived: (deviceName: string, data: DataPayload) => void) {
    useEffect(() => {
      const socket = io(url);
      socket.on("mqttMessage", (data: SocketData) => {
        console.log("🚀 ~ socket.on ~ data:", data)
        onDataReceived(data.deviceName, data.parameters);
      });
  
   return () => {
      socket.disconnect();
    };    }, [url, onDataReceived]);
  }


