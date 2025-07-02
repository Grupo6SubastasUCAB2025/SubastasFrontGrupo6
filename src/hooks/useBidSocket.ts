import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export function useBidSocket(auctionId: number, onBidReceived: (data: any) => void) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5201/bidHub?auctionId=${auctionId}`)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveBid", (bidData) => {
      onBidReceived(bidData);
    });

    connection
      .start()
      .then(() => {
        console.log("Conectado al hub de pujas");
      })
      .catch(console.error);

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [auctionId]);
}
