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
          title="S??? l?????ng"
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
          title="??VT"
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
          title="H???n s??? d???ng"
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
          title="S??? l??"
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
          title="S??? phi???u"
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
          title="H??nh th???c nh???p"
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
          title="Quy???t ?????nh th???u"
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
          title="Kho xu???t"
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
          title="Xu???t x???"
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
          title="S??? visa"
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
          title="Ng??y duy???t"
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
          title="H??? t??n NB"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nh???p h??? t??n NB" />}
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
          title="M?? h??? s??"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nh???p m?? h??? s??" />}
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
          title="?????i t?????ng KCB"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<Select placeholder="Ch???n ?????i t?????ng KCB" />}
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
          title="Khoa ch??? ?????nh"
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
          title="S??? l?????ng xu???t"
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
          title="H??? s??? ?????nh m???c"
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
          title="??VT"
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
          title="Tr???ng th??i thanh to??n"
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
          title="S??? phi???u"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          search={<Input placeholder="Nh???p s??? phi???u" />}
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
          title="Tr???ng th??i phi???u"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<Select placeholder="Ch???n tr???ng th??i phi???u" />}
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
          title="Ng??y ph??t"
          sort_key=""
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["soLuong"] || ""}
          searchSelect={<DatePicker placeholder="Ch???n ng??y ph??t" />}
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
          title="S??? visa"
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
          title="S??? l??"
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
          title="Nh?? cung c???p"
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
          title="Quy???t ?????nh th???u"
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
          title="Nh?? s???n xu???t"
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
          title="Xu???t x???"
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
      ten: "Danh s??ch nh???p",
    },
    {
      id: 2,
      ten: "Danh s??ch xu???t",
    },
    {
      id: 3,
      ten: "Danh s??ch gi??? ch???",
    },
    {
      id: 4,
      ten: "Danh s??ch nb h???y gi??? t???n",
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
              <div className="content">L???ch s??? nh???p xu???t</div>
              <div className="content-note">
                <SelectStyled>
                  <Select
                    onChange={onChangeGroupService}
                    value={state.loaiDichVu}
                    placeholder={"Danh s??ch nh???p"}
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
