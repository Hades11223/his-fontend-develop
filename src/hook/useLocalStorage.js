import { isEmpty } from "lodash";
import { useEffect, useRef } from "react";

const useLocalStorage = (callback, dependencies = []) => {
  const refStorage = useRef({});
  useEffect(() => {
    refStorage.current = {};
    const allStorage = () => {
      var values = {},
        keys = Object.keys(localStorage),
        i = keys.length;
      while (i--) {
        values[keys[i]] = localStorage.getItem(keys[i]);
      }
      return values;
    };
    refStorage.current = allStorage();

    if (!dependencies?.length) {
      //nếu dependencies là mảng rỗng thì chạy 1 lần duy nhất lấy tất cả các key trong storage
      callback && callback(refStorage.current);
      return;
    }

    //ngược lại nếu ko có hoặc có ít nhất 1 giá trị dependencies thì trigger event
    function storageEventHandler() {
      if (!callback) return;
      const changed = {};
      if (dependencies?.length) {
        dependencies.forEach((dependency) => {
          if (
            refStorage.current[dependency] != localStorage.getItem(dependency)
          ) {
            changed[dependency] = localStorage.getItem(dependency);
            refStorage.current[dependency] = changed[dependency];
          }
        });
        if (!isEmpty(changed)) {
          callback(changed); // callback data template {[key1]: value1, [key2]: value2}
        }
      } else {
        refStorage.current = allStorage();
        callback && callback(refStorage.current);
      }
    }
    window.addEventListener("storage", storageEventHandler, false);
    return () => window.removeEventListener("storage", storageEventHandler);
  }, dependencies);
};
export default useLocalStorage;
