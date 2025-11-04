import { eventBus } from './EventBus';
import { MarketTick, Trade, OrderBook } from '@/types/market';

interface WSConfig {
  url: string;
  reconnect: boolean;
  reconnectDelay: number;
  maxReconnectAttempts: number;
}

class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private reconnectTimers: Map<string, NodeJS.Timeout> = new Map();

  connect(id: string, config: WSConfig): void {
    if (this.connections.has(id)) {
      console.warn(`WebSocket ${id} already connected`);
      return;
    }

    try {
      const ws = new WebSocket(config.url);

      ws.onopen = () => {
        console.log(`WebSocket ${id} connected`);
        this.reconnectAttempts.set(id, 0);
        eventBus.emit('market:connected', { id }, 'websocket');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(id, data);
        } catch (error) {
          console.error(`Error parsing WebSocket message:`, error);
        }
      };

      ws.onerror = (error) => {
        console.error(`WebSocket ${id} error:`, error);
      };

      ws.onclose = () => {
        console.log(`WebSocket ${id} closed`);
        this.connections.delete(id);

        if (config.reconnect) {
          this.attemptReconnect(id, config);
        }
      };

      this.connections.set(id, ws);
    } catch (error) {
      console.error(`Failed to connect WebSocket ${id}:`, error);
    }
  }

  private attemptReconnect(id: string, config: WSConfig): void {
    const attempts = this.reconnectAttempts.get(id) || 0;

    if (attempts >= config.maxReconnectAttempts) {
      console.error(`Max reconnect attempts reached for ${id}`);
      return;
    }

    const timer = setTimeout(() => {
      console.log(`Reconnecting ${id} (attempt ${attempts + 1})`);
      this.reconnectAttempts.set(id, attempts + 1);
      this.connect(id, config);
    }, config.reconnectDelay);

    this.reconnectTimers.set(id, timer);
  }

  private handleMessage(id: string, data: any): void {
    // Parse different message types
    if (data.e === 'trade') {
      const trade: Trade = {
        id: data.t,
        symbol: data.s,
        price: parseFloat(data.p),
        volume: parseFloat(data.q),
        side: data.m ? 'sell' : 'buy',
        timestamp: data.T
      };
      eventBus.emit('market:trade', trade, 'websocket');
    } else if (data.e === '24hrTicker') {
      const tick: Partial<MarketTick> = {
        symbol: data.s,
        price: parseFloat(data.c),
        volume: parseFloat(data.v),
        change24h: parseFloat(data.P),
        high24h: parseFloat(data.h),
        low24h: parseFloat(data.l),
        timestamp: data.E
      };
      eventBus.emit('market:tick', tick, 'websocket');
    }
  }

  disconnect(id: string): void {
    const ws = this.connections.get(id);
    if (ws) {
      ws.close();
      this.connections.delete(id);
    }

    const timer = this.reconnectTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.reconnectTimers.delete(id);
    }
  }

  send(id: string, data: any): void {
    const ws = this.connections.get(id);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  disconnectAll(): void {
    this.connections.forEach((_, id) => this.disconnect(id));
  }
}

export const wsManager = new WebSocketManager();