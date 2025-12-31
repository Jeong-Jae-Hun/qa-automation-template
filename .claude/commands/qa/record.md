---
description: Playwright 코드 생성기로 테스트 녹화
argument-hint: [URL]
allowed-tools: Bash
---

# 테스트 녹화 시작

URL: $ARGUMENTS

## 녹화 명령어

```bash
cd ~/projects/qa-automation-template && npx playwright codegen $ARGUMENTS
```

## 사용 방법

1. **브라우저 창**에서 테스트하고 싶은 동작을 수행하세요
2. **Inspector 창**에서 생성된 코드를 실시간으로 확인
3. 녹화 완료 후 브라우저를 닫으면 종료

## 녹화 후 작업

녹화된 코드를 정리하려면:
```
"방금 녹화한 코드를 깔끔하게 정리해서 테스트 파일로 만들어줘"
```

Claude가 자동으로:
1. Page Object 패턴으로 변환
2. Given-When-Then 구조로 정리
3. 적절한 위치에 파일 생성

## 옵션

- 특정 브라우저: `npx playwright codegen --browser=firefox $ARGUMENTS`
- 모바일 뷰포트: `npx playwright codegen --viewport-size=375,667 $ARGUMENTS`
- 저장 경로 지정: `npx playwright codegen -o tests/recorded.spec.ts $ARGUMENTS`
