---
title: 쉬운 three.js 2] 기본 구성
tags:
  - three.js
coverImg: /images/22/04/22/194935.png
---

three.js를 하실 준비가 되셨나요? 그럼 바로 시작하겠습니다.

<!--more-->

## 시작하기에 앞서

혹시 어떻게 진행할지 여전히 헷갈리시는 분들을 위해 제가 구현하는 방식에 대해 구체적으로 알려드리겠습니다. 혹시 이전 시간에서 본 다른 방법을 사용하고 싶으신 분들은 넘어가셔도 됩니다.

먼저 원하는 폴더 하나 만드시고 그 안에 `index.html`와 `main.js` 파일을 만들어줍시다. 저는 `threejs`라는 이름의 폴더를 만들었습니다.

<post-img src="/images/22/04/22/212213.png"></post-img>

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>

  <body>
    <canvas id="three-canvas"></canvas>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```js [main.js]
import * as THREE from "https://cdn.skypack.dev/three";
```

우선 three.js의 기본 구성요소에 대해 알아보겠습니다.

## three.js의 기본 구성요소

우리가 원하는 3D 모습을 Canvas에 그려내려면 몇 가지 기본 요소들을 알아야합니다.

<post-img src="/images/22/04/22/210157.png"></post-img>

- `Renderer`: 카메라가 본 모습을 실제로 캔버스에 그려주는 도우미
- `Camera`: 카메라
- `Light`: 조명
- `Mesh`: 물체. 물체는 모양과 재질을 합쳐서 만드러잊빈다.
  - `Geometry`: 물체의 모양
  - `Material`: 물체의 재질
- `Scene`: 카메라, 조명, 물체 들이 존재하는 공간

앞으로 이 구성들을 하나하나 살펴볼 예정이며, 오늘은 간단하게 어떤식으로 프로그래밍 하는지 알아볼게요!

### Renderer

**렌더링이란 3차원 공간을 2D 화면으로 나타내주는 것** 을 말합니다. 그럼 그 화면을 어디에 그려야할 지 먼저 정해야겠죠? 그래서 Canvas 요소를 가져오는 코드가 필요합니다. index.html에서 id가 `three-canvas`인 캔버스를 만들었었죠?

```js
const canvas = document.querySelector("#three-canvas");
```

보통 Renderer는 `WebGLRenderer` 클래스를 사용합니다. 인스턴스로 생성을 해주면 렌더러가 만들어집니다. 그리고 크기를 같이 정해줘야하는데요. 크기를 정해주면 Canvas 크기도 같이 변하게 됩니다. 저희는 브라우저의 가로(`window.innerWidth`), 세로(`window.innerHeight`) 크기에 맞춰서 해볼게요.

```js
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
```

아직은 아무런 화면도 보이지 않을 거에요! 아직 카메라도 없고 물체도 없으니 아무것도 안 보이는게 당연하죠?

### Camera

3D에서 카메라(camera)는 눈을 담당합니다. 혹시 동물마다 시야각이 다른 거 아시나요? 사람은 200도인 것에 비해 토끼는 거의 360도 볼 수 있죠!

<post-img src="/images/22/04/24/125018.png"></post-img>

갑자기 이런 얘기를 꺼내는 이유는 카메라도 보이는 범위를 정해야하기 때문이죠!

- `fov`: 수직 시야각 (Field Of View)
- `aspect`: 종횡비 (가로 세로 비율)
- `near`: 가까이 볼 수 있는 제한 거리
- `far`: 멀리 볼 수 있는 제한 거리
