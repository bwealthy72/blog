---
title: VueJS 블로그 강의 12] Netlify 도메인 등록하기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

드디어 블로그 배포까지 하였는데요!! 하지만 URL이 영 마음에 들지 않습니다. naver.com 처럼 나만의 독특한 도메인이 갖고 싶은 충동마저 나는데요. 오늘은 자신만의 도메인을 가지는 3가지 방법에 대해 알아보겠습니다.

<!--more-->

1. 도메인을 `xxxx.nelify.app` 형태로 이름 변경하기 (무료)
2. 도메인을 Netlify에서 등록하기 (유료)
3. 도메인을 외부에서 구매하고 Netlify에 등록하기 (유료)

## 도메인을 구매 안하고 변경하기

Netlify에 접속하여 나의 사이트에 들어가면 `Site settings`라는 버튼이 있습니다. 이를 클릭해주세요.

<post-img src="/images/22/03/10/101925.png"></post-img>

그런 다음 `Change site name` 버튼을 클릭합니다.

<post-img src="/images/22/03/10/101954.png"></post-img>

이제 사이트 주소를 정하면 됩니다. 다른 사이트와 중복 안되게 이름을 잘 정해주세요!

<post-img src="/images/22/03/10/102035.png"></post-img>

결과를 확인해보면 제가 정한 이름으로 블로그 주소가 바뀌어있네요! 간단하죠!?

<post-img src="/images/22/03/10/102105.png"></post-img>

## Netlify 도메인 구매하기

Netlify에서 도메인을 구매할 수도 있는데요! 뿐만아니라 인증서도 발급해줘서 `https` 프로토콜로 주소를 가질 수 있습니다!

Netlify에 접속하여 나의 사이트에 들어가면 `Site settings`라는 버튼이 있습니다. 이를 클릭해주세요.

<post-img src="/images/22/03/10/101925.png"></post-img>

그런 다음 `Domain management`에서 `Domains`에 들어가면 우측에 `Custom domains` 영역이 있는데요. 여기서 `Add custom domain` 버튼을 눌러줍니다.

<post-img src="/images/22/03/10/102837.png"></post-img>

여기에 자신이 원하는 도에민을 www 포함해서 `www.(원하는 도메인)`을 적어주고 `Verify`를 클릭합니다. `.com`, `.app`, `.dev` 등 많이 있겠지만 나중에 검색 노출이 잘되려면 `com`으로 끝나는 것이 좋습니다.

<post-img src="/images/22/03/10/102944.png"></post-img>

제가 정한 도메인이 가능하다고 나타나네요! 저같은 경우 가격이 처음엔 12 달러 그 다음해부터 갱신 때마다 17달러가 든다고 나옵니다. (도메인마다 다를 수 있습니다) 이 정도면 치킨 가격이죠? 이제 바로 결제를!! 하고 싶지만..우리 결제 수단이 등록되어 있지 않아서 먼저 `Add payment method`를 클릭합시다.

<post-img src="/images/22/03/10/103302.png"></post-img>

그러면 카드 관련 정보들을 입력하라고 나오는데 예시처럼 잘 적어주시면 됩니다.

<post-img src="/images/22/03/10/103344.png"></post-img>

`Save`를 누르고 나면 다음과 같이 `Register domain now for $11.99` 버튼이 활성화됩니다. 이를 누르면 결제가 진행됩니다.

<post-img src="/images/22/03/10/103427.png"></post-img>

만약 https 프로토콜을 사용하고 싶다면 인증서도 발급하기 위해 `Verify DNS configuration`을 클릭합니다.

<post-img src="/images/22/03/10/103456.png"></post-img>

새로고침을 하고 다시 `Custom domains`를 보면 저희의 도메인 주소가 등록된 것을 볼 수 있습니다. 메인 도메인은 `www.blogwealthy.com`이지만 `blogwealthy.com`로도 접속이 가능하다고 나와있네요.

<post-img src="/images/22/03/10/104147.png"></post-img>

## 외부에서 산 도메인을 Netlify에 가져오기

외부에서 도메인을 살 수 있는 방법은 다양한데요. 저는 그 중 [google domain](https://domains.google/)에서 구매했다고 가정하겠습니다. 우선 자신의 Netlify 사이트에서 `Domain setting` 버튼을 클릭합니다.

<post-img src="/images/22/03/10/104446.png"></post-img>

그런 다음 `Custom domains`라는 섹션에서 `Add custom domain`을 클릭합니다.

<post-img src="/images/22/03/10/104516.png"></post-img>

저 같은 경우 google domain에서 `blog-coding.com`이라는 도메인을 구매했는데요.

<post-img src="/images/22/03/11/171337.png"></post-img>

`Custom domain`에서 이 주소를 입력한 다음, `Verify`를 클릭합니다.

<post-img src="/images/22/03/10/104605.png"></post-img>

당연히 이 도메인은 제가 샀기 때문에 이미 등록되어 있다고 나옵니다. 이를 Netlify에 연결하기 위해 `Add domain`을 클릭해줍시다.

<post-img src="/images/22/03/11/171651.png"></post-img>

하단에 `Name servers` 영역에 4개의 네임 서버가 있습니다. 이를 구글 도메인의 `맞춤 네임서버`에 들어가면 이를 입력하는 란이 있는데 각각 입력해주세요.

<post-img src="/images/22/03/11/172226.png"></post-img>

<post-img src="/images/22/03/11/172538.png"></post-img>

만약 네임서버를 사용중이 아니라면 경고가 나올텐데 `이 설정으로 전환`을 눌러주시면 됩니다.

<post-img src="/images/22/03/11/172724.png"></post-img>

대략 1 ~ 2분 뒤에 `Custom domain`에 들어와보면 활성화되어 있는 걸 볼 수 있습니다.

<post-img src="/images/22/03/11/173823.png"></post-img>

## 마무리하며

이번 시간에는 자신만의 도메인을 만드는 방법에 대해 알아보았습니다. 이제 도메인도 완성되었네요!! 하지만 다른 사람이 저희 페이지를 아직 찾지 못하는데요! 다음 시간에는 구글 검색 엔진이 우리 블로그를 찾도록 등록하는 방법에 대해 알아보겠습니다!
