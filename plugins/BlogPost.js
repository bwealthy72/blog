const getPostList = async function (path) {
  const regex = /\/post(\/\w+)/gm;
  const match = regex.exec(path);
  let category = "";
  if (match) {
    category = match[1];
  }

  if (category == "/all") {
    category = "";
  }

  const postList = await this.$content(category, { deep: true })
    .without(["body"])
    .sortBy("createdAt", "desc")
    .sortBy("title", "desc")
    .fetch();

  for (let i = 0; i < postList.length; i++) {
    const p = postList[i];
    const re = /(\/\w+)\//gm;
    p.createdAt = this.$dateFormat(new Date(p.createdAt), "%Y. %M. %D");
    const result = re.exec(p.path);
    if (result) {
      p.dir = "/post" + result[1];
      p.category = this.store.state.postPaths[p.dir].name;
    }
  }

  return postList;
};

const getPostContent = async function (path) {
  const post = await this.$content(path).fetch();

  post.createdAt = this.$dateFormat(
    new Date(post.createdAt),
    "%Y년 %M월 %D일 %t %h:%m"
  );
  const re = /(\/\w+)\//gm;
  post.dir = "/post" + re.exec(post.path)[1];
  post.category = this.store.state.postPaths[post.dir].name;

  return post;
};

const getPosts = async function () {
  let path = this.route.path;

  // 맨 뒤에 /가 있으면 못 찾는 경우가 있음
  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }

  const postList = await this.$getPostList(path);

  if (this.route.params.post) {
    // 포스트 URL 이라면
    const re = /\/post(.*)/gm;
    const result = re.exec(path);
    path = result[1];
  } else {
    // 카테고리 URL 이라면
    path = postList[0].path;
  }

  const post = await this.$getPostContent(path);

  return { post, postList };
};

export default ({ app }, inject) => {
  inject("getPostList", getPostList);
  inject("getPostContent", getPostContent);
  inject("getPosts", getPosts);
};
