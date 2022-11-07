import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Main, ModalStyled } from "./styled";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button } from "components";
import FormWraper from "components/FormWraper";
import { Col, Form, Row, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import moment from "moment";

const ModalChinhSua = (props, ref) => {
  const [form] = Form.useForm();
  const { refreshList, isReadonly } = props;

  const {
    phong: { listRoom },
    noiTruPhongGiuong: { dsSoHieuGiuong, dsDVGiuong },
  } = useSelector((state) => state);

  const {
    phong: { getListPhongTongHop },
    noiTruPhongGiuong: {
      getSoHieuGiuongByPhong,
      getDsDVGiuong,
      updatePhongGiuong,
    },
  } = useDispatch();

  //state
  const [state, _setState] = useState({
    show: false,
    currentItem: null,
    loaiDichVu: 10,
    formValues: {
      phongId: null,
    },
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });

      const {
        giuongId,
        phongId,
        khoaId,
        dvGiuongId,
        denThoiGian,
        dvGiuongTuChonId,
      } = data;

      form.setFieldsValue({
        giuongId,
        phongId,
        dvGiuongId,
        denThoiGian: denThoiGian ? moment(denThoiGian) : null,
        dvGiuongTuChonId,
      });

      getListPhongTongHop({ khoaId });
      if (phongId) {
        getSoHieuGiuongByPhong({ phongId });
        getDsDVGiuong({ phongId });
      }
    },
  }));

  //function
  function onClose() {
    form.resetFields();
    setState({ show: false });
  }

  function onValuesChange(changedValues, allValues) {
    if (changedValues?.phongId) {
      form.setFieldsValue({ giuongId: null });
      getSoHieuGiuongByPhong({
        phongId: changedValues.phongId,
      });

      getDsDVGiuong({ phongId: changedValues.phongId });
    }
  }

  function onChangeDate(date) {}

  function onSave() {
    form.validateFields().then((values) => {
      const { giuongId, dvGiuongId, dvGiuongTuChonId, denThoiGian } = values;

      updatePhongGiuong({
        id: state.currentItem?.id,
        giuongId,
        dvGiuongId,
        dvGiuongTuChonId,
        denThoiGian: denThoiGian
          ? moment(denThoiGian).format("DD-MM-YYYY HH:mm:ss")
          : null,
      }).then(() => {
        refreshList && refreshList();
        onClose();
      });
    });
  }

  return (
    <ModalStyled
      visible={state.show}
      width="65%"
      footer={null}
      closable={false}
      onCancel={onClose}
      title={
        <div className="header">
          <div className="header-title">Chỉnh sửa</div>
        </div>
      }
    >
      <Main>
        <FormWraper
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          onValuesChange={onValuesChange}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="Phòng"
                name="phongId"
                rules={[
                  {
                    required: state.currentItem?.loai != 30,
                    message: "Vui lòng chọn phòng",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phòng"
                  data={listRoom || []}
                  allowClear
                  disabled={isReadonly}
                />
              </Form.Item>

              <Form.Item
                label="Tên dịch vụ giường thường"
                name="dvGiuongId"
                rules={[
                  {
                    required: state.currentItem?.loai != 30,
                    message: "Vui lòng chọn dịch vụ giường",
                  },
                ]}
              >
                <Select
                  placeholder="Tên dịch vụ giường thường"
                  allowClear
                  data={(dsDVGiuong || []).filter((x) => x.phanLoai === 20)}
                  disabled={isReadonly}
                ></Select>
              </Form.Item>

              <Form.Item label="Nằm đến ngày" name="denThoiGian">
                <DatePicker
                  showTime
                  onChange={onChangeDate}
                  placeholder="Chọn ngày"
                  format="DD/MM/YYYY HH:mm:ss"
                  disabled={isReadonly}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Số hiệu giường"
                name="giuongId"
                rules={[
                  {
                    required: state.currentItem?.loai != 30,
                    message: "Vui lòng chọn số hiệu giường",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn số hiệu giường"
                  allowClear
                  data={(dsSoHieuGiuong || []).map((x) => ({
                    ...x,
                    ten: x.soHieu,
                  }))}
                  disabled={isReadonly}
                ></Select>
              </Form.Item>

              <Form.Item
                label="Tên dịch vụ giường tự chọn NB đăng kí thêm"
                name="dvGiuongTuChonId"
              >
                <Select
                  placeholder="Chọn dịch vụ giường"
                  allowClear
                  data={(dsDVGiuong || []).filter((x) => x.phanLoai === 10)}
                  disabled={isReadonly}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
        </FormWraper>

        <div className="footer-action">
          <div className="back-text cursor-pointer" onClick={onClose}>
            <ArrowLeftOutlined />
            &emsp;Quay lại
          </div>
          {!isReadonly && (
            <Button
              type="primary"
              ominWidth={100}
              rightIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Lưu
            </Button>
          )}
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChinhSua);
