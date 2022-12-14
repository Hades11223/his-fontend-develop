import React, { useEffect, useRef, useState } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import Select from "components/Select";
import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import { openInNewTab } from "utils";
import { useSelector } from "react-redux";
import { Button } from "components";
import { Main } from "./styled";
import ModalCapNhatThongTin from "./components/ModalCapNhatThongTin";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ThongTinChiTiet = (props) => {
  const [isRequireNhomDv, setIsRequireNhomDv] = useState(false);
  const [isRequireLoaiDv, setIsRequireLoaiDv] = useState(true);

  const {
    nhaSanXuat: { dataEditDefault },
  } = useSelector((state) => state);
  const {
    editStatus,
    listAllNhomDichVuCap1,
    listloaiDoiTac,
    listloaiDichVu,
    handleCancel = () => {},
    handleAdded = () => {},
    form,
    isModal = false,
  } = props;
  const refModalCapNhatThongTin = useRef(null);
  const dateFormat = "DD/MM/YYYY";
  const handleChange = (e) => {
    if ((e || []).filter((item) => item === 10 || item === 20).length === 0) {
      setIsRequireNhomDv(false);
    } else {
      setIsRequireNhomDv(true);
    }

    if (
      (e || []).filter((item) => item === 30 || item === 40 || item === 50)
        .length === 0
    ) {
      setIsRequireLoaiDv(true);
    } else {
      setIsRequireLoaiDv(false);
    }
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (dataEditDefault) {
      if (
        (dataEditDefault.dsLoaiDoiTac || []).filter(
          (item) => item === 10 || item === 20
        ).length === 0
      ) {
        setIsRequireNhomDv(false);
      } else {
        setIsRequireNhomDv(true);
      }

      if (
        (dataEditDefault.dsLoaiDoiTac || []).filter(
          (item) => item === 30 || item === 40 || item === 50
        ).length === 0
      ) {
        setIsRequireLoaiDv(true);
      } else {
        setIsRequireLoaiDv(false);
      }

      if (dataEditDefault.dsLoaiDichVu === null) {
        form.setFieldsValue({ dsLoaiDichVu: [] });
      }
    }
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEditDefault]);
  const handleCapNhatThongTin = () => {
    if (refModalCapNhatThongTin.current) {
      refModalCapNhatThongTin.current.show({
        dataEditDefault: {
          ...dataEditDefault,
          tuNgay: moment(new Date()),
        },
      });
    }
  };
  return (
    <Main>
      <EditWrapper
        title="Th??ng tin chi ti???t"
        onCancel={handleCancel}
        onSave={handleAdded}
        showAdded={false}
        isShowSaveButton={!isModal}
        isShowCancelButton={!isModal}
        isShowTitle={!isModal}
        roleSave={[ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA]}
        editStatus={
          editStatus
            ? !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA])
            : !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM])
        }
        isHiddenButtonAdd={true}
        forceShowButtonSave={
          (dataEditDefault &&
            checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA]) &&
            true) ||
          false
        }
        forceShowButtonCancel={
          (dataEditDefault &&
            checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA]) &&
            true) ||
          false
        }
        leftActions={
          !isModal && (
            <Button type="success" onClick={handleCapNhatThongTin} height={30}>
              C???p nh???t th??ng tin
            </Button>
          )
        }
      >
        <fieldset
          disabled={
            editStatus
              ? !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA])
              : !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM])
          }
        >
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom form-custom--one-line"
          >
            <Form.Item
              label="M?? ?????i t??c"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p M?? ?????i t??c!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p M?? ?????i t??c kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p M?? ?????i t??c!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p M?? ?????i t??c"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="T??n ?????i t??c"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p T??n ?????i t??c!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p T??n ?????i t??c kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p T??n ?????i t??c!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p T??n ?????i t??c"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
                >
                  Nh??m DV
                </div>
              }
              name="dsNhomDichVuCap1Id"
              rules={[
                {
                  required: isRequireNhomDv,
                  message: "Vui l??ng ch???n nh??m DV!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={"ch???n nh??m DV"}
                data={listAllNhomDichVuCap1}
              />
            </Form.Item>
            <Form.Item
              label="Lo???i ?????i t??c"
              name="dsLoaiDoiTac"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n lo???i ?????i t??c!",
                },
              ]}
            >
              <Select
                onChange={handleChange}
                mode="multiple"
                placeholder={"ch???n lo???i ?????i t??c"}
                data={listloaiDoiTac}
              />
            </Form.Item>
            <Form.Item
              label="Lo???i d???ch v???"
              name="dsLoaiDichVu"
              rules={[
                {
                  required: isRequireLoaiDv,
                  message: "Vui l??ng ch???n lo???i d???ch v???!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={"ch???n lo???i d???ch v???"}
                data={listloaiDichVu}
              />
            </Form.Item>
            <Form.Item label="M?? s??? thu???" name="maSoThue">
              <Input className="input-option" placeholder="Nh???p m?? s??? thu???" />
            </Form.Item>
            <Form.Item label="S??? t??i kho???n" name="soTaiKhoan">
              <InputNumber
                placeholder="Nh???p s??? t??i kho???n"
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Ng?????i ?????i di???n" name="nguoiDaiDien">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n ng?????i ?????i di???n"
              />
            </Form.Item>
            <Form.Item label="Ch???c v??? ng?????i ?????i di???n" name="chucVuNguoiDaiDien">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p ch???c v??? ng?????i ?????i di???n"
              />
            </Form.Item>
            <Form.Item label="S??T ng?????i ?????i di???n" name="sdtNguoiDaiDien">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui l??ng nh???p S??T ng?????i ?????i di???n"
              />
            </Form.Item>
            <Form.Item label="T??n ng?????i ?????u m???i" name="nguoiDauMoi">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n ng?????i ?????u m???i"
              />
            </Form.Item>
            <Form.Item label="S??T ng?????i ?????u m???i" name="sdtNguoiDauMoi">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui l??ng nh???p S??T ng?????i ?????u m???i"
              />
            </Form.Item>
            <Form.Item label="Email ng?????i ?????u m???i" name="emailNguoiDauMoi">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p email ng?????i ?????u m???i"
              />
            </Form.Item>

            <Form.Item label="T??n ng??n h??ng" name="tenNganHang">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n ng??n h??ng"
              />
            </Form.Item>

            <Form.Item label="Ch??? t??i kho???n ng??n h??ng" name="chuTaiKhoan">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p Ch??? t??i kho???n ng??n h??ng"
              />
            </Form.Item>
            <Form.Item label="Ng?????i chi c???ng t??c" name="nguoiChiCongTac">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p ng?????i chi c???ng t??c"
              />
            </Form.Item>
            <Form.Item label="S??T ng?????i chi c???ng t??c" name="sdtNguoiChiCongTac">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui l??ng nh???p S??T ng?????i c???ng t??c"
              />
            </Form.Item>
            <Form.Item label="??p d???ng t??? ng??y" name="tuNgay">
              <DatePicker
                disabledDate={(date) =>
                  isModal ? date < dataEditDefault.denNgay : false
                }
                format={dateFormat}
              ></DatePicker>
            </Form.Item>
            <Form.Item label="??p d???ng ?????n ng??y" name="denNgay">
              <DatePicker format={dateFormat}></DatePicker>
            </Form.Item>
            {!isModal && (
              <>
                <Form.Item label="?????a ch???" name="diaChi">
                  <Input.TextArea
                    style={{ height: 120 }}
                    placeholder="Nh???p ?????a ch???"
                  />
                </Form.Item>

                {editStatus && (
                  <Form.Item name="active" valuePropName="checked">
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                )}
              </>
            )}
          </Form>
        </fieldset>
      </EditWrapper>
      {!isModal && (
        <ModalCapNhatThongTin
          ref={refModalCapNhatThongTin}
        ></ModalCapNhatThongTin>
      )}
    </Main>
  );
};

export default ThongTinChiTiet;
