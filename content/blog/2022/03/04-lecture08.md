---
title: VueJS 블로그 강의 8] 레이아웃 만들기
tags:
  - vue
  - lecture
  - nuxt lecture
coverImg: /images/22/02/23/020715.png
---

오늘은 페이지마다 동일한 요소들을 배치할 수 있게 도와주는 레이아웃을 만들어볼겁니다!

<!--more-->

## Nuxt에서 레이아웃이란?

사이트를 둘러보면 다른 곳으로 이동해도 그대로 유지되는 것들이 있습니다. 제 사이트를 예로 들면 로고, 검색란, Menu Bar, footer, 광고들이 있네요.

<post-img src="/images/22/03/04/160011.png"></post-img>

### 레이아웃이 없다면?

만일 레이아웃이 없다면 다음과 같이 구현해야 했을 겁니다.

```vue [pages/index.vue]
<template>
  <div class="container">
    <header>
      <Logo></Logo>
      <Search></Search>
      <Ads></Ads>
      <MenuBar></MenuBar>
    </header>

    <!---------------- 여기만 다름 --------------->
    <div class="contents">메인 페이지</div>
    <!----------------------------------------->
    <footer>
      <Ads></Ads>
      <BlogInfo></BlogInfo>
    </footer>
  </div>
</template>
```

```vue [pages/_postlist/index.vue]
<template>
  <div class="container">
    <header>
      <Logo></Logo>
      <Search></Search>
      <Ads></Ads>
      <MenuBar></MenuBar>
    </header>
    <!---------------- 여기만 다름 --------------->
    <div class="contents">포스트 리스트</div>
    <!----------------------------------------->
    <footer>
      <Ads></Ads>
      <BlogInfo></BlogInfo>
    </footer>
  </div>
</template>
```

### 레이아웃을 사용한다면

레이아웃을 사용한다면 필요한 부분만 구현만 하면 되죠!

```vue [pages/index.vue]
<template>
  <div class="contents">메인 페이지</div>
</template>
```

```vue [pages/_postlist/index.vue]
<template>
  <div class="contents">포스트 리스트</div>
</template>
```

어때요? 깔끔하죠!?

## Nuxt layout 만들기

Layout을 만드는 방법은 아주 쉽습니다. 우선 프로젝트 폴더에 `layouts` 이름의 폴더를 만들고 그 내부에 `default.vue` 파일을 만들어주세요.

<post-img src="/images/22/03/04/160412.png"></post-img>

```vue [layouts/default.vue]
<template>
  <div class="container">
    <h1>나만의 블로그</h1>
    <nuxt />
  </div>
</template>
```

`<nuxt />`는 Vue.js에서 router-view와 같다고 보시면 됩니다. 이동한 경로에 맞게 해당 페이지 컴포넌트 내용이 채워지는 거죠! 개발 서버를 열어서 어떤 HTML 코드가 구성되어있는지 볼까요?

### Layout이 적용된 main 페이지

이미지에서 보면 알겠지만 layout으로 만들었던 내용 내부에 main페이지에 **나만의 블로그**란 글자가 나타난 것을 볼 수 있습니다.

<post-img src="/images/22/03/04/164653.png"></post-img>

### Layout 적용된 postlist/post 페이지

포스트 리스트에서도 마찬가지입니다.

<post-img src="/images/22/03/04/164740.png"></post-img>

<post-img src="/images/22/03/04/164806.png"></post-img>

## Header / Footer 만들기

이제 모든 페이지에서 보여줄 `Header.vue`와 `Footer.vue` 컴포넌트를 components 폴더에 만들어보겠습니다. common 폴더는 후에 컴포넌트를 추가할 겁니다.

<post-img src="/images/22/03/06/220339.png"></post-img>

```vue [components/layout/Header.vue]
<template>
  <header>헤더입니다.</header>
</template>
```

```vue [components/layout/Footer.vue]
<template>
  <footer>푸터입니다.</footer>
</template>
```

### 자동 컴포넌트 불러오기

이제 레이아웃에 Header, Footer 컴포넌트를 적용해볼건데요! Nuxt가 Vue의 프레임워크이기 때문에 편한 기능이 하나 있습니다. 바로 **컴포넌트를 자동으로 불러와준다는 점**입니다. `nuxt.config.js`에 보면 이런 설정이 보이실 겁니다.

```js [nuxt.config.js]
export default {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
};
```

이 설정이 `true`값이면, vue 파일에서 `components`라는 키 값에 굳이 컴포넌트를 넣지 않아도 자동으로 불러와줍니다.

예를 들어 default 레이아웃에서 header.vue 컴포넌트를 가져오려면..

```vue [Vue의 경우]
<template>
  <CommonHeader></CommonHeader>
</template>

<script>
// 아래 작업이 필요!
import CommonHeader from "./common/header.vue";
export default {
  components: {
    CommonHeader,
  },
};
</script>
```

컴포넌트를 불러오고 사용하려면 `components` 값에 넣어줘야했습니다. 하지만 nuxt에서는 그럴 필요가 없죠! **(폴더명)-(뷰파일명)** 패턴으로 컴포넌트를 불러와줍니다.

- layout/header.vue -> `<LayoutHeader>`
- layout/footer.vue -> `<LayoutFooter>`

```vue [layouts/default.vue]
<template>
  <CommonHeader></CommonHeader>
  <nuxt />
  <CommonFooter></CommonFooter>
</template>
```

이제 매 페이지마다 헤더와 푸터의 내용이 채워질 겁니다!

<post-img src="/images/22/03/07/004338.png"></post-img>

### 다른 Layout을 만들고 싶을 때

저희는 이 때까지 기본 레이아웃만 사용했습니다. 그래서 어떤 레이아웃을 사용하겠다는 설정을 할 필요가 없었죠. 다른 레이아웃도 만들고 사용하려면 어떻게 해야할까요? 바로 만들었던 컴포넌트의 이름을 넣어주면 됩니다. 만약 `layouts/NewLayout.vue` 라는 파일을 만들었다면 `layout`이라는 키값에 다음과 같이 넣어주시면 됩니다.

```vue [pages/index.vue]
<script>
export default {
  layout: "NewLayout",
};
</script>
```

## 마무리하며

레이아웃 만드는 방법 간단하죠? 이제 다음 시간에는 레이아웃 구성인 Header와 Footer의 내용물을 하나씩 채워보겠습니다!
