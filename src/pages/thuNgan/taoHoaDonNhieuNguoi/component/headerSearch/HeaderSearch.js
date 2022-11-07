import React from "react";
import { InputSearch, Main } from "./styled";
import { Button, Col, Input, Row } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";


const { RangePicker } = DatePicker;
const HeaderSearch = (props) => {
  const { t } = useTranslation();
  const { onSearch, stateParent, setStateParent } = props;
  const onSearchInput = (key) => (e) => {
    let dataSearch = {};
    if (key === "tongHop") {
      if (Number.isInteger(+e.target.value)) {
        delete stateParent.dataSearch.tenNb;
        dataSearch = {
          ...stateParent.dataSearch,
          maHoSo: e.target.value,
        };
        setStateParent({
          dataSearch,
        });
      } else {
        delete stateParent.dataSearch.maHoSo;
        dataSearch = {
          ...stateParent.dataSearch,
          tenNb: e.target.value,
        };
        setStateParent({
          dataSearch,
        });
      }
    } else {
      let value = "";
      if (e?.target) {
        if (e.target.hasOwnProperty("checked")) value = e.target.checked;
        else value = e.target.value;
      } else value = e;
      dataSearch = {
        ...stateParent.dataSearch,
        [key]: value,
      };
      setStateParent({
        dataSearch,
      });
    }
  };
  const handleChangeDate = (date) => {
    if (date) {
      const thoiGianThanhToanTu = date[0];
      const thoiGianThanhToanDen = date[1];
      const dataSearch = {
        ...stateParent.dataSearch,
        thoiGianThanhToanTu,
        thoiGianThanhToanDen,
      };
      setStateParent({
        dataSearch,
      });
    }
  };
  const handleSearch = () => {
    onSearch({
      size: stateParent?.size,
      page: stateParent?.page,
      dataSearch: stateParent.dataSearch,
    });
  };
  return (
    <Main>
      <Row style={{ paddingTop: "10px" }}>
        <Col md={4} xl={6}>
          <RangePicker
            placeholder={[
              t("thuNgan.thoiGianThanhToanTu"),
              t("thuNgan.thoiGianThanhToanDen"),
            ]}
            showTime
            onChange={handleChangeDate}
            value={[
              stateParent.dataSearch?.thoiGianThanhToanTu,
              stateParent.dataSearch?.thoiGianThanhToanDen,
            ]}
          />
        </Col>
        <Col md={4} xl={6}>
          <InputSearch>
            <Input
              onChange={onSearchInput("tenThuNgan")}
              onKeyDown={onSearchInput}
              placeholder={t("thuNgan.nhapDeLocTenThuNgan")}
              onPressEnter={handleSearch}
              value={stateParent?.dataSearch?.tenThuNgan}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col md={4} xl={6}>
          <InputSearch>
            <Input
              onChange={onSearchInput("tongHop")}
              placeholder={t("thuNgan.nhapDeTimTheoTenNguoiBenhMaHoSo")}
              onPressEnter={handleSearch}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col md={4} xl={6}>
          <Button className="btn-search" onClick={handleSearch}>
            {t("common.tim")}
            <SearchOutlined></SearchOutlined>
          </Button>
        </Col>
      </Row>
    </Main>
  );
};

export default HeaderSearch;
