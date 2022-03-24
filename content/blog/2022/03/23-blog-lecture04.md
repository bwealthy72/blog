---
title: 블로그 만들면서 배우는 웹개발] style 다루기
tags:
  - blog-lecture
---

헬로우! 오늘은 만들었던 태그에 스타일을 입혀볼건데요! 앞으로 배울 CSS를 미리 핥아보신다고 생각하시면 됩니다!

<!--more-->

## style 속성

요소에 우리가 원하는 색상, 크기, 위치 등을 `style` 속성을 통해 수정할 수 있습니다. 예를 들면

```html
<태그 style="width: 500px; height:400px; background-color:blue;"></태그>
```

`(스타일 속성): (값);` 형태로 넣어주면 되는데요. `세미콜론(;)`은 마침표 역할로, 다른 스타일 속성과 구분을 지어줍니다. 위 예시를 해석해보자면 **태그의 가로(width) 크기는 500px, 세로 크기는 400px, 배경 색상은 파란색으로 하겠다**라는 뜻입니다. 이전 시간에 만들었던 header 태그에 한 번 넣어볼까요?

```html
<header style="width:500px; height:400px; background-color:blue;">
  <nav></nav>
</header>
<main>
  <section>
    <article></article>
    <article></article>
    <article></article>
    <article></article>
  </section>
</main>
<aside></aside>
<footer></footer>
```

<post-img src="/images/22/03/23/210324.png"></post-img>

홀리몰리! 파란색 커다란 네모가 나타났습니다! 저 부분은 header라는걸 딱 알 수 있겠네요!

> 당장 모든 속성을 외우려할 필요없습니다. 계속 진행하면서 자주 사용하다보면 저절로 외워질겁니다.

### 크기의 또다른 단위 퍼센트(%)

header 안에 있는 `nav`도 크기를 정해보겠습니다. 가로크기 500px, 세로크기 30px, 배경색상은 보라색으로 해볼게요.

```html
<header style="width:500px; height:400px; background-color:blue;">
  <nav style="width:500px; height:30px; background-color:purple;"></nav>
</header>
...
```

<post-img src="/images/22/03/23/212622.png"></post-img>

보라색 띠가 나타났습니다! 그런데 생각해보니 header의 가로 크기를 700px로 늘리고 싶어졌습니다! (변덕쟁이)

```html
<header style="width:700px; height:400px; background-color:blue;"></header>
...
```

<post-img src="/images/22/03/23/212757.png"></post-img>

아! 실수로 nav의 크기는 바꾸지 않았네요. 이거 header 바꿀 때마다 nav도 바꿔야하는 불편함이 스윽 느껴지네요. nav의 가로 크기를 100%로 지정하면 이 문제를 해결할 수 있습니다. 말 그대로 자신을 감싸고 있는 부모 태그(header)의 가로 크기에서 몇 퍼센트만큼 가로크기를 가질지를 결정합니다.

```html
<header style="width:700px; height:400px; background-color:blue;">
  <nav style="width:100%; height:30px; background-color:purple;"></nav>
</header>
```

- 100%
  <post-img src="/images/22/03/23/220909.png"></post-img>

- 50%
  <post-img src="/images/22/03/23/221013.png"></post-img>

### 크기를 자동으로 지정하는 auto

갑자기 이런 궁금증이 생길 수도 있습니다. **"width를 따로 안적으면 어떻게 되지?"** 안 궁금하다구요? 아...

(외면) width와 height는 기본적으로 auto라는 값을 가지고 있습니다. 즉, 아무것도 안 적으면 auto가 됩니다. width와 height는 auto 값을 가질 때 다르게 동작합니다.

- width는 부모 요소의 가로 크기를 가집니다.
- height는 내용물에 맞춰서 높이를 가집니다.

내용물이라는 건 요소의 content 위치에 들어가는 값입니다.

<post-img src="/images/22/03/23/223827.png"></post-img>

nav의 height 값을 auto로 하고 글자를 아주 길게 써봅시다.

```html
<header style="width:700px; height:400px; background-color:blue;">
  <nav style="width:100%; height:auto; background-color:purple;">
    잘 보시면 글자 크기에 맞게 세로 크기를 가지는 것을 알 수 있습니다.
    여러분들이 보기에는 비슷한 세로라서 구분하기 어려우실 것 같으니 조금 더 길게
    썼습니다. 확실히 좀 더 길어진게 보이실까요? height는 기본값이 auto이며 내부
    content가 가진 크기에 맞게 새로 크기를 가지게 됩니다.
  </nav>
</header>
```

<post-img src="/images/22/03/23/224953.png"></post-img>

height를 안적어도 마찬가지입니다.

<post-img src="/images/22/03/23/225139.png"></post-img>

width는 내용물이 없다면 0px이여야 할 것 같지만 100%가 되어있습니다. 이는 **display 속성이 block**으로 되어 있기 때문인데요. display에 대해 조금 더 알아보는 시간을 가져보도록 하겠습니다.
