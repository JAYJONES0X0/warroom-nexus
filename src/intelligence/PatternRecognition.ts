import { Pattern } from '@/types/ai';
import { Candle } from '@/types/market';

export class PatternRecognition {
  detectCandlePatterns(candles: Candle[]): Pattern[] {
    const patterns: Pattern[] = [];

    if (candles.length < 3) return patterns;

    // Detect Doji
    const lastCandle = candles[candles.length - 1];
    const bodySize = Math.abs(lastCandle.close - lastCandle.open);
    const totalSize = lastCandle.high - lastCandle.low;

    if (bodySize / totalSize < 0.1) {
      patterns.push({
        id: 'doji-' + Date.now(),
        name: 'Doji',
        type: 'neutral',
        confidence: 0.8,
        timeframe: '1H',
        description: 'Indecision in the market',
        implications: ['Potential reversal signal', 'Wait for confirmation']
      });
    }

    // Detect Hammer/Shooting Star
    const lowerWick = Math.abs(lastCandle.low - Math.min(lastCandle.open, lastCandle.close));
    const upperWick = Math.abs(lastCandle.high - Math.max(lastCandle.open, lastCandle.close));

    if (lowerWick > bodySize * 2 && upperWick < bodySize) {
      patterns.push({
        id: 'hammer-' + Date.now(),
        name: 'Hammer',
        type: 'bullish',
        confidence: 0.75,
        timeframe: '1H',
        description: 'Bullish reversal pattern',
        implications: ['Potential bottom', 'Look for bullish confirmation']
      });
    }

    if (upperWick > bodySize * 2 && lowerWick < bodySize) {
      patterns.push({
        id: 'shooting-star-' + Date.now(),
        name: 'Shooting Star',
        type: 'bearish',
        confidence: 0.75,
        timeframe: '1H',
        description: 'Bearish reversal pattern',
        implications: ['Potential top', 'Look for bearish confirmation']
      });
    }

    // Detect Engulfing
    if (candles.length >= 2) {
      const prev = candles[candles.length - 2];
      const curr = candles[candles.length - 1];

      const prevBullish = prev.close > prev.open;
      const currBullish = curr.close > curr.open;

      if (!prevBullish && currBullish && 
          curr.open < prev.close && curr.close > prev.open) {
        patterns.push({
          id: 'bullish-engulfing-' + Date.now(),
          name: 'Bullish Engulfing',
          type: 'bullish',
          confidence: 0.85,
          timeframe: '1H',
          description: 'Strong bullish reversal',
          implications: ['High probability reversal', 'Consider long positions']
        });
      }

      if (prevBullish && !currBullish && 
          curr.open > prev.close && curr.close < prev.open) {
        patterns.push({
          id: 'bearish-engulfing-' + Date.now(),
          name: 'Bearish Engulfing',
          type: 'bearish',
          confidence: 0.85,
          timeframe: '1H',
          description: 'Strong bearish reversal',
          implications: ['High probability reversal', 'Consider short positions']
        });
      }
    }

    return patterns;
  }

  detectTrendPatterns(candles: Candle[]): Pattern[] {
    const patterns: Pattern[] = [];

    if (candles.length < 10) return patterns;

    // Simple trend detection
    const recentCandles = candles.slice(-10);
    const highs = recentCandles.map(c => c.high);
    const lows = recentCandles.map(c => c.low);

    // Higher highs and higher lows = uptrend
    let uptrend = true;
    let downtrend = true;

    for (let i = 1; i < highs.length; i++) {
      if (highs[i] <= highs[i - 1]) uptrend = false;
      if (lows[i] <= lows[i - 1]) uptrend = false;
      if (highs[i] >= highs[i - 1]) downtrend = false;
      if (lows[i] >= lows[i - 1]) downtrend = false;
    }

    if (uptrend) {
      patterns.push({
        id: 'uptrend-' + Date.now(),
        name: 'Uptrend',
        type: 'bullish',
        confidence: 0.8,
        timeframe: '4H',
        description: 'Clear upward trend',
        implications: ['Trend is your friend', 'Look for pullback entries']
      });
    }

    if (downtrend) {
      patterns.push({
        id: 'downtrend-' + Date.now(),
        name: 'Downtrend',
        type: 'bearish',
        confidence: 0.8,
        timeframe: '4H',
        description: 'Clear downward trend',
        implications: ['Avoid catching falling knives', 'Wait for reversal confirmation']
      });
    }

    return patterns;
  }
}

export const patternRecognition = new PatternRecognition();