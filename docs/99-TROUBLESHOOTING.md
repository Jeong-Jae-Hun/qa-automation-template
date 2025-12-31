# 문제 해결

자주 발생하는 문제와 해결 방법입니다.

## 설치 관련

### Node.js 버전 오류

**증상:**
```
error engine node@16.x.x: NOT compatible with ^18.0.0
```

**해결:**
```bash
# Node.js 버전 확인
node --version

# 18 이상으로 업그레이드
nvm install 20
nvm use 20
```

### Playwright 브라우저 설치 실패

**증상:**
```
browserType.launch: Executable doesn't exist
```

**해결:**
```bash
npx playwright install
```

### 권한 오류 (Mac)

**증상:**
```
EACCES: permission denied
```

**해결:**
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

## 테스트 실행 관련

### 요소를 찾을 수 없음

**증상:**
```
Error: locator.click: Target closed
Error: Timeout waiting for element
```

**원인:**
- 셀렉터가 잘못됨
- 페이지 로딩 전에 클릭 시도

**해결:**
```typescript
// 요소가 보일 때까지 대기
await expect(page.getByRole('button')).toBeVisible();
await page.getByRole('button').click();
```

### 타임아웃 오류

**증상:**
```
Test timeout of 30000ms exceeded
```

**해결:**

1. 특정 테스트만 타임아웃 늘리기:
```typescript
test('느린 테스트', async ({ page }) => {
  test.setTimeout(60000); // 60초
  // ...
});
```

2. 전체 설정 변경 (playwright.config.ts):
```typescript
timeout: 60 * 1000,
```

### 브라우저가 열리지 않음

**증상:**
테스트는 실행되지만 브라우저 창이 안 보임

**해결:**
```bash
# headed 모드로 실행
npm run test:headed
```

## Claude Code 관련

### Claude가 파일을 못 찾음

**증상:**
```
"pages/LoginPage.ts 파일을 찾을 수 없습니다"
```

**해결:**
```bash
# 프로젝트 폴더에서 Claude 실행
cd ~/projects/qa-automation-template
claude
```

### 커맨드가 작동하지 않음

**증상:**
```
/qa new-test 입력해도 반응 없음
```

**해결:**
1. `.claude/commands/qa/` 폴더 확인
2. 파일이 있는지 확인
3. 없으면 다시 설치

## Git 관련

### 커밋이 안 됨

**증상:**
```
Please tell me who you are
```

**해결:**
```bash
git config --global user.name "이름"
git config --global user.email "이메일@example.com"
```

### 푸시가 안 됨

**증상:**
```
Permission denied (publickey)
```

**해결:**
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "이메일@example.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub Settings > SSH Keys에 추가
```

## 환경 관련

### .env 파일이 적용 안 됨

**증상:**
BASE_URL이 기본값으로 실행됨

**해결:**
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용 확인:
```
BASE_URL=https://your-site.com
```
3. 테스트 재실행

### 다른 환경에서 테스트

**해결:**
```bash
# 환경 변수로 URL 지정
BASE_URL=https://staging.example.com npm test
```

## 리포트 관련

### 리포트가 안 열림

**증상:**
```
npm run report 실행 시 아무 반응 없음
```

**해결:**
```bash
# 테스트 먼저 실행
npm test

# 그 다음 리포트 열기
npm run report
```

### 스크린샷이 없음

**증상:**
실패한 테스트인데 스크린샷이 없음

**해결:**
playwright.config.ts 확인:
```typescript
use: {
  screenshot: 'only-on-failure',
}
```

## 도움 요청

위 방법으로 해결되지 않으면:

1. 에러 메시지 전체 복사
2. Claude에게 질문:
```
이런 에러가 발생했어:
[에러 메시지 붙여넣기]
```

3. 또는 팀 채널에 공유
