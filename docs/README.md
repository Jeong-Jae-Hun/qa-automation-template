# 문서 가이드

QA 자동화 프로젝트 문서 구조입니다.

---

## 폴더 구조

```
docs/
├── setup/          # 환경 설정
│   ├── 01-PREREQUISITES.md     # 필수 도구 설치
│   ├── 02-PROJECT-SETUP.md     # 프로젝트 세팅
│   ├── 03-SHELL-SETUP.md       # zsh/터미널 설정
│   ├── 04-GIT-BASICS.md        # Git 기초
│   └── 05-VSCODE-SETUP.md      # VS Code + Claude 설정
│
├── guide/          # 사용 가이드
│   ├── 01-FIRST-TEST.md        # 첫 테스트 작성
│   ├── 02-WORKFLOW.md          # 일일 워크플로우
│   └── 03-BEST-PRACTICES.md    # 모범 사례
│
├── operations/     # 운영
│   ├── 01-TEAM-GUIDE.md        # 팀 운영/협업
│   ├── 02-TESTCASE-CATALOG.md  # 테스트 케이스 목록
│   ├── 03-TEST-STRATEGY.md     # 테스트 전략
│   ├── 04-QA-RESEARCH.md       # 연구/실험 노트
│   └── 05-WEEKLY-REPORT.md     # 주간 리포트
│
└── reference/      # 참고 자료
    ├── 01-SELECTOR-GUIDE.md    # 셀렉터 가이드
    └── 02-TROUBLESHOOTING.md   # 문제 해결
```

---

## 시작하기

### 처음 사용자

1. [필수 도구](setup/01-PREREQUISITES.md) - Git, Node.js, Claude Code 설치
2. [프로젝트 세팅](setup/02-PROJECT-SETUP.md) - 의존성 설치 및 설정
3. [쉘 설정](setup/03-SHELL-SETUP.md) - 터미널 환경 구성 (선택)
4. [Git 기초](setup/04-GIT-BASICS.md) - Git 사용법
5. [VS Code 설정](setup/05-VSCODE-SETUP.md) - VS Code + Claude 설정 ⭐ 권장

### 테스트 작성

1. [첫 테스트](guide/01-FIRST-TEST.md) - Claude로 첫 테스트 만들기
2. [일일 워크플로우](guide/02-WORKFLOW.md) - 매일 작업 방식
3. [모범 사례](guide/03-BEST-PRACTICES.md) - 좋은 테스트 작성법

### 팀 운영

1. [팀 가이드](operations/01-TEAM-GUIDE.md) - 브랜치 전략, 리뷰, 공유
2. [테스트 케이스 카탈로그](operations/02-TESTCASE-CATALOG.md) - 전체 테스트 목록
3. [테스트 전략](operations/03-TEST-STRATEGY.md) - 무엇을 테스트할 것인가

### 참고

- [셀렉터 가이드](reference/01-SELECTOR-GUIDE.md) - 안정적인 요소 선택
- [문제 해결](reference/02-TROUBLESHOOTING.md) - FAQ

---

## 문서 업데이트

### 새 문서 추가

1. 적절한 폴더 선택
2. 번호 prefix 사용 (`01-`, `02-`, ...)
3. 이 README 업데이트

### 폴더 기준

| 폴더 | 용도 | 예시 |
|------|------|------|
| setup/ | 환경 설정, 설치 | Git 설치, 프로젝트 세팅 |
| guide/ | 사용법, 튜토리얼 | 테스트 작성법, 워크플로우 |
| operations/ | 운영, 관리 | 팀 가이드, 테스트 목록 |
| reference/ | 참고 자료 | 셀렉터, 트러블슈팅 |
