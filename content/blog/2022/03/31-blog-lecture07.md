---
title: 블로그 만들면서 배우는 웹개발 7] css flex 알아보기
tags:
  - blog-lecture
---

이전에는 float을 이용해서 많이 레이아웃을 구성했지만 요즘에는 flex와 grid라는 좋은 기술들이 등장했습니다. 그 중 flex에 대해서 오늘 알아보겠습니다!

<!--more-->

이번 글은 작성하는데 시간이 많이 걸렸어요. (1일 1포스팅의 목표가..ㅠ) 그래도 꿋꿋이 적었고 이해를 쉽게 하기 위해 간단하게 아래처럼 flex 테스트를 만들어봤습니다! 이해하는데 그나마 도움이 되실겁니다! 지금 당장은 이게 뭐지 싶어도 나중에 다시 돌아와서 만지다보면 이해가 될테니 너무 겁먹지는 마세요~ PC로 해보시는 걸 추천해요.

<css-flex></css-flex>

## Flex

그렇다면 Flex가 뭔데? 내가 아는건 지름신이 강림했다는 그 플렉스 밖에 모르는데?

<post-img src="/images/22/03/24/224244.png"></post-img>

물론 그런 뜻도 있지만 웹에서 flex는 **Flexible Box(유연한 박스)** 라는 의미를 가지고 있는데요. 레이아웃 배치를 위해서 만들어진 기능인 만큼 훨씬 편리하고 유용한 기능들이 많아요!

### 컨테이너와 아이템

block이나 inline과는 다르게 자식들도 영향을 받게되는데요. 그래서 이를 구분해서 부르기 위해 flex를 적용한 요소는 **컨테이너(container)** , 자식 요소들을 **아이템(item)** 이라고 라고 부릅니다.

<post-img src="/images/22/03/25/191252.png"></post-img>

Flex container와 Flex item 요소에 각각 어떤 속성들을 넣느냐에 따라 다양하게 배치하고 크기를 변경할 수 있습니다. 오늘 이 flex를 마스터하신다면 왠만한 배치는 만들어낼 수 있으니 집중해서 잘 살펴봅시다! 중간 중간 예시도 있고 실제로 해볼 수도 있게 코드를 넣어놨으니 걱정하지 마시라!

## Flex Container 속성들

- `flex-direction`: 배치 방향
- `justiyfy-content`: 메인 축 정렬
- `asign-items`: 수직 축 정렬
- `flex-wrap`: 넘쳤을 때에 대한 처리
- `gap`: item들간의 간격
- `align-content`: 여러 줄에 대한 정렬

이 속성들에 대해 하나하나 알아보겠습니다.

### 배치 방향을 정하는 flex-direction

배치 방향을 결정합니다. 요소가 들어올 때 어느 순서로 채워지는 지 결정합니다.

- `row` (기본값): 좌측에서 우측으로
- `row-reverse`: 우측에서 좌측으로
- `column`: 위에서 아래로
- `column-reverse`: 아래에서 위로

<post-img src="/images/22/04/04/224709.png"></post-img>

배치 방향을 정하고 나면 메인축과 수직축에 맞춰 정렬을 하게됩니다

- **flex-direction에 방향** 에 맞춰서 `justify-content`로 정렬합니다. 이 방향의 축을 **메인 축** 이라 합니다.
- **flex-direction의 수직** 에 맞춰서 `align-items`로 정렬합니다. 이 방향의 축을 **수직 축** 이라 합니다.

<post-img src="/images/22/04/04/231436.png"></post-img>

<p class="codepen" data-height="350" data-default-tab="html,result" data-slug-hash="YzYYQRL" data-editable="true" data-user="bwealthy72" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/YzYYQRL">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

자 이제 메인 축과 수직 축에 맞춰 정렬을 해볼까요?

### 메인 축을 정렬하는 justify-content

메인 축을 기준으로 정렬합니다. `flex-direction:row` 가 기본 값입니다.

<post-img src="/images/22/04/04/212954.png"></post-img>

