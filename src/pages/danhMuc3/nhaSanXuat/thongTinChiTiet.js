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
        title="Thông tin chi tiết"
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
              Cập nhật thông tin
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
              label="Mã đối tác"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Mã đối tác!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập Mã đối tác không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập Mã đối tác!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập Mã đối tác"
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label="Tên đối tác"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tên đối tác!",
                },
                {
                  max: 1000,
                  message: "Vui lòng nhập Tên đối tác không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập Tên đối tác!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập Tên đối tác"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
                >
                  Nhóm DV
                </div>
              }
              name="dsNhomDichVuCap1Id"
              rules={[
                {
                  required: isRequireNhomDv,
                  message: "Vui lòng chọn nhóm DV!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={"chọn nhóm DV"}
                data={listAllNhomDichVuCap1}
              />
            </Form.Item>
            <Form.Item
              label="Loại đối tác"
              name="dsLoaiDoiTac"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại đối tác!",
                },
              ]}
            >
              <Select
                onChange={handleChange}
                mode="multiple"
                placeholder={"chọn loại đối tác"}
                data={listloaiDoiTac}
              />
            </Form.Item>
            <Form.Item
              label="Loại dịch vụ"
              name="dsLoaiDichVu"
              rules={[
                {
                  required: isRequireLoaiDv,
                  message: "Vui lòng chọn loại dịch vụ!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={"chọn loại dịch vụ"}
                data={listloaiDichVu}
              />
            </Form.Item>
            <Form.Item label="Mã số thuế" name="maSoThue">
              <Input className="input-option" placeholder="Nhập mã số thuế" />
            </Form.Item>
            <Form.Item label="Số tài khoản" name="soTaiKhoan">
              <InputNumber
                placeholder="Nhập số tài khoản"
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Người đại diện" name="nguoiDaiDien">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên người đại diện"
              />
            </Form.Item>
            <Form.Item label="Chức vụ người đại diện" name="chucVuNguoiDaiDien">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập chức vụ người đại diện"
              />
            </Form.Item>
            <Form.Item label="SĐT người đại diện" name="sdtNguoiDaiDien">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui lòng nhập SĐT người đại diện"
              />
            </Form.Item>
            <Form.Item label="Tên người đầu mối" name="nguoiDauMoi">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên người đầu mối"
              />
            </Form.Item>
            <Form.Item label="SĐT người đầu mối" name="sdtNguoiDauMoi">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui lòng nhập SĐT người đầu mối"
              />
            </Form.Item>
            <Form.Item label="Email người đầu mối" name="emailNguoiDauMoi">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập email người đầu mối"
              />
            </Form.Item>

            <Form.Item label="Tên ngân hàng" name="tenNganHang">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên ngân hàng"
              />
            </Form.Item>

            <Form.Item label="Chủ tài khoản ngân hàng" name="chuTaiKhoan">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập Chủ tài khoản ngân hàng"
              />
            </Form.Item>
            <Form.Item label="Người chi cộng tác" name="nguoiChiCongTac">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập người chi cộng tác"
              />
            </Form.Item>
            <Form.Item label="SĐT người chi cộng tác" name="sdtNguoiChiCongTac">
              <Input
                type="number"
                className="input-option"
                placeholder="Vui lòng nhập SĐT người cộng tác"
              />
            </Form.Item>
            <Form.Item label="Áp dụng từ ngày" name="tuNgay">
              <DatePicker
                disabledDate={(date) =>
                  isModal ? date < dataEditDefault.denNgay : false
                }
                format={dateFormat}
              ></DatePicker>
            </Form.Item>
            <Form.Item label="Áp dụng đến ngày" name="denNgay">
              <DatePicker format={dateFormat}></DatePicker>
            </Form.Item>
            {!isModal && (
              <>
                <Form.Item label="Địa chỉ" name="diaChi">
                  <Input.TextArea
                    style={{ height: 120 }}
                    placeholder="Nhập địa chỉ"
                  />
                </Form.Item>

                {editStatus && (
                  <Form.Item name="active" valuePropName="checked">
                    <Checkbox>Có hiệu lực</Checkbox>
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
