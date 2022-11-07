import React, { useEffect, useState } from "react";
import { Main, SearchPartient, ButtonSearch } from "./styled";
import { Row, Col } from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import InputBlockString from "components/DanhMuc/inputBlockString";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { useTranslation } from "react-i18next";

function TimKiemBN(props) {
  const { t } = useTranslation();
  const {
    chanDoanHinhAnh: { listPhongChanDoan, listKhoa, listNhomDichVu },
    nhanVien: { listAllNhanVien },
    auth: { auth },
    dsBenhNhan: { dieuDuongId },
  } = useSelector((state) => state);
  const {
    chanDoanHinhAnh: { getPhongChanDoan, getKhoaAll, getNhomDichVuAll },
    dsBenhNhan: { onChangeInputSearch, updateData },
    qms: { getDsNguoiBenhCLSQms },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  let paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const [state, _setState] = useState({
    listPhong: [],
    nguoiThucHienId: null,
    dieuDuongId: null,
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getPhongChanDoan({ loaiPhong: 20 }, paramCheck);
    getKhoaAll({});
    getNhomDichVuAll({ tiepDonCls: true, active: true });
    getListAllNhanVien({ size: "", page: "", active: true });
  }, []);

  useEffect(() => {
    let dsPhongThucHienId =
      (listPhongChanDoan.length && listPhongChanDoan[0].id) || null;
    let khoaId =
      (listPhongChanDoan.length && listPhongChanDoan[0].khoaId) || null;
    setState({
      listPhong: listPhongChanDoan,
      dsPhongThucHienId,
    });
    updateData({ dsPhongThucHienId, khoaId });
    if (
      dsPhongThucHienId &&
      paramCheck &&
      checkRole([ROLES["CHAN_DOAN_HINH_ANH"].NB_TIEP_THEO])
    )
      getDsNguoiBenhCLSQms(dsPhongThucHienId);
  }, [listPhongChanDoan]);

  useEffect(() => {
    let dsKhoaThucHienId = (listKhoa.length && listKhoa[0].id) || null;
    setState({
      dsKhoaThucHienId,
    });
    updateData({ dsKhoaThucHienId });
  }, [listKhoa]);

  useEffect(() => {
    let dsNhomDichVuCap2Id =
      (listNhomDichVu.length && listNhomDichVu[0].id) || null;
    setState({
      dsNhomDichVuCap2Id,
    });
    updateData({ dsNhomDichVuCap2Id });
  }, [listNhomDichVu]);

  useEffect(() => {
    if (auth) {
      updateData({ dieuDuongId: auth.nhanVienId });
    }
  }, [auth]);

  const handleSearchBN = () => {};
  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "dsPhongThucHienId") {
      setState({
        soLuongHanDoi: item?.lists?.slBanLayBenhPham,
      });
      onChangeInputSearch({
        dsPhongThucHienId: value,
      });
      updateData({ dsPhongThucHienId: value });
      if (value) getDsNguoiBenhCLSQms(value);
    }
    if (key === "dsKhoaThucHienId") {
      if (value.length) {
        onChangeInputSearch({
          dsKhoaThucHienId: value,
        });
      } else {
        onChangeInputSearch({ dsKhoaThucHienId: "" });
      }
    }
    if (key === "dsNhomDichVuCap2Id") {
      if (value.length) {
        onChangeInputSearch({
          dsNhomDichVuCap2Id: value,
        });
      } else {
        onChangeInputSearch({ dsNhomDichVuCap2Id: "" });
      }
    }

    if (key === "nguoiThucHienId" || key === "dieuDuongId") {
      updateData({ [key]: value });
    }

    setState({
      [key]: value,
    });
  };
  return (
    <Main>
      <Row align="middle">
        <Col xs={(paramCheck && 10) || 12}>
          <SearchPartient>
            <div
              className="title pointer"
              onClick={() => {
                if (paramCheck) openInNewTab("/danh-muc/phong");
                else openInNewTab("/danh-muc/nhom-dich-vu?level=2");
              }}
            >
              {(paramCheck && t("cdha.phongThucHien")) || t("cdha.nhomDichVu")}
            </div>
            {(paramCheck && (
              <Select
                data={state.listPhong}
                value={state.dsPhongThucHienId}
                placeholder={t("cdha.chonPhongThucHien")}
                style={{ width: "100%" }}
                onChange={onChange("dsPhongThucHienId")}
              />
            )) || (
              <Select
                data={listNhomDichVu}
                value={state.dsNhomDichVuCap2Id}
                placeholder={t("cdha.chonNhomDichVu")}
                style={{ width: "100%" }}
                mode="multiple"
                showArrow
                onChange={onChange("dsNhomDichVuCap2Id")}
              />
            )}
          </SearchPartient>
        </Col>
        <>
          <Col xs={(paramCheck && 10) || 12}>
            <SearchPartient>
              <div
                className="title pointer"
                onClick={() => openInNewTab("/danh-muc/khoa")}
              >
                {(paramCheck && t("cdha.soLuongHangDoi")) || t("cdha.khoa")}
              </div>
              {(paramCheck && (
                <InputBlockString
                  placeholder={t("cdha.nhapSoLuongHangDoi")}
                  style={{ width: "100%" }}
                  // value={state.soLuongHanDoi}
                  onChange={onChange("soLuongHanDoi")}
                  disabled //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
                />
              )) || (
                <Select
                  style={{ width: "100%" }}
                  data={listKhoa}
                  value={state.dsKhoaThucHienId}
                  mode="multiple"
                  showArrow
                  onChange={onChange("dsKhoaThucHienId")}
                />
              )}
            </SearchPartient>
          </Col>
          {paramCheck && (
            <Col xs={4}>
              <ButtonSearch onClick={() => handleSearchBN()}>OK</ButtonSearch>
            </Col>
          )}
        </>
      </Row>
      <Row align="middle" style={{ marginTop: "10px" }}>
        <Col xs={10}>
          <SearchPartient>
            <div
              className="title pointer"
              onClick={() => openInNewTab("/quan-tri/nhan-vien")}
            >
              {t("cdha.dieuDuong")}
            </div>
            <Select
              data={listAllNhanVien}
              placeholder={t("cdha.chonDieuDuong")}
              style={{ width: "100%" }}
              onChange={onChange("dieuDuongId")}
              value={dieuDuongId || null}
            />
          </SearchPartient>
        </Col>
        <>
          <Col xs={14}>
            <SearchPartient>
              <div
                className="title pointer"
                onClick={() => openInNewTab("/quan-tri/nhan-vien")}
              >
                {t("cdha.nguoiThucHien")}
              </div>
              <Select
                style={{ width: "100%" }}
                data={listAllNhanVien}
                placeholder={t("cdha.chonNguoiThucHien")}
                onChange={onChange("nguoiThucHienId")}
              />
            </SearchPartient>
          </Col>
        </>
      </Row>
    </Main>
  );
}

export default TimKiemBN;
