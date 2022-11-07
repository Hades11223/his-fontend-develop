import React, { useEffect, useRef, useState } from "react";
import TableWrapper from "components/TableWrapper";
import { SearchOutlined } from "@ant-design/icons";
import { HeaderSearch } from "components";
import { Main, ContentTable } from "./styled";
import { ModalNotification2 } from "components/ModalConfirm";
import { formatDecimal } from "../../../../../utils";
import { InputTimeout } from "components";
import IcDelete from "assets/images/khamBenh/delete.png";

const GoiDichVuItem = (props) => {
  const { data, onDeleteItem } = props;
  const [slNv, setSlNv] = useState(0);
  const [listDV, setListDV] = useState(data || []);
  useEffect(() => {
    if (data && data.length > 0) {
      setSlNv(data[0]?.soLuongSuDung || 0);
    }
    setListDV(
      data.map((item, index) => {
        return { ...item, index: index + 1 };
      })
    );
  }, [data]);
  //ref
  const refModalNotificationDeleted = useRef(null);

  const onSearch = (key) => (value) => {
    const valueText = value?.trim().toLowerCase().unsignText();

    const listDichVu = data
      .filter(
        (option) =>
          option[key]?.toLowerCase().unsignText().indexOf(valueText) >= 0
      )
      .map((item, idx) => ({
        ...item,
        key: idx,
        index: idx + 1,
      }));

    setListDV(listDichVu);
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearch("maDichVu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "maDichVu",
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onSearch("tenDichVu")}
            />
          }
        />
      ),
      width: 400,
      dataIndex: "tenDichVu",
    },
    {
      title: <HeaderSearch title="Số lượng" />,
      dataIndex: "soLuong",
      width: "100px",
      render: (item) => {
        return item || 0;
      },
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      dataIndex: "phongId",
      width: 150,
      render: (item, list, index) => {
        return (list?.dsPhong || []).find((x) => x.phongId === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title="% Miễn giảm" />,
      dataIndex: "phanTramMienGiam",
      width: "100px",
      render: (item) => {
        return item || 0;
      },
    },
    {
      title: <HeaderSearch title="Tiền miễn giảm" />,
      dataIndex: "tienMienGiam",
      width: "120px",
      render: (item) => {
        return item ? formatDecimal(String(item)) : 0;
      },
    },
    {
      title: <HeaderSearch title="ĐG sau giảm" />,
      align: "right",
      width: "120px",
      render: (item) => {
        const _value = item.phanTramMienGiam
          ? item.giaKhongBaoHiem -
            (item.giaKhongBaoHiem * item.phanTramMienGiam) / 100
          : item.giaKhongBaoHiem - item.tienMienGiam || 0;

        return formatDecimal(_value);
      },
    },
    {
      title: <HeaderSearch title="Đơn giá" />,
      dataIndex: "giaKhongBaoHiem",
      align: "right",
      width: "100px",
      render: (item) => {
        return formatDecimal(String(item));
      },
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      align: "center",
      width: "80px",
      render: (item, data, index) => {
        return (
          <img src={IcDelete} alt="..." onClick={deleteDichVu(item)}></img>
        );
      },
    },
  ];

  const deleteDichVu = (item) => () => {
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
          onDeleteItem(item.id);
        },
        () => {}
      );
  };

  const onRow = () => {
    return {
      onClick: () => {},
    };
  };

  return (
    <Main>
      <ContentTable>
        <TableWrapper
          bordered
          columns={columns}
          dataSource={listDV || []}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
        />
      </ContentTable>

      <ModalNotification2 ref={refModalNotificationDeleted} />
    </Main>
  );
};

export default GoiDichVuItem;
