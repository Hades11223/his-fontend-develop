import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ThongTinChiTiet from "../thongTinChiTiet";
import { GlobalStyle, Main } from "./styled";
import { Button } from "components";
import moment from "moment";
const ModalCapNhatThongTin = (props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();
  const {
    nhaSanXuat: {
      getListNhaSanXuat,
      createOrEdit,
      createOrEditDoiTacLichSu,
      getListLichSuThayDoi,
    },
  } = useDispatch();
  const {
    utils: { listloaiDoiTac = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
  } = useSelector((state) => state);
  useImperativeHandle(ref, () => ({
    show: ({ dataEditDefault, isEdit = false }, callback) => {
      setState({ show: true, dataEditDefault, isEdit });
      const newData = {
        ...dataEditDefault,
        denNgay: isEdit ? dataEditDefault.denNgay : null,
      };
      form.setFieldsValue(newData);
    },
  }));
  const handleCancel = () => {
    setState({
      show: false,
    });
    form.setFieldsValue({});
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          id: state.dataEditDefault.id,
          tuNgay: values?.tuNgay || moment(new Date()).format("YYYY-MM-DD"),
        };
        if (!state?.isEdit) {
          createOrEdit(values).then(() => {
            getListNhaSanXuat({ page: 0 });
          });
        }
        createOrEditDoiTacLichSu({
          id: state.dataEditDefault.id,
          values,
          isEdit: state?.isEdit,
        }).then(() => {
          getListLichSuThayDoi({
            page: 0,
            doiTacId: state?.isEdit ? values.doiTacId : values.id,
            size: 10,
          });
        });
        setState({
          show: false,
        });
      })
      .catch((error) => {});
  };
  return (
    <Main>
      <GlobalStyle />
      <Modal
        width={1000}
        visible={state.show}
        onCancel={handleCancel}
        footer={[
          <Button type="text" onClick={handleCancel} height={30}>
            Quay lại
          </Button>,
          <Button type="success" onClick={handleUpdate} height={30}>
            Cập nhật thông tin
          </Button>,
        ]}
        closeIcon={false}
        title="Cập nhật thông tin"
      >
        <ThongTinChiTiet
          editStatus={true}
          handleCancel={handleCancel}
          listloaiDoiTac={listloaiDoiTac}
          listAllNhomDichVuCap1={listAllNhomDichVuCap1}
          dataEditDefault={state.dataEditDefault}
          form={form}
          isModal={true}
        ></ThongTinChiTiet>
      </Modal>
    </Main>
  );
};

export default forwardRef(ModalCapNhatThongTin);
