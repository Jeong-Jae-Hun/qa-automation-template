import { expect, test } from '../../fixtures/base.fixture';
import testData from '../../fixtures/test-data/example.json';

test.describe('Todo MVC 기본 기능', () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.goto();
  });

  test('새 할일을 추가할 수 있다', async ({ examplePage }) => {
    // Given - 빈 할일 목록
    await expect(examplePage.todoItems).toHaveCount(0);

    // When - 할일 추가
    await examplePage.addTodo(testData.todos.singleItem);

    // Then - 할일이 목록에 표시됨
    await expect(examplePage.todoItems).toHaveCount(1);
    await expect(examplePage.todoItems.first()).toContainText(testData.todos.singleItem);
  });

  test('여러 할일을 추가할 수 있다', async ({ examplePage }) => {
    // Given & When - 여러 할일 추가
    await examplePage.addTodos(testData.todos.items);

    // Then - 모든 할일이 표시됨
    await expect(examplePage.todoItems).toHaveCount(testData.todos.items.length);
  });

  test('할일을 완료 처리할 수 있다', async ({ examplePage }) => {
    // Given - 할일 추가
    const todoText = testData.todos.singleItem;
    await examplePage.addTodo(todoText);

    // When - 완료 체크
    await examplePage.completeTodo(todoText);

    // Then - 완료 스타일 적용됨
    const todoItem = examplePage.todoItems.filter({ hasText: todoText });
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('할일을 삭제할 수 있다', async ({ examplePage }) => {
    // Given - 할일 추가
    const todoText = testData.todos.singleItem;
    await examplePage.addTodo(todoText);
    await expect(examplePage.todoItems).toHaveCount(1);

    // When - 삭제
    await examplePage.deleteTodo(todoText);

    // Then - 목록에서 제거됨
    await expect(examplePage.todoItems).toHaveCount(0);
  });

  test('남은 할일 개수가 표시된다', async ({ examplePage }) => {
    // Given & When - 3개 할일 추가
    await examplePage.addTodos(testData.todos.items);

    // Then - 남은 개수 표시
    const remainingText = await examplePage.getRemainingText();
    expect(remainingText).toContain('3');
  });
});
