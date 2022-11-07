import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Button from "pages/kho/components/Button";
import Select from "components/Select";
import { Main } from "./styled";
import { Page } from "components";
import { useTranslation } from "react-i18next";

const TachGopPhieuXN = ({
  listData,
  getTachGopPhieuXN,
  tachGopPhieuXN,
  updateData,
  dataEditDefault,
}) => {
  const { t } = useTranslation();

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
      text: "Khác mã phiếu chỉ định",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "phongThucHien",
      text: "Khác nơi thực hiện",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "mauBaoCao",
      text: "Khác mã biểu mẫu",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "dichVuTachPhieu",
      text: "Cùng mã dịch vụ",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "chiDinhTuDichVu",
      text: "Khác nơi chỉ định (Khoa - phòng cho chỉ định)",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "bacSiChiDinh",
      text: "Khác bác sĩ chỉ định ",
      soPhieu: false,
      phieuChiDinh: false,
    },
    {
      key: "thoiGianThucHien",
      text: "Khác thời điểm thực hiện",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "trangThai",
      text: "Khác trạng thái tiếp nhận",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thanhToan",
      text: "Khác trạng thái thanh toán",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "capCuu",
      text: "Khác yêu cầu thực hiện cấp cứu",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "tuTra",
      text: "Khác điều kiện BN BHYT tự chi trả (BN tự chi trả hoặc được hưởng BHYT)",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "benhPham",
      text: "Khác bệnh phẩm",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thucHienTaiKhoa",
      text: "Khác điều kiện thực hiện tại khoa",
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
      ten: "Tách phiếu",
    },
    {
      id: false,
      ten: "Gộp phiếu",
    },
  ];
  const toChiDinh = [
    {
      id: true,
      ten: "Tách phiếu",
    },
    {
      id: false,
      ten: "Gộp phiếu",
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
    getTachGopPhieuXN({});

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
        const temp = state.dataRows.forEach((item) => {
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

    tachGopPhieuXN(obj);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "30px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: <HeaderSearch title="So sánh các dịch vụ xét nghiệm" />,
      align: "left",
      width: "150px",
      dataIndex: "text",
      key: "1",
    },
    {
      title: <HeaderSearch title="Gộp phiếu xét nghiệm" />,
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
      title: <HeaderSearch title="Chung tờ chỉ định" />,
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
      title: <HeaderSearch title="Ghi chú" />,
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
          title: t("thietLap.thietLapTachGopPhieuXetNghiem"),
          link: "/thiet-lap/tach-gop-phieu-xet-nghiem",
        },
      ]}
      title={t("thietLap.thietLapTachGopPhieuXetNghiem")}
      titleRight={ <Button 
        onClick={handleClickedBtnSave} 
        className="btn-save" 
        style={{ padding: '5px 33px 3px' }}>
          Lưu
      </Button>}
    >
      <Main noPadding={true}>
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
  tachGopPhieuXN: { listData, updateData, dataEditDefault },
}) => {
  console.log(listData);
  return {
    listData,
    updateData,
    dataEditDefault,
  };
};
const mapDispatchToProps = ({
  tachGopPhieuXN: {
    getTachGopPhieuXN,
    tachGopPhieuXN,
    updateData,
    dataEditDefault,
  },
}) => ({
  getTachGopPhieuXN,
  tachGopPhieuXN,
  updateData,
  dataEditDefault,
});
export default connect(mapStateToProps, mapDispatchToProps)(TachGopPhieuXN);
