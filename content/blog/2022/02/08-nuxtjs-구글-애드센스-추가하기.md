---
title: NuxtJS 구글 애드센스 사이트 등록하기
tags:
  - google adsense
  - nuxt
---

블로그가 어느 정도 구색을 갖추기 시작하면서 슬슬 광고를 넣어보려고한다. 광고로 돈을 벌 생각은 아니지만 그나마 돈이 조금 들어오는 게 동기부여가 되고 좋을 거란 생각이 든다.

<!-- more -->

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

## 검토 요청

위와
