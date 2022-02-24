---
title: NuxtJS에서 검색기능 추가하기
tags:
  - nuxt
  - search
coverImg: /images/22/02/24/233554.png
---

블로그가 형태를 처음 갖출 때부터 자리잡고 있었던 검색란. 하지만 아무런 동작을 하지 않는다. 이제 글들도 좀 썼고 검색할만할테니 nuxt/content 자체가 가지고 있는 검색기능을 적용해보려 한다.

<!--more-->

물론 검색엔진들에 비해 정확도가 낮을 수는 있지만 블로그에서 검색을 얼마나 하겠는가!

## nuxt/content

이 블로그 글들은 [@nuxt/content](https://content.nuxtjs.org/) 패키지를 통해 쓰여졌다. 그래서 글을 가져올 때 사용하는 `search` 함수를 이용하면 원하는 것들만 골라낼 수 있다. 공식 홈페이지의 예시에 의하면 다음과 같다.

```js
// title에 welcome이 있는 글들만 가져오기
const articles = await this.$content("articles")
  .search("title", "welcome")
  .fetch();

// 사용자가 정의한 "welcome" field를 가진 모든 글
const articles = await this.$content("articles").search("welcome").fetch();

// 만약 빈 문자열이면 모든 글을 다 가져온다.
const articles = await this.$content("articles").search("").fetch();
```

## Component 만들기

그럼 검색을 하기위한 입력 컴포넌트와 검색했을 때 이동할 페이지 컴포넌트를 만들어야 한다.

<post-img src="/images/22/02/25/025737.png"></post-img>

### Search Component

우선 검색 키워드를 만들 `input`과 기능을 심어야한다. 기능은 다음과 같다.

- Keyboard Enter를 누를 시 검색(`search` 함수)
- input에 있는 값은 `keyword`라는 변수에 담긴다.
- search 함수는 `/search/${keyword}` 경로로 이동시켜준다.

```vue [Search.vue]
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

### 파일리스트 Component

`/search/_keyword.vue`파일을 만든다. 그러면 이 페이지로 이동했을 때, 컴포넌트의 `this.$route.params.keyword` 값에 검색한 값이 들어있다.

```vue [/pages/search/_keyword.vue]
<template>
  <ul>
    <li v-for="post of postList" :key="post.title">{{ post.title }}</li>
  </ul>
</template>
<script>
export default {
  async asyncData({ store, route, $content }) {
    // 루트에서부터 모든 경로를 다 검색
    const postList = await $content("/", { deep: true })
      .search("title", this.$route.params.keyword)
      .fetch();

    return { postList };
  },
};
</script>
```

두 컴포넌트를 사용하면 검색기능을 만들 수 있게 된다. 결과나 예시를 보이고 싶지만 블로그 예시로 들기엔 코드가 너무 길어서...

## 이 사이트의 예시

실제로 이 사이트는 위 방법을 기반으로 구현했습니다. 혹시나 코드 전체가 보고싶으신 분들은 [Github](https://github.com/bwealthy72/blog)을 참조해주세요.

```vue [/pages/search/_keyword.vue]
<template>
  <main class="post-list-wrapper">
    <article class="content">
      <h1 class="main-title">{{ mainTitle }}</h1>
      <ul>
        <li class="post-item" v-for="post of postList" :key="post.title">
          <a class="post-item__img" v-if="post.coverImg" :href="post.path">
            <img :src="post.coverImg" alt="cover" />
          </a>
          <div class="post-item__info">
            <a :href="post.dir" class="category">{{ post.category }}</a>
            <a :href="post.path" class="main-info">
              <h2 class="title">{{ post.title }}</h2>
              <p class="desc">{{ post.description }}</p>
            </a>

            <div class="sub-info">
              <ul class="tags">
                <li class="tags__item" v-for="tag of post.tags" :key="tag">
                  <a href="">
                    {{ tag }}
                  </a>
                </li>
              </ul>
              <p class="date">
                <img
                  class="calendar-ico"
                  src="@/assets/images/calendar.svg"
                  alt="calendar"
                />
                <span>{{
                  post.createdAt.slice(0, 10).replace(/-/gi, ".")
                }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
export default {
  head() {
    const isSearch = this.$route.path.slice(0, 7) === "/search";
    if (isSearch) {
      return {
        title: `"${this.$route.params.keyword}"의 검색 결과`,
      };
    }
  },
  computed: {
    mainTitle() {
      let tit = "";
      const r = this.$route;
      if (r.params.keyword) {
        tit = `"${r.params.keyword}"의 검색 결과`;
      } else if (r.name) {
        tit = r.name;
      }
      return tit;
    },
  },
  async asyncData({ store, route, $content }) {
    let path, search;
    const isSearch = route.path.slice(0, 7) === "/search";

    // 경로가 /search로 시작하는 경우 검색 화면
    if (isSearch) {
      path = "/";
      search = ["title", route.params.keyword];
    } else {
      path = route.path.split("/").slice(0, 2).join("/");
      search = [""];
    }

    const postList = await $content(path, { deep: true })
      .only([
        "title",
        "path",
        "tags",
        "createdAt",
        "coverImg",
        "description",
        "dir",
      ])
      .search("")
      .sortBy("createdAt", "desc")
      .search(...search)
      .fetch();

    for (const post of postList) {
      if (isSearch) {
        const dir = route.path.split("/");
        post.dir = "/" + dir[dir.length - 1];
        post.category = store.state.routePaths[post.dir];
      } else {
        post.dir = route.path;
        post.category = store.state.routePaths[post.dir];
      }
    }

    return { postList };
  },
};
</script>
```
