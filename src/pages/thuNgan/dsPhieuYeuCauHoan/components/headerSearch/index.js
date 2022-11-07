import React, { useEffect, useState } from "react";
import { InputSearch, Main, PopupWrapper, SearchKho } from "./styled";
import { Button, Checkbox, Col, Input, Popover, Row } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";

const HeaderSearch = (props) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    dsTrangThai: [],
    statusAll: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { onChangeInputSearch: customChangeInputSearch, updateData } =
    dispatch.danhSachPhieuYeuCauHoan;
  const [listTrangThaiPhieuDoiTra] = useEnum(ENUM.TRANG_THAI_PHIEU_DOI_TRA);
  const { dsTrangThai, ...dataSearch } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan.dataSearch
  );

  const onChangeInputSearch = (data = {}) => {
    customChangeInputSearch({
      ...data,
      loai: checkRole([ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC]) ? 40 : null,
    });
  };

  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  let timer = null;
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (key === "searchTongHop") {
      updateData({
        dataSearch: {
          ...dataSearch,
          tenNb: "",
          maNb: "",
        },
      });
      if (Number.isInteger(+e.target.value)) {
        key = "maNb";
        value = e.target.value;
      } else if (isJson(e.target.value)) {
        console.log("d");
        const qrCode = JSON.parse(e.target.value);
        key = "maNb";
        value = qrCode?.maNb;
      } else {
        key = "tenNb";
        value = e.target.value;
      }
    } else {
      if (e?.target) {
        if (e.target.hasOwnProperty("checked")) value = e.target.checked;
        else value = e.target.value;
      } else value = e;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const onChangeStatus = (e) => {
    setState({
      statusAll: e.target.checked,
    });
    if (e.target.checked) {
      onChangeInputSearch({
        dsTrangThai: [20, 40],
      });
    } else {
      onChangeInputSearch({
        dsTrangThai: [],
      });
    }
  };

  useEffect(() => {
    if (listTrangThaiPhieuDoiTra) {
      const trangThai = listTrangThaiPhieuDoiTra
        .map((item) => {
          item.label = item.ten;
          item.value = item.id;
          return item;
        })
        .filter(
          (item) =>
            item.label == t("thuNgan.choHoan") ||
            item.label == t("thuNgan.hoanThanh")
        );
      setState({
        TRANG_THAI_PHIEU_HOAN: trangThai,
      });
    }
  }, [listTrangThaiPhieuDoiTra]);
  const group = () => (
    <>
      <Checkbox onChange={onChangeStatus} value={state.statusAll}>
        {t("common.tatCa")}
      </Checkbox>
      <Checkbox.Group
        options={state?.TRANG_THAI_PHIEU_HOAN}
        onChange={onSearchInput("dsTrangThai")}
        value={dsTrangThai}
        style={{ display: "flex", flexDirection: "column" }}
      />
    </>
  );
  return (
    <Main>
      <Row style={{ paddingTop: "10px" }}>
        <Col flex="132px">
          <SearchKho>
            <Button className="filter">
              <span> {t("common.timKiem")} </span>
            </Button>
          </SearchKho>
        </Col>
        <Col xs={8}>
          <InputSearch>
            <Input
              onChange={onSearchInput("searchTongHop")}
              onKeyDown={onSearchInput}
              placeholder={t(
                "thuNgan.nhapDeTimTheoTenNguoibenhMaNguoiBenhQRNguoiBenh"
              )}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col xs={8}>
          <InputSearch>
            <Input
              onChange={onSearchInput("soPhieu")}
              placeholder={t("thuNgan.nhapDeTimTheoSoPhieuYeuCauHoan")}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col flex="200px">
          <PopupWrapper>
            <Popover
              placement="bottom"
              content={group}
              trigger="click"
              overlayClassName="popup-kho"
            >
              <SearchKho>
                <Button className="status">
                  <span> {t("thuNgan.trangThaiPhieu")} </span>
                  <img src={IcDown} alt="..." />
                </Button>
              </SearchKho>
            </Popover>
          </PopupWrapper>
        </Col>
      </Row>
    </Main>
  );
};

export default HeaderSearch;
