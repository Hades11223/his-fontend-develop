import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, Input } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Button, DateTimePicker, ModalTemplate, Select } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const ModalYeuCauMuonNb = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const listDataTongHop = useStore("khoa.listDataTongHop", []);
  const {
    danhSachNguoiBenhNoiTru: { nbMuonNb, getNbNoiTruById },
    khoa: { getListKhoaTongHop },
  } = useDispatch();
  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      form.setFieldsValue({ tenKhoaNb: infoPatient?.tenKhoaNb });
      getListKhoaTongHop({ tuDongDuyetMuonNb: true });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show, infoPatient]);

  useEffect(() => {}, []);

  const onHanldeSubmit = (values) => {
    const payload = {
      nbDotDieuTriId: infoPatient.id,
      denKhoaId : values?.denKhoaId,
      denThoiGian:
        values.denThoiGian &&
        moment(values.denThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    };
    nbMuonNb(payload).then(() => {
      getNbNoiTruById(infoPatient.id);
      onCancel();
    });
  };

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };
  const onSubmit = () => {
    form.submit();
  };

  return (
    <ModalTemplate
      width={400}
      ref={refModal}
      title={t("quanLyNoiTru.yeuCauMuonNb")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Form
          form={form}
          layout="vertical"
          onFinish={onHanldeSubmit}
          className="form-custom"
        >
          <Form.Item label={t("quanLyNoiTru.khoaDangDieuTri")} name="tenKhoaNb">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label={t("quanLyNoiTru.khoaYeuCauMuonNb")}
            name="denKhoaId"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongChonKhoaYeuCauMuonNb"),
              },
            ]}
          >
            <Select
              placeholder={t("quanLyNoiTru.khoaYeuCauMuonNb")}
              data={listDataTongHop}
            />
          </Form.Item>
          <Form.Item
            label={t("quanLyNoiTru.muonNbDen")}
            name="denThoiGian"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongChonThoiGian"),
              },
            ]}
          >
            <DateTimePicker placeholder={t("quanLyNoiTru.muonNbDen")} />
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalYeuCauMuonNb);
