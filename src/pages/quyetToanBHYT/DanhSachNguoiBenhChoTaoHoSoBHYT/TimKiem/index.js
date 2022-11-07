import { Col, Row, Input, DatePicker } from "antd";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { SearchKho, Main, InputSearch } from "./styled";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import "./styled.css";
import { debounce } from "lodash";
import Calendar from "assets/images/kho/calendar.png";
import FileIcon from "assets/images/utils/file.png";
import moment from "moment";
import ModalTaoHoSoHangLoat from "../ModalTaoHoSoHangLoat";
import { useListAll } from "hook";
const { RangePicker } = DatePicker;
const TimKiem = (props) => {
  const refModal = useRef(null);
  const { searchByParams } =
    useDispatch().danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT;
  const [listAllKhoa] = useListAll("khoa");
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  //
  const { tongHop: baoCaotongHop } = useDispatch().baoCao;
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
    if (key === "khoaNbId") {
      setState({
        khoaNbId: e,
      });
      searchByParams({ khoaNbId: e });
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByParams({ ...state });
    }
  };
  const onChangeDate = (key) => (e) => {
    console.log("e: ", e);
    let value = "";
    let value1 = "";
    value = e && moment(e[0])?.format("YYYY-MM-DD HH:mm:ss");
    value1 = e && moment(e[1])?.format("YYYY-MM-DD HH:mm:ss");
    setState({ [`tu${key}`]: value, [`den${key}`]: value1 });
    searchByParams({
      [`tu${key}`]: value,
      [`den${key}`]: value1,
    });
  };
  const handleSearchBN = debounce((value) => {
    const { qrBN = "" } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str) || !str) {
      param = { maNb: Number(str) || "" };
    } else {
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maNb");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res.length) {
        if (res[0].length >= 10) {
          param = { maNb: Number(res[0]) };
        }
      }
    }
    searchByParams({ maNb: param?.maNb });
  }, 1000);
  const onKeyDownQR = (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (e.key === "Enter") {
      handleSearchBN(value);
    }
  };
  const onChangeSearch = (key, needEnter) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "qrBN") {
      if (/^[0-9]+$/.test(value) || !value) {
        handleSearchBN(value);
      }
    }
  };
  return (
    <Main>
      <Row style={{ padding: "8px 0px" }}>
        <span
          className="title-sort sort-2"
          onClick={() => refModal?.current?.show()}
        >
          Tạo hồ sơ hàng loạt
          <img src={FileIcon} alt="IconSearch" className="icon-search" />
        </span>
      </Row>

      <Row style={{ paddingTop: "10px" }}>
        <Col span={4}>
          <InputSearch>
            <Input
              placeholder="Nhập để tìm theo họ tên người bệnh"
              onChange={onChange("tenNb")}
              onKeyDown={onKeyDown}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col span={3}>
          <InputSearch>
            <Input
              placeholder="Nhập để tìm mã hồ sơ"
              onChange={onChange("maHoSo")}
              onKeyDown={onKeyDown}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col span={4}>
          <InputSearch>
            <Input
              placeholder="Nhập hoặc quét QR mã NB"
              onChange={onChangeSearch("qrBN", true)}
              onKeyDown={onKeyDownQR}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col span={3}>
          <SearchKho>
            <Select
              style={{ width: "100%" }}
              showArrow
              showSearch
              placeholder="Tất cả khoa"
              data={listAllKhoa}
              ten="khoaNbId"
              onChange={onSearchInput("khoaNbId")}
            ></Select>
          </SearchKho>
        </Col>
        <Col span={5}>
          <div className="date">
            <label className="title">Ngày đăng ký</label>
            <RangePicker
              value={
                state?.tuThoiGianVaoVien && state?.denThoiGianVaoVien
                  ? [
                      moment(state?.tuThoiGianVaoVien),
                      moment(state?.denThoiGianVaoVien),
                    ]
                  : [moment().startOf("day")]
              }
              style={{ paddingTop: 0 }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("ThoiGianVaoVien")}
              showTime
              suffixIcon={
                <img src={Calendar} alt="..." style={{ marginRight: 5 }} />
              }
              separator={<div>-</div>}
            ></RangePicker>
          </div>
        </Col>
        <Col span={5}>
          <div className="date">
            <label className="title">Ngày thanh toán</label>
            <RangePicker
              value={
                state?.tuThoiGianThanhToan && state?.denThoiGianThanhToan
                  ? [
                      moment(state?.tuThoiGianThanhToan),
                      moment(state?.denThoiGianThanhToan),
                    ]
                  : [moment().startOf("day")]
              }
              style={{ paddingTop: 0 }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("ThoiGianThanhToan")}
              showTime
              suffixIcon={
                <img src={Calendar} alt="..." style={{ marginRight: 5 }} />
              }
              separator={<div>-</div>}
            ></RangePicker>
          </div>
        </Col>
      </Row>
      <ModalTaoHoSoHangLoat ref={refModal} />
    </Main>
  );
};

export default TimKiem;
