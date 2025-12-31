import { expect, test } from '../../fixtures/base.fixture';

/**
 * 테스트 환경 정보 활용 예시
 *
 * testEnv: 현재 실행 환경 정보 (브라우저, 플랫폼, 에뮬레이션 여부)
 * requiresManualTest: 실기기 테스트 필요 항목 표시
 */
test.describe('테스트 환경 확인', () => {
  test('현재 테스트 환경 정보를 확인할 수 있다', async ({ page, testEnv }) => {
    // 현재 환경 정보 출력
    console.log('\n========== 테스트 환경 ==========');
    console.log(`프로젝트: ${testEnv.project}`);
    console.log(`브라우저: ${testEnv.browserName}`);
    console.log(`플랫폼: ${testEnv.platform}`);
    console.log(`에뮬레이션: ${testEnv.isEmulated ? '예' : '아니오'}`);
    if (testEnv.viewport) {
      console.log(`뷰포트: ${testEnv.viewport.width}x${testEnv.viewport.height}`);
    }
    console.log('================================\n');

    // 테스트 진행
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test('모바일 환경에서는 추가 확인 필요 표시', async ({
    page,
    testEnv,
    requiresManualTest,
  }) => {
    // 모바일 에뮬레이션일 경우 실기기 테스트 필요 표시
    if (testEnv.isEmulated) {
      requiresManualTest({
        reason: '터치 제스처와 키보드 동작은 실기기에서 추가 확인 필요',
        platforms: ['iOS Safari', 'Android Chrome'],
      });
    }

    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page.locator('.new-todo')).toBeVisible();
  });
});

test.describe('수동 테스트 필요 표시 예시', () => {
  test('스와이프 삭제 기능', async ({ page, requiresManualTest }) => {
    // 이 테스트는 에뮬레이션으로 기본 동작만 확인하고
    // 실기기에서 스와이프 동작 확인이 필요함을 표시
    requiresManualTest({
      reason: '스와이프 제스처는 에뮬레이션으로 완전히 재현 불가',
      platforms: ['iOS Safari', 'Android Chrome'],
    });

    await page.goto('https://demo.playwright.dev/todomvc');

    // 기본 삭제 동작 테스트 (클릭 방식)
    await page.locator('.new-todo').fill('테스트 할일');
    await page.locator('.new-todo').press('Enter');

    const todoItem = page.locator('.todo-list li').first();
    await todoItem.hover();
    await todoItem.locator('.destroy').click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('줌 제스처', async ({ page, requiresManualTest }) => {
    requiresManualTest({
      reason: '핀치줌 동작 확인 필요',
      platforms: ['iOS Safari', 'Android Chrome'],
    });

    await page.goto('https://demo.playwright.dev/todomvc');
    // 줌 관련 CSS가 적용되는지만 확인
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
