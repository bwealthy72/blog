---
title: NuxtJS에서 구글 애널리틱스 적용하기
tags:
  - nuxt
  - analytics
coverImg: /images/22/02/28/095920.png
---

티스토리나 네이버에서는 일 방문자 수 같은 표시가 있지만 nuxtjs로 만든 블로그는 그런 기능이 없기 때문에 구글 애널리틱스를 이용해야한다.

<!--more-->

## 구글 애널리틱스

**구글 애널리틱스**는 자신의 사이트를 방문하는 사람들의 데이터를 수집하고 분석해주는 웹로그 분석 툴이다. 다른 Analytics도 있지만, 오래 전에 만들어졌고 꾸준히 업데이트 되어 가장 인기 있는 서비스이다.

### 구글 애널리틱스 사이트 설정

먼저 [구글 애널리틱스](https://analytics.google.com/analytics/web/provision/?authuser=1#/provision) 사이트에 들어가서 `측정 시작`을 누른다.

<post-img src="/images/22/02/28/100850.png"></post-img>

처음 만들었기 때문에 계정이 없어서 추가해야한다. 계정이름은 자신이 원하는 것으로 적고 `다음`을 누른다.

<post-img src="/images/22/02/28/101130.png"></post-img>

그리고 웹 사이트 구분용으로 사용하는 속성을 지정하고 보고 시간대와, 통화는 원하는 데로 설정

<post-img src="/images/22/02/28/101409.png"></post-img>

나는 블로그 용도이다보니 비즈니스 정보는 `인터넷 및 통신`, 규모는 `작음`, 사용 목적을 `내 사이트 또는 앱에 대한 고객 참여도 측정`을 선택

<post-img src="/images/22/02/28/101526.png"></post-img>

서비스 약관 동의

<post-img src="/images/22/02/28/101622.png"></post-img>

혹시 이메일로 받고싶은 소식이나 혜택을 선택하는 것이지만, 난 아무것도 필요없어서 그냥 체크없이 `저장`을 클릭

<post-img src="/images/22/02/28/141025.png"></post-img>

이러고 나면 데이터 스트림 화면이 나온다. 그 중 플랫폼 선택하는 부분 중 `웹`을 선택한다.

<post-img src="/images/22/02/28/101819.png"></post-img>

웹 사이트 URL과 스트림 이름을 적고 `스트림 만들기`를 누른다.

<post-img src="/images/22/02/28/102000.png"></post-img>

그러면 스트림 세부정보가 나타나는데 여기서 `전체 사이트 태그(gtag.js) 웹사이트 작성 도구 또는 CMS에서 호스팅하는 사이트를 사용하는 경우 이 태그 사용`을 클릭합니다.

<post-img src="/images/22/02/28/142534.png"></post-img>

클릭하고 나면 아래의 내용을 자신 사이트 `head`에 추가하라고 나옵니다.

<post-img src="/images/22/02/28/142640.png"></post-img>

### NuxtJS에서 적용하기

우선 `nuxt.config.js`에서 다음 내용을 추가해줍니다.

```js [nuxt.config.js]
export default {
  // ...

  head: {
    meta: [
      script: [
        {
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=G-RXEC8C1Z2C",
        }
      ],
    ],
  },
```

프로젝트 루트 위치에 `app.html`을 만든 후 다음과 같이 내용을 추가해줍니다.

```html [app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}

    <!--------------- 구글 애널리틱스 --------------->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-RXEC8C1Z2C");
    </script>
    <!------------------------------------------->
  </head>

  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

이후 이렇게 배포하고 사이트를 좀 돌아다녀보신다음 보고서에 `실시간`을 보시면 다음과 같이 기록이 남는 것을 볼 수 있습니다.

<post-img src="/images/22/02/28/143608.png"></post-img>
