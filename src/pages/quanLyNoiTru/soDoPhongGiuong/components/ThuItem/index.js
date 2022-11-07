import { Col, Row } from "antd";
import React from "react";
import GItem from "../GItem";
import { Main } from "./styled";
import moment from "moment";
import { useSelector } from "react-redux";
import { MODE_FILTER_GIUONG } from "constants/index";

const ThuItem = ({
  dsGiuong,
  ngay,
  data,
  phongId,
  khoaId,
  onShowDsNb,
  onThemMoiPG,
}) => {
  const { dataSearch } = useSelector((state) => state.soDoPhongGiuong);

  const ngayTxt = moment(ngay)._d.format("thu, dd/MM/yyyy");

  return (
    <Main>
      <div className="thu-title">
        {ngayTxt}
      </div>

      <div className="thu-content">
        <Row>
          {dsGiuong.map((item) => {
            const _dsNb = item.dsNgay?.find((x) => x.ngay === ngay)?.dsNb || [];
            if (
              dataSearch?.filterMode === MODE_FILTER_GIUONG.EXIST &&
              _dsNb &&
              _dsNb.length > 0
            )
              return (
                <Col span={8} key={item.id}>
                  <GItem
                    data={item}
                    dsNb={item.dsNgay?.find((x) => x.ngay === ngay)?.dsNb || []}
                    phongId={phongId}
                    khoaId={khoaId}
                    onShowDsNb={onShowDsNb}
                    onThemMoiPG={onThemMoiPG}
                  />
                </Col>
              );

            if (dataSearch?.filterMode === MODE_FILTER_GIUONG.ALL)
              return (
                <Col span={8} key={item.id}>
                  <GItem
                    data={item}
                    dsNb={item.dsNgay?.find((x) => x.ngay === ngay)?.dsNb || []}
                    phongId={phongId}
                    khoaId={khoaId}
                    onShowDsNb={onShowDsNb}
                    onThemMoiPG={onThemMoiPG}
                  />
                </Col>
              );

            if (
              dataSearch?.filterMode === MODE_FILTER_GIUONG.EMPTY &&
              _dsNb &&
              _dsNb.length == 0
            )
              return (
                <Col span={8} key={item.id}>
                  <GItem
                    data={item}
                    dsNb={item.dsNgay?.find((x) => x.ngay === ngay)?.dsNb || []}
                    phongId={phongId}
                    khoaId={khoaId}
                    onShowDsNb={onShowDsNb}
                    onThemMoiPG={onThemMoiPG}
                  />
                </Col>
              );

            return null;
          })}
        </Row>
      </div>
    </Main>
  );
};

export default ThuItem;
