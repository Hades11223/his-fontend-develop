import React, { useRef, useEffect } from "react";
import { Main } from "./styled";
import { TableWrapper, Pagination, HeaderSearch } from "components";
import ModalThemMoiNguoiBenh from "../../modals/ModalThemMoiNguoiBenh";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Tooltip } from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import ModalImportNguoiBenh from "pages/khamSucKhoe/modals/ModalImportNguoiBenh";
import IcEdit from "assets/images/khamBenh/edit.png";
import { useTranslation } from "react-i18next";

const DanhSachNguoiBenh = (props) => {
  const { t } = useTranslation();
  //ref
  const refModalThemMoiNguoiBenh = useRef(null);
  const refModalImportNguoiBenh = useRef(null);

  //redux
  const { listData, totalElements, page, size } = useSelector(
    (state) => state.nbKSK
  );
  const { listgioiTinh, listHinhThucTtDvNgoaiHd } = useSelector(
    (state) => state.utils
  );
  const { chiTietHopDong } = useSelector((state) => state.hopDongKSK);

  const {
    nbKSK: { onSearch, onSizeChange },
    utils: { getUtils },
    hopDongKSK: { getHopDong },
  } = useDispatch();

  //effect
  useEffect(() => {
    if (chiTietHopDong?.id) {
      onSizeChange({
        page,
        size,
        dataSearch: { hopDongKskId: chiTietHopDong?.id, sort: "stt,asc" },
      });
    }
  }, [chiTietHopDong]);

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
    getUtils({ name: "HinhThucTtDvNgoaiHd" });
  }, []);

  function onEditNb(item) {
    return () => {
      refModalThemMoiNguoiBenh.current &&
        refModalThemMoiNguoiBenh.current.show(item);
    };
  }

  const columns = [
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.sttHd")} />,
      dataIndex: "stt",
      align: "center",
      width: "80px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.maNb")} />,
      dataIndex: "maNb",
      width: "150px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.maHs")} />,
      dataIndex: "maHoSo",
      width: "150px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.tenNb")} />,
      dataIndex: "tenNb",
      width: "200px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.ngaySinh")} />,
      dataIndex: "ngaySinh",
      width: "150px",
      render: (field, item, index) =>
        field
          ? moment(field).format(item?.chiNamSinh ? "YYYY" : "DD / MM / YYYY")
          : "",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.gioiTinh")} />,
      dataIndex: "gioiTinh",
      width: "100px",
      render: (item) => {
        return (listgioiTinh || []).find((x) => x?.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.diaChi")} />,
      dataIndex: "diaChi",
      width: "200px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.sdt")} />,
      dataIndex: "soDienThoai",
      width: "100px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.soCmt")} />,
      dataIndex: "maSoGiayToTuyThan",
      width: "100px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.chucDanh")} />,
      dataIndex: "chucVu",
      width: "200px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.goiDV")} />,
      dataIndex: "tenBoChiDinh",
      width: "100px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.hinhThucTtDvNgoaiHd")} />,
      dataIndex: "hinhThucTtDvNgoaiHd",
      width: "120px",
      render: (item) => {
        return (listHinhThucTtDvNgoaiHd || []).find((x) => x?.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.tuThoiGianKham")} />,
      dataIndex: "tuThoiGianKham",
      width: "100px",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "";
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.denThoiGianKham")} />,
      dataIndex: "denThoiGianKham",
      width: "100px",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "";
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.diaDiemKham")} />,
      dataIndex: "diaDiemKham",
      width: "100px",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.tuThoiGianLayMau")} />,
      dataIndex: "tuThoiGianLayMau",
      width: "100px",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "";
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.dsNb.denThoiGianLayMau")} />,
      dataIndex: "denThoiGianLayMau",
      width: "100px",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "";
      },
    },
    {
      title: <HeaderSearch title="Địa điểm lấy mẫu" />,
      dataIndex: "diaDiemLayMau",
      width: "100px",
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "100px",
      align: "center",
      fixed: "right",
      render: (item) => {
        return (
          <div>
            <Tooltip title="Cập nhật thông tin người bệnh">
              <img src={IcEdit} alt="..." onClick={onEditNb(item)}></img>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  //function
  function onAddNguoiBenh() {
    refModalThemMoiNguoiBenh.current && refModalThemMoiNguoiBenh.current.show();
  }

  function onImportNguoiBenh() {
    refModalImportNguoiBenh.current &&
      refModalImportNguoiBenh.current.show({
        hopDongKskId: chiTietHopDong?.id,
      });
  }

  function onChangePage(page) {
    onSearch({ page: page - 1 });
  }

  function handleSizeChange(size) {
    onSizeChange({ size });
  }

  function refreshList() {
    onSearch({ page: 0 });

    getHopDong(chiTietHopDong?.id);
  }

  return (
    <Main>
      <TableWrapper
        dataSource={listData || []}
        columns={columns}
        title={"Danh sách người bệnh"}
        classNameRow={"custom-header btn-custom"}
        buttonHeader={
          chiTietHopDong?.trangThai == 50
            ? []
            : [
                {
                  title: "Import",
                  onClick: onImportNguoiBenh,
                  className: "import-btn",
                },
                {
                  title: "Thêm mới",
                  onClick: onAddNguoiBenh,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
              ]
        }
      />

      <Pagination
        listData={listData || []}
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />

      <ModalThemMoiNguoiBenh
        ref={refModalThemMoiNguoiBenh}
        refreshList={refreshList}
      />
      <ModalImportNguoiBenh
        ref={refModalImportNguoiBenh}
        hopDongKskId={chiTietHopDong?.id}
        refreshList={refreshList}
      />
    </Main>
  );
};

export default DanhSachNguoiBenh;
