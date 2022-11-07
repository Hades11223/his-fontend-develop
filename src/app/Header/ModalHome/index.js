import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Main } from "./styled";
import PageHome from "pages/home/subPage/Home";
import { useHistory } from "react-router-dom";

const ModalHome = (props, ref) => {
  const history = useHistory();
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { show } = state;
  useImperativeHandle(ref, () => ({
    show: (option = {}, callback) => {
      setState({
        show: true,
        ...option,
      });
      refCallback.current = callback;
    },
  }));
  const onOK = (ok) => {
    setState({ show: false });
    if (ok) if (refCallback.current) refCallback.current();
  };
  return (
    <Main visible={show} width={1000} onCancel={onOK}>
      <PageHome homePage={true} history={history} modal={true} />
    </Main>
  );
};

export default forwardRef(ModalHome);
