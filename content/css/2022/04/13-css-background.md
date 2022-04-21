---
title: CSS background에 대한 모든 것
coverImg: /images/22/04/13/190226.png
tags:
  - css
  - background
---

background를 단순히 배경색, 이미지 넣는 정도만 썼었죠? 근데 내부를 잘보면 섬세한 수정을 할 수 있게 다양한 속성들이 들어있습니다. 이 글을 읽는다면 background에 대해 쉽게 이해할 수 있게 될겁니다. 그리고 까먹은 다음 다시 이 블로그에 들르게 될 거에요. 잘 안쓰는 것도 많거든요.

<!--more-->

## background

`background`라는 속성은 아래 속성들을 다~~~~ 포함하고 있습니다.

- [background-color](#background-color): 배경색
- [background-image](#background-image): 배경 이미지
- [background-origin](#background-origin): 배경 어느 영역부터 채워나갈지 결정
- [background-clip](#background-clip): 배경을 어느 영역까지 자를 지 결정
- [background-repeat](#background-repeat): 배경 이미지의 반복 여부를 결정
- [background-attachment](#background-attachment): 배경 이미지의 스크롤 여부
- [background-size](#background-size): 배경 이미지의 크기를 결정
- [background-position](#background-position): 배경 위치를 결정
- [background-blend-mode](#background-blend-mode): 배경끼리 어떻게 섞일지(blend) 결정

즉 `background` 만으로 배경색, 배경 이미지, 크기, 위치 등을 다 변경할 수 있죠. 하지만 따로 하는 것이 더 잘 보이기도 하니 길지만 않다면 따로 적는 것을 추천합니다.

```css
/* color  */
background: green;

/* image, repeat */
background: url("test.jpg") repeat-y;

/* clip, origin, color */
background: border-box red;

/* repeat, position, image */
background: no-repeat center/80% url("../img/image.png");
```

이제 하나하나씩 살펴보겠습니다.

### background-color

해석하면 배경-색, 즉 **색상**입니다. 만약 background-image와 같이 사용한다면 background-image가 우선적으로 보일겁니다. CSS에서 색상을 다뤄보셨다면, 많은 방식으로 색상을 표현할 수 있다는 것을 알고계실겁니다. 모르신다면 한번 아래 예시들을 사용해보세요.

- 키워드 (red, blue, ...)
- 16진수 값 (#bbff00, #bf0, ...)
- rgb 값
  - rgb(255, 102, 23)
  - rgba(255, 102, 23, 0.5)
- hsl 값
  - hsl(50, 33%, 25%)
  - hsla(50, 33%, 25%, 0.75%)
- 특별 키워드
  - currentcolor
  - transparent (기본값)

<post-img src="/images/22/04/15/184708.png"></post-img>

한 번 값을 수정해보시면서 자신이 색맹인지 테스트해보세요.

<p class="codepen" data-height="438" data-default-tab="css,result" data-slug-hash="popOKqJ" data-editable="true" data-user="bwealthy72" style="height: 438px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/popOKqJ">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-image

해석하면 배경-그림, **배경에 그림을 넣습니다.** 그림이 되는 파일은 인터넷 어딘가에서 가져올 수도 있고, 자신의 프로젝트 안에서 가져올 수도 있을겁니다.

- none (기본값): 이미지를 사용하지 않습니다.
- url: `url()`을 같이 사용하여 이미지 파일을 가져옵니다.

`background-image`는 직관적일 뿐만 아니라 친절하기까지 해요. 당신이 이미지를 잘 못볼까봐 꽉꽉 채워주거든요. 또 주의할 점이 padding 영역에서부터 채워지는 걸 볼 수 있죠. 이는 나중에 다룰 `background-origin` 때문이에요. border에서 시작하게도 할 수 있어요~

<post-img src="/images/22/04/15/184842.png"></post-img>

<p class="codepen" data-height="416" data-default-tab="css,result" data-slug-hash="xxpaaXo" data-editable="true" data-user="bwealthy72" style="height: 416px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/xxpaaXo">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> Q) img 태그도 있는데 이건 왜 있는건가요? <br>
> A) img 태그와 유일한 차이점은 불러오기 실패했을 때, **img 태그는 broken 이미지와 alt는 텍스트를 보여준다**는 것이죠. 그래서 그 자리에 이미지가 있어야한다는 것을 알려주고 싶은 경우 (컨텐츠의 커버이미지, 프로필 사진 등) img를 사용하면 좋습니다. 반대로 불러오지 못했을 때 놔둬도 상관 없는 거라면 background-image를 사용하면 좋겠죠. <br><br>
> 좀 더 자세한 내용은 [stackoverflow의 답변](https://stackoverflow.com/questions/492809/when-to-use-img-vs-css-background-image) 을 참조해보세요.

### background-image (linear-gradient)

배경-그림 이면서 gradient 색상도 들어가요. `linear-gradient`라는 함수를 이용합니다.

- linear-gradient([ `방향` ] `(색상)`, `(색상)`, ...)

<post-img src="/images/22/04/18/233747.png"></post-img>

옆에 수치를 넣어서 gradient 비율을 조정할 수도 있고, 여러 개의 색상을 넣을 수도 있습니다.

<post-img src="/images/22/04/18/233800.png"></post-img>

linear-gradient는 응용 방법이 저어어어어어어엉말 많은데요 다 다루기는 어려워서 [여기](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Images/Using_CSS_gradients)를 보시면 좋을 것 같습니다!

<p class="codepen" data-height="435.3671875" data-default-tab="css,result" data-slug-hash="popqdRX" data-editable="true" data-user="bwealthy72" style="height: 435.3671875px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/popqdRX">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-origin

해석하면 배경-출발지, **배경을 어디서부터 둘지를 결정**합니다. 좌표로 정확히 결정하는 건 아닙니다. 어느 영역부터 시작하냐를 결정하죠.

- `border-box`: border 영역에서 그리기 시작
- `padding-box`(기본값): padding 영역에서 그리기 시작
- `content-box`: content-box 영역에서 그리기 시작

뒤에서 다루겠지만 `background-repeat`에 영향을 줍니다. 시작 위치가 달라지니까요 반복을 어떤식으로해서 채우는지가 달라지죠.

<post-img src="/images/22/04/15/205504.png"></post-img>

<p class="codepen" data-height="431" data-default-tab="css,result" data-slug-hash="VwyGEab" data-editable="true" data-user="bwealthy72" style="height: 431px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/VwyGEab">
  background-repeat</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-clip

해석하면 배경-자르다, 어디까지 배경을 자를지...즉! **배경이 존재할 수 있는 영역을 결정**합니다. 그게 뭔 개소리야~라고 할 수도 있지만 한 번 보시면 딱 아실거에요.

- `border-box` (기본값): border 영역 안
- `padding-box`: padding 영역 안
- `content-box`: content-box 영역 안

역시 그림으로 보면 한 번에 아실 거에요. border와 clip을 같이 비교해서 보면 더 잘 이해되실 거에요.

<post-img src="/images/22/04/15/212915.png"></post-img>

<p class="codepen" data-height="419" data-default-tab="css,result" data-slug-hash="eYyPqOe" data-editable="true" data-user="bwealthy72" style="height: 419px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/eYyPqOe">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-repeat

해석하면 배경-반복, **이미지가 요소보다 작으면 어떻게 채울지 결정** 합니다.

- `repeat`(기본값): 이미지 사이 공간 없이, 여백이 있는 만큼 이미지 원래크기로 채움
- `space`: 요소 양쪽 끝에 이미지를 두고(두 개가 들어가지 않으면 하나만 넣음) 사이에 이미지를 채웁니다. 사이에 못들어간다 싶으면 이미지를 넣지 않아요.
- `round`: 이미지 크기를 조절해서 어떻게든 영역을 채웁니다. 이미지 사이 공간 없이 채우다가 (이미지 반 크기 < 남은 여백) 라면 개수를 하나 더 늘립니다.
  - 개수를 늘린 경우: 이미지가 넘어간 만큼 이미지들 크기가 줄어듭니다.
  - 개수를 늘리지 않은 경우: 여백이 남은 만큼 이미지들 크기가 늘어납니다.
- `no-repeat`: 반복하지않고 이미지 하나만 출력합니다.

<post-img src="/images/22/04/16/234901.png"></post-img>

<post-img src="/images/22/04/16/235034.png"></post-img>

<post-img src="/images/22/04/16/234938.png"></post-img>

만약에 x축 y축을 따로 하고 싶으시다면 `repeat: 가로 | 세로` 이렇게 따로 적어주세요.

```css
/* 2개 값 구문: 가로 | 세로 */
background-repeat: repeat space;
background-repeat: repeat repeat;
background-repeat: round space;
background-repeat: no-repeat round;
```

repeat은 x축과 y축 하나만 할 수도 있어요. 그런데 이렇게 할거면 위에 처럼 쓰는게...

```css
background-repeat: repeat-x;
background-repeat: repeat-y;
```

<p class="codepen" data-height="492.03125" data-default-tab="css,result" data-slug-hash="mdpQXGB" data-editable="true" data-user="bwealthy72" style="height: 492.03125px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/mdpQXGB">
  background-repeat</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-attachment

대략 해석하면 배경-붙임, **어디에 딱 붙여서 고정할 지 결정**합니다. 그래서 배경이 어떻게 스크롤 되는지 달라집니다.

- `fixed`: 배경을 뷰포트(viewport)에 고정합니다.
- `scroll` (기본값): 배경을 요소(element)에 고정합니다.
- `local`: 배경을 컨텐츠(content)에 고정합니다.

<post-img src="/images/22/04/17/210126.png"></post-img>

<post-img src="/images/22/04/17/210222.png"></post-img>

그림으로 표현한다면 이런 느끼...임? 그래서 좀 더 이해되실 수 있게 아래에서 한번 스크롤을 해보실까요?

<css-background-attachment></css-background-attachment>

<p class="codepen" data-height="507.45703125" data-default-tab="css,result" data-slug-hash="dyJwzBx" data-editable="true" data-user="bwealthy72" style="height: 507.45703125px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/dyJwzBx">
  background-attachment</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-size

해석하면 배경-크기인데요. **요소 안에서 배경 이미지의 크기를 결정**합니다. 요소의 크기에 맞게 변하게 할 수도 있고 사용자가 직접 크기를 정할 수도 있습니다.

- `contain`: 비율을 유지한 채로 최대 크기, 대신 요소 안에 모두 들어가게 합니다.
- `cover`: 비율을 유지한 채로 최대 크기, 대신 요소에 꽉 차 보이도록 합니다.
- `auto` (기본값): 배경의 원래 크기를 유지!
- `(width)` [`(height)`]: 배경의 크기를 직접 정합니다. 하나만 적으면 width 값만 적용되고 height는 auto가 됩니다. auto는 원본 이미지의 원래 크기이죠!

<post-img src="/images/22/04/18/221947.png"></post-img>

이해를 쉽게 하기 위해서 no-repeat으로 코드를 작성했습니다!

<p class="codepen" data-height="395.890625" data-default-tab="css,result" data-slug-hash="QWaJmWP" data-editable="true" data-user="bwealthy72" style="height: 395.890625px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/QWaJmWP">
  background-attachment</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-position

해석하면 배경-위치, 말 그대로 **위치**를 나타내죠! `background-size`에서 보면 좌측 위에 위치했었습니다. 기본적으로 0% 0% 값을 가지기 때문이죠! 기본적으로 가로 세로 위치를 지정하는데 방법이 아주 다양합니다.

- `top`: 위
- `bottom`: 아래쪽
- `left`: 왼쪽
- `right`: 오른쪽
- `(가로)` `(세로)`: %나 px 등 값을 주어 위치를 정합니다. top, left 등을 사용하여 위치를 조정할 수도 있습니다. 만약 가로만 쓴다면 세로는 자동으로 center가 됩니다. (기본값 0% 0%) 또 bottom이나 right 부터 위치를 정하고 싶을 수도 있는데 그런 경우 bottom 10% right 30% 처럼 해주면 됩니다. 아무값도 안 적어주면 0%으로 취급합니다.

<post-img src="/images/22/04/18/225847.png"></post-img>

위에서 repeat을 한 것처럼 `background-position-x`, `background-position-y` 속성으로 따로 설정할 수도 있습니다.

<p class="codepen" data-height="448.3125" data-default-tab="css,result" data-slug-hash="wvpRrrr" data-editable="true" data-user="bwealthy72" style="height: 448.3125px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/wvpRrrr">
  background-position</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### background-blend-mode

위에서 언급하지 않았지만, 사실 배경은 여러 개를 넣을 수 있습니다. 하지만 헷갈리실까봐 따로 넣지는 않았었죠. 배경 이미지를 여러 개 쓴다면 `,(콤마)`를 통해 구분합니다.

```css
.multiple-bg {
  background-image: url(img1.png), url(img2.png);
  background-repeat: no-repeat, no-repeat;
  background-position: bottom right, left;
}
```

근데 이걸 왜 `background-blend-mode`에서 얘기하냐고요? 여러 이미지가 겹쳤을 때에 대한 처리이기 때문이죠. 해석하면 배경-혼합-모드(?). 하지만 자세히 설명하진 않겠습니다. 아래 그림을 보시면 이해가 가실겁니다. 개인적으로 luminosity와 multiply 정도만 쓸만한 것 같습니다. 더 자세한 설명이 필요하시다면 [MDN](https://developer.mozilla.org/ko/docs/Web/CSS/blend-mode)을 보시는 걸 추천합니다.

<post-img src="/images/22/04/20/203339.png"></post-img>

<p class="codepen" data-height="430.37890625" data-default-tab="html,result" data-slug-hash="wvpNRaO" data-user="bwealthy72" style="height: 430.37890625px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/wvpNRaO">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 마무리하며

Background가 속성이 다양하다는 것을 알고 처음엔 가볍게 시작했으나 3일 이상이 걸려버린 포스팅이였습니다. 읽기 고통스러우셨다면 죄송합니다. 저도 이렇게 될 줄 몰랐어요. 다음에는 좀 더 간단한 것들을 포스팅해보겠습니다!
