---
title: VueJS 블로그 강의 7] 글 가져오기 2
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

이번 시간에는 포스팅 페이지를 꾸며볼겁니다. 그러면서 좀 더 구체적으로 데이터를 어떻게 활용하는 지 알아볼까요?

<!--more-->

## 좀 더 구체적인 콘텐츠 예시

이제 스타일링을 하려면 구체적인 포스팅 내용이 있어야겠죠?

### 포스팅 내용 구체적으로 쓰기

이전에 썼던 `first-day.md` 파일에 태그와 대표이미지도 추가해보겠습니다.

````markdown [content/diary/first-day.md]
---
title: 첫 번째 일기
tags:
  - blog
  - feel
  - happy
coverImg: /favicon.ico
---

오늘은 블로그를 만들었다. 너무 재밌었다.

<!--more-->

## 오늘 있었던 일

오늘은 Nuxt 프레임워크를 사용하고 유튜브를 봤다.

### Nuxt 프레임워크

`Nuxt`를 활용하여 만들었는데, **엄청 좋은 프레임워크**이다. nuxt/content를 설치하여 다음과 같이 세팅했다.

```js [nuxt.config.js]
export default {
  modules: ["@nuxt/content"],
};
```

### 버츄얼 유튜버 아멜리아 왓슨

최근 [아멜리아 왓슨 유튜브](https://www.youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg)를 보는데 너무 재밌다.

![테스트 이미지](/test.png)
````

중간에 `<!--more-->`가 있는데 이전 시간에도 언급했던 적이 있습니다. 이 값 위로 있는 내용은 나중에 데이터를 가져올 때 `description`값에 들어가있습니다.

```js
{
    title: "첫 번째 일기"
    description: "오늘은 블로그를 만들었다. 너무 재밌었다.",
    // ...
}
```

### 이미지 추가하기

frontmatter에 `favicon.png`를 커버이미지로 사용하는데요. 이는 `static` 폴더 안에 들어있습니다. content에서 쓰이는 이미지들은 `static` 폴더에서 가져옵니다.

이 파일들은 `http://(자신의 사이트)/(static 경로)`를 통해 접근할 수 있는데요. 아래에 귀여운 이미지를 static 폴더에 `test.png`라고 저장해보겠습니다.

<post-img src="/images/22/03/02/223831.png"></post-img>

<post-img src="/images/22/03/02/223023.png"></post-img>

## 포스팅 꾸미기

네 이제 이 내용을 가져오면 어떤 식으로 나타나는 지 보자구요! 이전 시간에 포스팅을 가져오는 `_post.vue` 코드에서 `post` 값을 콘솔로 찍어보면서 결과를 같이 한번 살펴보겠습니다.

```vue [pages/_postlist/_post.vue]
<template>
  <nuxt-content :document="post"></nuxt-content>
</template>

<script>
export default {
  async asyncData(ctx) {
    const post = await ctx.$content(ctx.route.path, { deep: true }).fetch();

    console.log(post); // 여기 추가!!!

    return { post };
  },
};
</script>
```

http://localhost/diary/first-day 에 접속하면 우리가 만들었던 컨텐츠가 나타납니다.

<post-img src="/images/22/03/02/225717.png"></post-img>

markdown으로 썼던 것들은 대부분 잘 나왔지만, 제목이라던가 대표이미지, 태그 등 frontmatter에서 작성했던 것들은 나오지 않고 있습니다.

nuxt-content는 $content 결과물 중 `body` 값만을 사용합니다. 따라서 이는 별도로 저희가 HTML 코드로 만들어줘야합니다! 이미지가 너무 큰거 같으니 조금 줄인채로 볼까요?

```vue [pages/_postlist/_post.vue]
<template>
  <div class="post-wrapper">
    <h1>{{ post.title }}</h1>
    <img :src="post.coverImg" alt="커버이미지" />
    <p>{{ post.description }}</p>
    <h2>태그</h2>
    <ul>
      <li v-for="tag of post.tags" :key="tag">{{ tag }}</li>
    </ul>
    <h3>작성 날짜 {{ post.createdAt }}</h3>
    <hr />

    <nuxt-content :document="post"></nuxt-content>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    const post = await ctx.$content(ctx.route.path, { deep: true }).fetch();
    return { post };
  },
};
</script>

<style>
img {
  width: 100px;
}
</style>
```

결과를 볼까요? 네 뭔가 블로그 같은 느낌이 들기 시작했습니다! 여전히 날짜 형태나 구성, 색상등이 전혀 맘에 들지는 않지만...CSS는 각자 알아서 바꿔보자구요!!

<post-img src="/images/22/03/02/231140.png"></post-img>

nuxt-content 내부 내용은 어떻게 바꾸냐고요? `nuxt-content` 클래스를 가진 컨테이너로 감싸져있기 때문에, 이를 보면서 수정하시면 됩니다.

<post-img src="/images/22/03/02/231254.png"></post-img>

예를 들어 `code` 내용에 대한 스타일링을 하고 싶다면?

```vue [pages/_postlist/_post.vue]
...생략

<style>
img {
  width: 100px;
}
.nuxt-content p code {
  background-color: #ccc;
  border-radius: 6px;
  padding: 0.3em 0.7em;
  font-weight: bold;
  color: red;
}
</style>
```

<post-img src="/images/22/03/02/231539.png"></post-img>

## 포스트 리스트 꾸미기

포스트 리스트 페이지도 크게 다르지 않습니다. 다만 내용은 가져오지 않고 다음과 같은 것들만 사용할 겁니다.

- 대표 이미지 (coverImg)
- 태그 (tags)
- 제목 (title)
- 설명 (description)
- 만든 날짜 (createdAt)
- 경로 (path)

위 5개는 이미 포스트에서 다 사용해봤던 데이터입니다. 여기에 `경로(path)` 를 사용해서 클릭하면 해당 포스트로 이동하게 할 겁니다.

```vue [pages/_postlist/index.vue]
<template>
  <ul class="post-list">
    <li v-for="post of posts" :key="post.title" class="post-item">
      <a :href="post.path">
        <img :src="post.coverImg" alt="" />
        <h2>{{ post.title }}</h2>
        <ul>
          <li v-for="tag of post.tags" :key="tag">{{ tag }}</li>
        </ul>
        <p>{{ post.description }}</p>
        <h3>{{ post.createdAt }}</h3>
      </a>
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

<style scoped>
img {
  width: 100px;
}

a {
  color: black;
  text-decoration: none;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.5em 1em;
  margin-bottom: 8px;
  background-color: #eee;
}
</style>
```

<post-img src="/images/22/03/02/233620.png"></post-img>

아..예쁘지는 않지만 어쨋든 포스트 리스트 페이지도 완성되었습니다. 클릭하면 해당 포스트 내용으로도 들어갑니다!

## 마무리하며

이렇게 포스트 리스트와 포스트 페이지를 만들었는데요. 제 블로그를 보시면 항상 상단에 카테고리들과 검색란들이 보이는데요. 두 페이지 모두 중복된 부분은 어떤 식으로 구현하면 좋을까요? 바로 레이아웃(layout)입니다! 다음 시간에는 레이아웃을 만드는 방법에 대해 알아볼게요!
