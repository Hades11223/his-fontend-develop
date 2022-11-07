import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Select, Checkbox, Input } from "antd";
import { Main } from "./styled";

const BangTheoDoiBenhNhanGMHSProperties = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    showDongTu: true,
    showALMPB: true,
    showALTMTT: true,
    showServoran: true,
    showDesflurane: true,
    showHalotan: true,
    showMoreInfo: true,
    showQuanSat: false,
    showKhac: false,
    textApLuc: "Áp lực",
    idNhanGayMe: "ID_NHAN_GAY_ME",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields } = props;

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        showDongTu: props.state.props.showDongTu,
        showALMPB: props.state.props.showALMPB,
        showALTMTT: props.state.props.showALTMTT,
        showServoran: props.state.props.showServoran,
        showDesflurane: props.state.props.showDesflurane,
        showHalotan: props.state.props.showHalotan,
        showMoreInfo: props.state.props.showMoreInfo,
        showQuanSat: props.state.props.showQuanSat,
        showKhac: props.state.props.showKhac,
        textApLuc:
          props.state.props.textApLuc == undefined
            ? "Áp lực"
            : props.state.props.textApLuc,
        idNhanGayMe: props.state.props.idNhanGayMe || "ID_NHAN_GAY_ME",
      };
      setState(newState);
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {
      showDongTu: state.showDongTu,
      showALMPB: state.showALMPB,
      showALTMTT: state.showALTMTT,
      showServoran: state.showServoran,
      showDesflurane: state.showDesflurane,
      showHalotan: state.showHalotan,
      showMoreInfo: state.showMoreInfo,
      showQuanSat: state.showQuanSat,
      showKhac: state.showKhac,
      textApLuc: state.textApLuc,
      idNhanGayMe: state.idNhanGayMe,
    };
  });

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeInput = (type) => (e) => {
    onChangeValue(type)(e.target.value);
  };

  const onChangeCheckBox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>{"Hiện đồng tử: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showDongTu}
            onChange={onChangeCheckBox("showDongTu")}
          />
        </Col>
        <Col span={8}>{"Hiện ALMPB: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showALMPB}
            onChange={onChangeCheckBox("showALMPB")}
          />
        </Col>
        <Col span={8}>{"Hiện ALTMTT: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showALTMTT}
            onChange={onChangeCheckBox("showALTMTT")}
          />
        </Col>
        <Col span={8}>{"Hiện Servoran: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showServoran}
            onChange={onChangeCheckBox("showServoran")}
          />
        </Col>
        <Col span={8}>{"Hiện Desflurane: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showDesflurane}
            onChange={onChangeCheckBox("showDesflurane")}
          />
        </Col>
        <Col span={8}>{"Hiện Halotan: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showHalotan}
            onChange={onChangeCheckBox("showHalotan")}
          />
        </Col>
        <Col span={8}>{"Hiện MoreInfo: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showMoreInfo}
            onChange={onChangeCheckBox("showMoreInfo")}
          />
        </Col>
        <Col span={8}>{"Hiện Quan sát: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showQuanSat}
            onChange={onChangeCheckBox("showQuanSat")}
          />
        </Col>
        <Col span={8}>{"Hiện dòng Khác: "}</Col>
        <Col span={16}>
          <Checkbox
            checked={state.showKhac}
            onChange={onChangeCheckBox("showKhac")}
          />
        </Col>
        <Col span={8}>{"Text Áp Lực: "}</Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.textApLuc}
            onChange={onChangeInput("textApLuc")}
          />
        </Col>
        <Col span={8}>{"Thiết lập chung nhãn gây mê: "}</Col>
        <Col span={16}>
          <Input
            size={"small"}
            disabled={true}
            value={state.idNhanGayMe}
            onChange={onChangeInput("idNhanGayMe")}
          />
        </Col>
      </Row>
    </Main>
  );
});

BangTheoDoiBenhNhanGMHSProperties.defaultProps = {
  state: {},
};

BangTheoDoiBenhNhanGMHSProperties.propTypes = {
  state: T.shape({}),
};

export default BangTheoDoiBenhNhanGMHSProperties;
