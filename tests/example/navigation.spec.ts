import { expect, test } from '@playwright/test';

test.describe('네비게이션 테스트', () => {
  test('Todo MVC 페이지에 접속할 수 있다', async ({ page }) => {
    // Given & When - Todo MVC 페이지 접속
    await page.goto('/todomvc');

    // Then - 페이지 요소 확인
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  });

  test('페이지 제목이 올바르게 표시된다', async ({ page }) => {
    // Given & When - Todo MVC 페이지 접속
    await page.goto('/todomvc');

    // Then - 제목 확인
    await expect(page).toHaveTitle(/React.*TodoMVC/i);
  });

  test('새로고침 후에도 할일이 유지된다', async ({ page }) => {
    // Given - 할일 추가
    await page.goto('/todomvc');
    await page.getByPlaceholder('What needs to be done?').fill('테스트 할일');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // When - 페이지 새로고침
    await page.reload();

    // Then - 할일이 유지됨
    await expect(page.getByTestId('todo-item')).toContainText('테스트 할일');
  });
});
