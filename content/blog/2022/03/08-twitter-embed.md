---
title: twitter 임베드하는 방법
tags:
  - iframe
  - twitter
coverImg: /images/22/03/08/234820.png
---

트위터를 요즘 시작했는데 내 블로그에도 트위터 글이 나타나면 좋겠다는 생각이 들었다. 그래서 이를 가져오는 방법이 없을까했는데 역시나 있었다!!

<!--more-->

## 트위터 퍼블리싱 사이트 접속

https://publish.twitter.com/ 에 들어가면 다음과 같이 임베드하고 싶은 Twitter URL을 입력하라고 나온다.

<post-img src="/images/22/03/08/234859.png"></post-img>

뭘 입력해야할 지 걱정할 필요가 없다! 예시가 있으니까!

<post-img src="/images/22/03/08/234935.png"></post-img>

그리고 조금 내려가보면 가져오고 싶은 트윗 옵션이 들어있다. 3가지 방식이 있다.

<post-img src="/images/22/03/08/235105.png"></post-img>

- 트윗 하나 가져오기
- 트윗 타임라인 가져오기
- 트윗 버튼 가져오기
  - 트윗 버튼
  - 팔로우 버튼
  - 멘션 버튼
  - 토픽 버튼
  - 메시지 버튼

### 적용해보기

나의 타임라인은 https://twitter.com/BlogWealthy 이기 때문에 이를 적어보면 옵션을 선택하라고 나오는데 당연히 난 타임라인을 원하므로 왼쪽 것을 선택!

<post-img src="/images/22/03/08/235326.png"></post-img>

그러면 HTML Code가 나타나면서 이를 가져오면 어떻게 나타나는지 보인다. 너무 좋군! 하지만 내 블로그가 어두운 테마라서 같이 어두웠으면 좋겠는데 마침 `set customization options`가 있다. 이를 클릭!!

<post-img src="/images/22/03/09/000026.png"></post-img>

### 커스터마이징

크기를 지정하지 않으면 상당히 길게 나와서 **Height를 500px**로 하고, **테마를 Dark**로 했다. **언어는 자동**으로 하면 테마가 자동으로 변한다.

<post-img src="/images/22/03/09/000318.png"></post-img>

`Update`를 클릭하면 Copy Code가 나오는데 복사해주세요.

<post-img src="/images/22/03/09/000437.png"></post-img>

이제 이를 내 사이트에 적용!!

<post-img src="/images/22/03/09/000654.png"></post-img>

좋구만!!

<post-img src="/images/22/03/09/000718.png"></post-img>
