# 사전 준비

QA 자동화를 시작하기 전에 필요한 도구들을 설치합니다.

## 1. Git 설치

### Mac

터미널을 열고 다음 명령어 실행:

```bash
# Homebrew 설치 (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git 설치
brew install git
```

### Windows

1. https://git-scm.com/download/win 에서 다운로드
2. 설치 프로그램 실행
3. 기본 설정으로 설치

### 설치 확인

```bash
git --version
# git version 2.x.x 출력되면 성공
```

### Git 초기 설정

```bash
git config --global user.name "이름"
git config --global user.email "이메일@example.com"
```

## 2. Node.js 설치

### Mac

```bash
# nvm (Node Version Manager) 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 터미널 재시작 후
nvm install 20
nvm use 20
```

### Windows

1. https://nodejs.org 에서 LTS 버전 다운로드
2. 설치 프로그램 실행
3. 기본 설정으로 설치

### 설치 확인

```bash
node --version
# v20.x.x 출력되면 성공

npm --version
# 10.x.x 출력되면 성공
```

## 3. VS Code 설치 (권장)

1. https://code.visualstudio.com 에서 다운로드
2. 설치 후 실행

### 권장 확장 프로그램

VS Code에서 다음 확장 설치:

- **Playwright Test for VSCode** - 테스트 실행/디버깅
- **Korean Language Pack** - 한국어 인터페이스

설치 방법:
1. VS Code 왼쪽 사이드바에서 확장 아이콘 클릭 (또는 Cmd+Shift+X)
2. 검색창에 "Playwright" 입력
3. "Playwright Test for VSCode" 설치 클릭

## 4. Claude Code 설치

### 설치

```bash
npm install -g @anthropic-ai/claude-code
```

### 설치 확인

```bash
claude --version
```

### 초기 설정

```bash
claude
# 처음 실행 시 Anthropic 계정 연동 필요
```

## 다음 단계

모든 도구가 설치되었으면 [01. 설치 가이드](01-SETUP.md)로 이동하세요.

## 문제 해결

설치 중 문제가 발생하면 [99. 문제 해결](99-TROUBLESHOOTING.md)을 참고하세요.
