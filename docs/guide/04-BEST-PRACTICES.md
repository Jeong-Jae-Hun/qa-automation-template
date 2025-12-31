# 테스트 작성 모범 사례

좋은 테스트를 작성하기 위한 가이드입니다.

## 1. 테스트 이름 작성법

### 좋은 예

```typescript
test('잘못된 비밀번호 입력 시 에러 메시지 표시', ...)
test('장바구니에 상품 추가 시 수량 증가', ...)
test('로그아웃 후 로그인 페이지로 이동', ...)
```

### 나쁜 예

```typescript
test('테스트1', ...)
test('로그인', ...)
test('check button', ...)
```

## 2. Given-When-Then 구조

```typescript
test('할인 코드 적용 시 가격 변경', async ({ page }) => {
  // Given - 테스트 준비
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.addItem('상품A');

  // When - 테스트 동작
  await cartPage.applyDiscountCode('SAVE10');

  // Then - 검증
  await expect(cartPage.discountBadge).toBeVisible();
  await expect(cartPage.totalPrice).toContainText('할인');
});
```

## 3. 로케이터 우선순위

### 권장 순서

1. **역할 기반** (가장 권장)
```typescript
page.getByRole('button', { name: '로그인' })
page.getByRole('link', { name: '회원가입' })
```

2. **라벨 기반**
```typescript
page.getByLabel('이메일')
page.getByLabel('비밀번호')
```

3. **텍스트 기반**
```typescript
page.getByText('결제하기')
page.getByText('장바구니가 비어있습니다')
```

4. **Test ID** (개발팀 협업 필요)
```typescript
page.getByTestId('submit-button')
```

5. **CSS 선택자** (최후의 수단)
```typescript
page.locator('.submit-btn')
```

## 4. 테스트 독립성

### 좋은 예 - 각 테스트가 독립적

```typescript
test.beforeEach(async ({ page }) => {
  // 매 테스트 전 초기화
  await page.goto('/');
});

test('테스트 A', async ({ page }) => { ... });
test('테스트 B', async ({ page }) => { ... });
```

### 나쁜 예 - 테스트 간 의존성

```typescript
test('로그인', async ({ page }) => {
  // 로그인 수행
});

test('프로필 수정', async ({ page }) => {
  // 위 테스트의 로그인 상태에 의존 ❌
});
```

## 5. 대기 처리

### 좋은 예 - 명시적 대기

```typescript
// 요소가 보일 때까지 대기
await expect(page.getByText('로딩 완료')).toBeVisible();

// 네트워크 요청 대기
await page.waitForResponse('**/api/data');
```

### 나쁜 예 - 고정 대기

```typescript
// 하드코딩된 대기 시간 ❌
await page.waitForTimeout(3000);
```

## 6. 테스트 데이터

### 좋은 예 - 외부 파일로 관리

```typescript
// fixtures/test-data/users.json
import users from '../../fixtures/test-data/users.json';

test('로그인', async ({ page }) => {
  await loginPage.login(users.validUser.email, users.validUser.password);
});
```

### 나쁜 예 - 하드코딩

```typescript
test('로그인', async ({ page }) => {
  await loginPage.login('test@test.com', 'password123'); // ❌
});
```

## 7. 에러 메시지

### 좋은 예 - 명확한 검증

```typescript
await expect(page.getByRole('alert'))
  .toContainText('비밀번호가 올바르지 않습니다');
```

### 나쁜 예 - 존재 여부만 확인

```typescript
await expect(page.getByRole('alert')).toBeVisible(); // 내용 확인 안함 ❌
```

## 8. Page Object 활용

### 좋은 예 - 재사용 가능한 메서드

```typescript
// pages/LoginPage.ts
async login(email: string, password: string) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();
}

// 테스트에서 사용
await loginPage.login(email, password);
```

### 나쁜 예 - 테스트에서 직접 조작

```typescript
// 테스트 파일에서 직접 ❌
await page.fill('#email', email);
await page.fill('#password', password);
await page.click('button[type="submit"]');
```

## 체크리스트

테스트 작성 시 확인:

- [ ] 테스트 이름이 명확한가?
- [ ] Given-When-Then 구조를 따르는가?
- [ ] 다른 테스트에 의존하지 않는가?
- [ ] 하드코딩된 대기 시간이 없는가?
- [ ] 테스트 데이터가 외부 파일에 있는가?
- [ ] Page Object를 활용하는가?

## 다음 단계

[05. 팀 가이드](05-TEAM-GUIDE.md)에서 팀으로 협업하는 방법을 알아보세요.
