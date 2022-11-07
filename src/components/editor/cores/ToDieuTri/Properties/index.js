import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Input, Checkbox } from "antd";
import { Main } from "./styled";
import { Select } from "components";

const BangTheoDoiBenhNhanHSTCProperties = forwardRef((props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        viTriDichVu: props.state.props.viTriDichVu || 0,
        hideHLDD: props.state.props.hideHLDD,
      };
      setState(newState);
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {
      viTriDichVu: state.viTriDichVu,
      hideHLDD: state.hideHLDD,
    };
  });

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeCheckBox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  const onChangeInput = (type) => (e) => {
    onChangeValue(type)(e.target.value);
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>{"Vị trí dịch vụ: "}</Col>
        <Col span={16}>
          <Select
            fit={true}
            value={state.viTriDichVu}
            onChange={onChangeValue("viTriDichVu")}
            data={[
              { ten: "Cột y lệnh", id: 0 },
              { ten: "Cột diễn biến", id: 1 },
            ]}
          ></Select>
        </Col>
        <Col span={8}>{"Ẩn cột HL/DD: "}</Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckBox("hideHLDD")}
            checked={state.hideHLDD}
          />
        </Col>
      </Row>
    </Main>
  );
});

BangTheoDoiBenhNhanHSTCProperties.defaultProps = {
  state: {},
};

BangTheoDoiBenhNhanHSTCProperties.propTypes = {
  state: T.shape({}),
};

export default BangTheoDoiBenhNhanHSTCProperties;
