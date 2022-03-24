---
title: 블로그 만들면서 배우는 웹개발] display에서 block과 inline
tags:
  - blog-lecture
---

저번 시간에 style을 다루면서 가로, 세로, 배경색을 바꿔보았는데요~! width가 auto일 때는 부모 태그의 가로 크기가 되고 그 이유가 display가 block이기 때문이라고 했었습니다. 오늘은 display가 무엇인지 알아볼게요

## display

말그대로 디스플레이, 어떻게 보여줄지에 대한 속성입니다. inline, block, flex, grid, table, content 등 정말 다양하게 많은데요. 그 중 오늘은 inline, block, inline-block, none에 대해서 다뤄보고 다음 시간에는 레이아웃을 그릴 때 사용하는 flex, grid에 대해서 다뤄보겠습니.

- [block](#block)
- [inline](#inline)
- [inline-block](#inline-block)
- [none](#none)

### 태그마다 다른 display

태그마다 display 속성 값이 다릅니다. 이전 시간에 다루었던 레이아웃 태그들은 모두 display가 block인데요. 크롬 개발자도구에 들어가서 확인해보실 수 있습니다.

<post-img src="/images/22/03/24/092206.png"></post-img>

그럼 우선 block에 대해 알아볼까요?

### block

블록 장난감을 보통 쌓으면서 놀잖아요? 이와 비슷하게 display 속성이 block인 요소들은 위에서부터 아래로 쌓이게 됩니다. 말로만 들으면 헷갈리니 간단하게 구현을 해볼까요?

header와 nav 내용들을 모두 지우고, article 태그들의 style을 각각 다르게 해보겠습니다.

1. 가로 100px, 세로 100px, 빨간색 배경
2. 가로 100px, 세로 x, 초록색 배경
3. 가로 x, 세로 100px, 파란색 배경
4. 가로 x, 세로 x, 검은색 배경

```html
<header>
  <nav></nav>
</header>
<main>
  <section>
    <article style="width:100px;height:100px;background-color:red;"></article>
    <article style="width:100px;background-color:green;"></article>
    <article style="height:100px;background-color:blue;"></article>
    <article style="background-color:black;"></article>
  </section>
</main>
<aside></aside>
<footer></footer>
```

<post-img src="/images/22/03/24/133218.png"></post-img>

결과를 보시면

1. 가로가 100px이고, 세로가 100px인 빨간 박스가 보입니다.
2. 가로가 100px이지만 세로가 0px이라 초록색 박스는 보이지 않습니다.
3. 가로는 부모태그(section)의 크기, 세로는 100px인 파란 박스가 보입니다.
4. 가로는 부모태그(section)의 크기, 세로는 0px이라 아무것도 보이지 않습니다.

이렇게 block은 정한 크기에 맞게 요소가 아래로 쌓입니다. 다만 크기가 0인 요소들은 없는 것처럼 보일 뿐이죠.

### inline

`inline`은 width와 height에 영향을 받지 않습니다. 내용물의 크기만큼만 width와 height 값을 가집니다. 위에서 사용했던 article 태그들을 모두 inline 속성으로 바꿔볼까요?

```html
<header>
  <nav></nav>
</header>
<main>
  <section>
    <article
      style="display:inline;width:100px;height:100px;background-color:red;"
    ></article>
    <article
      style="display:inline;width:100px;background-color:green;"
    ></article>
    <article
      style="display:inline;height:100px;background-color:blue;"
    ></article>
    <article style="display:inline;background-color:black;"></article>
  </section>
</main>
<aside></aside>
<footer></footer>
```

아무것도 보이지 않을겁니다. 왜냐하면 inline 속성을 가진 태그는 내용물 크기에 맞춰지는데, 내용물이 하나도 없기 때문이죠. 그러니 내용물을 넣어줍시다.

```html
...
<article style="display:inline;width:100px;height:100px;background-color:red;">
  빨간색
</article>
<article style="display:inline;width:100px;background-color:green;">
  초록색
</article>
<article style="display:inline;height:100px;background-color:blue;">
  파란색
</article>
<article style="display:inline;background-color:purple;">보라색</article>
...
```

<post-img src="/images/22/03/24/221038.png"></post-img>

진짜 딱 글자 크기만큼만 공간을 차지하네요. 아무리 width와 height값을 줘도 이는 바뀌지 않습니다. 그리고 또다른 특징이 하나 보이는데요. 바로 block과 달리 왼쪽에서 오른쪽으로 채워진다는 점입니다.

> Q) 왜 두 박스 사이에 공간이 생기나요?<br>
> 사실 두 태그 사이에는 줄바꿈(엔터) 값이 있기 때문입니다. HTML에서는 이런 줄바꿈을 하나의 띄어쓰기 공백으로 인식합니다.<태그1>빨간색</태그1><태그2>파란색</태그2> 이렇게 붙였다면 박스들도 분명 붙어있을 겁니다. section 태그의 입장에서는 두 태그 사이에 공백(" ")값이 하나 들어간 것이죠! <br> `<section>(태그) (태그) (태그) (태그)</section>`

만약 초록색 박스만 block이면 어떻게 될까요?

```html
<article style="display:inline;width:100px;height:100px;background-color:red;">
  빨간색
</article>
<article style="display:block;width:100px;background-color:green;">
  초록색
</article>
<article style="display:inline;height:100px;background-color:blue;">
  파란색
</article>
<article style="display:inline;background-color:purple;">보라색</article>
```

<post-img src="/images/22/03/24/221110.png"></post-img>

초록색 박스가 앞 뒤로 줄바꿈이 발생했습니다. block은 이렇게 앞 뒤로 줄바꿈을 만들어서 한 줄에 혼자 있는 특징을 가지고 있습니다.

### inline-block

block과 inline은 각각 아쉬운 점이 하나씩 있습니다.

- block 속성일 때 width: auto는 컨텐츠가 아닌, 부모 태그의 가로 크기가 된다.
- inline 속성일 때 width, height는 무시하고 컨텐츠의 크기만큼만 차지한다.

`inline-block` 속성은 block과 inline 속성의 특징을 모두 가지고 있어서 이 두 가지 단점을 해결할 수 있습니다.

- width: auto는 컨텐츠 크기만큼을 가집니다.
- width와 height의 크기를 정할 수 있습니다.

속성을 모두 inline-block으로 바꿔보겠습니다.

```html
<article
  style="display:inline-block;width:100px;height:100px;background-color:red;"
>
  빨간색
</article>
<article style="display:inline-block;width:100px;background-color:green;">
  초록색
</article>
<article style="display:inline-block;height:100px;background-color:blue;">
  파란색
</article>
<article style="display:inline-block;background-color:black;">검은색</article>
```

<post-img src="/images/22/03/24/221555.png"></post-img>

1. 가로 100px, 세로 100px, 빨간색 박스
2. 가로 100px, 세로 글자크기만큼, 초록색 박스
3. 가로 글자크기만큼, 세로 100px, 파란색 박스
4. 가로 글자크기만큼, 세로 글자크기만큼, 보라색 박스

auto인 경우는 글자의 크기만큼 차지하고, 크기를 정한 경우 그 크기에 맞게 공간을 차지했습니다. 여기서도 이전에 inline에서 처럼 요소들 사이에 공백이 발생했습니다. 이를 제거하려면 inline처럼 두 태그 사이의 공백을 없애거나 float을 사용하는 방법이 있습니다. 하지만 float은 옛날 브라우저(망할 Internet Explorer)를 지원해야하는 상황이 아니라면 잘 사용하지 않습니다.

요즈음에는 flex, grid를 많이 사용하는데요. 원하는데로 배치하기에 좋은 속성입니다. 하지만 이를 모두 다루기엔 이번 글이 엄청 길어질 수 있어서 다음 강의에서 차근차근 다뤄볼 겁니다.

### none

none은 `없음`이란 의미를 가지고 있습니다. 즉 **보여주지 않겠다**는 의미로 브라우저가 그릴 때 없는 것으로 간주하고 그리지 않습니다.

```html
<article style="display:none;width:100px;height:100px;background-color:red;">
  빨간색
</article>
<article style="display:none;width:100px;background-color:green;">
  초록색
</article>
<article style="display:none;height:100px;background-color:blue;">
  파란색
</article>
<article style="display:none;background-color:black;">검은색</article>
```

<post-img src="/images/22/03/24/214315.png"></post-img>

이해가 잘 되셨나요? 다음 시간에는 레이아웃 배치에 자주 사용되는 flex를 먼저 알아보도록 하겠습니다.
