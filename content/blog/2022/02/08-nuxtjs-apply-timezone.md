---
title: NuxtJs timezone 적용하기
tags:
  - nuxt
  - timezone
  - moment
---

Nuxt에서 배포를 했는데 시간대가 9시간 정도 차이나게 나타났다. Nuxt에서 배포할 때 UTC Timezone이 한국으로 설정되어있지 않아서인데 다행히도 쉽게 바꾸는 방법이 있었다. 이에 대해 간단히 정리했다.

<!--more-->

## @nuxt/moment

nuxt관련 라이브러리엔 정말 없는 게 없는 것 같다. nuxt/moment는 momentjs를 기반으로 하고 있다.

### momentjs

Javascript를 사용하다보면, 특히 API를 사용하다보면 날짜가 원하는데로 나오지 않는 경우가 많다. 그래서 [Moment.js](https://momentjs.com/)를 쓰라는 내용을 많이 볼 수 있다.

Javascript에서 dates 관련되서 다루기 쉽게 해주는 라이브러리로, 이걸 사용해도 되지만 [@nuxt/comment](https://github.com/nuxt-community/moment-module)를 사용하는게 더 간편하다.

### 설치

npm으로 쉽게 설치 가능하다.

```bash
npm i --save-dev @nuxtjs/moment
```

### 설정

`nuxt.config.js`의 `buildModules` 값에 다음과 같이 추가해줍니다.

```js [nuxt.config.js]
export default {
  buildModules: ["@nuxtjs/moment"],
  moment: {
    timezone: true,
  },
};
```

이전에 다루었던 [NuxtJS Netlify createdAt 날짜 유지하기](https://www.blogwealthy.com/blog/2022/02/07-nuxtjs-netlify-createdat-날짜-유지하기/)와 같이 사용하면 Nuxt에서 Netlify로 배포할 때, createdAt 날짜가 원하는데로 나온다.
