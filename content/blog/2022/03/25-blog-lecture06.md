---
title: 블로그 만들면서 배우는 웹개발 6] style 태그
tags:
  - blog-lecture
---

이 때까지 html 태그에 style 속성을 넣어서 사용했었습니다. 하지만 점점 길이가 길어지고 그걸 보는 저희도 눈이 침침해지는 것 같아요. 이를 좀 더 보기 편하게 사용하는 방법이 있습니다! 바로 style 태그를 사용하는 겁니다!

## style 태그

style 태그 사이에 CSS 문법을 사용하면 HTML 태그하나하나에 넣어줄 필요가 없습니다. `선택자`를 통해 원하는 태그들만 스타일을 넣어줄 수 있기 때문이죠! 일단 한번 다음과 같이 써볼까요?

```html
<style>
  article {
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>

<header>
  <nav></nav>
</header>
<main>
  <section>
    <article>빨간색</article>
    <article>초록색</article>
    <article>파란색</article>
    <article>보라색</article>
  </section>
</main>
<aside></aside>
<footer></footer>
```

<post-img src="/images/22/03/25/201832.png"></post-img>

article 태그가 모두 동일하게 width 100px, height 100px, 배경색 파란색이 만들어졌습니다!

```
선택자 {
  스타일 속성: 값;
}
```

선택자 부분에 원하는 태그를 적으면 해당 태그에 `{}` 사이에 정해두었던 스타일이 적용됩니다! 하지만 모두 동일한 파란색이네요. 제가 원하는 건 각각 다른 색상인데 말이죠. 만약 1번 째 태그는 빨간색으로 하고 2번째 태그는 파란색으로 하고싶다면 어떻게해야할까요?

<!--more-->

### 몇 번째 태그? nth-child

`nth-child`는 말그대로 몇 번째 태그이다 라고 선택하는 것입니다.

```html
<style>
  article {
    width: 100px;
    height: 100px;
  }
  article:nth-child(1) {
    background-color: red;
  }
  article:nth-child(2) {
    background-color: green;
  }
  article:nth-child(3) {
    background-color: blue;
  }
  article:nth-child(4) {
    background-color: purple;
  }
</style>
```

<post-img src="/images/22/03/25/202816.png"></post-img>

감이 잡히시나요? article인 것 중 n 번째에 대한 스타일을 정해줄 수 있습니다. 간단하죠? 하지만 보통 nth-child는 자주 사용되지 않습니다. 왜냐하면 article을 맨 위에 하나 추가되면 원래 첫 번째였던 게 두 번째가 되고, 두 번째는 세 번째가 되기 때문에 의도와 다른 결과가 나올 수 있습니다.

### 그룹을 짓는 class

특정 html들을 그룹을 지어 그 그룹들만 스타일을 입힐 수 있습니다. 예를 들어, 1번째 2번째 article은 여행 카테고리고, 3번째, 4번째는 기술 카테고리의 글을 나열하고싶다고 해볼게요. 그러면 다음처럼 그룹을 지을 수 있습니다.

```html
<style>
  article {
    width: 100px;
    height: 100px;
  }
  .travel {
    background-color: red;
  }
  .tech {
    background-color: blue;
  }
</style>

...
<section>
  <article class="travel">여행일기 1</article>
  <article class="travel">여행일기 2</article>
  <article class="tech">아이폰 이야기</article>
  <article class="tech">갤럭시폰 이야기</article>
</section>
...
```

class에 들어가는 값은 우리가 정하는 겁니다. 그리고 이 값은 style을 정할 때 선택자에 `점(.)`을 붙이고 넣으면 됩니다. 점을 안 붙이면 태그로 인식하니 조심하세요!

<post-img src="/images/22/03/25/210252.png"></post-img>

이제 코드가 좀 더 단순해졌죠? 사실 이 부분은 후에 다룰 CSS의 일부를 핥아본겁니다.(?) 자세히 다루면 끝도 없으니 앞으로 자주 사용할만한 몇 개만 다뤄보았습니다. 다음 시간에는 본격적으로 레이아웃 배치에 사용되는 flex에 대해 알아볼게요!
