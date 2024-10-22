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

<br>
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

> 2D 화면으로 3D 공간에서 움직임을 구현하기 위해서 총 **3 단계**의 과정을 진행합니다.

<div align="center">
  <img width="800" alt="스크린샷 2024-10-22 오후 9 28 28" src="https://github.com/user-attachments/assets/d28ad8a5-99c9-409e-85f0-fd3940c164c5">
</div>
<br>

평면인 모니터 화면에서 3D 가상 공간에서의 스피커 움직임을 구하기 위해서는 3D 좌표의 **거리감**을 구하는 것이 중요합니다. 이 프로젝트에서는 **변환**된 `[x, y]` 좌표를 활용하여 광선을 통해 `[x, y, z]` 좌표를 **생성**합니다. 그리고 3D 좌표의 **거리를 계산**하여 움직임을 파악하도록 구현하였습니다.
<br>

아래 예시를 통해 구현 과정을 더 자세히 설명하겠습니다.

- 예시는 사용자가 스피커를 아래와 같이 배치하는 상황입니다.<br>

  <img width="400" height="260" src="https://github.com/user-attachments/assets/caa2361f-26a7-473e-b548-1af82f03dc57">

<br>

**1. `[x, y]` 좌표 변환**<br>

2D 모니터 화면의 좌표는 픽셀 단위로 정의되어 모니터의 해상도에 따라 달라집니다. 모니터 화면의 좌표를 3D 공간에 **일관되게** 적용하기 위해 가장 먼저 **NDC (Normalized Device Coordinates)** 좌표로 **변환**합니다. 여기서 **NDC** 좌표란 화면의 모든 좌표를 `-1`에서 `1` 사이의 값으로 **정규화**한 좌표를 의미합니다.

| NDC 좌표                                                                                                                                                             | 적용 화면                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" height="260" alt="스크린샷 2024-10-22 오전 9 26 26" src="https://github.com/user-attachments/assets/0fb7a70f-e497-4d7d-a52f-855a62f6fee1"> | <img width="400" height="260" alt="스크린샷 2024-10-22 오전 9 25 28" src="https://github.com/user-attachments/assets/dc32b3d5-23af-44b9-abb0-4c59fc77e2a3"> |

화면의 가장자리를 `-1` 또는 `1`로 **변환**하여 사용자가 사용하는 모니터의 비율과 해상도에 맞는 독립적인 **좌표계**를 설정합니다.

- 좌측 하단 `[-1, -1]`
- 우측 상단 `[1, 1]`

  <br>

**2. z축 거리 구하기**

2D 모니터 화면의 좌표만으로는 3D 공간의 **깊이**를 알기 위해서는 2D 모니터 화면과 3D 가상 화면을 연결해야 합니다. 이를 위해 **광선(Raycaster)** 을 생성하여 두 화면을 연결합니다.

   <img width="800" alt="스크린샷 2024-10-22 오전 11 06 07" src="https://github.com/user-attachments/assets/1cd73b84-8b77-4394-8045-23d108680c25">

2D 모니터 화면에서 3D 가상 화면까지 통과하는 지점을 연결한 선의 **깊이**를 **z축 거리**로 설정합니다.

   <br>

   <img width="800" alt="스크린샷 2024-10-22 오전 11 06 35" src="https://github.com/user-attachments/assets/134f10b0-1920-45de-b0fd-83e28d9735d1">

**광선**은 모니터 화면을 시작점으로 3D 가상 화면까지 통과하여 **생성**됩니다.

<br>

**3. x, y, z 축 거리 계산** <br>

광선을 통해 생성된 `[x, y, z]` 좌표로 2D 모니터 화면에서 3D 가상 공간 스피커의 움직인 **거리**를 계산합니다.

| [x, y, z] 좌표 생성                                                                                                                                    | x, y, z 거리감 계산                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <img width="400" alt="스크린샷 2024-10-22 오후 9 32 14" src="https://github.com/user-attachments/assets/5456e820-f118-4bf7-b8eb-a2d81ed6443f"> | <img width="400" height="260" alt="좌표 생성" src="https://github.com/user-attachments/assets/97ddf686-d9d7-45e7-8834-0e4b27f03d63"> |

<br>
<br>

<div align="center">

  <img width="600" src="https://github.com/user-attachments/assets/300ff6cc-1724-4065-8a03-7c00c8193272">

### _움직인 거리를 계산하여 2D 모니터 화면에서 3D 움직임을 파악할 수 있습니다._

</div>

<br>

---

<br>

#### 3D 공간에서 소리의 변화 구현하기

> 3D 공간에서 소리의 변화를 구현하기 위해서 세 가지 방식을 사용합니다.

