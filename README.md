# :computer: 유플러스닷컴 모바일 상품 판매 시나리오 개발
> 고객의 모바일 상품 구매 **기능 구현**과 **고객 경험 개선**

<br>

## :bookmark_tabs: 프로젝트 목차
- :raising_hand_man: [팀원 소개](#raising_hand_man-팀원-소개)
- :book: [주요 기능](#book-주요-기능)
- :desktop_computer: [개발 환경](#desktop_computer-개발-환경)
- :classical_building: [서비스 구성도](#classical_building-서비스-구성도)
- :file_folder: [프로젝트 산출물](#file_folder-프로젝트-산출물)

<br>

## :raising_hand_man: 팀원 소개

팀원 | 담당 기능
-- | --
[권나영](https://github.com/i-zro) | [Infra] CI/CD 구축, 모놀리식/MSA 클라우드 서버 구축
[박상우](https://github.com/sangwoo420) | [FE] 주문 목록 조회 페이지 <br> [BE] 상품 목록 조회, Elastic Search 를 활용한 검색 서비스
[서동완](https://github.com/mssdfg0708) | [FE] 상품 검색 결과 페이지 <br> [BE] 상품 상세 조회, Kafka 를 사용한 서버간 통신
[이재희](https://github.com/Hui-Story) | [FE] 메인 화면, 상단 메뉴, 상품 조회 및 비교하기 기능 <br> [BE] 요금제 목록 조회
[전시영](https://github.com/jjssyy) | [FE] 장바구니 페이지 <br> [BE] 주문 관련 서비스, Kafka 를 사용한 서버간 통신

<br>

## :book: 주요 기능

### 1. 상품 리스트 조회
> 필터를 통한 사용자 맞춤형 모바일 상품 리스트 조회

![Device List](https://user-images.githubusercontent.com/87461594/188543802-3a3ce19e-d8d8-4830-b7c1-ecbc7e4fb74f.gif)

### 2. 상품 상세 비교
> 최대 3개 상품을 선택한 뒤 가격 비교

![Compare Device](https://user-images.githubusercontent.com/87461594/188543810-e142177e-fd56-4a06-8175-2be74d5ce88f.gif)

### 3. 상품 상세 정보 & 주문
> 상품 상세 정보 체크 후 주문 (주문 내역 표시)

![Device Detail](https://user-images.githubusercontent.com/87461594/188543818-d9c49215-298a-4943-8719-033b413c5bd8.gif)

### 4. 상품 검색
> 초성, 유사어 검색을 통한 원하는 상품 조회

![Search List](https://user-images.githubusercontent.com/87461594/188543832-e9d9d1d4-6a01-47d5-9eff-d0cb446361b3.gif)

### 5. 장바구니
> 최대 90일간 유지되는 장바구니 기능

![Cart](https://user-images.githubusercontent.com/87461594/188543836-3734cb30-3311-4e0d-bd89-ef57ddee43ce.gif)

<br>

## :desktop_computer: 개발 환경
- 이슈 & 형상관리 : Github
- 커뮤니케이션 : Mattermost
- 디자인 : Figma
- 개발 환경
  - DBMS : MYSQL
  - Server : AWS EC2, Ubuntu, nginx
- Front-end
  - React, React-Redux, Yarn
  - Redux-Saga, React-Query
- Back-end
  - Java 8
  - Spring Boot, Spring JPA
  - Kafka
  - Elastic Search
- IDE & Tool
  - intelliJ
  - Visual Studio Code

<br>

## :classical_building: 서비스 구성도
![image](https://user-images.githubusercontent.com/87461594/188477911-f898ce03-2405-40ed-a750-aeec9287a389.png)

<br>

## :file_folder: 프로젝트 산출물
산출물 | 링크
-- | --
Github Wiki | [Github Wiki](https://github.com/UplusTeam1/uplus.com/wiki)
프로젝트 기획서 | [프로젝트 기획서](https://github.com/UplusTeam1/uplus.com/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%ED%9A%8D%EC%84%9C)
Team Convention | [Team Convention](https://github.com/UplusTeam1/uplus.com/wiki/Team-Convention)
API 문서 | [API 문서](https://github.com/UplusTeam1/uplus.com/wiki/API-%EB%AC%B8%EC%84%9C)
Infra | [Infra](https://github.com/UplusTeam1/uplus.com/wiki/Infra)
Docker 명령어 | [Docker 명령어](https://github.com/UplusTeam1/uplus.com/wiki/Docker-%EB%AA%85%EB%A0%B9%EC%96%B4-Cheat-Sheet)
ELK 구축 참조 | [ELK 구축 참조](https://github.com/UplusTeam1/uplus.com/wiki/ELK-%EA%B5%AC%EC%B6%95-%EC%B0%B8%EC%A1%B0)
Kafka 통신 규칙 | [Kafka 통신 규칙](https://github.com/UplusTeam1/uplus.com/wiki/Kafka-%ED%86%B5%EC%8B%A0-%EA%B7%9C%EC%B9%99)
