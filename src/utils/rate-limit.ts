import { LRUCache } from 'lru-cache';

type Options = {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max number of unique tokens per interval
};

export function rateLimit(options: Options) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000
  });

  return {
    check: async (request: Request, limit: number, token: string) => {
      const ip = request.headers.get('x-forwarded-for') || 'anonymous';
      const tokenKey = `${token}_${ip}`;
      
      const tokenCount = (tokenCache.get(tokenKey) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(tokenKey, [1]);
        return true;
      }
      
      if (tokenCount[0] >= limit) {
        throw new Error('Rate limit exceeded');
      }

      tokenCount[0] += 1;
      tokenCache.set(tokenKey, tokenCount);
      return true;
    }
  };
}
