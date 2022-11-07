import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Row, Col } from "antd";
import { dataInfoCommon, FORMAT_DATE } from "../../configs";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

function ThongTinChung(props) {
  const { t } = useTranslation();
  const { data = {}, ...rest } = props;
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const renderData = (item, type) => {
    if (type === "datetime") {
      return item && moment(item).format(FORMAT_DATE);
    }
    if (type === "status") {
      const index = listTrangThaiDichVu.findIndex((st) => st.id === item);
      if (index === -1) return;
      return listTrangThaiDichVu[index].ten;
    }
    return item;
  };

  return (
    <Main {...rest}>
      {dataInfoCommon.map((item) => {
        return (
          <Row
            key={item.dataIndex}
            className={`info-row ${item.className}`}
            gutter={32}
          >
            <Col className="gutter-row" span={8}>
              {t(item.i18n)}:
            </Col>
            <Col className="gutter-row--bold" span={16}>
              {renderData(data[item.dataIndex], item.type)}
            </Col>
          </Row>
        );
      })}
    </Main>
  );
}

export default ThongTinChung;
