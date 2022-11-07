import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import { Main } from "./styled";
import { HeaderSearch, Pagination, Select,TableWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Checkbox, Tooltip, Col, Row, Form, InputNumber, Input } from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcDelete from "assets/svg/ic-delete.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import ChiDinhDichVuNgoaiDieuTri from "pages/chiDinhDichVu/DichVuNgoaiDieuTri";
import useThongTinNb from "../hook/useThongTinNb";
import { refConfirm } from "app";
import CustomPopover from "pages/khamBenh/components/CustomPopover";
import { useStore } from "hook";
import { DOI_TUONG_KCB } from "constants/index";
import Icon from "@ant-design/icons";
import printProvider from "data-access/print-provider";
import IcPrint from "assets/svg/ic-print.svg";
import { useLoading } from "hook";

const ChiDinhNgoaiDieuTri = () => {
  const {
    listDvNgoaiDieuTri,
    dataSortColumn,
    totalElements,
    page,
    size,
    dsPhongThucHien,
  } = useSelector((state) => state.dvNgoaiDieuTri);
  const { dataDetail } = useSelector((state) => state.pttt);
  const {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    deleteDvNgoaiDieuTri,
    updateNgoaiDieuTri,

    getDsPhongTheoDv,
    getPhieuChiDinhTheoDv,
  } = useDispatch().dvNgoaiDieuTri;
  const {
    loaiHinhThanhToan: { getListAllLoaiHinhThanhToan },
  } = useDispatch();
  const listAllLoaiHinhThanhToan = useStore(
    "loaiHinhThanhToan.listAllLoaiHinhThanhToan",
    []
  );
  const { t } = useTranslation();
  const [thongTinNb] = useThongTinNb();
  const [form] = Form.useForm();
  const { showLoading, hideLoading } = useLoading();

  const refModalChiDinhDichVuNgoaiDieuTri = useRef(null);
  const refSettings = useRef(null);

  const [state, _setState] = useState({
    visibleEdit: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const disabledAll = useMemo(
    () =>
      [25, 43, 155].some((i) => i === dataDetail.trangThai) ||
      dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );

  useEffect(() => {
    getListAllLoaiHinhThanhToan({ page: "", size: "", active: true });
  }, []);

  useEffect(() => {
    if (dataDetail?.nbDotDieuTriId)
      onChangeInputSearch({
        nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
        dsChiDinhTuLoaiDichVu: 40,
        chiDinhTuDichVuId: dataDetail.id,
      });
  }, [dataDetail?.nbDotDieuTriId]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  function onDeleteDv(item) {
    return () => {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.thongBao"),
            content: `Bạn có chắc chắn muốn xóa dịch vụ ${item.tenDichVu}`,
            cancelText: t("common.huy"),
            okText: t("common.dongY"),
            classNameOkText: "button-warning",
            showImg: true,
            showBtnOk: true,
            typeModal: "warning",
          },
          () => {
            deleteDvNgoaiDieuTri(item.id).then(() => {
              onSearch({ page: 0 });
            });
          }
        );
    };
  }

  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      updateNgoaiDieuTri([
        {
          id: record?.id,
          nbDichVu: { ...values },
          phongThucHienId: values?.phongThucHienId,
        },
      ]).then(() => {
        refreshList();
        onClose();
      });
    });
  };

  const renderContentEdit = useCallback(
    (record) => {
      return (
        <Form form={form} layout="vertical">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={t("common.soLuong")}
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: t("common.vuiLongNhapSoLuong"),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  placeholder={t("common.vuiLongNhapSoLuong")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("common.luuY")} name="ghiChu">
                <Input
                  className="input-option"
                  placeholder={t("khamBenh.chiDinh.vuiLongNhapLuuY")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("khamBenh.chiDinh.phongThucHien")}
                name="phongThucHienId"
                rules={[
                  {
                    required: true,
                    message: t("khamBenh.chiDinh.vuiLongNhapTenPhongThucHien"),
                  },
                ]}
              >
                <Select
                  allowClear
                  data={dsPhongThucHien || []}
                  placeholder={t("khamBenh.chiDinh.chonTenPhongThucHien")}
                />
              </Form.Item>
            </Col>

            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label=" " name="tuTra" valuePropName="checked">
                <Checkbox>{t("khamBenh.chiDinh.tuTra")}</Checkbox>
              </Form.Item>
              <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
                <Checkbox>{t("common.khongTinhTien")}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                name="loaiHinhThanhToanId"
              >
                <Select
                  data={listAllLoaiHinhThanhToan}
                  placeholder={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      );
    },
    [state.visibleEdit, dsPhongThucHien]
  );

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onClose = () => {
    setState({
      visibleEdit: false,
    });
  };

  const handleVisible = (type, idx, record) => () => {
    form.setFieldsValue({
      ghiChu: record.ghiChuNbDv,
      tuTra: record.tuTra,
      soLuong: record.soLuong,
      khongTinhTien: record?.khongTinhTien,
      loaiHinhThanhToanId: record?.loaiHinhThanhToanId,
      phongThucHienId: record?.phongThucHienId,
    });
    setState({
      visibleEdit: idx,
    });

    getDsPhongTheoDv({
      dsDichVuId: [record.dichVuId],
      khoaChiDinhId: dataDetail?.khoaNbId,
    });
  };

  const onInPhieu = (item) => () => {
    showLoading();

    getPhieuChiDinhTheoDv({
      nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: 40,
      dsNbDichVuId: item?.id,
    })
      .then((res) => {
        const dsFilesIn = (res || []).map((x) => x?.file?.pdf);
        if (dsFilesIn) {
          printProvider.printMergePdf(dsFilesIn);
        }

        hideLoading();
      })
      .catch(() => {
        hideLoading();
      });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.maDV")}
          sort_key="maDichVu"
          dataSort={dataSortColumn["maDichVu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      show: true,
      i18Name: "tiepDon.maDV",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          dataSort={dataSortColumn["tenDichVu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      show: true,
      i18Name: "common.tenDichVu",
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} />,
      width: "50px",
      dataIndex: "soLuong",
      key: "soLuong",
      show: true,
      i18Name: "common.soLuong",
    },
    {
      title: (
        <HeaderSearch title={t("common.thanhTien")} sort_key="thanhTien" />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: 80,
      align: "right",
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.thanhTien",
      render: (item) => item?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.tuTra")}
          sort_key="tuTra"
        />
      ),
      dataIndex: "tuTra",
      key: "tuTra",
      width: 50,
      align: "center",
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.tuTra",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.khongTinhTien")}
          sort_key="khongTinhTien"
        />
      ),
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      width: 80,
      align: "center",
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.khongTinhTien",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.daThanhToan")}
          sort_key="thanhToan"
        />
      ),
      dataIndex: "thanhToan",
      key: "thanhToan",
      width: 80,
      align: "center",
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.daThanhToan",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.phongThucHien")}
          sort_key="tenPhongThucHien"
        />
      ),
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      width: 120,
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.phongThucHien",
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.luuY")}
          sort_key="ghiChu"
        />
      ),
      dataIndex: "ghiChu",
      key: "ghiChu",
      width: 120,
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.luuY",
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.tenBacSiChiDinh")}
          sort_key="tenBacSiChiDinh"
        />
      ),
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      width: 120,
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.tenBacSiChiDinh",
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.thoiGianChiDinh")}
          sort_key="thoiGianChiDinh"
        />
      ),
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      width: 120,
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.thoiGianChiDinh",
      render: (item) =>
        item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("pttt.dsDvNgoaiDieuTri.khoaChiDinh")}
          sort_key="tenKhoaChiDinh"
        />
      ),
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      width: 120,
      show: true,
      i18Name: "pttt.dsDvNgoaiDieuTri.khoaChiDinh",
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {"Khác"}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "80px",
      align: "right",
      fixed: "right",
      render: (item, data, index) => {
        return (
          <div className="btn-tool">
            {!disabledAll && (
              <>
                <Tooltip title={"Chỉnh sửa dịch vụ"} placement="bottom">
                  <CustomPopover
                    overlayInnerStyle={{
                      height: "fit-content",
                      padding: "0px !important",
                    }}
                    overlayClassName="popover-custom-all popover-custom-all_res"
                    iconSvg={<IcEdit className="ic-action"/>}
                    onSubmit={handleEdit(data)}
                    onCancel={onClose}
                    contentPopover={renderContentEdit(data)}
                    visible={state.visibleEdit === index}
                    handleVisible={handleVisible("edit", index, data)}
                    mask={true}
                  />
                </Tooltip>
                <Tooltip title={"Xóa dịch vụ"} placement="bottom">
                  <IcDelete className="ic-action" onClick={onDeleteDv(item)} />
                </Tooltip>

                <Tooltip title={"In phiếu chỉ định"} placement="bottom">
                  <Icon
                    className="ic-action"
                    component={IcPrint}
                    onClick={onInPhieu(item)}
                  ></Icon>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];

  function onAddDv() {
    refModalChiDinhDichVuNgoaiDieuTri.current &&
      refModalChiDinhDichVuNgoaiDieuTri.current.show({
        nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
        khoaChiDinhId: dataDetail?.khoaThucHienId,
        chiDinhTuLoaiDichVu: 40,
        dsDoiTuongSuDung:
          thongTinNb?.doiTuongKcb === DOI_TUONG_KCB.NGOAI_TRU ? 20 : 30,
        chiDinhTuDichVuId: dataDetail.id,
        gioiTinh: thongTinNb?.gioiTinh,
      });
  }

  function refreshList() {
    onSearch({ page: 0 });
  }

  return (
    <Main>
      <div className="table-content">
        <TableWrapper
          columns={columns}
          dataSource={listDvNgoaiDieuTri}
          rowKey={(record) => record?.id}
          scroll={{ x: 1500 }}
          title={t("quanLyNoiTru.dichVuNgoaiDieuTri")}
          classNameRow={"custom-header btn-custom"}
          tableName="table_PTTT_DichVuNgoaiDieuTri"
          buttonHeader={
            !disabledAll && [
              {
                title: t("common.themMoi"),
                onClick: onAddDv,
                buttonHeaderIcon: (
                  <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                ),
              },
            ]
          }
          styleWrap={{ height: 500 }}
          ref={refSettings}
        />

        {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listDvNgoaiDieuTri}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        )}
      </div>
      <ChiDinhDichVuNgoaiDieuTri
        ref={refModalChiDinhDichVuNgoaiDieuTri}
        refreshList={refreshList}
      />
    </Main>
  );
};

export default ChiDinhNgoaiDieuTri;