<div align="center">
  <img width="800" src="https://github.com/user-attachments/assets/a6fc1799-9e9f-46c8-a72d-f3e45db411ea">
</div>
<br>

1. 전반적인 **공간 음향** 구현

2. 스피커의 수평 위치(좌, 우)에 따른 **공간 음향** 구현

3. 스피커의 수직 위치에 따른 **공간 음향** 구현

**공간 음향**이란 소리의 방향과 거리에 따라 달라지는 음향 효과를 의미합니다. 이 프로젝트에서는 웹 브라우저에 내장된 **Web Audio API**를 활용하여 위 세 가지 방식과 관련된 **공간 음향**을 구현하였습니다.

아래 자세한 설명을 통해 구현 과정을 보여드리겠습니다.

**1. 전반적인 공간 음향 구현**<br>

<img width="800" alt="hrtf" src="https://github.com/user-attachments/assets/d5e81270-a12f-4b06-965c-3a32c893da45">

<br>

전반적인 공간 음향은 리스너를 기준으로 스피커와의 `[x, y, z]` 좌표 **거리**로 **소리의 감쇠 효과**를 활용합니다. 감쇠 효과는 일상 생활에서 찾아볼 수 있듯이 리스너와 스피커의 거리가 **가까워지면** 소리가 **증가**하고 스피커의 거리가 **멀어지면** 소리가 **감소**하는 현상을 의미합니다.

| 거리가 가까운 경우                                                                                                                                                   | 거리가 먼 경우                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" height="260" alt="스크린샷 2024-10-22 오후 10 25 57" src="https://github.com/user-attachments/assets/e1fc8ab2-ee09-4c42-afc6-7ed8930cfbd3"> | <img width="400" height="260" alt="스크린샷 2024-10-22 오후 10 21 49" src="https://github.com/user-attachments/assets/e118df21-7ce7-4d4b-bf61-809319b13d39"> |

**Web Audio API**는 실시간으로 리스너, 스피커의 `[x, y, z]` 좌표 값을 입력하면 **거리**를 계산하여 **볼륨**을 조절합니다.

<br>

**2. 스피커 수평 위치(좌, 우)에 따른 공간 음향 구현**<br>

소리의 좌, 우 방향성에 대한 미묘한 차이를 효과적으로 전달하기 위해 스피커 위치에 따른 **소리 세기 차이** 원리를 활용하였습니다. 이 원리는 소리가 전달되기 시작하는 위치에 따라 소리 에너지가 두 귀에 다르게 도달하는 현상과 관련이 있습니다.

- 소리가 **왼쪽**에서 전달되기 시작할 때

  - **왼쪽** 귀에 직접적으로 소리 에너지가 **강하게** 도달
  - 오른쪽 귀에는 머리가 막고 있어 소리 에너지가 약하게 도달

- 소리가 **오른쪽**에서 전달되기 시작할 때
  - **오른쪽** 귀에 직접적으로 소리 에너지가 더 **강하게** 도달
  - 왼쪽 귀에는 머리가 막고 있어 소리 에너지가 더 약하게 도달

이 원리를 활용하여 스피커가 **왼쪽**에 배치될 때 **왼쪽**의 볼륨을 강조하고 스피커가 **오른쪽**에 배치될 때 **오른쪽**의 볼륨을 강조하였습니다.

   <img width="800" alt="스크린샷 2024-10-22 오후 1 14 11" src="https://github.com/user-attachments/assets/84d8f7b8-045d-48f3-8937-cdf869547880">

스피커의 **왼쪽, 오른쪽 위치**는 삼각함수 중 하나인 **cos** 함수를 사용하였습니다. 우선 리스너를 기준으로 스피커와 `[x, z]` 좌표 거리로 **각도**를 구합니다.

<br>

| cos (각도) | 값  | 위치   |
| ---------- | --- | ------ |
| cos (180°) | -1  | 왼쪽   |
| cos (90°)  | 0   | 중앙   |
| cos (0°)   | 1   | 오른쪽 |

구한 **각도**를 **cos** 함수에 대입하여 계산된 **값**으로 **위치**(좌, 우)를 설정합니다.

<br>

| 좌측 배치                                                                                                                                              | 우측 배치                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img width="400" alt="스크린샷 2024-10-22 오후 1 32 01" src="https://github.com/user-attachments/assets/be753dce-8e34-44a7-b829-97ca9526a44a"> | <img width="400" alt="스크린샷 2024-10-22 오후 1 32 34" src="https://github.com/user-attachments/assets/da80dc9e-0c66-46f5-832a-6c21ecd02253"> |

값이 `-1`에 가까우면 왼쪽 볼륨을 `1`에 가까우면 오른쪽 볼륨을 강조합니다.

<br>

**3. 스피커 수직 위치**<br>

