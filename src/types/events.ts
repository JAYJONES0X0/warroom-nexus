export type EventType = 
  | 'market:tick'
  | 'market:trade'
  | 'market:orderbook'
  | 'ui:navigate'
  | 'ui:panel:open'
  | 'ui:panel:close'
  | 'ai:message'
  | 'ai:thinking'
  | 'alert:new'
  | 'alert:dismiss'
  | 'gesture:detected'
  | 'voice:command';

export interface Event<T = any> {
  type: EventType;
  payload: T;
  timestamp: number;
  source: string;
}

export type EventHandler<T = any> = (event: Event<T>) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}