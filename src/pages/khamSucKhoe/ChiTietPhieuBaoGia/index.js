import React, { useRef, useMemo } from "react";
import { Row, Tooltip } from "antd";
import { Main, MainPage } from "./styled";
import ChiTietPhieu from "./ChiTietPhieu";
import TabContent from "./TabContent";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import { useHistory, useParams } from "react-router-dom";
import {
  CopyOutlined,
  PrinterOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ModalBaoGiaThanhCong from "../modals/ModalBaoGiaThanhCong";
import ModalBaoGiaThatBai from "../modals/ModalBaoGiaThatBai";
import ModalTaoMienGiam from "../modals/ModalTaoMienGiam";
import ModalSaoChepBaoGia from "../modals/ModalSaoChepBaoGia";
import { useTranslation } from "react-i18next";

const ChiTietPhieuBaoGia = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const history = useHistory();
  const { id } = useParams();
  const refModalSuccess = useRef(null);
  const refModalFail = useRef(null);
  const refModalTaoMienGiam = useRef(null);
  const refModalSaoChepBaoGia = useRef(null);

  const {
    khamSucKhoe: {
      postPhieuBaoGia,
      validateTTPhieu,
      updatePhieuBaoGia,
      updateData,
    },
    dichVuKSK: { getDsDichVu, getDsDichVuTheoGoi },
  } = useDispatch();

  const {
    khamSucKhoe: { ttPhieu, isEditPhieu, chiTietPhieu },
  } = useSelector((state) => state);

  const isThemMoi = useMemo(() => {
    return id === undefined;
  }, [id]);

  const onSave = async () => {
    validateTTPhieu().then(() => {
      if (isThemMoi) {
        const body = { ...ttPhieu, ten: ttPhieu.ten?.toUpperCase() };

        postPhieuBaoGia(body).then((data) => {
          history.push(`/kham-suc-khoe/phieu-bao-gia/chi-tiet/${data.id}`);
        });
      } else {
        const body = { id, ...ttPhieu, ten: ttPhieu.ten?.toUpperCase() };

        updatePhieuBaoGia(body).then(() => {
          updateData({
            isEditPhieu: false,
          });
        });
      }
    });
  };

  const onBaoGiaThanhCong = () => {
    refModalSuccess.current && refModalSuccess.current.show();
  };

  const onBaoGiaThatBai = () => {
    refModalFail.current && refModalFail.current.show();
  };

  const onTaoMienGiam = () => {
    refModalTaoMienGiam.current && refModalTaoMienGiam.current.show();
  };

  //function
  function refreshListDV() {
    if (id) {
      getDsDichVu({ hopDongKskId: id });
      getDsDichVuTheoGoi({ hopDongKskId: id, trongGoi: true });
      getDsDichVuTheoGoi({ hopDongKskId: id, trongGoi: false });
    }
  }

  function onSaoChepPhieu() {
    refModalSaoChepBaoGia.current && refModalSaoChepBaoGia.current.show();
  }

  return (
    <MainPage
      breadcrumb={[
        {
          link: "/kham-suc-khoe",
          title: t("khamSucKhoe.quanLyKhamSucKhoe"),
        },
        {
          link: "/kham-suc-khoe/phieu-bao-gia",
          title: t("khamSucKhoe.danhSachPhieuBaoGia"),
        },
        {
          link: "",
          title: isThemMoi
            ? t("khamSucKhoe.themMoiPhieuBaoGia")
            : t("khamSucKhoe.chiTietPhieuBaoGia"),
        },
      ]}
    >
      <Main>
        <Row>
          <h1 className="title">
            {t("khamSucKhoe.phieuBaoGia")}
            <div className="header-action">
              <div
                className="action-btn"
                onClick={() => {
                  history.push("/kham-suc-khoe/phieu-bao-gia/them-moi");
                }}
              >
                <Tooltip title={`Tạo mới phiếu báo giá`}>
                  <PlusCircleOutlined />
                </Tooltip>
              </div>

              <div className="action-btn" onClick={onSaoChepPhieu}>
                <Tooltip title={`Sao chép phiếu báo giá`}>
                  <CopyOutlined />
                </Tooltip>
              </div>
            </div>
          </h1>
        </Row>
        <Row>
          <ChiTietPhieu layerId={refLayerHotKey.current} />
        </Row>
        <TabContent />
        <Row className="action-bottom">
          {isThemMoi || isEditPhieu ? (
            <>
              <div className="button-left"></div>
              <div className="button-right">
                <div className="button-save">
                  <Button
                    type="primary"
                    onClick={onSave}
                    rightIcon={
                      <img
                        style={{ marginLeft: 6 }}
                        src={require("assets/images/kho/save.png")}
                        alt=""
                      ></img>
                    }
                    iconHeight={15}
                    minWidth={"100px"}
                  >
                    Lưu [F4]
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="button-left">
                <Button
                  onClick={onSaoChepPhieu}
                  rightIcon={<CopyOutlined />}
                  minWidth={"100px"}
                >
                  Sao chép báo giá
                </Button>

                <Button
                  rightIcon={<PrinterOutlined />}
                  iconHeight={15}
                  minWidth={"100px"}
                >
                  In giấy tờ
                </Button>
              </div>

              <div className="button-right">
                <Button
                  onClick={onTaoMienGiam}
                  iconHeight={15}
                  minWidth={"100px"}
                  disabled={[30, 50].includes(chiTietPhieu?.trangThai)}
                >
                  Tạo miễn giảm
                </Button>

                {[10, 20].includes(chiTietPhieu?.trangThai) && (
                  <Button
                    onClick={onBaoGiaThatBai}
                    rightIcon={<CloseOutlined />}
                    iconHeight={15}
                    minWidth={"100px"}
                  >
                    Báo giá thất bại
                  </Button>
                )}

                {[10, 30].includes(chiTietPhieu?.trangThai) && (
                  <Button
                    type="primary"
                    onClick={onBaoGiaThanhCong}
                    rightIcon={<CheckCircleOutlined />}
                    iconHeight={15}
                    minWidth={"100px"}
                    className="btn-success"
                  >
                    Báo giá thành công
                  </Button>
                )}
              </div>
            </>
          )}
        </Row>
      </Main>
      <ModalBaoGiaThanhCong ref={refModalSuccess} />
      <ModalBaoGiaThatBai ref={refModalFail} />
      <ModalTaoMienGiam
        ref={refModalTaoMienGiam}
        refreshListDV={refreshListDV}
      />
      <ModalSaoChepBaoGia ref={refModalSaoChepBaoGia} id={id} />
    </MainPage>
  );
};

export default ChiTietPhieuBaoGia;
