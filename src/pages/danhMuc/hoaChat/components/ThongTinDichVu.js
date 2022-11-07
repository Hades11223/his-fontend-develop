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
      title="Thông tin dịch vụ"
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
            label="Mã hóa chất"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã hóa chất!",
              },
              {
                max: 20,
                message:
                  "Vui lòng nhập mã hóa chất không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã hóa chất!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã hóa chất"
              autoFocus={true}
            />
          </Form.Item>
          <Form.Item
            label="Tên hóa chất"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên hóa chất!",
              },
              {
                max: 1000,
                message:
                  "Vui lòng nhập tên hóa chất không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên hóa chất!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên hóa chất"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-hoa-chat")}
              >
                Nhóm hóa chất
              </div>
            }
            name="nhomDvKhoCap1Id"
          >
            <Select
              data={listSuppliesGroup}
              placeholder="Chọn hóa chất"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ĐVT
              </div>
            }
            name="donViTinhId"
          >
            <Select data={listAllDonViTinh} placeholder="Chọn đvt" />
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
            <Select
              data={listAllXuatXu}
              placeholder="Chọn nước sản xuất"
            />
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
            <Select
              data={listAllNhaSanXuat}
              placeholder="Chọn nhà sản xuất"
            />
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
            <Select
              data={listAllNhaCungCap}
              placeholder="Chọn nhà cung cấp"
            />
          </Form.Item>
          <Form.Item label="Quy cách" name="quyCach">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập quy cách"
            />
          </Form.Item>
          <Form.Item label="Giá nhập" name="giaNhapSauVat">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(e) => {
                onUpdateData(e, "giaNhapSauVat");
              }}
              className="input-option"
              placeholder="Vui lòng nhập giá nhập"
            />
          </Form.Item>
          <Form.Item label="Giá trần" name="giaTran">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(e) => {
                onUpdateData(e, "giaTran");
              }}
              className="input-option"
              placeholder="Vui lòng nhập giá trần"
            />
          </Form.Item>
          <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
            <InputNumber
              onChange={(e) => {
                onUpdateData(e, "tranBaoHiem");
              }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              className="input-option"
              placeholder="Vui lòng nhập trần bảo hiểm"
            />
          </Form.Item>
          <Form.Item label="Tỷ lệ BH thanh toán" name="tyLeBhTt">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tỷ lệ BH thanh toán"
              onChange={(e) => {
                onUpdateData(e.target.value, "tyLeBhTt");
              }}
            />
          </Form.Item>
          <Form.Item
            label="Tỷ lệ thanh toán DV"
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tỉ lệ thanh toán DV!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tỉ lệ thanh toán DV"
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
                Nhóm dv cấp 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dv cấp 1!",
              },
            ]}
          >
            <Select
              data={listAllNhomDichVuCap1}
              placeholder="Chọn nhóm dv cấp 1"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhóm dv cấp 2!",
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
                Nhóm dv cấp 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dv cấp 2!",
              },
            ]}
          >
            <Select
              data={listAllNhomDichVuCap2}
              placeholder="Chọn nhóm dv cấp 2"
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
                Nhóm dv cấp 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              data={listAllNhomDichVuCap3}
              placeholder="Chọn nhóm dv cấp 3"
            />
          </Form.Item>
          <Form.Item label="Mã tương đương" name="maTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã tương đương"
            />
          </Form.Item>
          <Form.Item label="Tên tương đương" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên tương đương"
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
            label="Nguồn khác chi trả"
            name="dsNguonKhacChiTra"
          >
            <Select
              data={listnguonKhacChiTra}
              placeholder="Chọn nguồn chi trả khác"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Không tính tiền</Checkbox>
          </Form.Item>
          {state.data?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </Form>
      </fieldset>
    </EditWrapper>
  );
}

export default forwardRef(FormServiceInfo);
