export class SentimentAnalyzer {
  private positiveWords = [
    'bullish', 'moon', 'pump', 'buy', 'long', 'breakout', 'rally', 
    'surge', 'gain', 'profit', 'win', 'strong', 'up', 'green'
  ];

  private negativeWords = [
    'bearish', 'dump', 'sell', 'short', 'crash', 'drop', 'fall',
    'loss', 'weak', 'down', 'red', 'fear', 'panic', 'liquidation'
  ];

  analyzeText(text: string): number {
    const lower = text.toLowerCase();
    let score = 0;

    this.positiveWords.forEach(word => {
      const count = (lower.match(new RegExp(word, 'g')) || []).length;
      score += count;
    });

    this.negativeWords.forEach(word => {
      const count = (lower.match(new RegExp(word, 'g')) || []).length;
      score -= count;
    });

    // Normalize to -1 to 1
    return Math.max(-1, Math.min(1, score / 10));
  }

  analyzePriceAction(prices: number[]): number {
    if (prices.length < 2) return 0;

    let upMoves = 0;
    let downMoves = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) upMoves++;
      else if (prices[i] < prices[i - 1]) downMoves++;
    }

    const total = upMoves + downMoves;
    if (total === 0) return 0;

    return (upMoves - downMoves) / total;
  }

  aggregateSentiment(sources: { text?: string; prices?: number[] }[]): {
    overall: number;
    confidence: number;
  } {
    let totalScore = 0;
    let count = 0;

    sources.forEach(source => {
      if (source.text) {
        totalScore += this.analyzeText(source.text);
        count++;
      }
      if (source.prices) {
        totalScore += this.analyzePriceAction(source.prices);
        count++;
      }
    });

    const overall = count > 0 ? totalScore / count : 0;
    const confidence = Math.min(count / 10, 1);

    return { overall, confidence };
  }
}

export const sentimentAnalyzer = new SentimentAnalyzer();