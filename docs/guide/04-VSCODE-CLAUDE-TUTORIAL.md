# VSCode + Claude 실전 튜토리얼

> 피쳐 분석부터 테스트 커밋까지, 전체 워크플로우

---

## 개요

이 문서는 **실제 피쳐를 받았을 때** VSCode와 Claude를 활용해서 테스트를 완성하는 전체 과정을 다룹니다.

### 이 문서에서 다루는 것

1. 피쳐 요구사항 분석
2. 테스트 케이스 설계
3. Claude로 테스트 코드 생성
4. 실행 및 디버깅
5. Git 커밋까지

### 사전 준비

- [VS Code + Claude 설정](../setup/05-VSCODE-SETUP.md) 완료
- 프로젝트 폴더가 VSCode에서 열려있음

---

## 시나리오: 상품 검색 기능 테스트

### 받은 피쳐 요구사항

```
[기능] 상품 검색
- 검색창에 키워드 입력 후 엔터
- 키워드가 포함된 상품 목록 표시
- 검색 결과 없으면 "검색 결과가 없습니다" 표시
```

이제 이 피쳐에 대한 테스트를 작성해봅니다.

---

## Step 1: 피쳐 분석 (Claude와 대화)

### 1-1. Claude 채팅 열기

1. VSCode 왼쪽 사이드바에서 **Claude 아이콘** 클릭
2. 채팅 패널이 열림

### 1-2. 피쳐 분석 요청

Claude에게 피쳐를 분석해달라고 요청합니다:

```
상품 검색 기능을 테스트하려고 해.

기능:
- 검색창에 키워드 입력 후 엔터
- 키워드가 포함된 상품 목록 표시
- 검색 결과 없으면 "검색 결과가 없습니다" 표시

어떤 테스트 케이스가 필요할지 정리해줘
```

### 1-3. Claude 응답 예시

```
상품 검색 기능 테스트 케이스:

1. 정상 케이스
   - 키워드 입력 → 검색 결과 표시
   - 검색 결과에 키워드가 포함되어 있는지 확인

2. 빈 결과 케이스
   - 없는 키워드 검색 → "검색 결과가 없습니다" 표시

3. 엣지 케이스
   - 빈 검색어로 검색 시도
   - 특수문자만 입력
   - 아주 긴 검색어
```

---

## Step 2: 테스트 케이스 확정

### 2-1. 우선순위 결정

모든 케이스를 한 번에 만들지 않고, 핵심 케이스부터 시작:

```
지금은 핵심 케이스 2개만 만들자:
1. 키워드 검색 → 결과 표시
2. 없는 키워드 → 빈 결과 메시지

나머지는 나중에 추가할게
```

### 2-2. Claude에게 URL 정보 제공

테스트 대상 URL을 알려줍니다:

```
검색 페이지 URL은 https://example.com/search 야.
검색창은 placeholder가 "상품 검색"이고,
검색 결과는 .product-card 클래스로 표시돼
```

---

## Step 3: 테스트 코드 생성

### 3-1. 테스트 생성 요청

```
상품 검색 테스트 만들어줘.
tests/search/product-search.spec.ts 에 저장해줘.

테스트 케이스:
1. "노트북" 검색하면 상품 목록이 표시됨
2. "ㅁㄴㅇㄹㅁㄴㅇㄹ" 검색하면 빈 결과 메시지 표시
```

### 3-2. Claude가 생성한 코드 확인

Claude가 코드를 생성하면:

1. **"파일에 적용"** 또는 **"새 파일로 저장"** 버튼 클릭
2. 파일 경로 확인 후 저장

```typescript
// tests/search/product-search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('상품 검색', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/search');
  });

  test('키워드 검색 시 상품 목록 표시', async ({ page }) => {
    // Given - 검색 페이지에서
    const searchInput = page.getByPlaceholder('상품 검색');

    // When - 키워드 입력 후 엔터
    await searchInput.fill('노트북');
    await searchInput.press('Enter');

    // Then - 상품 카드가 표시됨
    const products = page.locator('.product-card');
    await expect(products.first()).toBeVisible();
    await expect(products).toHaveCountGreaterThan(0);
  });

  test('검색 결과 없을 때 메시지 표시', async ({ page }) => {
    // Given - 검색 페이지에서
    const searchInput = page.getByPlaceholder('상품 검색');

    // When - 없는 키워드 검색
    await searchInput.fill('ㅁㄴㅇㄹㅁㄴㅇㄹ');
    await searchInput.press('Enter');

    // Then - 빈 결과 메시지 표시
    await expect(page.getByText('검색 결과가 없습니다')).toBeVisible();
  });
});
```

