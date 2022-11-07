import { useEffect, useRef } from "react";
import _ from "lodash";
export default function usePrevious(value, initialValue) {
  const ref = useRef();
  useEffect(() => {
    ref.current = _.cloneDeep(value);
  });
  if (_.isEmpty(ref.current) && initialValue !== undefined) {
    return initialValue;
  }
  return ref.current;
}
