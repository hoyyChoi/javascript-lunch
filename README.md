# 1단계 - 음식점 목록

## 📍 학습 목표

- 어플리케이션을 컴포넌트 단위로 모듈화하여 개발
- UI를 컴포넌트 단위로 생각하고 개발하는 연습
- 재사용할 수 있는 컴포넌트를 고민해보기
- 웹 UI 환경에서의 테스트 기초
- 사용자 관점에서 중요하다고 생각하는 기능을 스스로 정의하고 E2E 테스트로 검증해보기

## 📝 진행 방식

1. html 태그를 바탕으로, 테스트를 명세한다.
2. 테스트가 통과되면 이를 바탕으로 html 태그 컴포넌트를 지운다.
3. 그러면 테스트 통과가 안된다.
4. 그리고 js바탕 동적으로 (지운)html 컴포넌트를 만들어서 테스트를 통과시킨다.
5. 여기서 컴포넌트로 제작해본다.
   1. (클래스형(객체) or 함수형) → 적절히 섞어서 진행한다.
6. 그리고 여기서 인자로 재사용가능한 것을 넘긴다.
   1. → 그럼 이게 컴포넌트다.

## 📝 설계 방식

1. 도메인 -> 가게를 추가한다. (가게 리스트에 가게 정보 추가)
2. 클래스 -> 가게 리스트 (인스턴스)
   1. 가게리스트 -> 가게 (인스턴스) (가게를 인스턴스로 관리하는 이유: 가게 객체의 기능이 이름, 주소, 소개라는 카테고리를 저장하는 것 뿐이지만, 이것들은 원본 데이터이기 때문에 변경되면 안된다. 정보은닉 관점에서 가게를 인스턴스화 하기로 결정)
3. index.html(ui) <- main (돔 조작) <- controller(조합) <- ui(컴포넌트) <- domain (데이터 저장 및 관리) (가게 리스트 <- 가게)

## 🎯 기능 요구 사항

점심 식사 스팟 목록을 관리하는 앱을 만든다.

- 음식점 목록 페이지를 화면과 같이 구성한다.
- 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄우면, 새로운 음식점을 추가할 수 있다.
- 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
- 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
- 카테고리, 이름, 거리는 입력 필수.
- 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
- 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
- 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
- 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
- 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

## 🏆 프로그래밍 순서

- [x] eslint 및 Prettier 적용
- [x] `templates` 폴더에 있는 코드를 프로덕트에 적용시킨다.
- [x] 프로덕트 코드가 제대로 적용되어 있는지 확인한다.
  - [x] (test) 프로덕트 코드 동작 -> body나 최상단 태그가 렌더링 되었는지 확인한다.

---

### 메인

- [x] `header` (.gnb)

  - [x] (템플릿 코드 기반) `header` 태그를 바탕으로 테스트 작성
  - [x] (프로덕트 코드) `header` 태그 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `header` 태그를 제작 -> 테스트 성공
  - [x] `header` 태그를 컴포넌트로 제작
  - [x] `header` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] `header` 테스트 코드 수정

- [x] `list-item` (.restaurant) (menu-item으로 안한 이유 : 확정성 고려)

  - [x] (템플릿 코드 기반) `li`(.restaurant) 태그를 바탕으로 테스트 작성
  - [x] (프로덕트 코드) `li` 태그 전부 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `li` 태그 하나만 제작 -> 테스트 성공
  - [x] `li` 태그를 컴포넌트로 제작
  - [x] `li` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 전달 -> 정적 텍스트를 어떻게 관리할거냐 -> 입력한 값도 추가가 되어야하고, 기존에 있는 값도 추가가 되어 있어야한다.
    - [x] 도메인 (식당 정보들을 관리하고 있는 것! -> 인스턴스)
    - [x] `li` 테스트 코드 수정

- [x] `list` (.restaurant-list)
  - [x] (템플릿 코드 기반) `ul`(.restaurant-list) 태그를 바탕으로 테스트 작성
  - [x] (프로덕트 코드) `ul` 태그 전부 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `ul` 태그 제작 -> 테스트 성공
  - [x] `ul` 태그를 컴포넌트로 제작
  - [x] `ul` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 -> `list-item` 컴포넌트

### 모달

- [x] `form-item` (label + Form컴포넌트 + notice(옵션)) 묶고 있는 div
- [x] `form-item` 동적 인자 전달 / 컴포넌트 분리
- [x] 동적 인자 전달 -> notice(옵션)

- [x] `select-form` (select.category)

  - [x] (템플릿 코드 기반) `select-form` 태그를 바탕으로 테스트 작성
  - [x] (템플릿 코드 기반) `select`태그가 있는지 테스트 작성
  - [x] (프로덕트 코드) `select-form` 태그 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `select-form` 태그 제작 -> 테스트 성공
  - [x] `select-form` 태그를 컴포넌트로 제작
  - [x] `select-form` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 -> option값 전달

