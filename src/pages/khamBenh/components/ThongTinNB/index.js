import React, { useEffect, useMemo, useState, useRef } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Main, MainStep, MainInfo } from "./styled";
import IconChuaThucHien from "assets/images/khamBenh/iconChuaThucHien.png";
import IconDangThucHien from "assets/images/khamBenh/iconDangThucHien.png";
import IconHoanThanh from "assets/images/khamBenh/iconHoanThanh.png";
import IconSycn from "assets/svg/ic-sync.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import loadIcon from "assets/images/dichVu/load.png";
import { Col, Row, Tooltip, Spin } from "antd";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import Icon, { LoadingOutlined } from "@ant-design/icons";
import LazyLoad from "components/LazyLoad";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import ModalFolderAndFile from "components/ModalFolderAndFile";
import FolderUpload from "assets/svg/drive_folder_upload.svg";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const ThongTinBN = ({ collapse, onCollapse }) => {
  const { t } = useTranslation();

  const refTimeout = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalFoderAndFile = useRef(null);
  const [listgioiTinh] = useEnum("gioiTinh");
  const {
    thongTinKhamBN: {
      tienChuaThanhToan,
      gioiTinh,
      ngaySinh,
      tenNb,
      tienVienPhi,
      tienBhThanhToan,
      tienThuoc,
      dsKham,
    },
    infoNb,
    thongTinChiTiet,
  } = useSelector((state) => state.khamBenh);

  const { dsDichVuChiDinhXN, dsDichVuChiDinhKham, dsDichVuChiDinhCls } =
    useSelector((state) => state.chiDinhKhamBenh);

  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const {
    khamBenh: { getHanhTrinhKham },
  } = useDispatch();

  useEffect(() => {
    if (refTimeout.current) clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      if (thongTinChiTiet?.nbDotDieuTriId) {
        getHanhTrinhKham({ nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId });
      }
    }, 500);
  }, [
    thongTinChiTiet?.nbDotDieuTriId,
    trangThaiKham,
    dsDichVuChiDinhXN,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhCls,
  ]);
  useEffect(() => {
    console.log(thongTinChiTiet);
  }, [thongTinChiTiet]);
  const gt = useMemo(() => {
    return listgioiTinh?.find((item) => item.id === gioiTinh) || {};
  }, [listgioiTinh]);
  const age = useMemo(() => {
    return `${new Date().getFullYear() - moment(ngaySinh).format("YYYY")}${t(
      "common.tuoi"
    )}`;
  }, [ngaySinh]);

  const renderHanhTrinhKham = useMemo(() => {
    return (
      <LazyLoad component={import("./HanhTrinhKham")} dsKham={dsKham || []} />
    );
  }, [dsKham]);

  const clickCollapse = () => {
    setState({ off: true });
    onCollapse();
  };
  return (
    <Main className="marginTop">
      <MainStep className="main-step">
        <Col xs={7}>
          <img src={IconChuaThucHien} alt="IconChuaThucHien" />
          {t("khamBenh.chuaThucHien")}
        </Col>
        <Col xs={7}>
          <img src={IconDangThucHien} alt="IconDangThucHien" />
          {t("khamBenh.dangThucHien")}
        </Col>
        <Col xs={7}>
          <img src={IconHoanThanh} alt="IconHoanThanh" />
          {t("khamBenh.hoanThanh")}
        </Col>

        {state.isReload ? (
          <Col xs={1}>
            <Spin indicator={antIcon} />
          </Col>
        ) : (
          <>
            <Col xs={1}>
              <Tooltip
                title={"Thư mục"}
                overlayStyle={{ whiteSpace: "nowrap" }}
                overlayInnerStyle={{ width: "fit-content" }}
              >
                <FolderUpload
                  className="icon-folder"
                  onClick={() => {
                    refModalFoderAndFile.current &&
                      infoNb?.nbThongTinId &&
                      refModalFoderAndFile.current.show({
                        nbThongTinId: infoNb?.nbThongTinId,
                      });
                  }}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </Tooltip>
            </Col>
            <Col
              xs={1}
              className="sync-icon"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                setState({ isReload: true });
                let res = await getHanhTrinhKham({
                  nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
                });
                if (res) {
                  setState({ isReload: false });
                }
              }}
            >
              <Tooltip
                title={t(
                  "khamBenh.hanhTrinhKham.layThongTinHanhTrinhKhamMoiNhat"
                )}
                overlayStyle={{ whiteSpace: "nowrap" }}
                overlayInnerStyle={{ width: "fit-content" }}
              >
                <IconSycn
                  className=""
                  style={{
                    fill: "#0762F7",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
                {/* <img className="mt--2px" src={loadIcon} alt="IconLoad" /> */}
              </Tooltip>
            </Col>
            <Col
              xs={1}
              style={{ textAlign: "right", cursor: "pointer" }}
              onClick={clickCollapse}
            >
              <Tooltip
                title={t(collapse ? "common.moRong" : "common.thuGon")}
                overlayStyle={{ whiteSpace: "nowrap" }}
                overlayInnerStyle={{ width: "fit-content" }}
                visible={state.off ? false : undefined}
                onVisibleChange={(e) => {
                  if (e && state.off) {
                    setState({ off: false });
                  }
                }}
              >
                <Icon
                  className="icon-collapse-kb"
                  component={collapse ? extendTable : extendChiTiet}
                />
              </Tooltip>
            </Col>
          </>
        )}
      </MainStep>
      <MainInfo>
        <div className="info-partient">
          <div className="info-partient__index">
            {dsKham?.length ? dsKham[0].stt : ""}
          </div>
          <div className="info-partient__name">
            <span>{tenNb}</span>
            {gt.ten && age && ` (${gt.ten && `${gt.ten} - `} ${age})`}
            <div className="info-partient__mhs">
              {collapse ? (
                <>
                  <div>
                    {t("common.maHoSo")}:<div>{infoNb?.maHoSo}</div>
                  </div>
                  <div>
                    {t("common.maNb")}: <div>{infoNb?.maNb}</div>
                  </div>
                </>
              ) : (
                <>
                  {t("common.maHoSo")}: {infoNb?.maHoSo} {collapse ? "" : "-"}{" "}
                  {t("common.maNb")}: {infoNb?.maNb}
                </>
              )}
            </div>
          </div>
        </div>
        {checkRole([ROLES["KHAM_BENH"].XEM_SO_TIEN]) && (
          <Row className="info-price">
            <Col xs={12} style={{ color: "#FC3B3A" }}>
              {t("khamBenh.chuaThanhToan")}:
              {(tienChuaThanhToan && ` ${tienChuaThanhToan.formatPrice()}đ`) ||
                ` ${0}đ`}
            </Col>
            <Col xs={12} style={{ color: "#049254" }}>
              {t("khamBenh.tongVienPhi")}:
              {(tienVienPhi && ` ${tienVienPhi.formatPrice()}đ`) || ` ${0}đ`}
            </Col>
            <Col xs={12} style={{ color: "#BF9806" }}>
              {t("khamBenh.bhytThanhToan")}:
              {(tienBhThanhToan && ` ${tienBhThanhToan.formatPrice()}đ`) ||
                ` ${0}đ`}
            </Col>
            <Col xs={12} style={{ color: "#0762F7" }}>
              {t("khamBenh.tongDonThuoc")}:
              {(tienThuoc && ` ${tienThuoc.formatPrice()}đ`) || ` ${0}đ`}
            </Col>
          </Row>
        )}
      </MainInfo>
      {renderHanhTrinhKham}
      <ModalFolderAndFile ref={refModalFoderAndFile}></ModalFolderAndFile>
    </Main>
  );
};

export default React.memo(ThongTinBN);
