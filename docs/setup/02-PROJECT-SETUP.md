# 설치 가이드

프로젝트를 설정하는 방법입니다.

## 1. 프로젝트 복사

### GitHub 템플릿 사용 (권장)

1. GitHub 레포지토리 페이지에서 **"Use this template"** 버튼 클릭
2. 새 레포지토리 이름 입력 (예: `my-qa-tests`)
3. **"Create repository"** 클릭

### 또는 직접 클론

```bash
git clone <레포지토리-URL>
cd <폴더명>
```

## 2. 의존성 설치

```bash
# 패키지 설치
npm install

# Playwright 브라우저 설치
npx playwright install
```

## 3. 환경 설정

```bash
# 환경 변수 파일 복사
cp .env.example .env
```

`.env` 파일을 열고 테스트할 사이트 URL 입력:

```
BASE_URL=https://your-staging-site.com
```

## 4. 설치 확인

```bash
# 예제 테스트 실행
npm test
```

모든 테스트가 통과하면 설치 완료!

## 5. VS Code 설정 (선택)

VS Code로 프로젝트를 열면:

```bash
code .
```

권장 확장 프로그램 설치 알림이 뜨면 **"Install All"** 클릭

## 폴더 구조 이해하기

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

## 다음 단계

설치가 완료되었으면 [02. 첫 테스트](02-FIRST-TEST.md)로 이동하세요.
