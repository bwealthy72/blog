---
title: Nuxt SSG의 한계
---

블로그를 만들었지만 아직 모바일에 최적화된 화면을 만들지 못했다. 며칠동안 계속 여러가지 방법을 시도했지만 맘에 드는 방법을 찾지 못했다.

<!--more-->

Nuxt에서 Netlify로 배포하려면 정적 사이트 생성(Static Site Generate) 방식을 사용해야한다.

미리 HTML, CSS, Javascript로 만들어놓은다음 바로 불러오기 때문에 빠른 속도를 자랑하지만, 지금 내 블로그를 만들면서 한 가지 문제점이 생겼다.

바로 Desktop 환경과 Mobile 환경에서의 화면이 너무나 차이난다는 것

그러다보니 CSS media query로 필요에 따라 다르게 보여주기에는 수정할 부분도 너무 많고 Desktop에서 불러올 때 Dock이나 Header, 배경 이미지 등 리소스를 불필요하게 많이 불러온다.

Client에서 mobile인지 userAgent로 확인하거나 하는 등으로 확인하는 방법을 해보려 했으나 SSG는 이미 그려놓았기 때문에 이런게 상관이 없었다.

처음 그렸을 떄 환경(desktop)에만 맞춰서 userAgent 값을 갖다보니 무조건 Desktop인 값을 가졌다.

어차피 나중에 유저가 상호작용할 수 있는 요소들(방명록, 채팅 등)을 만드려면 백엔드 서버와 DB가 필요하고 결국 SSR(Server Side Rendering)과 CSR(Client Side Rendering)이 섞인 방식으로 가야할 것 같다.

하지만 Netlify에서는 이게 불가능하니 Vercel을 채택할 예정. Nuxt3에서는 Netlify에 SSR로 배포가능하다지만 아직은 이른 것 같고... 이참에 Express나 공부해봐야지!
