---
title: css shadow 그림자 넣는 방법 총정리
tags:
  - shadow
coverImg: /images/22/03/30/132155.png
---

웹에서 입체적인 효과를 위해 사용되는 그림자(shadow)를 사용하는데요. 그림자를 적절하게 주기 위해서는 이를 위한 속성들을 잘 알아야합니다.

<!--more-->

이 글에서 쓰일 shadow 속성들을 빠르게 이해하기 위해 제가 간단하게(라고하기엔 4시간이 걸렸지만..) 구현을 해놨어요! 다양하게 건드려보면 이 글을 읽는 것보다 더 잘 이해되실 수도 있어요!

<css-shadow></css-shadow>

## shadow 속성

그림자(shadow)를 만들 수 있는 css 속성들은 3가지가 있습니다.

- `box-shadow`: 요소의 영역에 그림자를 만듭니다.
- `text-shadow`: 요소의 텍스트에 그림자를 만듭니다.
- `filter: drop-shadow`: 요소에서 색상을 가진 부분의 그림자를 만듭니다.

### 문법

<post-img src="/images/22/03/30/174441.png"></post-img>

- `offset-x`: 수평축 그림자 위치 (필수)
- `offset-y`: 수직축 그림자 위치 (필수)
- `blur-radius`: 흐림 정도 (선택)
- `spread-radius`: 그림자를 확장 크기 (선택)
- `color`: 색상 (선택)
- `inset`: 요소와 그림자 안밖을 바꿀지 여부 (선택)

spread-radius는 box-shadow에만 있습니다. 단순히 그림자 크기를 조정할 때 사용합니다.

<post-img src="/images/22/03/30/185059.png"></post-img>

그리고 inset 또한 box-shadow만 있는데요! 그림자를 요소와 바꾼 것처럼 동작합니다. 그러다보니 달라지는 특징이 있는데요.

- offset 값을 조정하면 안의 요소가 그에 맞춰 움직입니다.
- spread-radius 값이 커지면 안의 요소가 좁아집니다.

<post-img src="/images/22/03/30/204140.png"></post-img>

### 비교

만약 동일한 div 요소가 있다고 해보겠습니다. 이 요소는 정사각형에 중간에 글자가 있습니다. 만약 각 shadow 방식을 적용했을 때 **그림자만 본다면** 이런 느낌으로 있을겁니다.

<post-img src="/images/22/03/30/180116.png"></post-img>

box-shadow와 filter 방식은 동일한 것처럼 보이지만 이미지만 다룰 때 차이가 발생하는데요. 이미지에서 투명한 부분을 제외하고 불투명한 부분에서만 그림자가 발생합니다.

<post-img src="/images/22/03/30/182239.png"></post-img>

또한 filter는 box-shadow에 가려져서 보이지 않지만 text나 그림자의 그림자도 나타납니다. 즉 이미지 뿐만 아니라 요소 모든 부분의 그림자가 나타납니다.

<post-img src="/images/22/03/30/205212.png"></post-img>

### 여러 그림자

서
box-shadow, text-shadow는 `콤마(,)`를 기준으로 여러 그림자를 사용할 수 있습니다. 이를 잘 활용하면 마치 왼쪽 위에 조명이 있는 것처럼 효과를 줄 수 있습니다.

<post-img src="/images/22/03/30/212630.png"></post-img>

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="abEyBmZ" data-editable="true" data-user="bwealthy72" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/abEyBmZ">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 마무리하며

만약 원하는 그림자를 만들거나 독특한 다양한 기법을 알고싶을 때 [CSS generator](https://html-css-js.com/css/generator/box-shadow/) 사이트들을 이용하시면 좋습니다!
