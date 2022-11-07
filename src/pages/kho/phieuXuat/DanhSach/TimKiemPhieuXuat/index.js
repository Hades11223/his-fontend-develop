import React, { useEffect, useRef, useState, useMemo } from "react";
import { Button, Checkbox, Col, Input, Popover, Row } from "antd";
import IcClose from "assets/images/kho/icClose.png";
import IcDown from "assets/images/kho/ic-down-select.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import {
  TK_TRANG_THAI_PHIEU_NHAP_DU_TRU,
  LOAI_PHIEU_XUAT,
  TK_TRANG_THAI_PHIEU_NHAP_XUAT,
} from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "pages/kho/components/SelectSearch";
import InputTimeout from "components/InputTimeout";
import LocPhieu from "pages/kho/components/LocPhieu";
import { InputSearch, InputSearch2, Main, SearchKho } from "./styled";
import { useHistory } from "react-router-dom";
import { combineUrlParams } from "utils";
import { useQueryString } from "hook";
import cacheUtils from "utils/cache-utils";

const TimKiemPhieuXuat = (props) => {
  const [soPhieu] = useQueryString("soPhieu");
  const [state, _setState] = useState({
    type: [1],
    soPhieu,
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const history = useHistory();

  const { listKhoUser } = useSelector((state) => state.kho);
  const {
    phieuXuat: { onChangeInputSearch },
  } = useDispatch();
  const dsKhoUserId = useMemo(() => {
    return (listKhoUser || []).map((item) => item.id);
  }, [listKhoUser]);

  const listTrangThai = useMemo(() => {
    if (state.type[0] == 1) return TK_TRANG_THAI_PHIEU_NHAP_DU_TRU;
    return TK_TRANG_THAI_PHIEU_NHAP_XUAT;
  }, [state.type]);
  useEffect(() => {
    const search = {};
    if (listKhoUser.length) {
      if (state.type[0] == LOAI_PHIEU_XUAT[0].id) {
        if (state.dsKhoXuatId?.length) {
          search.dsKhoXuatId = state.dsKhoXuatId;
        } else {
          if (dsKhoUserId?.length) search.dsKhoXuatId = dsKhoUserId;
          else search.dsKhoXuatId = null;
        }

        if (state.dsKhoNhapId?.length) {
          search.dsKhoNhapId = state.dsKhoNhapId;
        } else {
          search.dsKhoNhapId = null;
        }

        search.dsLoaiNhapXuat = [20];
      } else if (state.type[0] == LOAI_PHIEU_XUAT[1].id) {
        if (state.dsKhoXuatId?.length) {
          search.dsKhoXuatId = state.dsKhoXuatId;
        } else {
          if (dsKhoUserId?.length) search.dsKhoXuatId = dsKhoUserId;
          else search.dsKhoXuatId = null;
        }

        if (state.dsKhoNhapId?.length) {
          search.dsKhoNhapId = state.dsKhoNhapId;
        } else {
          search.dsKhoNhapId = null;
        }
        search.dsLoaiNhapXuat = [30, 40, 90];
      } else {
        search.dsLoaiNhapXuat = [80, 85];
      }

      search.dsTrangThai = state.dsTrangThai?.length
        ? state.dsTrangThai
        : listTrangThai.map((item) => item.value);
      search.soPhieu = state.soPhieu;
      onChangeInputSearch({
        ...search,
      });
      history.replace(
        combineUrlParams(window.location.pathname, {
          soPhieu: state.soPhieu,
        })
      );
    }
    // onSizeChange({ dsKhoId });
  }, [
    listKhoUser,
    state.type,
    state.dsTrangThai,
    state.dsKhoXuatId,
    state.dsKhoNhapId,
    state.soPhieu,
  ]);

  const dsNhanVienKho = useMemo(() => {
    return (listKhoUser || []).map((item) => item);
  }, [listKhoUser]);

  const refShow = useRef(null);

  const onChange = (key) => (e) => {
    const newList = Object.assign([], state[key]) || [];
    const index = newList.findIndex((item) => item === e);

    if (index !== -1) {
      newList.splice(index, 1);
    } else if (e) {
      newList.push(e);
    }
    setState({ [key]: !e ? [] : newList });
  };

  useEffect(() => {
    cacheUtils.read("DATA_XUAT_KHO", "", "", false).then((s) => {
      if (s) setState({ type: [s] });
    });
  }, []);

  const onChangType = (e) => {
    // const type = state.type || [];
    // if (type[0] == e) setState({ type: [] });
    // else setState({ type: [e] });
    setState({ type: [e], dsTrangThai: [] });
    cacheUtils.save("DATA_XUAT_KHO", "", e, false);
  };

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    }
    setState({ ...state, dsTrangThai: value });
  };

  const group = (
    <Checkbox.Group
      options={listTrangThai}
      value={state.dsTrangThai}
      onChange={onSearchInput("dsTrangThai")}
    />
  );
  const loaiPhieu = useMemo(() => {
    return (
      LOAI_PHIEU_XUAT.find((item) => item.id == (state.type || [])[0])?.ten ||
      "Xem phiếu xuất"
    );
  }, [state.type]);
  const onKeyDown = (e) => {
    if (![16, 48, 49, 56, 55, 220].includes(e.keyCode)) {
      console.log(e.keyCode);
    }
    // console.log(e.keyCode);
  };
  return (
    <Main>
      <Row>
        <Col flex="110px">
          <SearchKho>
            <LocPhieu ref={refShow}></LocPhieu>
            <Button className="filter" onClick={() => handleRefShow()}>
              <img src={IcFilter} alt="..." />
              <span> Lọc phiếu </span>
            </Button>
          </SearchKho>
        </Col>
        <Col flex="220px">
          <SearchKho>
            <SelectSearch
              style={{ width: "100%" }}
              data={LOAI_PHIEU_XUAT}
              onChange={onChangType}
              value={loaiPhieu}
              listSelect={state.type}
              suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
            ></SelectSearch>
          </SearchKho>
        </Col>
        <Col flex="132px">
          <SearchKho>
            <SelectSearch
              style={{ width: "100%" }}
              data={dsNhanVienKho}
              onChange={onChange("dsKhoNhapId")}
              value="Kho nhập"
              listSelect={state.dsKhoNhapId}
              suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
            ></SelectSearch>
          </SearchKho>
        </Col>
        <Col flex="132px">
          <SearchKho>
            <SelectSearch
              style={{ width: "100%" }}
              data={dsNhanVienKho}
              listSelect={state.dsKhoXuatId}
              onChange={onChange("dsKhoXuatId")}
              value="Kho xuất"
              suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
            ></SelectSearch>
          </SearchKho>
        </Col>
        <Col flex="190px">
          <Popover placement="bottom" content={group} trigger="click">
            <InputSearch2>
              <Input value="Trạng thái phiếu" disabled></Input>
              <img src={IcDown} alt="IcDown" className="ic-down" />
            </InputSearch2>
          </Popover>
        </Col>
        <Col xs={9}>
          <InputSearch>
            <InputTimeout
              placeholder="Nhập để tìm kiếm số phiếu"
              // onKeyDown={onKeyDown}
              data={state.soPhieu}
              onChange={(value) => setState({ soPhieu: value })}
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
      </Row>
      <div className="array-store" style={{ flexFlow: "row wrap" }}>
        {(state.dsKhoNhapId || []).map((item, index) => {
          return (
            <div className="item" style={{ marginTop: 5 }} key={index}>
              <span>{dsNhanVienKho.find((x) => x.id == item)?.ten}</span>
              <img
                src={IcClose}
                alt="..."
                style={{ marginLeft: 5, cursor: "pointer" }}
                onClick={() => {
                  onChange("dsKhoNhapId")(item);
                  // const newDsKhoId = Object.assign([], state.dsKhoId);
                  // newDsKhoId.splice(index, 1);
                  // setState({
                  //   dsKhoId: newDsKhoId,
                  // });
                }}
              ></img>
            </div>
          );
        })}
        {(state.dsTrangThai || []).map((item, index) => {
          return (
            <div className="item" style={{ marginTop: 5 }} key={index}>
              <span>{listTrangThai.find((x) => x.value == item)?.label}</span>
              <img
                src={IcClose}
                alt="..."
                style={{ marginLeft: 5, cursor: "pointer" }}
                onClick={() => {
                  onChange("dsTrangThai")(item);
                }}
              ></img>
            </div>
          );
        })}
        {(state.dsKhoXuatId || []).map((item, index) => {
          return (
            <div className="item" style={{ marginTop: 5 }} key={index}>
              <span>{dsNhanVienKho.find((x) => x.id == item)?.ten}</span>
              <img
                src={IcClose}
                alt="..."
                style={{ marginLeft: 5, cursor: "pointer" }}
                onClick={() => {
                  onChange("dsKhoXuatId")(item);
                }}
              ></img>
            </div>
          );
        })}
      </div>
    </Main>
  );
};

export default TimKiemPhieuXuat;
