---
title: VueJS 블로그 강의 2] nodejs, npm 설치
tags:
  - vue
  - lecture
  - nuxt-lecture
coverImg: /images/22/02/23/020715.png
---

이번 글에서는 nodejs, npm 설치하는 방법에 대해 알아보겠습니다. VueJS를 사용하신다면 이미 설치가 되어있겠지만, 이 강좌에서 사용하는 버전에 맞추는게 나중에 패키지를 설치할 때 문제 안 생기고 좋을겁니다!

<!--more-->

## 강좌에서 사용하는 버전

이 강좌에서는 다음 버전을 사용합니다.

- [node: v14.18.2](https://nodejs.org/dist/v14.18.2/)
- npm: 6.14.15

> 개인적으로 같이 사용하는 패키지들에 있어서 이 버전이 가장 안정적이였습니다. 이후 Nuxt3의 공식 버전이 나오고 관련된 필요한 패키지들이 나왔을 때 최신 버전으로 다시 강좌와 블로그를 만들겠습니다.

위 링크를 클릭하면 원하는 OS에 맞게 설치할 수 있습니다. 그리고 Node를 설치하면 npm도 그에 맞게 같이 설치됩니다. 만일 이렇게 설치하실 분들은 여기까지만 하시만 하면됩니다.

<post-img src="/images/22/02/24/202052.png"></post-img>

그런데 현재 자신의 버전을 유지해야하는 분들도 계실겁니다. 그럴 경우 사용하는 **NVM**에 대해 알아보고 설치해보겠습니다.

## NVM

**N**ode **V**ersion **M**anager를 줄인말로 Node 버전을 관리해줍니다. 상황에 따라 이 버전, 저 버전으로 바꿔가면서 프로젝트를 진행할 수 있습니다. 그래서 보통 협업이나 프로젝트를 동시에 여러 개 진행할 때 유용하죠!

### 설치

`curl` 또는 `wget`으로 설치하는 방법이 있습니다.

```bash [curl로 설치하기]
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

```bash [wget으로 설치하기]
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

이후 bash 사용자라면 `~/.bashrc`, zsh 사용자라면 `~/.zshrc`에 다음 내용을 넣어주세요. nano나 vi를 이용해서 적어주시면 됩니다. (참고로 저는 zsh!)

```bash
$ vi ~/.zshrc
```

```zsh [.zshrc]
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

터미널을 닫고 다시 열어서 nvm 명령어를 실행해봅시다.

```bash
$ nvm
```

<post-img src="/images/22/02/24/211729.png"></post-img>

### Node 설치하기

이제 Node를 설치해볼까요? 제가 사용하는 버전으로 설치해보겠습니다.

```bash
$ nvm install 14.18.2
```

<post-img src="/images/22/02/24/213303.png"></post-img>

무언가 설치 되면서 어떻게 해서 실행하라고 안내도 해주네요!

```bash
$ nvm use --delete-prefix v14.18.2
```

<post-img src="/images/22/02/24/213428.png"></post-img>

만약에 이전의 node 버전을 사용하고자 한다면 다음과 같이 해주면 됩니다.

```bash
$ nvm use system
```

## 마무리하며

네! 이제 우리 Nuxt 프로젝트를 만들 준비가 다 되었습니다! 다음 시간에는 Nuxt 프로젝트를 만들어 보겠습니다!

<post-img src="/images/meme/제리인사.gif"></post-img>
