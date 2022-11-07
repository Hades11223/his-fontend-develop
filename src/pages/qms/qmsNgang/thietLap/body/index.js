import React, { useState } from "react";
import { StyleBody } from "./styled";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import { Col, Row } from "antd";

function Body(props) {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onSearch = (values) => {
    setState({ dataSearch: values });
  };
  return (
    <StyleBody>
      <Row>
        <Col span={11} style={{ marginRight: "25px" }}>
          <TopContent onSearch={onSearch} />
        </Col>
        {state.dataSearch?.loaiQms &&
          (state.dataSearch?.quayTiepDonId || state.dataSearch?.phongId) && (
            <Col span={12}>
              <MiddleContent
                loaiQms={state.dataSearch?.loaiQms}
                phongId={state.dataSearch?.phongId}
              />
            </Col>
          )}
      </Row>
    </StyleBody>
  );
}

export default Body;
