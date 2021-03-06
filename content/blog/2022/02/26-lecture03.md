---
title: VueJS 블로그 강의 3] Nuxt 프로젝트 만들기
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

이번 시간에는 본격적으로 Nuxt 프로젝트를 만들어보도록 하겠습니다. 이제 블로그를 본격적으로 만드는 거에요!! 요호홓

<!--more-->

## Nuxt 프로젝트 만들기

프로젝트를 만들기에 앞서 우리가 설치했던 NVM으로 NodeJS 버전을 변경하겠습니다.

### NodeJS 버전 변경하기

이전 시간에 nvm 명령어로 원하는 버전 환경으로 변경할 수 있었습니다.

```bash
$ nvm use --delete-prefix v14.18.2
```

<post-img src="/images/22/02/26/174428.png"></post-img>

### nuxt 설치

`vuelog`(vue + blog)라는 이름으로 프로젝트를 만들어보겠습니다. 원하는 폴더로 이동한 뒤 다음과 같이 명령어를 실행해주세요.

```bash
npm init nuxt-app vuelog
```

그러면 무언가 선택해야하는 것들이 나오는데 엔터, 스페이스바, 화살표키를 이용하시면 됩니다.

- **엔터**: 선택 후 다음으로 넘어가기 (다중 선택일 때, 그냥 다음으로 넘어가기)
- **스페이스바**: 다중 선택일 때 선택하는 기능
- **화살표키**: 위아래로 이동

<post-img src="/images/22/02/26/175341.png"></post-img>

혹시나 어떤 건지 잘 모르실 분들을 위한 gif도 보여드릴게요!

<post-img src="/images/22/02/26/nuxt-project.gif"></post-img>

네 설치가 다되었다고 나오면서 어떤 명령어 예시가 나옵니다.

<post-img src="/images/22/02/26/180209.png"></post-img>

### 예시 프로젝트 실행해보기

저희는 그 중 개발 서버를 실행해볼겁니다. 다음과 같이 명령어를 넣어주세요

```bash
cd vuelog # 프로젝트 폴더로 이동
npm run dev # 개발 서버 실행하기
```

그런 다음 브라우저를 열어서 [http://localhost:3000](http://localhost:3000)에 접속해보겠습니다.

<post-img src="/images/22/02/26/180806.png"></post-img>

미리 만들어진 컴포넌트로 만들어진 페이지입니다. 이제 프로젝트를 수정하여 이 페이지들을 바꿔볼겁니다!

## 프로젝트 구조 살펴보기

그러려면 프로젝트 구조가 어떻게 이루어져있는지 살펴봐야겠죠! 폴더들을 보면 다음과 같습니다.

<post-img src="/images/22/02/26/192657.png"></post-img>

어떤 용도인지 간략히 볼까요?

### 폴더

- `.nuxt`: 빌드 결과물 폴더. `npm run dev`나 `npm run build`를 실행할 때 생성됩니다.
- `components`: 컴포넌트들을 모아놓은 폴더
- `content`: md(markdown), json 파일 등 컨텐츠 폴더
- `node_modules`: npm을 통해 설치한 패키지들이 들어간 폴더
- `pages`: 뷰 담당을 하는 컴포넌트들을 모아놓은 폴더
- `static`: 빌드했을 때 `https://(나의 서버)/파일명` 처럼 접근할 수 있는 파일들입니다. favicon이나 robots.txt 등 외부에서 접근할 수 있게 파일명이 바뀌지 않습니다.
- `store`: vuex 폴더

### 파일

- `.editorconfig`: Editor에 관계없이 코드스타일을 유지하도록 돕는 파일
- `.gitignore`: git에서 무시할 파일, 폴더 들을 설정하는 파일
- `jsconfig.json`: Javascript를 사용할 때 Editor 설정 파일, 컴파일 할 때 alias를 한다거나 코드 자동완성에 어느 경로를 포함하고 제외할지 등을 설정할 수 있습니다.
- `nuxt.config.js`: nuxt의 설정 파일. 사용할 플러그인이나 routing 등 설정들이 있습니다.
- `package.json`: 설치된 패키지 목록

아직 없지만 다음 두 개의 폴더도 추가로 만들겁니다. 이전 버전에는 있었으나 현재 이 강의에서 진행하는 버전(nuxt@2.15.8)에서는 기본 폴더에서 제거된 것 같습니다.

- `assets`: css, image, font 등이 들어간 리소스 폴더(파일명이 달라질 수 있습니다)
- `layouts`: 레이아웃 컴포넌트 폴더. 페이지 컴포넌트의 템플릿의 역할을 합니다.

기존의 Vue와 미묘하게 뭔가 다르죠? 하지만 걱정마세요. 생각보다 별게 없거든요!

## 마무리하며

오늘은 Nuxt 프로젝트를 만들어봤습니다. Vue와는 다른 라우팅 방식에 대해 배워보면서, main 화면, 포스트 리스트, 포스트 화면 3개를 만들어보겠습니다.

<post-img src="/images/meme/제리인사.gif"></post-img>
