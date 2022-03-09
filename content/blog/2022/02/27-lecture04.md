---
title: VueJS 블로그 강의 4] Routing 하기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

이제 프로젝트도 만들었으니 페이지 화면을 만들어야겠죠? 이번 시간에는 main, 포스트 리스트, 포스트 3개 페이지를 만들어보겠습니다.

<!--more-->

## 페이지 추가해보기

페이지 관련된 작업은 `pages` 폴더 내에서 이루어집니다. 카테고리 관련 페이지를 만들기 위해 `category`라는 폴더를 만들어주시고 그 안에 `index.vue` 파일을 생성해봅시다. 그리고 내용은 간단하게 이렇게 해볼까요?

```vue [pages/category/index.vue]
<template>
  <h2>포스트 리스트가 들어간 페이지</h2>
</template>
```

그런 다음 개발 서버(`npm run dev`)를 실행시켜서 https://localhost:3000/category 에 접속해볼까요?

<post-img src="/images/22/02/27/213946.png"></post-img>

routing 설정도 없이 바로 category라는 페이지가 만들어졌습니다! Vue에서는 vue-router를 이용했어야 했는데 Nuxt에서는 너무 쉽게 적용되네요.

> `.nuxt/router.js` 폴더를 보면 실제로 `routerOptions`이라는 변수로 vue-router를 사용하고 있는 것을 볼 수 있습니다.

### 자동 라우팅 규칙

그렇다면 이 라우팅 규칙은 어떤 식으로 이루어질까요? 몇 가지 예시만 보시면 바로 파악이 될겁니다.

- `pages/index.vue` -> /
- `pages/test1.vue` -> /test1
- `pages/test2/index.vue` -> /test2
- `pages/_test3/index.vue` -> /:test3
- `pages/test4/_keyword.vue` -> /test4/:keyword
- `pages/_test5/_keyword.vue` -> /test5/:keyword

<post-img src="/images/22/02/27/220641.png"></post-img>

실제로 `./nuxt/router.js` 파일이 어떻게 생성되었는지 개발 서버 실행 후 한번 살펴봅시다.

<post-img src="/images/22/02/27/215624.png"></post-img>

파일명으로된 `(이름).vue` 파일은 **/이름** 의 경로를 가집니다. 만약 `/year/month/day.vue` 라는 파일을 만든다면 경로도 **/year/month/day**가 만들어집니다.

또 vue-router를 아시는 분이라면 `:경로`가 어떤 의미인지 아실텐데요. 이 부분에는 어떤 내용이든 들어갈 수 있고 모두 동일한 `_test.vue` 컴포넌트 페이지가 나타납니다.

- `pages/_test.vue` -> /hello
- `pages/_test.vue` -> /car
- `pages/_test.vue` -> /youareman
- `pages/_test.vue` -> /bwealthy

만약 **/hello**에 접속했다면 `this.$route.params`는 `{ test: "hello" }` 값을 가지게 됩니다.

### main, postlist, post 페이지 만들기

그럼 이제 페이지 3개를 만들어볼 수 있겠죠? 다음과 같이 3가지 만들어볼겁니다.

- `pages/index.vue`: 메인 페이지
- `pages/_postlist/index.vue`: 포스트 리스트 페이지
- `pages/_postlist/_post.vue`: 포스트 페이지

```vue [pages/index.vue]
<template>
  <h1>Main 페이지</h1>
</template>
```

<post-img src="/images/22/02/27/222523.png"></post-img>

```vue [pages/_postlist/index.vue]
<template>
  <h1>{{ $route.params.postlist }}의 리스트 페이지</h1>
</template>
```

<post-img src="/images/22/02/27/222655.png"></post-img>

```vue [pages/_postlist/_post.vue]
<template>
  <h1>{{ $route.params.postlist }}에서 {{ $route.params.post }} 페이지</h1>
</template>
```

<post-img src="/images/22/02/27/222800.png"></post-img>

간단하죠?? 만약 블로그를 만들면서 추가로 원하는 페이지가 있다면 이런 방식으로 만들면 됩니다!

## 마무리하며

다음 시간에는 본격적으로 포스팅하는 방법에 대해 알아보겠습니다!!

![](/images/meme/제리인사.gif)
