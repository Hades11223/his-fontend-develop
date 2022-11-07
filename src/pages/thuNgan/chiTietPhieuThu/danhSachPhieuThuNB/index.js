import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { List, Spin, Col, Row } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import IconUnPaid from "assets/images/thuNgan/icUnpaid.svg";
import IconPaid from "assets/images/thuNgan/icPaid.svg";
import classNames from "classnames";
import { LOAI_PHIEU_THU } from "constants/index";
import { useTranslation } from "react-i18next";

function DanhSachPhieuThu(props) {
  const { t } = useTranslation();

  const { fetchListServices, history } = props;
  const { nbDotDieuTriId, phieuThuId, maHoSo } = useParams();

  const {
    danhSachPhieuThu: { listData = [], dataSearch },
  } = useSelector((state) => state);
  const {
    danhSachPhieuThu: { onSearch, updateData },
    thietLap: { getThietLap },
  } = useDispatch();
  const [state, _setState] = useState({
    loading: false,
    hasMore: true,
    page: 0,
    size: 20,
  });

  useEffect(() => {
    const { page, size } = state;
    onSearch({
      page,
      size,
      nbDotDieuTriId,
    });
  }, [nbDotDieuTriId]);

  const onSelectItem = (item) => () => {
    history.push(
      `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${item.id}/${item.nbDotDieuTriId}`
    );
    fetchListServices({
      size: 10,
      nbDotDieuTriId: item.nbDotDieuTriId,
      phieuThuId: item.id,
    });
  };
  console.log("first", listData)
  return (
    <Main>
      <div className="title-header">{t("thuNgan.danhSachPhieuThuCuaNb")}</div>
      <div className={`infinite-container`}>
        <InfiniteScroll
          loadMore={() => {}}
          // loadMore={handleInfiniteOnLoad}
        >
          <List
            dataSource={listData}
            renderItem={(item) => (
              <Row
                className={classNames("info", {
                  "paid-highlights": +phieuThuId === item.id,
                })}
                key={item.id}
                onClick={onSelectItem(item)}
              >
                {/* <Col xs={8} className="info-left">
                  Mã HS: {item.maHoSo}
                </Col> */}
                <Col
                  xs={17}
                  className={classNames("info-left", {
                    "info-left-paid": item.thanhToan,
                  })}
                >
                  {item.loaiPhieuThu === LOAI_PHIEU_THU.KHONG_BAO_HIEM ? (
                    <IconPaid className="info-left__ic" />
                  ) : (
                    <IconUnPaid className="info-left__ic" />
                  )}
                  {item.thanhToan
                    ? t("thuNgan.daThanhToan")
                    : t("thuNgan.chuaThanhToan")}
                </Col>
                <Col xs={7} className="info-right">
                  {item.thanhTien?.formatPrice()}
                </Col>
              </Row>
            )}
          >
            {state.loading && state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </Main>
  );
}

export default DanhSachPhieuThu;
