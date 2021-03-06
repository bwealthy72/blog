---
title: 내가 nuxt content를 쓰는 이유
tags:
  - nuxt
  - nuxt/content
coverImg: /images/22/02/25/130612.png
---

블로그를 만드려는 사람들은 많고 그에 따른 기술도 다양하지만 그 중 블로그 초보인 내가 왜 @nuxt/content를 쓰는지에 대한 얘기를 해보려 한다.

<!--more-->

## Vue / Nuxt

프론트엔드 개발자가 된지 거의 1년이 다 되어간다. 그 중 Nuxt를 이용해 회사 홈페이지를 제작하였고 공부하자마자 그런 사이트를 혼자서 프론트엔드를 담당하여 만든다는 건 엄청난 부담이였지만 그만큼 많은 것들을 알 수 있는 좋은 기회였다.

어쨌든 Nuxt가 가진 장점을 많이 느꼈는데 대표적으로

1. 폴더 구조가 VueJS 보다 체계적이다.
2. pages 폴더 내에 vue 파일을 넣는 것만으로 자동 routing이 가능하다.
3. head 설정이 가능하다.
4. 생각보다 연계된 라이브러리들이 많다.

백엔드에 대한 지식이 적은 나에게 포스팅들을 만들려면 다른 대안이 필요했고 (공부하는게 아니라?) `nuxt/content`라는 패키지를 사용하게 되었다. 이런 것이 Headless CMS라는 것을 블로그 만들면서 알게되었다.

## Headless CMS

먼저 **CMS(Content Management System)은 DB, Backend, Frontend를 모두 포함하는 개념이다.** 이것만 있다면 사이트 하나 만들고 회원, 포스팅 관리등을 할 수 있다.

**Headless CMS는 위 3개중 Frontend를 뺀 것**이다. 즉, DB와 Backend의 역할을 해주는데, Vue나 React 등으로 겉으로 보이는 사이트를 만들었다면 이 Headless CMS로 자신의 컨텐츠를 관리한다.

### 티스토리와 다른 점

사용할 CMS들을 찾아보면서 느낀점은 티스토리와는 좀 다르게 `content-type`이 존재한다. 티스토리에 들어가면 보통 써야할 것들이 정해져있다. 카테고리 / 제목 / 본글.

<post-img src="/images/22/02/25/130635.png"></post-img>

그런데 CMS는 좀 더 우리에게 자유도를 제공한다. 만약 글을 쓸 때 본글을 넣고싶다면 Rich Text를 추가하고, 포스팅의 커버 이미지를 넣고 싶다면 미디어를 추가하는 등 사용자가 포스트에 넣을 타입들을 정할 수 있다.

<post-img src="/images/22/02/25/130646.png"></post-img>

네이버와 티스토리 블로그만 만들어본 내겐 신선한 세계..그래서 Nuxt에 어울릴만한 Headless CMS들을 찾아보았다. 그 중 몇 가지 후보군이 있었고 결국 @nuxt/content를 선택하게 된다.

### 내가 nuxt/content를 선택한 이유

다른 것들도 안 사용해본 건 아니다. 하지만 내가 이를 이용하는 이유는 다음과 같은 조건들이 필요해서였다.

- **나는 Vim 사용자이다.**: 즉 마우스를 쓰는 것을 좀 귀찮아하는 스타일!
- **나는 Markdown 사용자이다.**: Notion이나 Confluence 등을 사용해본 사람들은 알 것이다. 한글이나 워드를 쓰는 것보다 마크다운 형태로 글을 쓰는게 얼마나 편한지..
- **나는 VSCode 사용자이다.**: 누군가 만들어놓은 사이트의 UI에 따라 글을 쓰는게 아니라 나만의 테마, 설정이 있는 에디터에서 블로그 글을 쓸 수 있다.
- **image Ctrl + C, Ctrl V로 업로드가 쉽게 된다.**: 어떤 CMS는 이미지를 업로드 한다음 연결하는 과정이 필요하다.
- 사용자 정의 타입이 자유롭고 쉽다: front matter 위치에 쓴 값이 곧 내가 만든 데이터 타입이다. 그리고 이를 가져오는 것이 쉽다.
  <post-img src="/images/22/02/25/132905.png"></post-img>
- Git 기반이기 때문에 히스토리 관리도 좋다.

이를 모두 만족하는 것이 바로 @nuxt/content이다. Repo에 이미지를 계속 올리면 레포 크기가 걱정될 수 있지만 git lfs와 Netlify media 관리를 이용하면된다.

또한 내용을 년월일로 관리하면, 한 폴더 내에 파일이 너무 많아지는 것도 막을 수 있다.