- [x] `input-form` (input.name)

  - [x] (템플릿 코드 기반) `input-form` 태그를 바탕으로 테스트 작성
  - [x] (템플릿 코드 기반) `input` 태그가 있는지 테스트 작성
  - [x] (프로덕트 코드) `input-form` 태그 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `input-form` 태그 제작 -> 테스트 성공
  - [x] `input-form` 태그를 컴포넌트로 제작
  - [x] `input-form` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 ->`input`에 들어갈 타입

- [x] `textarea-form` (textarea.name)

  - [x] (템플릿 코드 기반) `textarea-form` 태그를 바탕으로 테스트 작성
  - [x] (템플릿 코드 기반) `textarea` 태그가 있는지 테스트 작성
  - [x] (프로덕트 코드) `textarea-form` 태그 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `textarea-form` 태그 제작 -> 테스트 성공
  - [x] `textarea-form` 태그를 컴포넌트로 제작
  - [x] `textarea-form` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 ->`textarea`에 들어갈 타입

- [ ] `button` (button 태그)

  - [x] (템플릿 코드 기반) `button` 태그를 바탕으로 테스트 작성
  - [x] (템플릿 코드 기반) `button` 태그가 있는지 테스트 작성
  - [x] (프로덕트 코드) `button` 태그 삭제 -> 테스트 실패
  - [x] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `button` 태그 제작 -> 테스트 성공
  - [x] `button` 태그를 컴포넌트로 제작
  - [x] `button` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 ->`button`에 들어갈 타입 및 들어갈 이름

- [x] `button-form` (button 태그들 묶음)

  - [x] `button-form` 태그를 컴포넌트로 제작
  - [x] `button-form` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [x] 동적 인자 ->`button`에 들어갈 타입 및 들어갈 이름

- [x] `form` (form태그)

  - [x] `form` 컴포넌트 제작
  - [x] `form` 컴포넌트 리팩토링

- [ ] `modal-container` (.modal-container) => 흰색 바탕 부분 (backdrop 제외)

  - [ ] (템플릿 코드 기반) `modal-container`를 바탕으로 테스트 작성
  - [ ] (템플릿 코드 기반) `modal-container` 있는지 테스트 작성
    - [ ] h2태그가 있는지 테스트 작성 (modal-container의 이름)
  - [ ] (프로덕트 코드) `modal-container` 태그 삭제 -> 테스트 실패
  - [ ] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `modal-container` 제작 -> 테스트 성공
  - [ ] `modal-container` 태그를 컴포넌트로 제작
  - [ ] `modal-container` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [ ] 동적 인자 전달 -> h2 태그 내부 텍스트 값
    - [ ] `modal-container` 테스트 코드 수정

- [ ] `modal` (.modal-container 컴포넌트 + backdrop)

  - [ ] (템플릿 코드 기반) `modal`를 바탕으로 테스트 작성
  - [ ] (템플릿 코드 기반) `modal` 있는지 테스트 작성
    - [ ] 추가하기 로직하는 함수를 넘겨 버튼이 잘 동작해 모달이 작동 + 데이터 생성 (도메인)
    - [ ] 취소하기 로직하는 함수를 넘겨 버튼이 잘 동작해 모달이 작동
          -> 테스트 실패
  - [ ] (테스트 실패를 성공시키기 위해) js를 이용해 동적으로 `modal` 제작 -> 도메인 로직 작성 -> 테스트 성공
  - [ ] `modal` 태그를 컴포넌트로 제작
  - [ ] `modal` 컴포넌트 리팩토링 (동적 인자 전달/컴포넌트 이동 및 분리)
    - [ ] `modal` 테스트 코드 수정

- [x] `button` 컴포넌트 이벤트 등록
- [x] 레스트랑-리스트 도메인 로직 추가
- [x] 레스트랑 도메인 로직 추가

### 추가해야할 것

- [x] 리스트 아이템 컴포넌트 이미지 Url 동적
- [x] 모달에서 등록하기 버튼 동작 구현 (데이터 추가)
- [x] 헤더 모달 활성화 버튼
- [x] 모달 컴포넌트 제작
  - [x] 모달 title 컴포넌트 분리
    - [x] 모달 title 컴포넌트 리팩토링
  - [x] 모달 프레임 컴포넌트 제작
    - [x] 모달 프레임 컴포넌트 리팩토링 (파일 이동 및 분리)
  - [x] 모달 백드롭 이벤트 등록
- [ ] E2E 테스트 진행
  - [x] 헤더에서 모달버튼을 눌렀을 때, 모달이 활성화가 되는지 확인
  - [x] 모달에서 등록하기 버튼 클릭시, listItem 생성
  - [x] 모달에서 취소하기 버튼 클릭시, 모달 닫힘.
  - [x] 모달에서 백드롭 클릭시, 모달 닫힘. (force 옵션 값 이용)
  - [x] E2E 테스트 전체 플로우 진행
- [x] form 입력 값 required를 동적 인자로 받아 구현
- [ ] 리팩토링
  - [x] main.js 함수 분리 -> 컨트롤러로 모듈 분리 (header, list, modal)
