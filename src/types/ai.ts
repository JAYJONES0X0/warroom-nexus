export interface ArchonMessage {
  id: string;
  role: 'user' | 'archon' | 'system';
  content: string;
  timestamp: number;
  context?: ArchonContext;
  thinking?: ThinkingProcess;
}

export interface ArchonContext {
  marketState: {
    trend: 'bullish' | 'bearish' | 'neutral';
    volatility: number;
    sentiment: number;
  };
  userIntent: string;
  relevantData: any[];
  confidence: number;
}

export interface ThinkingProcess {
  steps: ThinkingStep[];
  conclusion: string;
  confidence: number;
}

export interface ThinkingStep {
  description: string;
  data: any;
  reasoning: string;
}

export interface Pattern {
  id: string;
  name: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  timeframe: string;
  description: string;
  implications: string[];
}

export interface Prediction {
  symbol: string;
  timeframe: string;
  direction: 'up' | 'down' | 'sideways';
  targetPrice: number;
  confidence: number;
  reasoning: string;
  risks: string[];
}

export interface Alert {
  id: string;
  type: 'price' | 'volume' | 'pattern' | 'news' | 'whale' | 'risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: number;
  actionable: boolean;
  actions?: AlertAction[];
}

export interface AlertAction {
  label: string;
  action: () => void;
}