- `flex-start` (기본값): 시작쪽으로 정렬
- `flex-end`: 끝쪽으로 정렬
- `center`: 중앙 정렬
- `space-between`: flex item 사이(between)에 최대한 간격을 둡니다.
- `space-around`: flex item 주변(around)에 균일한 간격을 둡니다.
- `space-evenly`: flex item 사이를 모두 동일한 간격으로 둡니다.

`justify-content` 값을 바꿔보면서 확인해보세요!

<p class="codepen" data-height="350" data-default-tab="html,result" data-slug-hash="VwyybOP" data-editable="true" data-user="bwealthy72" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/VwyybOP">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 수직 정렬을 정하는 align-items

수직축, 즉 여기서는 세로부분에서 어떻게 정렬할 지를 결정합니다.

<post-img src="/images/22/04/04/212857.png"></post-img>

- `stretch` (기본값): 수직축으로 container 크기만큼 쭈욱 늘어납니다(stretch)
- `flex-start`: 시작 위치에 맞춰 정렬합니다.
- `flex-end`: 끝 위치에 맞춰 정렬합니다.
- `center`: 가운데로 정렬합니다.
- `baseline`: 텍스트 라인을 기준으로 정렬합니다.

`align-items` 값을 바꿔보면서 확인해보세요!

<p class="codepen" data-height="361" data-default-tab="html,result" data-slug-hash="QWaOvWQ" data-editable="true" data-user="bwealthy72" style="height: 361px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/QWaOvWQ">
  align-items</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### item들이 container 보다 클 때 flex-wrap

flex item을 담다보면 container보다 커져서 한 줄에 담을 여유공간이 없을 때가 있습니다. 이 아이템들을 줄바꿈을 어떻게 할지 결정하는 속성합니다.

<post-img src="/images/22/04/05/030616.png"></post-img>

- `nowrap` (기본값): 줄바꿈을 하지않고 넘치게 둡니다.
- `wrap`: 넘치면 줄바꿈을 합니다.
- `wrap-reverse`: 줄바꿈을 역순으로 합니다. flex-direction에 달렸죠.

<p class="codepen" data-height="350" data-default-tab="html,result" data-slug-hash="eYyyKyb" data-editable="true" data-user="bwealthy72" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/eYyyKyb">
  flex-wrap</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

어때요? 어느정도 원하는데로 슈슉슈슉(?) 배치할 수 있겠나요?... 아뇨! (네 저도 안될거 같아요) item이 모두 동일한 크기가 아닐 수도 있고 어떤 item은 따로 두고 싶을 수도 있잖아요. 그래서 item 마다도 정할 수 있는 속성들이 있습니다.

### item들간의 간격을 만들기 gap

예전에는 grid 에서만 사용했었지만, 이제 대부분의 메이저 브라우저에서 사용가능합니다. 생각보다 편해요!

요소들 틈(gap) 사이의 공간의 크기를 정하는 값으로 가로는 `column-gap`, 세로는 `row-gap`으로 정할 수 있습니다. 만약 이를 한 속성으로 정하려면 `gap`을 사용하면 됩니다. 하나의 값만 적으면, column-gap과 row-gap이 둘 다 같은 값으로 적용되고, 따로 적으면 column-gap, row-gap 순으로 적용됩니다.

```css
.container {
  gap: 10px;
  /* 아래와 동일
    column-gap: 10px;
    row-gap: 10px;
  */
}
```

```css
.container {
  gap: 20px 30px;
  /* 아래와 동일
    row-gap: 20px;
    column-gap: 30px;
  */
}
```

<post-img src="/images/22/04/07/215431.png"></post-img>

<p class="codepen" data-height="367" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="KKZoeaW" data-editable="true" data-user="bwealthy72" style="height: 367px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/KKZoeaW">
  flex gap</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 줄바꿈 된 item들을 정렬하는 align-content

align-items와 justify-content를 짬뽕한 것 같은 이 속성은 `flex-wrap:wrap;`으로 인해 **여러 줄이 되었을 때, 정렬을 어떻게 할지 결정** 합니다. `align-items`는 각 한 줄에 대한 정렬을 한다는 점에서 차이가 있습니다.

