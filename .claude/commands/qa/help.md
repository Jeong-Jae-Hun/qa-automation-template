---
description: QA 자동화 도움말
---

# QA 자동화 도움말

## 사용 가능한 커맨드

| 커맨드 | 설명 | 예시 |
|--------|------|------|
| `/qa new-test [설명]` | 새 테스트 케이스 생성 | `/qa new-test 로그인 실패 테스트` |
| `/qa run-test [대상]` | 테스트 실행 | `/qa run-test auth` |
| `/qa record [URL]` | 브라우저 녹화 시작 | `/qa record https://example.com` |
| `/qa help` | 이 도움말 | `/qa help` |

## 자연어로 요청하기

커맨드 없이 자연어로도 요청할 수 있습니다:

```
"로그인 페이지에서 잘못된 비밀번호 입력하면 에러 나오는지 테스트해줘"
"장바구니에 상품 추가하고 결제까지 되는지 테스트 만들어줘"
"방금 만든 테스트 실행해줘"
```

## 프로젝트 구조

```
tests/           # 테스트 스크립트
├── auth/        # 인증 관련
├── checkout/    # 결제 관련
└── example/     # 예제

pages/           # Page Object
fixtures/        # 테스트 데이터
components/      # 재사용 컴포넌트
```

## 워크플로우

1. **테스트 요청** → 자연어로 설명
2. **스크립트 생성** → Claude가 자동 생성
3. **실행** → `/qa run-test`
4. **수정** → 실패 시 수정 요청
5. **반복**

## npm 스크립트

```bash
npm test              # 전체 테스트 실행
npm run test:ui       # UI 모드로 실행
npm run test:headed   # 브라우저 보면서 실행
npm run codegen       # 코드 생성기 시작
npm run report        # 리포트 열기
```

## 문서

- `docs/00-PREREQUISITES.md` - 사전 준비
- `docs/01-SETUP.md` - 설치 가이드
- `docs/02-FIRST-TEST.md` - 첫 테스트 작성
- `docs/03-WORKFLOW.md` - 일일 워크플로우
