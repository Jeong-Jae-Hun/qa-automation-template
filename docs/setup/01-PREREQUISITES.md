# 사전 준비

QA 자동화를 시작하기 전에 필요한 도구들을 설치합니다.

## 지원 환경

| 항목 | 버전 |
|------|------|
| Node.js | 22.x LTS (Volta로 자동 관리) |
| pnpm | 10.x (packageManager로 자동 관리) |
| OS | macOS, Windows 10+, Linux |

---

## 1. Git 설치

### macOS

```bash
# Homebrew 설치 (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git 설치
brew install git
```

### Windows

1. https://git-scm.com/download/win 에서 다운로드
2. 설치 프로그램 실행
3. 기본 설정으로 설치 (Git Bash 포함)

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

---

## 2. Volta 설치 (Node.js 버전 관리)

프로젝트별 Node.js 버전을 자동으로 관리해주는 도구입니다.

### macOS / Linux

```bash
# Volta 설치
curl https://get.volta.sh | bash

# 터미널 재시작 후 확인
volta --version
```

### Windows

1. https://docs.volta.sh/guide/getting-started 에서 Windows 설치 파일 다운로드
2. 설치 프로그램 실행
3. PowerShell 또는 Git Bash 재시작

### Volta 동작 방식

프로젝트의 `package.json`에 Volta 설정이 있으면 자동으로 해당 Node.js 버전 사용:

```json
{
  "volta": {
    "node": "22.17.0"
  }
}
```

---

## 3. pnpm 설치 (패키지 관리자)

npm보다 빠르고 효율적인 패키지 관리자입니다.

### Volta로 설치 (권장)

```bash
volta install pnpm
```

### 독립 설치

```bash
# macOS / Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

### 설치 확인

```bash
pnpm --version
# 10.x.x 출력되면 성공
```

### pnpm vs npm

| 특징 | pnpm | npm |
|------|------|-----|
| 속도 | ⚡ 매우 빠름 | 보통 |
| 디스크 사용 | 효율적 (하드링크) | 중복 저장 |
| 엄격한 의존성 | ✅ | ❌ |

---

## 4. VS Code 설치 (권장)

### 다운로드

https://code.visualstudio.com 에서 운영체제에 맞는 버전 다운로드

### 권장 확장 프로그램

VS Code에서 다음 확장 설치:

| 확장 | 용도 |
|------|------|
| **Playwright Test for VSCode** | 테스트 실행/디버깅 |
| **Korean Language Pack** | 한국어 인터페이스 |
| **Biome** | 코드 포맷팅/린팅 |

설치 방법:
1. VS Code 왼쪽 사이드바에서 확장 아이콘 클릭 (또는 `Cmd+Shift+X` / `Ctrl+Shift+X`)
2. 검색창에 확장 이름 입력
3. 설치 클릭

---

## 5. Claude Code 설치

### 설치

```bash
# pnpm으로 전역 설치
pnpm add -g @anthropic-ai/claude-code

# 또는 npm
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

---

## 설치 요약 체크리스트

```bash
# 모든 도구 버전 확인
git --version      # 2.x.x
volta --version    # 2.x.x
pnpm --version     # 10.x.x
node --version     # v22.x.x (프로젝트 폴더 내에서)
code --version     # VS Code 버전
claude --version   # Claude Code 버전
```

---

## 다음 단계

모든 도구가 설치되었으면 [02. 프로젝트 설정](02-PROJECT-SETUP.md)으로 이동하세요.

## 문제 해결

설치 중 문제가 발생하면 [트러블슈팅](../reference/02-TROUBLESHOOTING.md)을 참고하세요.
