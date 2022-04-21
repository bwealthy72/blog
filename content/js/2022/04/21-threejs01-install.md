---
title: three.js 깔쌈하게 정리 - 설치하는 법
tags:
  - three.js
---

이전부터 3D에 대한 갈망은 있었지만 이제서야 해보네요!! 개인적으로 블로그의 홈은 3D였으면 좋겠어서 배우기 시작했습니다. 알아야할 것들이 좀 많은 것 같아 까먹기 전에 정리를 한 번 해보려고 합니다.

<!--more-->

하지만 단순한 정리글이 아닌 누군가에게 가르친다는 느낌으로 작성할겁니다. 그러니 보는 데에 불편함은 없을 겁니다! 이 글은 인프런의 [1분코딩님의 강의](https://www.inflearn.com/course/3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9/dashboard)와 [공식 홈페이지 문서](https://threejs.org/docs/index.html#manual/ko/introduction/Creating-a-scene)를 참조했습니다!

## 설치 방법

시작하려면 우선 three.js를 설치해야겠죠? 아래 설치 방법 중에 본인에게 맞는 방법을 사용해주세요.

### 1. npm으로 설치하기

npm으로 설치하신다면 아주 간단합니다. 터미널에서 다음과 같이 적어주세요.

```bash
npm install --save three
```

그리고 다음과 같이 import 해주시면 됩니다.

```js [option1.js]
// Option 1: three.js 라이브러리 내용 모두 가져오기
import * as THREE from "three";

const scene = new THREE.Scene();
```

```js [option2.js]
// Option 2: three.js 라이브러리 일부 가져오기
import { Scene } from "three";

const scene = new Scene();
```

만약 아래와 같은 에러가 보이신다면, `import`대신 `require`를 사용해주세요!

<post-img src="/images/22/04/21/153100.png"></post-img>

```js
const THREE = require("three");

const scene = new THREE.Scene();
```

[실행하기](#실행하기)에 가셔서 코드를 복사 붙이기하고 실행해보세요!

### 2. three.js 파일 가져오기

[공식 홈페이지](https://threejs.org/)에 들어가서 [Code - download](https://github.com/mrdoob/three.js/archive/master.zip)를 클릭합니다.

<post-img src="/images/22/04/21/090335.png"></post-img>

`three.js-master.zip` 이란 파일을 보실 수 있는데 이를 압축해제 하고 `three.js-master/build/`에 들어가시면 three.js 파일들을 보실 수 있습니다.

<post-img src="/images/22/04/21/090643.png"></post-img>

`three.js` 또는 `three.min.js` 파일을 프로젝트 폴더에 넣고 html 파일에서 불러주시면 됩니다. min이 붙은 것은 내용을 압축해서 파일크기가 작아진 것입니다.

<post-img src="/images/22/04/21/091444.png"></post-img>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="./three.js"></script>
    <!-- three.min.js를 불러오는 경우 -->
    <!-- <script src="./three.min.js"></script> -->
    <script>
      const scene = new THREE.Scene();
    </script>
  </body>
</html>
```

`const scene = new THREE.Scene();` 코드만으로는 아무것도 나타나지 않습니다. [실행하기](#실행하기)로 가셔서 import 하는 부분만 뺴고 복사해서 붙여넣으신다면 실행이 되실거에요!

### three.module.js 모듈 가져오기

만약 모듈 형식으로 불러온다면 js파일이 js파일을 불러올 수 있게 됩니다. [공식 홈페이지](https://threejs.org/)에 들어가서 [Code - download](https://github.com/mrdoob/three.js/archive/master.zip)를 클릭해주세요.

<post-img src="/images/22/04/21/090335.png"></post-img>

그러면 `three.js-master.zip` 이란 파일을 보실 수 있는데 이를 압축해제하시면 다음과 같은 파일들이 있는데요.

<post-img src="/images/22/04/21/090643.png"></post-img>

원하는 폴더에 `three.module.js` 파일만 가져와서 `index.html`이란 파일을 만듭니다.

<post-img src="/images/22/04/21/092840.png"></post-img>

내용은 다음과 같이 채우면 three.js 모듈을 가져올 수 있습니다.

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script type="module">
      import * as THREE from "./three.module.js";
      const scene = new THREE.Scene();
    </script>
  </body>
</html>
```

당장 어떤 결과가 보이진 않을겁니다. 아래 [실행하기](#실행하기)에서 코드를 붙여넣어줘야합니다.

### CDN으로 불러오기

외부에 있는 three.js 파일을 페이지 로드할 때마다 가져와서 쓰는 방법입니다. 원하는 폴더에 `index.html` 파일을 만들고 다음과 같이 적어주세요

<post-img src="/images/22/04/21/155502.png"></post-img>

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script type="module">
      import * as THREE from "https://cdn.skypack.dev/three";
      const scene = new THREE.Scene();
    </script>
  </body>
</html>
```

## 실행하기

이제 잘 실행되는지 확인을 해야겠죠? 아래 내용의 코드를 우리 script 또는 js 파일에 넣어보겠습니다.

만약 `three.js` 파일을 가져와서 사용하시는 경우에는 제일 상단 import 하는 부분을 빼주세요.

```js
// three.js를 불러오는 경우 제외
import * as THREE from "./three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

<p class="codepen" data-height="308.15234375" data-default-tab="html,result" data-slug-hash="RwxdgJZ" data-user="bwealthy72" style="height: 308.15234375px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/RwxdgJZ">
  threejs-cdn</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 마무리하며

위 Codepen 예시에서 보시다시피 저는 CDN을 가져와서 예시로 보일 예정입니다. 물론 다른 방법을 써도 크게 차이는 없으니 걱정마세요. 만약 있다고 해도 따로 설명드리겠습니다.
