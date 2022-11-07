import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Input, InputNumber, Radio, Checkbox } from "antd";
import { Main } from "./styled";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import { useDispatch, useSelector } from "react-redux";

const ComponentProps = forwardRef((props, ref) => {
  const { formInfo = {} } = useSelector((state) => state.config);
  const { updateData, updateFormProps } = useDispatch().config;

  useImperativeHandle(ref, () => ({}));

  const changeInput = (target) => (e) => {
    const newData = { ...formInfo, [target]: e.target.value };
    updateData({ formInfo: newData });
  };
  const changeValue = (target) => (e) => {
    let value = "";
    if (target == "fontSize") {
      updateFormProps({
        fontSize: e,
      });
    }
    if (target == "chonTieuChi") {
      value = e.target.checked;
    } else {
      value = e;
    }
    const newData = { ...formInfo, [target]: value };
    updateData({ formInfo: newData });
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        {/* <Col span={8}>
          <span>{"Tên tiêu chí: "}</span>
        </Col> */}
        {/* <Col span={16}>
          <Input
            size={"small"}
            value={formInfo?.tenTieuChi}
            onChange={changeInput("tenTieuChi")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <span>{"API Tiêu chí: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            size={"small"}
            value={formInfo?.apiTieuChi}
            onChange={changeInput("apiTieuChi")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={10}>
          <span>{"Bắt buộc chọn Tiêu chí: "}</span>
        </Col>
        <Col span={14}>
          <Checkbox
            checked={formInfo?.chonTieuChi}
            onChange={changeValue("chonTieuChi")}
          ></Checkbox>
        </Col> */}
        <Col span={8}>
          <span>{"Cỡ chữ: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <FontSizeConfig
            onChange={changeValue("fontSize")}
            value={formInfo?.fontSize}
          />
        </Col>
        {/* <Col span={8}>
          <span>{"Cấp ký điện tử: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <InputNumber
            size={"small"}
            value={formInfo?.soCapKyDienTu}
            onChange={changeValue("soCapKyDienTu")}
          />
        </Col> */}
        <Col span={8}>
          <span>{"Khổ giấy: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Radio.Group
            value={formInfo?.layoutType}
            onChange={changeInput("layoutType")}
          >
            <Radio value="horizontal">Ngang</Radio>
            <Radio value="default">Dọc</Radio>
          </Radio.Group>
        </Col>
      </Row>
    </Main>
  );
});

export default ComponentProps;
