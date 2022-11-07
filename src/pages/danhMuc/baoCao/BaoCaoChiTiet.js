import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Input, Form, InputNumber, Upload, message } from "antd";
import { Button } from "components";
import { HOST } from "client/request";
import Select from "components/Select";
import { ENUM, ROLES } from "constants/index";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import { BaoCaoChiTietStyle, Wrapper } from "./styled";
import uploadImg from "assets/images/his-core/import.png";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import { CloseOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ModalPhienBanBieuMau from "./ModalPhienBanBieuMau";
import IconEye from "assets/svg/ic-eye.svg";
import { t } from "i18next";
import ModalTaoPhienBanBieuMau from "./ModalTaoPhienBanBieuMau";
import IcTaoPhienBanMau from "assets/svg/danhMuc/ic-tao-phien-ban-mau.svg";
import { useEnum, useListAll, useStore } from "hook";
const BaoCaoChiTiet = ({
  stateParent,
  setStateParent,

  refCallbackSave = {},
}) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refAutoFocus = useRef(null);
  const refPhienBanBieuMau = useRef(null);
  const refTaoPhienBanBieuMau = useRef(null);

  const [listKhuVucKy] = useEnum(ENUM.KHU_VUC_KY, []);
  const {
    baoCao: { onSizeChange, updateData, createOrEdit },
  } = useDispatch();
  const { dataEditDefault } = useSelector((state) => state.baoCao);
  const [listHuongGiay] = useEnum(ENUM.HUONG_GIAY, []);
  const [listKhoGiay] = useEnum(ENUM.KHO_GIAY, []);
  const [listDinhDangBaoCao] = useEnum(ENUM.DINH_DANG_BAO_CAO, []);
  const [listLoaiBieuMau] = useEnum(ENUM.LOAI_BIEU_MAU, []);
  const [listAllLoaiPhieu] = useListAll("loaiPhieu");
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [stateParent]);
  useEffect(() => {
    if (dataEditDefault) {
      setState({ ...stateParent, loai: dataEditDefault?.loai });

      if (
        !stateParent.editStatus &&
        stateParent.mauBaoCao === null &&
        stateParent.defaultFileList?.length === 0 &&
        !stateParent.invalidMauBaoCao
      ) {
        form.resetFields();
      } else {
        if (
          dataEditDefault?.dsLoaiBaoCaoId?.length < 1 ||
          !dataEditDefault?.dsLoaiBaoCaoId
        ) {
          dataEditDefault.dsLoaiBaoCaoId = [];
        }
        form.setFieldsValue({
          ...dataEditDefault,
        });
      }
    }
  }, [dataEditDefault, stateParent]);

  useEffect(() => {
    onSizeChange({ size: 10 });
  }, []);
  const onShowModal = () => {
    if (dataEditDefault?.id) {
      refPhienBanBieuMau.current &&
        refPhienBanBieuMau.current.show(dataEditDefault.id);
    } else {
      message.error(t("danhMuc.vuiLongChonBieuMau"));
    }
  };
  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let editStatus = false;
        if (!state.mauBaoCao && state?.loai != 50) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
        let formattedData = {
          ...values,
          ma: values?.ma?.trim(),
          ten: values?.ten?.trim(),
          chieuDoc: values.chieuDoc || null,
          chieuNgang: values.chieuNgang || null,
          mauBaoCao: state.mauBaoCao,
          dinhDang: values.dinhDang || null,
          cauHinh: values.cauHinh || {},
          components: values.components || [],
          layout: values.layout || [],
          khoGiay: values.khoGiay || null,
          huongGiay: values.huongGiay || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
          editStatus = true;
        }

        createOrEdit(formattedData).then(() => {
          setStateParent({ mauBaoCao: null, defaultFileList: [] });
          updateData({ dataEditDefault: {} });
          form.resetFields();

          if (!editStatus) {
            setStateParent({
              isSelected: false,
            });
          }
        });
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

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
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
  const onViewEditor = () => {
    history.push(`/editor/config/${dataEditDefault?.id}`);
  };
  const createPhienBan = () => {
    refTaoPhienBanBieuMau.current &&
      refTaoPhienBanBieuMau.current.show(dataEditDefault);
  };
  return (
    <BaoCaoChiTietStyle>
      <Wrapper>
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
          initialValues={{ loai: 10 }}
        >
          <Form.Item
            label="Mã báo cáo"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã báo cáo!",
              },
              {
                max: 30,
                message: "Vui lòng nhập mã báo cáo không quá 30 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã báo cáo!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã báo cáo"
              ref={refAutoFocus}
              autoFocus
            />
          </Form.Item>
          <Form.Item label="" className="form-custom">
            {state?.loai == 50 ? (
              dataEditDefault?.id ? (
                <>
                  <img
                    style={{
                      marginRight: 10,
                      marginBottom: 5,
                      cursor: "pointer",
                      height: 15,
                      width: 15,
                      objectFit: "contain",
                    }}
                    src={require("assets/images/utils/edit.png")}
                    alt=""
                  />
                  <a href={`#`} onClick={onViewEditor}>
                    <u>Xem/Sửa biểu mẫu</u>
                  </a>
                </>
              ) : null
            ) : (
              <div className="image">
                <Upload
                  fileList={state.defaultFileList}
                  customRequest={({ onSuccess, onError, file }) => {
                    baoCaoProvider
                      .upload(file)
                      .then((response) => {
                        onSuccess(null, {});
                        setState({
                          invalidMauBaoCao: false,
                          mauBaoCao: response.data,
                          defaultFileList: [
                            {
                              uid: file.uid,
                              name: file.name,
                              url: `${HOST}/api/his/v1/files/${response?.data}`,
                            },
                          ],
                        });
                      })
                      .catch((e) => {
                        onError(e);
                        setState({
                          mauBaoCao: null,
                        });
                      });
                  }}
                  accept=".doc,.docx,.xls,.xlsx"
                  onRemove={(file) => {
                    setState({
                      mauBaoCao: null,
                      defaultFileList: [],
                    });
                  }}
                >
                  <img src={uploadImg} alt="importImg" />
                  Tải lên mẫu báo cáo{" "}
                  <span style={{ color: "#ff4d4f" }}> * </span>
                </Upload>
                {state.invalidMauBaoCao && (
                  <div className="err-msg" style={{ color: "#ff4d4f" }}>
                    Vui lòng tải lên mẫu báo cáo (excel)!
                  </div>
                )}
                {state.mauBaoCao && (
                  <IcTaoPhienBanMau
                    className="ic-tao-phien-ban"
                    onClick={createPhienBan}
                  ></IcTaoPhienBanMau>
                )}
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="Tên báo cáo"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên báo cáo!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên báo cáo không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên báo cáo!",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              className="input-option"
              placeholder="Vui lòng nhập tên báo cáo"
            />
          </Form.Item>
          <Form.Item label="Loại biểu mẫu" name="loai">
            <Select
              data={listLoaiBieuMau || []}
              placeholder="Vui lòng chọn loại biểu mẫu"
              onChange={(e) => setState({ loai: e })}
            />
          </Form.Item>

          {state.loai != 50 && (
            <>
              <Form.Item label="Khổ giấy" name="khoGiay">
                <Select
                  data={listKhoGiay}
                  placeholder="Chọn khổ giấy"
                  onChange={onChangeKhoGiay}
                />
              </Form.Item>
              <Form.Item
                label="Kích thước chiều dọc(mm)"
                name="chieuDoc"
                rules={[
                  {
                    required: state.isRequiredKichThuoc,
                    message: "Vui lòng nhập kích thước chiều dọc!",
                  },
                  {
                    pattern: /^[\d]{0,4}$/,
                    message:
                      "Vui lòng nhập kích thước chiều dọc không quá 4 ký tự!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Vui lòng nhập kích thước chiều dọc"
                  type="number"
                />
              </Form.Item>
              <Form.Item
                label="Kích thước chiều ngang(mm)"
                name="chieuNgang"
                rules={[
                  {
                    required: state.isRequiredKichThuoc,
                    message: "Vui lòng nhập kích thước chiều ngang!",
                  },
                  {
                    pattern: /^[\d]{0,4}$/,
                    message:
                      "Vui lòng nhập kích thước chiều ngang không quá 4 ký tự!",
                  },
                ]}
              >
                <InputNumber
                  className="input-option"
                  placeholder="Vui lòng nhập kích thước chiều ngang"
                  type="number"
                />
              </Form.Item>
              <Form.Item label="Hướng giấy" name="huongGiay">
                <Select data={listHuongGiay} placeholder="Chọn hướng giấy" />
              </Form.Item>
              <Form.Item label="Định dạng xuất file" name="dinhDang">
                <Select
                  data={listDinhDangBaoCao || []}
                  placeholder="Chọn định dạng xuất file"
                />
              </Form.Item>
              <Form.Item label="Loại phiếu" name="dsLoaiBaoCaoId">
                <Select
                  mode="multiple"
                  data={listAllLoaiPhieu || []}
                  placeholder="Vui lòng nhập tên loại phiếu"
                />
              </Form.Item>
            </>
          )}

          <Form.Item label=" " name="kySo" valuePropName="checked">
            <Checkbox onChange={(e) => console.log(e.target.checked)}>
              Ký số
            </Checkbox>
          </Form.Item>
          <Form.Item label=" " name="inNhanh" valuePropName="checked">
            <Checkbox>In nhanh</Checkbox>
          </Form.Item>
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.kySo !== currentValues.kySo
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("kySo") === true ? (
                <Form.Item label="Khu vực ký" name="khuVucKy">
                  <Select
                    data={listKhuVucKy}
                    placeholder="Vui lòng chọn khu vực ký"
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </FormWraper>

        <div className="button-bottom-modal">
          <div className="action-left">
            <Button
              type="default"
              onClick={onShowModal}
              rightIcon={<IconEye />}
              iconHeight={20}
              minWidth={100}
            >
              {t("danhMuc.phienBanBieuMau")}
            </Button>
          </div>
          <div className="action-right">
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
        </div>
      </Wrapper>
      <ModalPhienBanBieuMau ref={refPhienBanBieuMau}></ModalPhienBanBieuMau>
      <ModalTaoPhienBanBieuMau
        ref={refTaoPhienBanBieuMau}
      ></ModalTaoPhienBanBieuMau>
    </BaoCaoChiTietStyle>
  );
};

export default BaoCaoChiTiet;
