import type { Page } from '@playwright/test';

/**
 * 공통 액션 모음
 * 여러 테스트에서 재사용되는 액션들을 정의합니다.
 */

/**
 * 페이지 새로고침 후 로드 대기
 */
export async function refreshAndWait(page: Page) {
  await page.reload();
  await page.waitForLoadState('networkidle');
}

/**
 * 특정 시간 대기 (디버깅용)
 */
export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 로컬 스토리지 초기화
 */
export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear());
}

/**
 * 쿠키 초기화
 */
export async function clearCookies(page: Page) {
  await page.context().clearCookies();
}

/**
 * 콘솔 에러 수집
 */
export async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}
