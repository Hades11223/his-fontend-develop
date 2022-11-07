import { Col, Row, Input } from "antd";
import React, { useState } from "react";
import { SearchKho, Main, InputSearch } from "./styled";
import Select from "components/Select";
import { useDispatch } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
const TimKiem = (props) => {
  const { searchByParamsTongHop } = useDispatch().lichSuKyDanhSachNguoiBenh;

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => (e) => {
    if (/([\}\{])/g.test(e.target.value)) {
      return null;
    } else {
      searchByParamsTongHop({ [key]: e.target.value });
    }
  };
  const onSearchInput = (key) => (e) => {
    searchByParamsTongHop({ [key]: e });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      let obj = JSON.parse(e.target.value).maNb;
      if (obj) {
        // Search info nb
        searchByParamsTongHop({ maNb: obj });
      }
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách người bệnh</label>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder="Nhập để tìm theo họ tên người bệnh"
                onChange={onChange("tenNb")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder="Nhập để tìm mã hồ sơ"
                onChange={onChange("maHoSo")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input
                placeholder="Nhập hoặc quét QR để tìm mã người bệnh"
                onChange={onChange("maNb", true)}
                onKeyDown={onKeyDown}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: 300 }}
                // mode="multiple"
                showArrow
                showSearch
                placeholder="Giới tính"
                data={[
                  {
                    id: 1,
                    ten: "Nam",
                  },
                  {
                    id: 2,
                    ten: "Nữ",
                  },
                ]}
                ten="gioiTinh"
                onChange={onSearchInput("gioiTinh")}
              ></Select>
            </SearchKho>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
