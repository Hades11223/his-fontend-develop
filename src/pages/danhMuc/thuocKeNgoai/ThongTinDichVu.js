import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Checkbox, Input, Form, Button } from "antd";
import Select from "components/Select";
import { ROLES } from "constants/index";
import { ThongTinDichVuStyle, Wrapper } from "./styled";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import { CloseOutlined } from "@ant-design/icons";

const ThongTinDichVu = ({
  dataEditDefault,
  createOrEdit,
  stateParent,
  setStateParent,
  listAllDonViTinh,
  listAllXuatXu,
}) => {
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    editStatus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (dataEditDefault) {
      setState({ ...stateParent });
      if (!stateParent.editStatus) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          ...dataEditDefault,
        });
      }
    }
  }, [dataEditDefault, stateParent]);

  useEffect(() => {}, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let editStatus = false;
        let formattedData = {
          ...values,
          active: true,
          donViTinhId: values.donViTinhId,
          donViTinh: listAllDonViTinh?.find(
            (item) => item?.id == values?.donViTinhId
          ),
          hamLuong: values.hamLuong,
          quyCach: values.quyCach,
          ten: values.ten,
          tenHoatChat: values.tenHoatChat,
          xuatXuId: values.xuatXuId,
          xuatXu: listAllXuatXu?.find((item) => item?.id == values?.xuatXuId),
        };
        if (state.editStatus) {
          formattedData = {
            ...formattedData,
            id: dataEditDefault.id,
            active: values.active,
            ma: dataEditDefault.ma,
          };
          editStatus = true;
        }
        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          if (!editStatus) {
            setStateParent({
              isSelected: false,
            });
          }
        });
      })
      .catch((error) => {});
  };

  const onChangeDonViTinh = (val) => {
    form.validateFields();
  };
  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setStateParent({
      isSelected: true,
    });
  };
  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_THEM];
    let roleEdit = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_SUA];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  const handleHiddenSave = () => {
    let roleSave = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_THEM];
    let roleEdit = [ROLES["DANH_MUC"].THUOC_KE_NGOAI_SUA];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEditDefault]);
  return (
    <ThongTinDichVuStyle>
      <Wrapper>
        <FormWraper
          // disabled={
          //     state.editStatus
          //         ? !checkRole([ROLES["DANH_MUC"].BAO_CAO_SUA])
          //         : !checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM])
          // }
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="Mã thuốc"
            name="ma"
            rules={
              [
                // {
                //     required: true,
                //     message: "Vui lòng nhập mã thuốc!",
                // },
                // {
                //     whitespace: true,
                //     message: "Vui lòng nhập mã thuốc!",
                // },
              ]
            }
          >
            <Input
              disabled={true}
              className="input-option"
              placeholder="Vui lòng nhập mã thuốc"
            />
          </Form.Item>
          <Form.Item
            label="Tên thuốc"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tên thuốc!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên tên thuốc!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui lòng nhập tên tên thuốc"
            />
          </Form.Item>
          <Form.Item label="Hoạt chất" name="tenHoatChat">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập hoạt chất"
            />
          </Form.Item>
          <Form.Item label="Đơn vị tính" name="donViTinhId">
            <Select
              data={listAllDonViTinh}
              placeholder="Chọn đơn vị tính"
              onChange={onChangeDonViTinh}
            />
          </Form.Item>
          <Form.Item label="Hàm lượng" name="hamLuong">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập hàm lượng"
            />
          </Form.Item>
          <Form.Item label="Quy cách" name="quyCach">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập quy cách"
            />
          </Form.Item>
          <Form.Item label="Nước sản xuất" name="xuatXuId">
            <Select
              data={listAllXuatXu || []}
              placeholder="Vui lòng nhập nước sản xuất"
            />
          </Form.Item>
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </FormWraper>

        {/* </CreatedWrapper> */}
        {
          <div className="button-bottom-modal">
            <Button
              className="button-cancel"
              onClick={handleCancel}
              hidden={handleHiddenCancel()}
            >
              {"Hủy"}
              <CloseOutlined />
            </Button>
            <Button
              className="button-ok"
              onClick={handleAdded}
              // loading={props.loading}
              hidden={handleHiddenSave()}
            >
              {"Lưu"}
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            </Button>
          </div>
        }
      </Wrapper>
    </ThongTinDichVuStyle>
  );
};

const mapStateToProps = ({
  thuocKeNgoai: { dataEditDefault },
  donViTinh: { listAllDonViTinh },
  xuatXu: { listAllXuatXu },
}) => {
  return {
    dataEditDefault,
    listAllDonViTinh,
    listAllXuatXu,
  };
};
const mapDispatchToProps = ({ thuocKeNgoai: { createOrEdit } }) => ({
  createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThongTinDichVu);
