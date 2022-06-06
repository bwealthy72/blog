import variable from "~/assets/scss/base/variable.scss";

function dateFormat(date, format = `%Y.%M.%D %h:%m`) {
  let str = "";
  for (let i = 0; i < format.length; i++) {
    if (format[i] == "%") {
      switch (format[i + 1]) {
        case "Y":
          str += date.getFullYear();
          break;
        case "y":
          str += date.getFullYear().slice(2);
          break;
        case "M":
          str += date.getMonth() + 1;
          break;
        case "m":
          str += ("0" + date.getMinutes()).slice(-2);
          break;
        case "D":
          str += date.getDate();
          break;
        case "d":
          str += ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
          break;
        case "H":
          str += date.getHours();
          break;
        case "h":
          let hour = date.getHours();

          if (hour > 12) {
            hour -= 12;
          }

          str += hour;
          break;
        case "s":
          str += date.getSeconds();
          break;

        case "t":
          let ampm = "오전";
          if (date.getHours() > 12) {
            ampm = "오후";
          }
          str += ampm;
          break;
        default:
          console.error(`%${format[i + 1]} is not Supported`);
          break;
      }
      i += 1;
    } else {
      str += format[i];
    }
  }
  return str;
}

const getScssVariable = function (scssVar) {
  let v = variable[scssVar];
  if (v.includes("rem")) {
    v = parseInt(v.slice(0, -3) + "0");
  } else if (v.includes("px")) {
    v = parseInt(v.slice(0, -2));
  }
  return v;
};

const deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

export default ({ app }, inject) => {
  inject("dateFormat", dateFormat);
  inject("getScssVariable", getScssVariable);
  inject("deepCopy", deepCopy);
};
