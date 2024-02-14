# 밋허브 - 중간 지점 추천 서비스 [Server]

---

## Backend - v.1.0.0

> 수도권을 한정으로 서비스합니다. <br>
> 대중교통을 기준으로 중간 지점을 계산합니다.<br>
> 제공하는 중간 지점은 인근 지하철역입니다.

## 사용 기술

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">

---

## 서비스 목적

- 거리, 비용, 소요 시간을 기준으로 모임 인원 모두에게 동등한 모임 장소를 제공함으로써, <br>모임 장소를 찾는 시간을 절약합니다.

## 서비스 주요 기능

- ODsay API로부터 무게 중심 좌표 기준 반경 3000m 안에 존재하는 지하철역을 응답받습니다.
- 해당 반경 안에 존재하는 지하철역이 없다면, 500m 씩 늘려가며 재요청 합니다.
- ODsay API로부터 각각의 '출발지 - 지하철역' 간 경로 정보를 응답받습니다.
- 출발지 개수 X 지하철역 개수만큼의 경로 정보를 Client로 반환합니다.

## 참고

- CSR 프로젝트이며, Client 레포지토리는 [여기](https://github.com/okonomiyakki/MEETHUB_frontend) 입니다.
- 본 서비스는 배포 준비 중입니다.
- ODsay API KEY를 발급받으시면, 로컬에서 사용 가능합니다.
- [ODsay 홈페이지 바로가기](https://lab.odsay.com/)

## [Server] 환경 변수 설정

```bash
touch .env.dev
```

```
/.env.dev

HOST_URL={클라이언트 localhost 주소}

ODSAY_API_APP_KEY={ODsay API 키}

```

## [Server] 로컬 실행 방법

```bash
npm i

npm run start:dev
```
