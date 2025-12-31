---
description: 새 테스트 케이스 생성
argument-hint: [테스트 설명]
allowed-tools: Read, Write, Edit, Glob, Grep
---

# 새 테스트 케이스 생성

사용자 요청: $ARGUMENTS

## 수행 단계

1. **요청 분석**
   - 테스트 대상 기능 파악
   - 필요한 Page Object 확인
   - 테스트 데이터 요구사항 식별

2. **기존 리소스 확인**
   - `pages/` 폴더에서 관련 Page Object 검색
   - `fixtures/test-data/` 에서 사용 가능한 데이터 확인
   - `tests/` 에서 유사한 테스트 패턴 참조

3. **필요한 파일 생성**
   - Page Object가 없으면 `pages/{Name}Page.ts` 생성 (BasePage 상속)
   - 테스트 파일 `tests/{그룹}/{테스트명}.spec.ts` 생성
   - 필요시 테스트 데이터 추가

4. **생성된 파일 검증**
   - TypeScript 문법 확인
   - 기존 패턴과 일관성 확인

## 테스트 구조 템플릿

```typescript
import { test, expect } from '@playwright/test';
import { XxxPage } from '../../pages/XxxPage';

test.describe('기능명', () => {
  test.beforeEach(async ({ page }) => {
    // 공통 설정
  });

  test('테스트 설명', async ({ page }) => {
    // Given - 준비
    const xxxPage = new XxxPage(page);
    await xxxPage.goto();

    // When - 실행
    await xxxPage.doSomething();

    // Then - 검증
    await expect(xxxPage.element).toBeVisible();
  });
});
```

## 출력 형식

생성 완료 후 안내:
```
생성된 파일:
- tests/{그룹}/{테스트명}.spec.ts
- pages/{Name}Page.ts (필요시)

다음 단계:
1. `npm test -- tests/{그룹}` 로 테스트 실행
2. 실패 시 수정 요청
```