<post-img src="/images/22/04/07/215716.png"></post-img>

<post-img src="/images/22/04/07/215807.png"></post-img>

- `stretch`(기본값): 수직축으로 container 크기만큼 쭈욱 늘어납니다(stretch)
- `flex-start`: 시작쪽으로 정렬
- `flex-end`: 끝쪽으로 정렬
- `center`: 중앙 정렬
- `space-between`: flex item 사이(between)에 최대한 간격을 둡니다.
- `space-around`: flex item 주변(around)에 균일한 간격을 둡니다.
- `space-evenly`: flex item 사이를 모두 동일한 간격으로 둡니다.

<p class="codepen" data-height="391" data-default-tab="html,result" data-slug-hash="bGaajNj" data-editable="true" data-user="bwealthy72" style="height: 391px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/bGaajNj">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Flex Item

flex-container가 block 같은 특징을 가졌다면, item은 flex-direction에 따라 달라집니다.

- **row** 인 경우
  - width는 내용물 크기만큼
  - height는 align-items에 따라 달라짐
- **column** 인 경우
  - width는 align-items에 따라 달라짐
  - height는 내용물 크기만큼

하지만 이건 어디까지나 width, height가 auto일 때입니다. 따로 크기를 정해준다면 align-items, flex-direction에 상관없이 고정된 크기를 가지고 있습니다.

그런데 만약에 **container의 크기에 따라 유연하게 바뀌길 원하는 경우**가 있습니다. 블로그의 사이드바와 메인영역을 예로 들어볼까요? 브라우저 크기를 줄이면 그에 맞춰서 사이드바 크기는 그대로 유지하고 메인 크기는 작아져야합니다.

<post-img src="/images/22/04/05/041849.png"></post-img>

### item의 기본 크기 flex-basis

**flex item의 기본 크기** 를 설정합니다. 여기서 크기는 `flex-direction`에 맞춰진 크기입니다. row라면 가로, column이라면 세로 크기 인거죠!

그런데 flex-direction이 row일 때, width, flex-basis 값이 같이 있다면...어떻게 되는 걸까요? flex-basis의 값이 우선적으로 됩니다. width 값을 사용하고 싶다면 flex-basis를 auto로 하면 됩니다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWrrqOm" data-editable="true" data-user="bwealthy72" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/MWrrqOm">
  Untitled</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

아니 width, height가 있는데 왜 굳이 flex-basis 가 있는 걸까요? 왜냐하면 `flex-grow`, `flex-shrink` 에 필요하기 때문입니다.

### 증가 비율을 결정하는 flex-grow

`flex-grow`는 flex-basis의 값보다 얼마나 더 커지는지를 결정하는 속성입니다. 정확히는 item들을 넣었을 때 남는 공간들이 있다면 item들이 어떤 비율로 그 공간을 쓸지를 결정합니다.

예를 들어 flex-basis값이 auto이라면 각 요소는 내용물의 크기에 맞게 가로크기를 가질겁니다. 그러면 container에 공간이 남는데 이곳을 채우고 싶다면 `flex-grow`를 사용하면 됩니다. **기본값은 0** 이지만, 만약 1 값을 가지면 남은 공간의 비율을 1 비율로 가집니다. 만약 세 요소가 모두 1이라면 1:1:1 비율로 가지는 거죠!

<post-img src="/images/22/04/07/085506.png"></post-img>

만약에 flex item들 크기를 동일하게 1:1:1 비율로 만들고 싶다면 어떻게 해야할까요? flex-basis 값을 0으로 하면됩니다. 왜냐하면 **container에서 남는 공간이라는 말은 flex-basis를 제외한 여백**이기 때문이죠.

<post-img src="/images/22/04/07/090746.png"></post-img>

즉, 이 부분을 0으로 만든다면 container 전체를 1:1:1 비율로 나누게 됩니다.

<post-img src="/images/22/04/07/092655.png"></post-img>

직접 해봐야 이해가 되겠죠?? width 값을 바꿔보세요!

