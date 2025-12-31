/**
 * 환경별 설정
 * 테스트 대상 URL과 환경 변수를 관리합니다.
 */

export type Environment = 'local' | 'staging' | 'production';

interface EnvironmentConfig {
  baseUrl: string;
  apiUrl?: string;
  timeout: number;
}

export const environments: Record<Environment, EnvironmentConfig> = {
  local: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:3001/api',
    timeout: 10000,
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://staging-api.example.com',
    timeout: 30000,
  },
  production: {
    baseUrl: 'https://example.com',
    apiUrl: 'https://api.example.com',
    timeout: 30000,
  },
};

/**
 * 현재 환경 가져오기
 */
export function getCurrentEnvironment(): Environment {
  return (process.env.TEST_ENV as Environment) || 'staging';
}

/**
 * 현재 환경 설정 가져오기
 */
export function getConfig(): EnvironmentConfig {
  return environments[getCurrentEnvironment()];
}
