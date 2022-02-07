---
title: NuxtJS Netlify createdAt 날짜 유지하기
---

nuxt/content를 사용하다보면 마크다운 파일을 생성했을 때 자동으로 createdAt, updatedAt이 생성된다. 그런데 Netlify에 올리는 순간 그 때 그 시간대로 값이 바뀌게 된다. 그래서 모든 포스팅이 배포한 날짜에 만들어진 것처럼 되서 불편하다. 이를 고치는 방법에 대해 알아봤다.

이 글은 [How to keep createdAt and updatedAt dates consistent in Nuxt Content](https://miracleio.me/blog/how-to-configure-consistent-createdat-and-updatedat-dates) 기반으로 썼다.

## nuxt-content-git

git history를 이용해서 createdAt과 updatedAt 값을 바꿔주는 모듈이다.

### 설치

[nuxt](https://nuxtjs.org/docs/get-started/installation/)와 [nuxt/content](https://content.nuxtjs.org/)가 미리 설치되어있다고 가정하고, `nuxt-content-git`을 설치한다.

```bash
npm install nuxt-content-git
```

### 설정

`nuxt.config.js` 파일에 `@nuxt/content` 옆에 `nuxt-content-git`을 추가한다.

```js [nuxt.config.js]
export default {
  modules: [
    'nuxt-content-git',
    '@nuxt/content',
  },
}
```

그럼 끝이다! 기존의 createdAt, updatedAt을 값을 덮어쓴다!

### 팁

만약에 이를 원치않고 다른 값으로 하고 싶으면 `nuxt.config.js`에 다음처럼 하면 된다.

```js [nuxt.config.js]
export default {
  // ...
  modules: [
    // ...

    //https://github.com/dword-design/nuxt-content-git
    [
      "nuxt-content-git",
      {
        createdAtName: "gitCreatedAt",
        updatedAtName: "gitUpdatedAt",
      },
    ],
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],
  // ...
};
```
