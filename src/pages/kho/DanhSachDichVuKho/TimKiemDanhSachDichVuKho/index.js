import { Button, Checkbox, Col, Popover, Row, DatePicker } from "antd";
import IcClose from "assets/images/kho/icClose.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcFilter from "assets/images/kho/icFilter.png";
import Select from "components/Select";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import LocPhieu from "./LocPhieu";
import { InputSearch2, Main, SearchKho, PopupWrapper } from "./styled";
import { useEnum, useStore } from "hook";
import { ENUM, THEO_SO_LUONG_TON_KHO } from "constants/index";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;

const TimKiemDanhSachDichVuKho = (props) => {
  const { t } = useTranslation();
  const listAllKho = useStore("kho.listAllKho", []);
  const cachXem = useStore("danhSachDichVuKho.cachXem", null);
  const dataSearch = useStore("danhSachDichVuKho.dataSearch", {});

  const [listTheoSoLuongTonKho] = useEnum(ENUM.THEO_SO_LUONG_TON_KHO);
  const {
    kho: { getAllTongHop: getAllKhoTongHop },
    danhSachDichVuKho: { updateData, searchByParams },
  } = useDispatch();

  const [state, _setState] = useState({
    theoSoLuongTonKho: THEO_SO_LUONG_TON_KHO.CON_TON,
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  useEffect(() => {
    getAllKhoTongHop({});
  }, []);
  const refShow = useRef(null);

  const onChange = (key) => async (e) => {
    let theoSoLuongTonKho = state?.theoSoLuongTonKho;
    let loai = cachXem;
    if (key === "theoSoLuongTonKho") {
      setState({ theoSoLuongTonKho: e });
      theoSoLuongTonKho = e;
    }
    if (key === "cachXem") {
      await updateData({
        [key]: e,
        dataSearch: {},
        dsKhoId: null,
        listDanhSachDichVuKho: [],
        dataSortColumn: {},
        ngayHanSuDungTu: null,
        ngayHanSuDungDen: null,
        timKiem: null,
      });
      loai = e;
    }
    searchByParams({
      theoSoLuongTonKho,
      theoLo: loai === "2",
      thau: loai === "3",
    });
  };

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };
  const group = () => (
    <Checkbox.Group
      options={
        listAllKho &&
        [...listAllKho].map((item) => {
          item.value = item.id;
          item.label = item.ten;
          return item;
        })
      }
      onChange={onSearchInput("dsKhoId")}
      value={dataSearch?.dsKhoId}
    />
  );

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    } else {
      value = e?.target?.value;
    }

    if (cachXem === "2") {
      searchByParams({ [key]: value, theoLo: true });
    } else {
      searchByParams({ [key]: value });
    }
  };
  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    value = e && e[0]?.format("YYYY-MM-DD");
    value1 = e && e[1]?.format("YYYY-MM-DD");
    searchByParams({
      [`ngayHanSuDungTu`]: value,
      [`ngayHanSuDungDen`]: value1,
      theoLo: true,
    });
  };

  return (
    <Main>
      <Row>
        <Col flex="110px">
          <SearchKho>
            <LocPhieu ref={refShow}></LocPhieu>
            <Button className="filter" onClick={() => handleRefShow()}>
              <img src={IcFilter} alt={IcFilter} />
              <span> {t("kho.boLoc")} </span>
            </Button>
          </SearchKho>
        </Col>
        <Col flex="200px">
          <SearchKho>
            <Select
              style={{ width: "100%" }}
              // data={listAllKho}

              onChange={onChange("cachXem")}
              value={cachXem}
              data={[
                {
                  id: "1",
                  ten: t("kho.xemTongHop"),
                },
                {
                  id: "2",
                  ten: t("kho.xemTheoLo"),
                },
                {
                  id: "3",
                  ten: t("kho.xemTheoQuyetDinhThau"),
                },
              ]}
            ></Select>
          </SearchKho>
        </Col>
        <Col flex="132px">
          <PopupWrapper>
            <Popover
              getPopupContainer={(node) => node.parentNode}
              placement="bottom"
              content={group}
              trigger="click"
              overlayClassName="popup-kho"
            >
              <SearchKho>
                <Button className="status">
                  <span> {t("kho.tatCaKho")}</span>
                  <img src={IcDown} alt={IcDown} />
                </Button>
              </SearchKho>
            </Popover>
          </PopupWrapper>
        </Col>
        <Col flex="132px">
          <SearchKho>
            <Select
              style={{ width: "100%" }}
              onChange={onChange("theoSoLuongTonKho")}
              value={state?.theoSoLuongTonKho}
              data={[
                {
                  id: "",
                  ten: t("kho.tatCa"),
                },
                ...listTheoSoLuongTonKho,
              ]}
            ></Select>
          </SearchKho>
        </Col>
        {cachXem === "2" && (
          <Col flex="230px">
            <InputSearch2>
              <div className="date">
                <label className="label">{t("kho.hanSuDung")}</label>
                <RangePicker
                  format="DD/MM/YYYY"
                  className="range-picker"
                  placeholder={[t("common.tuNgay"), t("common.denNgay")]}
                  bordered={false}
                  onChange={onChangeDate("ngayDuyetPhieu")}
                  separator={<div>-</div>}
                ></RangePicker>
              </div>
            </InputSearch2>
          </Col>
        )}
      </Row>
      <div className="array-store">
        {(dataSearch?.dsKhoId || []).map((item, index) => {
          return (
            <div className="item">
              <span>{listAllKho.find((x) => x.id == item)?.ten}</span>
              <img
                src={IcClose}
                alt="..."
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const newDsKho = Object.assign([], dataSearch?.dsKhoId);
                  newDsKho.splice(index, 1);
                  if (newDsKho.length > 0) {
                    searchByParams({ dsKhoId: newDsKho });
                  } else {
                    delete dataSearch.dsKhoId;
                    updateData({
                      dataSearch: dataSearch,
                    });
                    searchByParams({});
                  }
                }}
              ></img>
            </div>
          );
        })}
      </div>
    </Main>
  );
};

export default TimKiemDanhSachDichVuKho;
