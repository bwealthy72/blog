---
title: VueJS 블로그 강의 13] 구글 서치콘솔 등록하기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

겨우 사이트를 만들었는데 아무도 못 찾는다면 너무 슬픈일겠죠. 검색에 노출될 수 있도록 검색 엔진에 등록하는 방법에 대해 알아보겠습니다.

<!--more-->

제가 이 글을 쓰는 현재(2022.03.11)까지는 네이버에는 노출이 잘 안되고 있습니다. 하지만 구글 쪽은 노출되고 있는데요.

<post-img src="/images/22/03/11/182402.png"></post-img>

<post-img src="/images/22/03/11/183103.png"></post-img>

네이버 블로그가 아니라서 잘 안되는 것 같아 아쉽지만...구글은 그래도 잘되는 거 같네요! 오늘은 대표적인 네이버, 구글에 대해 알아보겠습니다.

## 네이버 검색 엔진 등록하기

네이버에서는 [웹마스터 도구](https://searchadvisor.naver.com/console/board)를 통해 사이트를 등록할 수 있는데요! 네이버 아이디를 로그인하면 사이트를 등록하라고 나옵니다. 자신의 블로그 주소를 입력합시다.

<post-img src="/images/22/03/11/190059.png"></post-img>

그러면 네이버는 우리가 등록하려는 사이트를 소유한 주인인지 확인하는 방법을 알려주는데요. 간단한 방법은 `HTML 태그`를 이용하는건데요. 말 그대로 해당 태그를 우리의 사이트에 넣으면 됩니다.

<post-img src="/images/22/03/14/162819.png"></post-img>

### meta 태그 설정하기

Nuxt에서는 컴포넌트에서 `head`를 이용하면 쉽게 `head` 안에 태그를 추가할 수 있습니다. `nuxt.config.js`에서도 추가할 수 있는데 이 경우 default로 모든 페이지에 들어간다고 생각하시면 됩니다.

<post-img src="/images/22/03/11/190547.png"></post-img>

여기에 네이버가 확인할 수 있게 메타데이터를 넣어줄 겁니다. 저 같은 경우 이런 내용을 채우라고 되어있는데요.

<post-img src="/images/22/03/11/190616.png"></post-img>

그러면 `nuxt.config.js`에 다음과 같이 넣어주면 됩니다!

<post-img src="/images/22/03/11/190835.png"></post-img>

### 배포하기

이전에 배포했던 것처럼 commit 후 Push해줍시다.

```bash
git add .
git commit -m "naver 웹마스터 등록을 위한 meta 데이터 추가"
git push origin main
```

Netlify에 들어가서 `Builds` 란을 보면 저희의 블로그가 배포중인 것을 알 수 있습니다.

<post-img src="/images/22/03/11/190923.png"></post-img>

`Completed`된 것을 확인하셨다면 배포가 된 것입니다!

<post-img src="/images/22/03/11/191131.png"></post-img>

### 소유확인하기

다시 네이버 웹마스터에 돌아와서 소유확인 버튼을 누르면!?

<post-img src="/images/22/03/11/191845.png"></post-img>

소유 확인이 완료되었다고 나옵니다.

<post-img src="/images/22/03/11/191905.png"></post-img>

이렇게 사이트가 등록된 게 나옵니다!

<post-img src="/images/22/03/14/163056.png"></post-img>

## 구글 검색 엔진 등록하기

구글도 네이버와 크게 다르지 않습니다. [구글 서치 콘솔](https://search.google.com/u/2/search-console/welcome?hl=ko)에 들어가서 `URL 접두어`에 우리의 블로그 주소를 적어준 다음 `계속`을 클릭해주세요.

<post-img src="/images/22/03/14/163450.png"></post-img>

자신의 블로그임을 증명하는 방법이 여러가지가 있는데 HTML 태그가 개인적으로 가장 쉬웠습니다. `HTML 태그`를 클릭해주세요.

<post-img src="/images/22/03/14/163639.png"></post-img>

아래 나온 것처럼 태그를 추가하면 됩니다.

<post-img src="/images/22/03/14/163738.png"></post-img>

### meta 태그 설정하기

네이버에서 했던 것처럼 `nuxt.config.js`에 다음과 같이 내용을 추가합니다. `content` 값은 본인 것에 맞게 바꿔주세요.

<post-img src="/images/22/03/14/164342.png"></post-img>

그런 다음 commit 후 push 해줍시다. 배포된 것을 확인하셨다면 다시 구글 서치콘솔에 돌아와서 `확인`을 클릭해주세요.

<post-img src="/images/22/03/14/164704.png"></post-img>

소유권이 확인되었습니다!!

<post-img src="/images/22/03/14/164725.png"></post-img>

## 마무리하며

네이버나 구글이나 검색 엔진이 우리 글들을 크롤링하고 검색에 노출시켜주기까지 며칠이 걸릴 수 있습니다. (전 기대감에 수시로 들어와서 확인했었습니다..하하하핳...네 재미없구요)

<post-img src="/images/22/03/14/164928.png"></post-img>

기본적인 vue로 블로그 만드는 방법에 대해 알아보았습니다. 다음 시간에는 블로그를 꾸미는 데 필요한 것들을 좀 더 알아보겠습니다.
