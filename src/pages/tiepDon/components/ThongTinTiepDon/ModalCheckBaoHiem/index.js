import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main, ButtonStyled } from "./styled";
import { Row, Col } from "antd";
import Modal from "../../Modal";
import { ModalNotification2 } from "components/ModalConfirm";
import { useTranslation } from "react-i18next";
import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "components";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const titleBlockStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const ModalCheckBaoHiem = (props, ref) => {
  const { t } = useTranslation();
  const { listAllBenhVien } = useSelector((state) => state.benhVien);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const {
    benhVien: { getListAllBenhVien },
  } = useDispatch();
  const { isShowButtonOk = true } = props;
  const refCallback = useRef(null);
  const refModalConfirm = useRef(null);

  const [state, _setState] = useState({
    data: {},
    dataDetail: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        data: item.data || {},
        dataDetail: item?.data?.data || {},
        hoTen: item?.hoTen,
      });
      refCallback.current = callback;
    },
  }));

  const { data, dataDetail, hoTen } = state;

  const onOK = () => {
    let dataFilter = {};
    setState({ show: false });
    dataFilter = listAllBenhVien?.find((item) => item.ma == dataDetail?.maDKBD);
    let day5nam = dataDetail?.ngayDu5Nam && dataDetail?.ngayDu5Nam.split("/");
    let date = "";
    if (day5nam && day5nam.length === 3) {
      date = `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`;
    }
    let obj = {
      ...(dataDetail || {}),
      noiDangKy: dataFilter,
      thoiGianDu5Nam: date,
    };
    if (refCallback.current) refCallback.current(obj);
  };
  const onBack = (data) => {
    setState({
      show: false,
      data: {},
      dataDetail: {},
    });
    if (refCallback.current && data) refCallback.current(data);
  };

  const boQuaThe = () => {
    refModalConfirm.current &&
      refModalConfirm.current.show(
        {
          title: t("tiepDon.boKiemTraThe"),
          content: t("tiepDon.banCoChacChanMuonBoKiemTraThe"),
          detail: t("tiepDon.anhHuongKhiBoKiemTraThe"),
          cancelText: t("common.quayLai"),
          okText: t("tiepDon.boKiemTraThe"),
          showBtnOk: true,
        },
        () => {
          onBack({ boQuaTheLoi: true });
        },
        () => {}
      );
  };

  useEffect(() => {
    getListAllBenhVien({ page: "", size: "" });
  }, []);
  const getDate = (date) => {
    try {
      return `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(
        0,
        4
      )} ${date.slice(8, 10)}:${date.slice(10, 12)}`;
    } catch (error) {}
    return "";
  };
  return (
    <>
      <Modal
        closable={false}
        width={1090}
        show={state.show}
        typeModal={data?.code === 0 ? "success" : "error"}
        titleBlock={
          <div style={titleBlockStyle}>
            <h3 className="title">
              {data?.code === 0
                ? t("tiepDon.thongTinTheChinhXac")
                : t("common.loi")}
            </h3>

            <ButtonStyled
              style
              onClick={() => window && window.print()}
              type="default"
              minWidth={80}
              height={28}
              rightIcon={<PrinterOutlined />}
            >
              <span>{t("common.in")}</span>
            </ButtonStyled>
          </div>
        }
        button={
          <>
            {data?.code === 0 ? (
              <>
                <div className="btn btn-cancel" onClick={() => onBack()}>
                  <span>{t("common.quayLai")}</span>
                </div>

                {isShowButtonOk && (
                  <div className="btn btn-accept" onClick={() => onOK()}>
                    <span>{t("tiepDon.suDungThongTinThe")}</span>
                    <img
                      style={{ paddingLeft: 10 }}
                      src={require("assets/images/welcome/correct.png")}
                    ></img>
                  </div>
                )}
              </>
            ) : (
              <>
                <Button onClick={() => onBack()} type="default" minWidth={100}>
                  {t("common.quayLai")}
                </Button>

                {isShowButtonOk && (
                  <Button // onClick={() => showThongBaoBoQuaThe(true)}
                    onClick={boQuaThe}
                    type="error"
                    minWidth={100}
                    rightIcon={
                      <img
                        style={{ paddingLeft: 10 }}
                        src={require("assets/images/welcome/delete3.png")}
                      ></img>
                    }
                  >
                    {t("tiepDon.boKiemTraThe")}
                  </Button>
                )}
              </>
            )}
          </>
        }
      >
        <Main className="container">
          <div className="modal-content--left">
            {data?.code !== 0 && (
              <>
                <Row className="error-body">
                  <img
                    style={{ paddingRight: 10 }}
                    src={require("assets/images/welcome/error.png")}
                    alt=""
                  ></img>
                  <div className="error-detail">
                    <div className="code">
                      {t("common.maLoi")} {data?.data?.maKetQua}{" "}
                    </div>
                    <div className="message"> {data?.message} </div>
                  </div>
                </Row>
                <Row className="note">
                  <h5>{t("common.ghiChu")}</h5>
                  <p>{data?.data?.ghiChu}</p>
                </Row>
              </>
            )}

            {data?.code === 0 && (
              <Row>
                <div>
                  <h4 style={{ color: "red", marginBottom: 0 }}>
                    {t("common.ghiChu")}: {dataDetail?.ghiChu}
                  </h4>
                </div>
              </Row>
            )}

            <Row>
              <div className="info">
                <h5>{t("tiepDon.thongTinDung")}:</h5>
              </div>
            </Row>
            <div className="content">
              <div className="content-info">
                <Row>
                  <Col span={6}>
                    <h6>{t("tiepDon.maThe")}: </h6>
                  </Col>
                  <Col span={18} className="ma">
                    <p>{dataDetail?.maThe}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("common.hoVaTen")}:</h6>
                  </Col>
                  <Col span={18} className="name">
                    <p>{hoTen ? hoTen : dataDetail?.hoTen}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("common.gioiTinh")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.gioiTinh}</p>
                  </Col>
                </Row>
                <Row className="gender">
                  <Col span={6}>
                    <h6>{t("common.ngaySinh")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.ngaySinh}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.diaChiThe")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.diaChi}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h6 style={{ marginTop: 10 }}>
                      {t("tiepDon.noiDangKyKCBBD")}:
                    </h6>
                  </Col>
                  <Col span={18}>
                    <p style={{ marginTop: 10 }}>{dataDetail?.tenDKBD}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.giaTriThe")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>
                      {t("common.tu")} {dataDetail?.gtTheTu} - {t("common.den")}{" "}
                      {dataDetail?.gtTheDen}
                    </p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.ngay5NamLT")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail.ngayDu5Nam}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.maTheMoi")}:</h6>
                  </Col>
                  <Col span={18} className="ma">
                    <p>{dataDetail?.maTheMoi}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.giaTriTheMoi")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>
                      {t("common.tu")} {dataDetail?.gtTheTuMoi} -{" "}
                      {t("common.den")} {dataDetail?.gtTheDenMoi}
                    </p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.maSoBHXH2")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.maSoBHXH}</p>
                  </Col>
                  <Col span={6}>
                    <h6>{t("tiepDon.maKhuVuc")}:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.maKV}</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="modal-content--right">
            <Row>
              <div className="info">
                <h5>{t("tiepDon.lichSuKhamChuaBenh")}:</h5>
              </div>
            </Row>
            <div className="history">
              {!!(data?.data?.dsLichSuKCB2018 || []).length &&
                data?.data?.dsLichSuKCB2018.map((item, index) => {
                  return (
                    <div className="history--item" key={index}>
                      <div className="date">{getDate(item.ngayVao)}</div>
                      <div className="name-hospital">{item.tenCSKCB}</div>
                      <div className="res-hospital">
                        {t("tiepDon.ketQuaDieuTri")}:{" "}
                        {` ${
                          listKetQuaDieuTri?.find(
                            (kq) => kq.id == item.kqDieuTri
                          )?.ten || ""
                        }`}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* {data.code !== 0 && (
          <div className="loiDan">
            <div className="loiDan-title">
              Bạn có chắc chắn muốn bỏ qua kiểm tra thẻ không?
              </div>
            <div className="loiDan-content">
              Bỏ qua kiểm tra thẻ với cổng giám định có thể dẫn đến các dịch vụ <br />
                của người bệnh không được cơ quan BHYT quyết toán!
              </div>
          </div>
        )} */}
        </Main>
      </Modal>
      <ModalNotification2 ref={refModalConfirm} />
    </>
  );
};

export default forwardRef(ModalCheckBaoHiem);
