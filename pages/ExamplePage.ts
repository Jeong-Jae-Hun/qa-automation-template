import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Playwright 데모 페이지 (Todo MVC)
 * https://demo.playwright.dev/todomvc
 */
export class ExamplePage extends BasePage {
  // 로케이터 정의
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
  }

  /**
   * Todo MVC 페이지로 이동
   */
  async goto() {
    await super.goto('/todomvc');
  }

  /**
   * 새 할일 추가
   */
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * 여러 할일 추가
   */
  async addTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  /**
   * 특정 할일 완료 체크
   */
  async completeTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.getByRole('checkbox').check();
  }

  /**
   * 특정 할일 삭제
   */
  async deleteTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByRole('button', { name: 'Delete' }).click();
  }

  /**
   * 할일 개수 가져오기
   */
  async getTodoCount(): Promise<number> {
    return this.todoItems.count();
  }

  /**
   * 남은 할일 텍스트 가져오기
   */
  async getRemainingText(): Promise<string> {
    return this.todoCount.innerText();
  }
}
