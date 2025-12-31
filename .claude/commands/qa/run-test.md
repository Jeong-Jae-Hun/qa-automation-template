---
description: Playwright 테스트 실행
argument-hint: [그룹명 또는 파일명] (생략 시 전체 실행)
allowed-tools: Bash
---

# 테스트 실행

대상: $ARGUMENTS

## 실행 명령어

### 전체 실행
```bash
cd ~/projects/qa-automation-template && npm test
```

### 그룹 실행
```bash
cd ~/projects/qa-automation-template && npm test -- tests/$ARGUMENTS/
```

### 단일 파일 실행
```bash
cd ~/projects/qa-automation-template && npm test -- tests/**/$ARGUMENTS.spec.ts
```

### UI 모드 실행 (디버깅용)
```bash
cd ~/projects/qa-automation-template && npm run test:ui
```

## 결과 분석

테스트 완료 후:
1. 성공/실패 요약 표시
2. 실패한 테스트 원인 분석
3. 스크린샷 위치 안내 (`reports/screenshots/`)
4. 수정 제안 제공

## 실행 후 안내

- 리포트 확인: `npm run report`
- 실패 수정 요청: "XXX 테스트 실패 원인 수정해줘"