<post-img src="/images/22/02/25/133445.png"></post-img>

<post-img src="/images/22/02/25/133516.png"></post-img>

## 다른 CMS

그럼에도 불구하고 한 때 관리를 못하겠어서 다른 CMS를 알아본 적이 있다. 결국 돌아왔지만, 어쨋든 내가 정했던 후보군 몇 가지를 정리해보았다.

- Strapi
- Contentful
- ButterCMS
- Ghost
- VuePress

### Strapi

배포하는 걸 좋아하고(?) DB, GraphQL을 사용할 줄 안다면 추천한다. 왜냐하면 호스팅을해서 관리하는 식이기 때문에 해당 사이트에서가 아닌 자신이 프로젝트로 만들고 DB도 설정해서 관리해야하기 때문에 난이도가 좀 있는 편.(그래서 난 빠른 손절)

<post-img src="/images/22/02/25/130702.png"></post-img>

<post-img src="/images/22/02/25/130708.png"></post-img>

### Contentful

로그인만하면 해당 사이트 서버가 포스팅과 이미지들을 관리해준다. 총 25000개까지만(이미지와 글들 개수 각각해서) 포스팅을 몇 천개 써도 넘어갈 일은 없어보이기에 걱정할 필요는 없다.

맘에 드는 점 몇가지라고 하면 포스팅이 자동저장이 되고 버전관리가 된다는 점이며, Preview를 지원한다는 점이다.

단점은 이미지를 넣으려면 일단 파일을 업로드하고 그걸 클릭해서 가져오는 식인데 난 이미지를 클립보드에 복사해서 붙여넣기하는 것을 선호하기 때문에 큰 단점으로 다가왔다. 심지어 preview를 보면서는 새로 이미지를 넣을 수도 없다.

<post-img src="/images/22/02/25/130719.png"></post-img>

<post-img src="/images/22/02/25/130725.png"></post-img>

이미지를 넣는데 title과 설명이 왜 필요한가..

<post-img src="/images/22/02/25/130736.png"></post-img>

### ButterCMS

Editor가 마크다운은 아니다. 티스토리 기본모드 같달까..그러다보니 이미지 copy & paste가 가능하다는 장점이 있고 티스토리처럼 HTML코드로 넣는 방법도 있다.

여기서 느낀 가장 독특한 점 하나를 꼽자면 미리 API에서 응답이 어떻게 나올지 보여준다는 점이다. 이건 좀 홀리몰리 좋아보였다.

<post-img src="/images/22/02/25/130743.png"></post-img>

<post-img src="/images/22/02/25/130754.png"></post-img>

<post-img src="/images/22/02/25/130803.png"></post-img>

### Ghost

이건...사실 Headless CMS가 아니다. 즉 글만 쓰면 사이트 기본적인 템플릿이 나온다. 중요한 특징 중 하나는 바로 Notion같다는 것!! 즉, 마크다운 문법을 입력하면 바로 변환되어 결과가 나타나는 형태인데, 당연히 이미지 copy & paste도 가능하다.

거의 혹해서 이걸로 할까 했지만. Category가 아닌 Tag형태로 포스팅들을 구분한다는 점이 좀 아쉬웠다. 카테고리와 Tag를 별개로 두고 싶기도 해서 어쩔 수 없이 포기했다. 내가 본 것들 중에는 이게 제일 좋았다.

<post-img src="/images/22/02/25/130818.png"></post-img>

<post-img src="/images/22/02/25/130822.png"></post-img>

<post-img src="/images/22/02/25/ghost_editor.gif"></post-img>

### VuePress

nuxt/content보다는 nuxt와 비슷한 역할인데, 아직 사용해보진 않아서 정확히는 잘 모르겠다. 하지만 사용하는 사람들을 보면 jekyll 처럼 정해진 테마로 블로그를 만들 수 있다. 대부분 내가 원하는 것을 만족하지만 스타일링이 자유롭지 않다.

내가 Vue를 공부할 때 많은 도움을 받은 캡틴 판교님의 [Cracking Vue](https://joshua1988.github.io/vue-camp/textbook.html) 사이트가 Vue press인 것 같다.

<post-img src="/images/22/02/25/143556.png"></post-img>

## 마무리하며

나의 스타일에 맞을 사람이 얼마나 될지는 잘 모르겠다. 프로그래밍에 익숙하지 않은 사람에게는 이런 방식이 불편할 수 있다. 하지만 이 방식에 익숙해지고 나면 이것보다 편한 건 없는 것 같다. 있으면 알려주세요 ㅠ
