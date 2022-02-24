---
title: NuxtJS에서 Adsense 승인 이후 ad.txt 문제 해결하기
tags:
  - nuxt
  - adsense
coverImg: /images/22/02/24/145646.png
---

Adsense 승인이 난 이후 기쁜 마음으로 들어가봤으나 상단에 빨간 메시지로 ads.txt 문제를 해결해야한다고 나타난다. 심지어 해결하지 않으면 수익에 심각한 영향을 미칠 수 있다는데, 얼른 해결해야하지 않겠는가!? (아직 수익 1도 없지만..)

<!--more-->

## ads.txt 다운로드

우측 상단에 `지금 해결하기`를 누르거나 우측의 `사이트`를 누르면 자세한 설명이 나온다.

<post-img src="/images/22/02/24/162331.png"></post-img>

다른 건 볼 필요없이 `다운로드` 버튼을 눌러서 `ads.txt`를 다운로드하면 된다. 내용은 별거 없다. (혹시 이거 노출되면 안되는 건가?)

```txt
google.com, pub-8123307370591079, DIRECT, f08c47fec0942fa0
```

## Nuxt 프로젝트에 적용하기

`https://(본인의 사이트)/ads.txt`에 접속하면 위 파일에 접근할 수 있게만 하면 된다. Nuxt에서는 이를 **static 폴더에 넣으면 된다.**

<post-img src="/images/22/02/24/162835.png"></post-img>

## 기다리기

배포 이후에 약간의 시간을 기다리고 나면 해당 에러 메시지가 나타나지 않는다. (깔끔!)

<post-img src="/images/22/02/24/163221.png"></post-img>
