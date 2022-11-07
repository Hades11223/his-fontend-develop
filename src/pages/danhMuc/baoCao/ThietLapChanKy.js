import React, { useState, useEffect, useMemo } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Col, Form, InputNumber, Row, Radio, Select } from "antd";
import { Button } from "components";
import { CloseOutlined } from "@ant-design/icons";
// import Select from "components/Select";
import { ROLES } from "constants/index";
import { BaoCaoChiTietStyle, WrapperThietLapChanKy } from "./styled";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
const { Option } = Select;
const ThietLapChanKy = ({
  dataEditDefault,
  stateParent,
  dataChanKy,
  patchThietLapChanKy,
  setStateParent,
  getUtils,
  updateData,

  refCallbackSave = {},
  ...props
}) => {
  const {
    quyenKy: { listAllQuyenKy },
    utils: { listloaiKy },
  } = useSelector((state) => state);

  const {
    quyenKy: { getListAllQuyenKy },
    baoCao: { createThietLapChanKy },
  } = useDispatch();
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    soCapKy: 6,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getUtils({ name: "loaiKy" });
    getListAllQuyenKy({ page: "", size: "" });
  }, []);
  useEffect(() => {
    if (dataEditDefault) {
      setState({ ...stateParent, soCapKy: dataChanKy?.soCapKy || 6 });
      if (!stateParent.editStatus || !dataChanKy) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          ...dataChanKy,
          ...[1, 2, 3, 4, 5, 6].reduce(
            (a, b) => ({
              ...a,
              ["dsTenChanKy" + b]: dataChanKy["dsTenChanKy" + b] || [],
            }),
            {}
          ),
        });
      }
    }
  }, [dataEditDefault, stateParent, dataChanKy]);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then(async (values) => {
        let success = false;
        if (state.editStatus && dataChanKy) {
          if (dataEditDefault?.id) {
            values.baoCaoId = dataEditDefault.id;
            let res = await patchThietLapChanKy({
              ...values,
              id: dataEditDefault.id,
            });
            // if (res?.data) {
            //     success = true
            // }
          }
        } else {
          if (dataEditDefault?.id) {
            values.baoCaoId = dataEditDefault.id;
            let res = await createThietLapChanKy(values);
            if (res?.data) {
              success = true;
            }
          }
        }
        if (success) {
          setStateParent({
            isSelected: false,
          });
        }
      })
      .catch((error) => {
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
      });
  };
  refCallbackSave.current = handleAdded;

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataChanKy);
    } else {
      form.resetFields();
    }
    setStateParent({
      isSelected: true,
    });
  };
  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
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
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
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
  const handleDropdownVisibleChange = (open) => {
    document.querySelector("#containerElement").style.overflowY = open
      ? "hidden"
      : "auto";
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  // const onChange = (key) = (e) => {

  // }
  const childrenListQuyenKy = (listAllQuyenKy || []).map((item, index) => {
    return <Option key={index} value={item?.id}>{`${item?.ten}`}</Option>;
  });
  return (
    <BaoCaoChiTietStyle>
      <WrapperThietLapChanKy>
        <FormWraper
          disabled={
            state.editStatus
              ? !checkRole([ROLES["DANH_MUC"].BAO_CAO_SUA])
              : !checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM])
          }
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Row style={{ padding: 0 }}>
            <Col span={24}>
              <Form.Item label="Số cấp ký" name="soCapKy">
                <InputNumber
                  style={{ width: "200px" }}
                  max={6}
                  className="input-option"
                  placeholder="Vui lòng nhập số cấp ký"
                  type="number"
                  min={1}
                  decimalSeparator={true}
                  onKeyDown={(evt) =>
                    (evt.key === "e" || evt.key === "-") && evt.preventDefault()
                  }
                  onChange={(soCapKy) => {
                    setState({ soCapKy: soCapKy || 6 });
                  }}
                />
              </Form.Item>
            </Col>

            {/* -------------------------------- Header ký */}
            <Col span={4} className="item-title"></Col>
            <Col span={7}>
              <Form.Item label="Loại ký" className="item-title item-custom"></Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Quyền ký" className="item-title item-custom"></Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="Tên chân ký"
                className="item-title item-custom"
              ></Form.Item>
            </Col>
            {/* --------------------------------End Header ký */}

            {/* --------------------------------các loại ký */}
            {useMemo(() => {
              return [1, 2, 3, 4, 5, 6].map((item, index) => {
                return index < state.soCapKy ? (
                  <React.Fragment key={index}>
                    <Col span={4}>
                      <Form.Item
                        label={`Cấp ký ${index + 1}`}
                        className="item-custom"
                      ></Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        name={`loaiKy${index + 1}`}
                        className="item-custom"
                      >
                        <Radio.Group
                          // defaultValue={10}
                          value={state && Number(state[`loaiKy${index + 1}`])}
                          name={`loaiKy${index + 1}`}
                          onChange={(e) => {
                            setState({
                              [e.target.name]: e.target.value,
                            });
                          }}
                        >
                          {listloaiKy &&
                            listloaiKy.map((itemLoaiKy) => (
                              <>
                                <Radio
                                  onClick={(e) => {
                                    const value = e.target
                                      ? e.target?.value
                                      : e;
                                    if (value == state[`loaiKy${index + 1}`]) {
                                      setState({
                                        [`loaiKy${index + 1}`]: null,
                                      });
                                      form.setFieldsValue({
                                        [`loaiKy${index + 1}`]: null,
                                      });
                                      return;
                                    }
                                    setState({
                                      [`loaiKy${index + 1}`]: value,
                                    });
                                  }}
                                  key={itemLoaiKy.id}
                                  value={itemLoaiKy.id}
                                >
                                  {itemLoaiKy.ten}
                                </Radio>
                              </>
                            ))}
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        className="item-custom"
                        name={`quyenKy${index + 1}Id`}
                      >
                        <Select
                          // mode="multiple"
                          showSearch
                          allowClear
                          onClear={() => {
                            updateData({
                              dataEditDefault: {
                                ...dataEditDefault,
                                chanKy: {
                                  ...dataEditDefault.chanKy,
                                  [`quyenKy${index + 1}Id`]: null,
                                  [`quyenKy${index + 1}`]: null,
                                  [`loaiKy${index + 1}`]: null,
                                },
                              },
                              dataChanKy: {
                                ...dataChanKy,
                                [`quyenKy${index + 1}Id`]: null,
                                [`quyenKy${index + 1}`]: null,
                                [`loaiKy${index + 1}`]: null,
                              },
                            });
                          }}
                          style={{ width: "100%" }}
                          placeholder="Chọn quyền ký"
                          // value={(dataSelect.dsCdChinhId || []).map((item) => item + "")}
                          // onChange={handleChangeData("dsCdChinhId")}
                          // onDropdownVisibleChange={handleDropdownVisibleChange}
                          filterOption={filterOption}
                        >
                          {childrenListQuyenKy}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        className="item-custom"
                        name={`dsTenChanKy${index + 1}`}
                      >
                        <Select
                          mode="tags"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Nhập tên chân ký"
                          // value={(dataSelect.dsCdChinhId || []).map((item) => item + "")}
                          // onChange={handleChangeData("dsCdChinhId")}
                          // onDropdownVisibleChange={handleDropdownVisibleChange}
                        ></Select>
                      </Form.Item>
                    </Col>
                  </React.Fragment>
                ) : (
                  <Col span={24} style={{ minHeight: 10 }}></Col>
                );
              });
            }, [listAllQuyenKy, listloaiKy, state])}

            <Col span={24}>
              <div style={{ paddingLeft: 12 }}>Kích thước ảnh ký</div>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Chiều cao ảnh (mm)"
                name="chieuCaoAnhKy"
                // rules={[
                //     {
                //         required: state.isRequiredKichThuoc,
                //         message: "Vui lòng nhập kích thước chiều ngang!",
                //     },
                //     {
                //         pattern: /^[\d]{0,4}$/,
                //         message:
                //             "Vui lòng nhập kích thước chiều ngang không quá 4 ký tự!",
                //     },
                // ]}
              >
                <InputNumber
                  // style={{ width: "200px" }}
                  className="input-option"
                  placeholder="Vui lòng nhập chiều cao ảnh"
                  type="number"
                  onKeyDown={(evt) =>
                    (evt.key === "e" || evt.key === "-") && evt.preventDefault()
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Chiều rộng ảnh (mm)"
                name="chieuRongAnhKy"
                // rules={[
                //     {
                //         required: state.isRequiredKichThuoc,
                //         message: "Vui lòng nhập kích thước chiều ngang!",
                //     },
                //     {
                //         pattern: /^[\d]{0,4}$/,
                //         message:
                //             "Vui lòng nhập kích thước chiều ngang không quá 4 ký tự!",
                //     },
                // ]}
              >
                <InputNumber
                  // style={{ width: "200px" }}
                  className="input-option"
                  placeholder="Vui lòng nhập chiều rộng ảnh"
                  type="number"
                  onKeyDown={(evt) =>
                    (evt.key === "e" || evt.key === "-") && evt.preventDefault()
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </FormWraper>

        {/* </CreatedWrapper> */}
        <div className="button-bottom-modal">
          <Button
            type="default"
            onClick={handleCancel}
            hidden={handleHiddenCancel()}
            rightIcon={<CloseOutlined />}
            iconHeight={15}
            minWidth={100}
          >
            {"Hủy"}
          </Button>
          <Button
            type="primary"
            onClick={handleAdded}
            // loading={props.loading}
            hidden={handleHiddenSave()}
            rightIcon={
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            }
            iconHeight={15}
            minWidth={100}
          >
            {"Lưu [F4]"}
          </Button>
        </div>
      </WrapperThietLapChanKy>
    </BaoCaoChiTietStyle>
    // </Col>
  );
};

const mapStateToProps = ({ baoCao: { dataEditDefault, dataChanKy } }) => {
  return {
    dataEditDefault,
    dataChanKy,
  };
};
const mapDispatchToProps = ({
  baoCao: { updateData, patchThietLapChanKy },
  utils: { getUtils },
}) => ({
  getUtils,
  updateData,
  patchThietLapChanKy,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThietLapChanKy);
