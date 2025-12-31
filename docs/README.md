# 문서 가이드

QA 자동화 프로젝트 문서 구조입니다.

---

## 폴더 구조

```
docs/
├── setup/          # 환경 설정
│   ├── 00-SHELL-SETUP.md       # zsh/터미널 설정
│   ├── 00-PREREQUISITES.md     # 필수 도구 설치
│   ├── 01-SETUP.md             # 프로젝트 세팅
│   ├── 02-GIT-BASICS.md        # Git 기초
│   └── 03-VSCODE-SETUP.md      # VS Code + Claude 설정
│
├── guide/          # 사용 가이드
│   ├── 02-FIRST-TEST.md        # 첫 테스트 작성
│   ├── 03-WORKFLOW.md          # 일일 워크플로우
│   └── 04-BEST-PRACTICES.md    # 모범 사례
│
├── operations/     # 운영
│   ├── 05-TEAM-GUIDE.md        # 팀 운영/협업
│   ├── TESTCASE-CATALOG.md     # 테스트 케이스 목록
│   ├── TEST-STRATEGY.md        # 테스트 전략
│   ├── QA-RESEARCH.md          # 연구/실험 노트
│   └── WEEKLY-REPORT-TEMPLATE.md # 주간 리포트
│
└── reference/      # 참고 자료
    ├── SELECTOR-GUIDE.md       # 셀렉터 가이드
    └── 99-TROUBLESHOOTING.md   # 문제 해결
```

---

## 시작하기

### 처음 사용자

1. [쉘 설정](setup/00-SHELL-SETUP.md) - 터미널 환경 구성 (선택)
2. [필수 도구](setup/00-PREREQUISITES.md) - Git, Node.js, Claude Code 설치
3. [Git 기초](setup/02-GIT-BASICS.md) - Git 사용법
4. [VS Code 설정](setup/03-VSCODE-SETUP.md) - VS Code + Claude 설정 ⭐ 권장
5. [프로젝트 세팅](setup/01-SETUP.md) - 의존성 설치 및 설정

### 테스트 작성

1. [첫 테스트](guide/02-FIRST-TEST.md) - Claude로 첫 테스트 만들기
2. [일일 워크플로우](guide/03-WORKFLOW.md) - 매일 작업 방식
3. [모범 사례](guide/04-BEST-PRACTICES.md) - 좋은 테스트 작성법

### 팀 운영

1. [팀 가이드](operations/05-TEAM-GUIDE.md) - 브랜치 전략, 리뷰, 공유
2. [테스트 케이스 카탈로그](operations/TESTCASE-CATALOG.md) - 전체 테스트 목록
3. [테스트 전략](operations/TEST-STRATEGY.md) - 무엇을 테스트할 것인가

### 참고

- [셀렉터 가이드](reference/SELECTOR-GUIDE.md) - 안정적인 요소 선택
- [문제 해결](reference/99-TROUBLESHOOTING.md) - FAQ

---

## 문서 업데이트

### 새 문서 추가

1. 적절한 폴더 선택
2. 번호 prefix 사용 (순서가 중요한 경우)
3. 이 README 업데이트

### 폴더 기준

| 폴더 | 용도 | 예시 |
|------|------|------|
| setup/ | 환경 설정, 설치 | Git 설치, 프로젝트 세팅 |
| guide/ | 사용법, 튜토리얼 | 테스트 작성법, 워크플로우 |
| operations/ | 운영, 관리 | 팀 가이드, 테스트 목록 |
| reference/ | 참고 자료 | 셀렉터, 트러블슈팅 |
