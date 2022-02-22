---
title: NuxtJS sitemap 자동생성하기
tags:
  - nuxt
  - sitemap
  - seo
---

Nuxt로 블로그를 만들었다. 검색 엔진들에 사이트맵을 제출해주어야 내 사이트를 좀 더 효율적으로 크롤링 해준다. ([구글이 그랬다.](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=ko)) 따라서 이를 위해 포스트 페이지마다 사이트맵을 작성해야하지만 이건 아주 귀찮은 일..그래서 Nuxt에 자동으로 생성해주는 게 없을까 찾아보니 다행히도 있었다.

<!--more-->

## nuxt/sitemap

왠만해서 필요한거는 사람들이 다 만들어주었다. (감사합니다) [nuxt/sitemap](https://sitemap.nuxtjs.org/)이라는 라이브러리를 사용하면 쉽게 적용할 수 있다.

### 설치

npm으로 쉽게 설치!

```bash
npm install @nuxtjs/sitemap
```

### 설정

`nuxt.config.js` 파일에 modules 내용을 추가해준다. `modules`의 경우 이미 있는 key이기 때문에 수정을 해준다.

```js [nuxt.config.js]
export default {
  // ...

  modules: ["@nuxtjs/sitemap"],

  sitemap: {
    hostname: "https://www.blogwealthy.com/",
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
  },

  generate: {
    async routes() {
      const { $content } = require("@nuxt/content");
      const files = await $content({ deep: true }).only(["path"]).fetch();

      return files.map((file) => (file.path === "/index" ? "/" : file.path));
    },
  },
};
```

### 생성 확인

`npm run generate` 를 실행하면 마지막에 다음 문장을 볼 수 있다.

<post-img src="/images/22/02/23/013522.png"></post-img>

그리고 `dist` 폴더의 `sitemap.xml`을 보면 다음과 같이 만들어져 있다!

<post-img src="/images/22/02/23/013607.png"></post-img>

## 근데

등록하면 과연 검색에 얼마나 영향이 있을지 잘 모르곘다.
