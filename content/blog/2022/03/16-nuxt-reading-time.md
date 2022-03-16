---
title: vue(nuxt) 글에서 읽는 시간(reading time) 넣기
tags:
  - vue
  - nuxt
  - lecture
coverImg: /images/22/03/16/211609.png
---

한국에서는 별로 없지만 외국 블로그들을 보면 reading time이라고 해서 읽는데 얼마나 걸리는 지 나와있다. (하지만 영어라는 게 함정) reading-time 패키지와 nuxt hook을 이용하면 쉽게 이를 추가할 수 있다.

<!--more-->

## reading time 적용하기

[Medium](https://medium.com/) 사이트에 보면 작성 날짜 옆에 읽는데 걸리는 시간이 나온다. 이와 비슷한 방식으로 시간을 측정해주는 [reading-time](https://github.com/ngryman/reading-time)이란 패키지가 있는데 텍스트로 넣어야 좀 더 정확한 시간이 나온다. 하지만 마크다운이나 html도 사용할 수 있다.

<post-img src="/images/22/03/16/211744.png"></post-img>

### 설치

npm을 통해 설치하는 방법이라 아주 쉽다.

```bash
npm install reading-time
```

### nuxt에 적용하기

API를 통해 글을 가져왔다면, 단순히 해당 내용을 넣어주기만 하면 된다.

```vue
<script>
async asyncData() {
  const readingTime = require("reading-time");
  const result = await axios.get(`https://my-api/posts/${postID}`)
  console.log(result);
}
</script>
```

그러면 다음과 같은 값들이 나오는데 `text` 값을 사용하면 된다!

```
{
  text: '6 min read',
  minutes: 5.135,
  time: 308100,
  words: 1027
}
```

### nuxt content에서 reading time 추가하기

nuxt content만의 훅이 하나 따로 있는데 이를 이용하면 `$content` 함수를 fetch 할 때 같이 포함시켜서 값을 내보낼 수 있다. `nuxt.config.js`에 다음과 같이 추가하면 끝!

```js [nuxt.config.js]
hooks: {
  "content:file:beforeInsert": (document) => {
    if (document.extension === ".md") {
      const { text } = require("reading-time")(document.text);

      document.readingTime = text;
    }
  },
},
```