소리의 수직 위치에 따라 달라지는 소리의 변화를 구현하기 위해 주로 목소리, 심벌즈 파트에 해당하는 **고주파** 음역대와 베이스나 드럼 파트에 해당하는 **저주파** 음역대의 특징을 활용하였습니다.

<img width="600" alt="스크린샷 2024-10-22 오후 11 26 54" src="https://github.com/user-attachments/assets/948eac4b-23e3-4e9b-9e7a-989b0234a9c2">

<br>

- 고주파 음역대
  - 파장이 짧아 푹신한 **바닥**에 흡수가 잘 되고 **약하게** 전달됩니다.
- 저주파 음역대
  - 파장이 길어 **바닥**에 흡수되지 않고 **그대로** 전달됩니다.

<br>

고주파 음역대가 바닥에 흡수가 잘 되는 현상을 활용하여 스피커가 **바닥**에 있을 때는 **저주파 음역대**가 상대적으로 **강조**되고 스피커가 **천장**에 있을 때는 **고주파** 음역대가 상대적으로 **강조**되도록 구현하였습니다.

<img width="600" alt="스크린샷 2024-10-22 오후 4 44 43" src="https://github.com/user-attachments/assets/529211a2-5a29-4c5a-a235-6aa805316f6d">

또한 스피커의 수직 위치를 천장과 바닥, 두 가지로 제한하였습니다. 이는 사용자가 **직관적**으로 천장과 바닥에서의 고주파와 저주파 차이를 쉽게 **비교**할 수 있도록 하기 위함입니다.

<br>

---

<br>
<br>

### 2️⃣ 불편하지 않은 조작법에 대하여

#### 오직 마우스로만 조작한다면?

오직 마우스 하나로 모든 작업을 수행하려고 하는 것은 사용자 경험을 저해할 수 있다고 생각합니다. 특히 스피커의 위치에 따라 음향 변화를 느끼는 것이 핵심 기술인만큼 사용자의 **세밀한 위치 조정**은 중요하다고 생각합니다. 마우스 조작만 허용했을 때, 아래와 같은 어려움을 발견할 수 있었습니다.

| 모드 전환                                                                                                                                     | 스피커 수직 이동                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400px" height="260" alt="모드 전환 어려움" src="https://github.com/user-attachments/assets/6faab4bc-7e57-4ad0-aec1-f0a52bcaa5f5"> | <img width="400px" height="260" alt="조작 어려움" src="https://github.com/user-attachments/assets/ee3dabb1-7860-4d5a-8c75-b6e27f819527"> |

<br>

#### 마우스에 키보드 단축키를 곁들인 조작법

3D 모델을 드래그하여 실시간으로 음향의 변화를 구현하는 이 프로젝트에서는 사용자 경험을 개선하기 위해 키보드와 마우스를 동시에 활용하는 인터페이스를 채택하기로 결심했습니다. 또한 **왼손 최적화**된 키보드의 배치를 통해 왼손이 넓은 키보드 자판을 모두 조작해야 하는 번거로움을 해소해야 한다고 생각했습니다.

<img width="600" alt="키보드 단축키 모음" src="https://github.com/user-attachments/assets/ec3bd990-3318-465e-897d-2043b61764a3">

<br>

- `1`, `2`, `3` 키: 사용자가 모드 (시점 이동 모드, 드래그 모드, 회전 모드)를 전환할 때 사용되며 왼손의 자연스러운 위치에 있습니다.
- `Shift` 키: 사용자가 스피커를 수직으로 이동할 때 사용합니다.
- `Z`, `X` 키: 사용자가 자동 저장된 위치 정보로 이동할 때 사용합니다.

<br>

<div align="center">

  <img width="600" alt="병행 조작" src="https://github.com/user-attachments/assets/deaf4c7c-9e21-4e07-88a6-e5975f1dddac">
  <br>

### _편리한 조작법_

</div>

<br>
<br>

### 3️⃣ 유연한 저장 기능

#### 버튼 없이 저장하는 방법: 자동 저장

1. 자동 저장 필요한 이유?

2. 자동 저장 실행 조건

   <img width="600" alt="스크린샷 2024-10-22 오후 7 08 21" src="https://github.com/user-attachments/assets/3c65646e-af6c-4b84-9d6f-502bd12cec18">

3. 자동 저장 구현 방식

<br>

#### 누구나 사용할 수 있는 저장하기

로그인하지 않은 사용자, 로그인한 사용자 모두 사용할 수 있도록 구현

<img width="600" alt="스크린샷 2024-10-22 오후 7 14 49" src="https://github.com/user-attachments/assets/95858366-8860-40fc-a046-7fa354db2263">

- 로컬 스토리지

- 서버

사용자에 따라 다른 저장 방식 플로우 시각 자료
