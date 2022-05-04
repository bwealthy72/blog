const getPxValue = function (style) {
  return parseFloat(style.slice(0, -2));
};

const setMovable = function (el) {
  let isMoving = false;
  const resizeSelLimit = 0; // resize 선택되는 제한 거리
  const moveSelLimit = 50; // move 선택되는 제한 거리
  let x, y;

  el.addEventListener("mousedown", (e) => {
    // post의 상단을 클릭한 경우
    // 움직이게 하기
    if (e.target != e.currentTarget) return;
    if (e.layerY > resizeSelLimit && e.layerY < moveSelLimit) {
      isMoving = true;
      x = e.clientX;
      y = e.clientY;
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (isMoving) {
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      el.style.top = getPxValue(el.style.top) + dy + "px";
      el.style.left = getPxValue(el.style.left) + dx + "px";

      x = e.clientX;
      y = e.clientY;
      isMoving = false;
    }
  });

  let moveWait = false;
  document.addEventListener("mousemove", (e) => {
    if (!moveWait) {
      if (isMoving) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        el.style.top = getPxValue(el.style.top) + dy + "px";
        el.style.left = getPxValue(el.style.left) + dx + "px";

        x = e.clientX;
        y = e.clientY;
      }

      moveWait = true;

      setTimeout(function () {
        moveWait = false;
      }, 50);
    }
  });
};

export default ({ app }, inject) => {
  inject("setMovable", setMovable);
};
