---
title: VueJS 블로그 강의 10] Header에서 메뉴바 만들기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

페이지를 자유롭게 오갈 수 있도록 돕는 메뉴바. 이번 시간에는 nuxt에서 메뉴바를 구현해보겠습니다.

<!--more-->

## Menu Bar

메뉴바의 역할은 페이지를 쉽게 오갈 수 있도록 돕는 기능을 하고 있습니다. 우선 컴포넌트부터 만들어볼까요? components/layout 폴더에 `MenuBar.vue` 파일을 만들어주세요

<post-img src="/images/22/03/09/181036.png"></post-img>

```vue [components/layout/MenuBar.vue]
<template>
  <nav>
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/diary">Diary</NuxtLink></li>
      <li><NuxtLink to="/html">HTML</NuxtLink></li>
    </ul>
  </nav>
</template>
```

<post-img src="/images/22/03/09/181302.png"></post-img>

끝입니다! 간단하네요!

카테고리를 추가할 때마다 이 부분만 수정하면 되지만 좀 불편하죠? 개인적으로 저는 다음 방법을 사용합니다.

간단하죠? 여기까지 기본적인 Nuxt 블로그 틀을 만들었는데요. css로 잘 꾸며주기만 한다면 지금 블로그처럼 만들 수 있습니다.

## 마무리하며

이제 블로그를 만들었으니 남들이 볼 수 있게 배포를 해봐야겠죠? 다음 시간에는 Netlify를 이용해 블로그를 배포하는 방법에 대해 알아보겠습니다!
