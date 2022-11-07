import React from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import moment from "moment";

const ThongTinNguoiDoBVMaiTang = ({
  layerId,
  onChange,
  handleSetData,
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const { nbThongTinTuVong } = useSelector((state) => state.nbDotDieuTri);
  const { diaChiMaiTang, thoiGianMaiTang } = nbThongTinTuVong || {};

  const onChangeValue = (key) => (value) => {
    handleSetData(key, value);
  };

  return (
    <Main>
      <Box title={"Thông tin người do bệnh viện mai táng"}>
        <Row className="row-name" gutter={6}>
          <Col span={16}>
            <div className="item-input" key={thoiGianMaiTang}>
              <label className={"label"}>{"Thời gian mai táng"}</label>
              <DatePicker
                showTime
                placeholder="Chọn thời gian mai táng"
                className="item-time"
                defaultValue={thoiGianMaiTang ? moment(thoiGianMaiTang) : null}
                format="DD/MM/YYYY HH:mm:ss"
                onChange={onChangeValue("thoiGianMaiTang")}
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="item-input">
              <label className="label">{"Địa chỉ mai táng"}</label>
              <InputTimeout
                placeholder={"Nhập địa chỉ mai táng"}
                value={diaChiMaiTang}
                onChange={onChangeValue("diaChiMaiTang")}
              />
            </div>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinNguoiDoBVMaiTang;
