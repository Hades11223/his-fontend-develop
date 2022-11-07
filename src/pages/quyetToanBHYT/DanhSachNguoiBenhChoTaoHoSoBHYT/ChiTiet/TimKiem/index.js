import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import "./styled.css";
import TTCoBan from "../TTCoBan";
const TimKiem = (props) => {
  const { searchByParams } = useDispatch().lichSuKyDanhSachPhieu;
  const { getUtils } = useDispatch().utils;

  //
  const { tongHop: baoCaotongHop } = useDispatch().baoCao;

  useEffect(() => {
    baoCaotongHop();
    getUtils({ name: "trangThaiKy" });
  }, []);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
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
            <label>Chi tiết NB chờ tạo hồ sơ quyết toán BHYT</label>
          </div>
        </Row>
        <TTCoBan />
      </Row>
    </Main>
  );
};

export default TimKiem;
