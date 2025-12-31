import { expect, test } from '../../fixtures/base.fixture';
import testData from '../../fixtures/test-data/example.json';

test.describe('Todo 필터 기능', () => {
  test.beforeEach(async ({ examplePage }) => {
    // Given - 할일 3개 추가하고 1개 완료
    await examplePage.goto();
    await examplePage.addTodos(testData.todos.items);
    await examplePage.completeTodo(testData.todos.items[0]); // 첫 번째 완료
  });

  test('Active 필터 클릭 시 미완료 항목만 표시', async ({ page, examplePage }) => {
    // When - Active 필터 클릭
    await page.getByRole('link', { name: 'Active' }).click();

    // Then - 미완료 항목만 표시 (2개)
    await expect(examplePage.todoItems).toHaveCount(2);
  });

  test('Completed 필터 클릭 시 완료 항목만 표시', async ({ page, examplePage }) => {
    // When - Completed 필터 클릭
    await page.getByRole('link', { name: 'Completed' }).click();

    // Then - 완료 항목만 표시 (1개)
    await expect(examplePage.todoItems).toHaveCount(1);
  });

  test('All 필터 클릭 시 모든 항목 표시', async ({ page, examplePage }) => {
    // Given - Completed 필터 상태
    await page.getByRole('link', { name: 'Completed' }).click();

    // When - All 필터 클릭
    await page.getByRole('link', { name: 'All' }).click();

    // Then - 모든 항목 표시 (3개)
    await expect(examplePage.todoItems).toHaveCount(3);
  });
});
