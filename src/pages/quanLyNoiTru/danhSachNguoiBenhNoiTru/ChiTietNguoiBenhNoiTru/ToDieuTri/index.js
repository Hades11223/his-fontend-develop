import React, { memo, useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Row, Col, List } from "antd";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import empty from "assets/images/kho/empty.png";
import { Button } from "components";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import IcSaoChep from "assets/images/noiTru/icSaoChep.png";
import IcMoRong from "assets/images/noiTru/icMoRong.png";
import DsDichVu from "pages/hoSoBenhAn/ChiTietNguoiBenh/containers/DsDichVu";
import ThuocHoSoBenhAn from "pages/hoSoBenhAn/ChiTietNguoiBenh/containers/ThuocHoSoBenhAn";
import VatTuHoSoBenhAn from "pages/hoSoBenhAn/ChiTietNguoiBenh/containers/VatTuHoSoBenhAn";
import HoaChat from "pages/hoSoBenhAn/ChiTietNguoiBenh/containers/HoaChat";
import { useTranslation } from "react-i18next";
import { orderBy } from "lodash";
import Tabs from "../../../components/Tabs";
import DanhSachSuatAn from "pages/hoSoBenhAn/ChiTietNguoiBenh/containers/DanhSachSuatAn";
import { useStore } from "hook";

const ToDieuTri = (props) => {
  const { isReadonly } = props;
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const { listToDieuTri } = useSelector((state) => state.toDieuTri);
  const { toDieuTriId } = useSelector((state) => state.toDieuTri);
  const { onSearch: onSearchDvKt } = useDispatch().dsDichVuKyThuat;
  const { onSearch: onSearchThuoc } = useDispatch().dsThuoc;
  const { onSearch: onSearchVatTu } = useDispatch().dsVatTu;
  const { getListDichVuHoaChat } = useDispatch().chiDinhHoaChat;
  const { getDsSuatAn } = useDispatch().chiDinhSuatAn;
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});

  const [state, _setState] = useState({ activeTab: 0 });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (toDieuTriId) setState({ toDieuTriId: toDieuTriId });
  }, [toDieuTriId]);
  const onSelectItem = (item) => {
    setState({ toDieuTriId: item?.id });

    let dataSearch = {
      nbDotDieuTriId: item?.nbDotDieuTriId,
      chiDinhTuDichVuId: item?.id,
      chiDinhTuLoaiDichVu: 210,
      dsTrangThaiHoan: [0, 10, 20],
    };
    onSearchVatTu({ dataSearch });
    onSearchThuoc({ dataSearch });
    onSearchDvKt({ dataSearch });
    getListDichVuHoaChat({ ...dataSearch });
    getDsSuatAn({ ...dataSearch });
  };

  const onMoRong = (id) => {
    if (id)
      history.push(
        `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/to-dieu-tri/${id}`
      );
  };

  const onCreate = () => {
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${params?.id}/to-dieu-tri/them-moi`
    );
  };
  return (
    <Main>
      {!listToDieuTri?.length && !isReadonly && (
        <div className="content-tab">
          <div className="content-tab_1">
            <img src={empty} alt="..." />
            <div style={{ padding: "10px 0" }}>Ch??a t???o t??? ??i???u tr???</div>
            <Button type="primary" onClick={() => onCreate()}>
              T???o t??? ??i???u tr??? m???i
            </Button>
          </div>
        </div>
      )}
      {!!listToDieuTri?.length && (
        <>
          <Col sm={9} md={8} lg={7} xl={6} xxl={5}>
            <h1 className="header">
              <span>T??? ??i???u tr??? ({listToDieuTri?.length})</span>
              {!isReadonly && (
                <Button
                  type="success"
                  rightIcon={
                    <PlusCircleOutlined
                      title={t("quanLyNoiTru.toDieuTri.themMoiToDieuTri")}
                    />
                  }
                  onClick={() => onCreate()}
                  height={30}
                  style={{ marginBottom: 10 }}
                  iconHeight={15}
                >
                  {t("common.themMoi")}
                </Button>
              )}
            </h1>
            <div className="content-item">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                useWindow={false}
                style={{ width: "100%" }}
                loadMore={() => {}}
              >
                <List
                  dataSource={orderBy(listToDieuTri, "thoiGianYLenh", "desc")}
                  renderItem={(item) => (
                    <Row
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className={`item ${
                        state?.toDieuTriId === item?.id ? "actived" : ""
                      }  `}
                    >
                      <div className="item-content">
                        <div className="left">
                          <div>
                            {item?.thoiGianYLenh &&
                              moment(item?.thoiGianYLenh).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )}
                          </div>
                          <div>{item.tenKhoaChiDinh}</div>
                        </div>
                        <div className="right">
                          {!isReadonly && (
                            <img src={IcSaoChep} alt={IcSaoChep} />
                          )}
                          <img
                            src={IcMoRong}
                            alt={IcMoRong}
                            onClick={() => onMoRong(item?.id)}
                          />
                        </div>
                      </div>

                      <div>
                        {(item?.dsCdChinh || [])
                          .map((x) => {
                            return x.ma + " - " + x.ten;
                          })
                          .join(", ")}
                      </div>
                    </Row>
                  )}
                ></List>
              </InfiniteScroll>
            </div>
          </Col>
          {state?.toDieuTriId && (
            <Col sm={15} md={16} lg={17} xl={18} xxl={19}>
              <div className="right-body">
                <Tabs
                  defaultActiveKey={state?.activeTab}
                  onChange={(tab) => {
                    setState({ activeTab: tab });
                  }}
                >
                  <Tabs.TabPane tab="Danh s??ch d???ch v???" key={1}>
                    <DsDichVu />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Danh s??ch thu???c" key={2}>
                    <ThuocHoSoBenhAn thongTinBenhNhan={infoPatient} />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Danh s??ch v???t t??" key={3}>
                    <VatTuHoSoBenhAn />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Danh s??ch su???t ??n" key={4}>
                    <DanhSachSuatAn />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="M??u" key={5}></Tabs.TabPane>
                  <Tabs.TabPane tab="H??a ch???t" key={6}>
                    <HoaChat />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </Col>
          )}
        </>
      )}
    </Main>
  );
};
export default memo(ToDieuTri);
