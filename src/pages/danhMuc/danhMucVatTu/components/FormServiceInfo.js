import React, { useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, InputNumber } from "antd";
import { connect } from "react-redux";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import TableChiTietKichCo from "./TableChiTietKichCo";
import TableChiTietBo from "./TableChiTietBo";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

function FormServiceInfo({ hiddenField = [], optionalField = [], ...props }) {
  const { t } = useTranslation()
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  
  const {
    listNhomVatTu,
    listAllDonViTinh,
    listAllXuatXu,
    listNSX,
    listNCC,
    listNguonKhacChiTra,
    listNhomDvCap1,
    listNhomDvCap2,
    listNhomDvCap3,
    currentItem,
  } = props;

  // console.log("currentItem", currentItem);

  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (currentItem && Object.keys(currentItem).length <= 0) {
      form.resetFields();
    }
  }, [currentItem]);

  const [form] = Form.useForm();

  const handleValuesChange = (changeValues) => {
    if (changeValues.stentPhuThuoc) {
      form.setFieldsValue({ kyThuatCao: true });
    }
    if (changeValues.kyThuatCao === false) {
      form.setFieldsValue({ stentPhuThuoc: false });
    }
  }

  const loadCurrentItem = (itemVatTu) => {
    if (itemVatTu) {
      const {
        dichVu: {
          ma,
          ten,
          donViTinhId: dvtThuCapId,
          dsNguonKhacChiTra,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          tyLeBhTt,
          tyLeTtDv,
          maTuongDuong,
          tenTuongDuong,
          nhomChiPhiBh,
          khongTinhTien,
        } = {},
        active,
        id,
        vatTuBo,
        vatTuKichCo,
        dsMucDichSuDung
      } = itemVatTu || {};
      const data = {
        ...itemVatTu,
        id,
        ma,
        ten,
        dvtThuCapId,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        dsMucDichSuDung: dsMucDichSuDung || [],
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        maTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        tenTuongDuong,
        nhomChiPhiBh,
        khongTinhTien,
        active,
        vatTuBo,
        vatTuKichCo,
      };
      form.setFieldsValue(data);
      setState({ vatTuBo, vatTuKichCo });
    } else {
      form.resetFields();
      setState({ vatTuBo: false, vatTuKichCo: false });
    }
  };

  const onCancel = () => {
    loadCurrentItem(currentItem);
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          ma,
          ten,
          dvtThuCapId: donViTinhId,
          dsNguonKhacChiTra,
          dsMucDichSuDung,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
          active,
          khongTinhTien,
          giaKhongBaoHiem,
          giaPhuThu,
          ...rest
        } = values;
        const data = {
          dichVu: {
            ten,
            ma,
            donViTinhId,
            dsNguonKhacChiTra,
            maTuongDuong,
            nhomChiPhiBh,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            tenTuongDuong,
            tyLeBhTt,
            tyLeTtDv,
            khongTinhTien,
            loaiDichVu: LOAI_DICH_VU.VAT_TU,
            giaKhongBaoHiem,
            giaPhuThu,
          },
          active,
          ...rest,
          id: currentItem?.id,
          dsMucDichSuDung: dsMucDichSuDung?.length > 0 ? dsMucDichSuDung : [10, 20]
        };
        props.createOrEdit(data).then((res) => {
          if (currentItem?.id) {
            props.updateData({ currentItem: { ...res } });
          } else {
            form.resetFields();
            let bodyVatTuCon = (state?.listVatTuCon || []).map((item) => {
              return { ...item, vatTuBoId: res?.id };
            });
            bodyVatTuCon.length && props.createBatch(bodyVatTuCon);
          }
        });
      })
      .catch((error) => {});
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  const onChangeCheckBox = (key) => (e) => {
    setState({ [key]: e?.target?.checked });
  };
  const selectedVatTuCon = (item) => {
    setState({ listVatTuCon: item });
  };
  return (
    <TabPanel>
      <EditWrapper
        title="Thông tin vật tư"
        onCancel={onCancel}
        onSave={onSave}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        editStatus={props.editStatus}
        showAdded={false}
        forceShowButtonSave={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
        forceShowButtonCancel={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
        isHiddenButtonAdd={true}
      >
        <fieldset disabled={props.editStatus}>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              label="Mã vật tư"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã vật tư!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã vật tư không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã vật tư!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã vật tư"
              />
            </Form.Item>
            <Form.Item
              label="Tên vật tư"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên vật tư!",
                },
                {
                  max: 1000,
                  message: "Vui lòng nhập tên vật tư không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên vật tư!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên vật tư"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-vat-tu")}
                >
                  Nhóm vật tư
                </div>
              }
              name="nhomDvKhoCap1Id"
            >
              <Select placeholder="Chọn nhóm vật tư" data={listNhomVatTu} />
            </Form.Item>
            <Form.Item label="Mã ký hiệu - Tên thương mại" name="maKyHieu">
              <Input className="input-option" placeholder="Nhập mã ký hiệu" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
                >
                  Đơn vị sơ cấp
                </div>
              }
              name="dvtSoCapId"
            >
              <Select
                placeholder="Chọn đơn vị sơ cấp"
                data={listAllDonViTinh}
              />
            </Form.Item>

            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
                >
                  Đơn vị thứ cấp
                </div>
              }
              name="dvtThuCapId"
            >
              <Select
                placeholder="Chọn đơn vị thứ cấp"
                data={listAllDonViTinh}
              />
            </Form.Item>
            <Form.Item
              label="Hệ số định mức"
              name="heSoDinhMuc"
              initialValue={1}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập hệ số định mức!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Nhập hệ số định mức"
              />
            </Form.Item>
            <Form.Item label="Thông số kỹ thuật" name="thongSoKyThuat">
              <Input
                style={{ width: "100%" }}
                placeholder="Nhập thông số kỹ thuật"
              />
            </Form.Item>
            <Form.Item label="Quy cách" name="quyCach">
              <Input style={{ width: "100%" }} placeholder="Nhập quy cách" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/xuat-xu")}
                >
                  Nước sản xuất
                </div>
              }
              name="xuatXuId"
            >
              <Select data={listAllXuatXu} placeholder="Chọn nước sản xuất" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  Nhà sản xuất
                </div>
              }
              name="nhaSanXuatId"
            >
              <Select data={listNSX} placeholder="Chọn nhà sản xuất" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  Nhà cung cấp
                </div>
              }
              name="nhaCungCapId"
            >
              <Select data={listNCC} placeholder="Chọn nhà cung cấp" />
            </Form.Item>
            <Form.Item label="Giá nhập" name="giaNhapSauVat">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nhập giá nhập"
              />
            </Form.Item>
            <Form.Item label="Giá không bảo hiểm" name="giaKhongBaoHiem">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nhập giá"
              />
            </Form.Item>
            <Form.Item label="Phụ thu" name="giaPhuThu">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nhập giá"
              />
            </Form.Item>
            {!hiddenField.includes("giaTran") && (
              <Form.Item label="Giá trần" name="giaTran">
                <Input className="input-option" placeholder="Nhập giá trần" />
              </Form.Item>
            )}
            <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
              <Input
                className="input-option"
                placeholder="Nhập trần bảo hiểm"
              />
            </Form.Item>
            <Form.Item label="Tỷ lệ BH thanh toán" name="tyLeBhTt">
              <Input
                className="input-option"
                placeholder="Nhập tỷ lệ BH thanh toán"
              />
            </Form.Item>
            <Form.Item
              label="Tỷ lệ thanh toán dịch vụ"
              name="tyLeTtDv"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tỷ lệ thanh toán dịch vụ!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Tỷ lệ thanh toán dịch vụ"
              />
            </Form.Item>
            {/* <Form.Item
              label={
                <div
                // TODO: phan loai theo chi phi bhyt
                // onClick={() => openInNewTab("/danh-muc/nhom-dich-vu")}
                >
                  Nhóm chi phí
                </div>
              }
              name="nhomChiPhiBh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhóm chi phí",
                },
              ]}
            >
              <Select data={listnhomChiPhiBh} placeholder="Chọn nhóm chi phí" />
            </Form.Item> */}
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
                >
                  Nhóm dịch vụ cấp 1
                </div>
              }
              name="nhomDichVuCap1Id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn dịch vụ cấp 1",
                },
              ]}
            >
              <Select
                data={listNhomDvCap1}
                placeholder="Chọn nhóm dịch vụ cấp 1"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
                >
                  Nhóm dịch vụ cấp 2
                </div>
              }
              name="nhomDichVuCap2Id"
              rules={
                optionalField.includes("nhomDichVuCap2Id")
                  ? []
                  : [
                      {
                        required: true,
                        message: "Vui lòng chọn dịch vụ cấp 2",
                      },
                    ]
              }
            >
              <Select
                data={listNhomDvCap2}
                placeholder="Chọn nhóm dịch vụ cấp 2"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
                >
                  Nhóm dịch vụ cấp 3
                </div>
              }
              name="nhomDichVuCap3Id"
            >
              <Select
                data={listNhomDvCap3}
                placeholder="Chọn nhóm dịch vụ cấp 3"
              />
            </Form.Item>
            <Form.Item label="Mã tương đương" name="maTuongDuong">
              <Input
                className="input-option"
                placeholder="Nhập mã tương đương"
              />
            </Form.Item>
            <Form.Item label="Tên tương đương" name="tenTuongDuong">
              <Input
                className="input-option"
                placeholder="Nhập tên tương đương"
              />
            </Form.Item>
            <Form.Item label={t("danhMuc.mucDichSuDung")} name="dsMucDichSuDung">
              <Select
                data={listDsMucDichSuDung}
                placeholder={t("danhMuc.chonMucDichSuDung")}
                mode="multiple"
              />
            </Form.Item>
            <Form.Item label="Nguồn chi trả khác" name="dsNguonKhacChiTra">
              <Select
                data={listNguonKhacChiTra}
                placeholder="Chọn nguồn chi trả khác"
                mode="multiple"
              />
            </Form.Item>
            <Form.Item
              label="Quyết định thầu"
              name="quyetDinhThau"
              rules={[{ max: 25, message: "Không được nhập quá 25 ký tự" }]}
            >
              <Input placeholder="Quyết định thầu" />
            </Form.Item>
            <Form.Item label="" name="vatTuBo" valuePropName="checked">
              <Checkbox onChange={onChangeCheckBox("vatTuBo")}>
                Vật tư bộ
              </Checkbox>
            </Form.Item>
            <Form.Item label="" name="vatTuKichCo" valuePropName="checked">
              <Checkbox onChange={onChangeCheckBox("vatTuKichCo")}>
                Vật tư theo kích cỡ
              </Checkbox>
            </Form.Item>
            <Form.Item label="" name="stentPhuThuoc" valuePropName="checked">
              <Checkbox>Stent phủ thuốc</Checkbox>
            </Form.Item>
            <Form.Item label="" name="kyThuatCao" valuePropName="checked">
              <Checkbox>Kỹ thuật cao</Checkbox>
            </Form.Item>
            <Form.Item label="" name="khongTinhTien" valuePropName="checked">
              <Checkbox>Không tính tiền</Checkbox>
            </Form.Item>
            <Form.Item label="" name="vatTuTaiSuDung" valuePropName="checked">
              <Checkbox>Vật tư tái sử dụng</Checkbox>
            </Form.Item>
            {currentItem &&
              currentItem.constructor === Object &&
              Object.keys(currentItem).length > 0 && (
                <Form.Item label=" " name="active" valuePropName="checked">
                  <Checkbox>Có hiệu lực</Checkbox>
                </Form.Item>
              )}
          </Form>
          {state?.vatTuKichCo && <TableChiTietKichCo />}
          {state?.vatTuBo && (
            <TableChiTietBo
              selectedVatTuCon={selectedVatTuCon}
              listVatTuCon={state?.listVatTuCon}
            />
          )}
        </fieldset>
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    danhMucVatTu: { currentItem },
  } = state;
  return {
    currentItem,
  };
};

const mapDispatchToProps = ({
  danhMucVatTu: { createOrEdit, updateData, createBatch },
  utils: { getUtils },
}) => ({ createOrEdit, updateData, createBatch });

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceInfo);
