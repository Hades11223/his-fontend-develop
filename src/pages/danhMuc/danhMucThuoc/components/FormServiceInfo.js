import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import { Form, Input, InputNumber, Checkbox } from "antd";
import { connect } from "react-redux";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import { InputNumberFormat } from "components/common";
import { openInNewTab } from "utils";
import { normalizeNumber } from "../../../../utils";
import { checkRole } from "utils/role-utils";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { useEnum } from "hook";
import { useTranslation } from "react-i18next";
function FormServiceInfo({ hiddenField = [], optionalField = [], ...props }) {
  const {
    listHoatChat,
    listNhomThuoc,
    listAllNhomDichVuKho,
    listAllPhanLoaiThuoc,
    listAllDonViTinh,
    listAllXuatXu,
    listNSX,
    listNCC,
    listNguonKhacChiTra,
    listNhomDvCap1,
    listNhomDvCap2,
    listNhomDvCap3,
    currentItem,
    listAllDuongDung,
    getListKhoaTongHop,
    listKhoa,
    listDataTongHop,
  } = props;
  const { t } = useTranslation();
  const [listgoiThau] = useEnum(ENUM.GOI_THAU);
  const [listnhomThau] = useEnum(ENUM.NHOM_THAU);
  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const [form] = Form.useForm();

  const refTimeout = useRef();
  const changeValue = (key) => (value) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      setState({ [key]: value });
      form.validateFields();
    }, 500);
  };

  useEffect(() => {
    getListKhoaTongHop({});
  }, []);
  useEffect(() => {
    loadCurrentItem(currentItem);
    if (currentItem && Object.keys(currentItem).length <= 0) {
      form.resetFields();
    }
  }, [currentItem]);

  const loadCurrentItem = (danhMucThuoc) => {
    if (danhMucThuoc) {
      const {
        dichVu: {
          ma,
          ten,
          donViTinhId: dvtThuCapId,
          khongTinhTien,
          dsNguonKhacChiTra,
          nhomChiPhiBh,
          tyLeBhTt,
          tyLeTtDv,
          maTuongDuong,
          tenTuongDuong,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          duongDungId,
          mucDichSuDung,
        } = {},
        active,
        id,
        giaNhapSauVat,
        giaTran,
        tranBaoHiem,
        dsKhoaCdDvtSoCapId,
        dsMucDichSuDung,
      } = danhMucThuoc || {};
      const data = {
        id,
        ma,
        ten,
        khongTinhTien,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        nhomChiPhiBh,
        tyLeBhTt,
        tyLeTtDv,
        dvtThuCapId,
        maTuongDuong,
        tenTuongDuong,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        duongDungId,
        active,
        giaNhapSauVat,
        giaTran,
        tranBaoHiem,
        ...danhMucThuoc,
        dsKhoaCdDvtSoCapId: dsKhoaCdDvtSoCapId || [],

        dsMucDichSuDung: dsMucDichSuDung || [],
        heSoDinhMuc: danhMucThuoc?.heSoDinhMuc || 1,
        mucDichSuDung,
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
  // const onAddNewRow = () => {
  //   loadCurrentItem({});
  // };

  const onCancel = () => {
    loadCurrentItem(currentItem);
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        const {
          ma,
          ten,
          active,
          maTuongDuong,
          dsNguonKhacChiTra,
          nhomChiPhiBh,
          tyLeBhTt,
          tyLeTtDv,
          dvtThuCapId,
          tenTuongDuong,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          khongTinhTien,
          dsMucDichSuDung,
          mucDichSuDung,
          ...rest
        } = values;
        values = {
          dichVu: {
            ten,
            ma,
            maTuongDuong,
            tenTuongDuong,
            nhomChiPhiBh,
            dsNguonKhacChiTra,
            tyLeBhTt,
            tyLeTtDv,
            donViTinhId: dvtThuCapId,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            khongTinhTien,
            loaiDichVu: LOAI_DICH_VU.THUOC,
            mucDichSuDung,
          },

          active,
          ...rest,
          giaNhapSauVat:
            normalizeNumber(rest.giaNhapSauVat) != "undefined"
              ? normalizeNumber(rest.giaNhapSauVat)
              : null,
          giaTran:
            normalizeNumber(rest.giaTran) != "undefined"
              ? normalizeNumber(rest.giaTran)
              : null,
          tranBaoHiem:
            normalizeNumber(rest.tranBaoHiem) != "undefined"
              ? normalizeNumber(rest.tranBaoHiem)
              : null,
          id: state.data?.id,
          dsMucDichSuDung:
            dsMucDichSuDung?.length > 0 ? dsMucDichSuDung : [10, 20],
        };
        props.createOrEdit(values).then(() => {
          if (state.data?.id) {
            return;
          }
          form.resetFields();
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
  const onChangeFields = (key) => (e) => {
    let ten = listHoatChat.find((x) => x.id === e)?.ten;
    form.setFieldsValue({ tenHoatChat: ten });
  };

  const validator = (rule, value, callback) => {
    if (value) {
      if (Number(value) < 2) {
        let dvtSoCapId = form.getFieldValue("dvtSoCapId");
        let dvtThuCapId = form.getFieldValue("dvtThuCapId");
        if (dvtSoCapId && dvtSoCapId !== dvtThuCapId) {
          callback(
            new Error(
              "Hàng hóa có đơn vị sơ cấp. Bắt buộc điền hệ số định mức > 1"
            )
          );
        } else {
          callback();
        }
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  return (
    <TabPanel>
      <EditWrapper
        title={t("danhMuc.thongTinGoiDichVu")}
        onCancel={onCancel}
        onSave={onSave}
        showAdded={false}
        // isShowSaveButton={true}
        // isShowCancelButton={true}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        editStatus={editStatus}
        isHiddenButtonAdd={true}
        forceShowButtonSave={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
        forceShowButtonCancel={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
      >
        {/* <fieldset disabled={!props.roleSave && !editStatus}> */}
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
          initialValues={{ heSoDinhMuc: 1 }}
        >
          <Form.Item
            label={t("danhMuc.maThuoc")}
            name="ma"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongNhapMaThuoc"),
              },
              {
                max: 20,
                message: t("danhMuc.vuiLongNhapMaThuocKhongQua20KyTu"),
              },
              {
                whitespace: true,
                message: t("danhMuc.vuiLongNhapMaThuoc"),
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              autoFocus={true}
              className="input-option"
              placeholder={t("danhMuc.vuiLongNhapMaThuoc")}
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.tenThuoc")}
            name="ten"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongNhapTenThuoc"),
              },
              {
                max: 200,
                message: t("danhMuc.vuiLongNhapTenThuocKhongQua200KyTu"),
              },
              {
                whitespace: true,
                message: t("danhMuc.vuiLongNhapTenThuoc"),
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder={t("danhMuc.vuiLongNhapTenThuoc")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/hoat-chat")}
              >
                {t("danhMuc.maHoatChat")}
              </div>
            }
            name="hoatChatId"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongNhapMaHoatChat"),
              },
            ]}
          >
            <Select
              data={listHoatChat.map((item) => ({ id: item.id, ten: item.ma }))}
              onChange={onChangeFields("hoatChatId")}
              placeholder={t("danhMuc.chonMaHoatChat")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.tenHoatChat")} name="tenHoatChat">
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapTenHoatChat")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.hamLuong")} name="hamLuong">
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapHamLuong")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-thuoc")}
              >
                {t("danhMuc.nhomThuoc")}
              </div>
            }
            name="nhomDvKhoCap1Id"
          >
            <Select
              data={listNhomThuoc}
              placeholder={t("danhMuc.chonMaNhomThuoc")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/phan-nhom-thuoc")}
              >
                {t("danhMuc.phanNhomThuoc")}
              </div>
            }
            name="phanNhomDvKhoId"
          >
            <Select
              data={listAllNhomDichVuKho}
              placeholder={t("danhMuc.chonPhanNhomThuoc")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/phan-loai-thuoc")}
              >
                {t("danhMuc.phanLoaiThuoc")}
              </div>
            }
            name="phanLoaiDvKhoId"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongChonPhanLoaiThuoc"),
              },
            ]}
          >
            <Select
              data={listAllPhanLoaiThuoc}
              placeholder={t("danhMuc.chonPhanLoaiThuoc")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                {t("danhMuc.donViSoCap")}
              </div>
            }
            name="dvtSoCapId"
            rules={[
              {
                required: state.heSoDinhMuc > 1,
                message: t(
                  "danhMuc.batBuocDienDonViSoCapKhiHeSoDinhMucLonHon1"
                ),
              },
            ]}
          >
            <Select
              data={listAllDonViTinh}
              placeholder={t("danhMuc.chonDonViSoCap")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                {t("danhMuc.donViThuCap")}
              </div>
            }
            name="dvtThuCapId"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongChonDonViThuCap"),
              },
            ]}
          >
            <Select
              data={listAllDonViTinh}
              placeholder={t("danhMuc.chonDonViThuCap")}
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.heSoDinhMuc")}
            name="heSoDinhMuc"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongNhapHeSoDinhMuc"),
              },
              {
                pattern: new RegExp(/^[1-9][0-9]*$/),
                message: t("danhMuc.vuiLongNhapHeSoDinhMucLonHon0"),
              },

              { validator: validator },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              maxLength={10}
              className="input-option"
              placeholder={t("danhMuc.nhapHeSoDinhMuc")}
              onChange={
                changeValue("heSoDinhMuc")
                //   (e) => {
                //   console.log(e, "123");
                // }
              }
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.dungTich")} name="dungTich">
            <InputNumber
              style={{ width: "100%" }}
              maxLength={10}
              className="input-option"
              placeholder={t("danhMuc.nhapDungTich")}
              onChange={changeValue("dungTich")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.quyCach")} name="quyCach">
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapQuyCach")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/xuat-xu")}
              >
                {t("danhMuc.nuocSanXuat")}
              </div>
            }
            name="xuatXuId"
          >
            <Select
              data={listAllXuatXu}
              placeholder={t("danhMuc.chonNuocSanXuat")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/doi-tac")}
              >
                {t("danhMuc.nhaSanXuat")}
              </div>
            }
            name="nhaSanXuatId"
          >
            <Select data={listNSX} placeholder={t("danhMuc.chonNhaSanXuat")} />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/doi-tac")}
              >
                {t("danhMuc.nhaCungCap")}
              </div>
            }
            name="nhaCungCapId"
          >
            <Select data={listNCC} placeholder={t("danhMuc.chonNhaCungCap")} />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.giaSauVAT1DvtSoCap")}
            name="giaNhapSauVat"
          >
            <InputNumberFormat
              className="input-option"
              placeholder={t("danhMuc.nhapGiaSauVAT1DvtSoCap")}
            />
          </Form.Item>
          {!hiddenField.includes("giaTran") && (
            <Form.Item label={t("danhMuc.giaTran")} name="giaTran">
              <InputNumberFormat
                className="input-option"
                placeholder={t("danhMuc.nhapGiaTran")}
              />
            </Form.Item>
          )}
          {!hiddenField.includes("tranBaoHiem") && (
            <Form.Item label={t("danhMuc.tranBaoHiem")} name="tranBaoHiem">
              <InputNumberFormat
                className="input-option"
                placeholder={t("danhMuc.nhapTranBaoHiem")}
              />
            </Form.Item>
          )}
          <Form.Item
            label={t("danhMuc.tyLeBhThanhToan")}
            name="tyLeBhTt"
            rules={[
              {
                pattern: new RegExp(/^.{1,3}$/),
                message: t("danhMuc.vuiLongNhapTyLeBhThanhToanKhongQua3KyTu"),
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapTyLeBhThanhToan")}
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.tyLeThanhToanDichVu")}
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: t("danhMuc.vuiLongNhapTyLeThanhToanDichVu"),
              },
              {
                pattern: new RegExp(/^[0-9]{1,3}$/),
                message: t("danhMuc.vuiLongNhapTyLeDvThanhToanKhongQua3KyTu"),
              },
            ]}
          >
            <Input
              type="number"
              className="input-option"
              placeholder={t("danhMuc.tyLeThanhToanDichVu")}
            />
          </Form.Item>

          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                {t("danhMuc.nhomDichVuCap1")}
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "danhMuc.vuiLongChonNhomDichVuCap1",
              },
            ]}
          >
            <Select
              data={listNhomDvCap1}
              placeholder={t("danhMuc.chonNhomdichVuCap1")}
            />
          </Form.Item>
          {!hiddenField.includes("nhomDichVuCap2Id") && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
                >
                  {t("danhMuc.nhomDichVuCap2")}
                </div>
              }
              name="nhomDichVuCap2Id"
              rules={
                optionalField.includes("nhomDichVuCap2Id")
                  ? []
                  : [
                      {
                        required: true,
                        message: t("danhMuc.vuiLongChonNhomDichVuCap2"),
                      },
                    ]
              }
            >
              <Select
                data={listNhomDvCap2}
                placeholder={t("danhMuc.chonNhomdichVuCap2")}
              />
            </Form.Item>
          )}
          {!hiddenField.includes("nhomDichVuCap3Id") && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
                >
                  {t("danhMuc.nhomDichVuCap3")}
                </div>
              }
              name="nhomDichVuCap3Id"
            >
              <Select
                data={listNhomDvCap3}
                placeholder={t("danhMuc.chonNhomdichVuCap3")}
              />
            </Form.Item>
          )}
          {!hiddenField.includes("maTuongDuong") && (
            <Form.Item label={t("danhMuc.maTuongDuong")} name="maTuongDuong">
              <Input
                className="input-option"
                placeholder={t("danhMuc.nhapMaTuongDuong")}
              />
            </Form.Item>
          )}
          <Form.Item label={t("danhMuc.tenTuongDuong")} name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapTenTuongDuong")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.soVisa")} name="soVisa">
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapSoVisa")}
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.maLienThongDuocQuocGia")}
            name="maLienThong"
          >
            <Input
              className="input-option"
              placeholder={t("danhMuc.nhapMaLienThongDuocQuocGia")}
            />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.nguonChiTraKhac")}
            name="dsNguonKhacChiTra"
          >
            <Select
              mode="multiple"
              data={listNguonKhacChiTra}
              placeholder={t("danhMuc.nguonChiTraKhac")}
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="pointer">
                {t("danhMuc.khoaChiDinhTheoDvtSoCap")}
              </div>
            }
            name="dsKhoaCdDvtSoCapId"
          >
            <Select
              mode="multiple"
              data={listDataTongHop}
              // onChange={onChangeFields(listKhoa)}
              placeholder={t("danhMuc.chonKhoaChiDinhTheoDvtSoCap")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.mucDichSuDung")} name="dsMucDichSuDung">
            <Select
              mode="multiple"
              data={listDsMucDichSuDung}
              // onChange={onChangeFields(listDsMucDichSuDung)}
              placeholder={t("danhMuc.chonMucDichSuDung")}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.duongDung")} name="duongDungId">
            <Select
              placeholder={t("danhMuc.duongDung")}
              data={listAllDuongDung}
            />
          </Form.Item>
          <Form.Item label={t("danhMuc.nhomThau")} name="nhomThau">
            <Select placeholder={t("danhMuc.nhomThau")} data={listnhomThau} />
          </Form.Item>
          <Form.Item label={t("danhMuc.goiThau")} name="goiThau">
            <Select placeholder={t("danhMuc.goiThau")} data={listgoiThau} />
          </Form.Item>
          <Form.Item
            label={t("danhMuc.quyetDinhThau")}
            name="quyetDinhThau"
            rules={[{ max: 25, message: t("danhMuc.khongDuocNhapQua25KyTu") }]}
          >
            <Input placeholder={t("danhMuc.quyetDinhThau")} />
          </Form.Item>
          <Form.Item label=" " name="chiDinhSlLe" valuePropName="checked">
            <Checkbox>{t("danhMuc.choPhepKeSlLe")}</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="theoDoiNgaySd" valuePropName="checked">
            <Checkbox>{t("danhMuc.theoDoiNgaySd")}</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
            <Checkbox>{t("danhMuc.khongTinhTien")}</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="thuocDauSao" valuePropName="checked">
            <Checkbox>{t("danhMuc.thuocDauSao")}</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="mucDichSuDung" valuePropName="checked">
            <Checkbox>{t("danhMuc.apDungTt30")}</Checkbox>
          </Form.Item>
          {currentItem && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>{t("danhMuc.coHieuLuc")}</Checkbox>
            </Form.Item>
          )}
        </Form>
        {/* </fieldset> */}
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    danhMucThuoc: { currentItem },
    khoa: { listKhoa, listDataTongHop },
  } = state;
  return { currentItem, listKhoa, listDataTongHop };
};

const mapDispatchToProps = ({
  danhMucThuoc: { createOrEdit },
  khoa: { getListKhoaTongHop },
}) => ({
  createOrEdit,
  getListKhoaTongHop,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceInfo);
