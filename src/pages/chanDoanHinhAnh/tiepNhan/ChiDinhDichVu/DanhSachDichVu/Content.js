import React, { useCallback, useState, useMemo, useRef } from "react";
import { Checkbox, Form, Input, Row, Col, Divider, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import groupBy from "lodash/groupBy";
import Select from "components/Select";
import { TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import { PhieuChiDinhWrapper } from "./styled";
import { LOAI_DICH_VU } from "constants/index";
import { getColorByTrangThai, canEditOrUpdate } from "../utils";
import { useTranslation } from "react-i18next";

const DanhSachDichVu = ({
  dataSortColumn = {},
  listAllBenhPham,
  onDeleteDichVu,
  dataSource,
  getNBSoPhieuCLS,
  soPhieuCls,
  getDsDichVu,
  themThongTinDV,
  searchPhongThucHien,
  dataPhongThucHien,
  trangThai,
  loaiDichVu,
  onChangePhieu,
}) => {
  const { t } = useTranslation();
  const refNotification = useRef(null);
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
      const listChild = groupData[key].map((item, index) => ({
        ...item,
        nameDichVu: item?.tenDichVu,
        stt: index + 1,
        key: `${key}-${item?.tenDichVu}-${index}`,
      }));
      formattedData = [...formattedData, ...listChild];
    });

    return formattedData;
  }, [JSON.stringify(dataSource)]); // https://github.com/facebook/react/issues/14476#issuecomment-471199055

  const onClickSort = () => {};
  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      themThongTinDV({
        body: values,
        id: record.id,
        loaiDichVu: record.loaiDichVu,
      }).then((s) => {
        if (s.code === 0) {
          getDsDichVu(record.loaiDichVu);
          onClose();
        }
      });
    });
  };

  const onDelete = (record) => () => {
    refNotification.current &&
      refNotification.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: t("common.xacNhanXoaChiDinh") + `${record.nameDichVu}?`,
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

  const onClose = () => {
    setState({
      visibleEdit: false,
      visibleDelete: false,
    });
  };

  const handleVisible = (type, idx, record) => () => {
    if (type === "edit") {
      form.setFieldsValue({
        benhPhamId: record.benhPhamId ? record.benhPhamId : [],
        ghiChu: record.ghiChu,
        phongThucHienId: record.phongThucHienId,
        soPhieu: record.soPhieu,
        tuTra: record.tuTra,
      });
      getNBSoPhieuCLS({ loaiDichVu: record.loaiDichVu });
      searchPhongThucHien({ dichVuId: record.dichVuId });
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
    (record) => (
      <Form form={form} layout="vertical">
        <Row gutter={8}>
          {![LOAI_DICH_VU.CDHA, LOAI_DICH_VU.KHAM].includes(
            record.loaiDichVu
          ) && (
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.chiDinh.benhPham")}
                name="benhPhamId"
                rules={[
                  {
                    required: true,
                    message: t("khamBenh.chiDinh.vuiLongNhapBenhPham"),
                  },
                ]}
              >
                <Select
                  allowClear
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
              <Select
                allowClear
                data={dataPhongThucHien}
                placeholder={t("khamBenh.chiDinh.chonTenPhongThucHien")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t("common.luuY")} name="ghiChu">
              <Input
                className="input-option"
                placeholder={t("common.vuiLongNhapLuuY")}
              />
            </Form.Item>
          </Col>

          {record.loaiDichVu !== LOAI_DICH_VU.KHAM && (
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
                <Select data={soPhieuCls} placeholder={t("khamBenh.chiDinh.chonSoPhieu")} />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item label="" name="tuTra" valuePropName="checked">
              <Checkbox>{t("common.tuTra")}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    ),
    [state.visibleEdit, dataPhongThucHien]
  );

  const renderContent = (typeContent) => (value, row, index) => {
    const obj = {
      children: typeContent === "price" ? value?.formatPrice() : value,
      props: {},
    };

    if (row.type === "group") {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 10,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: renderContent(),
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

      render: (text, row, index) => {
        if (row.type !== "group") {
          const colorStatus = getColorByTrangThai(row.trangThai);

          const additionalInfo = `${row.tuTra ? t("common.tuTuc") : ""} ${
            row.tuTra && row.loaiDichVu === 10 ? "|" : ""
          } ${row.loaiDichVu === 10 ? row.tenBacSiChiDinh : ""}`;
          return (
            <div className="group-row-item">
              <div className="group-row-item__icon">
                <CheckCircleOutlined
                  style={{ fontSize: "25px", color: colorStatus }}
                />
              </div>
              <div className="group-row-item__text">
                <p>{text}</p>
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
      render: renderContent("price"),
    },
    {
      title: <HeaderSearch title={t("common.khac")} />,
      width: 15,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item, record, index) => {
        const obj = {
          props: {},
        };
        if (record.type === "group") {
          obj.props.colSpan = 0;
        }
        obj.children = (
          <div className="action-btn">
            {canEditOrUpdate(record.trangThai, record.loaiDichVu) && (
              <>
                <CustomPopover
                  icon={IconEdit}
                  onSubmit={handleEdit(record)}
                  onCancel={onClose}
                  contentPopover={renderContentEdit(record)}
                  visible={state.visibleEdit === index}
                  handleVisible={handleVisible("edit", index, record)}
                />
                <img src={IconDelete} onClick={onDelete(record)} alt="" />
              </>
            )}
          </div>
        );
        return obj;
      },
    },
  ];
  return (
    <PhieuChiDinhWrapper>
      <div className="form-detail">
        <TableWrapper
          scroll={{ x: false }}
          columns={columns}
          dataSource={dataTable}
        />
      </div>
    </PhieuChiDinhWrapper>
  );
};

export default DanhSachDichVu;
