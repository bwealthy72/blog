export default function (context) {
  // 이전의 post list 스크롤 값을 가져온다.
  if (context.from) {
    context.route.meta[0].postListScrollY =
      context.from.meta[0].postListScrollY;
  }

  // console.log(from);
  // if (from) {
  //   let postListScrollY = from.meta[0].postListScrollY;
  //   console.log("middle", from.meta[0].postListScrollY);
  //   if (postListScrollY === 0) {
  //     console.log("to", to);
  //     // to.meta.push({ postListScrollY: 30 });
  //   }
  //   console.log("middle to", from.meta[0].postListScrollY);
  // }
  // const scrollPos = from?.meta[0].scrollPos;
  // if (scrollPos && Object.keys(scrollPos).length > 0) {
  //   scrollPos.y = window.scrollY || 0;
  //   scrollPos.x = window.scrollX || 0;
  // }
}
