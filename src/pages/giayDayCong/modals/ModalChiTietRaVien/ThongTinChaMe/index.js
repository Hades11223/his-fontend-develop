import React from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, Form } from "antd";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";

const ThongTinChaMe = ({ layerId, onChange, id, ...props }) => {
  const { t } = useTranslation();

  return (
    <Main>
      <Box title={"Thông tin cha, mẹ (Áp dụng cho người bệnh dưới 7 tuổi)"}>
        <Row className="row-name" gutter={6}>
          <Col span={12}>
            <Form.Item name={"tenCha"} label={"Họ tên cha"}>
              <InputTimeout placeholder={"Nhập họ tên cha"} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={"tenMe"} label={"Họ tên mẹ"}>
              <InputTimeout placeholder={"Nhập họ tên mẹ"} />
            </Form.Item>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinChaMe;
