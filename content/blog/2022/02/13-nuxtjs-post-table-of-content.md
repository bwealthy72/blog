---
title: NuxtJS 포스트 목차 TOC 만들기
tags:
  - nuxt
  - toc
coverImg:
---

하루하루 나의 블로그가 바뀌어 가는 모습이 보기 좋다. 글을 보려면 역시 목차가 있어야 어떤 내용이 있는지 파악하기 쉽고 좋다. Nuxt/Content에서 제공해주는 TOC(Table Of Content) 데이터를 이용해서 퍼블리싱 해보자.

## TOC 예시

우선 어떤 방식으로 TOC를 만들어볼지 고민해봤다. 대표적으로 3가지가 있다고 생각한다.

### 콘텐츠 위에 위치

시작하기 전에 어떤 내용이 있는지 보고 가라는 것처럼 초반에 위치해 있고 이를 클릭하면 해당 위치로 이동하는 방식이다.

<post-img src="/images/22/02/23/020334.png"></post-img>

개인적으로 디자인이나 구성에 대해 참조하기 위해 자주 들어가는 블로그이다. 1단으로 구성한 내 블로그에 끼워넣기엔 좋을 수 있지만 약간 글을 읽으면서 좌우가 좀 허전한 감이 없지않아 있다는 생각이 든다.

### 버튼을 누르면 우측에서 등장

사이트 우측에 버튼이 있어서 누르면 목차가 나타나는 방식이다. 목차가 긴 경우 좋고, 따로 목차가 빠져있어서 페이지 전체적으로 심플에 보이는 효과를 줄 수 있어서 좋다.

![toc 예시2](/images/22/02/23/020630.gif)

하지만 나는 안 그래도 블로그가 좀 단순해 보여서 조금 추가하고 싶은 마음이 있다. 그래서 이건 모바일 전용으로만 하고 다른 방식을 채용하기로 했다.

### 목차가 옆에서 따라다니기

이전 블로그에서는 이 방식을 했었다. 포스트 옆에서 따라다니는 듯한 느낌!

![toc 예시3](/images/22/02/23/020631.gif)

## TOC 구현

### nuxt/content toc 데이터

나는 `@nuxt/content` 를 사용하는데 `$content` 함수를 사용하면 TOC 데이터가 다음과 같이 나온다.

<post-img src="/images/22/02/23/020446.png"></post-img>

헤더(h2, h3, ...)에 따라 `depth`라는 값이 달라진다. `text`로 글자를 표시하고 `id`를 이용하면 텍스트를 클릭했을 때 해당 글로 이동하게 할 수 있다. 꼭 h2, h3 순으로 글을 작성하지 않을 수도 있다고 생각해서 생각한 데이터 구조인 것 같다.

그래서 어떤게 몇 번째인지 알 수가 없어서 1. 2. 3. 처럼 앞에 숫자 붙이는 것 대신 ● 와 같은 기호를 붙이기로 했다. 굳이 하려면 만들 수 있지만 그럼 글을 쓸 때 반드시 h2, h3 순으로 써야하기 떄문에 그런 제약을 두고 싶지 않았다.

### Vue 코드

다음과 포스트 데이터를 가져오면 그 안에 `toc`라는 키가 있다. 이 값을 가져와서 template에 출력했다.

```vue [_post.vue]
<template>
  <nav class="toc-wrapper" v-if="toc.length > 0">
    <div class="toc">
      <h2 class="toc__title">Table of Content</h2>
      <ul class="toc__list">
        <li v-for="t of toc" :key="t.id" :class="`h${t.depth}`">
          <a :href="`#${t.id}`">
            {{ t.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  async asyncData({ $dateFormat }) {
    const post = await $content("POST_URL").fetch();
    return { post };
  },
};
</script>
```

### scss 코드

내 취향데로 조금 다르게 꾸며봤는데 완전 만족할 정도는 아니다. 추후 계속 수정해야지...

```scss [toc.scss]
.toc-wrapper {
  width: $toc-width;
  height: 100%;

  .toc {
    position: sticky;
    top: 0;
    left: 0;
    padding: 2rem;
    color: #eee;

    &__title {
      font-size: 3rem;
      font-weight: bold;
      border-bottom: 2px solid #333;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      text-align: center;
    }

    &__list {
      li {
        line-height: 1.5;
        &.h2 {
          margin-top: 1.5rem;
          margin-left: 1rem;

          &::before {
            content: "▷";
          }
        }

        &.h3 {
          margin-left: 4rem;
          display: inline-block;

          &::before {
            content: "・";
          }
        }
      }
    }
  }
}
```

## 결과 확인

<post-img src="/images/22/02/23/020502.png"></post-img>

좀 더 scss를 잘 수정해서 예쁘게 만들어봐야지
