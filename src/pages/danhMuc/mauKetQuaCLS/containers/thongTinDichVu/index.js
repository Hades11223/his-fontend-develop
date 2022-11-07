import { Form, Col, Input, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import CreatedWrapper from "components/CreatedWrapper";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import TextField from "components/TextField";
import { ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
const { Item } = Form;

const ThongTinDichVu = (props) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [form] = Form.useForm();
  const {
    mauKetQuaCDHA: { currentItem },
    dichVuKyThuat: { listAll },
  } = useSelector((state) => state);
  const {
    mauKetQuaCDHA: { createOrEdit },
    dichVuKyThuat: { getAll },
  } = useDispatch();

  useEffect(() => {
    getAll({ "dichVu.loaiDichVu": 30, size: 9999 });
  }, []);

  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const loadCurrentItem = (item) => {
    if (item) {
      const {
        ma,
        ten,
        dsDichVuId,
        active,
        ketLuan,
        ketQua,
        phuongThuc,
        cachThuc,
        id,
      } = item || {};
      const data = {
        ma,
        ten,
        dsDichVuId,
        active,
        ketLuan,
        ketQua,
        phuongThuc,
        cachThuc,
        id,
      };
      form.setFieldsValue(data);
      setState({ data });
    } else {
      form.resetFields();
      setState({ data: null });
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const onSave = () => {
    form.submit();
  };
  const onHandleSubmit = (values) => {
    const {
      ma,
      ten,
      dsDichVuId,
      active,
      ketLuan,
      ketQua,
      phuongThuc,
      cachThuc,
    } = values;
    values = {
      ma,
      ten,
      dsDichVuId,
      active,
      id: state?.data?.id,
      ketLuan,
      ketQua,
      phuongThuc,
      cachThuc,
    };
    createOrEdit(values).then((s) => {
      form.resetFields();
      setState({ data: null });
    });
  };
  return (
    <Main>
      <CreatedWrapper
        title={t("danhMuc.thongTinChiTiet")}
        onCancel={onReset}
        cancelText={t("danhMuc.huy")}
        onOk={onSave}
        okText={t("danhMuc.luu")}
        roleSave={[ROLES["DANH_MUC"].MAU_KQ_CDHA_TDCN_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MAU_KQ_CDHA_TDCN_SUA]}
        editStatus={props?.stateParent?.editStatus}
      >
        <div className="content">
          <Form form={form} onFinish={onHandleSubmit} layout="vertical">
            <Row>
              <Col span={12}>
                <Item
                  label={t("danhMuc.ma")}
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: t("danhMuc.nhapMa"),
                    },
                  ]}
                >
                  <Input autoFocus />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label={t("danhMuc.tenMau")}
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: t("danhMuc.nhapTen"),
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={24}>
                <div className="group-input">
                  <Item name="ketQua">
                    <TextField
                      label={t("danhMuc.ketQua")}
                      html={state?.data?.ketQua}
                      maxLength={2000}
                    />
                  </Item>
                  <Item name="ketLuan">
                    <TextField label={t("danhMuc.ketLuan")} html={state?.data?.ketLuan} />
                  </Item>
                  <Item name="cachThuc">
                    <TextField
                      label={t("danhMuc.cachThucCanThiep")}
                      html={state?.data?.cachThuc}
                    />
                  </Item>
                  <Item name="phuongThuc">
                    <TextField
                      label={t("danhMuc.phuongThucCanThiep")}
                      html={state?.data?.phuongThuc}
                    />
                  </Item>
                </div>
              </Col>
              <Col span={24}>
                <Item
                  label={t("danhMuc.tenDichVu")}
                  name="dsDichVuId"
                  rules={[
                    {
                      required: true,
                      message: t("danhMuc.nhapTenDichVu"),
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    data={listAll}
                    placeholder={t("danhMuc.vuiLongChonDichVu")}
                  />
                </Item>
              </Col>

              <Col span={24}>
                <Item name="active" valuePropName="checked">
                  <Checkbox>{t("danhMuc.hieuLuc")}</Checkbox>
                </Item>
              </Col>
            </Row>
          </Form>
        </div>
      </CreatedWrapper>
    </Main>
  );
};

export default ThongTinDichVu;
