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
            label="M?? thu???c"
            name="ma"
            rules={
              [
                // {
                //     required: true,
                //     message: "Vui l??ng nh???p m?? thu???c!",
                // },
                // {
                //     whitespace: true,
                //     message: "Vui l??ng nh???p m?? thu???c!",
                // },
              ]
            }
          >
            <Input
              disabled={true}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? thu???c"
            />
          </Form.Item>
          <Form.Item
            label="T??n thu???c"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n t??n thu???c!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n t??n thu???c!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui l??ng nh???p t??n t??n thu???c"
            />
          </Form.Item>
          <Form.Item label="Ho???t ch???t" name="tenHoatChat">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui l??ng nh???p ho???t ch???t"
            />
          </Form.Item>
          <Form.Item label="????n v??? t??nh" name="donViTinhId">
            <Select
              data={listAllDonViTinh}
              placeholder="Ch???n ????n v??? t??nh"
              onChange={onChangeDonViTinh}
            />
          </Form.Item>
          <Form.Item label="H??m l?????ng" name="hamLuong">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui l??ng nh???p h??m l?????ng"
            />
          </Form.Item>
          <Form.Item label="Quy c??ch" name="quyCach">
            <Input
              style={{ width: "100%" }}
              placeholder="Vui l??ng nh???p quy c??ch"
            />
          </Form.Item>
          <Form.Item label="N?????c s???n xu???t" name="xuatXuId">
            <Select
              data={listAllXuatXu || []}
              placeholder="Vui l??ng nh???p n?????c s???n xu???t"
            />
          </Form.Item>
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
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
              {"H???y"}
              <CloseOutlined />
            </Button>
            <Button
              className="button-ok"
              onClick={handleAdded}
              // loading={props.loading}
              hidden={handleHiddenSave()}
            >
              {"L??u"}
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
