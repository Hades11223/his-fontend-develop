import { Col, Row, Input } from "antd";
import React, { useEffect } from "react";
import { SearchKho, Main, InputSearch } from "./styled";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { cloneDeep } from "lodash";
import TTCoBan from "pages/kySo/components/TTCoBan";
import { TRANG_THAI_KY } from "constants/index";
import { useTranslation } from "react-i18next";

const TimKiem = (props) => {
  const { searchByParams } = useDispatch().lichSuKyDanhSachPhieu;
  const { getUtils } = useDispatch().utils;
  const { t } = useTranslation();

  const { tongHop: baoCaotongHop } = useDispatch().baoCao;
  const { listPhieu } = useSelector((state) => state.baoCao);

  useEffect(() => {
    baoCaotongHop();
    getUtils({ name: "trangThaiKy" });
  }, []);

  const onChange = (key) => (e) => {
    searchByParams({ [key]: e.target.value });
  };
  const onSearchInput = (key) => (e) => {
    if (key === "tenBaoCao" || key === "trangThai") {
      if (e === "all") {
        return searchByParams({ trangThai: null });
      }
      searchByParams({ [key]: e });
    } else {
      searchByParams({ [key]: e.target.value });
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>{t("kySo.danhSachPhieu")}</label>
          </div>
        </Row>
        <TTCoBan />
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: "100%", background: "white" }}
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
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: "100%", background: "white" }}
                showArrow
                showSearch
                placeholder={t("kySo.trangThaiPhieu")}
                data={TRANG_THAI_KY}
                ten="trangThai"
                onChange={onSearchInput("trangThai")}
              ></Select>
            </SearchKho>
          </Col>

          <Col span={5}>
            <InputSearch>
              <Input
                placeholder={t("kySo.nhapDeTimTheoSoPhieuKy")}
                onChange={onChange("soPhieu")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
