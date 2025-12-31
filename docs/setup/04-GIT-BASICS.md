# Git 기초 가이드

> 버전 관리의 기본, 협업을 위한 Git 사용법

---

## Git이란?

- **버전 관리 시스템**: 파일 변경 이력을 추적
- **협업 도구**: 여러 명이 같은 코드를 수정할 수 있음
- **백업**: 언제든 이전 상태로 되돌릴 수 있음

---

## 기본 개념

### 저장소 (Repository)

프로젝트 폴더 = Git 저장소

```
qa-automation-template/   ← 저장소
├── .git/                 ← Git 데이터 (숨김 폴더)
├── tests/
├── pages/
└── ...
```

### 브랜치 (Branch)

독립적인 작업 공간

```
main ─────●─────●─────●───────●
           \         /
feature/    ●───●───●
login
```

### 커밋 (Commit)

변경 사항의 스냅샷

```
커밋 1 → 커밋 2 → 커밋 3 → ...
```

---

## 일상 작업 흐름

### 1. 최신 코드 가져오기

```bash
git pull
```

매일 작업 시작 전에 실행!

### 2. 새 브랜치 만들기

```bash
# 새 브랜치 생성 및 이동
git checkout -b test/로그인-테스트
```

### 3. 파일 수정

테스트 파일을 작성하거나 수정

### 4. 변경 사항 확인

```bash
# 변경된 파일 목록
git status

# 변경 내용 확인
git diff
```

### 5. 변경 사항 저장 (커밋)

```bash
# 모든 변경 파일 추가
git add .

# 커밋 메시지와 함께 저장
git commit -m "test: 로그인 실패 테스트 추가"
```

### 6. 원격에 업로드

```bash
git push
```

### 7. Pull Request 생성

GitHub에서 PR 생성 → 리뷰 요청

---

## 커밋 메시지 규칙

### 형식

```
타입: 요약 (50자 이내)

본문 (선택, 자세한 설명)
```

### 타입

| 타입 | 용도 | 예시 |
|------|------|------|
| `test` | 테스트 추가/수정 | `test: 로그인 실패 테스트 추가` |
| `fix` | 버그 수정 | `fix: 셀렉터 오류 수정` |
| `feat` | 새 기능 | `feat: 결제 테스트 추가` |
| `docs` | 문서 수정 | `docs: README 업데이트` |
| `refactor` | 리팩토링 | `refactor: Page Object 정리` |

### 좋은 예시

```bash
git commit -m "test: 로그인 실패 시 에러 메시지 테스트 추가"
git commit -m "fix: 결제 버튼 셀렉터 수정"
git commit -m "refactor: LoginPage 메서드 분리"
```

### 나쁜 예시

```bash
git commit -m "수정"           # 무엇을?
git commit -m "test"           # 무슨 테스트?
git commit -m "asdf"           # ???
```

---

## 브랜치 전략

### 브랜치 이름 규칙

```
test/기능명      # 새 테스트
fix/문제명       # 테스트 수정
refactor/내용    # 구조 개선
```

### 예시

```bash
git checkout -b test/회원가입-검증
git checkout -b fix/로그인-타임아웃
git checkout -b refactor/auth-page-정리
```

### 작업 완료 후

```bash
# main 브랜치로 이동
git checkout main

# 최신 코드 가져오기
git pull

# 작업 브랜치 삭제 (선택)
git branch -d test/회원가입-검증
```

---

## 충돌 해결

### 충돌이란?

두 사람이 같은 부분을 수정했을 때 발생

### 충돌 발생 시

```bash
git pull
# 충돌 발생!
```

파일을 열면:

```
<<<<<<< HEAD
내가 수정한 내용
=======
다른 사람이 수정한 내용
>>>>>>> origin/main
```

### 해결 방법

1. 파일을 열어서 충돌 부분 확인
2. 원하는 내용으로 수정
3. `<<<<<<<`, `=======`, `>>>>>>>` 마커 삭제
4. 저장 후 커밋

```bash
git add .
git commit -m "merge: 충돌 해결"
git push
```

---

## 되돌리기

### 커밋 전 변경 취소

```bash
# 특정 파일 변경 취소
git checkout -- 파일명

# 모든 변경 취소
git checkout -- .
```

### 마지막 커밋 수정

```bash
# 메시지만 수정
git commit --amend -m "새로운 메시지"

# 파일 추가 후 커밋 수정
git add 빠뜨린파일
git commit --amend --no-edit
```

### 이전 커밋으로 되돌리기

```bash
# 커밋 기록 확인
git log --oneline

# 특정 커밋으로 되돌리기 (주의!)
git revert 커밋ID
```

---

## 자주 쓰는 명령어 정리

### 일상 작업

| 명령어 | 설명 |
|--------|------|
| `git status` | 변경 상태 확인 |
| `git pull` | 최신 코드 가져오기 |
| `git add .` | 모든 변경 추가 |
| `git commit -m "메시지"` | 커밋 |
| `git push` | 원격에 업로드 |

### 브랜치

| 명령어 | 설명 |
|--------|------|
| `git branch` | 브랜치 목록 |
| `git checkout -b 이름` | 새 브랜치 생성 |
| `git checkout main` | main으로 이동 |
| `git branch -d 이름` | 브랜치 삭제 |

### 확인

| 명령어 | 설명 |
|--------|------|
| `git log --oneline` | 커밋 기록 |
| `git diff` | 변경 내용 |
| `git remote -v` | 원격 저장소 |

---

## VS Code에서 Git 사용

터미널 명령어 대신 VS Code UI 사용 가능:

1. **왼쪽 사이드바** → Source Control 아이콘 (가지 모양)
2. **변경 파일** 확인
3. **+** 버튼으로 Stage (git add)
4. **메시지 입력** 후 **✓** 버튼으로 Commit
5. **...** 메뉴 → Push

자세한 내용은 [VS Code 설정 가이드](03-VSCODE-SETUP.md) 참조

---

## 문제 해결

### "Please tell me who you are"

```bash
git config --global user.name "이름"
git config --global user.email "이메일@example.com"
```

### "Permission denied"

SSH 키 설정 필요. [문제 해결](../reference/99-TROUBLESHOOTING.md) 참조

### "Your branch is behind"

```bash
git pull --rebase
```
