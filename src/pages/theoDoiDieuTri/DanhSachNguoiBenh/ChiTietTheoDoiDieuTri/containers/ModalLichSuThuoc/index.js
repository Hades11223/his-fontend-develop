import { Row, Button } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ModalStyle, Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";

const ModalLichSuThuoc = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const closeToggleModal = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setOpen(true);
      setItem(item);
    },
  }));

  const columns = [
    {
      title: <HeaderSearch title="Nội dung mới" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      sortIndex: 1,
    },
    {
      title: <HeaderSearch title="Nội dung cũ" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      sortIndex: 1,
    },
    {
      title: <HeaderSearch title="Người chỉnh sửa" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      sortIndex: 1,
    },
    {
      title: <HeaderSearch title="Thời gian chỉnh sửa" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      sortIndex: 1,
    },
  ];
  return (
    <ModalStyle width={1887} visible={open} closable={false} footer={null}>
      <Main>
        <Row className="header">
          <span>Lịch sử chỉnh sửa đơn thuốc </span>
        </Row>
        <TableWrapper columns={columns}></TableWrapper>
        <div className="footer">
          <Button className="btn-back" onClick={closeToggleModal}>
            Quay lại
          </Button>
        </div>
      </Main>
    </ModalStyle>
  );
};

export default forwardRef(ModalLichSuThuoc);
