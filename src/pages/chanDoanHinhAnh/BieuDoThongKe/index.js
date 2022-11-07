import { Col, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { MainPage, Main, SearchDate } from "./styled";
import { Popover } from "antd";
import DateDropdown from "../../khamBenh/components/ModalDanhSachBN/DateDropdown";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import TrangThaiDashboard from "./TrangThaiDashboard";
import PieChart from "./PieChart";
import SmoothLineChart from "./SmoothLineChart";
import DanhSach from "./DanhSach";
import { ENUM } from "constants/index";
import { useEnum } from "hook";

const BieuDoThongKe = (props) => {
  const refShowDate = useRef(null);
  const { t } = useTranslation();
  const [listLoaiPhong] = useEnum(ENUM.LOAI_PHONG);
  const [listLoaiThoiGian] = useEnum(ENUM.LOAI_THOI_GIAN);
  const {
    dashboardCDHA: {
      getDashboard,
      getDashboardTheoThoiGian,
      getDashboardTheoNguonNb,
      onSearch,
      // getDashboardTheoBacSi
    },
  } = useDispatch();
  const [state, _setState] = useState({
    show: false,
    data: {},
    tuThoiGian: moment().format("DD/MM/YYYY"),
    denThoiGian: moment().format("DD/MM/YYYY"),
    loaiThoiGian: 10,
    nhomThoiGian: 10,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    const {
      loaiThoiGian,
      tuThoiGian,
      denThoiGian,
      dsPhongThucHienId,
      nhomThoiGian,
    } = state;
    getDashboard({
      loaiThoiGian,
      tuThoiGian,
      denThoiGian,
      dsPhongThucHienId,
    });
    getDashboardTheoNguonNb({
      loaiThoiGian,
      tuThoiGian,
      denThoiGian,
      dsPhongThucHienId,
    });
    onSearch({
      loaiThoiGian,
      tuThoiGian,
      denThoiGian,
      dsPhongThucHienId,
    });
    // getDashboardTheoBacSi({
    //   loaiThoiGian,
    //   tuThoiGian,
    //   denThoiGian,
    //   dsPhongThucHienId
    // })
    getDashboardTheoThoiGian({
      loaiThoiGian,
      tuThoiGian,
      denThoiGian,
      dsPhongThucHienId,
      nhomThoiGian,
    });
    console.log(state);
  }, [
    state?.loaiThoiGian,
    state?.tuThoiGian,
    state?.denThoiGian,
    state?.dsPhongThucHienId,
    state?.nhomThoiGian,
  ]);

  const content = (
    <div>
      {(listLoaiThoiGian || []).map((item, index) => {
        return (
          <p
            key={index}
            onClick={() => {
              setState({ loaiThoiGian: item.id });
            }}
          >
            {item.ten}
          </p>
        );
      })}
    </div>
  );
  const onSelectedDate = (e) => {
    console.log("e: ", e);
    setState({
      tuThoiGian: e.tuThoiGianVaoVien?.format("DD/MM/YYYY") ?? "",
      denThoiGian: e.denThoiGianVaoVien?.format("DD/MM/YYYY") ?? "",
    });
    // onChangeInputSearch(
    //   {
    //     tuThoiGian: e.tuThoiGian?.format("DD/MM/YYYY 00:00:00"),
    //     denThoiGian: e.denThoiGian?.format("DD/MM/YYYY 23:59:59"),
    //     timKiem: state.timKiem,
    //     dsTrangThaiHoan: [0, 10],
    //   },
    //   true
    // );
  };
  return (
    <MainPage
      breadcrumb={[
        { title: t("cdha.cdha"), link: "/chan-doan-hinh-anh" },
        {
          title: t("cdha.bieuDoThongKe"),
          link: "/chan-doan-hinh-anh/bieu-do-thong-ke",
        },
      ]}
    >
      <Main>
        <Row>
          <div>
            <div>
              <Popover content={content} trigger="click">
                {
                  listLoaiThoiGian?.find(
                    (item) => item.id === state.loaiThoiGian
                  )?.ten
                }
              </Popover>
            </div>
            <SearchDate>
              <input
                className="filter"
                value={`${state.tuThoiGian} - ${state.denThoiGian}`}
                onChange={null}
                onClick={() => refShowDate.current.show()}
              />
              <DateDropdown
                onSelectedDate={onSelectedDate}
                ref={refShowDate}
              ></DateDropdown>
            </SearchDate>
          </div>
          <div style={{ marginLeft: 20 }}>
            <div>{t("cdha.phongThucHien")}</div>
            <Select
              mode="multiple"
              style={{ width: 500, border: "1px solid grey" }}
              placeholder={t("cdha.chonPhongThucHien")}
              onChange={(e) => {
                setState({ dsPhongThucHienId: e });
              }}
            >
              {(listLoaiPhong || []).map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Row>
        <TrangThaiDashboard />
        <Row gutter={10}>
          <Col span={8}>
            <PieChart />
          </Col>
          <Col span={16}>
            <SmoothLineChart setStateParent={setState} stateParent={state} />
          </Col>
        </Row>
        <DanhSach />
      </Main>
    </MainPage>
  );
};

export default BieuDoThongKe;
