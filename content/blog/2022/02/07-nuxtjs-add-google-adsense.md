---
title: NuxtJS 구글 애드센스 사이트 등록하기
tags:
  - nuxt
  - google adsense
---

블로그가 어느 정도 구색을 갖추기 시작하면서 슬슬 광고를 넣어보려고한다. 광고로 돈을 벌 생각은 아니지만 그나마 돈이 조금 들어오는 게 동기부여가 되고 좋을 거란 생각이 든다.

<!--more-->

## 구글 애드센스 등록하기

### 사이트 접속하기

[구글 애드센스](https://www.google.com/intl/ko_kr/adsense/start/)에 접속하여 시작하기 버튼을 누른다.

<post-img src="/images/08-구글-애드센스-추가하기/220207-134644.png"></post-img>

### 사이트 정보 입력

다음과 같이 정보를 입력해준다. 나는 뭔가 실적 개선을 위한 제안은 몇 번 봤지만 도움은 안되는 것 같아서 안 받는 쪽으로 했다. `애드센스 사용 시작` 버튼을 눌러준다.

<post-img src="/images/08-구글-애드센스-추가하기/220207-135005.png"></post-img>

### 사이트 연결하기

홈에 보면 여러가지가 있지만 그 중에 애드센스에 사이트 연결하라고 나오는 부분이 있다. `시작하기` 버튼 클릭!

<post-img src="/images/08-구글-애드센스-추가하기/220207-140637.png"></post-img>

### 애드센스 코드를 사이트에 추가하기

그러면 화면에 다음과같이 애드센스 코드 내용부분이 나온다. 일단 닫지말고 프로젝트로 넘어가자.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-140924.png"></post-img>

## Nuxt 설정

`nuxt.config.js`의 head에 넣으면 일단 검토요청은 할 수 있지만 나중에 광고를 추가할 때 중복호출 문제로 광고가 제대로 안 나올 수 있다. 그래서 이 경우에는 다른 방법을 사용한다.

### app.html

NuxtJS에서 app.html을 root로 사용한다. 프로젝트 폴더 내에 `app.html` 파일을 생성하여 다음과 같이 내용을 넣는다. 여기서 `ca-pub-8123307370591079` 부분은 사이트에서 복사할 때 있던 문자열이므로 그 부분을 가져와서 넣어줘야한다.

```html [app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
    <script
      data-ad-client="ca-pub-8123307370591079"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
  </head>

  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 광고 적용하기

위와 같이 적용하여 사이트를 배포한 뒤 애드센스 사이트로 돌아와 검토 요청 버튼을 클릭한다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-141732.png"></post-img>

### 기다리기

검토 요청한다고 바로 적용되는 것이 아니다. 보통 며칠이 걸리며 문제가 있을 시 이메일로 날아오니 이제 기다리면 된다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-141929.png"></post-img>)

## 광고용 컴포넌트 만들기

요즘 사이트들 보면 광고가 엄청 덕지덕지 붙어있는 블로그가 많다. 나도 그렇게 하면 돈을 많이 벌지는 모르겠지만 너무 블로그가 더러워질 것 같아서 Header, Footer 두 곳만 작게 넣기로했다.

### 디스플레이 광고 만들기

애드센스 사이트에 다시 돌아와 `광고/개요`에서 `광고 단위 기준` 탭을 클릭한 다음 `디스플레이 광고`를 클릭한다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-142824.png"></post-img>

위에서도 얘기했듯이 작은 광고를 넣어야하기 때문에 수평형을 선택하고 이름을 `Header 광고`라고 넣는다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-143545.png"></post-img>

### 코드 내용 옮기기

그러면 아래와 같이 태그 내용을 추가하라고 한다. 여기서 `data-ad-slot`과 `data-ad-client`의 내용만 잘 기록해둔다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-143848.png"></post-img>

### 광고용 Vue 컴포넌트 만들기

광고 태그는 여러 군데 사용할 것 같아서 컴포넌트로 별개로 만으었다. `components` 폴더에 `Ad.vue` 파일로 만들어서 다음과 같이 내용을 넣어준다.

이 때 `data-ad-client` 부분에 자신의 것을 채운다.

```vue [components/Ad.vue]
<template>
  <div class="site-ad">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
      :data-ad-slot="slot"
      :data-ad-format="format"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  props: {
    format: {
      type: String,
      default: "auto",
    },
    adslot: {
      type: String,
      required: true,
    },
  },
  mounted() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Adsbygoogle error is ", error);
    }
  },
};
</script>
```

### 컴포넌트 사용하기

적용하기 원하는 위치에 다음처럼 컴포넌트를 넣어줍니다. 중요한 것은 `data-ad-slot` 은 만든 광고마다 다른 값을 들고 있다. 예를 들어 디스플레이 광고를 `footer 광고` 라는 이름으로 하나 더 만들면 이 slot값은 달라진다.

<post-img src="/images/08-nuxtjs-구글-애드센스-추가하기/220207-144939.png"></post-img>

위 slot값을 예로 들면 컴포넌트를 사용한다면 다음과 같이 사용하면 된다.

```vue
<!-- Footer -->
<Ad adslot="3445169841"></Ad>

<!-- Header -->
<Ad adslot="3845475151"></Ad>
```

## 광고 되면

더 열심히 블로그 해야지
