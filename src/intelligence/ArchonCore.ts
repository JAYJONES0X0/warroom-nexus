import { ArchonMessage, ArchonContext, Pattern, Prediction } from '@/types/ai';
import { useNexusStore } from '@/core/StateManager';
import { eventBus } from '@/core/EventBus';

class ArchonCore {
  private context: ArchonContext | null = null;

  async processMessage(message: string): Promise<ArchonMessage> {
    // Update context
    this.updateContext();

    // Analyze intent
    const intent = this.analyzeIntent(message);

    // Generate response
    const response = await this.generateResponse(message, intent);

    return {
      id: Date.now().toString(),
      role: 'archon',
      content: response,
      timestamp: Date.now(),
      context: this.context || undefined
    };
  }

  private updateContext(): void {
    const store = useNexusStore.getState();
    const markets = Array.from(store.markets.values());

    if (markets.length === 0) {
      this.context = null;
      return;
    }

    // Calculate market sentiment
    const avgChange = markets.reduce((sum, m) => sum + m.change24h, 0) / markets.length;
    const sentiment = Math.max(-1, Math.min(1, avgChange / 10));

    // Determine trend
    const bullishCount = markets.filter(m => m.change24h > 0).length;
    const bearishCount = markets.length - bullishCount;
    let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral';

    if (bullishCount > bearishCount * 1.5) trend = 'bullish';
    else if (bearishCount > bullishCount * 1.5) trend = 'bearish';

    // Calculate volatility
    const volatility = markets.reduce((sum, m) => {
      const range = ((m.high24h - m.low24h) / m.price) * 100;
      return sum + range;
    }, 0) / markets.length;

    this.context = {
      marketState: {
        trend,
        volatility,
        sentiment
      },
      userIntent: '',
      relevantData: markets,
      confidence: 0.85
    };
  }

  private analyzeIntent(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('price') || lower.includes('cost')) return 'price_query';
    if (lower.includes('buy') || lower.includes('sell')) return 'trade_intent';
    if (lower.includes('trend') || lower.includes('direction')) return 'trend_analysis';
    if (lower.includes('risk')) return 'risk_assessment';
    if (lower.includes('predict') || lower.includes('forecast')) return 'prediction';
    if (lower.includes('pattern')) return 'pattern_recognition';

    return 'general_query';
  }

  private async generateResponse(message: string, intent: string): Promise<string> {
    if (!this.context) {
      return "I'm analyzing the market data. Please wait a moment...";
    }

    const { marketState } = this.context;

    switch (intent) {
      case 'trend_analysis':
        return `Current market trend is **${marketState.trend.toUpperCase()}** with ${marketState.volatility.toFixed(1)}% volatility. Sentiment index: ${(marketState.sentiment * 100).toFixed(0)}%. ${this.getTrendInsight(marketState.trend)}`;

      case 'risk_assessment':
        const riskLevel = marketState.volatility > 5 ? 'HIGH' : marketState.volatility > 3 ? 'MODERATE' : 'LOW';
        return `Risk Level: **${riskLevel}**. Volatility at ${marketState.volatility.toFixed(1)}%. ${this.getRiskAdvice(riskLevel)}`;

      case 'prediction':
        return `Based on current ${marketState.trend} trend and ${marketState.volatility.toFixed(1)}% volatility, I predict ${this.getPrediction(marketState)}. Confidence: ${(this.context.confidence * 100).toFixed(0)}%.`;

      case 'pattern_recognition':
        return `Analyzing patterns... Detected ${marketState.trend} momentum with ${marketState.sentiment > 0 ? 'positive' : 'negative'} sentiment. ${this.getPatternInsight()}`;

      default:
        return `Market is ${marketState.trend} with ${marketState.volatility.toFixed(1)}% volatility. How can I assist your trading strategy?`;
    }
  }

  private getTrendInsight(trend: string): string {
    switch (trend) {
      case 'bullish':
        return 'Strong buying pressure detected. Consider long positions with proper risk management.';
      case 'bearish':
        return 'Selling pressure dominant. Exercise caution with long positions.';
      default:
        return 'Market consolidating. Wait for clear directional move.';
    }
  }

  private getRiskAdvice(level: string): string {
    switch (level) {
      case 'HIGH':
        return 'Reduce position sizes and use tight stop losses.';
      case 'MODERATE':
        return 'Standard risk management applies. Monitor closely.';
      default:
        return 'Favorable conditions for position building.';
    }
  }

  private getPrediction(state: any): string {
    if (state.trend === 'bullish' && state.sentiment > 0.3) {
      return 'continued upward movement in the short term';
    } else if (state.trend === 'bearish' && state.sentiment < -0.3) {
      return 'further downside pressure likely';
    } else {
      return 'sideways consolidation before next major move';
    }
  }

  private getPatternInsight(): string {
    const patterns = [
      'Higher highs and higher lows forming.',
      'Consolidation pattern emerging.',
      'Potential breakout setup developing.',
      'Support/resistance levels holding strong.'
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  detectPatterns(): Pattern[] {
    if (!this.context) return [];

    const patterns: Pattern[] = [];
    const { marketState } = this.context;

    // Trend pattern
    if (marketState.trend !== 'neutral') {
      patterns.push({
        id: 'trend-' + Date.now(),
        name: marketState.trend === 'bullish' ? 'Bullish Trend' : 'Bearish Trend',
        type: marketState.trend,
        confidence: 0.75,
        timeframe: '4H',
        description: `Strong ${marketState.trend} momentum detected`,
        implications: [
          `${marketState.trend === 'bullish' ? 'Long' : 'Short'} bias recommended`,
          'Monitor for trend continuation or reversal signals'
        ]
      });
    }

    // Volatility pattern
    if (marketState.volatility > 5) {
      patterns.push({
        id: 'volatility-' + Date.now(),
        name: 'High Volatility',
        type: 'neutral',
        confidence: 0.85,
        timeframe: '1H',
        description: 'Elevated volatility detected',
        implications: [
          'Wider stop losses recommended',
          'Potential for large price swings'
        ]
      });
    }

    return patterns;
  }

  generatePrediction(symbol: string): Prediction {
    if (!this.context) {
      throw new Error('No market context available');
    }

    const { marketState } = this.context;
    const market = this.context.relevantData.find((m: any) => m.symbol === symbol);

    if (!market) {
      throw new Error('Symbol not found');
    }

    const direction = marketState.trend === 'bullish' ? 'up' : 
                     marketState.trend === 'bearish' ? 'down' : 'sideways';

    const priceChange = marketState.volatility * (marketState.sentiment > 0 ? 1 : -1);
    const targetPrice = market.price * (1 + priceChange / 100);

    return {
      symbol,
      timeframe: '24H',
      direction,
      targetPrice,
      confidence: this.context.confidence,
      reasoning: `Based on ${marketState.trend} trend and ${marketState.sentiment > 0 ? 'positive' : 'negative'} sentiment`,
      risks: [
        'Market volatility may exceed expectations',
        'External events could impact prediction',
        'Always use proper risk management'
      ]
    };
  }
}

export const archon = new ArchonCore();