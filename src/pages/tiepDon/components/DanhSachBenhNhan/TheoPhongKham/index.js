import React, { useState, useEffect, memo, useRef } from "react";
import { useInterval } from "hook";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Box2 from "../../Box2";
import { InputTimeout, TableWrapper, HeaderSearch } from "components";
import IcSearch from "assets/svg/ic-search.svg";
const TheoPhongKham = (props) => {
  const { t } = useTranslation();
  const {
    goiSo: { getListSlTheoPhong },
  } = useDispatch();
  const [state, _setState] = useState({
    data: [],
    dataSearch: [],
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { data, dataSearch } = state;
  useInterval(() => {
    onSearch();
  }, 10000);
  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    getListSlTheoPhong({ size: 100 }).then((s) => {
      setState({
        data: s?.data || [],
        dataSearch: s?.data || [],
      });
    });
  };
  const searchValue = (value) => {
    let valueText = value?.trim().toLowerCase().unsignText();
    let list = dataSearch?.filter((option) => {
      return (
        option?.tenPhong?.toLowerCase().unsignText().indexOf(valueText) >= 0 ||
        option?.maPhong?.toLowerCase().unsignText().indexOf(valueText) >= 0
      );
    });
    setState({ data: list || [] });
  };
  const columns = [
    {
      title: <HeaderSearch title={t("tiepDon.maPhong")} />,
      width: 45,
      dataIndex: "maPhong",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //       style={{ left: 15 }}
      //     ></img>
      //     <Input
      //       placeholder="Tìm Mã hoặc tên phòng"
      //       style={{
      //         position: "absolute",
      //         top: 0,
      //         left: 10,
      //         width: 200,
      //         zIndex: "1",
      //       }}
      //       onChange={(e) => search(e.target.value)}
      //     />
      //   </>
      // ),
    },
    {
      title: <HeaderSearch title={t("tiepDon.phong")} />,
      width: 80,
      dataIndex: "tenPhong",
    },
    // {
    //   title: "Đăng ký",
    //   width: 43,
    //   dataIndex: "dangKy",
    // },
    {
      title: (
        <HeaderSearch
          style={{ padding: "0 7px" }}
          title={t("tiepDon.choKham")}
        />
      ),
      width: 20,
      dataIndex: "choKham",
    },
    {
      title: (
        <HeaderSearch
          style={{ padding: "0 7px" }}
          title={t("tiepDon.dangKham")}
        />
      ),
      width: 20,
      dataIndex: "dangKham",
    },
    {
      title: (
        <HeaderSearch style={{ padding: "0 7px" }} title={t("tiepDon.daKL")} />
      ),
      width: 20,
      dataIndex: "daKetLuan",
    },
  ];
  return (
    <Box2
      title={t("tiepDon.soLuongNguoiBenhTheoPhongKham")}
      headerRight={
        <InputTimeout
          placeholder={t("tiepDon.timMaPhongTenPhong")}
          onChange={searchValue}
          prefix={<IcSearch />}
        />
      }
      noPadding={true}
    >
      <TableWrapper
        headerMinHeight={"35px"}
        scroll={{ y: 110 }}
        columns={columns}
        dataSource={data}
      />
    </Box2>
  );
};

export default memo(TheoPhongKham);
