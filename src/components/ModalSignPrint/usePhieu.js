import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

function usePhieu(key) {
  const { listPhieu } = useSelector((state) => state.phieuIn);
  const refPhieu = useRef();
  const phieu = useMemo(() => {
    return listPhieu?.find((item) => item.key == key);
  }, [listPhieu, key]);

  if (!_.isEqual(refPhieu.current, phieu)) {
    refPhieu.current = _.cloneDeep(phieu);
  }
  if (refPhieu.current) return refPhieu.current;
  return phieu;
}

export default usePhieu;
