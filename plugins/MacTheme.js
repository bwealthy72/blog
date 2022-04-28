const resizeSelLimit = 0; // resize 선택되는 제한 거리
const moveSelLimit = 50; // move 선택되는 제한 거리
let x, y;
let isMoving = false;
let moveWait = false;
let element = null;

const getPxValue = function (style) {
  return parseFloat(style.slice(0, -2));
};

const changeWindowPos = function (e, el) {
  if (isMoving) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    el.style.top = getPxValue(el.style.top) + dy + "px";
    el.style.left = getPxValue(el.style.left) + dx + "px";

    x = e.clientX;
    y = e.clientY;
  }
};

const mouseDownHandler = function (e) {
  // post의 상단을 클릭한 경우
  // 움직이게 하기

  if (e.target != e.currentTarget) return;
  if (e.layerY > resizeSelLimit && e.layerY < moveSelLimit) {
    isMoving = true;
    x = e.clientX;
    y = e.clientY;
  }
};

const mouseUpHandler = (e) => {
  changeWindowPos(e, element);
  isMoving = false;
};

const mouseMoveHandler = (e) => {
  if (!moveWait) {
    changeWindowPos(e, element);

    moveWait = true;
    setTimeout(function () {
      moveWait = false;
    }, 50);
  }
};

const clearMovable = function (el) {
  element = el;
  const heads = el.querySelectorAll("[class*=__head]");
  if (heads) {
    heads.forEach((elem, idx) => {
      elem.addEventListener("mousedown", mouseDownHandler);
    });
    document.removeEventListener("mouseup", mouseUpHandler);
    document.removeEventListener("mousemove", mouseMoveHandler);
  }
};

const setMovable = function (el) {
  element = el;
  const heads = el.querySelectorAll("[class*=__head]");
  if (heads) {
    heads.forEach((elem, idx) => {
      elem.addEventListener("mousedown", mouseDownHandler);
    });
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
  }
};

export default ({ app }, inject) => {
  inject("setMovable", setMovable);
  inject("clearMovable", clearMovable);
};
