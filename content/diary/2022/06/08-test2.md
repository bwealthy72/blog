---
title: 그냥 코드를 추가
coverImg: /images/22/04/22/195853.png
---

블로그를 하면서 카테고리를 만들었으나 내부 좀 더 세세한 구분을 위해 태그를 사용하곤 한다. 티스토리에서 보면 단순히 글 나열만 되어 있어서 좀 심심한 감이 없지 않아 있다. 그래서 찾아보다 발견한 [d3-cloud](https://github.com/jasondavies/d3-cloud). 이것을 어떻게 구현했는지 정리한 글이다.

<!--more-->

### Javascript - layout 생성

이제 이 글자들을 이용해 클라우드를 생성한다.

```js
const cloud = require("d3-cloud");

cloud() // Cloud layout 생성
  .words(words) // layout에 넣을 단어들
  .padding(1) // 단어들의 사이 공간 좁게 (1)
  .font("Impact") // 폰트 serif 대신 Impact
  .fontSize((d) => {
    return d.size;
  }) // 폰트 크기 결정 words 내에 size 사용
  .on("end", end) // 배치가 끝나면 end 함수 부르기
  .start() // 배치 시작
  .stop(); // 계속 호출하지 않고 한번만 호출할 것이기 때문에 바로 stop()
```
