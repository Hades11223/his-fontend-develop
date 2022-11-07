import { DatePicker } from "antd";
import { HeaderSearch, InputTimeout, TableWrapper } from "components";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StyledTable } from "./styled";
import { useTranslation } from "react-i18next";

const DanhSachNb = (props) => {
  const { listMaGiamGiaDaSuDung } = useSelector((state) => state.maGiamGia);
  const { t } = useTranslation();
  const [state, _setState] = useState({ param: {} });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const dataSource = useMemo(() => {
    return listMaGiamGiaDaSuDung.filter(
      (i) =>
        (!state.param?.maHoSo ||
          i.maHoSo.toLowerCase().indexOf(state.param?.maHoSo) !== -1) &&
        (!state.param?.tenNb ||
          i.tenNb.toLowerCase().indexOf(state.param?.tenNb) !== -1) &&
        (!state.param?.soPhieu ||
          i.soPhieu.toLowerCase().indexOf(state.param?.soPhieu) !== -1) &&
        (!state.param?.thoiGianThanhToan ||
          moment(i.thoiGianThanhToan).format("DDMMYYYY") ===
            state.param?.thoiGianThanhToan.format("DDMMYYYY"))
    );
  }, [state.param, listMaGiamGiaDaSuDung]);

  const onSearch = (key) => (value) => {
    if (key === "thoiGianThanhToan") {
      setState({ param: { ...state.param, [key]: value } });
    } else {
      setState({ param: { ...state.param, [key]: value?.toLowerCase() } });
    }
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          searchSelect={
            <InputTimeout
              onChange={onSearch("maHoSo")}
              placeholder={t("common.timMaHoSo")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNb")}
          sort_key="tenNb"
          searchSelect={
            <InputTimeout
              onChange={onSearch("tenNb")}
              placeholder={t("common.timTenNb")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soPhieuThu")}
          sort_key="soPhieu"
          searchSelect={
            <InputTimeout
              onChange={onSearch("soPhieu")}
              placeholder={t("common.timSoPhieu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ngayApDung")}
          sort_key="thoiGianThanhToan"
          searchSelect={
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={onSearch("thoiGianThanhToan")}
              placeholder={t("common.timNgay")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      render: (i) => (i ? moment(i).format("DD/MM/YYYY") : ""),
    },
  ];
  return (
    <StyledTable>
      <div className="main-info">
        <div className="title-info">{t("common.danhSachNb")}</div>
        <div className="table-info">
          <TableWrapper
            columns={columns}
            dataSource={dataSource}
            //   onRow={onRow}
          ></TableWrapper>
        </div>
      </div>
    </StyledTable>
  );
};
export default DanhSachNb;
