import React, { useEffect, useRef } from "react";
import { TableWrapper, Pagination } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IcDelete from "assets/svg/ic-delete.svg";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { message } from "antd";
import { refConfirm } from "app";
const { Column } = TableWrapper;
const DanhSach = (props) => {
  const { t } = useTranslation();
  const { dataSortColumn, listNbGoiDv, totalElements, page, size } =
    useSelector((state) => state.nbGoiDv);
  const [listTrangThaiNbGoiDv] = useEnum(ENUM.TRANG_THAI_NB_GOI_DV);
  const {
    nbGoiDv: { onSizeChange, onSortChange, onSearch, deleteGoiDv },
    thanhToanGoi: { onSearch: onSearchThanhToanGoi },
  } = useDispatch();
  const refSettings = useRef(null);

  useEffect(() => {
    onSizeChange(10);
  }, []);
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const handleViewDetail = (id) => {
    history.push("/goi-dich-vu/chi-tiet-nguoi-benh-su-dung-goi/" + id);
  };
  const handleDelete = async (item) => {
    const onDelete = async () => {
      try {
        const listThanhToanGoi = await onSearchThanhToanGoi({
          dataSearch: { nbGoiDvId: item.id },
        });
        if (!listThanhToanGoi.length) {
          deleteGoiDv(item.id);
        } else {
          message.error(t("goiDichVu.goiDichVuDaTonTaiTamUng"));
        }
      } catch (error) {}
    };
    if (item.trangThai !== 10) {
      message.error(t("goiDichVu.chiXoaDuocGoiTrangThaiTaoMoi"));
    } else {
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          typeModal: "warning",
          content: t("goiDichVu.xacNhanXoaGoi")
            .replace("{0}", item.tenGoiDv)
            .replace("{1}", item.tenNb),
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          showBtnOk: true,
          showBtnCancel: true,
        },
        onDelete
      );
    }
  };
  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
    }),
    Column({
      title: t("common.maNb"),
      sort_key: "maNb",
      dataSort: dataSortColumn["maNb"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
      // align: "center",
      render: (field, item, index) => {
        return <div>{item?.maNb}</div>;
      },
    }),
    Column({
      title: t("common.tenNb"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["tenNb"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "common.tenNb",
      align: "left",
    }),
    Column({
      title: t("common.namSinh"),
      sort_key: "namSinh",
      dataSort: dataSortColumn["namSinh"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      align: "left",
      i18Name: "common.namSinh",
      render: (field, item, index) => {
        return <div>{item?.ngaySinh?.toDateObject().format("YYYY")}</div>;
      },
    }),
    Column({
      title: t("common.diaChi"),
      sort_key: "namSinh",
      dataSort: dataSortColumn["diaChi"] || "",
      onClickSort: onClickSort,
      width: "300px",
      dataIndex: "diaChi",
      key: "diaChi",
      align: "left",
      i18Name: "common.diaChi",
    }),
    Column({
      title: t("goiDichVu.tenGoiApDung"),
      sort_key: "tenGoiDv",
      dataSort: dataSortColumn["tenGoiDv"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenGoiDv",
      key: "tenGoiDv",
      align: "left",
      i18Name: "goiDichVu.tenGoiApDung",
    }),
    Column({
      title: t("goiDichVu.tongTienGoi"),
      width: "150px",
      key: "tongTienGoi",
      align: "right",
      i18Name: "goiDichVu.tongTienGoi",
      render: (value, item, index) => {
        return Number(
          (item.tongTien || 0) -
            (item.tienMienGiamDichVu || 0) -
            (item.tienMienGiamGoiDv || 0)
        ).formatPrice();
      },
    }),
    Column({
      title: t("goiDichVu.tienDaThanhToan"),
      sort_key: "tienDaThanhToan",
      dataSort: dataSortColumn["tienDaThanhToan"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tienDaThanhToan",
      key: "tienDaThanhToan",
      align: "right",
      i18Name: "goiDichVu.tienDaThanhToan",
      render: (value, item, index) => {
        return Number(value || 0).formatPrice();
      },
    }),
    Column({
      title: t("goiDichVu.tienDaSuDung"),
      sort_key: "tienDaSuDung",
      dataSort: dataSortColumn["tienDaSuDung"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tienDaSuDung",
      key: "tienDaSuDung",
      align: "right",
      i18Name: "goiDichVu.tienDaSuDung",
      render: (value, item, index) => {
        return Number(value || 0).formatPrice();
      },
    }),
    Column({
      title: t("common.trangThai"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      i18Name: "common.trangThai",
      align: "center",
      render: (value) => {
        return (
          listTrangThaiNbGoiDv?.find((item) => item.id == value)?.ten || ""
        );
      },
    }),
    Column({
      title: (
        <>
          {t("common.tienIch")}
          <IcSetting
            onClick={onSettings}
            className="icon"
          />
        </>
      ),
      width: "150px",
      align: "center",
      fixed: "right",
      i18Name: "common.tienIch",
      render: (filed, item) => {
        return (
          <>
            <IcEye className="ic-action" />
            <IcDelete
              className="ic-action"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(item);
              }}
            />
          </>
        );
      },
    }),
  ];

  const onShowSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        handleViewDetail(id);
      },
    };
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listNbGoiDv}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 1500 }}
        tableName="table_GOIDV_NguoiBenhSuDungGoi"
        ref={refSettings}
        onRow={onRow}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listNbGoiDv}
          total={totalElements}
          onShowSizeChange={onShowSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
