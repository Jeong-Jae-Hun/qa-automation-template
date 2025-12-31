import { test as base } from '@playwright/test';
import { ExamplePage } from '../pages';

/**
 * 커스텀 fixture 타입 정의
 */
type Pages = {
  examplePage: ExamplePage;
};

/**
 * Page Object를 fixture로 제공
 * 테스트에서 직접 Page Object를 사용할 수 있습니다.
 *
 * @example
 * test('할일 추가', async ({ examplePage }) => {
 *   await examplePage.goto();
 *   await examplePage.addTodo('테스트 할일');
 * });
 */
export const test = base.extend<Pages>({
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },
});

export { expect } from '@playwright/test';
