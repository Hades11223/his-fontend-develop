import React, { useMemo } from "react";
import { Card, TableWrapper, HeaderSearch, Pagination } from "components";
import { Main, Header } from "./styled";
import { formatDecimal } from "utils";
import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";

const DanhSachThuoc = ({ dsThuoc = [] }) => {
  //memo
  const totalMoney = useMemo(() => {
    return dsThuoc
      .map((x) => x?.thanhTien || 0)
      .reduce((partialSum, a) => partialSum + a, 0);
  }, [dsThuoc]);

  const dsThuocMemo = useMemo(() => {
    return dsThuoc.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });
  }, [dsThuoc]);

  //function
  function onChangePage(page) {}

  function handleSizeChange(size) {}

  //columns
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      key: "index",
      width: 50,
      hideSearch: true,
      align: "center",
    },
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      width: 200,
      dataIndex: "tenDichVu",
    },
    {
      title: <HeaderSearch title="SL" />,
      width: 100,
      dataIndex: "soLuong",
    },
    {
      title: <HeaderSearch title="Đơn giá" />,
      dataIndex: "giaKhongBaoHiem",
      render: (item) => formatDecimal(item),
    },
    {
      title: <HeaderSearch title="Thành tiền" />,
      dataIndex: "thanhTien",
      render: (item) => formatDecimal(item),
    },
    {
      title: <HeaderSearch title="Số lô" />,
      dataIndex: "soLo",
      render: (item) => item || "",
    },
    {
      title: <HeaderSearch title="NSX" />,
      dataIndex: "ngaySanXuat",
      render: (item) => (item ? moment(item).format(DATE_FORMAT) : ""),
    },
    {
      title: <HeaderSearch title="HSD" />,
      dataIndex: "ngayHanSuDung",
      render: (item) => (item ? moment(item).format(DATE_FORMAT) : ""),
    },
    {
      title: <HeaderSearch title="Đơn vị tính" />,
      dataIndex: "tenDonViTinh",
      render: (item) => item || "",
    },
    {
      title: <HeaderSearch title="Hàm lượng" />,
      dataIndex: "hamLuong",
      render: (item) => item || "",
    },
  ];

  return (
    <Card>
      <Main>
        <Header>
          <label className="bold">Danh sách thuốc</label>
          <div>
            <span>Tổng tiền: </span>
            <span className="bold">{formatDecimal(totalMoney)}</span>
          </div>
        </Header>

        <TableWrapper columns={columns} dataSource={dsThuocMemo || []} />

        <Pagination
          listData={dsThuocMemo || []}
          onChange={onChangePage}
          current={1}
          pageSize={10}
          total={dsThuocMemo.length}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </Main>
    </Card>
  );
};

export default DanhSachThuoc;
