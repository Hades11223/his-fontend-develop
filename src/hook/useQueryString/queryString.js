import { isEmpty } from "lodash";

export const setQueryStringWithoutPageReload = (qsValue) => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qsValue;
  window.history.replaceState({ path: newurl }, "", newurl);
};

export const getQueryStringValue = (
  key,
  queryString = window.location.search
) => {
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(key);
  if (!value) {
    const values = paramsToObject(urlParams.entries());
    key = key?.toLowerCase().createUniqueText();
    return values[
      Object.keys(values).find(
        (item) => item?.toLowerCase().createUniqueText() == key
      )
    ];
  }
  return value;
};

const paramsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
};

export const getAllQueryString = (queryString = window.location.search) => {
  const urlParams = new URLSearchParams(queryString);
  const values = paramsToObject(urlParams.entries());
  let newQsValue = Object.keys(values).filter((item) => values[item]);
  const result = {};
  newQsValue.forEach((item) => {
    result[item] = values[item];
  });
  return result;
};

export const setQueryStringValue = (
  key,
  value,
  queryString = window.location.search
) => {
  const urlParams = new URLSearchParams(queryString);
  const values = paramsToObject(urlParams.entries());
  values[key] = value;
  let newQsValue = Object.keys(values).filter((item) => values[item]);
  newQsValue = newQsValue.map((item) => item + "=" + values[item]).join("&");
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const setQueryStringValues = (
  objKey = {},
  queryString = window.location.search
) => {
  const urlParams = new URLSearchParams(queryString);
  const values = paramsToObject(urlParams.entries());
  for (let key in objKey) {
    values[key] = objKey[key];
  }
  let newQsValue = Object.keys(values).filter((item) => values[item]);
  newQsValue = newQsValue.map((item) => item + "=" + values[item]).join("&");
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const transformObjToQueryString = (obj) => {
  if (obj && !isEmpty(obj)) {
    const qsStr = Object.keys(obj)
      .map((x) => `${x}=${obj[x]}`)
      .join("&");

    return "?" + qsStr;
  }

  return "";
};
