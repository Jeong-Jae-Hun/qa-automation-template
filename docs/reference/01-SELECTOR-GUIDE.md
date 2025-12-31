# 셀렉터 가이드

> 안정적인 테스트를 위한 요소 선택 전략

---

## 셀렉터 우선순위

### 1순위: 역할 기반 (Role-based) ⭐ 권장

```typescript
// 버튼
page.getByRole('button', { name: '로그인' })
page.getByRole('button', { name: '결제하기' })

// 링크
page.getByRole('link', { name: '회원가입' })
page.getByRole('link', { name: '장바구니' })

// 입력
page.getByRole('textbox', { name: '이메일' })
page.getByRole('spinbutton', { name: '수량' })

// 체크박스/라디오
page.getByRole('checkbox', { name: '약관 동의' })
page.getByRole('radio', { name: '신용카드' })

// 드롭다운
page.getByRole('combobox', { name: '배송지 선택' })

// 테이블
page.getByRole('row', { name: '상품명' })
page.getByRole('cell', { name: '10,000원' })
```

**장점**: 접근성 속성 기반이라 UI 변경에 강함

### 2순위: 라벨 기반 (Label-based)

```typescript
// 폼 요소
page.getByLabel('이메일')
page.getByLabel('비밀번호')
page.getByLabel('주소')
```

**장점**: 사용자가 보는 라벨과 동일, 직관적

### 3순위: 텍스트 기반 (Text-based)

```typescript
// 정확히 일치
page.getByText('결제 완료')

// 부분 일치
page.getByText('완료', { exact: false })

// 정규식
page.getByText(/\d+원/)
```

**주의**: 다국어 지원 시 깨질 수 있음

### 4순위: 테스트 ID (Test ID)

```typescript
page.getByTestId('submit-button')
page.getByTestId('product-card')
page.getByTestId('cart-count')
```

**장점**: 개발팀과 협의하면 가장 안정적
**단점**: 프로덕션 코드에 테스트용 속성 추가 필요

### 5순위: CSS/XPath (최후의 수단)

```typescript
// CSS
page.locator('.product-card')
page.locator('#main-content')
page.locator('[data-price]')

// XPath (가능하면 피하기)
page.locator('//div[@class="container"]//button')
```

**주의**: 클래스명은 자주 변경되므로 깨지기 쉬움

---

## 상황별 가이드

### 폼 입력

```typescript
// 좋음 ✅
await page.getByLabel('이메일').fill('test@example.com');
await page.getByLabel('비밀번호').fill('password123');
await page.getByRole('button', { name: '로그인' }).click();

// 나쁨 ❌
await page.locator('#email').fill('test@example.com');
await page.locator('input[type="password"]').fill('password123');
await page.locator('.btn-primary').click();
```

### 목록에서 특정 항목 선택

```typescript
// 좋음 ✅
await page.getByRole('listitem').filter({ hasText: '상품A' }).click();

// 또는
await page.getByTestId('product-card').filter({ hasText: '상품A' }).click();

// 나쁨 ❌
await page.locator('.product-list > div:nth-child(3)').click();
```

### 모달/팝업

```typescript
// 좋음 ✅
const modal = page.getByRole('dialog');
await modal.getByRole('button', { name: '확인' }).click();

// 나쁨 ❌
await page.locator('.modal .btn-confirm').click();
```

### 테이블

```typescript
// 좋음 ✅
const row = page.getByRole('row', { name: /홍길동/ });
await row.getByRole('button', { name: '삭제' }).click();

// 나쁨 ❌
await page.locator('table tr:nth-child(2) td:last-child button').click();
```

### 동적 컨텐츠

```typescript
// 좋음 ✅
// 먼저 보일 때까지 대기
await expect(page.getByText('로딩 완료')).toBeVisible();
await page.getByRole('button', { name: '다음' }).click();

// 나쁨 ❌
await page.waitForTimeout(3000); // 하드코딩된 대기
await page.locator('.next-btn').click();
```

---

## 개발팀 요청 사항

### data-testid 추가 요청

테스트하기 어려운 요소에 `data-testid` 추가 요청:

```html
<!-- 요청 전 -->
<button class="btn btn-primary submit">결제하기</button>

<!-- 요청 후 -->
<button class="btn btn-primary submit" data-testid="checkout-submit">결제하기</button>
```

### 요청 템플릿

```
[요청] data-testid 추가

페이지: 결제 페이지 (/checkout)
요소: 결제 완료 버튼
현재: <button class="btn-primary">결제하기</button>
요청: data-testid="checkout-submit" 추가

사유: 클래스명 변경 시 테스트 깨짐 방지
```

---

## 셀렉터 디버깅

### Playwright Inspector 사용

```bash
npx playwright test --debug
```

### 브라우저 콘솔에서 확인

```javascript
// 크롬 개발자 도구에서
document.querySelector('[role="button"][name="로그인"]')
```

### 로케이터 테스트

```typescript
// 테스트 파일에서
test('셀렉터 확인', async ({ page }) => {
  await page.goto('/login');

  // 요소가 있는지 확인
  const count = await page.getByRole('button').count();
  console.log(`버튼 개수: ${count}`);

  // 텍스트 확인
  const text = await page.getByRole('heading').textContent();
  console.log(`제목: ${text}`);
});
```

---

## 체크리스트

테스트 작성 시 확인:

- [ ] 역할 기반 셀렉터 사용했는가?
- [ ] CSS 클래스 대신 의미 있는 속성 사용했는가?
- [ ] nth-child 같은 위치 기반 셀렉터 피했는가?
- [ ] 하드코딩된 대기 시간 없는가?
- [ ] 요소가 보일 때까지 기다리는가?
