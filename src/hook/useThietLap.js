import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function useThietLap(key, initialValue = "") {
  const { getThietLap } = useDispatch().thietLap;
  const refData = useRef(initialValue);
  const thietLap = useSelector((state) => state.thietLap[`data${key}`]);
  useEffect(() => {
    getThietLap({ ma: key });
  }, []);
  const data = useMemo(() => {
    if (!thietLap) return initialValue;
    if (thietLap != refData.current) {
      refData.current = thietLap;
    }
    return refData.current;
  }, [thietLap]);
  const onReload = () => {
    getThietLap({ ma: key, reload: true });
  };
  return [data, onReload];
}

export default useThietLap;