import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main, GlobalStyle, ModalStyled } from "./styled";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { TableWrapper, HeaderSearch, Button, Pagination } from "components";
import { Input, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const ModalDanhSachNguoiBenh = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();

  const {
    soDoPhongGiuong: { getDsNbTheoGiuong },
  } = useDispatch();
  const {
    soDoPhongGiuong: { dsNguoiBenh },
  } = useSelector((state) => state);

  //state
  const [state, _setState] = useState({
    show: false,
    loaiDichVu: 10,
    dataSortColumn: {},
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const { dataSortColumn } = state;

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });

      const { giuongId, khoaId } = data;

      getDsNbTheoGiuong({
        giuongId,
        khoaId,
        page: 0,
      });
    },
  }));

  //function
  function onClose() {
    setState({ show: false });
  }

  function handleSizeChange(size) {}

  function onChangePage(page) {}

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  //column
  const columns = [
    {
      width: "50px",
      align: "center",
      render: () => <Radio />,
    },
    {
      title: (
        <HeaderSearch
          title="Mã bệnh án"
          sort_key="maBenhAn"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maBenhAn || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 100,
      dataIndex: "maBenhAn",
    },
    {
      title: (
        <HeaderSearch
          title="Tên người bệnh"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNb || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      width: 200,
      align: "right",
      dataIndex: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Số giường"
          sort_key="soHieuGiuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soHieuGiuong || 0}
        />
      ),
      dataIndex: "soHieuGiuong",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số phòng"
          sort_key="tenPhong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenPhong || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "tenPhong",
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ giường"
          sort_key="tenDvGiuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDvGiuong || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "tenDvGiuong",
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ giường VIP"
          sort_key="tenDvGiuongTuChon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDvGiuongTuChon || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "tenDvGiuongTuChon",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày vào viện"
          sort_key="thoiGianVaoVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianVaoVien || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "thoiGianVaoVien",
      render: (item) => {
        return item ? moment(item).format(DATE_FORMAT) : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày bắt đầu nằm"
          sort_key="tuThoiGian"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tuThoiGian || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "tuThoiGian",
      render: (item) => {
        return item ? moment(item).format(DATE_FORMAT) : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nằm đến ngày"
          sort_key="denThoiGian"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.denThoiGian || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "denThoiGian",
      render: (item) => {
        return item ? moment(item).format(DATE_FORMAT) : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số ngày giường"
          sort_key="soNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soNgay || 0}
          search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "soNgay",
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "100px",
      align: "center",
      render: (item) => {
        return (
          <div className="tool-btn">
            <EditOutlined style={{ color: "#0762F7", fontSize: 18 }} />
            <DeleteOutlined style={{ color: "red", fontSize: 18 }} />
          </div>
        );
      },
    },
  ];

  return (
    <ModalStyled
      width={"95%"}
      visible={state.show}
      footer={null}
      title={"Danh sách người bệnh"}
      closable={false}
      onCancel={onClose}
    >
      <GlobalStyle />
      <Main>
        <div className="table-content">
          <TableWrapper
            bordered
            columns={columns}
            dataSource={dsNguoiBenh || []}
            rowKey={(record) => `${record.id}`}
          />
        </div>

        <Pagination
          listData={dsNguoiBenh || []}
          onChange={onChangePage}
          current={1}
          pageSize={10}
          total={4}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />

        <div className="footer-action">
          <div className="back-text cursor-pointer" onClick={onClose}>
            <ArrowLeftOutlined />
            &emsp;{t("common.quayLai")}
          </div>
          <Button
            type="primary"
            minWidth={100}
            rightIcon={<SaveOutlined />}
            iconHeight={15}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalDanhSachNguoiBenh);
