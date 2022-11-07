import { isNil } from "lodash";

// const checkObjEmpty = (obj) =>
//   typeof obj === "object" &&
//   Object.keys(obj).length === 0

export const combineUrlParams = (url = "", params = {}) => {
  const keys = Object.keys(params);
  const paramUrl = keys
    .reduce(
      (result, key) =>
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== "null" &&
        params[key] !== "" &&
        params[key].length !== 0 &&
        params[key][0] !== "" &&
        !(
          typeof params[key] === "object" && // case param = {}
          Object.keys(params[key]).length === 0
        )
          ? [
              ...result,
              `${key}=${
                key != "sort" ? encodeURIComponent(params[key]) : params[key]
              }`,
            ]
          : [...result],
      []
    )
    .join("&");
  // return `${url}?${paramUrl}`; Old
  return `${url}${paramUrl ? `?${paramUrl}` : ""}`; // New
};

export const combineSort = (params = {}) => {
  const keys = Object.keys(params);
  const paramSort = keys
    .reduce(
      (result, key) =>
        params[key] &&
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
          ? [...result, `${key},${params[key] === 1 ? "asc" : "desc"}`]
          : [...result],
      []
    )
    .join("&sort=");
  return paramSort;
};

export function checkData(value, Array, valueCheck) {
  var data =
    Array && Array.length
      ? Array.find((option) => {
          return option[`${valueCheck ? valueCheck : "id"}`] === value;
        })
      : {};
  if (data) return data;
  return {};
}
export const hexToUtf8 = (hex) => {
  if (hex) return decodeURIComponent("%" + hex.match(/.{1,2}/g).join("%"));
  return hex;
};
export const formatPhone = (item = "") => {
  var data = item?.replaceAll(" ", "") || "";
  return data && data.length
    ? `${data?.substr(0, 4)} ${data?.substr(4, 3)} ${data?.substr(7)}`
    : data;
};

export const handleBlurInput = (e) => {
  if (e.currentTarget.value === "0") e.currentTarget.value = "1";
};
export const handleKeypressInput = (e) => {
  const characterCode = e.key;
  let characterValue = e.target.value;
  if (characterCode === "Backspace") return;

  const characterNumber = Number(characterCode);
  if (characterNumber >= 0 && characterNumber <= 9) {
    if (e.currentTarget.value && e.currentTarget.value.length) {
      return;
    } else if (/0+/g.test(characterValue)) {
      e.preventDefault();
    } else if (/^0/g.test(characterValue)) {
      return e.target.value.slice(1);
    }
  } else {
    e.preventDefault();
  }
};

export const firstLetterWordUpperCase = (str) => {
  return typeof str === "string"
    ? str
        .split(" ")
        .map((st) => st[0].toUpperCase() + st.toLowerCase().slice(1))
        .join(" ")
    : "";
};

export const addPrefixNumberZero = (number, length) => {
  if (isNil(number)) return;

  let num = number.toString();
  while (num.length < length) num = "0" + num;
  return num;
};

