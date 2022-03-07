---
title: VueJS 블로그 강의 9] Header에서 검색란 만들기
tags:
  - vue
  - lecture
  - nuxt lecture
coverImg: /images/22/02/23/020715.png
---

이번 시간에는 이전 시간에 만들었던 Header 컴포넌트 내에 검색란을 보이게 해보겠습니다.

<!--more-->

## Search 컴포넌트

Search 컴포넌트는 검색기능이 들어간 검색란입니다. components 폴더 내에 다음과 같이 추가해주세요.

<post-img src="/images/22/03/07/175512.png"></post-img>

### 기능 구현

검색란의 기능을 생각해보면, 우선 검색어가 필요하고 엔터를 눌렀을 때, 검색된 결과들이 나와야합니다. 티스토리 같은 경우 검색을 하면 `/search/(검색어)` 경로로 이동하는데요. 이와 비슷하게 구현해보겠습니다.

```vue [components/common/Search.vue]
<template>
  <input
    type="text"
    placeholder="Search"
    @keyup.enter="search"
    v-model="keyword"
  />
</template>

<script>
export default {
  data() {
    return {
      keyword: null,
    };
  },
  methods: {
    search() {
      if (this.keyword) {
        this.$router.push(`/search/${this.keyword}`);
      }
    },
  },
};
</script>
```

`keyword` 값으로 검색어를 가져오고 `@keyup.enter`를 통해 엔터를 누르면 `search` 함수가 실행됩니다. search 함수에서 keyword가 있다면 `this.$router.push`로 `/search/키워드` 경로로 이동합니다.

### Header에 추가하기

만든 Search를 Header에 추가하겠습니다.

```vue
<template>
  <header>
    <CommonSearch></CommonSearch>
  </header>
</template>
```

<post-img src="/images/22/03/07/180229.png"></post-img>

오 잘 나타났네요! 이제 `diary`라고 검색하고 어디로 이동하는 지 볼까요?

<post-img src="/images/22/03/07/182127.png"></post-img>

`/search/diary`로 이동했네요! 하지만 이 경로는 `_postlist/_post.vue`로 라우트되어있기 때문에 $content 함수에서 찾을 수 없다는 에러가 발생합니다. 그래서 Not Found 페이지가 나오는 건데요.

## Search 페이지 만들기

Search 페이지 만드는 방법은 두 가지 정도 생각해볼 수 있습니다.

1. 페이지 컴포넌트 만들기
2. postlist 컴포넌트로 라우팅 하기

### 페이지 컴포넌트 만들기

pages 폴더에 `/search/index.vue` 파일을 만드는 겁니다. 그러면 자동으로 /search/(키워드) 경로는 모두 이 컴포넌트 페이지로 이동하겠죠! 이전에 만들었던 `/_postlist/_index.vue` 내용을 모두 가져와서 일부 수정해보겠습니다.

```vue [pages/search/index.vue]
...
        <h3>{{ post.createdAt }}</h3>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData(ctx) {
    const posts = await ctx
      .$content("/", { deep: true })
      .search("title", ctx.route.params.keyword)
      .fetch();
    return { posts };
  },
};
</script>

<style scoped>
img {
  width: 100px;
}
...

```

$content 함수 쪽을 잘 보시면, path를 루트(`/`)로 한 다음, $content 함수 뒤에 `search` 함수를 사용했습니다. 즉, **전체 컨텐츠들 중에 title이 keyword인 것을 모두 찾습니다.**

예를 들어 "첫"이라고 검색해볼까요? 그러면 첫 번째 일기 글만 나옵니다.

<post-img src="/images/22/03/07/201318.png"></post-img>

그럼 "img"라고 검색한다면?

<post-img src="/images/22/03/07/201359.png"></post-img>

## postlist 컴포넌트로 라우팅 하기

search 페이지가 postlist와 다른 디자인으로 구성되어있다면, 페이지를 다르게 추가하는 게 맞습니다. 하지만 만약 postlist와 동일하다면? postlist 컴포넌트로 라우팅하면 됩니다! `nuxt.config.js`를 열어서 다음 내용을 추가해주세요.

> nuxt.config.js 는 수정해도 개발서버에 반영이 안되기 때문에 서버를 닫고 다시 열어주어야합니다.

```js [nuxt.config.js]
export default {
  // ...
  router: {
    extendRoutes(routes, resolve) {
      routes.unshift({
        path: "/search/:keyword",
        component: resolve(__dirname, "pages/_postlist/index.vue"),
      });
    },
  },
  // ...
};
```

<post-img src="/images/22/03/07/215029.png"></post-img>

extendRoutes를 통해 추가로 라우팅하는 코드입니다. routes에는 router.js에서 만들어진 값들이 들어있습니다. 여기에 경로와 component를 추가하는건데요.

extendRoutes에서 받은 `resolve` 함수와 `__dirname` 이라는 값을 이용하면 프로젝트 폴더 내에 원하는 경로의 컴포넌트를 지정할 수 있습니다.

## Search 함수

콘텐츠를 가져올 때 Search를 사용했었는데요 그 외에도 [공식 홈페이지](https://content.nuxtjs.org/fetching/#searchfield-value)에 의하면 컨텐츠를 다양한 방식으로 검색할 수 있습니다.

```js
// title이 welcome인 글들을 찾는다.
const articles = await this.$content("/").search("title", "welcome").fetch();
// frontmatter에서 welcome이 있는 글을 찾는다.
const articles = await this.$content("/").search("welcome").fetch();
// 비어있는 경우 생략
const articles = await this.$content("/").search("").fetch();
```

search 뿐만 아니라 only, without, where, sortBy, catch 등 다양한 기능이 더 있습니다. 예를 들면 [sortBy](https://content.nuxtjs.org/fetching/#sortbykey-direction)를 이용하면 원하는 방식으로 정렬할 수 있는데요. 저희 블로그에 `만든 날짜(createdAt)`가 최신 순서에 맞게 나오도록 해볼까요?

```vue [pages/search/_keyword.vue]
<script>
export default {
  async asyncData(ctx) {
    const posts = await ctx
      .$content("/", { deep: true })
      .search("title", ctx.route.params.keyword)
      .sortBy("createdAt", "desc")
      .fetch();
    return { posts };
  },
};
</script>
```

<post-img src="/images/22/03/07/202459.png"></post-img>

원래는 첫 번째 일기가 위쪽이였는데 반대로 되었죠? 좋습니다! 나중에는 다른 것들도 더 사용해서 pagination도 해볼겁니다!

## 마무리하며

다음 시간에는 메뉴바에 대해서 다뤄보겠습니다!
