import React, { forwardRef, useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import { formatNumberInput } from "utils";

function FormServiceInfo(props, ref) {
  const {
    currentItem,
    layerId,
    refCallbackSave = {},
    roleSave,
    roleEdit,
  } = props;
  const { t } = useTranslation();
  const { listAllDonViTinh = [] } = useSelector((state) => state.donViTinh);
  const { listAllNhomDichVuCap1 = [] } = useSelector((state) => state.nhomDichVuCap1);
  const { listAllNhomDichVuCap2 = [] } = useSelector((state) => state.nhomDichVuCap2);
  const { listAllNhomDichVuCap3 = [] } = useSelector((state) => state.nhomDichVuCap3);
  const { listSuppliesGroup = [] } = useSelector((state) => state.nhomVatTu);
  const { listAllNhaSanXuat, listAllNhaCungCap } = useSelector((state) => state.doiTac);
  const { listAllXuatXu } = useSelector((state) => state.xuatXu);
  const [listnguonKhacChiTra] = useEnum(ENUM.NGUON_KHAC_CHI_TRA);
  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  const {
    danhMucHoaChat: { createOrEdit },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  useEffect(() => {
    form.resetFields();
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const [form] = Form.useForm();

  const loadCurrentItem = (item) => {
    if (item) {
      const {
        dichVu: {
          donViTinhId,
          dsNguonKhacChiTra,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          khongTinhTien,
          ma,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          ten,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
        } = {},
        id,
        dsDoiTuongSuDung,
        active,
        nhomDvKhoCap1Id,
        nhaCungCapId,
        nhaSanXuatId,
        quyCach,
        giaNhapSauVat,
        giaTran,
        dsMucDichSuDung,
        xuatXuId,
        tranBaoHiem,
      } = item || {};
      const data = {
        id,
        donViTinhId,
        giaBaoHiem,
        giaKhongBaoHiem,
        giaPhuThu,
        khongTinhTien,
        ma,
        maTuongDuong,
        nhomChiPhiBh,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        ten,
        tenTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        dsDoiTuongSuDung: dsDoiTuongSuDung || [],
        active: active !== undefined ? active : true,
        nhomDvKhoCap1Id,
        nhaCungCapId,
        nhaSanXuatId,
        quyCach,
        giaNhapSauVat,
        giaTran,
        dsMucDichSuDung,
        xuatXuId,
        tranBaoHiem,
      };
      form.setFieldsValue(data);
      setState({
        data: data,
      });
    } else {
      form.resetFields();
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
  };

  const onCancel = () => {
    if (currentItem?.id) {
      loadCurrentItem({ ...currentItem });
    } else {
      loadCurrentItem({});
      form.resetFields();
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    form.submit();
  };
  refCallbackSave.current = onSave;

  const onUpdateData = (item, type) => {
    if (type === "tyLeBhTt" || type === "tyLeTtDv") {
      form.setFieldsValue({ [type]: formatNumberInput(item).slice(0, 3) });
    } else {
      form.setFieldsValue({ [type]: item });
    }
  };
  
  const onHandleSubmit = (values) => {
    const {
      donViTinhId,
      khongTinhTien,
      ma,
      maTuongDuong,
      nhomChiPhiBh,
      nhomDichVuCap1Id,
      nhomDichVuCap2Id,
      nhomDichVuCap3Id,
      ten,
      tenTuongDuong,
      tyLeBhTt,
      tyLeTtDv,
      dsNguonKhacChiTra,
      giaNhapSauVat,
      giaTran,
      nhomDvKhoCap1Id,
      nhaCungCapId,
      nhaSanXuatId,
      quyCach,
      tenHoatChat,
      tranBaoHiem,
      xuatXuId,
      dsMucDichSuDung,
      active,
    } = values;
    values = {
      dichVu: {
        donViTinhId,
        khongTinhTien,
        ma,
        maTuongDuong,
        nhomChiPhiBh,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        ten,
        tenTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        loaiDichVu: 110,
        dsNguonKhacChiTra,
      },
      active,
      giaNhapSauVat,
      giaTran,
      nhomDvKhoCap1Id,
      nhaCungCapId,
      nhaSanXuatId,
      xuatXuId,
      quyCach,
      tenHoatChat,
      tranBaoHiem,
      dsMucDichSuDung: dsMucDichSuDung?.length > 0 ? dsMucDichSuDung : [10, 20],
      id: state.data?.id,
    };
    createOrEdit(values).then((res) => {
      form.resetFields();
    });
  };
  return (
    <EditWrapper
      title="Th??ng tin d???ch v???"
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      roleSave={roleSave}
      roleEdit={roleEdit}
      editStatus={editStatus}
      forceShowButtonSave={checkRole(roleEdit) && true}
      forceShowButtonCancel={checkRole(roleEdit) && true}
      isHiddenButtonAdd={true}
      layerId={layerId}
    >
      <fieldset disabled={editStatus}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
          onFinish={onHandleSubmit}
        >
          <Form.Item
            label="M?? h??a ch???t"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? h??a ch???t!",
              },
              {
                max: 20,
                message:
                  "Vui l??ng nh???p m?? h??a ch???t kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? h??a ch???t!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? h??a ch???t"
              autoFocus={true}
            />
          </Form.Item>
          <Form.Item
            label="T??n h??a ch???t"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n h??a ch???t!",
              },
              {
                max: 1000,
                message:
                  "Vui l??ng nh???p t??n h??a ch???t kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n h??a ch???t!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n h??a ch???t"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-hoa-chat")}
              >
                Nh??m h??a ch???t
              </div>
            }
            name="nhomDvKhoCap1Id"
          >
            <Select
              data={listSuppliesGroup}
              placeholder="Ch???n h??a ch???t"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ??VT
              </div>
            }
            name="donViTinhId"
          >
            <Select data={listAllDonViTinh} placeholder="Ch???n ??vt" />
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
            <Select
              data={listAllXuatXu}
              placeholder="Ch???n n?????c s???n xu???t"
            />
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
            <Select
              data={listAllNhaSanXuat}
              placeholder="Ch???n nh?? s???n xu???t"
            />
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
            <Select
              data={listAllNhaCungCap}
              placeholder="Ch???n nh?? cung c???p"
            />
          </Form.Item>
          <Form.Item label="Quy c??ch" name="quyCach">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p quy c??ch"
            />
          </Form.Item>
          <Form.Item label="Gi?? nh???p" name="giaNhapSauVat">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(e) => {
                onUpdateData(e, "giaNhapSauVat");
              }}
              className="input-option"
              placeholder="Vui l??ng nh???p gi?? nh???p"
            />
          </Form.Item>
          <Form.Item label="Gi?? tr???n" name="giaTran">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(e) => {
                onUpdateData(e, "giaTran");
              }}
              className="input-option"
              placeholder="Vui l??ng nh???p gi?? tr???n"
            />
          </Form.Item>
          <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
            <InputNumber
              onChange={(e) => {
                onUpdateData(e, "tranBaoHiem");
              }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              className="input-option"
              placeholder="Vui l??ng nh???p tr???n b???o hi???m"
            />
          </Form.Item>
          <Form.Item label="T??? l??? BH thanh to??n" name="tyLeBhTt">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??? l??? BH thanh to??n"
              onChange={(e) => {
                onUpdateData(e.target.value, "tyLeBhTt");
              }}
            />
          </Form.Item>
          <Form.Item
            label="T??? l??? thanh to??n DV"
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??? l??? thanh to??n DV!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??? l??? thanh to??n DV"
              onChange={(e) => {
                onUpdateData(e.target.value, "tyLeTtDv");
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() =>
                  openInNewTab("/danh-muc/nhom-dich-vu?level=1")
                }
              >
                Nh??m dv c???p 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m dv c???p 1!",
              },
            ]}
          >
            <Select
              data={listAllNhomDichVuCap1}
              placeholder="Ch???n nh??m dv c???p 1"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n nh??m dv c???p 2!",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() =>
                  openInNewTab("/danh-muc/nhom-dich-vu?level=2")
                }
              >
                Nh??m dv c???p 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m dv c???p 2!",
              },
            ]}
          >
            <Select
              data={listAllNhomDichVuCap2}
              placeholder="Ch???n nh??m dv c???p 2"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() =>
                  openInNewTab("/danh-muc/nhom-dich-vu?level=3")
                }
              >
                Nh??m dv c???p 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              data={listAllNhomDichVuCap3}
              placeholder="Ch???n nh??m dv c???p 3"
            />
          </Form.Item>
          <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? t????ng ??????ng"
            />
          </Form.Item>
          <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n t????ng ??????ng"
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.mucDichSuDung")}
            name="dsMucDichSuDung"
          >
            <Select
              mode="multiple"
              data={listDsMucDichSuDung}
              placeholder={t("danhMuc.chonMucDichSuDung")}
            />
          </Form.Item>
          <Form.Item
            label="Ngu???n kh??c chi tr???"
            name="dsNguonKhacChiTra"
          >
            <Select
              data={listnguonKhacChiTra}
              placeholder="Ch???n ngu???n chi tr??? kh??c"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Kh??ng t??nh ti???n</Checkbox>
          </Form.Item>
          {state.data?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
        </Form>
      </fieldset>
    </EditWrapper>
  );
}

export default forwardRef(FormServiceInfo);
