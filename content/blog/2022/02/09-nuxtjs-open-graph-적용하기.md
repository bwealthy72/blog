---
title: NuxtJS Open Graph 적용하기
tags:
  - nuxt
  - open graph
  - seo
coverImg: /images/09-nuxtjs-open-graph-적용하기/220209-215428.png
---

나의 블로그가 아직 검색에도 나타나지도 않지만, 추후에 내 글을 공유하려는 사람들을 위해 Open Graph를 적용하기로 했다. 이를 적용하면 내 블로그가 다른 사람에게 좀 더 그럴듯해 보일 것이다. 검색 엔진에도 조금이나마 도움이 되지 않을까 하는 기대감도 있다.

<!--more-->

## Open Graph

**Open Graph**란 특정 페이지의 링크를 공유할 때 해당 페이지를 간략하게 잘 보일 수 있도록 도와주는 태그로, 페이스북에서 만들었다. 링크를 들어가기 전까지는 해당 사이트의 내용을 잘 모르기 때문에, 미리 전달해주는 메타데이터 역할이다.

### 적용하기 전

이를 적용하지 않고 내 포스팅을 공유하는 경우 이렇게 나타난다.

카카오톡의 경우

<post-img src="/images/09-nuxtjs-open-graph-적용하기/220209-215428.png"></post-img>

트위터의 경우

<post-img src="/images/09-nuxtjs-open-graph-적용하기/220209-210754.png"></post-img>

포스트의 커버 이미지, 제목, 설명이 안 나오고 블로그 대표 이미지, 제목이 나오는데 Open Graph를 설정하지 않았기 때문이다. 하지만 `nuxt.config.js`에는 미리 정해놓은 meta 데이터가 있어서 이를 참조한다.

```js [nuxt.config.js]
head: {
title: "부자가 될 프론트엔드 개발자",
htmlAttrs: {
    lang: "ko",
},
meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
    hid: "description",
    name: "description",
    content:
        "부자가 될 꿈을 꾸며 오늘도 열심히 사는 프론트엔드 개발자입니다.",
    },
    { name: "format-detection", content: "telephone=no" },
],
link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
},
```

Open graph들은 생각보다 많아서 [자세한 내용](https://ogp.me/)은 생략하고 대표적으로 많이 사용되는 몇 가지만 사용할 것이다.

### 카카오톡

카카오톡이나 블로그, 페이스북 등을 공유할 때 필요한 정보이다.

- **og:title**: 페이지의 제목 태그
- **og:type**: 페이지의 타입 `video.movie`, `article`, `website` 등이 있다.
- **og:image**: 페이지의 대표 이미지
- **og:url**: - 페이지의 URL
- **og:description**: 웹페이지 설명

### 트위터

트위터에서는 별도의 태그들을 만들어서 추가적으로 넣어줘야 한다.

- **twitter:card**: 트위터에서 보이길 원하는 타입 ([summary](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image), [summary_large_image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image), [app](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card), [player](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card) 중 하나)
- **twitter:title**: 트위터에서 보이는 타이틀
- **twitter:description**: 트위터에서 보이는 설명
- **twitter:image**: 트위터에서 보이는 대표이미지

## Nuxt에 적용하기

NuxtJS에선 `head`를 추가해주는 기능이 있어서 손쉽게 `meta`를 추가할 수 있다! `nuxt.config.js`에서 추가하면 그 페이지 내에 동일하게 적용되고, 만일 해당 컴포넌트의 head의 meta 값을 추가하면 덮어쓴다.

### nuxt.config.js

전체 페이지에 적용할 내용이기 때문에 수동으로 넣어준다.

```js [nuxt.config.js]
export default {
  // ...
  head: {
    title: "부자가 될 프론트엔드 개발자 BWealthy",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Be Wealthy. 부자가 되고자 하는 프론트엔드 블로거입니다.",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "BWealthy의 부자가 되는 과정",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "BWealthy의 부자가 되는 과정",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Be Wealthy. 부자가 되고자 하는 프론트엔드 블로거입니다.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://blogwealthy.com/logo.png",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://blogwealthy.com/",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "BWealthy의 부자가 되는 과정",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Be Wealthy. 부자가 되고자 하는 프론트엔드 블로거입니다.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://blogwealthy.com/logo.png",
      },
    ],
  },

  // ...
};
```

### 컴포넌트에 추가하기

nuxt.config.js와 크게 다르지 않습니다. 다만 조금 다른 것은 포스트의 내용을 가져와야하기 때문에 `asyncData`의 반환값을 사용합니다. 그리고 sitename이나 type과 같이 포스트와 상관 없는 것은 굳이 넣지 않아도 자동으로 들어가기 때문에 제외시켜줍니다.

```js [nuxt.config.js]

```
