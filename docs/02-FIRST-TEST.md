# 첫 테스트 작성하기

Claude Code를 사용해서 첫 번째 테스트를 만들어봅니다.

## 1. Claude Code 시작

터미널에서 프로젝트 폴더로 이동 후:

```bash
claude
```

## 2. 자연어로 테스트 요청

Claude에게 한국어로 테스트를 요청합니다:

```
로그인 페이지에서 이메일과 비밀번호를 입력하고
로그인 버튼을 클릭하면 대시보드로 이동하는지 테스트해줘
```

Claude가 자동으로:
1. `pages/LoginPage.ts` 생성
2. `tests/auth/login.spec.ts` 생성
3. 필요한 테스트 데이터 추가

## 3. 생성된 파일 확인

Claude가 생성한 파일들을 확인합니다:

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('이메일');
    this.passwordInput = page.getByLabel('비밀번호');
    this.loginButton = page.getByRole('button', { name: '로그인' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## 4. 테스트 실행

```bash
# Claude에게 요청
테스트 실행해줘

# 또는 커맨드 사용
/qa run-test auth
```

## 5. 결과 확인

테스트가 실패하면 Claude에게 수정 요청:

```
로그인 버튼이 "Sign In"이라고 되어있어. 수정해줘
```

## 실습: 브라우저 녹화로 테스트 만들기

복잡한 테스트는 녹화 기능을 활용합니다:

```
/qa record https://your-site.com/login
```

1. 브라우저가 열립니다
2. 테스트하고 싶은 동작을 수행합니다
3. 브라우저를 닫으면 코드가 생성됩니다

녹화 후 Claude에게 정리 요청:

```
방금 녹화한 코드를 깔끔하게 정리해줘
```

## 테스트 구조 이해하기

```typescript
test.describe('기능 그룹', () => {
  test('테스트 이름', async ({ page }) => {
    // Given - 준비
    // 테스트 전 상태 설정

    // When - 실행
    // 테스트할 동작 수행

    // Then - 검증
    // 결과 확인
  });
});
```

## 다음 단계

첫 테스트를 작성했으면 [03. 워크플로우](03-WORKFLOW.md)에서 일일 작업 방식을 알아보세요.
