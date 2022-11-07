import React, { useEffect, useState } from "react";
import { Checkbox, Col, Form, Input, InputNumber, Row } from "antd";
import Select from "components/Select";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import FormWraper from "components/FormWraper";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { ThongTinDichVuCpn } from "../styled";

const { TextArea } = Input;

const ThongTinDichVu = ({ form, editStatus, changeFormEdit }, ref) => {
  const {
    utils: { listdoiTuong = [], listloaiMienGiam = [] },
    loaiDoiTuong: { dataEditDefault },
  } = useSelector((state) => state);

  const [readOnlyMienGiam, setReadOnlyMienGiam] = useState(false);

  function onChangeLoaiMienGiam(value) {
    setReadOnlyMienGiam(value === 20);
  }

  useEffect(() => {
    if (!isEmpty(dataEditDefault)) {
      setReadOnlyMienGiam(dataEditDefault?.loaiMienGiam === 20);
    }
  }, [dataEditDefault]);

  const handleCheckRole = () =>
    editStatus
      ? checkRole([ROLES["DANH_MUC"].LOAI_DOI_TUONG_SUA])
      : checkRole([ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM]);

  return (
    <ThongTinDichVuCpn>
      <FormWraper
        disabled={!handleCheckRole}
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
        initialValues={{ loai: 10 }}
        onValuesChange={() => {
          changeFormEdit(true);
        }}
      >
        <Row gutter={[24, 0]}>
          <Col span={12}>
            <Form.Item
              label="Mã loại đối tượng"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã loại đối tượng!",
                },
                {
                  max: 20,
                  message:
                    "Vui lòng nhập mã loại đối tượng không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã loại đối tượng!",
                },
              ]}
            >
              <Input
                ref={ref}
                autoFocus={!!ref.current?.focus}
                className="input-option"
                placeholder="Vui lòng nhập mã loại đối tượng"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên loại đối tượng"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên loại đối tượng!",
                },
                {
                  max: 1000,
                  message:
                    "Vui lòng nhập tên loại đối tượng không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên loại đối tượng!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên loại đối tượng"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đối tượng"
              name="doiTuong"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tượng!",
                },
              ]}
            >
              <Select data={listdoiTuong} placeholder="Chọn đối tượng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Loại miễn giảm" name="loaiMienGiam">
              <Select
                data={listloaiMienGiam}
                placeholder="Chọn loại miễn giảm"
                onChange={onChangeLoaiMienGiam}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="% miễn giảm" name="phanTramMienGiam">
              <InputNumber
                type="number"
                placeholder="Nhập % miễn giảm"
                className="input-option"
                readOnly={readOnlyMienGiam}
                min={0}
                max={100}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tiền miễn giảm" name="tienMienGiam">
              <InputNumber
                type="number"
                placeholder="Nhập tiền miễn giảm"
                className="input-option"
                readOnly={readOnlyMienGiam}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="" name="quanNhan" valuePropName="checked">
              <Checkbox>Quân nhân</Checkbox>
            </Form.Item>
            <Form.Item label="" name="tamUngNgoaiTru" valuePropName="checked">
              <Checkbox>Yêu cầu tạm ứng ngoại trú</Checkbox>
            </Form.Item>
            <Form.Item label="" name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
            <Form.Item label="" name="khamSucKhoe" valuePropName="checked">
              <Checkbox>Khám sức khỏe</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ghi chú"
              name="ghiChu"
              rules={[
                {
                  max: 1000,
                  message: "Vui lòng nhập ghi chú không quá 1000 ký tự!",
                },
              ]}
            >
              <TextArea
                showCount={true}
                maxLength={1000}
                rows="4"
                placeholder="Nhập ghi chú"
              />
            </Form.Item>
          </Col>
        </Row>
      </FormWraper>
    </ThongTinDichVuCpn>
  );
};

export default React.forwardRef(ThongTinDichVu);
