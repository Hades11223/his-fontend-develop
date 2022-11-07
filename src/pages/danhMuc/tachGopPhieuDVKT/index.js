import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Button from "pages/kho/components/Button";
import Pagination from "components/Pagination";
import Select from "components/Select";
import cacheUtils from "utils/cache-utils";

import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import { Page } from "components";

let timer = null;

const TachGopPhieuDVKT = ({
  listData,
  getTachGopPhieuDVKT,
  tachGopPhieuDVKT,
  updateData,
  dataEditDefault,
}) => {
  const { t } = useTranslation();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    listData,
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    dataRows: [],
  });

  const configs = [
    {
      key: "maPhieuChiDinh",
      text: t("thietLap.khacMaPhieuChiDinh"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "phongThucHien",
      text: t("thietLap.khacNoiThucHien"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "mauBaoCao",
      text: t("thietLap.khacMaBieuMau"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "dichVuTachPhieu",
      text: t("thietLap.cungMaDichVu"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "chiDinhTuDichVu",
      text: `${t("thietLap.khacNoiChiDinh")} (${t(
        "thietLap.khoa_phongChoChiDinh"
      )})`,
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "bacSiChiDinh",
      text: t("thietLap.khacBacSiChiDinh"),
      soPhieu: false,
      phieuChiDinh: false,
    },
    {
      key: "thoiGianThucHien",
      text: t("thietLap.khacThoiDiemThucHienVaLayMau"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "trangThai",
      text: t("thietLap.khacTrangThaiTiepNhan"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thanhToan",
      text: t("thietLap.khacTrangThaiThanhToan"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "capCuu",
      text: t("thietLap.khacYeuCauThucHienCapCuu"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "tuTra",
      text: `${t("thietLap.khacDieuKienBN_BHYTTuChiTra")} (${t(
        "thietLap.bNTuChiTraHoacDuocHuongBHYT"
      )})`,
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thucHienTaiKhoa",
      text: t("thietLap.khacDieuKienThucHienTaiKhoa"),
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
  ];

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const phieuXetNghiem = [
    {
      id: true,
      ten: t("thietLap.tachPhieu"),
    },
    {
      id: false,
      ten: t("thietLap.gopPhieu"),
    },
  ];
  const toChiDinh = [
    {
      id: true,
      ten: t("thietLap.tachPhieu"),
    },
    {
      id: false,
      ten: t("thietLap.gopPhieu"),
    },
  ];

  const onChange = (key, type) => (value) => {
    const dataRows = state.dataRows.map((item) => {
      if (item.key === key && type === "ghiChu") {
        item[type] = value.target.value;
      }
      if (item.key === key && type !== "ghiChu") {
        item[type] = value;
      }
      return item;
    });
    state.editStatus = true;
    setState({ dataRows, editStatus: true });
  };

  const onChange2 = (key, type) => (value) => {
    const dataRows = state.dataRows.map((item) => {
      if (item.key === key && type === "ghiChu") {
        item[type] = value.target.value;
      }
      if (item.key === key && type !== "ghiChu") {
        item[type] = value;
      }
      return item;
    });
    state.dataRows = dataRows;
  };
  const onBlur = () => {
    setState({
      editStatus: true,
    });
  };

  useEffect(() => {
    getTachGopPhieuDVKT({});

    if (Object.keys(listData).length) {
      setState({
        dataRows: listData,
      });
    } else {
      setState({
        dataRows: configs,
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(listData).length) {
      state.dataRows.forEach((item) => {
        switch (item.key) {
          case "maPhieuChiDinh":
            item.soPhieu = listData?.soPhieu?.maPhieuChiDinh;
            item.phieuChiDinh = listData?.phieuChiDinh?.maPhieuChiDinh;
            item.ghiChu = listData?.ghiChu?.maPhieuChiDinh;
            break;
          case "phongThucHien":
            item.soPhieu = listData?.soPhieu?.phongThucHien;
            item.phieuChiDinh = listData?.phieuChiDinh?.phongThucHien;
            item.ghiChu = listData?.ghiChu?.phongThucHien;
            break;
          case "thanhToan":
            item.soPhieu = listData?.soPhieu?.thanhToan;
            item.phieuChiDinh = listData?.phieuChiDinh?.thanhToan;
            item.ghiChu = listData?.ghiChu?.thanhToan;
            break;
          case "mauBaoCao":
            item.soPhieu = listData?.soPhieu?.mauBaoCao;
            item.phieuChiDinh = listData?.phieuChiDinh?.mauBaoCao;
            item.ghiChu = listData?.ghiChu?.mauBaoCao;
            break;
          case "dichVuTachPhieu":
            item.soPhieu = listData?.soPhieu?.dichVuTachPhieu;
            item.phieuChiDinh = listData?.phieuChiDinh?.dichVuTachPhieu;
            item.ghiChu = listData?.ghiChu?.dichVuTachPhieu;
            break;
          case "capCuu":
            item.soPhieu = listData?.soPhieu?.capCuu;
            item.phieuChiDinh = listData?.phieuChiDinh?.capCuu;
            item.ghiChu = listData?.ghiChu?.capCuu;
            break;
          case "tuTra":
            item.soPhieu = listData?.soPhieu?.tuTra;
            item.phieuChiDinh = listData?.phieuChiDinh?.tuTra;
            item.ghiChu = listData?.ghiChu?.tuTra;
            break;
          case "benhPham":
            item.soPhieu = listData?.soPhieu?.benhPham;
            item.phieuChiDinh = listData?.phieuChiDinh?.benhPham;
            item.ghiChu = listData?.ghiChu?.benhPham;
            break;
          case "thoiGianThucHien":
            item.soPhieu = listData?.soPhieu?.thoiGianThucHien;
            item.phieuChiDinh = listData?.phieuChiDinh?.thoiGianThucHien;
            item.ghiChu = listData?.ghiChu?.thoiGianThucHien;
            break;
          case "chiDinhTuDichVu":
            item.soPhieu = listData?.soPhieu?.chiDinhTuDichVu;
            item.phieuChiDinh = listData?.phieuChiDinh?.chiDinhTuDichVu;
            item.ghiChu = listData?.ghiChu?.chiDinhTuDichVu;
            break;
          case "bacSiChiDinh":
            item.soPhieu = listData?.soPhieu?.bacSiChiDinh;
            item.phieuChiDinh = listData?.phieuChiDinh?.bacSiChiDinh;
            item.ghiChu = listData?.ghiChu?.bacSiChiDinh;
            break;
          case "thucHienTaiKhoa":
            item.soPhieu = listData?.soPhieu?.thucHienTaiKhoa;
            item.phieuChiDinh = listData?.phieuChiDinh?.thucHienTaiKhoa;
            item.ghiChu = listData?.ghiChu?.thucHienTaiKhoa;
            break;
          case "trangThai":
            item.soPhieu = listData?.soPhieu?.trangThai;
            item.phieuChiDinh = listData?.phieuChiDinh?.trangThai;
            item.ghiChu = listData?.ghiChu?.trangThai;
            break;
          default:
            break;
        }
      });

      setState({ dataRows: state.dataRows });
    }
  }, [listData]);

  const handleClickedBtnSave = () => {
    setState({
      editStatus: false,
    });

    let obj = {
      soPhieu: {},
      phieuChiDinh: {},
      ghiChu: {},
    };

    state.dataRows.forEach((item) => {
      obj.soPhieu[item.key] = item.soPhieu;
      obj.phieuChiDinh[item.key] = item.phieuChiDinh;
      obj.ghiChu[item.key] = item.ghiChu;
    });

    tachGopPhieuDVKT(obj);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "30px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: <HeaderSearch title={t("thietLap.soSanhCacDvCDHA_TDCN_PT_TT")} />,
      align: "left",
      width: "150px",
      dataIndex: "text",
      key: "1",
    },
    {
      title: <HeaderSearch title={t("thietLap.gopPhieuChiDinhDVKT")} />,
      width: "120px",
      align: "left",
      dataIndex: "soPhieu",
      key: "2",
      render: (value, row, index) => {
        return (
          <Select
            value={value}
            data={phieuXetNghiem}
            onChange={onChange(row.key, "soPhieu")}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("thietLap.chungToChiDinh")} />,
      width: "120px",
      align: "left",
      dataIndex: "phieuChiDinh",
      key: "3",
      render: (value, row, index) => {
        return (
          <Select
            value={value}
            data={toChiDinh}
            onChange={onChange(row.key, "phieuChiDinh")}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("thietLap.ghiChu")} />,
      width: "200px",
      dataIndex: "ghiChu",
      key: "4",
      align: "center",
      render: (value, row, index) => {
        return (
          <input
            id="ghiChu"
            defaultValue={value}
            onBlur={onBlur}
            onChange={onChange2(row.key, "ghiChu")}
          />
        );
      },
    },
  ];

  return (
    <Page
      breadcrumb={[
        { title: t("thietLap.thietLap"), link: "/thiet-lap" },
        {
          title: t("thietLap.thietLapTachGopPhieuChiDinhDVKT"),
          link: "/thiet-lap/tach-gop-phieu-dvkt",
        },
      ]}
      title={t("thietLap.thietLapTachGopPhieuChiDinhDVKT")}
      titleRight={ <Button 
        onClick={handleClickedBtnSave} 
        className="btn-save" 
        style={{ padding: '5px 33px 3px' }}>
          Lưu
      </Button>}
    >
      <Main>
        <TableWrapper
          scroll={{ x: 1000, y: 500 }}
          columns={columns}
          dataSource={state.dataRows}
          minheight="calc(100vh - 345px)"
          maxheight="calc(100vh - 226px)"
        />
      </Main>
    </Page>
  );
};

const mapStateToProps = ({
  tachGopPhieuDVKT: { listData, updateData, dataEditDefault },
}) => {
  console.log(listData);
  return {
    listData,
    updateData,
    dataEditDefault,
  };
};
const mapDispatchToProps = ({
  tachGopPhieuDVKT: {
    getTachGopPhieuDVKT,
    tachGopPhieuDVKT,
    updateData,
    dataEditDefault,
  },
}) => ({
  getTachGopPhieuDVKT,
  tachGopPhieuDVKT,
  updateData,
  dataEditDefault,
});
export default connect(mapStateToProps, mapDispatchToProps)(TachGopPhieuDVKT);
