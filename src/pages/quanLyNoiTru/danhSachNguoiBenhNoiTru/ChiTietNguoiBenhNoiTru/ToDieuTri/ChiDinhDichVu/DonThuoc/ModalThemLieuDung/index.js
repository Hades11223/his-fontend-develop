import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Input, message, Row, Form, Col } from "antd";
import Button from "pages/kho/components/Button";
import { MainModal } from "../styled";
import {  useDispatch } from "react-redux";
import Select from "components/Select";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useStore } from "hook";
import stringUtils from "mainam-react-native-string-utils";


const SuaThongTinThuoc = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
    data: [],
  });
  const [form] = Form.useForm();
  const refOk = useRef(null);
  const refCancel = useRef(null);
  const refFuncOk = useRef(null);
  const inputRef = React.useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModal = useRef(null);

  const listAllDuongDung = useStore("duongDung.listAllDuongDung", []);
  const {
    duongDung: { getListAllDuongDung },
    phimTat: { onAddLayer, onRegisterHotkey },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (options = {}, onOk, onCancel) => {
      const {  data, tenLieuDung } = options;
      setState({ show : true, data });
      refOk.current = onOk;
      refCancel.current = onCancel;
      form.setFieldsValue({
        ten: tenLieuDung || "",
        duongDungId: data?.duongDungId,
      });
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({
                show: false,
              });
              if (refCancel.current) refCancel.current();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refFuncOk.current && refFuncOk.current();
            },
          },
        ],
      });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      getListAllDuongDung({ page: "", size: "" });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
    refModal.current && refModal.current.hide();
  };

  const onOK = (isOk) => () => {
    if (isOk) {
      form.submit();
    } else {
      setState({ show: false });
      form.resetFields();
    }
  };

  const onHandleSubmit = (values) => {
    const expressionSymbol = /[,.a-zA-Z]/g;

    if (!values.ten) {
      message.error("Thiếu tên danh mục");
      return null;
    }
    if (
      (values["slSang"] && expressionSymbol.test(values["slSang"])) ||
      (values["slChieu"] && expressionSymbol.test(values["slChieu"])) ||
      (values["slToi"] && expressionSymbol.test(values["slToi"])) ||
      (values["slDem"] && expressionSymbol.test(values["slDem"]))
    ) {
      message.error(t("khamBenh.donThuoc.chiDuocPhepNhapSoNguyenHoacPhanSo"));
      return null;
    }
    if (!values.duongDungId) {
      message.error(t("khamBenh.donThuoc.thieuThongTinDuongDung"));
      return null;
    }
    setState({ show: false });
    form.resetFields();
    if (refOk.current) refOk.current({ values });
  };

  const blockInvalidChar = (e) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) || // các số trên bàn phím
      e.keyCode === 9 || // tab
      e.which === 8 || // dấu -
      e.keyCode === 37 || // mũi tên trái
      e.keyCode === 39 || // mũi tên phải
      e.keyCode === 191 || // dấu /
      e.keyCode === 188 || // dấu ,
      e.keyCode === 190 // dấu .
    ) {
    } else {
      return e.preventDefault();
    }
  };
  // ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const onBlur = (key) => (e) => {
    if (!!e.target.value && e.target.value <= 0) {
      form.setFieldsValue({ [key]: null });
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      title={t("khamBenh.donThuoc.themNhanhLieuDung")}
      onCancel={onCancel}
      width={800}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <MainModal>
        <Form
          form={form}
          layout="vertical"
          className="form-custom form-custom--one-line"
          onFinish={onHandleSubmit}
        >
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label={t("khamBenh.donThuoc.tenLieuDung")}
                name="ten"
                rules={[
                  {
                    required: true,
                    message: t("khamBenh.donThuoc.vuiLongNhapTenLieuDung"),
                  },
                  {
                    whitespace: true,
                    message: t("khamBenh.donThuoc.vuiLongNhapTenLieuDung"),
                  },
                ]}
              >
                <Input
                  ref={inputRef}
                  className="input-option"
                  placeholder={t("khamBenh.donThuoc.vuiLongNhapTenLieuDung")}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t("khamBenh.donThuoc.soLuongDungSang")}
                name="slSang"
              >
                <Input
                  className="input-option"
                  placeholder={t("common.vuiLongNhapSoLuong")}
                  // type="number"
                  onKeyDown={blockInvalidChar}
                  onBlur={onBlur("slSang")}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t("khamBenh.donThuoc.soLuongDungChieu")}
                name="slChieu"
              >
                <Input
                  className="input-option"
                  placeholder={t("common.vuiLongNhapSoLuong")}
                  // type="number"
                  onKeyDown={blockInvalidChar}
                  onBlur={onBlur("slChieu")}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t("khamBenh.donThuoc.soLuongDungToi")}
                name="slToi"
              >
                <Input
                  className="input-option"
                  placeholder={t("common.vuiLongNhapSoLuong")}
                  // type="number"
                  onKeyDown={blockInvalidChar}
                  onBlur={onBlur("slToi")}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={t("khamBenh.donThuoc.soLuongDungDem")}
                name="slDem"
              >
                <Input
                  className="input-option"
                  placeholder={t("common.vuiLongNhapSoLuong")}
                  // type="number"
                  onKeyDown={blockInvalidChar}
                  onBlur={onBlur("slDem")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.donThuoc.thoiDiemDung")}
                name="thoiDiem"
              >
                <Input
                  className="input-option"
                  placeholder={t("khamBenh.donThuoc.nhapThoiDiemDung")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.donThuoc.duongDung")}
                name="duongDungId"
                rules={[
                  {
                    required: true,
                    message: t("khamBenh.donThuoc.vuiLongChonDuongDung"),
                  },
                ]}
              >
                <Select
                  placeholder={t("khamBenh.donThuoc.vuiLongChonDuongDung")}
                  data={listAllDuongDung}
                  showArrow={true}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </MainModal>
    </ModalTemplate>
  );
};

export default forwardRef(SuaThongTinThuoc);
