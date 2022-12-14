import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main } from "./styled";
import { Col, Form, Input, Row, InputNumber, DatePicker } from "antd";
import { Button, ModalTemplate, Select } from "components";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { ThongTinNb } from "pages/sinhHieu/components";
import FormWraper from "components/FormWraper";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import moment from "moment";
import { InputNumberFormat } from "components/common";
import { parseFloatNumber } from "utils";

const ModalChiTietNb = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [form] = Form.useForm();
  //state
  const [state, _setState] = useState({
    show: false,
    currentItem: {},
    updateFields: { nhietDo: false, chieuCao: false, canNang: false },
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const [listNhomMau] = useEnum(ENUM.NHOM_MAU);
  const listDataTongHop = useStore("chiSoSong._listDataTongHop", []);
  // const khoaId = useStore("auth.auth.khoaId", null);
  const {
    chiSoSong: { _getListTongHop },
    sinhHieu: { updateChiSoSong },
  } = useDispatch();

  useEffect(() => {
    if (props.khoaLamViec?.id) {
      _getListTongHop({
        dsKhoaId: props.khoaLamViec?.id,
        active: true,
      });
    }
  }, [props.khoaLamViec?.id]);

  useEffect(() => {
    if (state.currentItem?.id) {
      const { id, thoiGianThucHien, dsChiSoSongKhac, ...rest } =
        state.currentItem;

      form.setFieldsValue({
        thoiGianThucHien: thoiGianThucHien ? moment(thoiGianThucHien) : null,
        ...dsChiSoSongKhac.reduce(
          (a, v) => ({ ...a, [`chiSoSongId-${v.chiSoSongId}`]: v.giaTri }),
          {}
        ),
        ...rest,
      });
    }
  }, [state.currentItem]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  //function
  const onClose = () => {
    form.resetFields();
    setState({
      show: false,
      currentItem: {},
      updateFields: { nhietDo: false, chieuCao: false, canNang: false },
    });
  };

  const onSave = () => {
    form.validateFields().then((values) => {
      const {
        mach,
        nhietDo,
        huyetApTamThu,
        huyetApTamTruong,
        nhipTho,
        canNang,
        chieuCao,
        spo2,
        nhomMau,
        bmi,
      } = values;

      let dsChiSoSongKhac = [];
      Object.keys(values).forEach((key) => {
        const _index = key.indexOf("chiSoSongId");
        if (_index > -1 && values[key]) {
          dsChiSoSongKhac.push({
            chiSoSongId: key.slice(12),
            giaTri: values[key],
          });
        }
      });

      const { id, ...rest } = state.currentItem || {};
      const { nhietDo: nd, canNang: cn, chieuCao: cc } = state.updateFields;

      const payload = {
        ...rest,
        nbDotDieuTriId: state.currentItem?.id,
        mach,
        nhietDo: nd ? nhietDo && parseFloatNumber(nhietDo) : nhietDo,
        huyetApTamThu,
        huyetApTamTruong,
        nhipTho,
        canNang: cn ? canNang && parseFloatNumber(canNang) : canNang,
        chieuCao: cc ? chieuCao && parseFloatNumber(chieuCao) : chieuCao,
        spo2,
        dsChiSoSongKhac,
        nhomMau,
        bmi,
      };

      updateChiSoSong(payload).then(() => {
        props.refreshList && props.refreshList();
        onClose();
      });
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onValuesChange = (changedValues, allValues) => {
    let updateFields = state.updateFields;

    Object.keys(state.updateFields).forEach((key) => {
      if (changedValues[key]) {
        updateFields[key] = true;

        setState({ updateFields });
      }
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={"70%"}
      onCancel={onClose}
      title={"Chi ti???t ng?????i b???nh"}
      closable={false}
    >
      <Main>
        <div className="content">
          <div className="content-tt-nb">
            <ThongTinNb nbDotDieuTriId={state.currentItem?.id} />
          </div>

          <div className="content-form">
            <FormWraper
              form={form}
              layout="vertical"
              onValuesChange={onValuesChange}
            >
              <Row>
                <Col span={5} offset={1}>
                  <Form.Item label="M???ch (l???n/ph??t)" name="mach">
                    <InputNumber placeholder="Nh???p m???ch" />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="Nhi???t ????? (??C)" name="nhietDo">
                    <InputNumberFormat
                      decimalScale={2}
                      allowNegative={false}
                      placeholder="Nh???p nhi???t ?????"
                    />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <div style={{ paddingBottom: 8 }}>Huy???t ??p (mmHg)</div>
                  <div className="content-form-item-huyet-ap">
                    <Form.Item name="huyetApTamThu">
                      <InputNumber placeholder="Nh???p s???" />
                    </Form.Item>
                    <div style={{ marginBottom: 24 }}>/</div>
                    <Form.Item name="huyetApTamTruong">
                      <InputNumber placeholder="Nh???p s???" />
                    </Form.Item>
                  </div>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="Nh???p th??? (l???n/ph??t)" name="nhipTho">
                    <InputNumber placeholder="Nh???p nh???p th???" />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="Chi???u cao (cm)" name="chieuCao">
                    <InputNumberFormat
                      decimalScale={1}
                      allowNegative={false}
                      placeholder="Nh???p chi???u cao"
                    />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="C??n n???ng (kg)" name="canNang">
                    <InputNumberFormat
                      decimalScale={1}
                      allowNegative={false}
                      placeholder="Nh???p c??n n???ng"
                    />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="BMI" name="bmi">
                    <Input disabled={true} />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="Nh??m m??u" name="nhomMau">
                    <Select data={listNhomMau} placeholder="Ch???n nh??m m??u" />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="M???c ????? BMI" name="tenPhanLoaiBmi">
                    <Input disabled={true} />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="D???i tham chi???u BMI" name="moTaPhanLoaiBmi">
                    <Input disabled={true} />
                  </Form.Item>
                </Col>

                {(listDataTongHop || []).map((item) => (
                  <Col key={item.id} span={5} offset={1}>
                    <Form.Item
                      label={`${item.ten} (${item.donVi})`}
                      name={`chiSoSongId-${item.id}`}
                    >
                      <Input placeholder="Nh???p gi?? tr???" />
                    </Form.Item>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col span={5} offset={1}>
                  <Form.Item label="Ng?????i ??o" name="tenNguoiThucHien">
                    <Input disabled={true} placeholder="Nh???p gi?? tr???" />
                  </Form.Item>
                </Col>

                <Col span={5} offset={1}>
                  <Form.Item label="Ng??y ??o" name="thoiGianThucHien">
                    <DatePicker format="DD-MM-YYYY HH:mm:ss" disabled={true} />
                  </Form.Item>
                </Col>
              </Row>
            </FormWraper>
          </div>
        </div>
        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onClose}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<SaveOutlined />}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietNb);
