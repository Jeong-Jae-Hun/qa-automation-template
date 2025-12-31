import { test as base, type TestInfo } from '@playwright/test';
import { ExamplePage } from '../pages';

/**
 * 테스트 환경 정보
 */
export interface TestEnvironment {
  project: string;
  browserName: string;
  platform: string;
  isEmulated: boolean;
  viewport: { width: number; height: number } | null;
  userAgent: string;
}

/**
 * 수동 테스트 필요 항목 표시
 */
export interface ManualTestNote {
  reason: string;
  platforms?: string[];
}

/**
 * 커스텀 fixture 타입 정의
 */
type CustomFixtures = {
  examplePage: ExamplePage;
  testEnv: TestEnvironment;
  requiresManualTest: (note: ManualTestNote) => void;
};

/**
 * 현재 테스트 환경 정보 수집
 */
function getTestEnvironment(testInfo: TestInfo): TestEnvironment {
  const project = testInfo.project.name;
  const browserName = testInfo.project.use?.browserName || 'unknown';
  const viewport = testInfo.project.use?.viewport || null;
  const userAgent = testInfo.project.use?.userAgent || '';

  // 모바일 에뮬레이션 여부 판단
  const isEmulated = project.includes('mobile') ||
    userAgent.includes('Mobile') ||
    (viewport && viewport.width < 768);

  return {
    project,
    browserName,
    platform: process.platform,
    isEmulated: isEmulated || false,
    viewport,
    userAgent: userAgent.substring(0, 50) + '...',
  };
}

/**
 * Page Object를 fixture로 제공
 * 테스트에서 직접 Page Object를 사용할 수 있습니다.
 *
 * @example
 * test('할일 추가', async ({ examplePage, testEnv }) => {
 *   console.log('실행 환경:', testEnv);
 *   await examplePage.goto();
 *   await examplePage.addTodo('테스트 할일');
 * });
 *
 * @example
 * test('스와이프 제스처', async ({ page, requiresManualTest }) => {
 *   requiresManualTest({
 *     reason: '터치 제스처는 실기기에서 확인 필요',
 *     platforms: ['iOS Safari', 'Android Chrome']
 *   });
 *   // 에뮬레이션 테스트 진행...
 * });
 */
export const test = base.extend<CustomFixtures>({
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },

  testEnv: async ({}, use, testInfo) => {
    const env = getTestEnvironment(testInfo);
    await use(env);
  },

  requiresManualTest: async ({}, use, testInfo) => {
    const notes: ManualTestNote[] = [];

    const addNote = (note: ManualTestNote) => {
      notes.push(note);
    };

    await use(addNote);

    // 테스트 종료 후 수동 테스트 필요 항목 첨부
    if (notes.length > 0) {
      const annotation = notes.map(n =>
        `[수동 테스트 필요] ${n.reason}` +
        (n.platforms ? ` (${n.platforms.join(', ')})` : '')
      ).join('\n');

      testInfo.annotations.push({
        type: 'manual-test-required',
        description: annotation,
      });
    }
  },
});

export { expect } from '@playwright/test';
export type { TestInfo };
