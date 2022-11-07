import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Col, Row, Checkbox, Tooltip, message, Select, Divider } from "antd";
import { ROLES, LENGTH_ZERO_PREFIX, ENUM } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import {
  Main,
  PopoverWrapper,
  GlobalStyle,
  AddButtonStyled,
  DropdownStyle,
} from "./styled";
import Image from "components/Image";
import { checkData, formatPhone } from "utils";
import { addPrefixNumberZero } from "utils";
import fileUtils from "utils/file-utils";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalChinhSuaThongTin from "../../../TiepDon/ModalChinhSuaThongTin";
import SaveIcon from "assets/svg/chuanDoanHinhAnh/save.svg";
import { useEnum } from "hook";
import { Button } from "components";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalThemMoiGoi from "pages/goiDichVu/DanhSachSuDungGoi/ModalThemMoiGoi";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";

const { Option } = Select;

const ThongTinBN = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [editGoiDv, setEditGoiDv] = useState(false);
  const [dsGoiChon, setDsGoiChon] = useState([]);

  const refModalChinhSuaThongTin = useRef(null);
  const refModalThemMoiGoi = useRef(null);
  const {
    hangThe,
    anhDaiDien,
    stt,
    maSoGiayToTuyThan,
    maTheBhyt,
    tuNgayTheBhyt,
    denNgayTheBhyt,
    diaChi,
    tuoi,
    soDienThoai,
    ngaySinh,
    chiNamSinh,
    khamSucKhoe,
    loaiDoiTuongKsk,
    maHopDongKsk,
    tenHopDongKsk,
    chucVu,
    phongBan,
    gioiTinh,
    tenNb,
    maHoSo,
    maNb,
    thangTuoi,
    nbThongTinId,
  } = useSelector((state) => state.nbDotDieuTri.thongTinBenhNhan || {});
  // console.log(useSelector((state) => state.nbDotDieuTri.thongTinBenhNhan || {}))
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { listNbGoiDv, listGoiDv } = useSelector((state) => state.nbGoiDv);

  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.map((item) => {
      item.ten = t(item.i18n);
      return item;
    });
    return list;
  }, [t]);

  const {
    nbDotDieuTri: { getById },
    tiepDonDichVu: { postNbGoiDv },
    nbGoiDv: { getByNbThongTinId, getListGoiDv },
  } = useDispatch();

  useEffect(() => {
    if (nbThongTinId) {
      getByNbThongTinId({
        nbThongTinId,
      });
    }
  }, [nbThongTinId]);

  const displayAge = () => {
    const str = ngaySinh
      ? chiNamSinh
        ? moment(ngaySinh).format("YYYY")
        : moment(ngaySinh).format("DD/MM/YYYY")
      : "";

    let age = "";
    if (thangTuoi && thangTuoi <= 36) {
      age = `${thangTuoi ? thangTuoi : ""} ${t("common.thang")}`;
    } else {
      age = `${tuoi != undefined ? tuoi : ""} ${t("common.tuoi")}`;
    }
    return !str ? "" : `${str} - ${age}`;
  };

  const onEdit = () => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show({ id }, () => {
        message.success(t("common.daLuuDuLieu"));
        getById(id);
      });
  };

  function onEditGoiDv() {
    setEditGoiDv(true);
    setDsGoiChon((listNbGoiDv || []).map((x) => x.goiDvId));
    getListGoiDv({ page: "", size: "", active: true });
  }

  function onSaveGoiDv() {
    const insertGoiDv = dsGoiChon.filter(
      (x1) => listNbGoiDv.findIndex((x2) => x2.goiDvId === x1) === -1
    );
    Promise.all(
      insertGoiDv.map((x) => {
        return postNbGoiDv({ nbDotDieuTriId: id, goiDvId: x });
      })
    ).then(() => {
      getByNbThongTinId({
        nbThongTinId,
      });
      setEditGoiDv(false);
    });
  }

  const handleChange = (value) => {
    setDsGoiChon(value);
  };

  const onCreateGoiLieuTrinh =
    (autoAdd = false) =>
    () => {
      refModalThemMoiGoi.current &&
        refModalThemMoiGoi.current.show(
          {
            // loaiDichVu: state.loaiDichVu,
            dsDoiTuongSuDung: [],
            // nbThongTinId: infoPatient.nbThongTinId,
            // nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
            // khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
            // chiDinhTuDichVuId: currentToDieuTri.id,
            chiDinhTuLoaiDichVu: 210,
            disableChiDinh: false,
            isHiddenTyLett: true,
            isPhauThuat: false,
            listLoaiChiDinhDV: listLoaiChiDinhDV,
            maNb,
            tenNb,
          },
          (newId) => {
            getListGoiDv({});
            setDsGoiChon([...dsGoiChon, newId]);

            if (autoAdd) {
              postNbGoiDv({ nbDotDieuTriId: id, goiDvId: newId }).then(() => {
                getByNbThongTinId({
                  nbThongTinId,
                });
              });
            }
          }
        );
    };

  return (
    <Main className="info">
      <DropdownStyle />
      <div className="avatar-header">
        {/* <div className="order">{addPrefixNumberZero(stt, LENGTH_ZERO_PREFIX)}</div> */}
        <div className="avatar">
          {hangThe && hangThe?.icon && (
            <div className="hangTheIcon">
              <GlobalStyle />
              <PopoverWrapper
                overlayClassName="hangThe"
                openClassName="hangThe"
                content={`${hangThe?.ten}`}
                placement="right"
                trigger="hover"
              >
                <img
                  src={`${fileUtils.absoluteFileUrl(hangThe?.icon)}`}
                  alt=""
                />
              </PopoverWrapper>
            </div>
          )}
          <Image
            src={anhDaiDien}
            defauleImage={require("assets/images/welcome/avatar.png")}
          />
        </div>
      </div>
      <div className="body-info">
        <div className="title-header">
          <div className="name">
            {addPrefixNumberZero(stt, LENGTH_ZERO_PREFIX)}
            {stt && " - "}
            {tenNb}
            {gioiTinh ? (
              <span className="gender">
                ({checkData(gioiTinh, listGioiTinh).ten})
              </span>
            ) : null}
          </div>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].XEM_LAI_TT]}>
            <div className="button" onClick={onEdit}>
              {t("tiepDon.suaThongTin")}
              <Tooltip placement="top" title={t("tiepDon.suaThongTin")}>
                <EditIcon className="icon" />
              </Tooltip>
            </div>
          </AuthWrapper>
        </div>
        <Row className="info-full">
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">{t("common.ngaySinh")}: </div>
              <div className="detail small">{displayAge()}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            {khamSucKhoe || loaiDoiTuongKsk ? (
              <div className="person">
                <div className="nguoi-benh-kham-suc-khoe">
                    <Checkbox checked={khamSucKhoe || loaiDoiTuongKsk}></Checkbox>
                  <span> {t("tiepDon.nguoiBenhKSK2")}</span>
                </div>
              </div>
            ) : null}
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small address">{t("common.diaChi")}: </div>
              <div className="detail small address">{diaChi}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            {khamSucKhoe || loaiDoiTuongKsk ? (
              <div className="person">
                <div className="title">{t("tiepDon.hopDong")}: </div>
                <div className="detail">{maHopDongKsk} - {tenHopDongKsk}</div>
              </div>
            ) : (
              <div className="person">
                <div className="title">{t("common.soBHYT")}: </div>
                <div className="detail">{maTheBhyt}</div>
              </div>
            )}
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">{t("common.soGiayToTuyThan")}: </div>
              <div className="detail small">{maSoGiayToTuyThan}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            {khamSucKhoe || loaiDoiTuongKsk ? (
              <div className="person">
                <div className="title small">{t("tiepDon.chucVuPhongBan")}: </div>
                <div className="detail small">{chucVu} - {phongBan}</div>
              </div>
            ) : (
              <div className="person">
                <div className="title">{t("tiepDon.giaTriThe")}: </div>
                <div className="detail">
                  {tuNgayTheBhyt
                    ? `${t("common.tu")} ${moment(tuNgayTheBhyt).format(
                        "DD/MM/YYYY"
                      )}`
                    : null}
                  {denNgayTheBhyt
                    ? ` ${t("common.den")} ${moment(denNgayTheBhyt).format(
                        "DD/MM/YYYY"
                      )}`
                    : null}
                </div>
              </div>
            )}
            
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">{t("common.sdt")} : </div>
              <div className="detail small">
                {soDienThoai && formatPhone(soDienThoai)}
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">{t("common.maNb")}: </div>
              <div className="detail">{maNb}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small" style={{ alignItems: "center" }}>
                {"NB sử dụng gói"}:{" "}
                {!editGoiDv && (
                  <Tooltip title="Chỉnh sửa gói dịch vụ người bệnh">
                    <EditIcon className="icon" onClick={onEditGoiDv} />
                  </Tooltip>
                )}
                &ensp;
                {!editGoiDv && (
                  <Tooltip title="Thêm mới gói dịch vụ">
                    <PlusCircleOutlined
                      style={{ color: "#049254", fontSize: 15 }}
                      onClick={onCreateGoiLieuTrinh(true)}
                    />
                  </Tooltip>
                )}
              </div>
              {editGoiDv ? (
                <div className="detail small select-goidv">
                  <Select
                    mode="multiple"
                    value={dsGoiChon}
                    onChange={handleChange}
                    listHeight={150}
                    filterOption={(input, option) =>
                      option &&
                      option.children &&
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <AddButtonStyled>
                          <Button
                            leftIcon={<PlusCircleOutlined />}
                            type={"success"}
                            onClick={onCreateGoiLieuTrinh(false)}
                          >
                            {t("goiDichVu.themMoiGoi")}
                          </Button>
                        </AddButtonStyled>
                      </>
                    )}
                    dropdownClassName="tt-nb-select-goi-dv"
                  >
                    {listGoiDv.map((item) => (
                      <Option
                        key={item.id}
                        value={item.id}
                        disabled={
                          listNbGoiDv.findIndex(
                            (x) => x.goiDvId === item.id
                          ) !== -1
                        }
                      >
                        {item.ten}
                      </Option>
                    ))}
                  </Select>

                  <SaveIcon className="icon" onClick={onSaveGoiDv} />
                </div>
              ) : (
                <div className="detail small">
                  {(listNbGoiDv || []).map((item, idx) => {
                    return (
                      <a
                        href={`/goi-dich-vu/chi-tiet-nguoi-benh-su-dung-goi/${item.id}`}
                        key={item.id}
                        target={"_blank"}
                      >
                        {item.tenGoiDv}
                        {idx + 1 < (listNbGoiDv || []).length && (
                          <span>, </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">{t("common.maHs")} : </div>
              <div className="detail">{maHoSo}</div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
      <ModalThemMoiGoi ref={refModalThemMoiGoi} />
    </Main>
  );
};

export default memo(ThongTinBN);