### 3-3. Page Object 필요시 추가 요청

테스트가 복잡해지면 Page Object를 요청:

```
검색 페이지용 Page Object도 만들어줘.
pages/SearchPage.ts 에 저장해줘.
```

---

## Step 4: 테스트 실행

### 4-1. 테스트 탐색기에서 실행

1. 왼쪽 **테스트 아이콘** (플라스크 모양) 클릭
2. `product-search.spec.ts` 찾기
3. **▶** 버튼으로 실행

### 4-2. 또는 터미널에서 실행

```bash
# 특정 파일만 실행
npx playwright test tests/search/product-search.spec.ts

# headed 모드로 브라우저 보면서 실행
npx playwright test tests/search/ --headed
```

### 4-3. 결과 확인

**성공 시:**
```
  ✓ 키워드 검색 시 상품 목록 표시 (1.2s)
  ✓ 검색 결과 없을 때 메시지 표시 (0.9s)
```

**실패 시:**
```
  ✗ 키워드 검색 시 상품 목록 표시
    Error: locator.toBeVisible: Timeout 30000ms exceeded.
```

---

## Step 5: 실패 시 디버깅

### 5-1. 에러 메시지 복사해서 Claude에게

```
이 에러가 발생했어:

Error: locator.toBeVisible: Timeout 30000ms exceeded.
Waiting for locator('.product-card')

어떻게 해결해야 해?
```

### 5-2. Claude 응답 예시

```
.product-card 셀렉터가 맞는지 확인해야 해.
몇 가지 가능성:

1. 클래스명이 다름 → 개발자도구에서 확인
2. 로딩 시간 필요 → waitForSelector 추가
3. 결과가 없음 → 검색 키워드 확인

브라우저로 직접 확인해볼까?
```

### 5-3. Headed 모드로 디버깅

```
브라우저 보면서 테스트 실행해줘
```

Claude가 실행:
```bash
npx playwright test tests/search/product-search.spec.ts --headed --debug
```

### 5-4. 셀렉터 수정

실제 클래스가 다른 경우:

```
실제로는 .search-result-item 클래스야. 수정해줘
```

---

## Step 6: 테스트 통과 후 커밋

### 6-1. 변경 파일 확인

1. 왼쪽 **소스 제어** 아이콘 클릭
2. 변경된 파일 목록 확인:
   - `tests/search/product-search.spec.ts`
   - `pages/SearchPage.ts` (만들었다면)

### 6-2. Stage 및 커밋

1. 파일 옆 **+** 클릭하여 Stage
2. 커밋 메시지 입력:
   ```
   test: 상품 검색 테스트 추가
   ```
3. **✓** 클릭하여 Commit

### 6-3. Push

1. 하단 상태바에서 **↑** 클릭
2. 또는 Source Control 메뉴에서 Push

---

## 전체 흐름 요약

```
1. 피쳐 요구사항 받음
      ↓
2. Claude와 대화 → 테스트 케이스 도출
      ↓
3. Claude에게 테스트 코드 요청
      ↓
4. 생성된 코드를 파일로 저장
      ↓
5. 테스트 실행 (테스트 탐색기 또는 터미널)
      ↓
6. 실패 시 → Claude에게 에러 공유 → 수정
      ↓
7. 성공 시 → Git 커밋 & Push
```

---

## 팁

### Claude에게 요청할 때

- **구체적으로**: "로그인 테스트 만들어줘" 보다 "이메일/비밀번호 입력 후 로그인 버튼 클릭하면 대시보드로 이동하는 테스트"
- **컨텍스트 제공**: URL, 셀렉터, 예상 동작을 알려주기
- **작게 시작**: 핵심 케이스부터, 엣지 케이스는 나중에

### 디버깅할 때

- **headed 모드** 적극 활용: 브라우저에서 실제 동작 확인
- **스크린샷 확인**: 실패 시 `test-results/` 폴더에 자동 저장됨
- **개발자도구**: F12로 실제 DOM 구조 확인

### 커밋할 때

- **테스트 통과 확인 후** 커밋
- **작은 단위로** 자주 커밋
- **명확한 메시지**: `test: OOO 테스트 추가`

---

## 다음 단계

- [모범 사례](03-BEST-PRACTICES.md) - 좋은 테스트 작성 팁
- [팀 가이드](../operations/01-TEAM-GUIDE.md) - 브랜치 전략, 리뷰 방법
