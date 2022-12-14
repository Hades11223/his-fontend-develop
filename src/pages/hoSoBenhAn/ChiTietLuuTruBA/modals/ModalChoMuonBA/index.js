import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { DatePicker, Form, Input } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import moment from "moment";
import { useStore } from "hook";

const ModalChoMuonBA = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const {
    dsLuuTruBa: { doiTrangThaiBA, getChiTietLuuTruBA },
    nhanVien: { getListNhanVienTongHop, searchId },
  } = useDispatch();

  const { nhanVienHienTai } = useSelector((state) => state.nhanVien);
  const listAllNhanVien = useStore("nhanVien.listNhanVien", []);

  const { dsKhoa = [], soDienThoai } = nhanVienHienTai || {};

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (soDienThoai) {
      form.setFieldsValue({ soDienThoai });
    }
  }, [soDienThoai]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useImperativeHandle(ref, () => ({
    show: ({ data, listData }, callback) => {
      setState({ show: true, data, listData });

      const {
        nguoiMuon,
        lyDoMuon,
        mucDich,
        soDienThoai,
        khoaMuon,
        thoiGianMuon,
      } = data || {};

      form.setFieldsValue({
        nguoiMuon,
        lyDoMuon,
        mucDich,
        soDienThoai,
        khoaMuon,
        thoiGianMuon: thoiGianMuon ? moment(thoiGianMuon) : moment(),
      });

      getListNhanVienTongHop({ active: true });
      refCallback.current = callback;
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false, data: null, listData: null });
  };

  const onChoMuonBa = () => {
    form.validateFields().then((values) => {
      const {
        nguoiMuon,
        lyDoMuon,
        mucDich,
        soDienThoai,
        khoaMuon,
        thoiGianMuon,
      } = values;

      const payload = state.listData
        ? state.listData.map((x) => ({
            ...x,
            nguoiMuon,
            lyDoMuon,
            mucDich,
            soDienThoai,
            khoaMuon,
            thoiGianMuon,
          }))
        : [
            {
              ...state.data,
              nguoiMuon,
              lyDoMuon,
              mucDich,
              soDienThoai,
              khoaMuon,
              thoiGianMuon,
            },
          ];

      doiTrangThaiBA(payload).then(() => {
        getChiTietLuuTruBA(state.data?.id);
        if (refCallback.current) refCallback.current();
        onClose();
      });
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.nguoiMuon) {
      searchId({ nhanVienId: changedValues.nguoiMuon });
    }
  };

  return (
    <ModalTemplate
      width={600}
      closable={true}
      ref={refModal}
      title={"Cho m?????n b???nh ??n"}
      onCancel={onClose}
      actionLeft={
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={() => {
            onClose();
          }}
          leftIcon={<IcArrowLeft />}
        >
          Quay l???i
        </Button.Text>
      }
      actionRight={
        <>
          <Button type="primary" onClick={onChoMuonBa}>
            L??u
          </Button>
        </>
      }
    >
      <Main>
        <FormWraper
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout={"vertical"}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label="Ng?????i m?????n"
            name="nguoiMuon"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ng?????i m?????n",
              },
            ]}
          >
            <Select data={listAllNhanVien} placeholder="Ch???n ng?????i m?????n" />
          </Form.Item>

          <Form.Item label="Khoa m?????n" name="khoaMuon">
            <Select
              data={(dsKhoa || []).map((item) => ({
                id: item.khoaId,
                ten: item.khoa?.ten,
              }))}
              placeholder="Ch???n khoa m?????n"
            />
          </Form.Item>

          <Form.Item label="S??? ??i???n tho???i" name="soDienThoai">
            <Input placeholder="Nh???p s??? ??i???n tho???i" />
          </Form.Item>

          <Form.Item
            label="Ng??y m?????n"
            name="thoiGianMuon"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ng??y m?????n",
              },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm:ss" }}
              placeholder="Ch???n th???i gian m?????n"
              disabled={true}
            />
          </Form.Item>

          <Form.Item
            label="L?? do m?????n"
            name="lyDoMuon"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p l?? do m?????n",
              },
            ]}
          >
            <Input placeholder="Nh???p l?? do m?????n" />
          </Form.Item>

          <Form.Item label="M???c ????ch" name="mucDich">
            <Input placeholder="Nh???p m???c ????ch" />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChoMuonBA);
