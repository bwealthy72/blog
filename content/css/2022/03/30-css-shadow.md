---
title: (CSS) shadow 그림자 넣는 방법 총정리
coverImg: /images/22/03/31/013622.png
tags:
  - shadow
---

웹에서 입체적인 효과를 위해 사용되는 그림자(shadow)를 사용하는데요. 그림자를 어떻게 주냐에 따라 다른 입체적인 효과를 낼 수 있고 좀 더 세련된 느낌을 줄 수 있습니다.

<!--more-->

이 글에서 쓰일 shadow 속성들을 빠르게 이해하기 위해 제가 간단하게(라고하기엔 4시간이 걸렸지만..) 구현을 해봤어요! 이 글을 읽고난 뒤 다시 돌아와서 건드려본다면 훨씬 더 잘 이해가 되실 겁니다.

<css-shadow></css-shadow>

<p class="codepen" data-height="359" data-default-tab="css,result" data-slug-hash="xxpXjba" data-editable="true" data-user="bwealthy72" style="height: 359px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/xxpXjba">
  Shadow</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

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

`offset-x`, `offset-y`는 요소에서 그림자가 **상대적으로 얼마나 떨어져있는지 대한 값**입니다.

- x가 양수이면 오른쪽으로, 음수이면 왼쪽으로
- y가 양수이면 아래로, 음수이면 위로

<post-img src="/images/22/04/01/150338.png"></post-img>

`spread-radius`는 box-shadow에만 있습니다. 단순히 **그림자 크기를 조정**할 때 사용합니다. 만약 음수로 할 경우 그림자의 border-radius가 일부 없어질 수 있습니다.

<post-img src="/images/22/04/01/151904.png"></post-img>

그리고 inset 또한 box-shadow만 있는데요! 그림자를 요소와 바꾼 것처럼 동작합니다. 그러다보니 달라지는 특징이 있는데요.

- offset 값을 조정하면 안의 요소가 그에 맞춰 움직입니다.
- spread-radius 값이 커지면 안의 요소가 좁아집니다.

<post-img src="/images/22/04/08/171245.png"></post-img>

### 비교

만약 div 요소가 하나 있다고 해보겠습니다. 이 요소는 정사각형에 중간에 글자가 있습니다. 만약 각 shadow 방식을 적용했을 때 **그림자만 본다면** 이런 느낌으로 있을겁니다.

<post-img src="/images/22/03/30/180116.png"></post-img>

box-shadow와 filter 방식은 동일한 것처럼 보이지만 **filter는 투명한 부분을 제외하고 불투명한 부분에서만 그림자가 발생**합니다. 예를 들어, 요소의 색상을 투명하게 한다면???

<post-img src="/images/22/04/01/152408.png"></post-img>

글자와 그림의 그림자가 생겼습니다! 자 그럼 만약에 box-shadow와 같이쓰면 어떻게 될까요?

<post-img src="/images/22/04/01/155102.png"></post-img>

box-shadow 그림자의 filter 그림자가 나타납니다. box-shadow는 요소의 크기에 맞춰 그림자가 나타나지만 filter는 전체적인 스타일까지 포함해서 그림자가 나타납니다.

### 여러 그림자

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
