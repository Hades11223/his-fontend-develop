import React, { useState, useEffect, useRef, useMemo } from "react";
import { Checkbox, Input, Form, InputNumber, Select as SelectAntd } from "antd";
import { InputTimeout, Select } from "components";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { useDispatch, useSelector } from "react-redux";
import { openInNewTab } from "utils";
import ModalListDichVuTimKiem from "./ModalListDichVuTimKiem";
import TableChiTietKichCo from "./TableChiTietKichCo";
import TableChiTietBo from "./TableChiTietBo";
import TabPanel from "../../../../../components/MultiLevelTab/TabPanel";
import FormWraper from "components/FormWraper";
import SelectLoadMore from "components/SelectLoadMore";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
const { Option } = SelectAntd;

const FormChiTietThau = ({ layerId, ignoreField = [], ...props }, ref) => {
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    vatTuBo: false,
    vatTuKichCo: false,
    disabled: false,
    showField: false,
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef();
  const refSearchHangHoa = useRef();
  const { listAllQuyetDinhThau } = useSelector((state) => state.quyetDinhThau);
  const { newRecordThau } = useSelector((state) => state.dichVuKho);

  const { listAllXuatXu } = useSelector((state) => state.xuatXu);
  const { listAllNhomDichVuKhoCap1 } = useSelector(
    (state) => state.nhomDichVuKho
  );
  const { listDataVatTuBo: listDataVatTuBoDanhMuc } = useSelector(
    (state) => state.danhMucVatTu
  );
  const listDataTongHop = useStore("nhomChiPhi.listDataTongHop", []);

  const listTongHopNhaSanXuat = useStore("doiTac.listTongHopNhaSanXuat", []);
  const listTongHopNhaCungCap = useStore("doiTac.listTongHopNhaCungCap", []);
  const dataEditDefault = useStore("quyetDinhThauChiTiet.dataEditDefault");

  const { onSearchTongHop } = useDispatch().nhomChiPhi;
  const { getListTongHopNhaSanXuat, getListTongHopNhaCungCap } =
    useDispatch().doiTac;

  const {
    onSearch: onSearchQuyetDinhThau,
    createOrEdit,
    createBatch,
  } = useDispatch().quyetDinhThauChiTiet;
  const { getListVatTuBo: getListVatTuBoDanhMuc } = useDispatch().danhMucVatTu;
  const { onSearch } = useDispatch().dichVuKho;
  const [listgoiThau] = useEnum(ENUM.GOI_THAU);
  const [listnhomThau] = useEnum(ENUM.NHOM_THAU);
  const [listloaiThuocThau] = useEnum(ENUM.LOAI_THUOC_THAU);
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    if (listDataVatTuBoDanhMuc.length) {
      setState({ listVatTuCon: listDataVatTuBoDanhMuc });
    }
  }, [listDataVatTuBoDanhMuc]);
  useEffect(() => {
    if (dataEditDefault) {
      const newInfo = {
        ...dataEditDefault,
        nam: dataEditDefault?.quyetDinhThau?.nam,
        ma: dataEditDefault?.dichVu?.ma,
        tenDonViTinh: dataEditDefault?.dichVu?.tenDonViTinh,
        maHoatChat: dataEditDefault?.dichVu?.maHoatChat,
        hamLuong: dataEditDefault?.dichVu?.hamLuong,
        tenDuongDung: dataEditDefault?.dichVu?.tenDuongDung,
        tenQuyetDinhThau: dataEditDefault?.quyetDinhThau?.quyetDinhThau,
        tenNhomChiPhi: dataEditDefault?.nhomChiPhi?.ten,
      };
      setState({
        loaiDichVuThau: dataEditDefault?.dichVu?.loaiDichVu,
        showField:
          dataEditDefault?.dichVu?.loaiDichVu !== 100 &&
          dataEditDefault?.dichVu?.loaiDichVu !== 110,
        dataEdit: newInfo,
        disabled:
          dataEditDefault?.trangThai && dataEditDefault?.trangThai !== 10,
        vatTuBo: newInfo.dichVu?.vatTuBo,
        vatTuKichCo: newInfo.dichVu?.vatTuKichCo,
        dataVatTuCha: newInfo,
        id: dataEditDefault?.id,
      });
      form.setFieldsValue(newInfo);
    } else {
      form.resetFields();
    }
  }, [dataEditDefault]);
  useEffect(() => {
    if (newRecordThau) {
      const newInfo = {
        giaNhap: newRecordThau?.giaNhap,
        giaNhapSauVat: newRecordThau?.giaNhapSauVat,
        giaKhongBaoHiem: newRecordThau?.giaKhongBaoHiem,
        giaBaoHiem: newRecordThau?.giaBaoHiem,
        quyCach: newRecordThau?.quyCach,
        nhaCungCapId: newRecordThau?.nhaCungCapId,
        soVisa: newRecordThau?.soVisa,
        tyLeBhTt: newRecordThau?.tyLeBhTt,
        xuatXuId: newRecordThau?.xuatXuId,
        nhaSanXuatId: newRecordThau?.nhaSanXuatId,
        tranBaoHiem: newRecordThau?.tranBaoHiem,
        hamLuong: newRecordThau?.hamLuong,
        hoatChatId: newRecordThau?.hoatChatId,
        donViTinhId: newRecordThau?.donViTinhId,
        ma: newRecordThau?.ma,
        maKyHieu: newRecordThau?.maKyHieu,
        tenDuongDung: newRecordThau?.tenDuongDung,
        giaTran: newRecordThau?.giaTran,
        dichVuId: newRecordThau?.id,
        maTuongDuong: newRecordThau?.maTuongDuong,
        nhomDvKhoCap1Id:
          newRecordThau?.loaiDichVu === 90
            ? null
            : newRecordThau?.nhomDvKhoCap1Id,
        tenDonViTinh: newRecordThau?.tenDonViTinh,
        maHoatChat: newRecordThau?.maHoatChat,
      };
      form.setFieldsValue(newInfo);
      setState({
        showField:
          newRecordThau?.loaiDichVu !== 100 &&
          newRecordThau?.loaiDichVu !== 110,
        vatTuBo: newRecordThau?.vatTuBo,
        vatTuKichCo: newRecordThau?.vatTuKichCo,
        dataVatTuCha: {
          ...newInfo,
          quyetDinhThauId: form.getFieldValue("quyetDinhThauId"),
          dichVu: newRecordThau?.dichVu,
        },
      });
      onSearchTongHop({
        dichVuId: newRecordThau?.id,
      });
      if (newRecordThau?.vatTuBo) {
        getListVatTuBoDanhMuc({
          vatTuBoId: newRecordThau?.id,
          "dichVu.loaiDichVu": newRecordThau?.loaiDichVu,
        });
      }
    }
  }, [newRecordThau]);

  const onShowDsHangHoa = (e, item) => {
    onSearch({
      dataSearch: { ten: item.label, ...state?.addParam },
    }).then((s) => {
      if (s?.data.length === 1) {
        let dichVu = s?.data[0];
        const newInfo = {
          giaNhap: dichVu.giaNhap,
          giaNhapSauVat: dichVu.giaNhapSauVat,
          giaKhongBaoHiem: dichVu.giaKhongBaoHiem,
          giaBaoHiem: dichVu.giaBaoHiem,
          quyCach: dichVu.quyCach,
          nhaCungCapId: dichVu.nhaCungCapId,
          soVisa: dichVu.soVisa,
          tyLeBhTt: dichVu.tyLeBhTt,
          xuatXuId: dichVu.xuatXuId,
          nhaSanXuatId: dichVu.nhaSanXuatId,
          tranBaoHiem: dichVu.tranBaoHiem,
          hamLuong: dichVu.hamLuong,
          hoatChatId: dichVu.hoatChatId,
          donViTinhId: dichVu.donViTinhId,
          ma: dichVu.ma,
          maKyHieu: dichVu.maKyHieu,
          tenDuongDung: dichVu.tenDuongDung,
          giaTran: dichVu.giaTran,
          dichVuId: dichVu.id,
          maTuongDuong: dichVu.maTuongDuong,
          nhomDvKhoCap1Id:
            dichVu.loaiDichVu === 90 ? null : dichVu.nhomDvKhoCap1Id,
          tenDonViTinh: dichVu?.donViTinh?.ten,
          maHoatChat: dichVu?.maHoatChat,
        };
        form.setFieldsValue(newInfo);
        setState({
          showField: dichVu.loaiDichVu !== 100 && dichVu.loaiDichVu !== 110,
          vatTuBo: dichVu.vatTuBo,
          vatTuKichCo: dichVu.vatTuKichCo,
          dataVatTuCha: {
            ...newInfo,
            quyetDinhThauId: form.getFieldValue("quyetDinhThauId"),
            dichVu: dichVu,
          },
        });
        onSearchTongHop({ dichVuId: e });
      } else {
        refSearchHangHoa.current.show({
          ten: item.lists?.ten,
        });
      }
    });
  };

  const onChangeField = (fieldName, value, option) => {
    if ("quyetDinhThau" === fieldName) {
      let loaiDV = option?.lists.loaiDichVu || null;
      setState({
        showField: loaiDV !== 100 && loaiDV !== 110,
        loaiDichVu: loaiDV,
        loaiDichVuThau: loaiDV,
        addParam: { loaiDichVu: loaiDV },
      });
      form.setFieldsValue({ nam: option?.lists.nam });
      getListTongHopNhaSanXuat({
        page: "",
        size: "",
        active: true,

        loaiDichVu: loaiDV,
      });
      getListTongHopNhaCungCap({
        page: "",
        size: "",
        active: true,
        loaiDichVu: loaiDV,
      });
    }
    if ("soLuongThau" === fieldName) {
      form.setFieldsValue({ soLuongDuocPhepMua: value, nguongThau: value });
      setState({
        dataVatTuCha: { ...state?.dataVatTuCha, soLuongThau: value },
      });
    }

    if ("maTrungThau" === fieldName) {
      form.setFieldsValue({ maDauThau: value?.target?.value });
    }
    if ("nhaCungCapId" === fieldName) {
      setState({
        dataVatTuCha: { ...state?.dataVatTuCha, nhaCungCapId: value },
      });
    }
  };
  const validateSoLuong = async (rule, value) => {
    if (value > form.getFieldValue("soLuongThau") * 1.2)
      return Promise.reject(
        new Error(t("kho.quyetDinhThau.khongDuocPhepNhapSlLonHon120%SlThau"))
      );
  };

  const validatorGia = async (rule, value) => {
    if (form.getFieldValue("tyLeBhTt") === 0 && value > 0) {
      return Promise.reject(
        new Error(t("kho.quyetDinhThau.tiLeThanhToanBhDonGiaBang0"))
      );
    }
    if (
      form.getFieldValue("tyLeBhTt") > 0 &&
      value !== form.getFieldValue("giaNhapSauVat")
    ) {
      return Promise.reject(
        new Error(
          t("kho.quyetDinhThau.tiLeThanhToanBhLonHon0DonGiaBhBangDonGiaSauVat")
        )
      );
    }
  };

  const onSave = (e) => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  const handleSumitForm = (values) => {
    createOrEdit({ ...values, id: dataEditDefault?.id })
      .then((s) => {
        let bodyVatTuCon = (state?.listVatTuCon || []).map((item) => {
          return {
            ...item,
            vatTuBoId: s?.id,
          };
        });
        bodyVatTuCon.length && createBatch(bodyVatTuCon);
        onSearchQuyetDinhThau({});
      })
      .catch((err) => console.error(err));
  };

  const handleErrors = (errors) => {
    console.log("errors: ", errors);
  };

  const selectedVatTuCon = (item) => {
    setState({ listVatTuCon: item });
  };

  const options = useMemo(() => {
    return (listDataTongHop || []).map((item) => {
      return (
        <Option lists={item} key={item.id} value={item.id}>
          {`${item.ten}`}
        </Option>
      );
    });
  }, [listDataTongHop]);

  const listDataThauTongHop = useMemo(() => {
    let item = listAllQuyetDinhThau.find(
      (x) => x.id === dataEditDefault?.quyetDinhThauId && x.trangThai !== 10
    );
    if (item) {
      return [item, ...listAllQuyetDinhThau.filter((x) => x.trangThai === 10)];
    } else {
      return listAllQuyetDinhThau.filter((x) => x.trangThai === 10);
    }
  }, [listAllQuyetDinhThau, dataEditDefault]);
  const onCancel = (data) => {
    form.setFieldsValue(data);
  };

  const addValue = useMemo(
    () =>
      dataEditDefault?.id && {
        value: dataEditDefault?.dichVuId,
        label: dataEditDefault?.dichVu?.ten,
      },
    [dataEditDefault]
  );
  return (
    <TabPanel>
      <EditWrapper
        title={t("kho.quyetDinhThau.thongTinChiTiet")}
        onCancel={() => onCancel(dataEditDefault)}
        onSave={onSave}
        showAdded={false}
        isShowSaveButton={true}
        isShowCancelButton={true}
      >
        <FormWraper
          // ref={formRef}
          form={form}
          layout="vertical"
          onFinish={handleSumitForm}
          onError={handleErrors}
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label={t("kho.quyetDinhThau.title")}
            name="quyetDinhThauId"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapQuyetDinhThau"),
              },
            ]}
          >
            <Select
              placeholder={t("kho.quyetDinhThau.chonThauTruocKhiChonHangHoa")}
              data={listDataThauTongHop}
              ten="quyetDinhThau"
              onChange={(value, option) =>
                onChangeField("quyetDinhThau", value, option)
              }
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.tenHangHoa")}
            name="dichVuId"
            rules={[
              {
                required: true,
                message: t("kho.vuiLongChonHangHoa"),
              },
            ]}
          >
            <SelectLoadMore
              api={dichVuKhoProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              keySearch={"ten"}
              placeholder={t("kho.vuiLongChonHangHoa")}
              onChange={onShowDsHangHoa}
              disabled={!form.getFieldValue("quyetDinhThauId")}
              refSelect={refAutoFocus}
              addParam={state?.addParam}
              addValue={addValue}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.maHangHoaTrungThau")}
            name="maTrungThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapMaTrungThau"),
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapMaTrungThau")}
              disabled={state?.disabled}
              onChange={(value) => onChangeField("maTrungThau", value)}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.tenHangHoaTrungThau")}
            name="tenTrungThau"
          >
            <Input
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapTenTrungThau")}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.maHangHoaDauThau")}
            name="maDauThau"
          >
            <Input
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapMaDauThau")}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.slThau")}
            name="soLuongThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapSlThau"),
              },
            ]}
          >
            <InputTimeout
              type="number"
              formatPrice={true}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapSlThau")}
              min={0}
              disabled={state?.disabled}
              onChange={(value) => onChangeField("soLuongThau", value)}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.slDuocPhepMua")}
            name="soLuongDuocPhepMua"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapSlDuocPhepMua"),
              },
              {
                validator: validateSoLuong,
              },
            ]}
          >
            <InputTimeout
              type="number"
              formatPrice={true}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapSlDuocPhepMua")}
              min={0}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.giaNhapSauVat")}
            name="giaNhapSauVat"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapGiaSauVat"),
              },
            ]}
          >
            <InputTimeout
              type="number"
              formatPrice={true}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapGiaSauVat")}
              min={0}
              disabled={state?.disabled}
            />
          </Form.Item>
          {![110].includes(state?.loaiDichVuThau) && (
            <Form.Item
              label={t("kho.quyetDinhThau.donGiaKhongBh")}
              name="giaKhongBaoHiem"
              rules={[
                !(state?.loaiDichVuThau == 100)
                  ? {
                      required: true,
                      message: t("kho.quyetDinhThau.vuiLongNhapGiaKhongBh"),
                    }
                  : {},
                { validator: validatorGia },
              ]}
            >
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder={t("kho.quyetDinhThau.vuiLongNhapGiaKhongBh")}
                min={0}
                disabled={state?.disabled}
                onChange={(value) => onChangeField("giaKhongBaoHiem", value)}
              />
            </Form.Item>
          )}
          <Form.Item
            label={t("kho.quyetDinhThau.donGiaBh")}
            name="giaBaoHiem"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapGiaBh"),
              },
              { validator: validatorGia },
            ]}
          >
            <InputTimeout
              type="number"
              formatPrice={true}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapGiaBh")}
              min={0}
              disabled={state?.disabled}
              onChange={(value) => onChangeField("giaBaoHiem", value)}
            />
          </Form.Item>
          {![110].includes(state?.loaiDichVuThau) && (
            <Form.Item
              label={t("kho.quyetDinhThau.phuThu")}
              name="giaPhuThu"
              rules={[
                ![90, 100].includes(state?.loaiDichVuThau)
                  ? {
                      required: true,
                      message: t("kho.quyetDinhThau.vuiLongNhapGiaPhuThu"),
                    }
                  : {},
                { validator: validatorGia },
              ]}
            >
              <InputTimeout
                type="number"
                formatPrice={true}
                className="input-option"
                placeholder={t("kho.quyetDinhThau.vuiLongNhapGiaPhuThu")}
                min={0}
                disabled={state?.disabled}
                onChange={(value) => onChangeField("giaPhuThu", value)}
              />
            </Form.Item>
          )}
          <Form.Item
            label={t("kho.quyetDinhThau.quyCach")}
            name="quyCach"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapQuyCach"),
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapQuyCach")}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.nhaCungCap")}
            name="nhaCungCapId"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonNhaCungCap"),
              },
            ]}
          >
            <Select
              placeholder={t("kho.quyetDinhThau.vuiLongChonNhaCungCap")}
              data={listTongHopNhaCungCap}
              disabled={state?.disabled}
            />
          </Form.Item>
          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.maGoiThau")}
              name="goiThau"
              rules={[
                {
                  required: true,
                  message: t("kho.quyetDinhThau.vuiLongChonMaGoiThau"),
                },
              ]}
            >
              <Select
                placeholder={t("kho.quyetDinhThau.vuiLongChonMaGoiThau")}
                data={listgoiThau}
                disabled={state?.disabled}
              />
            </Form.Item>
          )}
          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.soVisa")}
              name="soVisa"
              rules={[
                {
                  required: true,
                  message: t("kho.quyetDinhThau.vuiLongNhapSoVisa"),
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder={t("kho.quyetDinhThau.vuiLongNhapSoVisa")}
                disabled={state?.disabled}
              />
            </Form.Item>
          )}
          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.nhomThau")}
              name="nhomThau"
              rules={[
                {
                  required: true,
                  message: t("kho.quyetDinhThau.vuiLongChonNhomThau"),
                },
              ]}
            >
              <Select
                placeholder={t("kho.quyetDinhThau.vuiLongChonNhomThau")}
                data={listnhomThau}
                disabled={state?.disabled}
              />
            </Form.Item>
          )}
          <Form.Item
            label={t("kho.quyetDinhThau.nhomChiPhi")}
            name="nhomChiPhiId"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonNhomChiPhi"),
              },
            ]}
          >
            <SelectAntd
              placeholder={t("kho.quyetDinhThau.vuiLongChonNhomChiPhi")}
            >
              {options}
            </SelectAntd>
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.tyLeThanhToanBh")}
            name="tyLeBhTt"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapTyLeThanhToanBh"),
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapTyLeThanhToanBh")}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              min={0}
              max={100}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.nguongThau")}
            name="nguongThau"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongNhapNguongThau"),
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapNguongThau")}
              disabled={state?.disabled}
            />
          </Form.Item>
          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.loaiThuoc")}
              name="loaiThuoc"
              rules={[
                {
                  required: true,
                  message: t("kho.quyetDinhThau.vuiLongChonLoaiThuoc"),
                },
              ]}
            >
              <Select
                placeholder={t("kho.quyetDinhThau.vuiLongChonLoaiThuoc")}
                data={listloaiThuocThau}
                disabled={state?.disabled}
              />
            </Form.Item>
          )}
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/xuat-xu")}
              >
                {t("kho.quyetDinhThau.xuatXu")}
              </div>
            }
            name="xuatXuId"
            rules={[
              {
                required: true,
                message: t("kho.quyetDinhThau.vuiLongChonXuatXu"),
              },
            ]}
          >
            <Select
              placeholder={t("kho.quyetDinhThau.vuiLongChonXuatXu")}
              data={listAllXuatXu}
              disabled={state?.disabled}
            />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.nhaSanXuat")}
            name="nhaSanXuatId"
          >
            <Select
              placeholder={t("kho.quyetDinhThau.vuiLongChonNhaSanXuat")}
              data={listTongHopNhaSanXuat}
              disabled={state?.disabled}
            />
          </Form.Item>
          {![90, 110].includes(state?.loaiDichVuThau) && (
            <Form.Item
              label={t("kho.quyetDinhThau.tranBaoHiem")}
              name="tranBaoHiem"
            >
              <Input disabled className="input-option" />
            </Form.Item>
          )}
          <Form.Item label={t("kho.quyetDinhThau.soHopDong")} name="soHopDong">
            <Input
              disabled={state?.disabled}
              className="input-option"
              placeholder={t("kho.quyetDinhThau.vuiLongNhapSoHopDong")}
            />
          </Form.Item>
          {state?.showField && (
            <Form.Item label={t("kho.quyetDinhThau.giaTran")} name="giaTran">
              <Input disabled className="input-option" />
            </Form.Item>
          )}

          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.duongDung")}
              name="tenDuongDung"
            >
              <Input disabled className="input-option" />
            </Form.Item>
          )}
          {state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.maHoatChat")}
              name="maHoatChat"
            >
              <Input disabled className="input-option" />
            </Form.Item>
          )}
          {state?.showField && (
            <Form.Item label={t("kho.quyetDinhThau.hamLuong")} name="hamLuong">
              <Input disabled className="input-option" />
            </Form.Item>
          )}
          <Form.Item label={t("kho.quyetDinhThau.maHangHoa")} name="ma">
            <Input disabled className="input-option" />
          </Form.Item>
          <Form.Item label={t("kho.quyetDinhThau.nam")} name="nam">
            <Input disabled className="input-option" />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.donViTinh")}
            name="tenDonViTinh"
          >
            <Input disabled className="input-option" />
          </Form.Item>
          <Form.Item label={t("kho.quyetDinhThau.maAnhXa")} name="maTuongDuong">
            <Input className="input-option" />
          </Form.Item>
          {!state?.showField && (
            <Form.Item label={t("kho.quyetDinhThau.maHieu")} name="maKyHieu">
              <Input className="input-option" />
            </Form.Item>
          )}
          {!state?.showField && (
            <Form.Item
              label={t("kho.quyetDinhThau.nhomVatTu")}
              name="nhomDvKhoCap1Id"
            >
              <Select
                data={listAllNhomDichVuKhoCap1}
                disabled
                className="input-option"
              />
            </Form.Item>
          )}
          <Form.Item
            label={t("kho.quyetDinhThau.soLuongHangHoaDaNhap")}
            name="soLuongNhap"
          >
            <Input className="input-option" min={0} disabled={true} />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.soLuongHangHoaDaTraLaiNcc")}
            name="soLuongTra"
          >
            <Input className="input-option" min={0} disabled={true} />
          </Form.Item>
          <Form.Item
            label={t("kho.quyetDinhThau.soLuongHangHoaConLai")}
            name="soLuongCon"
          >
            <Input className="input-option" min={0} disabled={true} />
          </Form.Item>
          {state?.dataEdit && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox disabled={state?.disabled}>
                {t("kho.coHieuLuc")}
              </Checkbox>
            </Form.Item>
          )}
        </FormWraper>
        {state?.vatTuKichCo && <TableChiTietKichCo />}
        {state?.vatTuBo && (
          <TableChiTietBo
            selectedVatTuCon={selectedVatTuCon}
            listVatTuCon={state?.listVatTuCon}
            vatTuCha={state?.dataVatTuCha}
          />
        )}
        <ModalListDichVuTimKiem ref={refSearchHangHoa} />
      </EditWrapper>
    </TabPanel>
  );
};

export default FormChiTietThau;
