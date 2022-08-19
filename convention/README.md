# LG U+ 인턴십 1조 컨벤션

## Commit Rules
    - 커밋 메시지는 태그와 콜론(:)은 붙이고 메시지는 한 칸 띄워 작성한다. ex) Feat: new feature
|태그|내용|
|:---:|:---:|
|Feat|새로운 기능 추가|
|Fix|버그 수정|
|Refactor|코드 리팩터|
|Docs|문서 수정|
|Rename|파일 혹은 폴더명 수정 또는 이동|
|Remove|파일 삭제|
|Design|사용자 UI 디자인 변경|
|Comment|주석 추가 및 변경|


## Java

    - 클래스 이름은 파스칼 케이스로 작성한다. ex) class MyPhone;
    - 변수 이름은 카멜 케이스로 작성한다. ex) String myPhone;
    - 리스트의 변수 이름은 복수 명사형으로 표현한다. ex) List<User> users;
    - 메서드는 행위와 명사로 표현한다. ex) User readUser(Long id);
    - 패키지는 비즈니스 단위로 분리하고 하위에 기능별로 패키지를 분리한다.
    - 응답과 요청 DTO 객체는 분리하여 작성하고 postfix는 작성하지 않는다. ex) UserReponse, UserRequest
    - Entity의 DTO 변환 메서드는 해당 DTO에 작성한다. ex) User of(UserRepsonse res)를 UserResponse에 작성
    - 단일 Entity 반환 메서드는 Optional.of 메서드를 활용하여 DTO로 변환한다.
    - Entity 리스트 반환 시 Stream API를 활용하여 DTO로 변환한다.
