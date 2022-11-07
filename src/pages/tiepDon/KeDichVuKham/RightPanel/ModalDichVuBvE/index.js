import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Main, ModalStyled, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { Button } from "components";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";

const ModalDichVuBvE = (props, ref) => {
  const {
    ngoaiVien: { listNbNgoaiVien },
    tiepDon: { nbNgoaiVien, tenNb, tuoi },
    phong: { listAllPhong },
  } = useSelector((state) => state);

  const {
    ngoaiVien: { onSearch },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onClose = () => {
    setState({ show: false });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
      });

      onSearch({ maHoSo: nbNgoaiVien?.maHoSo });
    },
  }));

  const getTenPhong = (ma) => {
    let phong = listAllPhong?.find((e) => e.ma === ma);
    if (phong) {
      return (
        phong?.ma + "-" + phong?.ten + (phong.toaNha ? "-" + phong.toaNha : "")
      );
    }
    return "";
  };

  const columns = [
    {
      title: <HeaderSearch title={"STT"} />,
      width: "50px",
      dataIndex: "index",
      hideSearch: true,
      align: "center",
    },
    {
      title: <HeaderSearch title={"Số phiếu BVE"} />,
      width: "100px",
      dataIndex: "soPhieu",
    },
    {
      title: <HeaderSearch title={"Mã dịch vụ"} />,
      width: "100px",
      dataIndex: "maDichVu",
    },
    {
      title: <HeaderSearch title={"Tên dịch vụ"} />,
      width: "200px",
      dataIndex: "tenDichVu",
    },
    {
      title: <HeaderSearch title={"Mã phòng"} />,
      width: "100px",
      dataIndex: "maPhongThucHien",
    },
    {
      title: <HeaderSearch title={"Tên phòng"} />,
      width: "200px",
      dataIndex: "maPhongThucHien",
      render: (item) => {
        return getTenPhong(item);
      },
    },
    {
      title: <HeaderSearch title={"Ngày chỉ định BVE"} />,
      width: "100px",
      dataIndex: "thoiGianThucHien",
      hideSearch: true,
      align: "right",
      render: (item, list) => {
        return item && moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <ModalStyled
      width={"80%"}
      visible={state.show}
      footer={null}
      closable={false}
      onCancel={onClose}
      title={
        <div className="modal-title">
          <div className="title-label">
            Danh sách DV chỉ định từ Bệnh viện E
          </div>
          <div className="nbInfo-label">{`${tenNb} - ${
            tuoi || ""
          } tuổi - Mã HS BVE: ${nbNgoaiVien?.maHoSo}`}</div>
        </div>
      }
    >
      <Main>
        <ContentTable>
          <TableWrapper
            // title={<div>"Danh sách DV chỉ định từ Bệnh viện E"</div>}
            scroll={{ x: 500, y: 100 }}
            rowKey={"key"}
            columns={columns}
            dataSource={(listNbNgoaiVien[0]?.dsDichVu || []).map(
              (item, idx) => ({
                ...item,
                index: idx + 1,
              })
            )}
          />

          {/* <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listNguoiBenhTiepDon}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        /> */}
        </ContentTable>

        <div className="footer-action">
          <span>
            Lưu ý: DV Không liên thông được nếu không trùng mã dịch vụ và mã
            phòng
          </span>
          <Button onClick={onClose}>{`Đóng [Esc]`}</Button>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalDichVuBvE);
