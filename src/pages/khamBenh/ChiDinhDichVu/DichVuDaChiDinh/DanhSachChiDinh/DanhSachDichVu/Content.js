import React, { useCallback, useState, useMemo, useRef } from "react";
import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Select as SelectAntd,
  message,
  Tooltip,
  InputNumber,
  Popover,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { refConfirm } from "app";
import groupBy from "lodash/groupBy";
import { TableWrapper, Select, DateTimePicker } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import CustomPopover from "../../../../components/CustomPopover";
import { PhieuChiDinhWrapper } from "./styled";
import { getColorByTrangThai, canEditOrUpdate } from "../../../utils";
import { formatDecimal } from "utils/index";
import IconHoanDv from "assets/images/khamBenh/icHoanDv.png";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import IcExpandDown from "assets/images/noiTru/icExpandDown.png";
import IcExpandRight from "assets/images/noiTru/icExpandRight.png";
import IcGroup from "assets/images/template/icGroup.png";

import {
  TRANG_THAI_DICH_VU,
  LOAI_DICH_VU,
  GIOI_TINH_BY_VALUE,
  TY_LE_THANH_TOAN,
  ENUM,
  DOI_TUONG,
} from "constants/index";
import { TRANG_THAI } from "pages/xetNghiem/configs";
import ModalHuyHoanDichVu from "components/ModalHuyHoanDichVu";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import moment from "moment";

