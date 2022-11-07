import { Button, Input, Form, DatePicker } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Main, ModalStyle } from "./styled";
import Select from "components/Select";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcSave from "assets/images/thuNgan/icSave.png";
const ModalDichVu = (props, ref) => {
  const [state, _setState] = useState({ title: "Thêm mới: Hàng hóa" });
  const [open, setOpen] = useState();
  const [currentItem, setCurrentItem] = useState([]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);
  const loadCurrentItem = (currentItem) => {
    const data = {

    };
    form.setFieldsValue(data);
    setState({
      data: data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data) => {
      if (data) {
        setCurrentItem(data);
        setState({ title: "Chỉnh sửa: Hàng hóa" });
      }
      setOpen(true);
    },
  }));
  const onChange = () => {
    form.setFieldsValue({
      ma: "T002",
    });
  };

  const onSave = () => {
    onCanceled();
  };

  const onCanceled = () => {
    setOpen(false);
  };

  return (
    <ModalStyle visible={open} footer={null} closable={false}>
      <Main>
        <div className="header">
          <div className="header__left">{state.title}</div>
          <div className="header__right">
            <Button>
              <span>Thêm hàng hóa</span>
              <img src={IcCreate} alt="IcCreate"></img>
            </Button>
          </div>
        </div>

        <Form
          form={form}
          className="form-custom"
          style={{ width: "100%" }}
          layout="vertical"
        >
          <Form.Item label="Dịch vụ" name="ten">
            <Select
              placeholder="Vui lòng nhập dịch vụ"
              //   onChange={() => onChange()}
            />
          </Form.Item>
          <Form.Item label="Giá nhập trước VAT" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập giá nhập trước VAT"
            />
          </Form.Item>
          <Form.Item label="Hàm lượng" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập hàm lượng"
            />
          </Form.Item>
          <Form.Item label="Giá trần" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập giá trần"
            />
          </Form.Item>

          <Form.Item label="Số lượng" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập số lượng"
            />
          </Form.Item>
          <Form.Item label="VAT" name="ma">
            <Input className="input-option" placeholder="Vui lòng nhập VAT" />
          </Form.Item>
          <Form.Item label="Quy cách" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập quy cách"
            />
          </Form.Item>
          <Form.Item label="Phụ thu" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập phụ thu"
            />
          </Form.Item>

          <Form.Item label="Số lô" name="ma">
            <Input className="input-option" placeholder="Vui lòng nhập số lô" />
          </Form.Item>
          <Form.Item label="Giá nhập sau VAT" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập giá nhập sau VAT"
            />
          </Form.Item>
          <Form.Item label="Tên gốc" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên gốc"
            />
          </Form.Item>
          <Form.Item label="Đơn giá BH" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập đơn giá BH"
            />
          </Form.Item>

          <Form.Item label="Ngày sản xuất">
            <DatePicker
              placeholder="Vui lòng chọn ngày sản xuất"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
          <Form.Item label="Thặng số bán lẻ" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập thặng số bán lẻ"
            />
          </Form.Item>
          <Form.Item label="Mã hoạt chất" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã hoạt chất"
            />
          </Form.Item>
          <Form.Item label="Đơn giá không BH" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập đơn giá không BH"
            />
          </Form.Item>

          <Form.Item label="Nước sản xuất" name="ma">
            <Select placeholder="Vui lòng nhập nước sản xuất" />
          </Form.Item>
          <Form.Item label="Tiền chiết khấu" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tiefn chiết khấu"
            />
          </Form.Item>
          <Form.Item label="Mã DV" name="ma">
            <Input className="input-option" />
          </Form.Item>
          <Form.Item label="Tỉ lệ thanh toán" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tỉ lệ thanh toán"
            />
          </Form.Item>

          <Form.Item label="Nhà sản xuất" name="ma">
            <Select
              className="input-option"
              placeholder="Vui lòng nhập nhà sản xuất"
            />
          </Form.Item>
          <Form.Item label="Tỉ lệ chiết khấu" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tỉ lệ chiết khấu"
            />
          </Form.Item>
          <Form.Item label="ĐVT" name="ma">
            <Input className="input-option" placeholder="Vui lòng nhập ĐVT" />
          </Form.Item>
          <Form.Item label="Thành tiền" name="ma">
            <Input className="input-option" />
          </Form.Item>

          <Form.Item label="HSD">
            <DatePicker
              className="input-option"
              placeholder="Vui lòng chọn hạn sử dụng"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item></Form.Item>
          <Form.Item label="Thành tiền sửa đổi" name="ma">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã dịch vụ"
            />
          </Form.Item>
        </Form>
        <div className="footer">
          <div className="left">
            <Button className="btn-cancled" onClick={onCanceled}>
              Hủy
            </Button>
          </div>
          <div className="right">
            <Button className="btn-save" onClick={onSave}>
              <span>Lưu lại</span>
              <img src={IcSave} alt="..." />
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyle>
  );
};

export default forwardRef(ModalDichVu);
