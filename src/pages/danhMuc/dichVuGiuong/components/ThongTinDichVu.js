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
            label="Mã dịch vụ"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã dịch vụ!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã dịch vụ không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã dịch vụ!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              className="input-option"
              placeholder="Vui lòng nhập mã dịch vụ"
            />
          </Form.Item>
          <Form.Item
            label="Tên dịch vụ"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên dịch vụ không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên dịch vụ "
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá không BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá không BH!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui lòng nhập đơn giá không BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Đơn giá BH" name="giaBaoHiem">
            <InputNumberFormat
              placeholder="Vui lòng nhập đơn giá BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Phụ thu" name="giaPhuThu">
            <InputNumberFormat
              placeholder="Vui lòng nhập Phụ thu"
              className="input-option"
            />
          </Form.Item>
          {/* <Form.Item
            label={"Nhóm chi phí"}
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm chi phí",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm chi phí"
              data={listnhomChiPhiBh}
            />
          </Form.Item> */}
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
            <Select
              data={listAllDonViTinh}
              placeholder="Vui lòng chọn đơn vị tính"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                Nhóm DV Cấp 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dịch vụ cấp 1",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 1"
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
                Nhóm DV Cấp 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dịch vụ cấp 2",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 2"
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
                Nhóm DV Cấp 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 3"
              data={listAllNhomDichVuCap3}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Phân loại giường
              </div>
            }
            name="phanLoai"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phân loại giường!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn phân loại giường"
              data={listphanLoaiGiuong}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Áp dụng cho các trường hợp
              </div>
            }
            name="thoiGianSuDung"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trường hơp!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn trường hơp"
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
                  Loại phẫu thuật
                </div>
              }
              name="dsPhanLoaiPtTt"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại phẫu thuật!",
                },
              ]}
            >
              <Select
                placeholder="Vui lòng chọn loại phẫu thuật"
                data={listPhanLoaiPtTt}
                mode="multiple"
              />
            </Form.Item>
          )}
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

          <Form.Item label="Trường hợp kê DV" name="dsDoiTuongSuDung">
            <Select
              data={listdoiTuongSuDung}
              placeholder="Vui lòng chọn trường hợp kê DV"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>

          <Form.Item
            label="Mã số quyết định"
            name="quyetDinh"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã số quyết định",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã số quyết định"
            />
          </Form.Item>
          <Form.Item
            label="Ngày quyết định"
            name="ngayCongBo"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày quyết định",
              },
            ]}
          >
            <DatePicker
              className="input-option"
              placeholder="Vui lòng chọn ngày quyết định"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>

          <Form.Item label="Nguồn khác chi trả" name="dsNguonKhacChiTra">
            <Select
              data={listnguonKhacChiTra}
              placeholder="Vui lòng chọn nguồn chi trả khác"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Không tính tiền</Checkbox>
          </Form.Item>
          <Form.Item name="hanCheKhoaChiDinh" valuePropName="checked">
            <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
              Hạn chế khoa chỉ định
            </Checkbox>
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
