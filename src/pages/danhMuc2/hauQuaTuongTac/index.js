import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";
import { Main } from "../styled";
import { useTranslation } from "react-i18next";

const nameScreen = "hậu quả";
const HauQuaTuongTac = ({}) => {
  const { t } = useTranslation();
  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label={t("danhMuc.maGiaTri").replace("{0}", nameScreen)}
          name="ma"
        >
          <Input className="input-option" disabled={true} />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.tenGiaTri").replace("{0}", nameScreen)}
          name="ten"
          rules={[
            {
              required: true,
              message: t("danhMuc.vuiLongNhapTenGiaTri").replace(
                "{0}",
                nameScreen
              ),
            },
            {
              max: 1000,
              message: t("danhMuc.vuiLongNhapTenGiaTriKhongQuaKyTu")
                .replace("{0}", nameScreen)
                .replace("{1}", "250"),
            },
            {
              whitespace: true,
              message: t("danhMuc.vuiLongNhapTenGiaTri").replace(
                "{0}",
                nameScreen
              ),
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder={t("danhMuc.vuiLongNhapTenGiaTri").replace(
              "{0}",
              nameScreen
            )}
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>{t("danhMuc.coHieuLuc")}</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <Main>
      <BaseDmWrap
        titleTable={t("danhMuc.danhMucHauQuaTuongTac")}
        titleMain={nameScreen}
        renderForm={renderForm}
        roleName={"HAU_QUA_TUONG_TAC"}
        storeName="hauQuaTuongTac"
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

export default HauQuaTuongTac;
