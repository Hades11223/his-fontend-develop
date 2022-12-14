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
            label="M?? b??o c??o"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? b??o c??o!",
              },
              {
                max: 30,
                message: "Vui l??ng nh???p m?? b??o c??o kh??ng qu?? 30 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? b??o c??o!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? b??o c??o"
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
                    <u>Xem/S???a bi???u m???u</u>
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
                  T???i l??n m???u b??o c??o{" "}
                  <span style={{ color: "#ff4d4f" }}> * </span>
                </Upload>
                {state.invalidMauBaoCao && (
                  <div className="err-msg" style={{ color: "#ff4d4f" }}>
                    Vui l??ng t???i l??n m???u b??o c??o (excel)!
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
            label="T??n b??o c??o"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n b??o c??o!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n b??o c??o kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n b??o c??o!",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              className="input-option"
              placeholder="Vui l??ng nh???p t??n b??o c??o"
            />
          </Form.Item>
          <Form.Item label="Lo???i bi???u m???u" name="loai">
            <Select
              data={listLoaiBieuMau || []}
              placeholder="Vui l??ng ch???n lo???i bi???u m???u"
              onChange={(e) => setState({ loai: e })}
            />
          </Form.Item>

          {state.loai != 50 && (
            <>
              <Form.Item label="Kh??? gi???y" name="khoGiay">
                <Select
                  data={listKhoGiay}
                  placeholder="Ch???n kh??? gi???y"
                  onChange={onChangeKhoGiay}
                />
              </Form.Item>
              <Form.Item
                label="K??ch th?????c chi???u d???c(mm)"
                name="chieuDoc"
                rules={[
                  {
                    required: state.isRequiredKichThuoc,
                    message: "Vui l??ng nh???p k??ch th?????c chi???u d???c!",
                  },
                  {
                    pattern: /^[\d]{0,4}$/,
                    message:
                      "Vui l??ng nh???p k??ch th?????c chi???u d???c kh??ng qu?? 4 k?? t???!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Vui l??ng nh???p k??ch th?????c chi???u d???c"
                  type="number"
                />
              </Form.Item>
              <Form.Item
                label="K??ch th?????c chi???u ngang(mm)"
                name="chieuNgang"
                rules={[
                  {
                    required: state.isRequiredKichThuoc,
                    message: "Vui l??ng nh???p k??ch th?????c chi???u ngang!",
                  },
                  {
                    pattern: /^[\d]{0,4}$/,
                    message:
                      "Vui l??ng nh???p k??ch th?????c chi???u ngang kh??ng qu?? 4 k?? t???!",
                  },
                ]}
              >
                <InputNumber
                  className="input-option"
                  placeholder="Vui l??ng nh???p k??ch th?????c chi???u ngang"
                  type="number"
                />
              </Form.Item>
              <Form.Item label="H?????ng gi???y" name="huongGiay">
                <Select data={listHuongGiay} placeholder="Ch???n h?????ng gi???y" />
              </Form.Item>
              <Form.Item label="?????nh d???ng xu???t file" name="dinhDang">
                <Select
                  data={listDinhDangBaoCao || []}
                  placeholder="Ch???n ?????nh d???ng xu???t file"
                />
              </Form.Item>
              <Form.Item label="Lo???i phi???u" name="dsLoaiBaoCaoId">
                <Select
                  mode="multiple"
                  data={listAllLoaiPhieu || []}
                  placeholder="Vui l??ng nh???p t??n lo???i phi???u"
                />
              </Form.Item>
            </>
          )}

          <Form.Item label=" " name="kySo" valuePropName="checked">
            <Checkbox onChange={(e) => console.log(e.target.checked)}>
              K?? s???
            </Checkbox>
          </Form.Item>
          <Form.Item label=" " name="inNhanh" valuePropName="checked">
            <Checkbox>In nhanh</Checkbox>
          </Form.Item>
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
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
                <Form.Item label="Khu v???c k??" name="khuVucKy">
                  <Select
                    data={listKhuVucKy}
                    placeholder="Vui l??ng ch???n khu v???c k??"
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
              {"H???y"}
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
              {"L??u [F4]"}
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
