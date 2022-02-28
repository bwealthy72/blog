---
title: VueJS 블로그 강의 4] Routing 하기
tags:
  - vue
  - lecture
  - nuxt lecture
coverImg: /images/22/02/23/020715.png
---

이번 글에서는 포스팅을 하기 위해 nuxt/content라는 패키지를 사용해보겠습니다.

## nuxt/content 설치

프로젝트를 설정할 때 nuxt/content를 포함했기 때문에 자동으로 설치되어있습니다. 그래도 설치를 안하신 분들을 위해서 설치 방법을 간략하게 알려드리겠습니다.

yarn이나 npm을 통해 설치할 수 있습니다

```bash [yarn]
yarn add @nuxt/content
```

```bash [npm]
npm install @nuxt/content
```

`nuxt.config.js` modules에 다음 내용을 추가합니다.

```
export default {
  {
  modules: [
    '@nuxt/content'
  ],
  content: {
    // Options
  }
}
```

## Markdown으로 컨텐츠 만들기

컨텐츠 내용을 추가하려면 프로젝트 내에 `content` 폴더에 파일을 만들면 되는데요. markdown, json, csv 등 다양한 파일들이 들어갈 있지만, 저희는 그 중 markdown을 사용할 겁니다. 마크다운 문법을 통해 HTML로 쉽게 변환이 가능해서 아주 간단한 방식으로 컨텐츠를 작성할 수 있습니다.

### 파일 만들기

눈으로만 보면 감을 잡기 어렵겠죠? 예시로 파일을 하나 만들어보겠습니다. `content` 폴더 내에 `example.md`를 만들어주세요.

<post-img src="/images/22/02/28/151248.png"></post-img>

### 파일 내용 가져오기

content 내용을 가져오기 위해서 `pages/_postlist/_post.vue` 파일에 다음과 같이 수정해주세요.

> 파일 내용 가져오는 방법에 대해서는 다음 시간에 자세히 다뤄보겠습니다. 이번 시간에는 파일 내용 쓰는 방법에 좀 더 집중해보자구요!

```vue [pages/_postlist/_post.vue]
<template>
  <nuxt-content :document="post"></nuxt-content>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const post = await $content("example").fetch();
    return { post };
  },
};
</script>
```

## 파일 내용 쓰기

글을 쓸 때 주로 어떤 것들이 들어갈까요? 제목, 리스트, 이미지, 하이라이트, 링크 등이 있을 수 있는데요! 그 외에 유튜브나 표 등 더 세부적인 것들도 몇 가지 있지만 이는 나중에 다뤄보고! 지금 제가 블로그를 작성하면서 자주 사용하는 것들만 다뤄보겠습니다!

### Front Matter

블로그 글을 쓸 때 내용만 적지는 않죠? 제목, 카테고리, 대표 이미지 등을 정합니다. 이 부분을 여기서 결정하는데요. 나중에 이 글의 데이터를 가져올 때, 다음과 같은 내용들이 들어있습니다.

```js
{
  body: Object;
  excerpt: Object;
  title: "Introduction";
  description: "Learn how to use @nuxt/content.";
  dir: "/";
  extension: ".md";
  path: "/index";
  slug: "index";
  toc: Array;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

물론 이 모든 내용을 다 적을 필요는 없습니다. 가장 자주 쓰는 것은 title이니까요. 그래서 이 정도만 적어도 충분합니다.

```
---
title: 제목입니다.
---
```

그러면 대표이미지나 태그 등도 넣고 싶은데 어떻게 해야하나요? 변수처럼 데이터를 추가하고 이를 나중에 데이터 가져올 때 사용하면 됩니다. 태그는 여러 개가 있을 수 있어서 약간 다르게 합니다.

```markdown
---
title: 제목입니다.
tags:
  - 태그 1
  - 태그 2
coverImg: /images/test.png
---
```

이렇게 하면 나중에 데이터를 가져올 때 넣었던 값들이 추가되는 것을 볼 수 있습니다.

```
{
  title: "제목입니다.";
  tags: ["태그 1", "태그 2"],
  coverImg: "/images/test.png"
}
```

### Header

글을 쓸 때 보통 제목, 소제목을 넣죠? `#`을 이용하면 쉽게 만들 수 있습니다.

```markdown [Header]
# 제목 1

## 제목 2

### 제목 3

#### 제목 4

##### 제목 5

###### 제목 6
```

`#` 개수에 맞게 `<h1>`, `<h2>` ... 태그가 자동적으로 들어갑니다.

<post-img src="/images/22/02/28/223232.png"></post-img>

### Link

하이퍼링크를 넣는 방법은 3 개중 하나를 사용하면 되지만, 3번째를 사용합니다. 3번째가 마크다운 문법이고 1, 2번째는 Nuxt에서만 가능한 방법입니다. `nuxt-link`는 Vue에 `router-link`와 동일하다고 생각하면 됩니다.

```markdown [Link]
<nuxt-link to="/diary">Link to Diary</nuxt-link>

<a href="/diary">Link to Diary</a>

[Link to Main](/diary)
```

<post-img src="/images/22/02/28/230316.png"></post-img>

### Strong, em, del, code

글을 쓰다보면 꾸며주는 글이 있을 수 있습니다. 그럼 다음과 같이 해주세요.

```markdown
여기서 강조하는 글은 **이렇게** 표시하는 겁니다.

여기서 기울이는 글은 _이렇게_ 표시하는 겁니다.

여기서 취소하는 글은 ~~이렇게~~ 표시하면 됩니다.

여기서 코드를 쓰는 글은 `이렇게` 표시하면 됩니다. (`는 물결표(~) 키입니다.)
```

<post-img src="/images/22/02/28/231543.png"></post-img>

### 이미지

이미지는 img 태그를 써도 되지만 마크다운 문법으로 써야 gif 애니메이션도 동작하고 좋습니다.

![img태그의 alt](https://www.blogwealthy.com/logo.png)

<post-img src="/images/22/02/28/232117.png"></post-img>

### Codeblock

저는 코드 내용을 포스팅 많이합니다. 그래서 코드블록을 많이 사용하는데요! 만약 `javascript` 언어로 `hello.js` 라는 제목으로 사용한다면 다음과 같이 하면 됩니다.

<pre class="line-numbers language-markdown">
<code>```js [hello.js]
const text = "hello";
```</code>
</pre>

<post-img src="/images/22/02/28/235816.png"></post-img>

`js` 를 적어야 해당 문법에 맞게 하이라이팅 해줍니다. `hello.js`는 꼭 안적어도 괜찮습니다.

### 그 외

그 외에 더 많은 기능들이 있지만, 그것 까지 다루면 이번 글이 길어지게 되고 후에 사용할 때 다시 다루도록 하곘습니다. 미리 보고싶으신 분들은 [공식 홈페이지](https://content.nuxtjs.org/writing)를 참조해주세요

- HTML 코드를 적을 수 있다.
- `<!--more-->`를 넣으면 그 위 값은 front matter에서 description 값에 들어간다.
- footnote

## 마무리하며

이제 글을 쓸 수 있게 되었으니 다음 시간에는 글을 가져오는 방법에 대해 자세히 다뤄보겠습니다.
