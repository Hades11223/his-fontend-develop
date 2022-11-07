import { get, isEqual } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import useStore from "./useStore";

const group = {
  tinh: {
    action: "ttHanhChinh.getListAllTinh",
    store: "ttHanhChinh.listAllTinh",
  },
};

function useListAll(key, param = { page: "", size: "", active: true }) {
  const { action, store } = useMemo(() => {
    if (group[key]) return group[key];
    return {
      action: `${key}.getListAll${key.upperFirst()}`,
      store: `${key}.listAll${key.upperFirst()}`,
    };
  }, [key]);

  const callGetAll = get(useDispatch(), action);
  const refData = useRef([]);
  const listData = useStore(store, []);

  useEffect(() => {
    if (callGetAll) callGetAll(param);
  }, []);

  const data = useMemo(() => {
    if (!listData) return [];
    if (!isEqual(listData, refData.current)) {
      refData.current = listData;
    }
    return refData.current;
  }, [listData]);

  const onReload = (param) => {
    callGetAll(param);
  };
  return [data, onReload];
}

export default useListAll;
