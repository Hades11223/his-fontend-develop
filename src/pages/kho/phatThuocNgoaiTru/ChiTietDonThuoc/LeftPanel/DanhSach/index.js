import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row } from "antd";
import { TableWrapper } from "components";
import { Main, Header, PopoverCustom } from "./styled";
import { cloneDeep } from "lodash";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";

const DanhSach = ({ layerId }) => {
  const infoPatientInit = useRef(null);

  const infoPatient = useStore("thuocChiTiet.infoPatient");

  const {
    thuocChiTiet: { updateData },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);
  const refSearch = useRef();

  const [state, _setState] = useState({
    dsThuoc: [],
    discount: 1,
    listTypeDiscountInPopup: [],
    listVisiblePopupOnLine: [],
    dsDichVu: [],
    dataSortColumn: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        updateData({ selectedDonThuoc: record });
        // onShowAndHandleUpdate(record);
      },
    };
  };
  useEffect(() => {
    // đăng ký phím tắt
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refSearch.current && refSearch.current.focus();
          },
        },
      ],
    });
  }, []);

  const onClickSort = (key, value) => {
    setState({
      dataSortColumn: {
        ...state.dataSortColumn,
        [key]: value,
      },
    });
  };

  useEffect(() => {
    // set giá trị render lần đầu cho biến infoPatientInit, để xử lý sort
    if (
      infoPatientInit.current === null ||
      (infoPatientInit.current &&
        Object.keys(infoPatientInit.current).length === 0)
    ) {
      infoPatientInit.current = cloneDeep(infoPatient);
    }
  }, [infoPatient]);

  const contentNamePopover = (item) => {
    return (
      <div
        style={{
          pointerEvents: "none",
        }}
      >
        <div>
          <b>{`${item?.nbDichVu?.dichVu?.ma} - ${item?.nbDichVu?.dichVu?.ten} - ${item?.nbDichVu?.dichVu?.hamLuong}`}</b>
        </div>
        <div>
          Liều dùng - Cách dùng: <b>{item?.lieuDung?.ten}</b>
        </div>

        <div>
          Đợt dùng: <b>{item?.dotDung}</b>
        </div>
        <div>
          Thời gian dùng:{" "}
          <b>{`Từ ${
            item?.ngayThucHienTu &&
            moment(item?.ngayThucHienTu).format("DD/MM/YYYY")
          } - Đến 
        ${
          item?.ngayThucHienDen &&
          moment(item?.ngayThucHienDen).format("DD/MM/YYYY")
        } `}</b>
        </div>
        <div>
          Đường dùng : <b>{item?.nbDichVu?.dichVu?.tenDuongDung}</b>
        </div>
        <div>
          Lô nhập : <b>{item?.nbDvKho?.loNhap?.soLo}</b>
        </div>
        <div>
          Trạng thái thanh toán :
          <b>
            {`${
              !infoPatient?.phieuThu?.thanhToan
                ? " Chưa thanh toán"
                : " Đã thanh toán"
            }`}
          </b>
        </div>
        <div>
          Khoa chỉ định : <b>{item?.nbDichVu?.khoaChiDinh?.ten}</b>
        </div>
        <div>
          Ngày kê :{" "}
          <b>
            {item?.nbDichVu?.thoiGianChiDinh &&
              moment(item?.nbDichVu?.thoiGianChiDinh).format("DD/MM/YYYY")}
          </b>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên Thuốc"
          sort_key="nbDichVu.dichVu.ten"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.dichVu.ten"] || ""}
        />
      ),
      width: 240,
      // dataIndex: "nbDichVu",
      key: "ten",
      render: (item) => {
        return (
          <>
            <PopoverCustom
              className="popup-custom"
              placement="right"
              content={contentNamePopover(item)}
              trigger={["hover", "click"]}
            >
              <div style={{ color: "#0762F7", fontWeight: "bold" }}>
                {item?.nbDichVu?.dichVu?.ten}
              </div>
            </PopoverCustom>
          </>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="nbDichVu.dichVu.hamLuong"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.dichVu.hamLuong"] || ""}
        />
      ),
      width: 220,
      dataIndex: "nbDichVu",
      key: "hamLuong",
      render: (item) => {
        return item?.dichVu?.hamLuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL phát"
          sort_key="nbDichVu.soLuong"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.soLuong"] || ""}
        />
      ),
      width: 80,
      dataIndex: "nbDichVu",
      key: "soLuongBan",
      align: "right",
      render: (item) => {
        return item?.soLuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL kê"
          sort_key="nbDvKho.soLuongYeuCau"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDvKho.soLuongYeuCau"] || ""}
        />
      ),
      key: "soLuongYeuCau",
      width: 70,
      dataIndex: "nbDvKho",
      align: "right",
      render: (item) => {
        return item?.soLuongYeuCau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key="nbDichVu.dichVu.tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.dichVu.tenDonViTinh"] || ""}
        />
      ),
      width: 65,
      dataIndex: "nbDichVu",
      key: "tenDonViTinh",
      align: "center",
      render: (item) => {
        return item?.dichVu?.tenDonViTinh;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái hoàn"
          sort_key="nbDichVu.trangThaiHoan"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.trangThaiHoan"] || ""}
        />
      ),
      width: 130,
      dataIndex: "nbDichVu",
      key: "trangThaiHoan",
      align: "center",
      render: (item) => {
        return listTrangThaiHoan?.find((x) => x.id === item?.trangThaiHoan)
          ?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="nbDichVu.trangThaiHoan"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.giaBaoHiem"] || ""}
        />
      ),
      width: 110,
      dataIndex: "nbDichVu",
      key: "giaBaoHiem",
      align: "right",
      render: (item) => {
        return item?.giaBaoHiem?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá KBH"
          sort_key="nbDichVu.trangThaiHoan"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.giaKhongBaoHiem"] || ""}
        />
      ),
      width: 115,
      dataIndex: "nbDichVu",
      key: "giaKhongBaoHiem",
      align: "right",
      render: (item) => {
        return item?.giaKhongBaoHiem?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá phụ thu"
          sort_key="nbDichVu.giaPhuThu"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.giaPhuThu"] || ""}
        />
      ),
      width: 110,
      dataIndex: "nbDichVu",
      key: "giaPhuThu",
      align: "right",
      render: (item) => {
        return item?.giaPhuThu?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Bác sĩ chỉ định"
          sort_key="nbDichVu.bacSiChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.bacSiChiDinh.ten"] || ""}
        />
      ),
      width: 130,
      dataIndex: "nbDichVu",
      key: "bacSiChiDinh",
      align: "center",
      render: (item) => {
        return item?.bacSiChiDinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="nbDichVu.thanhTien"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["nbDichVu.thanhTien"] || ""}
        />
      ),
      width: 120,
      dataIndex: "nbDichVu",
      key: "thanhTien",
      align: "right",
      render: (item) => {
        return (
          <div style={{ color: "#0762F7", fontWeight: "bold" }}>
            {item?.thanhTien.formatPrice()}
          </div>
        );
      },
    },
  ];

  return (
    <Main noPadding={true} bottom={0}>
      <Header>
        <div className="header">
          <Row className="header-row">
            <div className="content">Danh sách chi tiết</div>
          </Row>
        </div>
      </Header>
      <TableWrapper
        scroll={{ y: 453 }}
        rowKey={"id"}
        onRow={onRow}
        rowClassName={(record) => (record?.checked ? "background-checked" : "")}
        columns={columns}
        dataSource={infoPatient?.dsThuoc}
      ></TableWrapper>
    </Main>
  );
};

export default DanhSach;
