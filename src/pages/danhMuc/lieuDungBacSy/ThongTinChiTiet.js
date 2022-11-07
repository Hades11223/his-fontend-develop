import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form, Button, Select as SelectAntd } from "antd";
import Select from "components/Select";
import { ROLES } from "constants/index";
import { Main, ThongTinDichVuStyle, Wrapper } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import { CloseOutlined } from "@ant-design/icons";
const ThongTinDichVu = ({
  dataEditDefault,
  createOrEdit,
  stateParent,
  setStateParent,
  listAllDuongDung,
  listAccount,
  auth,
  onSizeChange,
  layerId,
  ...props
}) => {
  const refClickBtnSave = useRef();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    editStatus: false,
  });
  const { onRegisterHotkey } = useDispatch().phimTat;

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
        form.setFieldsValue({
          ...dataEditDefault,
        });
      } else {
        let account = listAccount?.find(
          (item) => item?.nhanVienId == dataEditDefault?.bacSiId
        );
        console.log(account);
        let dataEdit = {
          ...dataEditDefault,
          bacSiId: account?.nhanVienId,
        };
        form.setFieldsValue({
          ...dataEdit,
        });
      }
    }
  }, [dataEditDefault, stateParent]);

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let editStatus = false;
        const bs = listAccount?.find(
          (item) => +item?.nhanVienId == dataEditDefault.bacSiId
        );
        debugger;
        let formattedData = {
          active: true,
          bacSiId: state.editStatus ? bs?.nhanVienId : auth.nhanVienId,
          bacSi: { ...bs?.nhanVien },
          duongDungId: values.duongDungId,
          duongDung: listAllDuongDung?.find(
            (item) => item?.id == values?.duongDungId
          ),
          ghiChu: values.ghiChu,
          slSang: values.slSang,
          slChieu: values.slChieu,
          slToi: values.slToi,
          slDem: values.slDem,
          ten: values.ten,
          thoiDiem: values.thoiDiem,
        };
        if (state.editStatus) {
          formattedData = {
            ...formattedData,
            id: dataEditDefault.id,
            ma: dataEditDefault.ma,
            active: values.active,
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
          onSizeChange({ size: 10 });
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onChangeDuongDung = (val) => {
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
    let roleSave = [ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM];
    let roleEdit = [ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA];
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
    let roleSave = [ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM];
    let roleEdit = [ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA];
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
  const refAutofocus = useRef(null);
  useEffect(() => {
    if (refAutofocus.current) {
      refAutofocus.current.focus();
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
            label="Mã liều dùng"
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
              // placeholder="Vui lòng nhập mã liều dùng"
            />
          </Form.Item>
          <Form.Item
            label="Tên liều dùng"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên liều dùng!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên liều dùng!",
              },
            ]}
          >
            <Input
              ref={refAutofocus}
              autoFocus={true}
              className="input-option"
              placeholder="Vui lòng nhập tên liều dùng"
            />
          </Form.Item>
          <Form.Item
            label="SL dùng sáng"
            name="slSang"
            rules={[
              {
                pattern: /^\d{1,}(\/[1-9]{1,})*$/,
                message:
                  "Chỉ được phép nhập số nguyên hoặc phân số (Số nguyên / Số nguyên)",
              },
            ]}
          >
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập số lượng dùng sáng"
            />
          </Form.Item>
          <Form.Item
            label="SL dùng chiều"
            name="slChieu"
            rules={[
              {
                pattern: /^\d{1,}(\/[1-9]{1,})*$/,
                message:
                  "Chỉ được phép nhập số nguyên hoặc phân số (Số nguyên / Số nguyên)",
              },
            ]}
          >
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập số lượng dùng chiều"
            />
          </Form.Item>
          <Form.Item
            label="SL dùng tối"
            name="slToi"
            rules={[
              {
                pattern: /^\d{1,}(\/[1-9]{1,})*$/,
                message:
                  "Chỉ được phép nhập số nguyên hoặc phân số (Số nguyên / Số nguyên)",
              },
            ]}
          >
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập số lượng dùng tối"
            />
          </Form.Item>
          <Form.Item
            label="SL dùng đêm"
            name="slDem"
            rules={[
              {
                pattern: /^\d{1,}(\/[1-9]{1,})*$/,
                message:
                  "Chỉ được phép nhập số nguyên hoặc phân số (Số nguyên / Số nguyên)",
              },
            ]}
          >
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập số lượng dùng đêm"
            />
          </Form.Item>
          <Form.Item label="Thời điểm dùng" name="thoiDiem">
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập thời điểm dùng"
            />
          </Form.Item>
          <Form.Item
            label="Đường dùng"
            name="duongDungId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn đường dùng!",
              },
            ]}
          >
            <Select
              data={listAllDuongDung}
              placeholder="Chọn đường dùng"
              onChange={onChangeDuongDung}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="ghiChu">
            <Input
              className="input-option"
              style={{ width: "100%" }}
              placeholder="Vui lòng nhập ghi chú"
            />
          </Form.Item>
          <Form.Item label="Bác sĩ chỉ định" name="bacSiId">
            <SelectAntd
              disabled={true}
              data={listAccount || []}
              placeholder="Vui lòng chọn bác sĩ chỉ định"
            >
              {listAccount.map((option) => (
                <SelectAntd.Option
                  key={option?.nhanVienId}
                  value={option?.nhanVienId}
                >
                  {option?.nhanVien?.ten}
                </SelectAntd.Option>
              ))}
            </SelectAntd>
          </Form.Item>
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </FormWraper>

        {/* </CreatedWrapper> */}
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
            {"Lưu [F4]"}
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          </Button>
        </div>
      </Wrapper>
    </ThongTinDichVuStyle>
  );
};

const mapStateToProps = ({
  lieuDung: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  duongDung: { listAllDuongDung },
  adminTaiKhoanHeThong: { listAccount },
  auth: { auth },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listAccount,
    listAllDuongDung,
    auth,
  };
};
const mapDispatchToProps = ({
  lieuDung: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThongTinDichVu);
