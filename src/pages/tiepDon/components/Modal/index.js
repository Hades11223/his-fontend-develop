import React from "react";
import { Main } from "./styled";
import { Row, Col } from "antd";
// có 3 loại typeModal
// infoModal
// success
// error
const Modal = (props) => {
  return (
    <Main width={props.width} visible={props.show} closable={props.closable}>
      <Row className="container">
        <Col>
          <Row className={`header ${props.typeModal}`}>
            {props.titleBlock ? (
              props.titleBlock
            ) : (
              <h3 className="title">{props.title}</h3>
            )}
          </Row>
          <div className="modal-content">
            <>{props.children}</>
          </div>
          <Row className="button-bottom">{props.button}</Row>
        </Col>
      </Row>
    </Main>
  );
};

export default Modal;
