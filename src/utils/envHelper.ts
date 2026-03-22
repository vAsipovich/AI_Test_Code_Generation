// path: src/utils/envHelper.ts

/**
 * Reads an environment variable by key.
 * Returns the value if set; falls back to `defaultValue` when provided.
 * Throws a descriptive error if the variable is required but absent.
 *
 * @param key          - The environment variable name.
 * @param defaultValue - Optional fallback value.
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Required environment variable "${key}" is not set.`);
}

/** Typed configuration object derived from environment variables. */
export interface TestConfig {
  baseUrl: string;
  env: string;
  headless: boolean;
  timeoutMs: number;
}

/** SauceDemo user credentials interface. */
export interface SauceDemoCredentials {
  username: string;
  password: string;
}

/**
 * Returns a strongly-typed test configuration object built from
 * environment variables with sensible SauceDemo defaults.
 */
export function getConfig(): TestConfig {
  return {
    baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),
    env: getEnv('TEST_ENV', 'saucedemo'),
    headless: getEnv('HEADLESS', 'true') === 'true',
    timeoutMs: parseInt(getEnv('TIMEOUT_MS', '30000'), 10),
  };
}

/**
 * Get standard test user credentials for SauceDemo.
 */
export function getStandardUser(): SauceDemoCredentials {
  return {
    username: getEnv('TEST_USER_USERNAME', 'standard_user'),
    password: getEnv('TEST_USER_PASSWORD', 'secret_sauce'),
  };
}

/**
 * Get locked out user credentials for negative testing.
 */
export function getLockedOutUser(): SauceDemoCredentials {
  return {
    username: getEnv('LOCKED_OUT_USER', 'locked_out_user'),
    password: getEnv('TEST_USER_PASSWORD', 'secret_sauce'),
  };
}

/**
 * Get problem user credentials for UI bug testing.
 */
export function getProblemUser(): SauceDemoCredentials {
  return {
    username: getEnv('PROBLEM_USER', 'problem_user'),
    password: getEnv('TEST_USER_PASSWORD', 'secret_sauce'),
  };
}

/**
 * Get performance glitch user credentials for performance testing.
 */
export function getPerformanceUser(): SauceDemoCredentials {
  return {
    username: getEnv('PERFORMANCE_USER', 'performance_glitch_user'),
    password: getEnv('TEST_USER_PASSWORD', 'secret_sauce'),
  };
}

/**
 * Get error user credentials for error scenario testing.
 */
export function getErrorUser(): SauceDemoCredentials {
  return {
    username: getEnv('ERROR_USER', 'error_user'),
    password: getEnv('TEST_USER_PASSWORD', 'secret_sauce'),
  };
}
