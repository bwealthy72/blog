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
