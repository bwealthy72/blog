---
title: NuxtJS robots txt 추가하기
tags:
  - robots.txt
  - nuxt
  - seo
---

나무위키(?)에 의하면 나의 사이트를 크롤링하는 로봇들을 제어하기 위한 규약같은 것이라고 한다. 블로그를 운영하는 것이다 보니 딱히 막을 것도 없겠지만 네이버 서치 어드바이저가 넣으라고 느낌표를 똭 표시하는데 이런 건 못참지!

## nuxtjs/robots

[nuxtjs/tobots](https://www.npmjs.com/package/@nuxtjs/robots) 라는 고마운 라이브러리가 있다~

### 설치

먼저 npm으로 다음과 같이 설치한다.

```bash
npm install @nuxtjs/robots
```

### 설정

`nuxt.config.js`에서 다음 내용을 추가해준다.

```js [nuxt.config.js]
export default {
  modules: ["@nuxtjs/robots"],
  robots: {
    UserAgent: "*",
    Disallow: "/",
  },
};
```

### 생성확인

`npm run generate`를 실행해보면 `dist` 폴더안에 `robots.txt`가 생성된 것을 볼 수 있다. 내용은 이것이 다다

```txt [robots.txt]
User-agent: *
Disallow:
```
