import { Col, Row, Button, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { SearchKho, Main, InputSearch, InputSearch2 } from "./styled";
import { connect } from "react-redux";
import IcFilter from "assets/images/kho/icFilter.png";
import "./styled.css";
import CustomPopover from "../CustomPopover";
import { useHistory } from "react-router-dom";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Select } from "components";
import { TRANG_THAI_DIEU_TRI } from "constants/index";

const TimKiemPhieu = ({ onChangeInputSearch, ...props }) => {
  useEffect(() => {}, []);
  const refShow = useRef(null);
  const refTimeOut = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (key) => (e) => {
    onChangeInputSearch({ [key]: e });
  };

  const onKeyDown = (type) => (e) => {
    if (e?.key == "Enter") {
      const value = e.target ? e.target?.value : e;
      onChangeInputSearch({ [type]: `${value}`.trim() });
    }
  };

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách người bệnh cần theo dõi</label>
          </div>
          {/* <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nha-thuoc/them-moi");
              }}
            >
              <span>Thêm mới</span>
              <img src={IcCreate} />
            </Button>
          </div> */}
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <CustomPopover ref={refShow}></CustomPopover>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span>Bộ lọc</span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="336px">
            <InputSearch>
              <Input
                placeholder="Nhập để tìm theo họ tên người bệnh"
                autoFocus
                onKeyDown={onKeyDown("tenNb")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="336px">
            <InputSearch>
              <Input
                placeholder="Nhập để tìm theo số  điện thoại"
                autoFocus
                onKeyDown={onKeyDown("soDienThoai")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="336px">
            <InputSearch>
              <Input
                placeholder="Nhập để tìm mã hồ sơ"
                autoFocus
                onKeyDown={onKeyDown("maHoSo")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="346px">
            <InputSearch>
              <Input
                placeholder="Nhập hoặc quét QR mã NB"
                autoFocus
                onKeyDown={onKeyDown("maNb")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="334px">
            <SearchKho>
              <Select
                placeholder="Trạng thái điều trị"
                autoFocus
                data={TRANG_THAI_DIEU_TRI}
                onChange={onChange("ketThucTheoDoiCovid")}
              />
            </SearchKho>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default connect(
  (state) => ({}),
  ({ danhSachCovid: { onChangeInputSearch } }) => ({
    onChangeInputSearch,
  })
)(TimKiemPhieu);
