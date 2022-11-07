import { Select, Table } from "antd";
import empty from "assets/images/kho/empty.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useState } from "react";
import Pagination from "components/Pagination";
import { Main } from "./styled";
import { trangThaiDV } from "../../constant";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Option } = Select;

const DsDichVuLienQuan = (props) => {
  const [state, setState] = useState({});
  const handleSort = () => {};
  const dataTest = [
    { trangThai: 1, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 2, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 3, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 4, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 5, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 6, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 1, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 1, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 1, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
    { trangThai: 1, soPhieu: "123123123",maNB:'456456456',tenNB:"NGUYỄN HOÀNG THẢO NGUYÊN",dichVu:'X-Q ngực thẳng',ngaySinh:'10/10/1999',doiTuong:'BHYT',thoiGianChiDinh:'12/8/2021',thoiGianTiepNhan:'12/8/2021',thoiGianCoKetQua:'13/8/2021',bacSiDocKetQua:'Ngô Quang Hiếu',maHoSo:'A123456' },
  ]
  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          dataSort={state.sortKey === "stt" ? state.sortValue : 0}
          sort_key="stt"
          onClickSort={handleSort("stt")}
        />
      ),
      key: "stt",
      width: 60,
      align: "right",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          dataSort={state.sortKey === "tenHangHoa" ? state.sortValue : 0}
          sort_key="tenHangHoa"
          onClickSort={handleSort("dichVu", "ten")}
        />
      ),
      dataIndex: "trangThai",
      key: "trangThai",
      width: 150,
      render: (item) =>
        item && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {trangThaiDV[item - 1].icon}
            <span style={{ marginLeft: "5px" }}>
              {trangThaiDV[item - 1].ten}
            </span>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          dataSort={state.sortKey === "dvt" ? state.sortValue : 0}
          sort_key="dvt"
          onClickSort={handleSort("dichVu", "tenDonViTinh")}
        />
      ),
      dataIndex: "soPhieu",
      key: "soPhieu",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          dataSort={state.sortKey === "hamLuong" ? state.sortValue : 0}
          sort_key="hamLuong"
          onClickSort={handleSort("dichVu", "hamLuong")}
        />
      ),
      dataIndex: "maNB",
      key: "maNB",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Tên NB"
          dataSort={state.sortKey === "slDuTru" ? state.sortValue : 0}
          sort_key="slDuTru"
          onClickSort={handleSort("soLuongYeuCau")}
        />
      ),
      dataIndex: "tenNB",
      key: "tenNB",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          dataSort={state.sortKey === "slDuyet" ? state.sortValue : 0}
          sort_key="slDuyet"
          onClickSort={handleSort("soLuong")}
        />
      ),
      key: "dichVu",
      dataIndex: "dichVu",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          dataSort={state.sortKey === "soLo" ? state.sortValue : 0}
          sort_key="soLo"
          onClickSort={handleSort("loNhap", "soLo")}
        />
      ),
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "doiTuong",
      key: "doiTuong",
      align: "right",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian chỉ định"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      align: "right",
      width: 170,
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian tiếp nhận"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "thoiGianTiepNhan",
      key: "thoiGianTiepNhan",
      width: 170,
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian có kết quả"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "thoiGianCoKetQua",
      key: "thoiGianCoKetQua",
      width: 170,
    },
    {
      title: (
        <HeaderSearch
          title="Bác sĩ đọc kết quả"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "bacSiDocKetQua",
      key: "bacSiDocKetQua",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "maHoSo",
      key: "maHoSo",
      width: 150,
    },
  ];
  return (
    <Main>
      <div className="title">
        <div className="title-left">
          <h3>Danh sách dịch vụ liên quan</h3>
        </div>
        <div className="title-right">
          <Checkbox defaultChecked={true}>Số phiếu</Checkbox>
          <Checkbox>Mã HS</Checkbox>
        </div>
      </div>
      <div className="content">
        <Table
          locale={{
            emptyText: (
              <div style={{ padding: "50px 0" }}>
                <img src={empty} />
                <div style={{ padding: "10px 0" }}>Không có dịch vụ</div>
              </div>
            ),
          }}
          showSorterTooltip={false}
          scroll={{ x: 800, y: 200 }}
          columns={columns}
          dataSource={dataTest}
          pagination={false}
          rowKey={(record) => record.id}
        />

        <Pagination
          //   onChange={(page) => setState({ ...state, page })}
          current={1}
          //   pageSize={state.size}
          total={200}
          //   onShowSizeChange={(size) => setState({ ...state, page: 1, size })}
          stylePagination={{
            flex: 1,
            paddingBottom: "5px",
            marginTop: "5px",
            justifyContent: "flex-start",
          }}
        />
      </div>
    </Main>
  );
};

export default DsDichVuLienQuan;
