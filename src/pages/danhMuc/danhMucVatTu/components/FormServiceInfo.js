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
        title="Th??ng tin v???t t??"
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
              label="M?? v???t t??"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? v???t t??!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? v???t t?? kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? v???t t??!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? v???t t??"
              />
            </Form.Item>
            <Form.Item
              label="T??n v???t t??"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n v???t t??!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n v???t t?? kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n v???t t??!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n v???t t??"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-vat-tu")}
                >
                  Nh??m v???t t??
                </div>
              }
              name="nhomDvKhoCap1Id"
            >
              <Select placeholder="Ch???n nh??m v???t t??" data={listNhomVatTu} />
            </Form.Item>
            <Form.Item label="M?? k?? hi???u - T??n th????ng m???i" name="maKyHieu">
              <Input className="input-option" placeholder="Nh???p m?? k?? hi???u" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
                >
                  ????n v??? s?? c???p
                </div>
              }
              name="dvtSoCapId"
            >
              <Select
                placeholder="Ch???n ????n v??? s?? c???p"
                data={listAllDonViTinh}
              />
            </Form.Item>

            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
                >
                  ????n v??? th??? c???p
                </div>
              }
              name="dvtThuCapId"
            >
              <Select
                placeholder="Ch???n ????n v??? th??? c???p"
                data={listAllDonViTinh}
              />
            </Form.Item>
            <Form.Item
              label="H??? s??? ?????nh m???c"
              name="heSoDinhMuc"
              initialValue={1}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p h??? s??? ?????nh m???c!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Nh???p h??? s??? ?????nh m???c"
              />
            </Form.Item>
            <Form.Item label="Th??ng s??? k??? thu???t" name="thongSoKyThuat">
              <Input
                style={{ width: "100%" }}
                placeholder="Nh???p th??ng s??? k??? thu???t"
              />
            </Form.Item>
            <Form.Item label="Quy c??ch" name="quyCach">
              <Input style={{ width: "100%" }} placeholder="Nh???p quy c??ch" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/xuat-xu")}
                >
                  N?????c s???n xu???t
                </div>
              }
              name="xuatXuId"
            >
              <Select data={listAllXuatXu} placeholder="Ch???n n?????c s???n xu???t" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  Nh?? s???n xu???t
                </div>
              }
              name="nhaSanXuatId"
            >
              <Select data={listNSX} placeholder="Ch???n nh?? s???n xu???t" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  Nh?? cung c???p
                </div>
              }
              name="nhaCungCapId"
            >
              <Select data={listNCC} placeholder="Ch???n nh?? cung c???p" />
            </Form.Item>
            <Form.Item label="Gi?? nh???p" name="giaNhapSauVat">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nh???p gi?? nh???p"
              />
            </Form.Item>
            <Form.Item label="Gi?? kh??ng b???o hi???m" name="giaKhongBaoHiem">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nh???p gi??"
              />
            </Form.Item>
            <Form.Item label="Ph??? thu" name="giaPhuThu">
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder="Nh???p gi??"
              />
            </Form.Item>
            {!hiddenField.includes("giaTran") && (
              <Form.Item label="Gi?? tr???n" name="giaTran">
                <Input className="input-option" placeholder="Nh???p gi?? tr???n" />
              </Form.Item>
            )}
            <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
              <Input
                className="input-option"
                placeholder="Nh???p tr???n b???o hi???m"
              />
            </Form.Item>
            <Form.Item label="T??? l??? BH thanh to??n" name="tyLeBhTt">
              <Input
                className="input-option"
                placeholder="Nh???p t??? l??? BH thanh to??n"
              />
            </Form.Item>
            <Form.Item
              label="T??? l??? thanh to??n d???ch v???"
              name="tyLeTtDv"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??? l??? thanh to??n d???ch v???!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="T??? l??? thanh to??n d???ch v???"
              />
            </Form.Item>
            {/* <Form.Item
              label={
                <div
                // TODO: phan loai theo chi phi bhyt
                // onClick={() => openInNewTab("/danh-muc/nhom-dich-vu")}
                >
                  Nh??m chi ph??
                </div>
              }
              name="nhomChiPhiBh"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n nh??m chi ph??",
                },
              ]}
            >
              <Select data={listnhomChiPhiBh} placeholder="Ch???n nh??m chi ph??" />
            </Form.Item> */}
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
                >
                  Nh??m d???ch v??? c???p 1
                </div>
              }
              name="nhomDichVuCap1Id"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n d???ch v??? c???p 1",
                },
              ]}
            >
              <Select
                data={listNhomDvCap1}
                placeholder="Ch???n nh??m d???ch v??? c???p 1"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
                >
                  Nh??m d???ch v??? c???p 2
                </div>
              }
              name="nhomDichVuCap2Id"
              rules={
                optionalField.includes("nhomDichVuCap2Id")
                  ? []
                  : [
                      {
                        required: true,
                        message: "Vui l??ng ch???n d???ch v??? c???p 2",
                      },
                    ]
              }
            >
              <Select
                data={listNhomDvCap2}
                placeholder="Ch???n nh??m d???ch v??? c???p 2"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
                >
                  Nh??m d???ch v??? c???p 3
                </div>
              }
              name="nhomDichVuCap3Id"
            >
              <Select
                data={listNhomDvCap3}
                placeholder="Ch???n nh??m d???ch v??? c???p 3"
              />
            </Form.Item>
            <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
              <Input
                className="input-option"
                placeholder="Nh???p m?? t????ng ??????ng"
              />
            </Form.Item>
            <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
              <Input
                className="input-option"
                placeholder="Nh???p t??n t????ng ??????ng"
              />
            </Form.Item>
            <Form.Item label={t("danhMuc.mucDichSuDung")} name="dsMucDichSuDung">
              <Select
                data={listDsMucDichSuDung}
                placeholder={t("danhMuc.chonMucDichSuDung")}
                mode="multiple"
              />
            </Form.Item>
            <Form.Item label="Ngu???n chi tr??? kh??c" name="dsNguonKhacChiTra">
              <Select
                data={listNguonKhacChiTra}
                placeholder="Ch???n ngu???n chi tr??? kh??c"
                mode="multiple"
              />
            </Form.Item>
            <Form.Item
              label="Quy???t ?????nh th???u"
              name="quyetDinhThau"
              rules={[{ max: 25, message: "Kh??ng ???????c nh???p qu?? 25 k?? t???" }]}
            >
              <Input placeholder="Quy???t ?????nh th???u" />
            </Form.Item>
            <Form.Item label="" name="vatTuBo" valuePropName="checked">
              <Checkbox onChange={onChangeCheckBox("vatTuBo")}>
                V???t t?? b???
              </Checkbox>
            </Form.Item>
            <Form.Item label="" name="vatTuKichCo" valuePropName="checked">
              <Checkbox onChange={onChangeCheckBox("vatTuKichCo")}>
                V???t t?? theo k??ch c???
              </Checkbox>
            </Form.Item>
            <Form.Item label="" name="stentPhuThuoc" valuePropName="checked">
              <Checkbox>Stent ph??? thu???c</Checkbox>
            </Form.Item>
            <Form.Item label="" name="kyThuatCao" valuePropName="checked">
              <Checkbox>K??? thu???t cao</Checkbox>
            </Form.Item>
            <Form.Item label="" name="khongTinhTien" valuePropName="checked">
              <Checkbox>Kh??ng t??nh ti???n</Checkbox>
            </Form.Item>
            <Form.Item label="" name="vatTuTaiSuDung" valuePropName="checked">
              <Checkbox>V???t t?? t??i s??? d???ng</Checkbox>
            </Form.Item>
            {currentItem &&
              currentItem.constructor === Object &&
              Object.keys(currentItem).length > 0 && (
                <Form.Item label=" " name="active" valuePropName="checked">
                  <Checkbox>C?? hi???u l???c</Checkbox>
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
