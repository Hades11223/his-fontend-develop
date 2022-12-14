import React, { forwardRef, useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { InputNumberFormat } from "components/common";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
function FormServiceInfo(props, ref) {
  const {
    currentItem,
    layerId,
    refCallbackSave = {},
    roleSave,
    roleEdit,
    refTab,
  } = props;
  const {
    donViTinh: { listAllDonViTinh = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
    utils: {
      listnguonKhacChiTra = [],
      listdoiTuongSuDung = [],
      listPhanLoaiPtTt = [],
      listphanLoaiGiuong = [],
      listthoiGianSuDung = [],
    },
  } = useSelector((state) => state);
  const {
    dichVuGiuong: { createOrEdit },
    nhomDichVuCap2: { getAllDichVuCap2 },
    nhomDichVuCap3: { getAllDichVuCap3 },
  } = useDispatch();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    form.resetFields();
    loadCurrentItem(currentItem);
    refTab.current &&
      refTab.current.setKhoaChiDinh(!!currentItem?.hanCheKhoaChiDinh);
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
        hanCheKhoaChiDinh,
        ngayCongBo,
        quyetDinh,
        active,
        phanLoai,
        thoiGianSuDung,
        dsPhanLoaiPtTt,
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
        hanCheKhoaChiDinh,
        ngayCongBo: (ngayCongBo && moment(ngayCongBo)) || null,
        quyetDinh,
        active: active !== undefined ? active : true,
        phanLoai,
        thoiGianSuDung,
        dsPhanLoaiPtTt,
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
  const refAutoFocus = useRef(null);

  const onHandleSubmit = (values) => {
    const {
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
      dsNguonKhacChiTra,
      dsDoiTuongSuDung,
      hanCheKhoaChiDinh,
      ngayCongBo,
      quyetDinh,
      active,
      phanLoai,
      thoiGianSuDung,
      dsPhanLoaiPtTt,
    } = values;
    values = {
      dichVu: {
        donViTinhId,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        giaBaoHiem: giaBaoHiem?.toString().replaceAll(".", "") || null,
        giaKhongBaoHiem:
          giaKhongBaoHiem?.toString().replaceAll(".", "") || null,
        giaPhuThu: giaPhuThu?.toString().replaceAll(".", "") || null,
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
        loaiDichVu: 130,
      },
      active,
      dsDoiTuongSuDung,
      hanCheKhoaChiDinh,
      ngayCongBo: (ngayCongBo && ngayCongBo.format("YYYY-MM-DD")) || null,
      quyetDinh,
      phanLoai,
      thoiGianSuDung,
      dsPhanLoaiPtTt,
      id: state.data?.id,
    };
    createOrEdit(values).then((res) => {
      form.resetFields();
    });
  };
  const onChangeFileds = (key, e) => {
    setState({ [key]: e });
  };
  const onChangeHanCheKhoaChiDinh = (e) => {
    refTab.current && refTab.current.setKhoaChiDinh(!!e.target.checked);
  };
  console.log("state?.thoiGianSuDung", state?.thoiGianSuDung);
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
            label="M?? d???ch v???"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? d???ch v???!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? d???ch v??? kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? d???ch v???!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? d???ch v???"
            />
          </Form.Item>
          <Form.Item
            label="T??n d???ch v???"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n d???ch v???!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n d???ch v??? kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n d???ch v???!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n d???ch v??? "
            />
          </Form.Item>
          <Form.Item
            label="????n gi?? kh??ng BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ????n gi?? kh??ng BH!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui l??ng nh???p ????n gi?? kh??ng BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="????n gi?? BH" name="giaBaoHiem">
            <InputNumberFormat
              placeholder="Vui l??ng nh???p ????n gi?? BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Ph??? thu" name="giaPhuThu">
            <InputNumberFormat
              placeholder="Vui l??ng nh???p Ph??? thu"
              className="input-option"
            />
          </Form.Item>
          {/* <Form.Item
            label={"Nh??m chi ph??"}
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m chi ph??",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m chi ph??"
              data={listnhomChiPhiBh}
            />
          </Form.Item> */}
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
            <Select
              data={listAllDonViTinh}
              placeholder="Vui l??ng ch???n ????n v??? t??nh"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                Nh??m DV C???p 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m d???ch v??? c???p 1",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 1"
              data={listAllNhomDichVuCap1}
              onChange={(e) => {
                if (e) {
                  getAllDichVuCap2({ nhomDichVuCap1Id: e });
                } else {
                  getAllDichVuCap2();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
              >
                Nh??m DV C???p 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m d???ch v??? c???p 2",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 2"
              data={listAllNhomDichVuCap2}
              onChange={(e) => {
                if (e) {
                  getAllDichVuCap3({ nhomDichVuCap2Id: e });
                } else {
                  getAllDichVuCap3();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Nh??m DV C???p 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 3"
              data={listAllNhomDichVuCap3}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Ph??n lo???i gi?????ng
              </div>
            }
            name="phanLoai"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ph??n lo???i gi?????ng!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n ph??n lo???i gi?????ng"
              data={listphanLoaiGiuong}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                ??p d???ng cho c??c tr?????ng h???p
              </div>
            }
            name="thoiGianSuDung"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n tr?????ng h??p!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n tr?????ng h??p"
              data={listthoiGianSuDung}
              onChange={(e) => onChangeFileds("thoiGianSuDung", e)}
            />
          </Form.Item>
          {state?.thoiGianSuDung === 20 && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
                >
                  Lo???i ph???u thu???t
                </div>
              }
              name="dsPhanLoaiPtTt"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n lo???i ph???u thu???t!",
                },
              ]}
            >
              <Select
                placeholder="Vui l??ng ch???n lo???i ph???u thu???t"
                data={listPhanLoaiPtTt}
                mode="multiple"
              />
            </Form.Item>
          )}
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

          <Form.Item label="Tr?????ng h???p k?? DV" name="dsDoiTuongSuDung">
            <Select
              data={listdoiTuongSuDung}
              placeholder="Vui l??ng ch???n tr?????ng h???p k?? DV"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>

          <Form.Item
            label="M?? s??? quy???t ?????nh"
            name="quyetDinh"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? s??? quy???t ?????nh",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? s??? quy???t ?????nh"
            />
          </Form.Item>
          <Form.Item
            label="Ng??y quy???t ?????nh"
            name="ngayCongBo"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ng??y quy???t ?????nh",
              },
            ]}
          >
            <DatePicker
              className="input-option"
              placeholder="Vui l??ng ch???n ng??y quy???t ?????nh"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>

          <Form.Item label="Ngu???n kh??c chi tr???" name="dsNguonKhacChiTra">
            <Select
              data={listnguonKhacChiTra}
              placeholder="Vui l??ng ch???n ngu???n chi tr??? kh??c"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Kh??ng t??nh ti???n</Checkbox>
          </Form.Item>
          <Form.Item name="hanCheKhoaChiDinh" valuePropName="checked">
            <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
              H???n ch??? khoa ch??? ?????nh
            </Checkbox>
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