<p class="codepen" data-height="411" data-default-tab="html,result" data-slug-hash="wvpmgWP" data-editable="true" data-user="bwealthy72" style="height: 411px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/wvpmgWP">
  flex-grow</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 감소 비율을 결정하는 flex-shrink

`flex-grow`와는 반대로 `flex-shrink`는 `flex-basis`보다 작아졌을 때 감소비율을 정합니다. 줄어들 때에는 flex-basis 값도 같이 계산되어 줄어들 비율이 정해집니다.

예를 들어, 다음과 같이 두 가지 요소가 있다고 해보겠습니다.

- 빨강: flex-basis 100px, flex-shrink 1
- 초록: flex-basis 200px, flex-shrink 1

감소 비율 계산은 `(flex-basis) X (flex-shrink)`으로 구합니다.

- 빨강: (100px) X 1 = 100px
- 초록: (200px) X 2 = 200px

비율은 100px : 200px = 1 : 2가 됩니다. 이제 container가 item들의 flex-basis보다 작아지면 1:2 비율로 줄어듭니다. 예를 들어 100px이 줄어든다고 하면, 1:2 비율인 33px:66px 만큼줄어듭니다.

<post-img src="/images/22/04/07/165255.png"></post-img>

container의 가로(width)를 200px로 줄여보세요!

<p class="codepen" data-height="386" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="jOYzGGm" data-editable="true" data-user="bwealthy72" style="height: 386px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/jOYzGGm">
  flex-shrink</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

shrink 값을 조금 바꿔도 마찬가지입니다. 한번 해보세요~

<post-img src="/images/22/04/07/170200.png"></post-img>

### flex-grow, flex-shrink, flex-basis 합체 flex

`flex` 값 하나면 위 3개의 값을 다 표현할 수 있습니다. 즉 축양형 속성인거죠.

```css
.item {
  flex: 2;
  /* flex-grow: 2; flex-shrink: 1; flex-basis: 0%; */
  flex: 2 3;
  /* flex-grow: 2; flex-shrink: 3; flex-basis: 0%; */
  flex: 1 1 auto;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: auto; */
  flex: 1 100px;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: 100px; */
}
```

그래서 만약 item들에 flex:1 값을 주면 모두 동일한 크기를 가지게 됩니다.

<post-img src="/images/22/04/08/163304.png"></post-img>

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="KKZRzEX" data-editable="true" data-user="bwealthy72" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/KKZRzEX">
  css flex</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 특정 item의 교차축을 정렬하는 align-self

`align-items`이나 `align-content`로 모든 item들을 교차축에서 정렬했습니다. `align-self`는 해당 요소만 따로 교차축에서 정렬을 바꿀 수 있습니다.

<post-img src="/images/22/04/08/160702.png"></post-img>

- `auto` (기본값): `align-items` 값에 따릅니다.
- `stretch`: 쭈욱 길게 container 크기만큼 늘어납니다.
- `flex-start`: 시작 위치에 맞춰 정렬
- `flex-end`: 끝 위치에 맞춰 정렬
- `center`: 중앙에 맞춰 정렬
- `baseline`: 텍스트 크기에 맞춰 정렬

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="JjMLOMY" data-editable="true" data-user="bwealthy72" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/JjMLOMY">
  align-self</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 순서를 뒤바꾸는 order

자주 사용하지는 않습니다만 가끔 아주 가끔 상황에 따라 순서를 바꾸고 싶은 경우가 있습니다. **기본값은 0** 입니다. 낮을수록 우선적으로 배치됩니다.

<post-img src="/images/22/04/08/170727.png"></post-img>

<p class="codepen" data-height="337" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="YzYLWWy" data-editable="true" data-user="bwealthy72" style="height: 337px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/bwealthy72/pen/YzYLWWy">
  css flex order</a> by Blog Wealthy (<a href="https://codepen.io/bwealthy72">@bwealthy72</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 무리하게 외우지 마세요

필요할 거 같아서 이렇게 하나하나 정리했지만 앞으로 레이아웃을 배치하면서 다시 다룰테니 저절로 외워질겁니다!
