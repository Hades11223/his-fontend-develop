import React, { useRef } from "react";
import { TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";
import { formatDecimal } from "../../../../utils";
import { Main } from "./styled";
import { ModalNotification2 } from "components/ModalConfirm";
import ModalChiTietDichVuTrongGoi from "../ModalChiTietDichVuTrongGoi";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";

const DanhSachGoiDichVu = ({ data = [], onDeleteItem }) => {
  const { t } = useTranslation();
  //ref
  const refModalNotificationDeleted = useRef(null);
  const refModalChiTietDichVuTrongGoi = useRef(null);

  const renderContent = (typeContent) => (value, row, index) => {
    const obj = {
      children: typeContent === "price" ? formatDecimal(value) : value,
      props: {},
    };

    if (row.type === "group") {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const deleteGoiDichVu = (item) => (e) => {
    e.preventDefault();

    refModalNotificationDeleted.current &&
      refModalNotificationDeleted.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa ${item.tenDichVu}?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteItem(item?.id);
        },
        () => {}
      );
  };

  const editGoiDichVu = (item) => () => {
    refModalChiTietDichVuTrongGoi.current &&
      refModalChiTietDichVuTrongGoi.current.show(item);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 50,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: renderContent(),
    },
    {
      title: <HeaderSearch title={t("common.dichVu")} />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: <HeaderSearch title={t("common.thanhTien")} />,
      width: 100,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: renderContent("price"),
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 80,
      render: (item) => {
        return (
          <div className="col-tool">
            <img src={IconEdit} onClick={editGoiDichVu(item)} alt="" />
            <img src={IconDelete} onClick={deleteGoiDichVu(item)} alt="" />
          </div>
        );
      },
    },
  ];

  return (
    <Main>
      <TableWrapper scroll={{ x: false }} columns={columns} dataSource={data} />

      <ModalChiTietDichVuTrongGoi ref={refModalChiTietDichVuTrongGoi} />
      <ModalNotification2 ref={refModalNotificationDeleted} />
    </Main>
  );
};

export default DanhSachGoiDichVu;
