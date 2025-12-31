# QA Automation Template

Claude Code + Playwright 기반 QA 자동화 템플릿

## 특징

- **자연어로 테스트 작성**: Claude에게 한국어로 요청하면 테스트 스크립트 자동 생성
- **Page Object Model**: 재사용 가능한 구조
- **크로스 브라우저**: Chrome, Firefox, Safari, Edge + 모바일 에뮬레이션
- **완전한 가이드**: Git 설치부터 팀 운영까지 문서화

## 지원 환경

| 항목 | 버전 |
|------|------|
| Node.js | 22.x LTS (Volta 자동 관리) |
| pnpm | 10.x |
| OS | macOS, Windows 10+, Linux |

## 빠른 시작

### 1. 템플릿 사용

GitHub에서 "Use this template" 버튼 클릭

### 2. 설치

```bash
git clone <your-repo-url>
cd <your-repo-name>

# pnpm 설치 (없는 경우)
npm install -g pnpm

# 의존성 설치
pnpm install

# Playwright 브라우저 설치
pnpm exec playwright install
```

### 3. 환경 설정

```bash
cp .env.example .env
# .env 파일에서 BASE_URL 수정
```

### 4. 테스트 실행

```bash
# 모든 브라우저
pnpm test

# 특정 브라우저만
pnpm test -- --project=chromium
```

## 지원 브라우저

| 프로젝트 | 설명 |
|---------|------|
| `chromium` | Chrome 데스크톱 |
| `firefox` | Firefox 데스크톱 |
| `webkit` | Safari 데스크톱 |
| `edge` | Edge 데스크톱 |
| `mobile-chrome` | Android Chrome |
| `mobile-safari` | iOS Safari |

## Claude Code로 테스트 작성

```bash
# Claude Code 실행
claude

# 자연어로 테스트 요청
> 로그인 페이지에서 잘못된 비밀번호 입력하면 에러 나오는지 테스트해줘
```

## 커맨드

| 커맨드 | 설명 |
|--------|------|
| `/qa new-test [설명]` | 새 테스트 생성 |
| `/qa run-test [대상]` | 테스트 실행 |
| `/qa record [URL]` | 브라우저 녹화 |
| `/qa help` | 도움말 |

## 프로젝트 구조

```
├── tests/          # 테스트 스크립트
├── pages/          # Page Object
├── fixtures/       # 테스트 데이터
├── components/     # 재사용 컴포넌트
├── config/         # 환경 설정
└── docs/           # 문서
```

## 문서

### 환경 설정
- [필수 도구](docs/setup/01-PREREQUISITES.md) - Git, Volta, pnpm, Claude Code 설치
- [프로젝트 세팅](docs/setup/02-PROJECT-SETUP.md) - 의존성 설치 및 설정
- [쉘 설정](docs/setup/03-SHELL-SETUP.md) - zsh/터미널 설정
- [Git 기초](docs/setup/04-GIT-BASICS.md) - Git 사용법
- [VS Code 설정](docs/setup/05-VSCODE-SETUP.md) - VS Code + Claude 설정

### 사용 가이드
- [첫 테스트](docs/guide/01-FIRST-TEST.md) - 첫 테스트 작성하기
- [일일 워크플로우](docs/guide/02-WORKFLOW.md) - 매일 작업 방식
- [모범 사례](docs/guide/03-BEST-PRACTICES.md) - 좋은 테스트 작성법
- [수동 테스트](docs/guide/05-MANUAL-TESTING.md) - 실기기/앱/UX 테스트 가이드

### 운영
- [팀 가이드](docs/operations/01-TEAM-GUIDE.md) - 팀 운영 및 공유
- [테스트 케이스 목록](docs/operations/02-TESTCASE-CATALOG.md) - 전체 테스트 관리
- [테스트 전략](docs/operations/03-TEST-STRATEGY.md) - 무엇을 테스트할 것인가
- [QA 연구 노트](docs/operations/04-QA-RESEARCH.md) - 연구/실험 기록
- [주간 리포트](docs/operations/05-WEEKLY-REPORT.md) - 리포트 템플릿

### 참고
- [셀렉터 가이드](docs/reference/01-SELECTOR-GUIDE.md) - 안정적인 요소 선택
- [문제 해결](docs/reference/02-TROUBLESHOOTING.md) - FAQ

## 라이선스

MIT
