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
      title={"Cho mượn bệnh án"}
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
          Quay lại
        </Button.Text>
      }
      actionRight={
        <>
          <Button type="primary" onClick={onChoMuonBa}>
            Lưu
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
            label="Người mượn"
            name="nguoiMuon"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn người mượn",
              },
            ]}
          >
            <Select data={listAllNhanVien} placeholder="Chọn người mượn" />
          </Form.Item>

          <Form.Item label="Khoa mượn" name="khoaMuon">
            <Select
              data={(dsKhoa || []).map((item) => ({
                id: item.khoaId,
                ten: item.khoa?.ten,
              }))}
              placeholder="Chọn khoa mượn"
            />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="soDienThoai">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Ngày mượn"
            name="thoiGianMuon"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày mượn",
              },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm:ss" }}
              placeholder="Chọn thời gian mượn"
              disabled={true}
            />
          </Form.Item>

          <Form.Item
            label="Lý do mượn"
            name="lyDoMuon"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do mượn",
              },
            ]}
          >
            <Input placeholder="Nhập lý do mượn" />
          </Form.Item>

          <Form.Item label="Mục đích" name="mucDich">
            <Input placeholder="Nhập mục đích" />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChoMuonBA);
