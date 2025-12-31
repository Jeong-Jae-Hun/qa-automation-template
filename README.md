# QA Automation Template

Claude Code + Playwright 기반 QA 자동화 템플릿

## 특징

- **자연어로 테스트 작성**: Claude에게 한국어로 요청하면 테스트 스크립트 자동 생성
- **Page Object Model**: 재사용 가능한 구조
- **완전한 가이드**: Git 설치부터 팀 운영까지 문서화

## 빠른 시작

### 1. 템플릿 사용

GitHub에서 "Use this template" 버튼 클릭

### 2. 설치

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
npx playwright install
```

### 3. 환경 설정

```bash
cp .env.example .env
# .env 파일에서 BASE_URL 수정
```

### 4. 테스트 실행

```bash
npm test
```

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

- [00. 사전 준비](docs/00-PREREQUISITES.md) - Git, Node.js, Claude Code 설치
- [01. 설치 가이드](docs/01-SETUP.md) - 프로젝트 세팅
- [02. 첫 테스트](docs/02-FIRST-TEST.md) - 첫 테스트 작성하기
- [03. 워크플로우](docs/03-WORKFLOW.md) - 일일 테스트 워크플로우
- [04. 모범 사례](docs/04-BEST-PRACTICES.md) - 테스트 작성 팁
- [05. 팀 가이드](docs/05-TEAM-GUIDE.md) - 팀 운영 및 공유
- [99. 문제 해결](docs/99-TROUBLESHOOTING.md) - FAQ

## 라이선스

MIT
