import React, { useEffect, useRef } from "react";
import { Checkbox, Input, Form, DatePicker } from "antd";
import { CreatedWrapper, Select } from "components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { openInNewTab } from "utils";
import { ModalConfirm } from "components/ModalConfirm";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
const FormQuyetDinhThau = ({ layerId, ...props }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef();

  const { dataEditDefault } = useSelector((state) => state.quyetDinhThau);
  const { listAllNguonNhapKho } = useSelector((state) => state.nguonNhapKho);

  const { listKhoaTheoTaiKhoan } = useSelector((state) => state.khoa);
  const {
    onSizeChange,
    onComplete,
    onUndoComplete,
    onVerify,
    onUndoVerify,
    createOrEdit,
  } = useDispatch().quyetDinhThau;
  const [listloaiDichVuThuocVatTuHoaChat] = useEnum(
    ENUM.LOAI_DICH_VU_THUOC_VAT_TU_HOA_CHAT
  );
  const [listloaiThau] = useEnum(ENUM.LOAI_THAU);
  const [listtrangThaiThau] = useEnum(ENUM.TRANG_THAI_THAU);

  useEffect(() => {
    if (dataEditDefault) {
      const newInfo = {
        ...dataEditDefault,
        ngayCongBo:
          dataEditDefault.ngayCongBo && moment(dataEditDefault.ngayCongBo),
        ngayHieuLuc:
          dataEditDefault.ngayHieuLuc && moment(dataEditDefault.ngayHieuLuc),
      };
      form.setFieldsValue(newInfo);
    } else {
      form.resetFields();
    }
  }, [dataEditDefault]);
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);
  const dateFormat = "DD/MM/YYYY";

  const onSave = () => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  const onCompleteDocument = () => {
    ModalConfirm({
      title: t("kho.quyetDinhThau.banCoChacChanHoanThanhQuyetDinhThau"),
      onOk() {
        onComplete(dataEditDefault?.id)
          .then(() => {
            onSizeChange(10);
          })
          .catch((err) => console.error(err));
      },
    });
  };

  const onUndoCompleteDocument = () => {
    ModalConfirm({
      title: t("kho.quyetDinhThau.banCoChacChanHuyHoanThanhQuyetDinhThau"),
      onOk() {
        onUndoComplete(dataEditDefault?.id)
          .then(() => {
            onSizeChange(10);
          })
          .catch((err) => console.error(err));
      },
    });
  };

  const onVerifyDocument = () => {
    ModalConfirm({
      title: t("kho.quyetDinhThau.banCoChacChanDuyetQuyetDinhThau"),
      onOk() {
        onVerify(dataEditDefault?.id)
          .then(() => {
            onSizeChange(10);
          })
          .catch((err) => console.error(err));
      },
    });
  };

  const onUndoVerifyDocument = () => {
    ModalConfirm({
      title: t("kho.quyetDinhThau.banCoChacChanHuyDuyetQuyetDinhThau"),
      onOk() {
        onUndoVerify(dataEditDefault?.id)
          .then(() => {
            onSizeChange(10);
          })
          .catch((err) => console.error(err));
      },
    });
  };

  const onCancel = (data) => {
    const newInfo = {
      ...data,
      ngayCongBo: data.ngayCongBo && moment(data.ngayCongBo),
      ngayHieuLuc: data.ngayHieuLuc && moment(data.ngayHieuLuc),
    };
    form.setFieldsValue(newInfo);
  };

  const setButton = (value) => {
    if ("cancel" === value) {
      if (!dataEditDefault || dataEditDefault.trangThai !== 20)
        return () => onCancel(dataEditDefault);
      if (20 === dataEditDefault?.trangThai) return onUndoCompleteDocument;
    }
    if ("ok" === value) {
      if (!dataEditDefault) return onSave;
      if (10 === dataEditDefault?.trangThai) return onCompleteDocument;
      if (20 === dataEditDefault?.trangThai) return onVerifyDocument;
      if (30 === dataEditDefault?.trangThai) return onUndoVerifyDocument;
    }
  };

  const setButtonText = (value) => {
    if ("cancel" === value) {
      if (!dataEditDefault) return t("common.huy");
      if (20 === dataEditDefault?.trangThai)
        return t("kho.quyetDinhThau.huyHoanThanh");
    }
    if ("ok" === value) {
      if (!dataEditDefault) return `${t("common.luu")} [F4]`;
      if (10 === dataEditDefault?.trangThai)
        return `${t("kho.quyetDinhThau.hoanThanh")} [F4]`;
      if (20 === dataEditDefault?.trangThai)
        return `${t("kho.quyetDinhThau.duyet")} [F4]`;
      if (30 === dataEditDefault?.trangThai)
        return `${t("kho.quyetDinhThau.huyDuyet")} [F4]`;
    }
  };

  const setHiddenButton = (value) => {
    if ("cancel" === value)
      return 20 !== dataEditDefault?.trangThai && dataEditDefault;
  };

  console.log("dataEditDefault", dataEditDefault);
  const handleSumitForm = (values) => {
    if (values) {
      const body = {
        ...values,
        ngayCongBo: values.ngayCongBo.format("YYYY-MM-DD"),
        ngayHieuLuc: values.ngayHieuLuc.format("YYYY-MM-DD"),
        id: dataEditDefault?.id,
      };
      createOrEdit(body)
        .then((s) => {
          onSizeChange(10);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleErrors = (errors) => {
    console.log("errors: ", errors);
  };
  return (
    <>
      <CreatedWrapper
        title={t("kho.quyetDinhThau.thongTinChiTiet")}
        onCancel={setButton("cancel")}
        cancelText={setButtonText("cancel")}
        hiddenCancel={setHiddenButton("cancel")}
        onOk={setButton("ok")}
        okText={setButtonText("ok")}
        hiddenOk={setHiddenButton("ok")}
        additionBtn={
          dataEditDefault?.trangThai == 10
            ? {
                text: `${t("common.luu")}`,
                onClick: onSave,
                rightIcon: (
                  <img
                    style={{ marginLeft: 6 }}
                    src={require("assets/images/kho/save.png")}
                    alt=""
                  />
                ),
              }
            : null
        }
      >
        <Form
          form={form}
          onFinish={handleSumitForm}
          onError={handleErrors}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label={t("kho.quyetDinhThau.nam")}
            name="nam"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonNam"),
              },
            ]}
          >
            <Input
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapNam")}
              ref={refAutoFocus}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.title")}
            name="quyetDinhThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapQuyetDinhThau"),
              },

              {
                whitespace: true,
                message: t("kho.quyetDinhThau.vuiLongNhapQuyetDinhThau"),
              },
            ]}
          >
            <Input
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapQuyetDinhThau")}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.tenGoiThau")}
            name="goiThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapGoiThau"),
              },

              {
                whitespace: true,
                message: t("kho.quyetDinhThau.vuiLongNhapGoiThau"),
              },
            ]}
          >
            <Input
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapGoiThau")}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.loaiDichVu")}
            name="loaiDichVu"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonLoaiDichVu"),
              },
            ]}
          >
            <Select
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              data={listloaiDichVuThuocVatTuHoaChat}
              placeholder={t("kho.quyetDinhThau.vuiLongChonLoaiDichVu")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
              >
                {t("kho.nguonNhapKho")}
              </div>
            }
            name="nguonNhapKhoId"
            rules={[
              {
                required: true,
                message: t("kho.vuiLongChonNguonNhapKho"),
              },
            ]}
          >
            <Select
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              data={listAllNguonNhapKho}
              placeholder={t("kho.vuiLongChonNguonNhapKho")}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.loaiThau")}
            name="loaiThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonLoaiThau"),
              },
            ]}
          >
            <Select
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              data={listloaiThau}
              placeholder={t("kho.quyetDinhThau.vuiLongChonLoaiThau")}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.ngayCongBo")}
            name="ngayCongBo"
            className="item-date"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonNgayCongBo"),
              },
            ]}
          >
            <DatePicker
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              placeholder={t("kho.quyetDinhThau.vuiLongChonNgayCongBo")}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.hieuLucThau")}
            name="ngayHieuLuc"
            className="item-date"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonHieuLucThau"),
              },
            ]}
          >
            <DatePicker
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              placeholder={t("kho.quyetDinhThau.vuiLongChonHieuLucThau")}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.khoa")}
            name="khoaId"
            rules={[
              {
                required: true,
                message: t("kho.vuiLongChonKhoa"),
              },
            ]}
          >
            <Select
              disabled={10 !== dataEditDefault?.trangThai && dataEditDefault}
              data={listKhoaTheoTaiKhoan}
              placeholder={t("kho.vuiLongChonKhoa")}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.trangThai")}
            name="trangThai"
            defaultValue={10}
          >
            <Select data={listtrangThaiThau} disabled />
          </Form.Item>
          {dataEditDefault && (
            <Form.Item
              name="active"
              valuePropName="checked"
              hidden={10 !== dataEditDefault?.trangThai && dataEditDefault}
            >
              <Checkbox>{t("kho.coHieuLuc")}</Checkbox>
            </Form.Item>
          )}
        </Form>
      </CreatedWrapper>
    </>
  );
};
export default FormQuyetDinhThau;
