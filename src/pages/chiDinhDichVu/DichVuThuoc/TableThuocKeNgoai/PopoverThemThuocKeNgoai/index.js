import React, { useEffect } from "react";
import { Input, Form, Modal } from "antd";
import { Button, Select } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { WarningOutlined } from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
const PopoverThemThuocKeNgoai = ({
  onSelectedNoPayment,
  loaiDonThuoc,
  visible,
  onAddNewItem,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refButtonSubmit = useRef(null);
  const [form] = Form.useForm();
  const {
    donViTinh: { listAllDonViTinh },
  } = useSelector((state) => state);
  const {
    thuocKeNgoai: { createOrEdit },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    if (visible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: onCancel,
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refButtonSubmit.current && refButtonSubmit.current.click();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [visible]);

  const onSaveThuocKeNgoai = (e) => {
    e && e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let formattedData = {
          ...values,
          active: true,
          donViTinhId: values.donViTinhId,
          donViTinh: listAllDonViTinh?.find(
            (item) => item?.id == values?.donViTinhId
          ),
          hamLuong: values.hamLuong,
          ten: values.ten,
          tenHoatChat: values.tenHoatChat,
          turnOfErrorMessage: true,
        };

        createOrEdit(formattedData)
          .then((s) => {
            onAddNewItem && onAddNewItem(s.data);
            form.resetFields();
          })
          .catch((err) => {
            Modal.error({
              title: t("common.thongBao"),
              content: err,
              icon: <WarningOutlined />,
              centered: true,
              onOk() {},
              okText: t("common.daHieu"),
              className: "modal-error-thuoc-ke-ngoai",
            });
          });
      })
      .catch((error) => {});
  };
  return (
    <Main>
      <div className="title-popup">
        {t("khamBenh.donThuoc.themDanhMucThuocKeNgoai")}
      </div>
      <EditWrapper actionHeaderClass={"action-header-custom"}>
        <Form
          form={form}
          layout="vertical"
          className="form-custom form-custom--one-line"
        >
          <Form.Item
            label={t("common.tenThuoc")}
            name="ten"
            rules={[
              {
                required: true,
                message: t("common.vuiLongNhapTenThuoc"),
              },
              {
                whitespace: true,
                message: t("common.vuiLongNhapTenThuoc"),
              },
            ]}
          >
            <Input className="" placeholder={t("common.vuiLongNhapTenThuoc")} />
          </Form.Item>
          <Form.Item label={t("common.hoatChat")} name="tenHoatChat">
            <Input className="" placeholder={t("common.vuiLongNhapHoatChat")} />
          </Form.Item>
          <Form.Item label={t("common.donViTinh")} name="donViTinhId">
            <Select
              placeholder={t("common.vuiLongChonDonViTinh")}
              data={listAllDonViTinh}
              showArrow={true}
            />
          </Form.Item>
          <Form.Item label={t("common.hamLuong")} name="hamLuong">
            <Input className="" placeholder={t("common.vuiLongNhapHamLuong")} />
          </Form.Item>
        </Form>
      </EditWrapper>
      <div className="popover-btn-list">
        <Button type="default" minWidth={100} onClick={onCancel}>
          {t("common.huy")}
        </Button>
        <Button
          type="primary"
          minWidth={100}
          onClick={onSaveThuocKeNgoai}
          ref={refButtonSubmit}
          rightIcon={
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          }
        >
          {t("common.luu")}
        </Button>
      </div>
    </Main>
  );
};

export default PopoverThemThuocKeNgoai;