export const formatDecimal = (val) => {
  if (!val || val === 0 || val === "undifined") return 0;
  const num = String(val);
  const indexOfDot = num.indexOf(".");
  if (indexOfDot > 0) {
    const formattedNum = num.slice(0, indexOfDot);
    const decimal = num.slice(indexOfDot + 1, num.length);

    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + decimal;
  }

  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatNumberInput = (value) => {
  return value
    ?.toLowerCase()
    .replace(
      /[eẽẹèéũụùúẵặăắằâẫậầấđềêễểệếưừữựứôồộốỗơỡờợớáãạàa-zA-Z!@#$%^&*()\-=_+|\\{}\[\]:':"<>,.?/~`; ]/gi,
      ""
    )
    .replace(/^(0)([0-9])$/gi, "$2")
    .replace(/^0{2,}/gi, "");
};

// tìm kiếm 2 từ cách xa nhau
export const searchString = (searchStr = "", str = "") => {
  const strRegExp = ("(" + searchStr.toLowerCase().trim() + ")")
    .split(" ")
    .join(")?(");
  return RegExp(strRegExp || "").test(str.toLowerCase());
};

// sắp xếp chữ
export const sortString = (key, value) => (a, b) => {
  if ((a[key] + "").toLowerCase() < (b[key] + "").toLowerCase())
    return value === 1 ? -1 : 1;
  if ((a[key] + "").toLowerCase() > (b[key] + "").toLowerCase())
    return value === 1 ? 1 : -1;
  return 0;
};

// formatter and parser input number
export const formatterNumber = (val) => {
  if (!val) return 0;
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(/\.(?=\d{0,2}$)/g, ",");
};

export const parserNumber = (val) => {
  if (!val) return 0;
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
  ).toFixed(2);
};

// format number (for ui): [100.256,25]
export const formatNumber = (val) => {
  return Number.parseFloat(`${val}`)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(/\.(?=\d{2}$)/g, ",")
    .replace(/\,[0]{2}$/, "");
};

//normalize number (for api)
export const normalizeNumber = (val) =>
  (parserNumber(`${val}`) != NaN &&
    `${val}`.replace(/\.(?=(\d{3}))/g, "").replace(/\,(?=(\d{2}))/g, ".")) ||
  0;

// open new tab
export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

// chuyển param thành object
export const parseParams = () => {
  const { search } = window.location;
  const arrParam = (search.split("?")[1] || "").split("&");
  const output = {};
  arrParam.forEach((item) => {
    const arr = item.split("=");
    output[arr[0]] = arr[1];
  });
  return output;
};

export const getIdFromUrl = () => {
  const arr = window.location.pathname.split("/");
  return isNaN(parseInt(arr[arr.length - 1])) ? null : arr[arr.length - 1];
};

export const encryptAES = (input) => {
  var CryptoJS = require("crypto-js");
  return CryptoJS.AES.encrypt(input, "ISOFH_HIS_CORE").toString();
};

export const decryptAES = (input) => {
  var CryptoJS = require("crypto-js");
  return CryptoJS.AES.decrypt(input, "ISOFH_HIS_CORE").toString(
    CryptoJS.enc.Utf8
  );
};

// export const stripAccents = (input) => {
//   var in_chrs =
//       "aâbcdeêúhiklmn£ô¡pvstu°vxtÛàß£ã¡±¯³µ·§¥©«åèé»½¹Á¿ÃÅëìíÉ)ïò÷ÏõÍÓÑÕ×ÙÝÛßýãùúçiåëéíïñóý÷AÂBCDEÊGHIKLMNOÔ PQSTU¯VXTYÀÁ¢Ã °®²´¶¦¤¨ª¬ÈÉº¼¸À¾ÂÄÆÌÍÈ(ÊÒÓÎÕÌÒÐÔÖØÜÚÞàâÙÚæhäêèìîðòÝöøô",
//     out_chrs =
//       "aăâbcdđeêghiklmnoôơpqstuưvxtyàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵAĂÂBCDĐEÊGHIKLMNOÔƠPQSTUƯVXTYÀÁẢÃẠẰẮẲẴẶẦẤẨẪẬÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ",
//     chars_rgx = new RegExp("[" + in_chrs + "]", "g"),
//     transl = {},
//     i;

//   for (i = 0; i < in_chrs.length; i++) {
//     transl[in_chrs[i]] = out_chrs[i];
//   }

//   const lookup = function (m) {
//     return transl[m] || m;
//   };

//   return input.replace(chars_rgx, lookup);
// };

export const getNormalizedKeyNum = function (e) {
  return e.which || e.keyCode;
};

export const stripAccents = (input) => {
  if (input === "") return "";
  const inputReplaceSpace = input.replaceAll(" ", "0020");
  const input4Char = inputReplaceSpace.match(/.{1,4}/g);

  return input4Char.map((item) => String.fromCharCode(`0x${item}`)).join("");
};

export const emptyString = (input) =>
  input === "" || input === null || input === undefined || input?.length === 0;

export const decodeBase64 = (hex) => {
  if (hex) return Buffer.from(hex, "base64").toString("utf8");
  return hex;
};

export const concatString = (...rest) => {
  let str = "";
  rest.forEach((item, index) => {
    if (index === 0) str = str.concat(item);
    else str = str.concat(" ").concat(item.toLowerCase());
  });
  return str;
};
export const detectMob = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const parseFloatNumber = (strVal) => {
  const str = strVal?.toString().replaceAll(".", "").replaceAll(",", ".") || "";

  return str ? parseFloat(str) : 0;
};

String.prototype.upperFirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
