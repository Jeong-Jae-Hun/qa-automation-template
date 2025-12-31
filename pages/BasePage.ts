import { Page, Locator } from '@playwright/test';

/**
 * 모든 Page Object의 기반 클래스
 * 공통 메서드와 유틸리티를 제공합니다.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 페이지로 이동
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * 페이지 로드 완료 대기
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * data-testid로 요소 찾기
   */
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * 스크린샷 저장
   */
  async screenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }

  /**
   * 현재 URL 가져오기
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * 페이지 제목 가져오기
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
