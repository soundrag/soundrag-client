<br>
<div align="center">

**Soundrag**는 스피커 배치에 따라 소리의 변화를 느낄 수 있는
**3D 공간 음향 시뮬레이터** 입니다.

  <br>

  <img width="300px" alt="project icon" src="https://github.com/user-attachments/assets/8f54c1ef-ac76-4dc0-a35a-4bc50a165fcc">
  
  <br>

  <br>
  
  <a target="blank" href="https://soundrag-31cbb.web.app/">
    <img src="https://github.com/user-attachments/assets/10869a25-1536-44ca-8eca-adbe3370fa13">
  </a>

  <br>
  <br>

_스피커를 이동하거나 최적의 위치를 찾는 것은 시간과 노력이 많이 소요됩니다._<br>
_이러한 문제를 해결하기 위해 3D 가상 공간에서 스피커를 자유롭게 배치할 수 있는 환경을 구현하였습니다._

</div>

<br>
<span id="top"></span>
<br>

## 📜 목차

<!-- toc -->

- [1️. 기술 스택](#1%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [2. 기능 구현](#2-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
  - [2-1. 2D 화면에서의 3D 모델 움직이기](#2-1-2d-%ED%99%94%EB%A9%B4%EC%97%90%EC%84%9C%EC%9D%98-3d-%EB%AA%A8%EB%8D%B8-%EC%9B%80%EC%A7%81%EC%9D%B4%EA%B8%B0)
    - [(1) 다양한 2D 화면에 대응하기](#1-%EB%8B%A4%EC%96%91%ED%95%9C-2d-%ED%99%94%EB%A9%B4%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0)
    - [(2) 2D 화면에서 3D 모델 좌표 구하기](#2-2d-%ED%99%94%EB%A9%B4%EC%97%90%EC%84%9C-3d-%EB%AA%A8%EB%8D%B8-%EC%A2%8C%ED%91%9C-%EA%B5%AC%ED%95%98%EA%B8%B0)
    - [(3) 3D 모델과 마우스의 움직임 상호작용하기](#3-3d-%EB%AA%A8%EB%8D%B8%EA%B3%BC-%EB%A7%88%EC%9A%B0%EC%8A%A4%EC%9D%98-%EC%9B%80%EC%A7%81%EC%9E%84-%EC%83%81%ED%98%B8%EC%9E%91%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [2-2. 3D 공간에서 소리 변화 보여주기](#2-2-3d-%EA%B3%B5%EA%B0%84%EC%97%90%EC%84%9C-%EC%86%8C%EB%A6%AC-%EB%B3%80%ED%99%94-%EB%B3%B4%EC%97%AC%EC%A3%BC%EA%B8%B0)
    - [(1) 리스너와 스피커와의 거리에 따른 소리 변화](#1-%EB%A6%AC%EC%8A%A4%EB%84%88%EC%99%80-%EC%8A%A4%ED%94%BC%EC%BB%A4%EC%99%80%EC%9D%98-%EA%B1%B0%EB%A6%AC%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8C%EB%A6%AC-%EB%B3%80%ED%99%94)
    - [(2) 스피커의 좌우 배치에 따른 소리 변화](#2-%EC%8A%A4%ED%94%BC%EC%BB%A4%EC%9D%98-%EC%A2%8C%EC%9A%B0-%EB%B0%B0%EC%B9%98%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8C%EB%A6%AC-%EB%B3%80%ED%99%94)
    - [(3) 스피커의 천장, 바닥 배치에 따른 소리 변화](#3-%EC%8A%A4%ED%94%BC%EC%BB%A4%EC%9D%98-%EC%B2%9C%EC%9E%A5-%EB%B0%94%EB%8B%A5-%EB%B0%B0%EC%B9%98%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8C%EB%A6%AC-%EB%B3%80%ED%99%94)
- [3️. 개선 사항](#3%EF%B8%8F-%EA%B0%9C%EC%84%A0-%EC%82%AC%ED%95%AD)
  - [3-1. 자동 저장](#3-1-%EC%9E%90%EB%8F%99-%EC%A0%80%EC%9E%A5)
    - [(1) 자동 저장이 필요한 이유](#1-%EC%9E%90%EB%8F%99-%EC%A0%80%EC%9E%A5%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0)
    - [(2) 자동 저장은 항상 실행될까?](#2-%EC%9E%90%EB%8F%99-%EC%A0%80%EC%9E%A5%EC%9D%80-%ED%95%AD%EC%83%81-%EC%8B%A4%ED%96%89%EB%90%A0%EA%B9%8C)
  - [자동 저장 기능을 통해](#%EC%9E%90%EB%8F%99-%EC%A0%80%EC%9E%A5-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%86%B5%ED%95%B4)
  - [3-2. 키보드 단축키](#3-2-%ED%82%A4%EB%B3%B4%EB%93%9C-%EB%8B%A8%EC%B6%95%ED%82%A4)
    - [(1) 키보드 단축키가 필요한 이유](#1-%ED%82%A4%EB%B3%B4%EB%93%9C-%EB%8B%A8%EC%B6%95%ED%82%A4%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0)
    - [(2) 키보드 단축키는 어떻게 적용될까?](#2-%ED%82%A4%EB%B3%B4%EB%93%9C-%EB%8B%A8%EC%B6%95%ED%82%A4%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%81%EC%9A%A9%EB%90%A0%EA%B9%8C)
- [4. 회고](#4-%ED%9A%8C%EA%B3%A0)
  - [4-1. 3D 작업](#4-1-3d-%EC%9E%91%EC%97%85)
  - [4-2. 소리 변화](#4-2-%EC%86%8C%EB%A6%AC-%EB%B3%80%ED%99%94)
  - [4-3. 사용자 편의성](#4-3-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%8E%B8%EC%9D%98%EC%84%B1)

<!-- tocstop -->

<br>
<br>

## 1️. 기술 스택

<div align="center">
 <img width="800" alt="개인플" src="https://github.com/user-attachments/assets/07d59b31-84e8-4042-bb26-84b5e974ad22">
</div>

### Client

![React](https://img.shields.io/badge/react-%23404d59.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23404d59.svg?style=for-the-badge&logo=vite&logoColor=w)
![Axios](https://img.shields.io/badge/axios-%23404d59.svg?style=for-the-badge&logo=axios&logoColor=w)
![ThreeJS](https://img.shields.io/badge/Three.js-404d59?style=for-the-badge&logo=Three.js&logoColor=w)
![Zustand](https://img.shields.io/badge/zustand-%23404d59.svg?style=for-the-badge&logo=react&logoColor=black)
![Styled-components](https://img.shields.io/badge/styled_component-404d59.svg?style=for-the-badge&logo=styledcomponents&logoColor=DB7093)

### Server

![NodeJS](https://img.shields.io/badge/node.js-404d59?style=for-the-badge&logo=node.js&logoColor=6DA55F)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%23404d59.svg?style=for-the-badge&logo=mongodb&logoColor=w)

### Deploy

![Firebase](https://img.shields.io/badge/firebase-%23404d59.svg?style=for-the-badge&logo=firebase&logoColor=red)
![Amazon Web Service](https://img.shields.io/badge/amazon%20web%20service-%23404d59.svg?style=for-the-badge&logo=amazon&logoColor=b)

## 2. 기능 구현

### 2-1. 2D 화면에서의 3D 모델 움직이기

> 사용자의 입력에 따라 2D 화면에서 3D 모델을 움직이기 위해 총 **3단계**가 필요합니다.

<div align="center">
  <img width="800" alt="2D 화면에서 3D 모델 움직이기" src="https://github.com/user-attachments/assets/6ab044f9-359f-4831-856b-03355615b9ef">
</div>

이 프로젝트에서는 사용자가 3D 모델의 스피커를 배치하여 소리의 변화를 경험할 수 있습니다. 스피커를 배치하기 위해서는 사용자가 **2D 화면에서 3D 스피커 모델의 움직임**을 직접 조작해야 합니다.

이를 위한 구현 과정을 아래 상황과 함께 자세히 설명하겠습니다.

<div align="center">
  <img width="400" height="260" src="https://github.com/user-attachments/assets/2d918e2e-dcae-41a2-8f5a-e56128977869  ">

_사용자가 스피커를 배치하는 상황_

</div>

#### (1) 다양한 2D 화면에 대응하기

> 다양한 2D 화면에 대응하기 위해서는 **NDC(Normalized Device Coordinates)** 좌표로 변환해야 합니다.

웹에서 사용 가능한 이 프로젝트는 사용자들이 다양한 해상도와 화면 비율을 갖고 있는 모니터로 접근합니다. 이러한 다양성 때문에 고정된 화면 크기를 기준으로 좌표를 계산하면 다른 해상도나 비율의 화면에서는 3D 공간에서의 위치 계산이 부정확해질 수 있습니다. 예를 들어, 개발 당시 설정된 화면의 해상도와 비율이 사용자의 모니터와 다를 경우, 사용자가 마우스로 모델을 조작하려 할 때 모델이 의도하지 않은 방향으로 이동하는 문제가 발생할 수 있습니다. 이는 화면 좌표와 3D 공간 좌표의 매핑 오류로 인해 사용자 경험에 혼란을 줄 수 있습니다.

이러한 문제점을 해결하기 위해 프로젝트 화면의 좌표를 **NDC** 좌표로 변환하여 사용자의 모니터 해상도와 비율에 맞는 독립적인 좌표를 설정합니다. **NDC** 좌표로 변환하는 과정은 화면의 모든 좌표를 `-1`에서 `1` 사이의 값으로 **정규화**하는 것입니다.

<div align="center">
  <img width="400" alt="스크린샷 2024-10-24 오전 7 11 43" src="https://github.com/user-attachments/assets/d12ae7cc-7fde-4a6b-b958-c3b042c4e809">

_프로젝트 화면 NDC 좌표 변환_

</div>

<br>

#### (2) 2D 화면에서 3D 모델 좌표 구하기

> 2D 화면에서 3D 모델의 좌표를 구하기 위해서 광선(Ray) 을 발사해야 합니다.

2D 화면에서 3D 좌표를 직접 구할 수 없는 이유는 **깊이** 정보가 없기 때문입니다. 이를 해결하기 위해 2D 화면과 3D 공간을 연결하는 **광선** 투사 방식을 사용합니다. 화면상의 마우스 위치에서 3D 공간으로 **광선**을 발사하여, 광선이 3D 모델과 만나는 지점의 거리를 측정합니다. 이를 통해 마우스 위치에 대응하는 3D 공간의 `[x, y, z]` 좌표를 얻을 수 있습니다.

<div align="center">
  <img width="500" alt="광선 생성" src="https://github.com/user-attachments/assets/8b04c502-5083-4fa8-a17a-9fa3cd79e095">

_광선 생성을 통한 z축 좌표 계산_

 </div>

 <br>

#### (3) 3D 모델과 마우스의 움직임 상호작용하기

> 3D 스피커 모델과 마우스의 움직임이 서로 상호작용하기 위해 사용자가 움직인 3D 모델의 `[x, y, z]` 좌표를 마우스 이벤트 연결해야 합니다.

사용자가 마우스로 스피커를 배치할 수 있도록 마우스 드래그 이벤트를 활용합니다. 드래그를 시작할 때 마우스 위치를 기준으로 스피커의 초기 좌표를 저장하고, 드래그 중에는 마우스 움직임에 따라 스피커의 `[x, y, z]` 좌표를 실시간으로 업데이트하여 화면상의 위치 변화를 반영합니다.

<div align="center">
<img width="800" src="https://github.com/user-attachments/assets/7eab4882-2104-4414-b9cc-cd96099cfe6b">

_마우스 이벤트와 3D 모델 좌표 실시간 연동_

</div>

위와 같은 3단계의 과정을 통해 사용자는 **2D 화면에서 3D 스피커 모델을 직접 배치**할 수 있습니다.

---

### 2-2. 3D 공간에서 소리 변화 보여주기

> 공간에 따른 소리의 변화는 복잡한 과학적 원리가 내재되어 있습니다. 이 프로젝트에서는 사용자가 스피커의 배치에 따라 소리의 변화를 **명확하게** 체험할 수 있도록 세 가지 위치 요소를 활용하였습니다.

1. 리스너와 스피커와의 **거리**에 따른 소리 변화
2. 스피커의 **좌우** 배치에 따른 소리 변화
3. 스피커의 **천장, 바닥** 배치에 따른 소리 변화

아래 각 변화에 해당하는 내용을 자세히 설명하겠습니다.

#### (1) 리스너와 스피커와의 거리에 따른 소리 변화

> 리스너로부터 스피커까지의 x, y, z축 거리를 활용하여 **소리의 감쇠효과**를 구현합니다.

**소리의 감쇠효과**는 리스너로부터 소리의 근원지가 멀어지면 볼륨이 감소하고 거리가 가까워지면 볼륨이 증가하는 현상을 의미합니다. 이 프로젝트에서는 소리의 근원지를 스피커로 설정하여 아래와 같이 구현하였습니다.

| 거리가 가까운 경우                                                                                                                                                  | 거리가 먼 경우                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="350" height="260" alt="스크린샷 2024-10-24 오후 4 41 50" src="https://github.com/user-attachments/assets/f3d77ad2-a5c5-4b02-9dca-affbdb17997a"> | <img width="350" height="260" alt="스크린샷 2024-10-24 오후 4 42 05" src="https://github.com/user-attachments/assets/6014f8c2-7391-4f19-9939-341cbc4526fc"> |

사용자는 리스너로부터 스피커를 가까이 배치할 경우 볼륨이 증가하고 멀리 배치하는 경우 볼륨이 감소하는 현상을 경험할 수 있습니다. 리스너로부터 스피커 사이의 거리를 구하기 위해 실시간으로 각 모델의 `[x, y, z]` 좌표를 입력하여 **소리의 감쇠효과**를 보여줍니다.

#### (2) 스피커의 좌우 배치에 따른 소리 변화

> 리스너로부터 스피커까지의 x, z축 거리를 활용하여 스피커의 **좌우 배치에 따른 소리의 세기차이**를 구현합니다.

스피커가 리스너의 왼쪽에 배치되면 왼쪽에서 들리는 소리가 강하게 오른쪽에 배치되면 오른쪽에서 소리가 강하게 들리는 현상을 기반으로 합니다. 이는 스피커의 위치에 따라 가까운 쪽 귀로 소리가 더 강하게 들어오고, 머리가 다른 쪽 귀로의 소리 전달을 약간 차단하기 때문입니다.

이 프로젝트에서는 리스너를 기준으로 스피커의 좌우 위치를 파악하기 위해 _cos_ 함수를 활용하였습니다.

_cos_ 함수 활용 방식은 아래를 따릅니다.

1. 리스너를 중심으로 스피커와의 x축 ,z축 거리를 입력합니다.
2. 입력된 거리를 바탕으로 스피커와 리스너 사이의 각도를 계산합니다.
3. 계산된 각도를 _cos_ 함수에 대입하여 결과 값을 통해 스피커의 위치를 결정합니다.

| _cos_ (각도) | 값  | 위치   |
| ------------ | --- | ------ |
| _cos_ (180°) | -1  | 왼쪽   |
| _cos_ (90°)  | 0   | 중앙   |
| _cos_ (0°)   | 1   | 오른쪽 |

이 방식을 통해 _cos_ 값이 -1에 가까우면 스피커가 왼쪽에, 1에 가까우면 오른쪽에 배치된 것으로 분류합니다.

| 왼쪽 배치                                                                                                                                                           | 오른쪽 배치                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="350" height="260" alt="스크린샷 2024-10-24 오후 5 46 37" src="https://github.com/user-attachments/assets/15a14891-a185-466b-834e-39fa1b8dbcf9"> | <img width="350" height="260" alt="스크린샷 2024-10-24 오후 5 46 49" src="https://github.com/user-attachments/assets/c4a2080b-65c1-4e6b-a855-c78d80c6f369"> |

사용자는 스피커를 왼쪽에 배치할 때 왼쪽 소리가 강조되고 오른쪽에 배치할 때 오른쪽 소리가 강조되는 경험을 할 수 있습니다. 리스너로부터 스피커의 x, z축 거리를 활용하여 스피커 좌우 배치에 따른 **소리의 세기 차이**를 보여줍니다.

#### (3) 스피커의 천장, 바닥 배치에 따른 소리 변화

> 스피커의 **주파수 음역대**의 특징을 활용하여 수직 배치에 따른 소리의 차이를 구현합니다.

사용자에게 스피커 배치에 따라 달라지는 소리의 차이를 직관적으로 제공하기 위해, 단순히 볼륨 차이만이 아니라 주파수 음역대의 변화를 추가 구현하기로 결정했습니다. 특히, 스피커의 위치에 따라 주파수 음역대가 어떻게 달라지는지 명확한 구분이 필요했습니다.

이를 구분하기 위해 먼저 주파수 음역대의 특징을 살펴보았습니다.

- 고주파 음역대는 짧은 파장을 가지기 때문에 다른 물체에 쉽게 흡수되어 방의 모서리나 부드러운 재료가 많은 곳에서 약하게 전달됩니다.
- 저주파 음역대는 긴 파장을 가지며, 이로 인해 벽이나 다른 큰 물체에 부딪혀도 쉽게 반사되어 그대로 전달됩니다.

이 프로젝트에서는 이러한 주파수 음역대의 특성을 적극 활용하여 사용자가 스피커의 수직 위치 변경에 따라 고주파 음역대가 어떻게 다르게 들리는지를 체험할 수 있게 하였습니다. 바닥 가까이에 설치된 스피커는 고주파 음역대가 부드러운 바닥에 흡수되어 약하게 전달되어 상대적으로 저주파 음역대를 강조한 풍부하고 깊은 베이스를 경험할 수 있도록 설계하였습니다. 반면 천장 가까이에 설치된 스피커는 고주파 음역대가 딱딱한 천장에 흡수되지 않고 그대로 반사되어 고주파 음역대를 강조한 섬세하고 선명한 소리를 제공하도록 구현하였습니다.

<br>

| 바닥 배치                                                                                                                                                           | 천장 배치                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="350" height="260" alt="스크린샷 2024-10-24 오후 7 30 55" src="https://github.com/user-attachments/assets/8caf900f-4e91-43b8-bb2b-e8293bf4d97f"> | <img width="350" height="260" alt="스크린샷 2024-10-24 오후 7 31 18" src="https://github.com/user-attachments/assets/3294442d-62a0-4c57-9769-72ffaf19a2bd"> |

<br>

<div align="center">

### 세 가지 위치 요소를 통해 사용자는 스피커를 배치함으로써 다양한 소리의 변화를 경험할 수 있습니다.

  <img width="600" src="https://github.com/user-attachments/assets/2e93699e-7fa4-4277-bda4-c67df10befe1">
</div>

## 3️. 개선 사항

### 3-1. 자동 저장

#### (1) 자동 저장이 필요한 이유

사용자가 스피커 배치를 저장하기 위해 반드시 버튼을 클릭해야만 한다면 번거로운 상황이 발생할 수 있습니다. 예를 들어 사용자가 스피커를 배치하던 도중 시스템 오류, 네트워크 문제 등과 같이 예상치 못한 상황 속에서 저장 버튼을 클릭하지 못한다면 원하지 않는 정보 손실이 발생할 수 있습니다. 이는 사용자 경험을 저해한다고 판단하여 **자동 저장** 기능을 구현하게 되었습니다.

또한, **자동 저장** 기능은 웹 서비스에서 주요 트렌드 중 하나입니다.

<div align="center">
  <img width="600" src="https://github.com/user-attachments/assets/4647616e-cc98-4cbb-bed8-e5f7931df880">

_예시) Google Docs 자동 저장 기능_

</div>

Google Docs는 자동 저장 기능을 통해 사용자가 작업의 변경 이력을 관리하고 이전 버전으로 쉽게 되돌릴 수 있도록 유연한 버전 관리 기능을 제공합니다. 그리고 수동으로 저장 버튼을 누르는 번거로움을 없애고 작업에 집중할 수 있도록 하였습니다.

사용자 경험을 향상시키고 최근 서비스에서 자주 볼 수 있는 자동 저장 기능은 필요가 아니라 필수라 생각했습니다.

#### (2) 자동 저장은 항상 실행될까?

**자동 저장** 기능은 항상 실행되지 않고 두 가지 조건을 **모두** 만족했을 때만 실행됩니다.

<br>

<div align="center">
   <img width="600" alt="자동 저장" src="https://github.com/user-attachments/assets/134ae27f-862e-402e-a027-3722f9ba91bb">

_조건들 중 하나라도 성립하지 않는다면 자동 저장을 실행하지 않습니다._

</div>

<br>

이러한 조건을 설정한 이유는 서비스의 **성능 개선** 측면에 기인합니다.

1. **5초** 동안 스피커나 리스너 배치가 **바뀌었나요?**<br>
   자동 저장 기능이 상시 실행되는 경우 불필요한 연산이 발생하여 **성능 저하**를 일으킬 수 있다고 판단하였습니다. 따라서 **5초**라는 대기 시간과 **변경**이 있을 때만 처리하여 **성능 저하** 없이 정보를 효율적으로 저장하기 위해 해당 조건을 설정하였습니다.

2. 데이터 베이스에 저장된 배치와 **다른가요?**<br>
   사용자의 스피커 배치 정보는 **데이터 베이스**로 저장됩니다. 데이터 베이스에 저장하기 위해서는 **서버**에 요청을 하는 과정을 거치는데 이 요청은 **네트워크 트래픽**과 관련이 있습니다. 이 요청이 많아진다면 서버에 부하가 생길 수 있습니다. 저장 기능과 관련된 서비스의 성능 개선을 위해 중복된 정보를 검토하여 불필요한 저장을 막고 **서버 부하를 줄이기 위해** 해당 조건을 설정하였습니다.

<br>

<div align="center">

  <img width="600" src="https://github.com/user-attachments/assets/ada7ea77-1081-4e45-b843-eb54f5295609">
</div>

### 3-2. 키보드 단축키

#### (1) 키보드 단축키가 필요한 이유

스피커 배치에 따라 음향 변화를 느끼는 것이 핵심 기술인만큼 사용자의 **세밀한 조작**은 중요하다고 생각합니다. 만약 오직 마우스 하나로 모든 작업을 수행하려고 한다면 사용자 경험을 저해할 수 있다고 생각합니다. 아래는 마우스 조작만 허용했을 때, 발생하는 어려움들입니다.

- 모드 전환을 할 때 마다 마우스를 이동해야 합니다.

- 스피커 수직 이동이 마우스로 불가능합니다.

| 모드 전환                                                                                                                                   | 스피커 수직 이동                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="350" height="260" alt="모드 전환 어려움" src="https://github.com/user-attachments/assets/6faab4bc-7e57-4ad0-aec1-f0a52bcaa5f5"> | <img width="350" height="260" alt="조작 어려움" src="https://github.com/user-attachments/assets/ee3dabb1-7860-4d5a-8c75-b6e27f819527"> |

<br>

#### (2) 키보드 단축키는 어떻게 적용될까?

오른손을 조작하는 마우스와 함께 사용하기 위해 **왼손 최적화**된 키보드의 배치를 고려하였습니다.

<div align="center">
  <img width="600" alt="키보드 단축키 모음" src="https://github.com/user-attachments/assets/ec3bd990-3318-465e-897d-2043b61764a3">
</div>

<br>

- `1`, `2`, `3` 키: 사용자가 모드 (시점 이동 모드, 드래그 모드, 회전 모드)를 전환할 때 사용되며 왼손의 자연스러운 위치에 있습니다.
- `Shift` 키: 사용자가 스피커를 수직으로 이동할 때 사용합니다.
- `Z`, `X` 키: 사용자가 자동 저장된 위치 정보로 이동할 때 사용합니다.

## 4. 회고

### 4-1. 3D 작업

3D와 관련된 기능들을 구현하기 위해 수학적 개념에 대한 이해가 필요했습니다. 특히 3D 모델의 움직임과 회전 변환을 구현하기 위해 벡터에 대한 개념도 이해해야 했습니다. 관련 전공자가 아니다 보니 매우 어려웠지만, 평소 관심있었던 주제를 구현하기 위해 도움이 될 만한 개념이라 배워가는 과정도 구현하는 과정도 모두 흥미로웠습니다.

### 4-2. 소리 변화

평소 음악과 스피커에 관심이 많다고 생각했던 스스로를 돌아볼 수 있는 시간이었습니다. 생각보다 복잡했던 소리의 전달 방식을 현실과 같이 구현하지 못했지만 주변 지인들에게 테스트하고 사용자에게 변화를 보여줄 상상을 하면서 구현하는 과정이 매우 즐거웠습니다.

### 4-3. 사용자 편의성

프로젝트에서 핵심 기능은 3D 와 소리 변화였지만 이러한 기능을 사용자가 만끽할 수 있도록 하기 위해서는 사용자 경험을 향상시켜야 한다는 것을 깨달았습니다. 이 프로젝트를 접하는 사용자의 관점에서 봤을 때,
자동 저장, 키보드 단축키와 같은