const DanhSachDichVu = ({
  dataSortColumn = {},
  onDeleteDichVu,
  dataSource,
  getNBSoPhieuCLS,
  soPhieuCls,
  getDsDichVu,
  themThongTinDV,
  dataPhongThucHien,
  loaiDichVu,
  onChangePhieu,
  isHiddenTyLett,
  isPhauThuat,
  tableName,
  isDisplayLoaiPttt,
  disabledAll,
  isReadonly,
}) => {
  const { t } = useTranslation();
  const thongTinNguoiBenh = useStore(
    "chiDinhKhamBenh.configData.thongTinNguoiBenh"
  );
  const { listAllBenhPham } = useSelector((state) => state.benhPham);
  const {
    phongThucHien: { onSearchParams },
    chiDinhKhamBenh: { themThongTinPhieu },
    mucDichSuDung: { onSearch },
  } = useDispatch();
  const refModalHoanDichVu = useRef(null);
  const refModalHuyHoanDichVu = useRef(null);
  const refSettings = useRef(null);
  const [lisTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const listPhanLoaiKetQuaXetNghiem = useEnum(
    ENUM.PHAN_LOAI_KET_QUA_XET_NGHIEM
  );

  const listLoaiHinhThanhToanCuaDoiTuong = useStore(
    "loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong",
    []
  );
  const listMucDichSuDung = useStore("mucDichSuDung.listMucDichSuDung", []);
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const [listLoaiPtTt] = useEnum(ENUM.LOAI_PTTT);
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    visibleEdit: null,
    dataPhongThucHien: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const listAllLoaiHinhThanhToan = useMemo(() => {
    return listLoaiHinhThanhToanCuaDoiTuong.map((item) => ({
      ...item.loaiHinhThanhToan,
    }));
  }, [listLoaiHinhThanhToanCuaDoiTuong]);

  const isXetNghiem = loaiDichVu === LOAI_DICH_VU.XET_NGHIEM;
  const isChanDoanHinhAnh = loaiDichVu === LOAI_DICH_VU.CDHA;

  const dataTable = useMemo(() => {
    const groupData = groupBy(dataSource, "tenNhomDichVuCap2");
    let formattedData = [];
    Object.keys(groupData).forEach((key, idx) => {
      formattedData.push({
        id: key,
        nameDichVu: key,
        type: "group",
        key,
      });
      let listChild = [];
      if (isXetNghiem && state?.expanDown) {
        let data = [];
        groupData[key].map((item, index) => {
          data.push({
            ...item,
            nameDichVu: item?.tenDichVu,
            index: index + 1,
            key: `${key}-${item?.tenDichVu}-${index}`,
            rowSpan: item.dsChiSoCon.length + 1,
            isParent: true,
          });
          data.push(...item.dsChiSoCon);
        });
        listChild = data.map((item, index) => ({
          ...item,
        }));
      } else {
        listChild = groupData[key].map((item, index) => ({
          ...item,
          nameDichVu: item?.tenDichVu,
          index: index + 1,
          key: `${key}-${item?.tenDichVu}-${index}`,
          isParent: true,
        }));
      }
      formattedData = [...formattedData, ...listChild];
    });
    return formattedData;
  }, [JSON.stringify(dataSource)]); // https://github.com/facebook/react/issues/14476#issuecomment-471199055

  const onClickSort = () => {};
  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      let {
        ghiChu,
        tuTra,
        benhPhamId,
        soLuong,
        thoiGianThucHien,
        khongTinhTien,
        loaiPtTt,
        tyLeTtDv,
        loaiHinhThanhToanId,
        phongThucHienId,
        mucDichId,
        tuVanVienId,
        ...rest
      } = values;
      let obj = {
        body:
          record.loaiDichVu === 60
            ? [
                {
                  id: record.id,
                  nbDichVu: {
                    ghiChu,
                    tuTra,
                    soLuong,
                    khongTinhTien,
                    dichVuId: record.dichVuId,
                    phongThucHienId,
                  },
                  nbDvKyThuat: {
                    phongThucHienId,
                    tuVanVienId,
                  },
                },
              ]
            : {
                benhPhamId,
                nbDvKyThuat: {
                  phongThucHienId,
                  tuVanVienId,
                  ...rest,
                },
                nbDichVu: {
                  ghiChu,
                  tuTra,
                  soLuong,
                  tyLeTtDv,
                  thoiGianThucHien,
                  khongTinhTien,
                  loaiHinhThanhToanId : loaiHinhThanhToanId || null,
                  mucDichId,
                },
                loaiPtTt: loaiPtTt,
              },
        id: record.id,
        loaiDichVu: record.loaiDichVu,
      };
      if (values?.benhPhamId) {
        (async () => {
          try {
            await themThongTinPhieu({
              body: {
                benhPhamId: values?.benhPhamId,
              },
              id: record?.soPhieuId,
              loaiDichVu: record?.loaiDichVu,
            });
          } catch (err) {
            message.error(err.message);
          }
        })();
      }

      themThongTinDV(obj).then((s) => {
        if (s.code === 0) {
          getDsDichVu(record.loaiDichVu);
          onClose();
        }
      });
    });
  };

  const onDelete = (record) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("khamBenh.chiDinh.xacNhanXoaChiDinh")} ${
            record.nameDichVu
          }?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu({ id: record.id, loaiDichVu: record.loaiDichVu }).then(
            (s) => {
              if (s.code === 0) {
                getDsDichVu(record.loaiDichVu);
              }
            }
          );
        }
      );
  };

  const onHoanDv = (record) => {
    let gioiTinh = thongTinNguoiBenh.gioiTinh
      ? GIOI_TINH_BY_VALUE[thongTinNguoiBenh.gioiTinh]
      : "";

    let tuoi =
      thongTinNguoiBenh.thangTuoi > 36 || thongTinNguoiBenh.tuoi
        ? `${thongTinNguoiBenh.tuoi} ${t("common.tuoi")}`
        : `${thongTinNguoiBenh.thangTuoi} ${t("common.thang")}`;

    const data = Array(record);
    if (data?.length) {
      data.forEach((itemLoop) => {
        itemLoop.gioiTinh = gioiTinh;
        itemLoop.tuoi = tuoi;
      });

      refModalHoanDichVu.current &&
        refModalHoanDichVu.current.show(
          {
            data: data,
          },
          () => {
            getDsDichVu(data[0]?.loaiDichVu);
          }
        );
    } else {
      message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
    }
  };

  const onHuyHoan = (data) => {
    let gioiTinh = thongTinNguoiBenh.gioiTinh
      ? GIOI_TINH_BY_VALUE[thongTinNguoiBenh.gioiTinh]
      : "";

    let tuoi =
      thongTinNguoiBenh.thangTuoi > 36 || thongTinNguoiBenh.tuoi
        ? `${thongTinNguoiBenh.tuoi} ${t("common.tuoi")}`
        : `${thongTinNguoiBenh.thangTuoi} ${t("common.thang")}`;

    data.gioiTinh = gioiTinh;
    data.tuoi = tuoi;
    if (refModalHuyHoanDichVu.current)
      refModalHuyHoanDichVu.current.show(data, () => {
        getDsDichVu(data.loaiDichVu);
      });
  };

  const onHidden = (record, key) => {
    if (
      (record.thanhToan && record.trangThaiHoan === 0 && key === "return") ||
      (!record.thanhToan && key === "delete")
    ) {
      if (
        (record.loaiDichVu === LOAI_DICH_VU.KHAM &&
          TRANG_THAI_DICH_VU["YEU_CAU_HOAN"].includes(record.trangThai)) ||
        (record.loaiDichVu === LOAI_DICH_VU.CDHA &&
          TRANG_THAI_DICH_VU["YEU_CAU_HOAN"].includes(record.trangThai)) ||
        (record.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM &&
          TRANG_THAI["YEU_CAU_HOAN"].includes(record.trangThai)) ||
        record.loaiDichVu === LOAI_DICH_VU.NGOAI_DIEU_TRI
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  const onClose = () => {
    setState({
      visibleEdit: false,
      visibleDelete: false,
    });
  };

  const handleVisible = (type, idx, record) => () => {
    console.log("record", record);

    if (type === "edit") {
      if (record.loaiDichVu === 60) {
        form.setFieldsValue({
          ghiChu: record.ghiChu,
          khongTinhTien: record.khongTinhTien,
          tuTra: record.tuTra,
          soLuong: record.soLuong,
          phongThucHienId: record.phongThucHienId,
        });

        onSearchParams({
          dsDichVuId: [record.dichVuId],
          khoaChiDinhId: thongTinNguoiBenh?.khoaNbId,
        });
      } else {
        form.setFieldsValue({
          benhPhamId: record.benhPhamId ? record.benhPhamId : [],
          ghiChu: record.ghiChu,
          phongThucHienId: record.phongThucHienId,
          soPhieu: record.soPhieu,
          tuTra: record.tuTra,
          soLuong: record.soLuong,
          tyLeTtDv: record.tyLeTtDv,
          khongTinhTien: record?.khongTinhTien,
          loaiPtTt: record?.loaiPtTt || 10,
          thoiGianThucHien: moment(record?.thoiGianThucHien),
          loaiHinhThanhToanId: record?.loaiHinhThanhToanId,
          mucDichId: record?.mucDichId,
          tuVanVienId: record?.tuVanVienId,
        });
        onSearch({ dataSearch: { dichVuId: record.dichVuId } });
        onSearchParams({ dsDichVuId: [record.dichVuId] });
      }
      getNBSoPhieuCLS({ loaiDichVu: record.loaiDichVu });
    }
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };
  const renderContentEdit = useCallback(
    (record) => {
      const disabledField =
        !record.thanhToan && [155, 160].includes(record.trangThai);

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
                  disabled={disabledField}
                  placeholder={t("common.vuiLongNhapSoLuong")}
                />
              </Form.Item>
            </Col>

            {![
              LOAI_DICH_VU.CDHA,
              LOAI_DICH_VU.KHAM,
              LOAI_DICH_VU.NGOAI_DIEU_TRI,
            ].includes(record.loaiDichVu) && (
              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.chiDinh.benhPham")}
                  name="benhPhamId"
                >
                  <Select
                    allowClear
                    disabled={disabledField}
                    data={listAllBenhPham}
                    placeholder={t("khamBenh.chiDinh.chonTenBenhPham")}
                    mode="tags"
                    removeIcon={() => null}
                    onChange={onChangePhieu(record.soPhieuId, loaiDichVu, form)}
                  />
                </Form.Item>
              </Col>
            )}
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
                <SelectAntd
                  allowClear
                  disabled={disabledField}
                  placeholder={t("khamBenh.chiDinh.chonTenPhongThucHien")}
                >
                  {dataPhongThucHien.map((item, index) => {
                    return (
                      <SelectAntd.Option key={index} value={item?.id}>
                        {`${item?.ten}`}
                      </SelectAntd.Option>
                    );
                  })}
                </SelectAntd>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("common.luuY")} name="ghiChu">
                <Input
                  disabled={disabledField}
                  className="input-option"
                  placeholder={t("khamBenh.chiDinh.vuiLongNhapLuuY")}
                />
              </Form.Item>
            </Col>

            {![LOAI_DICH_VU.KHAM, LOAI_DICH_VU.NGOAI_DIEU_TRI].includes(
              record.loaiDichVu
            ) && (
              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.chiDinh.soPhieu")}
                  name="soPhieu"
                  rules={[
                    {
                      required: true,
                      message: t("khamBenh.chiDinh.vuiLongNhapSoPhieu"),
                    },
                  ]}
                >
                  <Select
                    disabled={disabledField}
                    data={soPhieuCls}
                    placeholder={t("khamBenh.chiDinh.chonSoPhieu")}
                  />
                </Form.Item>
              </Col>
            )}

            {!isHiddenTyLett && (
              <Col span={12}>
                <Form.Item label={t("common.tyLeTt")} name="tyLeTtDv">
                  <InputNumber
                    className="input-option"
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    min={0}
                    max={100}
                    disabled={
                      record.loaiDichVu !== LOAI_DICH_VU.PHAU_THUAT_THU_THUAT ||
                      !isPhauThuat ||
                      disabledField
                    }
                  />
                </Form.Item>
              </Col>
            )}
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label=" " name="tuTra" valuePropName="checked">
                <Checkbox disabled={listMucDichSuDung.length}>
                  {t("khamBenh.chiDinh.tuTra")}
                </Checkbox>
              </Form.Item>
              <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
                <Checkbox disabled={listMucDichSuDung.length}>
                  {t("common.khongTinhTien")}
                </Checkbox>
              </Form.Item>
            </Col>
            {![LOAI_DICH_VU.NGOAI_DIEU_TRI].includes(record.loaiDichVu) && (
              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Form.Item
                  label={t("quanLyNoiTru.ngayThucHien")}
                  name="thoiGianThucHien"
                  style={{ width: "100%" }}
                >
                  <DateTimePicker disabled={disabledField}></DateTimePicker>
                </Form.Item>
              </Col>
            )}
            {isDisplayLoaiPttt &&
              record?.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT && (
                <Col span={12}>
                  <Form.Item label={t("pttt.loaiPttt")} name="loaiPtTt">
                    <Select
                      disabled={disabledField}
                      placeholder={t("pttt.loaiPttt")}
                      data={listLoaiPtTt}
                    ></Select>
                  </Form.Item>
                </Col>
              )}
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                name="loaiHinhThanhToanId"
              >
                <Select
                  data={listAllLoaiHinhThanhToan}
                  placeholder={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                  disabled={listMucDichSuDung.length || disabledField}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="TT35" name="mucDichId">
                <Select
                  disabled={disabledField}
                  data={listMucDichSuDung}
                  placeholder="TT35"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tư vấn viên" name="tuVanVienId">
                <Select
                  disabled={disabledField}
                  data={listAllNhanVien}
                  valueNumber={true}
                  placeholder="Tư vấn viên"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      );
    },
    [state.visibleEdit, dataPhongThucHien, listMucDichSuDung]
  );
  const renderContent = (typeContent) => (value, row, index) => {
    const obj = {
      children: value && typeContent === "price" ? value.formatPrice() : value,
      props: {},
    };

    if (row.type === "group") {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const renderStt = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (row.isParent) {
      obj.props.rowSpan = row.rowSpan;
      obj.children = value;
    } else {
      obj.props.rowSpan = 0;
    }

    return obj;
  };

  const content = (info) => {
    const {
      tenBacSiChiDinh,
      tenBenhPham,
      tenPhongThucHien,
      tenKhoaChiDinh,
      tenNguoiThucHien,
      tenNguoiDuyetKetQua,
      thoiGianCoKetQua,
      trangThai,
      diaDiemPhongThucHien,
      tenKhoaThucHien,
    } = info || {};

    return (
      <div>
        <div>
          Bác sĩ chỉ định:{" "}
          <b>
            {tenBacSiChiDinh} - {tenKhoaChiDinh}
          </b>
        </div>
        <div>
          Bệnh phẩm: <b>{tenBenhPham}</b>
        </div>
        <div>
          Trạng thái:{" "}
          <b>{lisTrangThaiDichVu.find((x) => x.id === trangThai)?.ten}</b>
        </div>
        <div>
          Có kết quả vào:{" "}
          <b>
            {thoiGianCoKetQua &&
              moment(thoiGianCoKetQua).format("DD/MM/YYYY HH:mm:ss")}
          </b>
        </div>
        <div>
          {t("khamBenh.chiDinh.nguoiThucHien")}: <b>{tenNguoiThucHien}</b>
        </div>
        <div>
          {t("khamBenh.chiDinh.bacSiDocKetQua")}: <b>{tenNguoiDuyetKetQua}</b>
        </div>
        <div>
          {t("khamBenh.chiDinh.phongThucHien")}:{" "}
          <b>{`${tenPhongThucHien} ${
            diaDiemPhongThucHien ? ` - ${diaDiemPhongThucHien}` : ""
          } ${tenKhoaThucHien ? ` - ${tenKhoaThucHien}` : ""}`}</b>
        </div>
      </div>
    );
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 10,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: renderStt,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.dichVu")}
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "nameDichVu",
      key: "nameDichVu",
      align: "left",
      i18Name: t("common.dichVu"),
      show: true,
      render: (text, row, index) => {
        if (row.type !== "group") {
          const colorStatus = getColorByTrangThai(row.trangThai);

          const additionalInfo = `${row.tuTra ? t("common.tuTuc") : ""} ${
            row.tuTra && row.loaiDichVu === LOAI_DICH_VU.KHAM ? "|" : ""
          } ${row.loaiDichVu === LOAI_DICH_VU.KHAM ? row.tenBacSiChiDinh : ""}`;
          return (
            <div className="group-row-item">
              {!!row?.dsChiSoCon?.length && (
                <img
                  className="expand"
                  src={state?.expanDown ? IcExpandDown : IcExpandRight}
                  alt={state?.expanDown ? IcExpandDown : IcExpandRight}
                  onClick={() => setState({ expanDown: !state?.expanDown })}
                />
              )}
              {row?.isParent && (
                <div className="group-row-item__icon">
                  <Popover content={content(row)}>
                    <CheckCircleOutlined
                      style={{ fontSize: "25px", color: colorStatus }}
                    />
                  </Popover>
                </div>
              )}
              <div
                className={`group-row-item__text ${
                  row?.isParent ? "" : "children"
                }`}
              >
                <p>{row?.isParent ? text : row?.tenChiSoCon}</p>
                <p className="add-info">{additionalInfo}</p>
              </div>
            </div>
          );
        }
        return {
          children: <span className="group-title">{text}</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} />,
      width: 10,
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: t("common.soLuong"),
      show: true,
    },
    {
      title: <HeaderSearch title={t("common.tyLeTt")} />,
      width: 10,
      dataIndex: "tyLeTtDv",
      key: "tyLeTtDv",
      align: "center",
      hidden: isHiddenTyLett,
      i18Name: t("common.tyLeTt"),
      show: !isHiddenTyLett,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.thanhTien")}
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || 0}
        />
      ),
      width: 20,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: t("common.thanhTien"),
      show: true,
      render: renderContent("price"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.phong")}
          sort_key="tenPhongThucHien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenPhongThucHien"] || 0}
        />
      ),
      width: 20,
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      align: "right",
      hidden: LOAI_DICH_VU.KHAM !== loaiDichVu,
      i18Name: t("common.phong"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={
            isXetNghiem
              ? t("khamBenh.ketQua.ketQuaKetLuan")
              : t("khamBenh.ketQua.ketQua")
          }
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 15,
      dataIndex: "ketQua",
      key: "ketQua",
      align: "left",
      i18Name: isXetNghiem
        ? t("khamBenh.ketQua.ketQuaKetLuan")
        : t("khamBenh.ketQua.ketQua"),
      show: isChanDoanHinhAnh || isXetNghiem,
      hidden: !isChanDoanHinhAnh && !isXetNghiem,
      render: (value, row, index) => {
        const phanLoai = listPhanLoaiKetQuaXetNghiem.find(
          (phanLoai) => row?.phanLoaiKetQua == phanLoai?.id
        )?.ten;
        let style = {};
        switch (phanLoai) {
          case "Cao": {
            style = {
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 15,
              color: "red",
            };
            break;
          }
          case "Bình thường": {
            style = { textAlign: "center" };
            break;
          }
          case "Thấp": {
            style = { fontWeight: "bold", fontSize: 15, color: "red" };
            break;
          }
          case "Bất thường": {
            style = {
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 15,
              color: "red",
            };
            break;
          }
          default:
            break;
        }
        let ketQua = row.ketQua;
        const ketLuan = row.ketLuan;
        return (
          <div style={style}>
            {isXetNghiem
              ? `${ketQua ? ketQua : ""}${
                  ketLuan ? `${ketQua ? " - " : ""}${ketLuan}` : ""
                }`
              : ketQua}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            isXetNghiem
              ? t("khamBenh.ketQua.giaTriThamChieu")
              : t("khamBenh.ketQua.ketLuan")
          } //Với nhóm dịch vụ != Xét nghiệm. Hiển thị tên cột = Kết luận. Lấy giá trị từ kết luận của dịch vụ để hiển thị
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 15,
      dataIndex: "ketLuan",
      key: "ketLuan",
      align: "left",
      i18Name: isXetNghiem
        ? t("khamBenh.ketQua.giaTriThamChieu")
        : t("khamBenh.ketQua.ketLuan"),
      show: isChanDoanHinhAnh || isXetNghiem,
      hidden: !isChanDoanHinhAnh && !isXetNghiem,
      render: (value, row, index) => {
        const { ketQuaThamChieu, chiSoThap, chiSoCao, ketLuan } = row;
        let displayIsXetNghiem = "";
        if (isXetNghiem) {
          displayIsXetNghiem =
            ketQuaThamChieu ||
            (!!chiSoThap && !!chiSoCao && `${chiSoThap} - ${chiSoCao}`);
        }
        return isXetNghiem ? displayIsXetNghiem : ketLuan;
      },
    },
    {
      title: <HeaderSearch title="TT35" />,
      width: 15,
      dataIndex: "tenMucDich",
      key: "tenMucDich",
      columnName: "TT35",
      show: true,
    },
    {
      title: <HeaderSearch title={t("khamBenh.chiDinh.tuVanVien")} />,
      width: 20,
      dataIndex: "tuVanVienId",
      key: "tuVanVienId",
      i18Name: t("khamBenh.chiDinh.tuVanVien"),
      show: true,
      render: (item) =>
        (listAllNhanVien || []).find((x) => x.id == item)?.ten || "",
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.khac")}
              <img
                src={IcGroup}
                alt="..."
                onClick={onSettings}
                style={{ cursor: "pointer" }}
              />
            </>
          }
        />
      ),
      width: 15,
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (item, record, index) => {
        const obj = {
          props: {},
        };
        if (record.type === "group") {
          obj.props.colSpan = 0;
        }

        obj.children = (
          <div className="action-btn">
            {!disabledAll && (
              <>
                {(canEditOrUpdate(record.trangThai, record.loaiDichVu) ||
                  (!record.thanhToan &&
                    [155, 160].includes(record.trangThai))) && //trạng thái 155: đã có kết quả, 160: đã duyệt kết quả
                  !isReadonly && (
                    <>
                      <Tooltip
                        title={t("common.thongTinChiTiet")}
                        placement="bottom"
                      >
                        <div>
                          <CustomPopover
                            overlayInnerStyle={{
                              height: "fit-content",
                              padding: "0px !important",
                            }}
                            overlayClassName="popover-custom-all popover-custom-all_res"
                            icon={IconEdit}
                            onSubmit={handleEdit(record)}
                            onCancel={onClose}
                            contentPopover={renderContentEdit(record)}
                            visible={state.visibleEdit === index}
                            handleVisible={handleVisible("edit", index, record)}
                            mask={true}
                          />
                        </div>
                      </Tooltip>
                    </>
                  )}

                {!record?.chiSoConId && !isReadonly && (
                  <Tooltip
                    title={t("khamBenh.chiDinh.xoaDichVu")}
                    placement="bottom"
                  >
                    <img src={IconDelete} onClick={onDelete(record)} alt="" />
                  </Tooltip>
                )}
                {onHidden(record, "return") && (
                  <Tooltip
                    title={t("khamBenh.chiDinh.hoanDichVu")}
                    placement="bottom"
                  >
                    <img
                      src={IconHoanDv}
                      onClick={() => onHoanDv(record)}
                      alt=""
                    />
                  </Tooltip>
                )}
                {record.trangThaiHoan === 10 && (
                  <img
                    src={IcHuyHoan}
                    onClick={() => onHuyHoan(record)}
                    alt=""
                    title={t("khamBenh.chiDinh.huyYeuCauHoan")}
                  />
                )}
              </>
            )}
          </div>
        );
        return obj;
      },
    },
  ];
  const setRowClassName = (record) => {
    if (
      record?.tenMucDich &&
      thongTinNguoiBenh?.doiTuong === DOI_TUONG.BAO_HIEM
    )
      return "row-tt35";
  };

  return (
    <PhieuChiDinhWrapper>
      <div className="form-detail">
        <TableWrapper
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={dataTable}
          tableName={tableName + "DVKT"}
          ref={refSettings}
          rowClassName={setRowClassName}
        />
      </div>
      <ModalHoanDichVu ref={refModalHoanDichVu} />
      <ModalHuyHoanDichVu ref={refModalHuyHoanDichVu} />
    </PhieuChiDinhWrapper>
  );
};

export default DanhSachDichVu;
