import { Col, Row, Input } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { SearchKho, Main, InputSearch } from "./styled";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { debounce, cloneDeep } from "lodash";
import { useTranslation } from "react-i18next";
const TimKiem = () => {
  const { searchByParams } = useDispatch().danhSachPhieuChoKy;

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();

  const { tongHop: baoCaotongHop } = useDispatch().baoCao;
  const { listPhieu } = useSelector((state) => state.baoCao);
  useEffect(() => {
    baoCaotongHop();
  }, []);
  const debounceOnChange = useCallback(
    debounce((key, value) => searchByParams({ [key]: value }), 500),
    []
  );
  const onChange = (key) => (e) => {
    setState({
      [key]: e.target.value,
    });
    debounceOnChange(key, e.target.value);
  };
  const onSearchInput = (key) => (e) => {
    if (key === "tenBaoCao") {
      setState({
        tenBaoCao: e,
      });
      searchByParams({ tenBaoCao: e });
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByParams({ ...state });
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>{t("kySo.danhSachPhieuChoKy")}</label>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder={t("kySo.nhapDeTimTheoHoTenNguoiBenh")}
                onChange={onChange("tenNb")}
                onKeyDown={onKeyDown}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder={t("kySo.nhapDeTimMaHoSo")}
                onChange={onChange("maHoSo")}
                onKeyDown={onKeyDown}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder={t("kySo.nhapDeTimTheoTeNguoiTrinhKy")}
                onChange={onChange("tenNguoiTrinhKy")}
                onKeyDown={onKeyDown}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: 300 }}
                showArrow
                showSearch
                placeholder={t("kySo.tenPhieu")}
                data={
                  listPhieu &&
                  cloneDeep(listPhieu)?.map((item) => {
                    item.id = item.ten;
                    return item;
                  })
                }
                ten="tenBaoCao"
                onChange={onSearchInput("tenBaoCao")}
              ></Select>
            </SearchKho>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
