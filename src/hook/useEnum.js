import { isEqual } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function useEnum(key, initialValue = []) {
  const { getUtils } = useDispatch().utils;
  const refData = useRef(initialValue);
  const listData = useSelector((state) => state.utils[`list${key}`]);

  useEffect(() => {
    getUtils({ name: key });
  }, []);

  const data = useMemo(() => {
    if (!listData) return initialValue;
    if (!isEqual(listData, refData.current)) {
      refData.current = listData;
    }
    return refData.current;
  }, [listData]);

  const onReload = () => {
    getUtils({ name: key, reload: true });
  };

  return [data, onReload];
}

export default useEnum;