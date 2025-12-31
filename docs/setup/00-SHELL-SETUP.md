# 쉘 환경 설정

> macOS 기준 zsh 설정 가이드

---

## 1. 터미널 기본 설정

### 터미널 앱 열기

1. `Cmd + Space` → "터미널" 검색 → Enter
2. 또는 `응용 프로그램 > 유틸리티 > 터미널`

### iTerm2 설치 (선택, 권장)

```bash
# Homebrew 설치 (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# iTerm2 설치
brew install --cask iterm2
```

---

## 2. Oh My Zsh 설치 (권장)

터미널을 더 편리하게 사용할 수 있게 해주는 프레임워크입니다.

```bash
# Oh My Zsh 설치
sh -c "$(curl -fsSL https://raw.ohmyz.sh/master/tools/install.sh)"
```

설치 후 터미널 재시작

---

## 3. .zshrc 설정

### 설정 파일 열기

```bash
# VS Code로 열기
code ~/.zshrc

# 또는 nano로 열기
nano ~/.zshrc
```

### QA 자동화용 alias 추가

파일 맨 아래에 다음 내용 추가:

```bash
# ========================================
# QA Automation 설정
# ========================================

# 프로젝트 경로 (본인 환경에 맞게 수정)
export QA_PROJECT="$HOME/projects/qa-automation-template"

# 빠른 이동
alias qa='cd $QA_PROJECT'
alias qat='cd $QA_PROJECT/tests'
alias qap='cd $QA_PROJECT/pages'
alias qad='cd $QA_PROJECT/docs'

# 테스트 실행
alias test='npm test'
alias testui='npm run test:ui'
alias testh='npm run test:headed'
alias testd='npm run test:debug'

# 특정 테스트 실행
qtest() {
  cd $QA_PROJECT && npm test -- "tests/**/*$1*"
}

# 브라우저 녹화
qrecord() {
  cd $QA_PROJECT && npx playwright codegen "$1"
}

# 리포트 열기
alias qreport='cd $QA_PROJECT && npm run report'

# Git 단축키
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git pull'

# Node.js
alias ni='npm install'
alias nr='npm run'

# Claude Code
alias c='claude'
```

### 설정 적용

```bash
source ~/.zshrc
```

---

## 4. alias 사용법

### 프로젝트 이동

```bash
# QA 프로젝트로 이동
qa

# 테스트 폴더로 이동
qat

# 페이지 폴더로 이동
qap
```

### 테스트 실행

```bash
# 전체 테스트
test

# UI 모드
testui

# 브라우저 보면서 실행
testh

# 디버그 모드
testd

# 특정 테스트만 실행
qtest login    # login이 포함된 테스트 실행
qtest checkout # checkout이 포함된 테스트 실행
```

### 녹화

```bash
qrecord https://example.com
```

### Git 작업

```bash
gs         # git status
ga         # git add .
gc "메시지" # git commit -m "메시지"
gp         # git push
```

---

## 5. 유용한 플러그인

### zsh-autosuggestions (명령어 자동 완성)

```bash
# 설치
brew install zsh-autosuggestions

# .zshrc에 추가
echo "source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc

# 적용
source ~/.zshrc
```

이전에 입력한 명령어가 회색으로 추천됩니다. → 키로 자동 완성.

### zsh-syntax-highlighting (문법 하이라이팅)

```bash
# 설치
brew install zsh-syntax-highlighting

# .zshrc에 추가
echo "source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc

# 적용
source ~/.zshrc
```

올바른 명령어는 녹색, 잘못된 명령어는 빨간색으로 표시됩니다.

---

## 6. 프롬프트 커스터마이징

### 현재 폴더만 표시

```bash
# .zshrc에 추가
PROMPT='%1~ %# '
```

### Git 브랜치 표시

Oh My Zsh 사용 시 기본 제공. 테마 변경:

```bash
# .zshrc에서 ZSH_THEME 수정
ZSH_THEME="robbyrussell"  # 기본
ZSH_THEME="agnoster"      # 인기 테마
ZSH_THEME="simple"        # 심플
```

---

## 7. 전체 .zshrc 예시

```bash
# Oh My Zsh 설정
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(git node npm)
source $ZSH/oh-my-zsh.sh

# Node.js (nvm)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# QA Automation
export QA_PROJECT="$HOME/projects/qa-automation-template"

# Aliases
alias qa='cd $QA_PROJECT'
alias qat='cd $QA_PROJECT/tests'
alias test='npm test'
alias testui='npm run test:ui'
alias qreport='npm run report'

qtest() {
  cd $QA_PROJECT && npm test -- "tests/**/*$1*"
}

qrecord() {
  cd $QA_PROJECT && npx playwright codegen "$1"
}

# Git
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Claude
alias c='claude'

# Plugins
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

---

## 문제 해결

### "command not found: brew"

Homebrew PATH 설정:

```bash
# Apple Silicon (M1/M2)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc

# Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zshrc

source ~/.zshrc
```

### "command not found: node"

nvm PATH 설정 확인:

```bash
# .zshrc에 추가
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 설정이 적용 안 됨

```bash
# 설정 다시 로드
source ~/.zshrc

# 또는 터미널 재시작
```
