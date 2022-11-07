import EditWrapper from "components/MultiLevelTab/EditWrapper";
import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { InputNumberFormat } from "components/common";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import InputBlockString from "../inputBlockString";

const ThongTinChiTiet = () => {
  const { t } = useTranslation();

  const { currentItem } = useSelector((state) => state.chiPhiHapSayVTYT);

  // console.log("currentItem", currentItem);
  // const [state, _setState] = useState({});
  // const setState = (data = {}) => {
  //   _setState((state) => {
  //     return { ...state, ...data };
  //   });
  // };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentItem);
  }, [currentItem]);

  const onCancel = () => {
    // if (currentItem?.id) {
    //   loadCurrentItem({ ...currentItem });
    // } else {
    //   loadCurrentItem({});
    //   form.resetFields();
    // }
  };

  return (
    <EditWrapper
      title={t("common.thongTinChiTiet")}
      onCancel={onCancel}
      // onSave={onSave}
      // onAddNewRow={onAddNewRow}

      // isShowSaveButton={state.data}
      // isShowCancelButton={state.data}
      // showAdded={!state.data}

      // roleSave={props.roleSave}
      // roleEdit={props.roleEdit}
      // editStatus={editStatus}

      // forceShowButtonSave={checkRole(props.roleEdit) && true}
      // forceShowButtonCancel={checkRole(props.roleEdit) && true}
      // showAdded={false}
      // isShowSaveButton={true}
      // isShowCancelButton={true}
      isHiddenButtonAdd={true}
      // layerId={layerId}
    >
      <fieldset disabled={true}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item label={t("danhMuc.maVatTu")} name="ma">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
          <Form.Item label={t("danhMuc.tenVatTu")} name="ten">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
          <Form.Item label={t("danhMuc.quyetDinhThau")} name="quyetDinhThauId">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
          <Form.Item label={t("danhMuc.heSoDinhMuc")} name="quyetDinhThauId">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
          <Form.Item label={t("danhMuc.maGoiThau")} name="quyetDinhThauId">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
          <Form.Item label={t("danhMuc.tenGoiThau")} name="quyetDinhThauId">
            <Input autoFocus={true} className="input-option" />
          </Form.Item>
        </Form>
      </fieldset>
    </EditWrapper>
  );
};

export default ThongTinChiTiet;
