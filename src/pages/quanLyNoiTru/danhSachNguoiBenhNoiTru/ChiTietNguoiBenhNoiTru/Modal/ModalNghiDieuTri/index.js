import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Main, GlobalStyle } from "./styled";
import { Modal, Form } from "antd";
import { useTranslation } from "react-i18next";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, DateTimePicker, ModalTemplate } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useDispatch } from "react-redux";
import moment from "moment";
import FormWraper from "components/FormWraper";
import { useHistory } from "react-router-dom";

const ModalNghiDieuTri = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [form] = Form.useForm();
  const refModal = useRef(null);

  const [state, _setState] = useState({
    nbDotDieuTri: null,
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    nbChuyenKhoa: { chuyenKhoa },
  } = useDispatch();

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  useImperativeHandle(ref, () => ({
    show: ({ nbDotDieuTri }) => {
      setState({
        show: true,
        nbDotDieuTri,
      });
    },
  }));

  const onOK = (isOk) => () => {
    if (isOk) {
      form.validateFields().then((values) => {
        const { tuThoiGian } = values;

        chuyenKhoa({
          nbDotDieuTriId: state.nbDotDieuTri,
          loai: 30,
          tuThoiGian:
            tuThoiGian instanceof moment
              ? tuThoiGian.format("YYYY-MM-DD HH:mm:ss")
              : null,
        }).then(() => {
          return setTimeout(() => {
            history.go();
          }, 300);
        });
      });
    } else {
      setState({
        show: false,
      });
    }
  };

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };

  return (
    <ModalTemplate
      width={450}
      ref={refModal}
      title={t("quanLyNoiTru.themMoiDotNghiDieuTri")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onOK(false)}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button type="primary" minWidth={100} onClick={onOK(true)}>
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <FormWraper
          form={form}
          style={{ width: "100%" }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          labelAlign="left"
        >
          <Form.Item
            name={"tuThoiGian"}
            label="Nghỉ từ ngày"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nghỉ từ ngày!",
              },
            ]}
          >
            <DateTimePicker placeholder={"Nghỉ từ ngày"} />
          </Form.Item>

          <Form.Item name={"denThoiGian"} label="Hẹn ngày quay lại điều trị">
            <DateTimePicker placeholder={"Hẹn ngày quay lại điều trị"} />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
});
export default ModalNghiDieuTri;
