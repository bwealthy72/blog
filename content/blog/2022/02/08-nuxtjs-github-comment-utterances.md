---
title: NuxtJS 블로그에 github 댓글 기능 추가하기 (Utterances)
tags:
  - nuxt
  - github
  - utterances
---

슬슬 블로그의 형태가 갖추어져가고 있다. 그래서 호오오오옥시나 내 블로그를 칭찬(?)하고 싶은 사람을 위한 댓글 기능을 추가해보기로 했다.

<!--more-->

## 다른 댓글 기능 Disqus

블로그를 만들다 보면 많이 쓰는 댓글 기능인데, 내가 생각하기엔 여러가지 단점이 있다.

1. 회원가입을 해야한다. 생소한 사람들이 많다.
2. 테마가 없다. 어두운 내 블로그에 달면 눈에 띌 것이다.
3. 원치 않은 자잘한 것들이 많이 붙어있다. (Favorite, 공유, 정렬 등등..)

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-213040.png"></post-img>

그래서 위 문제를 해결해줄 것이 없나~하고 살펴보다가 github아이디로 하는 [utterances](https://utteranc.es/)를 발견했다!

## Utterances

사전에 보면 **(말로) 표현함, 입 밖에 냄, 발언** 의 뜻을 가지고 있는데 이건 중요하지 않고..어쨋든 위에서 얘기했던 단점들을 해결할 수 있었다.

1. 회원가입 한다는 점은 동일하나 이 블로그를 본다는 건 깃헙 사용자일 확률이 높다.
2. 약간의 테마가 있다.
3. 오픈 소스, 광고 없음, 댓글에 충실함!

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-215555.png"></post-img>

여튼 설치를 해보자.

### 설치

우선 [이곳](https://github.com/apps/utterances)에 들어가 우측에 있는 `Install` 버튼을 누른다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-220509.png"></post-img>

그런 자신의 blog 저장소를 선택하고 Install을 클릭한다. 반드시 public 저장소여야하는데 만약 블로그가 private 저장소에 있다면 public 저장소를 하나 만들어서 사용하면 된다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-220613.png"></post-img>

다시 [utterances](https://utteranc.es/)에 돌아와서 내려가다보면 `configuration`이 나오는데 아까 지정했던 저장소를 적어준다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-220712.png"></post-img>

Github Issue에 이 댓글들이 저장되는 것이기 때문에 이 이슈와 내 글이 매칭되게하는 조건을 정해준다. 나는 한글이 포함되어 있어서 pathname을 할 경우 다음과 같이 나타난다. 그래서 난 head의 title을 포스트 제목으로 하기도 했고 겹치지도 않기 때문에 이 값으로 했다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-222456.png"></post-img>

Issue title contains page pathname을 선택한 경우

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-222707.png"></post-img>

Issue에 label을 붙이고싶은 경우 정하는 값인데 나는 간단히 `Comment`라고 했다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-223454.png"></post-img>

마지막으로 Theme를 정하면 되는데 정말 친절하게도 정할 때마다 자동으로 해당 화면이 바뀌어 테마가 어떻게 될지 보여준다. 난 그 중 `Github Dark`로 정했다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-223818.png"></post-img>

그러면 마지막에 해당 스크립트를 원하는 HTML 위치에 넣으면 자동으로 댓글 기능을 넣어준다.

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-224130.png"></post-img>

이런 식으로 놓어주면 된다.

```html
<div class="comments">
  <script
    src="https://utteranc.es/client.js"
    repo="bwealthy72/blog"
    issue-term="title"
    label="Comment"
    theme="github-dark"
    crossorigin="anonymous"
    async
  ></script>
</div>
```

## 결과

Disqus보다 훨씬 예쁘고 좋다!

<post-img src="/images/08-nuxtjs-github-댓글-기능-추가하기-utterances/220208-224438.png"></post-img>
