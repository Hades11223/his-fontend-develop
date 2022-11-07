import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { Col, Row, Select, DatePicker, Checkbox, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DANH_SACH_LOAI_NHAP_XUAT } from "constants/index";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ModalTemplate, TableWrapper } from "components";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const initDataSearch = {
  page: 0,
  tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
  denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
  dsKhoId: 1,
  dsTrangThaiGpp: [10, 30],
  dsLoaiNhapXuat: "120",
};

const ModalDayLienThongGPP = (props, ref) => {
  const refFuncSubmit = useRef(null);
  const refModal = useRef(null);
  const { t } = useTranslation();
  const {
    kho: { listKhoUser },
    lienThongGpp: { dsDayLienThongHangLoat },
    utils: { listLoaiNhapXuat = [] },
  } = useSelector((state) => state);

  const {
    lienThongGpp: { dayLienThong, getDsLienThongHangLoat },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        dataSearch: initDataSearch,
        dsId: [],
        isCheckedAll: false,
      });
    },
  }));

  const [state, _setState] = useState({
    show: false,
    dataSearch: initDataSearch,
    dsId: [],
    isCheckedAll: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    if (state.show)
      getDsLienThongHangLoat({
        ...state.dataSearch,
        tuThoiGian: state.dataSearch.tuThoiGian.format("DD-MM-YYYY HH:mm:ss"),
        denThoiGian: state.dataSearch.denThoiGian.format("DD-MM-YYYY HH:mm:ss"),
        page: "",
        size: "",
      });
  }, [state.dataSearch, state.show]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.dsId.length === 0) {
      message.error("Vui lòng chọn phiếu đẩy liên thông!");
      return;
    }

    dayLienThong({
      dsId: state.dsId,
      dsLoaiNhapXuat: DANH_SACH_LOAI_NHAP_XUAT.find(
        (x) => x.value == state.dataSearch.dsLoaiNhapXuat
      )._value,
    }).then(() => {
      onClose();
    });
  };

  refFuncSubmit.current = onSubmit;

  const onClose = () => {
    setState({ show: false });
  };

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  const hoaDonColumns = [
    {
      title: <HeaderSearch title={t("common.maHoSo")} />,
      width: "150px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.hoTenNguoiBenh")} />,
      width: "200px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: <HeaderSearch title={t("common.soPhieu")} />,
      width: "150px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.ngayPhat")} />,
      width: "200px",
      dataIndex: "ngayPhat",
      key: "ngayPhat",
      render: (item) => (item ? moment(item).format("DD-MM-YYYY HH:mm") : ""),
    },
  ];

  const phieuNhapColumns = [
    {
      title: <HeaderSearch title={t("baoCao.soPhieuNhap")} />,
      width: "200px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.ngayNhap")} />,
      width: "150px",
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      render: (item) => (item ? moment(item).format("DD-MM-YYYY HH:mm") : ""),
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.loaiPhieuNhap")} />,
      width: "200px",
      dataIndex: "loaiNhapXuat",
      key: "loaiNhapXuat",
      render: (item) => {
        return listLoaiNhapXuat.find((x) => x.id === item)?.ten || "";
      },
    },
  ];

  const phieuXuatColumns = [
    {
      title: <HeaderSearch title={t("baoCao.soPhieuXuat")} />,
      width: "200px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.ngayXuat")} />,
      width: "150px",
      dataIndex: "ngayPhat",
      key: "ngayPhat",
      render: (item) => (item ? moment(item).format("DD-MM-YYYY HH:mm") : ""),
    },
    {
      title: <HeaderSearch title={t("nhaThuoc.loaiPhieuNhap")} />,
      width: "200px",
      dataIndex: "loaiNhapXuat",
      key: "loaiNhapXuat",
      render: (item) => {
        return listLoaiNhapXuat.find((x) => x.id === item)?.ten || "";
      },
    },
  ];

  const onSelectChange = (selectedRowKeys, data) => {
    setState({
      isCheckedAll: dsDayLienThongHangLoat.length === selectedRowKeys.length,
      dsId: selectedRowKeys,
      selectedRowKeys,
    });
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked
        ? dsDayLienThongHangLoat.map((x) => x.id)
        : [],
      isCheckedAll: e.target?.checked,
      dsId: e.target?.checked ? dsDayLienThongHangLoat.map((x) => x.id) : [],
    });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          />
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onChangeInputSearch = (key) => (e) => {
    setState({
      dataSearch: { ...state.dataSearch, [key]: e },
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={"85%"}
      onCancel={onClose}
      title={t("nhaThuoc.dayLienThongHangLoatGPP")}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onClose}
          leftIcon={<ArrowLeftOutlined />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          rightIcon={<CheckCircleOutlined />}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <Main>
        <div className="info-content">
          <div className="success-content">
            <Row>
              <Col span={12}>
                <div className="filter-field">
                  <label>{t("nhaThuoc.loaiDay")}:</label>

                  <Select
                    placeholder={t("nhaThuoc.vuiLongChonLoaiDay")}
                    value={state.dataSearch.dsLoaiNhapXuat}
                    onChange={onChangeInputSearch("dsLoaiNhapXuat")}
                  >
                    {DANH_SACH_LOAI_NHAP_XUAT.map((x) => (
                      <Option value={x.value}>{x.ten}</Option>
                    ))}
                  </Select>
                </div>
              </Col>

              <Col span={2}></Col>

              <Col span={10}>
                <div className="filter-field">
                  <label>{t("nhaThuoc.kho")}:</label>

                  <Select
                    mode="tags"
                    placeholder={t("nhaThuoc.vuiLongChonDanhSachKho")}
                    onChange={onChangeInputSearch("dsKhoId")}
                    value={state.dataSearch.dsKhoId}
                  >
                    {listKhoUser.map((x) => (
                      <Option value={x.value}>{x.ten}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={2}>
                <div style={{ marginLeft: 20, fontWeight: "bold" }}>
                  {t("nhaThuoc.thoiGianDay")}:
                </div>
              </Col>

              <Col span={10}>
                <div className="filter-field">
                  <label>{t("nhaThuoc.tuNgay")}:</label>

                  <DatePicker
                    showTime
                    placeholder={t("nhaThuoc.chonNgay")}
                    format="DD/MM/YYYY HH:mm:ss"
                    onChange={onChangeInputSearch("tuThoiGian")}
                    value={state.dataSearch.tuThoiGian}
                  />
                </div>
              </Col>

              <Col span={2}></Col>

              <Col span={10}>
                <div className="filter-field">
                  <label>{t("nhaThuoc.denNgay")}:</label>

                  <DatePicker
                    showTime
                    placeholder={t("nhaThuoc.chonNgay")}
                    format="DD/MM/YYYY HH:mm:ss"
                    onChange={onChangeInputSearch("denThoiGian")}
                    value={state.dataSearch.denThoiGian}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginLeft: 30, fontWeight: "bold" }}>
            {t("nhaThuoc.chonPhieuDay")}:
          </div>
          <div className="table-content">
            <TableWrapper
              columns={
                state.dataSearch.dsLoaiNhapXuat == "120"
                  ? hoaDonColumns
                  : state.dataSearch.dsLoaiNhapXuat == "10"
                  ? phieuNhapColumns
                  : phieuXuatColumns
              }
              rowSelection={rowSelection}
              dataSource={dsDayLienThongHangLoat || []}
              onRow={onRow}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDayLienThongGPP);
