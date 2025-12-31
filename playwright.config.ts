import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // 테스트 폴더
  testDir: './tests',

  // 타임아웃
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  // 리포트
  reporter: [['html', { outputFolder: 'reports/html', open: 'never' }], ['list']],

  // 스크린샷 및 트레이스
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  // 병렬 실행
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 프로젝트 (브라우저별)
  projects: [
    // 인증 설정 (필요시 활성화)
    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts/,
    // },

    // 크롬 테스트
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // storageState: '.auth/user.json',  // 인증 상태 사용시
      },
      // dependencies: ['setup'],  // 인증 필요시
    },

    // 파이어폭스
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // 사파리 (WebKit)
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // 엣지
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    // 모바일 크롬 (Android)
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },

    // 모바일 사파리 (iOS)
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
  ],

  // 스크린샷 저장 경로
  outputDir: 'reports/screenshots',
});
