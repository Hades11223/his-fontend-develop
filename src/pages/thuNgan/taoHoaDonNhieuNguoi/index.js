import React, { useState, useEffect, useRef } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { Col, Row, Form } from "antd";
import Button from "pages/kho/components/Button";
import Icon from "@ant-design/icons";
import IconList from "assets/svg/iconList.svg";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import HeaderSearchHoaDon from "./component/headerSearch/HeaderSearch";
import ThongTinHoaDon from "../component/thongTinHoaDon/ThongTinHoaDon";
import { HeaderSearch, TableWrapper } from "components";
import Pagination from "components/Pagination";
import moment from "moment";
import { data } from "./data";
import { combineSort } from "utils";
import ModalDsDichVu from "./component/modalDsDichVu";
import IconXuatHd from "assets/svg/thuNgan/iconXuatHd.svg";
import { useTranslation } from "react-i18next";

const TaoHoaDonNhieuNguoi = (props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    dsDichVu: [],
    rowkeys: {},
    thongTinHoaDon: {},
    dataSortColumn: {},
    dataSearch: {
      thoiGianThanhToanTu: moment(new Date()).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      thoiGianThanhToanDen: moment(new Date()).set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 0,
      }),
    },
    listData: data,
    page: 0,
    size: 10,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalDsDichVu = useRef(null);
  const { getDsPhieuThu, xuatHoaDon, luuNhapHoaDon, getFileHoaDon } =
    dispatch.dsHoaDonDienTu;
  const handleRedirect = () => {
    history.push("/thu-ngan/ds-hoa-don-dien-tu");
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value };
    setState({
      dataSortColumn: sort,
    });
    onSearch({ page: state.page, size: state.size });
  };
  const handleChangePage = (page) => {
    setState({
      page: page - 1,
    });
    onSearch({
      page: page - 1,
      size: state.size,
      dataSearch: state.dataSearch,
    });
    if (state?.rowkeys[page - 1]) {
      setState({
        selectedRowKeys: state?.rowkeys[page - 1],
      });
    } else {
      setState({
        selectedRowKeys: [],
      });
    }
  };
  const handleSizeChange = (size) => {
    setState({
      size: size,
      page: 0,
    });
    onSearch({ size: size, page: 0, dataSearch: state.dataSearch });
  };
  const onRow = (record) => {
    return {
      onDoubleClick: () => {
        if (refModalDsDichVu.current) {
          refModalDsDichVu.current.show(record);
        }
      },
    };
  };
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    const key = {
      ...state.rowkeys,
      [state.page]: selectedRowKeys,
    };
    const newSelectedRows = {
      ...state.selectedRows,
      [state.page]: selectedRows,
    };
    setState({
      selectedRowKeys: selectedRowKeys,
      rowkeys: {
        ...state.page,
        ...key,
      },
      selectedRows: {
        ...state.selectedRows,
        ...newSelectedRows,
      },
    });
  };
  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSearch = ({
    page = state.page,
    size = state.size,
    dataSearch = state.dataSearch,
  }) => {
    const sort = combineSort(state.dataSortColumn);
    const newDataSearch = {
      ...dataSearch,
      thoiGianThanhToanTu: moment(dataSearch?.thoiGianThanhToanTu).format(
        "YYYY-MM-DD HH:mm"
      ),
      thoiGianThanhToanDen: moment(dataSearch?.thoiGianThanhToanDen).format(
        "YYYY-MM-DD HH:mm"
      ),
    };
    getDsPhieuThu({
      ...newDataSearch,
      sort,
      page: page,
      size: size,
      phatHanhHoaDon: true,
    }).then((s) => {
      const newData = s.data.map((item, index) => {
        return {
          ...item,
          key: page * size + index + 1,
          tongTien: item?.thanhTien - item?.tienHoanTra,
        };
      });

      setState({
        totalElements: s.totalElements,
        listData: newData,
      });
    });
  };
  useEffect(() => {
    const dataSearch = {
      ...state.dataSearch,
      thoiGianThanhToanTu: moment(state.dataSearch?.thoiGianThanhToanTu).format(
        "YYYY-MM-DD HH:mm"
      ),
      thoiGianThanhToanDen: moment(
        state.dataSearch?.thoiGianThanhToanDen
      ).format("YYYY-MM-DD HH:mm"),
    };
    getDsPhieuThu({
      ...dataSearch,
      page: state.page,
      size: state.size,
      phatHanhHoaDon: true,
    }).then((s) => {
      const newData = s.data.map((item, index) => {
        return {
          ...item,
          key: state.page * state.size + index + 1,
          tongTien: item?.thanhTien - item?.tienHoanTra,
        };
      });
      setState({
        totalElements: s.totalElements,
        listData: newData,
      });
    });
  }, []);
  useEffect(() => {
    if (state.selectedRows) {
      let arr = [];
      Object.values(state.selectedRows).forEach((item) => {
        arr.push(...item);
      });
      const tongTien = arr.reduce((a, b) => {
        return (a += b.tongTien);
      }, 0);
      setState({
        tongTien,
      });
    }
  }, [state.selectedRows]);
  const handleSubmit = (value) => () => {
    form.validateFields().then((values) => {
      if (value) {
        setState({
          isLoadingXuatHDDT: true,
        });
      } else {
        setState({
          isLoadingLuuNhap: true,
        });
      }
      let arr = [];
      Object.values(state.selectedRows).forEach((item) => {
        arr.push(...item);
      });
      const dsPhieuThuId = arr.map((item) => +item.id);
      if (value) {
        xuatHoaDon({ ...values, dsPhieuThuId })
          .then((s) => {
            getFileHoaDon({ id: s.data?.id }).then((s) => {
              var w = window.open(
                "",
                "",
                "_blank visible=none width=1000, height=600,left=300,top=100 menubar=no, status=no, location=no, resizable=yes, scrollbars=yes"
              );
              w.document.write(s);
              setTimeout(() => {
                w.print();
              }, 1000);
            });
            // history.push(
            //   `/thu-ngan/chi-tiet-hoa-don/${thongTinBenhNhan?.maHoSo}/${s.data.id}/${nbDotDieuTriId}`
            // );
            setState({
              isLoadingXuatHDDT: false,
            });
          })
          .catch(() => {
            setState({
              isLoadingXuatHDDT: false,
            });
          });
      } else {
        luuNhapHoaDon({
          ...values,
          dsPhieuThuId,
        })
          .then((s) => {
            setState({
              isLoadingLuuNhap: false,
            });
            console.log(s);
            // history.push(
            //   `/thu-ngan/chi-tiet-hoa-don/${thongTinBenhNhan?.maHoSo}/${s.data.id}/${nbDotDieuTriId}`
            // );
          })
          .catch(() => {
            setState({
              isLoadingLuuNhap: false,
            });
          });
      }
    });
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 80,
      dataIndex: "key",
      key: "key",
      align: "center",
      // render: (text, item, index) => state.page * state.size + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soPhieuThu")}
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.soPhieu || 0}
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
          title={t("common.tongTien")}
          sort_key="tongTien"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tongTien || 0}
        />
      ),
      width: 150,
      dataIndex: "tongTien",
      key: "tongTien",
      align: "right",
      render: (text) => text.formatPrice() || "",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.thoiGianThanhToan")}
          sort_key="thoiGianThanhToan"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.thoiGianThanhToan || 0}
        />
      ),
      width: 200,
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      align: "right",
      render: (item) => {
        if (item) {
          return moment(item).format("DD/MM/YYYY hh:mm:ss");
        } else {
          return "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maHoSo || 0}
        />
      ),
      width: 200,
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maNb || 0}
        />
      ),
      width: 200,
      dataIndex: "maNb",
      key: "maNb",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenNguoiBenh")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tenNb || 0}
        />
      ),
      width: 300,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
    },
  ];
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
          {
            title: t("thuNgan.hoaDonDienTu"),
            link: "/thu-ngan/ds-hoa-don-dien-tu",
          },
        ]}
      >
        <Col span={24} className="header-title">
          <div className="title">
            <span>{t("thuNgan.themMoiHoaDonChoNhieuNguoiNhan")}</span>
            <Icon component={IconList} onClick={handleRedirect}></Icon>
          </div>
        </Col>
        <HeaderSearchHoaDon
          onSearch={onSearch}
          setStateParent={setState}
          stateParent={state}
        ></HeaderSearchHoaDon>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={18} className="ds-dich-vu">
              <TableWrapper
                rowSelection={rowSelection}
                columns={columnsGroup}
                dataSource={state?.listData || []}
                onRow={onRow}
                scroll={{ x: 200 }}
                // rowClassName={setRowClassName}
              />
              {state?.totalElements ? (
                <Pagination
                  listData={state?.listData}
                  onChange={handleChangePage}
                  current={state?.page + 1 || 1}
                  pageSize={state?.size || 10}
                  total={state.totalElements || 15}
                  onShowSizeChange={handleSizeChange}
                  style={{ flex: 1, justifyContent: "flex-end" }}
                />
              ) : null}
            </Col>
            <Col span={6} className="info">
              <ThongTinHoaDon
                form={form}
                thongTinHoaDon={state.thongTinHoaDon}
                isChiTiet={false}
                typeHoaDon={3}
                setStateParent={setState}
                tongTien={state.tongTien}
              ></ThongTinHoaDon>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="footer-button">
            <Button
              loading={state?.isLoadingLuuNhap}
              onClick={handleSubmit(false)}
              type="default"
            >
              {t("thuNgan.luuNhap")}
            </Button>
            <Button
              loading={state?.isLoadingXuatHDDT}
              onClick={handleSubmit(true)}
              type="primary"
              rightIcon={<Icon component={IconXuatHd}></Icon>}
            >
              {t("thuNgan.xuatHoaDon")}
            </Button>
          </div>
        </Col>
      </Breadcrumb>
      <ModalDsDichVu ref={refModalDsDichVu}></ModalDsDichVu>
    </Main>
  );
};

export default TaoHoaDonNhieuNguoi;
