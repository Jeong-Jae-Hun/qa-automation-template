# 프로젝트 설정

프로젝트를 설정하는 방법입니다.

## 1. 프로젝트 복사

### GitHub 템플릿 사용 (권장)

1. GitHub 레포지토리 페이지에서 **"Use this template"** 버튼 클릭
2. 새 레포지토리 이름 입력 (예: `my-qa-tests`)
3. **"Create repository"** 클릭
4. 생성된 레포지토리 클론

```bash
git clone https://github.com/<username>/my-qa-tests.git
cd my-qa-tests
```

### 또는 직접 클론

```bash
git clone https://github.com/Jeong-Jae-Hun/qa-automation-template.git my-qa-tests
cd my-qa-tests
```

---

## 2. 의존성 설치

> Volta가 설치되어 있으면 프로젝트 진입 시 Node.js 버전이 자동 설정됩니다.

```bash
# 패키지 설치 (pnpm)
pnpm install

# Playwright 브라우저 설치
pnpm exec playwright install
```

### npm 사용 시

pnpm 대신 npm을 사용하려면:

```bash
npm install
npx playwright install
```

---

## 3. 환경 설정

```bash
# 환경 변수 파일 복사
cp .env.example .env
```

`.env` 파일을 열고 테스트할 사이트 URL 입력:

```
BASE_URL=https://your-staging-site.com
```

---

## 4. 설치 확인

```bash
# 예제 테스트 실행
pnpm test

# 또는 특정 브라우저만
pnpm test -- --project=chromium
```

모든 테스트가 통과하면 설치 완료!

---

## 5. VS Code 설정 (권장)

VS Code로 프로젝트를 열면:

```bash
code .
```

권장 확장 프로그램 설치 알림이 뜨면 **"Install All"** 클릭

---

## 지원 브라우저

`playwright.config.ts`에 설정된 테스트 환경:

| 프로젝트 | 설명 | 실행 방법 |
|---------|------|----------|
| `chromium` | Chrome 데스크톱 | `pnpm test -- --project=chromium` |
| `firefox` | Firefox 데스크톱 | `pnpm test -- --project=firefox` |
| `webkit` | Safari 데스크톱 | `pnpm test -- --project=webkit` |
| `edge` | Edge 데스크톱 | `pnpm test -- --project=edge` |
| `mobile-chrome` | Android Chrome | `pnpm test -- --project=mobile-chrome` |
| `mobile-safari` | iOS Safari | `pnpm test -- --project=mobile-safari` |

### 모든 브라우저 테스트

```bash
pnpm test
```

### 특정 브라우저만 테스트

```bash
pnpm test -- --project=chromium --project=webkit
```

---

## 폴더 구조

```
├── tests/              # 테스트 스크립트
│   └── example/        # 예제 테스트
├── pages/              # Page Object (페이지별 요소/액션)
├── fixtures/           # 테스트 데이터
│   └── test-data/      # JSON 데이터 파일
├── components/         # 재사용 컴포넌트
├── config/             # 환경 설정
├── docs/               # 문서
├── .claude/            # Claude Code 설정
└── reports/            # 테스트 결과 (자동 생성)
```

---

## 다음 단계

설치가 완료되었으면 [첫 테스트 작성](../guide/01-FIRST-TEST.md)으로 이동하세요.

## 문제 해결

설치 중 문제가 발생하면 [트러블슈팅](../reference/02-TROUBLESHOOTING.md)을 참고하세요.
