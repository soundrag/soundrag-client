<br>
<div align="center">

**Soundrag**는 스피커 배치에 따라 소리의 변화를 느낄 수 있는
**3D 공간 음향 시뮬레이터** 입니다.

  <br>

  <img width="300px" alt="project icon" src="https://github.com/user-attachments/assets/8f54c1ef-ac76-4dc0-a35a-4bc50a165fcc">
  
  <br>

  <br>
  
  <a href="https://soundrag-31cbb.web.app/">
    <img src="https://github.com/user-attachments/assets/10869a25-1536-44ca-8eca-adbe3370fa13">
  </a>

  <br>
  <br>
  
_스피커를 이동하거나 최적의 위치를 찾는 것은 시간과 노력이 많이 소요됩니다._<br>
_이러한 문제를 해결하기 위해<br>
3D 가상 공간에서 스피커를 자유롭게 배치할 수 있는 환경을 구현하였습니다._

</div>

<span id="top"></span>
<br>

## 📜 목차

<!-- toc -->

- [한 눈에 보기](#%ED%95%9C-%EB%88%88%EC%97%90-%EB%B3%B4%EA%B8%B0)
  - [1️⃣ 플로우 차트](#1%EF%B8%8F%E2%83%A3-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%B0%A8%ED%8A%B8)
  - [2️⃣ 기술 스택](#2%EF%B8%8F%E2%83%A3-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [자세히 보기](#%EC%9E%90%EC%84%B8%ED%9E%88-%EB%B3%B4%EA%B8%B0)
  - [1️⃣ 스피커 배치에 따른 소리의 변화](#1%EF%B8%8F%E2%83%A3-%EC%8A%A4%ED%94%BC%EC%BB%A4-%EB%B0%B0%EC%B9%98%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8C%EB%A6%AC%EC%9D%98-%EB%B3%80%ED%99%94)
    - [2D 화면으로 3D 공간에 스피커 배치하기](#2d-%ED%99%94%EB%A9%B4%EC%9C%BC%EB%A1%9C-3d-%EA%B3%B5%EA%B0%84%EC%97%90-%EC%8A%A4%ED%94%BC%EC%BB%A4-%EB%B0%B0%EC%B9%98%ED%95%98%EA%B8%B0)
    - [3D 공간에서 소리의 변화 구현하기](#3d-%EA%B3%B5%EA%B0%84%EC%97%90%EC%84%9C-%EC%86%8C%EB%A6%AC%EC%9D%98-%EB%B3%80%ED%99%94-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
  - [2️⃣ 불편하지 않은 조작법에 대하여](#2%EF%B8%8F%E2%83%A3-%EB%B6%88%ED%8E%B8%ED%95%98%EC%A7%80-%EC%95%8A%EC%9D%80-%EC%A1%B0%EC%9E%91%EB%B2%95%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
    - [오직 마우스로만 조작한다면?](#%EC%98%A4%EC%A7%81-%EB%A7%88%EC%9A%B0%EC%8A%A4%EB%A1%9C%EB%A7%8C-%EC%A1%B0%EC%9E%91%ED%95%9C%EB%8B%A4%EB%A9%B4)
    - [마우스에 키보드 단축키를 곁들인 조작법](#%EB%A7%88%EC%9A%B0%EC%8A%A4%EC%97%90-%ED%82%A4%EB%B3%B4%EB%93%9C-%EB%8B%A8%EC%B6%95%ED%82%A4%EB%A5%BC-%EA%B3%81%EB%93%A4%EC%9D%B8-%EC%A1%B0%EC%9E%91%EB%B2%95)
  - [3️⃣ 유연한 저장 기능](#3%EF%B8%8F%E2%83%A3-%EC%9C%A0%EC%97%B0%ED%95%9C-%EC%A0%80%EC%9E%A5-%EA%B8%B0%EB%8A%A5)
    - [버튼 없이 자동으로 저장하기](#%EB%B2%84%ED%8A%BC-%EC%97%86%EC%9D%B4-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
    - [누구나 사용할 수 있는 저장하기](#%EB%88%84%EA%B5%AC%EB%82%98-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)

<!-- tocstop -->

<br>
<br>

## 한 눈에 보기

### 1️⃣ 플로우 차트

<br>

### 2️⃣ 기술 스택

<img width="800px" alt="기술 스택" src="https://github.com/user-attachments/assets/1459821b-1d09-4ce7-af38-d7c64e160bc4">

#### Client

![React](https://img.shields.io/badge/react-%23404d59.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![ThreeJS](https://img.shields.io/badge/Three.js-404d59?style=for-the-badge&logo=Three.js&logoColor=w)
![Vite](https://img.shields.io/badge/vite-%23404d59.svg?style=for-the-badge&logo=vite&logoColor=w)
![Zustand](https://img.shields.io/badge/zustand-%23404d59.svg?style=for-the-badge&logo=react&logoColor=black)
![Styled-components](https://img.shields.io/badge/styled_component-404d59.svg?style=for-the-badge&logo=styledcomponents&logoColor=DB7093)

#### Server

![NodeJS](https://img.shields.io/badge/node.js-404d59?style=for-the-badge&logo=node.js&logoColor=6DA55F)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%23404d59.svg?style=for-the-badge&logo=mongodb&logoColor=w)

#### Deploy

![Firebase](https://img.shields.io/badge/firebase-%23404d59.svg?style=for-the-badge&logo=firebase&logoColor=red)
![Amazon Web Service](https://img.shields.io/badge/amazon%20web%20service-%23404d59.svg?style=for-the-badge&logo=amazon&logoColor=b)

<br>
<br>

## 자세히 보기

### 1️⃣ 스피커 배치에 따른 소리의 변화

#### 2D 화면으로 3D 공간에 스피커 배치하기

1. 전체 과정 시각 자료
2. 이동 상황 가정 gif
3. NDC 변환
4. 광선 생성
5. 좌표 생성

<br>

#### 3D 공간에서 소리의 변화 구현하기

1. 공간 음향 구현 전체 시각 자료
2. 전반적인 공간 음향 구현
3. 스피커 수평적 위치
4. 스피커 수직적 위치

<br>
<br>

### 2️⃣ 불편하지 않은 조작법에 대하여

#### 오직 마우스로만 조작한다면?

<br>

#### 마우스에 키보드 단축키를 곁들인 조작법

<br>
<br>

### 3️⃣ 유연한 저장 기능

#### 버튼 없이 자동으로 저장하기

1. 자동 저장 필요한 이유?
2. 자동 저장 실행 조건
3. 자동 저장 구현 방식

<br>

#### 누구나 사용할 수 있는 저장하기

로그인하지 않은 사용자, 로그인한 사용자 모두 사용할 수 있도록 구현

- 로컬 스토리지
- 서버
