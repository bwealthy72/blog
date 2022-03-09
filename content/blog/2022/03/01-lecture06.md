---
title: VueJS 블로그 강의 6] 글 가져오기 1
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

이전 시간에 잠시 content를 가져오는 코드를 잠시 살펴봤었습니다. 이번 시간에는 좀 더 자세히 다뤄보면서 포스트들 리스트 페이지를 만들어보도록 하겠습니다.

<!--more-->

## 컨텐츠 만들기

글들을 여러 개 가져오려면, 당연히 컨텐츠가 여러 개 있어야겠죠? 다음과 같이 만들어주세요.

<post-img src="/images/22/03/02/001632.png"></post-img>

```markdown [content/diary/first-day.md]
---
title: 첫 번째 일기
---

오늘은 블로그를 만들었다. 너무 재밌었다.
```

```markdown [content/diary/second-day.md]
---
title: 두 번째 일기
---

Blog Wealthy 블로그를 보면서 블로그 만드는 방법을 배웠습니다!
```

```markdown [content/html/img-tag.md]
---
title: img 태그에 대한 설명
---

img 태그는 이미지를 띄우는 것입니다!
```

## asyncData 함수

Vue에는 여러가지 훅이 있습니다. 컴포넌트가 생성된 후 호출되는 `created`, 마운트된 후 사용되는 `mounted` 등. Nuxt에서는 컴포넌트가 로딩되기 전에 호출되는 `asyncData`라는 메서드가 있는데요. **pages 폴더에서 만들어진 컴포넌트만 사용할 수 있습니다.**

API를 호출해서 데이터를 가져올 때 보통 사용합니다. 이전에 만들었던 `_postlist/index.vue` 파일을 다음과 같이 수정해보겠습니다.

```vue [pages/_post]
<template>
  <h1>{{ $route.params.postlist }} 페이지</h1>
</template>

<script>
export default {
  async asyncData(ctx) {
    console.log(ctx);
  },
};
</script>
```

그리고 https://localhost:3000/diary 에 접속해본 뒤 콘솔 값을 보면 `ctx` 값이 나옵니다.

<post-img src="/images/22/03/02/004753.png"></post-img>

`asyncData` 함수는 이렇게 [Context](https://nuxtjs.org/docs/concepts/context-helpers) 값을 제공합니다. 그 중 `$content` 함수를 사용할겁니다.

## $content 함수

`$content` 함수를 통해 폴더에 있는 데이터를 가져올 수 있습니다.

- `path` (String, Default: "/"): content 폴더 내 가져올 경로를 지정합니다.
- `options` (Object, Default: {}): 옵션
  - `deep` (Boolean, Default: false): 하위 모든 데이터를 가져올지 여부
  - `text` (Boolean, Default: false): `text`라는 값으로 마크다운 원본도 반환합니다.

이렇게 함수를 사용하면 QueryBuilder가 나오는데 `fetch` 함수를 통해 값을 내보낼 수 있습니다. 이는 비동기 함수이기 때문에 `await`가 붙어야합니다.

```js
const data = await ctx.$content().fetch();
```

여러가지 예시를 들어보겠습니다.

1. 모든 포스팅들 가져올 때

```js
const data = await ctx.$content("/", { deep: true }).fetch();
```

2. diary 내 포스팅들만 가져올 때

```js
const data = await ctx.$content("/diary", { deep: true }).fetch();
```

3. diary 내 특정 포스팅을 가져올 때

```js
const data = await ctx.$content("/diary/first-day", { deep: true }).fetch();
```

## 페이지마다 다른 컨텐츠들 가져오기

페이지마다 수동으로 `path`를 지정하는 건 비효율적이겠죠? asyncData의 context에는 `route`을 사용하면 쉽게 구분할 수 있습니다.

```vue [pages/_postlist/index.vue]
<template>
  <h1>{{ $route.params.postlist }} 페이지</h1>
</template>

<script>
export default {
  async asyncData(ctx) {
    console.log(ctx.route.path);
    const posts = await ctx.$content(ctx.route.path, { deep: true }).fetch();
    console.log(posts);
  },
};
</script>
```

http://localhost:3000/diary 에 접속하면 콘솔 창에 다음과 같이 나옵니다.

<post-img src="/images/22/03/02/012503.png"></post-img>

이전에 만들었던 컨텐츠가 보이네요? http://localhost:3000/html 에 접속하면 어떨까요?

<post-img src="/images/22/03/02/012746.png"></post-img>

## 가져온 포스트 리스트 HTML에 반영하기

이제 이 데이터들을 HTML 코드에 반영해봅시다! `asyncData` 함수 특징 중 하나는 반환 값이 컴포넌트의 `data` 값 병합됩니다. 그러면 마치 data에서 선언한 것처럼 사용할 수 있습니다.

```vue [pages/_postlist/index.vue]
<template>
  <ul>
    <li v-for="post of posts" :key="post.title">
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData(ctx) {
    const posts = await ctx.$content(ctx.route.path, { deep: true }).fetch();
    return { posts };
  },
};
</script>
```

http://localhost:3000/diary 에 접속해보면 다음과 같이 나옵니다!

<post-img src="/images/22/03/02/014321.png"></post-img>

## 가져온 포스트 HTML에 반영하기

포스트 리스트와 마찬가지로 포스트만 가져오는 페이지에서도 동일하게 구현하면 HTML에 표시할 수 있습니다. 다만 마크다운 내용을 일일이 수동으로 HTML 코드로 만들기는 힘듭니다. 그래서 Nuxt에서는 `<nuxt-content>` 태그를 제공합니다.

`document` 값에 $content 결과 데이터를 넣어주면, 자동으로 그에 맞게 HTML 코드를 추가해줍니다.

```vue
<template>
  <nuxt-content :document="post"></nuxt-content>
</template>

<script>
export default {
  async asyncData(ctx) {
    const post = await ctx.$content(ctx.route.path, { deep: true }).fetch();
    return { post };
  },
};
</script>
```

## 마무리하며

이제 포스트와 포스트 리스트의 페이지를 만들었습니다! 이제 다음 시간에는 적절하게 css로 스타일링해서 블로그처럼 만들어보겠습니다.
