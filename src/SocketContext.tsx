import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SOCKET_SERVER_URL = "https://quix-server.onrender.com"; // Change if needed
// export const SOCKET_SERVER_URL = "http://localhost:5175"; // Change if needed


type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    console.log("Socket connected:", newSocket.id);
    newSocket.on("connect", () => {
      console.log("🟢 Provider socket id:", newSocket.id);
      newSocket.emit("ping-creator");
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
