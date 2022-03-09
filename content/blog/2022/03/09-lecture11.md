---
title: VueJS 블로그 강의 11] Netlify로 배포하기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

Heroku, Vercel, Netlify 등 쉽게 사이트를 배포해주는 사이트는 많이 있는데요. 그 중 많이 사용되고 편한 Netlify에 대해 알아보겠습니다.

<!--more-->

## Github Repository 연결하기

Netlify는 Github이나 GitLab, Bitbucket으로 우리의 프로젝를 가져와 자동으로 빌드한 다음 배포까지 해줍니다. 저는 Github으로 만들겠습니다. 개인 Repo를 만드는데 어려움이 없으신 분들은 생략하셔도 됩니다.

### 회원가입하기

먼저 [Github 페이지](https://github.com/)에 들어가서 우측 상단 `Sign up` 버튼을 눌러주세요.

<post-img src="/images/22/03/09/190245.png"></post-img>

**email, 비번, 이름을 입력**하고 이메일로 업데이트나 공지를 받는 가에 대한 질문에 **n(no)**를 적고 Continue를 눌러줍니다.

<post-img src="/images/22/03/09/190430.png"></post-img>

### 저장소(Repository) 만들기

그런 다음 왼쪽에 **Create repository**버튼을 누르거나 우측에 **New repository**를 눌러주세요.

<post-img src="/images/22/03/09/190814.png"></post-img>

이제 저장소를 만들어야하는데 저는 `blog`라고 간단히 짓겠습니다.

<post-img src="/images/22/03/09/191125.png"></post-img>

이제 저장소를 만들어졌으니 올려볼까요?

<post-img src="/images/22/03/09/191352.png"></post-img>

### 저장소에 Push하기

nuxt 프로젝트를 만들었다면 자동으로 `.git`이 만들어져있고 `.gitignore`를 통해 불필요한 파일이 commit되지 않게 해줍니다. 아직 한 번도 커밋하지 않았다면 이제 해볼까요?

```
git add .
git commit -m "first commit"
git branch -M main
git remote add origin (자신의 blog Repository 주소)
git push -u origin main
```

<post-img src="/images/22/03/09/191655.png"></post-img>

## Netlify 설정하기

이제 Repository를 만들었으니 Netlify에 사이트를 배포해볼까요?

### 회원가입

여기서도 회원가입을 해야하지만 어렵지 않습니다. [Netlify 사이트](https://www.netlify.com/)에 들어간 다음 우측 상단의 `Sign up`을 클릭해주세요.

<post-img src="/images/22/03/09/192010.png"></post-img>

저희가 Github으로 진행했으니 Github으로 가입하곘습니다.

<post-img src="/images/22/03/09/192326.png"></post-img>

Authorize 화면이 나오는데 `Authorize netlify`를 클릭합니다.

<post-img src="/images/22/03/09/192417.png"></post-img>

저희의 정보를 좀 가져가려하시는 것 같은데 상황에 맞게 적어주세요. 크게 중요한 것은 아닙니다. 그리고 team space 이름을 적으라고 하는데 간단히 `Blog workspace`라고 하겠습니다.

<post-img src="/images/22/03/09/192648.png"></post-img>

### 프로젝트 연결하기

바로 프로젝트를 연결하는 페이지가 나오는데 `Import from Git`을 클릭해주세요.

<post-img src="/images/22/03/09/192828.png"></post-img>

저희는 Github으로 만들었기 때문에 Github을 선택해주세요!

<post-img src="/images/22/03/09/192938.png"></post-img>

이번엔 저장소에 대한 접근 권한을 부여합니다. `Authorize Netlify`를 클릭합니다.

<post-img src="/images/22/03/09/193118.png"></post-img>

이제 저희가 만들었던 저장소를 접근할 수 있도록 Netlify를 설치합니다. `Install`을 눌러주세요

<post-img src="/images/22/03/09/193223.png"></post-img>

이제 조금 기다려보면 아래에 저희가 만들었던 blog 저장소가 나타나는 것을 볼 수 있는데요. 그 저장소를 클릭해줍니다!

<post-img src="/images/22/03/09/194547.png"></post-img>

이제 배포 setting 화면이 나오는데 Owner나 Branch는 하나밖에 없기 떄문에 놔두고, 하단에 **Build command를 npm run generate**로 해주시고 **Publish directory를 dist**로 해줍니다. 그런 다음 `Deploy site` 클릭

<post-img src="/images/22/03/09/195142.png"></post-img>

### 사이트 확인

이제 저희의 사이트 배포가 완료되었습니다. 아래에 Production deploys를 보시면 무언가 Building 되고 있다고 나타나네요

<post-img src="/images/22/03/09/200052.png"></post-img>

이를 클릭하면 배포 과정이 로그로 나타나는 것을 볼 수 있습니다.

<post-img src="/images/22/03/09/200134.png"></post-img>

다시 대시보드로 돌아와보면 사이트가 배포되어있다고 나와있습니다. URL을 클릭해볼까요?

<post-img src="/images/22/03/09/200205.png"></post-img>

오마이갓 만들었던 홈페이지가 나타났네요!!

<post-img src="/images/22/03/09/200358.png"></post-img>

## 마무리하며

배포는 했는데 URL이 마음에 안듭니다. 결국 tistory나 네이버처럼 해당 사이트의 이름이 들어가네요.

다음 시간에는 자신만의 도메인으로 바꾸는 방법에 대해 알아보겠습니다!
