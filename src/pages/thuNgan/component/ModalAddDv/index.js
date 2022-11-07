import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Pagination } from "components";
import { ModalStyled } from "./styled";
import { Button, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { combineSort } from "utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";
let timer = null;
const ModalAddDichVu = (props, ref) => {
  const [state, _setState] = useState({
    show: false,
    dataSortColumn: {},
    listData: [],
    page: 0,
    size: 10,
    dataSearch: {
      thanhToan: true,
    },
    selectedRowKeys: [],
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { getDsPhieuThu } = dispatch.dsHoaDonDienTu;
  const { soPhieu } = useParams();
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refCallBack = useRef(null);
  useImperativeHandle(ref, () => ({
    show: ({}, callback) => {
      setState({
        show: true,
        selectedRowKeys: [],
      });
      refCallBack.current = callback;
    },
  }));
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setState({
      selectedRowKeys: selectedRowKeys,
      listPhieuThuId: selectedRows.map((item) => item.id),
    });
  };
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value };
    setState({
      dataSortColumn: sort,
    });
    onSearch({ page: state.page, size: state.size });
  };
  const onRow = () => {};
  const setRowClassName = () => {};
  const onChangePage = (page) => {
    setState({
      page: page - 1,
    });
    onSearch({
      page: page - 1,
      size: state.size,
      dataSearch: state.dataSearch,
    });
  };
  const onSearch = ({ page, size, dataSearch }) => {
    const sort = combineSort(state.dataSortColumn);
    getDsPhieuThu({
      ...dataSearch,
      sort,
      page: page,
      size: size,
      nbDotDieuTriId: props.nbDotDieuTriId,
      soPhieu: soPhieu,
    }).then((s) => {
      const newData = (s.data || [])
        .filter((item) => item.thanhTien)
        .map((el) => {
          return {
            ...el,
            key: el.soPhieu,
          };
        });
      setState({
        totalElements: s.totalElements,
        listData: newData,
      });
    });
  };
  const handleSizeChange = (size) => {
    setState({
      size: size,
    });
    onSearch({ size: size, page: state.page, dataSearch: state.dataSearch });
  };
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  useEffect(() => {
    getDsPhieuThu({
      ...state.dataSearch,
      page: state.page,
      size: state.size,
      nbDotDieuTriId: props.nbDotDieuTriId,
      soPhieu: soPhieu
    }).then((s) => {
      const newData = (s.data || [])
        .filter((item) => item.thanhTien)
        .map((el) => {
          return {
            ...el,
            key: el.soPhieu,
          };
        });
      setState({
        totalElements: s.totalElements,
        listData: newData,
      });
    });
  }, []);
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      dataSearch: {
        ...state.dataSearch,
        [key]: value,
      },
    });
    const dataSearch = {
      ...state.dataSearch,
      [key]: value,
    };
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch({
        page: state.page,
        size: state.size,
        dataSearch,
      });
    }, 500);
  };
  const confirm = () => {
    if (refCallBack.current) {
      refCallBack.current({
        listPhieuThuId: state.listPhieuThuId,
        nbDotDieuTriId: thongTinBenhNhan.id,
      });
      setState({
        show: false,
      });
    }
  };
  const columnsGroup = [
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soPhieuThu")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maHoSo || 0}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("soPhieu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soTien")}
          sort_key="tongTien"
          onClickSort={onClickSort}
        />
      ),
      width: 150,
      dataIndex: "tongTien",
      key: "tongTien",
      align: "right",
      render: (text) => text?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tenThuNgan")}
          sort_key="tenThuNgan"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tenThuNgan || 0}
          search={
            <Input
              placeholder={t("thuNgan.nhapMaHoTenNb")}
              onChange={onSearchInput("tenThuNgan")}
            />
          }
        />
      ),
      width: 300,
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.thoiGianThanhToan")}
          sort_key="thoiGianThanhToan"
        />
      ),
      width: 200,
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      align: "left",
      render: (text) => moment(text).format("YYYY/MM/DD hh:mm:ss"),
    },
  ];

  return (
    <ModalStyled
      title={
        <>
          <div>{t("thuNgan.timKiemPhieuThuTìm")}</div>
          <div>
            <span>{thongTinBenhNhan?.tenNb}</span>
          </div>
        </>
      }
      centered
      visible={state.show}
      footer={null}
      onCancel={() => {
        setState({
          show: false,
        });
      }}
      closable={false}
      width={1000}
    >
      <TableWrapper
        columns={columnsGroup}
        rowSelection={rowSelection}
        dataSource={state.listData || []}
        onRow={onRow}
        scroll={{ x: 200 }}
        rowClassName={setRowClassName}
      ></TableWrapper>
      <Pagination
        onChange={onChangePage}
        current={state?.page + 1}
        pageSize={state?.size || 10}
        listData={state.listData}
        total={state?.totalElements || 10}
        onShowSizeChange={handleSizeChange}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
      <div className="footer">
        <p className="button-cancel" onClick={handleCancel}>
          <ArrowLeftOutlined /> {t("common.quayLai")}
        </p>
        <Button className="button-ok" onClick={confirm}>
          {t("common.xacNhan")}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </ModalStyled>
  );
};

export default forwardRef(ModalAddDichVu);
