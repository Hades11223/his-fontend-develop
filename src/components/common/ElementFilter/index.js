import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Container } from "./styled";

const ElementFilter = (
  { description = "", renderFilter = () => <div></div>, initState },
  ref
) => {
  const [_state, _setState] = useState(initState);
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  // console.log("_state", _state);


  // sao lai can doan nay ha Hieu =)))
  useEffect(() => {
    setState(initState || {});
  }, [initState]);

  useImperativeHandle(ref, () => ({
    submit: (callback = () => {}) => {
      callback(_state);
    },
  }));

  const onChange = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.type === "checkbox"
        ? e?.target?.checked
        : e?.target?.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e;
    setState({
      [type]: value,
    });
  };

  return (
    <Container className="element-filter">
      {description && <div className="note">{description}</div>}
      {renderFilter({ _state, onChange })}
    </Container>
  );
};

export default forwardRef(ElementFilter);
