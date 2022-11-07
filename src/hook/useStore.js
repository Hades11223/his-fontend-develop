import { isEqual, get, cloneDeep } from "lodash";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

function useStore(selector, initialValue = {}, memoData = true) {
  const refInit = useRef(initialValue);
  const refData = useRef(initialValue);
  const data = useSelector((state) =>
    typeof selector === "function"
      ? selector(state) || initialValue
      : get(state, selector, initialValue)
  );
  if (memoData) {
    if (!isEqual(refData.current, data)) {
      refData.current = cloneDeep(data);
    }
    if (refData.current) return refData.current || refInit.current;
  }
  return data || refInit.current;
}

export default useStore;