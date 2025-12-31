# QA 자동화 프로젝트 - Claude 가이드

## 기본 원칙

- **한국어로 소통**: QA팀이 자연어로 요청하면 Claude가 스크립트 생성
- **테스트는 한글 설명**: describe/it 블록에 한글 사용
- **기존 패턴 준수**: pages/, components/ 구조 활용

## 핵심 워크플로우

### 테스트 케이스 요청 → 스크립트 생성

QA팀이 이렇게 요청하면:
```
"로그인 페이지에서 잘못된 비밀번호로 로그인 시도하면
에러 메시지가 표시되는지 테스트해줘"
```

Claude는 다음을 수행:
1. `pages/LoginPage.ts` 확인 (없으면 생성)
2. `tests/auth/login-error.spec.ts` 생성
3. `fixtures/test-data/users.json`에서 테스트 데이터 활용

### 테스트 스크립트 구조

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('로그인 기능', () => {
  test('잘못된 비밀번호 입력 시 에러 메시지 표시', async ({ page }) => {
    // Given - 테스트 준비
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // When - 액션 수행
    await loginPage.login('user@test.com', 'wrong-password');

    // Then - 검증
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
```

## 파일 생성 규칙

### 테스트 파일 네이밍
- 위치: `tests/{기능그룹}/{테스트명}.spec.ts`
- 형식: kebab-case (예: `login-error.spec.ts`)
- 그룹: auth, checkout, user, admin 등

### Page Object 네이밍
- 위치: `pages/{페이지명}Page.ts`
- 형식: PascalCase (예: `LoginPage.ts`)
- 기반 클래스: `BasePage` 상속 필수

### 테스트 데이터
- 위치: `fixtures/test-data/{데이터명}.json`
- 민감정보: 환경변수로 관리 (.env)

## 자주 쓰는 커맨드

| 커맨드 | 설명 | 예시 |
|--------|------|------|
| `/qa new-test` | 새 테스트 케이스 생성 | `/qa new-test 로그인 실패 테스트` |
| `/qa run-test` | 테스트 실행 | `/qa run-test auth` |
| `/qa record` | 브라우저 녹화 시작 | `/qa record https://example.com` |
| `/qa help` | 도움말 | `/qa help` |

## Page Object Model 패턴

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // 로케이터 정의
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('이메일');
    this.passwordInput = page.getByLabel('비밀번호');
    this.submitButton = page.getByRole('button', { name: '로그인' });
    this.errorMessage = page.getByRole('alert');
  }

  // 액션 메서드
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## 로케이터 우선순위

1. `getByRole()` - 역할 기반 (권장)
2. `getByLabel()` - 라벨 기반
3. `getByText()` - 텍스트 기반
4. `getByTestId()` - data-testid 속성
5. CSS 셀렉터 - 최후의 수단

## 테스트 데이터 관리

### JSON 형식 (fixtures/test-data/users.json)
```json
{
  "validUser": {
    "email": "test@example.com",
    "password": "valid-password"
  },
  "invalidUser": {
    "email": "test@example.com",
    "password": "wrong-password"
  }
}
```

### 사용 방법
```typescript
import users from '../../fixtures/test-data/users.json';

test('로그인 테스트', async ({ page }) => {
  await loginPage.login(users.validUser.email, users.validUser.password);
});
```

## 리포트 확인

테스트 실행 후:
- HTML 리포트: `npm run report`
- 스크린샷: `reports/screenshots/`

## 주의사항

- `.env` 파일은 **절대 커밋하지 않음** (.gitignore에 포함)
- 테스트 간 **독립성 유지** - 다른 테스트에 의존하지 않음
- **Given-When-Then** 패턴으로 테스트 구조화
