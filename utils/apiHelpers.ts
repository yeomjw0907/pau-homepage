/**
 * Utility functions for API calls with retry logic and timeout
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  timeout?: number;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  timeout: 30000 // 30 seconds
};

/**
 * Creates a timeout promise that rejects after specified milliseconds
 */
const createTimeout = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timeout after ${ms}ms`));
    }, ms);
  });
};

/**
 * Calculates exponential backoff delay
 */
const calculateBackoffDelay = (attempt: number, initialDelay: number, maxDelay: number): number => {
  const delay = initialDelay * Math.pow(2, attempt);
  return Math.min(delay, maxDelay);
};

/**
 * Executes an async function with retry logic and timeout
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      // Create timeout promise
      const timeoutPromise = createTimeout(opts.timeout);
      
      // Race between the function and timeout
      const result = await Promise.race([
        fn(),
        timeoutPromise
      ]);

      return result as T;
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        // Don't retry on authentication errors
        if (message.includes('api key') && (message.includes('invalid') || message.includes('not found'))) {
          throw error;
        }
        
        // Don't retry on client errors (4xx)
        if (message.includes('400') || message.includes('401') || message.includes('403') || message.includes('404')) {
          throw error;
        }
      }

      // If this was the last attempt, throw the error
      if (attempt === opts.maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = calculateBackoffDelay(attempt, opts.initialDelay, opts.maxDelay);
      
      console.warn(`[API] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`, error);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
};










