import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";

const ModalWarning = forwardRef((props, ref) => {
  const refOk = useRef(null);
  const refCancel = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
  }));
  const onOk = () => {
    setState({ show: false });
  };
  return (
    <Main width={700} visible={state.show} closable={false} top={props.top}>
      <Row className="container">
        <Col>
          <Row className={`header error}`}>
            <h3 className="title">{"Cảnh báo"}</h3>
          </Row>
          <div className="modal-content">
            <img src={require("assets/images/welcome/warning.png")} alt="" />
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: `Vui lòng thực hiện thanh toán dịch vụ <br/> trước khi checkin`}}
            />
            <div className="fotter">
                <div
                  className={`btn btn-cancel`}
                  onClick={onOk}
                >
                  <span>{"Xác nhận"}</span>
                </div>
            </div>
          </div>
        </Col>
      </Row>
    </Main>
  );
});

export { ModalWarning };
