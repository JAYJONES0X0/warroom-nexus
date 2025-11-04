import { Event, EventType, EventHandler, EventSubscription } from '@/types/events';

class EventBus {
  private handlers: Map<EventType, Set<EventHandler>> = new Map();
  private eventHistory: Event[] = [];
  private maxHistory = 1000;

  subscribe<T = any>(eventType: EventType, handler: EventHandler<T>): EventSubscription {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }

    this.handlers.get(eventType)!.add(handler as EventHandler);

    return {
      unsubscribe: () => {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
          handlers.delete(handler as EventHandler);
        }
      }
    };
  }

  emit<T = any>(type: EventType, payload: T, source = 'system'): void {
    const event: Event<T> = {
      type,
      payload,
      timestamp: Date.now(),
      source
    };

    // Store in history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistory) {
      this.eventHistory.shift();
    }

    // Notify handlers
    const handlers = this.handlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error(`Error in event handler for ${type}:`, error);
        }
      });
    }
  }

  getHistory(eventType?: EventType, limit = 100): Event[] {
    let history = this.eventHistory;

    if (eventType) {
      history = history.filter(e => e.type === eventType);
    }

    return history.slice(-limit);
  }

  clear(): void {
    this.handlers.clear();
    this.eventHistory = [];
  }
}

export const eventBus = new EventBus();