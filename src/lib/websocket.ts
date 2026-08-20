import { Client, IMessage } from '@stomp/stompjs';

export class WebSocketService {
  private client: Client;
  private onConnectCallbacks: (() => void)[] = [];

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      this.onConnectCallbacks.forEach((cb) => cb());
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
  }

  public connect() {
    this.client.activate();
  }

  public disconnect() {
    this.client.deactivate();
  }

  public subscribe(destination: string, callback: (message: IMessage) => void) {
    if (this.client.connected) {
      return this.client.subscribe(destination, callback);
    } else {
      let sub: { unsubscribe: () => void } | null = null;
      this.onConnectCallbacks.push(() => {
        sub = this.client.subscribe(destination, callback);
      });
      return {
        unsubscribe: () => {
          if (sub) sub.unsubscribe();
        },
      };
    }
  }
}

export const wsService = new WebSocketService();
