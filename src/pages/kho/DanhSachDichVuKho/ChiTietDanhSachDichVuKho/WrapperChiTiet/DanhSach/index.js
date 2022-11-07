import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, DatePicker, Input, Row } from "antd";
import { Main, Header, SelectStyled } from "./styled";
import { Pagination, Select, TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const DanhSach = (props) => {
  const {
    danhSachDichVuKhoChiTiet: {
      totalElements,
      size,
      page,
      dataSortColumn,
      listPhieuNhapChiTiet,
      selectedItem,
    },
  } = useSelector((state) => state);
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);

  const {
    danhSachDichVuKhoChiTiet: {
      onSortChange,
      getListPhieuNhapXuatChiTiet,
      updateData,
    },
  } = useDispatch();

  const [state, _setState] = useState({ loaiDichVu: 1 });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { khoId, dichVuId } = useParams();

  const listPhieuNhapChiTietMemo = useMemo(() => {
    return listPhieuNhapChiTiet.map((item, idx) => ({
      ...item,
      key: `${item.phieuNhapXuatId}-${idx}`,
    }));
  }, [listPhieuNhapChiTiet]);

  useEffect(() => {
    getListPhieuNhapXuatChiTiet({
      khoId: khoId,
      dichVuId: dichVuId,
      nhapKho: true,
      dsTrangThai: [30],
    });
  }, []);
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        // onShowAndHandleUpdate(record);
      },
    };
  };
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const columnsNhap = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "index",
      key: "index",
      hideSearch: true,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "70px",
      dataIndex: "soLuong",
      key: "soLuong",
      type: true,
      hideSearch: true,
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDonViTinh"] || ""}
        />
      ),
      width: "70px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Hạn sử dụng"
          sort_key="ngayHanSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayHanSuDung"] || ""}
        />
      ),
      render: (item) => {
        return item?.toDateObject()?.format("dd/MM/YYYY");
      },
      width: "70px",
      dataIndex: "ngayHanSuDung",
      key: "ngayHanSuDung",
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Số lô"
          sort_key="soLo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLo"] || ""}
        />
      ),
      width: "70px",
      dataIndex: "soLo",
      hideSearch: true,
      key: "soLo",
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "soPhieu",
      hideSearch: true,
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Hình thức nhập"
          sort_key="tenHinhThucNhapXuat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenHinhThucNhapXuat"] || ""}
        />
      ),
      width: "90px",
      dataIndex: "tenHinhThucNhapXuat",
      hideSearch: true,
      key: "tenHinhThucNhapXuat",
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "quyetDinhThau",
      hideSearch: true,
      key: "quyetDinhThau",
    },
    {
      title: (
        <HeaderSearch
          title="Kho xuất"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "khoXuat",
      hideSearch: true,
      key: "khoXuat",
    },
    {
      title: (
        <HeaderSearch
          title="Xuất xứ"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "xuatXu",
      hideSearch: true,
      key: "xuatXu",
    },
    {
      title: (
        <HeaderSearch
          title="Số visa"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || ""}
        />
      ),
      width: "70px",
      dataIndex: "soVisa",
      hideSearch: true,
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày duyệt"
          sort_key="thoiGianDuyet"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianDuyet"] || ""}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianDuyet",
      hideSearch: true,
      key: "thoiGianDuyet",
      render: (item) => {
        return (
          <>
            <div>{item && moment(item).format("DD/MM/YYYY")}</div>
          </>
        );
      },
    },
  ];

  const columnsXuat = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "index",
      key: "index",
      hideSearch: true,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên NB"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nhập họ tên NB" />}
        />
      ),
      width: "250px",
      dataIndex: "tenNb",
      key: "tenNb",
      type: true,
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nhập mã hồ sơ" />}
        />
      ),
      width: "110px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      type: true,
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng KCB"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<Select placeholder="Chọn đối tượng KCB" />}
        />
      ),
      width: "120px",
      dataIndex: "doiTuongKcb",
      key: "doiTuongKcb",
      type: true,
      hideSearch: true,
      render: (item) => listDoiTuongKcb.find((x) => x.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "130px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng xuất"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "120px",
      dataIndex: "soLuong",
      key: "soLuong",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Hệ số định mức"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "80px",
      dataIndex: "",
      key: "",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "70px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái thanh toán"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "90px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      type: true,
      hideSearch: true,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nhập số phiếu" />}
        />
      ),
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái phiếu"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<Select placeholder="Chọn trạng thái phiếu" />}
        />
      ),
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      type: true,
      hideSearch: true,
      render: (item) =>
        (listTrangThaiPhieuNhapXuat || []).find((x) => x.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Ngày phát"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<DatePicker placeholder="Chọn ngày phát" />}
        />
      ),
      width: "120px",
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      type: true,
      hideSearch: true,
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title="Số visa"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "120px",
      dataIndex: "soVisa",
      key: "soVisa",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Số lô"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "90px",
      dataIndex: "soLo",
      key: "soLo",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "200px",
      dataIndex: "",
      key: "",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "200px",
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Nhà sản xuất"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "200px",
      dataIndex: "tenNhaSanXuat",
      key: "tenNhaSanXuat",
      type: true,
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Xuất xứ"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      width: "200px",
      dataIndex: "tenXuatXu",
      key: "tenXuatXu",
      type: true,
      hideSearch: true,
    },
  ];
  const dataloaiDichVu = [
    {
      id: 1,
      ten: "Danh sách nhập",
    },
    {
      id: 2,
      ten: "Danh sách xuất",
    },
    {
      id: 3,
      ten: "Danh sách giữ chỗ",
    },
    {
      id: 4,
      ten: "Danh sách nb hủy giữ tồn",
    },
  ];

  const onChangeGroupService = (e) => {
    let nhapKho = true;
    let dsTrangThai = [30];
    let loaiNhapXuat = undefined;

    if (e === 2) nhapKho = false;
    if (e === 3) {
      nhapKho = false;
      dsTrangThai = [15, 20];
    }
    if (e === 4) {
      nhapKho = false;
      dsTrangThai = [10];
      loaiNhapXuat = 100;
    }

    getListPhieuNhapXuatChiTiet({
      khoId: khoId,
      dichVuId: dichVuId,
      nhapKho: nhapKho,
      dsTrangThai: dsTrangThai,
      loaiNhapXuat: loaiNhapXuat,
    });
    setState({ loaiDichVu: e, nhapKho });

    if (e !== 3) {
      updateData({
        selectedItem: null,
      });
    }
  };

  const changePage = (page) => {
    getListPhieuNhapXuatChiTiet({
      page: page - 1,
      nhapKho: state?.nhapKho,
    });

    updateData({
      selectedItem: null,
    });
  };

  const changeSize = (size) => {
    getListPhieuNhapXuatChiTiet({
      page: 0,
      size,
      nhapKho: state?.nhapKho,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    updateData({
      selectedItem: data && data[data.length - 1],
    });
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title="" />,
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: selectedItem
      ? listPhieuNhapChiTietMemo
          .filter((x) => x.phieuNhapXuatId == selectedItem.phieuNhapXuatId)
          .map((x) => x.key)
      : [],
    type: "checkbox",
  };

  return (
    <Main className="main">
      <Header>
        <div className="header">
          <Row className="header-row">
            <Row>
              <div className="content">Lịch sử nhập xuất</div>
              <div className="content-note">
                <SelectStyled>
                  <Select
                    onChange={onChangeGroupService}
                    value={state.loaiDichVu}
                    placeholder={"Danh sách nhập"}
                    data={dataloaiDichVu}
                  />
                </SelectStyled>
              </div>
            </Row>
          </Row>
        </div>
      </Header>
      <TableWrapper
        className="table"
        scroll={{ y: 2000 }}
        rowKey={(record) => record.key}
        onRow={onRow}
        rowClassName={(record) => (record?.checked ? "background-checked" : "")}
        columns={state.loaiDichVu === 1 ? columnsNhap : columnsXuat}
        dataSource={listPhieuNhapChiTietMemo}
        rowSelection={[3, 4].includes(state.loaiDichVu) && rowSelection}
      ></TableWrapper>
      {totalElements ? (
        <Pagination
          listData={listPhieuNhapChiTietMemo}
          onChange={changePage}
          onShowSizeChange={changeSize}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
        />
      ) : null}
    </Main>
  );
};

export default memo(DanhSach);
