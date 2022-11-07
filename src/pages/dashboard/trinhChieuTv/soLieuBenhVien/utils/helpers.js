import React from "react";
import { createBrowserHistory } from "history";
import EventEmitter from "events";
import { isArray, isEqual, isEmpty } from "lodash";
import moment from "moment";
import { toNumber, isObject, now } from "lodash";

export const MENUSTATE = {
  FULL: "full-size",
  MINI: "mini-size",
  HIDDEN: "hide",
};

const history = createBrowserHistory();

export const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(32);

export const goTo = (url, isNewTab = false) => {
  if (isNewTab) {
    window.open(url, "_blank");
  } else {
    window.location.replace(url);
  }
};

export const getAgeFromBirthday = (birthDay) => {
  const birthYear = new Date(birthDay).getFullYear();
  const currentYear = new Date().getFullYear();
  if (isNaN(birthYear)) return "";
  return currentYear - birthYear;
};

export function nonAccentVietnamese(str) {
  if (!str || typeof str !== "string") return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const splitParamsUrl = (str) => {
  let pair = null;
  const data = [];
  const params = str.split("?")[1].split("&");

  params.forEach((param) => {
    pair = param.split("=");
    data.push({ [pair[0]]: pair[1] });
  });

  return data;
};

export const getParamUrl = () => {
  const { search } = window.location;
  if (!search) return {};
  let pair = null;
  const data = {};
  const arr = search.split("?");
  const params = arr?.length > 0 ? arr[1].split("&") : [];

  params.forEach((param) => {
    pair = param.split("=");
    data[pair[0]] = pair[1];
  });

  return data;
};

export var objectCompare = (o1, o2) => {
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  for (let key of Object.keys(o1)) {
    if (typeof o1[key] === "number" || typeof o1[key] === "string") {
      if (o1[key] !== o2[key]) {
        return false;
      }
    }
    if (isArray(o1[key])) {
      let valueCompare = arrayCompare[(o1[key], o2[key])];
      if (valueCompare === false) {
        return false;
      }
    }
    if (typeof o1[key] === "object" && !isArray(o1[key])) {
      let valueCompare = objectCompare[(o1[key], o2[key])];
      if (valueCompare === false) {
        return false;
      }
    }
  }
  return true;
};

export var arrayCompare = (a1, a2) => {
  if ((a1 && !a2) || (!a1 && a2)) return false;
  if (!a1 && !a2) return true;
  return isEqual(a1.sort(), a2.sort());
};

export const searchString = (searchStr = "", str = "") => {
  const strRegExp = ("(" + searchStr.toLowerCase().trim() + ")")
    .split(" ")
    .join(")?(");
  return RegExp(strRegExp || "").test((str || "").toLowerCase());
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "winphone";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  return "";
}

export function onKeyboardOnOff(isOpen) {
  // Write down your handling code
  if (isOpen) {
    // keyboard is open
    document.body.style.marginBottom = "360px";
  } else {
    // keyboard is closed
    document.body.style.marginBottom = 0;
  }
}

export const runClock = (containerId, options = {}) => {
  const { prefix = "Hôm nay là " } = options;
  const containerElement = document.getElementById(containerId);
  if (!containerElement) return;
  const intervalId = setInterval(() => {
    var time = `${prefix} ${
      moment().day() !== 0 ? `Thứ ${moment().day() + 1}` : "Chủ nhật"
    }, ${moment().format("DD/MM/YYYY - HH:mm:ss")}`;
    containerElement.innerText = time;
    containerElement.textContent = time;
  }, 1000);
  return intervalId;
};

export const htmlToWordDownload = (
  elementWrapper,
  name,
  isContentString = false
) => {
  if (!elementWrapper) return;
  var header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>${name}</title></head><body>`;
  var footer = "</body></html>";
  var sourceHTML = `${header}${
    isContentString ? elementWrapper : elementWrapper.innerHTML
  }${footer}`;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${name}.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
};

export const isElementInView = (query, isElement = false, scrollElement) => {
  const element = isElement ? query : document.querySelector(query);
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const scrollRect = scrollElement.getBoundingClientRect();
  return (
    rect.top >= scrollRect.y && rect.top <= scrollRect.y + scrollRect.height
  );
};

export const formatVNCurrentcyString = (
  number = 0,
  commaNumberValue = false
) => {
  if (!number) return "";
  let _number = number;
  let numString = "";
  if (typeof number === "string") {
    _number = parseFloat(number);
  }
  if (commaNumberValue) {
    return `${
      (_number || 0).toLocaleString("vi", {
        currency: "VND",
      }) || "0"
    } VNĐ`;
  }
  if (_number > 1000000000) {
    numString = `${parseInt((number / 1000000000.0) * 100.0) / 100.0} tỷ`;
  } else if (_number > 1000000) {
    numString = `${parseInt((number / 1000000.0) * 100.0) / 100.0} triệu`;
  } else if (_number > 1000) {
    numString = `${parseInt((number / 1000.0) * 100.0) / 100.0} nghìn`;
  } else {
    numString = `${number}`;
  }
  return <div title={`${_number} VNĐ`}>{numString}</div>;
};

export const formatVNCurrentcyStringForChart = (value) => {
  let bil = 0,
    mil = 0,
    kil = 0;
  if (value > 1000000000) {
    bil = parseInt(value) / 1000000000;
    mil = (parseInt(value) % 1000000000) / 100000000;
  } else if (value > 1000000) {
    mil = parseInt(value) / 1000000;
    kil = (parseInt(value) % 1000000) / 100000;
  }
  if (bil > 0) {
    return `${bil} tỷ ${mil > 0 ? mil : ""}`;
  } else if (mil > 0) {
    return `${mil} triệu ${kil > 0 ? kil : ""}`;
  } else {
    return value > 0
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          signDisplay: "never",
          currencyDisplay: "code",
        })
          .format(value)
          .replace("VND", "đ")
      : "";
  }
};

var FUNC_ERROR_TEXT = "Expected a function",
  nativeMax = Math.max,
  nativeMin = Math.min;
export const customDebounce = (func, wait, targetRef, options) => {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;

  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing
      ? nativeMax(toNumber(options.maxWait) || 0, wait)
      : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    if (targetRef) {
      result = func.apply(thisArg, targetRef.current);
    } else {
      result = func.apply(thisArg, args);
    }
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};

export const calulateTimeByCurrent = (maxTime = 10) => {
  const _min = moment().minute();
  const _sec = moment().second();
  return {
    mm: maxTime - 1 - (_min % maxTime),
    ss: 59 - _sec,
  };
};

export const isElementOverflowingX = (element) => {
  return element.offsetWidth < element.scrollWidth;
};

export const roundedCurrency = (value) => {
  if (value > 1000000000) {
    return `${Math.round((value / 1000000000) * 100) / 100} tỷ`;
  } else if (value > 1000000) {
    return `${Math.round((value / 1000000) * 100) / 100} triệu`;
  } else if (value > 1000) {
    return `${Math.round((value / 1000) * 100) / 100} nghìn`;
  } else {
    return value;
  }
};

export const reduceSum = (array, keyReduce, initValue) => {
  return array?.reduce((total, item) => {
    return total + item[keyReduce] || 0;
  }, initValue);
};

export const isClickInsideElement = (pointClicked, elementPos) => {
  if (elementPos) {
    const { x, y } = pointClicked;
    if (
      x > elementPos.x &&
      x < elementPos.x + elementPos.width &&
      y > elementPos.y &&
      y < elementPos.y + elementPos.height
    )
      return true;
  }
  return false;
};

export const getMaKhoaByHospital = () => {
  switch (process.env.REACT_APP_HOSPITAL) {
    case "dhy":
    case "bve": {
      return ["K01", "K02"];
    }
    case "spaul": {
      return ["KKB", "KCC"];
    }
    case "mediplus": {
      return [""];
    }
    default: {
      return ["KKB", "CC"];
    }
  }
};
export const getAuditInfo = (data) => {
  var module = {
    options: [],
    header: [
      navigator.platform,
      navigator.userAgent,
      navigator.appVersion,
      navigator.vendor,
      window.opera,
    ],
    dataos: [
      { name: "Windows Phone", value: "Windows Phone", version: "OS" },
      { name: "Windows", value: "Win", version: "NT" },
      { name: "iPhone", value: "iPhone", version: "OS" },
      { name: "iPad", value: "iPad", version: "OS" },
      { name: "Kindle", value: "Silk", version: "Silk" },
      { name: "Android", value: "Android", version: "Android" },
      { name: "PlayBook", value: "PlayBook", version: "OS" },
      { name: "BlackBerry", value: "BlackBerry", version: "/" },
      { name: "Macintosh", value: "Mac", version: "OS X" },
      { name: "Linux", value: "Linux", version: "rv" },
      { name: "Palm", value: "Palm", version: "PalmOS" },
    ],
    databrowser: [
      { name: "Edge", value: "Edg", version: "Edg" },
      { name: "Chrome", value: "Chrome", version: "Chrome" },
      { name: "Firefox", value: "Firefox", version: "Firefox" },
      { name: "Safari", value: "Safari", version: "Version" },
      { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
      { name: "Opera", value: "Opera", version: "Opera" },
      { name: "BlackBerry", value: "CLDC", version: "CLDC" },
      { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
    ],
    init: function () {
      var agent = this.header.join(" "),
        os = this.matchItem(agent, this.dataos),
        browser = this.matchItem(agent, this.databrowser);

      return { os: os, browser: browser };
    },
    matchItem: function (string, data) {
      var i = 0,
        j = 0,
        html = "",
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, "i");
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
          matches = string.match(regexv);
          version = "";
          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + ".";
              } else {
                version += matches[j];
              }
            }
          } else {
            version = "0";
          }
          return {
            name: data[i].name,
            version: parseFloat(version),
          };
        }
      }
      return { name: "unknown", version: 0 };
    },
  };
  var e = module.init();

  return {
    ip: data.IPv4,
    nameDevice: `${e.os.name} ${e.os.version}`,
    address: `${data.city}, ${data.country_name}`,
    application: e.browser.name,
  };
};
