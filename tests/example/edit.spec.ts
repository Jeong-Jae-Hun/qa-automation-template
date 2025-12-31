import { test, expect } from '../../fixtures/base.fixture';

test.describe('Todo 수정 기능', () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.goto();
    await examplePage.addTodo('수정할 할일');
  });

  test('할일을 더블클릭하면 수정 모드로 전환', async ({ examplePage }) => {
    // When - 할일 더블클릭
    const todoItem = examplePage.todoItems.first();
    await todoItem.dblclick();

    // Then - 수정 입력창이 나타남
    const editInput = todoItem.getByRole('textbox');
    await expect(editInput).toBeVisible();
    await expect(editInput).toHaveValue('수정할 할일');
  });

  test('수정 후 Enter 키로 저장', async ({ examplePage }) => {
    // Given - 수정 모드 진입
    const todoItem = examplePage.todoItems.first();
    await todoItem.dblclick();

    // When - 내용 수정 후 Enter
    const editInput = todoItem.getByRole('textbox');
    await editInput.fill('수정된 할일');
    await editInput.press('Enter');

    // Then - 수정된 내용으로 표시
    await expect(examplePage.todoItems.first()).toContainText('수정된 할일');
  });

  test('수정 중 Escape 키로 취소', async ({ examplePage }) => {
    // Given - 수정 모드 진입
    const todoItem = examplePage.todoItems.first();
    await todoItem.dblclick();

    // When - 내용 변경 후 Escape
    const editInput = todoItem.getByRole('textbox');
    await editInput.fill('취소될 내용');
    await editInput.press('Escape');

    // Then - 원래 내용 유지
    await expect(examplePage.todoItems.first()).toContainText('수정할 할일');
  });
});
