import React, { useState, useEffect, useMemo } from "react";
import { TableWrapper } from "components";
import { GlobalStyle, PhieuChiDinhWrapper, PopoverWrapper } from "./styled";
import IconInfo from "assets/images/khamBenh/icInfo.svg";
import IconDot from "assets/images/khamBenh/icDot.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { addPrefixNumberZero } from "utils";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "../../../../constants";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getColorByTrangThai } from "pages/khamBenh/ChiDinhDichVu/utils";

const DanhSachDichVu = (props) => {
  const { t } = useTranslation();
  const [listphanLoaiKetQuaXetNghiem] = useEnum(
    ENUM.PHAN_LOAI_KET_QUA_XET_NGHIEM
  );
  const {
    dataGroup = [],
    dataSortColumn = {},
    soPhieu,
    tenKhoaThucHien,
    loaiDichVu,
  } = props;

  const [dataSource, setDataSource] = useState([]);
  const isXetNghiem = loaiDichVu === 20;
  const [lisTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  useEffect(() => {
    let data = [];

    if (isXetNghiem) {
      dataGroup.forEach((dv, index) => {
        const { dsChiSoCon = [], ...rest } = dv;
        data.push({
          ...rest,
          stt: index + 1,
          isParent: true,
          rowSpan: dsChiSoCon.length + 1,
        });
        data.push(...dsChiSoCon);
      });
    } else {
      data = dataGroup.map((dv, index) => ({
        ...dv,
        isParent: true,
        stt: index + 1,
      }));
    }

    setDataSource(data);
  }, [dataGroup]);

  const renderStt = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (row.isParent) {
      obj.props.rowSpan = row.rowSpan;
      obj.children = addPrefixNumberZero(value, 3);
    } else {
      obj.props.rowSpan = 0;
    }

    return obj;
  };

  const renderRowTenChiSoCon = (value, row, index) => {
    if (row.isParent) {
      const {
        tenPhongThucHien,
        tenBacSiChiDinh,
        tenKhoaChiDinh,
        thoiGianCoKetQua,
        tenNguoiThucHien,
        diaDiemPhongThucHien,
        tenBenhPham,
        trangThai,
        tenNguoiDuyetKetQua
      } = row;
      const contentPopover = () => {
        return (
          <div>
        <div>
          Bác sĩ chỉ định:{" "}
          <b>
            {tenBacSiChiDinh} - {tenKhoaChiDinh}
          </b>
        </div>
        <div>
          Bệnh phẩm: <b>{tenBenhPham}</b>
        </div>
        <div>
          Trạng thái:{" "}
          <b>{lisTrangThaiDichVu.find((x) => x.id === trangThai)?.ten}</b>
        </div>
        <div>
          Có kết quả vào:{" "}
          <b>
            {thoiGianCoKetQua &&
              moment(thoiGianCoKetQua).format("DD/MM/YYYY HH:mm:ss")}
          </b>
        </div>
        <div>
          {t("khamBenh.chiDinh.nguoiThucHien")}: <b>{tenNguoiThucHien}</b>
        </div>
        <div>
          {t("khamBenh.chiDinh.bacSiDocKetQua")}: <b>{tenNguoiDuyetKetQua}</b>
        </div>
        <div>
          {t("khamBenh.chiDinh.phongThucHien")}:{" "}
          <b>{`${tenPhongThucHien} ${
            diaDiemPhongThucHien ? ` - ${diaDiemPhongThucHien}` : ""
          } ${tenKhoaThucHien ? ` - ${tenKhoaThucHien}` : ""}`}</b>
        </div>
      </div>
        );
      };
      const colorStatus = getColorByTrangThai(row.trangThai);
      return (
        <div className="title-wrapper">
          <GlobalStyle />
          <PopoverWrapper content={contentPopover}>
            <CheckCircleOutlined  className="title-wrapper__icon" style={{ fontSize: "25px", color: colorStatus }} />
          </PopoverWrapper>
          {row.isParent ? row.tenDichVu : value}
        </div>
      );
    }
    return (
      <div className="child-title">
        <IconDot className="child-title__icon" />
        {value}
      </div>
    );
  };

  const onClickSort = () => {};

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "20px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
      className: "stt-column",
      render: renderStt,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.dichVu")}
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 120,
      dataIndex: "tenChiSoCon",
      key: "tenChiSoCon",
      align: "left",
      render: renderRowTenChiSoCon,
    },
    {
      title: (
        <HeaderSearch
          title={
            isXetNghiem
              ? t("khamBenh.ketQua.ketQuaKetLuan")
              : t("khamBenh.ketQua.ketQua")
          }
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "ketQua",
      key: "ketQua",
      align: "left",
      render: (value, row, index) => {
        const phanLoai = listphanLoaiKetQuaXetNghiem?.find(
          (phanLoai) => row?.phanLoaiKetQua == phanLoai?.id
        )?.ten;
        let style = {};
        switch (phanLoai) {
          case "Cao": {
            style = {
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 15,
              color: "red",
            };
            break;
          }
          case "Bình thường": {
            style = { textAlign: "center" };
            break;
          }
          case "Thấp": {
            style = { fontWeight: "bold", fontSize: 15, color: "red" };
            break;
          }
          case "Bất thường": {
            style = {
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 15,
              color: "red",
            };
            break;
          }
          default:
            break;
        }
        let ketQua = row.ketQua;
        const ketLuan = row.ketLuan;
        return (
          <div style={style}>
            {isXetNghiem
              ? `${ketQua ? ketQua : ""}${
                  ketLuan ? `${ketQua ? " - " : ""}${ketLuan}` : ""
                }`
              : ketQua}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            isXetNghiem
              ? t("khamBenh.ketQua.giaTriThamChieu")
              : t("khamBenh.ketQua.ketLuan")
          } //Với nhóm dịch vụ != Xét nghiệm. Hiển thị tên cột = Kết luận. Lấy giá trị từ kết luận của dịch vụ để hiển thị
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "ketLuan",
      key: "ketLuan",
      align: "left",
      render: (value, row, index) => {
        const { ketQuaThamChieu, chiSoThap, chiSoCao, ketLuan } = row;
        let displayIsXetNghiem = "";
        if (isXetNghiem) {
          displayIsXetNghiem =
            ketQuaThamChieu ||
            (!!chiSoThap && !!chiSoCao && `${chiSoThap} - ${chiSoCao}`);
        }
        return isXetNghiem ? displayIsXetNghiem : ketLuan;
      },
    },

    {
      title: (
        <HeaderSearch
          title={t("khamBenh.ketQua.thoiGianCoKetQua")}
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 50,
      dataIndex: "thoiGianCoKetQua",
      key: "thoiGianCoKetQua",
      align: "center",
      render: (item, row, index) => {
        return (item && moment(item).format("DD/MM/YYYY HH:mm:ss")) || "";
      },
    },
  ];
  return (
    <PhieuChiDinhWrapper>
      <div className="info-top">
        {t("khamBenh.ketQua.soPhieu")}: {soPhieu}
      </div>
      <div className="info-bottom">
        <div>
          <span>
            {t("khamBenh.ketQua.bacSiDocKetQua")}:{" "}
            {dataGroup &&
              (dataGroup[0].tenNguoiDuyetKetQua ||
                dataGroup[0].tenNguoiThucHien)}
          </span>
        </div>
        <div>
          <span>
            {t("khamBenh.ketQua.khoa")}: {tenKhoaThucHien}
          </span>
        </div>
      </div>
      <div className="form-detail">
        <TableWrapper
          bordered
          className="table-danh-sach"
          rowClassName="table-row"
          scroll={{ x: false }}
          columns={
            isXetNghiem
              ? columns.filter((k) => k.key !== "thoiGianCoKetQua")
              : columns
          }
          dataSource={dataSource}
        />
      </div>
    </PhieuChiDinhWrapper>
  );
};

export default DanhSachDichVu;
