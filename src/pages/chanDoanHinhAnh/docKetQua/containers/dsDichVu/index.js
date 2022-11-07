import { DatePicker, Dropdown, Menu, Select, Table } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import empty from "assets/images/kho/empty.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useRef, useState } from "react";
import InputSearch from "../../../components/InputSearch";
import { trangThaiDV } from "../../constant";
import { Main } from "./styled";
import { searchString } from "utils";

const { Option } = Select;

const DsDichVu = (props) => {
  const [state, setState] = useState({});
  const handleSort = () => {};
  const refSearch = useRef(null);

  // TODO: data test tính năng search bỏ khi ghép api
  const [dataSearch, setDataSearch] = useState([
    { ten: "Phòng 1", id: 1, checked: true },
    { ten: "Phòng phẫu thuật", id: 2 },
    { ten: "Phòng bảo vệ", id: 3 },
    { ten: "Phòng nghỉ dưỡng", id: 4 },
    { ten: "Phòng hồi sức", id: 5, checked: true },
    { ten: "Phòng cứu thương", id: 6, checked: true },
    { ten: "Phòng cấp cứu", id: 7 },
    { ten: "Phòng 8", id: 8 },
    { ten: "Phòng 9", id: 9 },
  ]);

  // TODO: data test tính năng search bỏ đi khi ghép api
  const maNBTest = [
    { ten: "123456", id: 1 },
    { ten: "456789", id: 2 },
    { ten: "789123", id: 3 },
    { ten: "456123", id: 4 },
  ];

  // TODO: data test bỏ khi ghép api
  const dataTest = [
    {
      trangThai: 1,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 2,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 3,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 4,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 5,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 6,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 1,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 1,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 1,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
    {
      trangThai: 1,
      soPhieu: "123123123",
      maNB: "456456456",
      tenNB: "NGUYỄN HOÀNG THẢO NGUYÊN",
      dichVu: "X-Q ngực thẳng",
      ngaySinh: "10/10/1999",
      doiTuong: "BHYT",
      thoiGianChiDinh: "12/8/2021",
      thoiGianTiepNhan: "12/8/2021",
      thoiGianCoKetQua: "13/8/2021",
      bacSiDocKetQua: "Ngô Quang Hiếu",
      maHoSo: "A123456",
    },
  ];
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

  const onChange = (selected, index) => {
    const newData = Object.assign([], dataSearch);
    newData[index].checked = selected;
    setDataSearch(newData);
  };
  const selectAll = (selected, index) => {
    const newData = Object.assign([], dataSearch);
    newData.forEach((item) => (item.checked = selected));
    setDataSearch(newData);
  };

  return (
    <Main>
      <div className="title">
        <div className="title-left">
          <h3>Danh sách dịch vụ</h3>
          <span style={{ marginLeft: "15px" }}>
            <div className="search-select">
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
              <InputSearch
                placeholder="Chọn phòng"
                data={dataSearch}
                onChange={onChange}
                onChangeSelectAll={selectAll}
              />
            </div>
          </span>
        </div>
        <div className="title-right">
          <div className="search-select">
            <Select
              // ref={refSearchHangHoa}
              style={{ width: "120px" }}
              showSearch
              allowClear
              onClear={() => {}}
              placeholder="Mã NB"
              // onSearch={onSearch("timKiem")}
              // onSelect={(e) => {
              //   showModalDS(e);
              // }}
              filterOption={(a, b) => searchString(a, b.children)}
            >
              {maNBTest.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.ten}
                </Option>
              ))}
            </Select>
          </div>
          <div className="search-select">
            <Select
              // ref={refSearchHangHoa}
              style={{ width: "120px" }}
              showSearch
              allowClear
              onClear={() => {}}
              placeholder="Trạng thái"
              // onSearch={onSearch("timKiem")}
              // onSelect={(e) => {
              //   showModalDS(e);
              // }}
              filterOption={(a, b) => searchString(a, b.children)}
            >
              {trangThaiDV.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.ten}
                </Option>
              ))}
            </Select>
          </div>
          <div className="search-select">
            <DatePicker format="DD/MM/YYYY" placeholder="7 Ngày" />
          </div>
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
          listData={dataTest}
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

export default DsDichVu;
