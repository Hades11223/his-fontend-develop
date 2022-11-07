import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Input, Form } from "antd";
import { BaoCaoChiTietStyle, Wrapper } from "./styled";
import FormWraper from "components/FormWraper";
import { ModalNotification2 } from "components/ModalConfirm";
import { Select, Button } from "components";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";

const ThongTinThietLapQuyenKy = ({ refCallbackSave = {} }) => {
  const refConfirmXoaRow = useRef(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [state, _setState] = useState({
    loaiPhanQuyenKy: 10,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const dataEditDefault = useStore("thietLapQuyenKy.dataEditDefault", {});
  const listAllVaiTroHeThong = useStore(
    "adminVaiTroHeThong.listAllVaiTroHeThong",
    []
  );
  const listAllQuyenKy = useStore("quyenKy.listAllQuyenKy", []);
  const listAllKhoa = useStore("khoa.listAllKhoa", []);

  const {
    khoa: { getListAllKhoa },
    thietLapQuyenKy: { createOrEdit },
    adminVaiTroHeThong: { getListAllVaiTroHeThong },
  } = useDispatch();

  useEffect(() => {
    if (!dataEditDefault?.id) {
      form.resetFields();
      form.setFieldsValue({
        loaiPhanQuyenKy: 10,
      });
      setState({ loaiPhanQuyenKy: 10 });
    } else {
      form.setFieldsValue({
        ...dataEditDefault,
        ten: dataEditDefault?.nhanVien?.ten,
        loaiPhanQuyenKy: dataEditDefault?.vaiTroId ? 10 : 20,
      });
      setState({
        loaiPhanQuyenKy: dataEditDefault?.vaiTroId ? 10 : 20,
      });
    }
    // }
  }, [dataEditDefault]);

  useEffect(() => {
    getListAllVaiTroHeThong({ active: true, page: "", size: "" });
    getListAllKhoa({ active: true, page: "", size: "" });
    form.setFieldsValue({ loaiPhanQuyenKy: 10 });
  }, []);
  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let formattedData = {
          nhanVienId: values?.nhanVienId || null,
          khoaChiDinhId: values?.khoaChiDinhId || null,
          quyenKyId: values?.quyenKyId || null,
          khoaThucHienId: values?.khoaThucHienId || null,
          vaiTroId: values?.vaiTroId || null,
          id: dataEditDefault?.id,
        };
        createOrEdit(formattedData).then(() => {
          if (!dataEditDefault?.id) {
            form.resetFields();
          }
        });
      })
      .catch((error) => {});
  };

  const handleCancel = () => {
    if (dataEditDefault?.id) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  refCallbackSave.current = handleAdded;
  const listTaiKhoan = useMemo(() => {
    return (listAllNhanVien || []).map((item) => {
      return { id: item?.id, ten: item?.taiKhoan, tenNhanVien: item?.ten };
    });
  }, [listAllNhanVien]);
  const listLoaiPhanQuyenKy = [
    {
      id: 10,
      ten: "Theo vai trò",
    },
    {
      id: 20,
      ten: "Theo tài khoản",
    },
  ];

  const onChangeFields = (key) => (e, item) => {
    if (key === "loaiPhanQuyenKy") {
      setState({ loaiPhanQuyenKy: e });
      form.setFieldsValue({
        vaiTroId: undefined,
        nhanVienId: undefined,
        ten: undefined,
      });
    }
    if (key === "nhanVienId") {
      form.setFieldsValue({
        ten: item?.lists?.tenNhanVien,
      });
    }
  };
  return (
    <BaoCaoChiTietStyle>
      <Wrapper>
        <div className="header-create">
          <div className="create-title">{t("kySo.thongTinChiTiet")}</div>
        </div>
        <div className="header-body">
          <FormWraper form={form} layout="vertical" className="form-custom">
            <Form.Item
              label={t("kySo.loaiQuyenKy")}
              name="loaiPhanQuyenKy"
              rules={[
                {
                  required: true,
                  message: t("kySo.vuiLongChonLoaiPhanQuyenKy"),
                },
              ]}
            >
              <Select
                placeholder={t("kySo.vuiLongChonLoaiPhanQuyenKy")}
                data={listLoaiPhanQuyenKy}
                onChange={onChangeFields("loaiPhanQuyenKy")}
              ></Select>
            </Form.Item>
            {state?.loaiPhanQuyenKy === 10 && (
              <Form.Item
                label={t("kySo.tenVaiTro")}
                name="vaiTroId"
                rules={[
                  {
                    required: true,
                    message: t("kySo.vuiLongNhapTenVaiTro"),
                  },
                ]}
              >
                <Select
                  placeholder={t("kySo.vuiLongNhapTenVaiTro")}
                  data={listAllVaiTroHeThong}
                ></Select>
              </Form.Item>
            )}
            {state?.loaiPhanQuyenKy === 20 && (
              <Form.Item
                label={
                  <a
                    style={{ color: "#172b4d" }}
                    href="/quan-tri/danh-muc-tai-khoan"
                    target="_blank"
                  >
                    {t("kySo.tenTaiKhoan")}
                  </a>
                }
                name="nhanVienId"
                rules={[
                  {
                    required: true,
                    message: t("kySo.vuiLongNhapTenTaiKhoan"),
                  },
                ]}
              >
                <Select
                  data={listTaiKhoan}
                  placeholder={t("kySo.vuiLongNhapTenTaiKhoan")}
                  onChange={onChangeFields("nhanVienId")}
                ></Select>
              </Form.Item>
            )}
            {state?.loaiPhanQuyenKy === 20 && (
              <Form.Item label={t("kySo.hoVaTenNhanVien")} name="ten">
                <Input
                  className="input-option"
                  placeholder={t("kySo.vuiLongNhapHoVaTenNhanVien")}
                  disabled={true}
                />
              </Form.Item>
            )}
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/quyen-ky"
                  target="_blank"
                >
                  {t("kySo.quyenKy")}
                </a>
              }
              name="quyenKyId"
              rules={[
                {
                  required: true,
                  message: t("kySo.vuiLongChonQuyenKy"),
                },
              ]}
            >
              <Select
                placeholder={t("kySo.chonQuyenKy")}
                data={listAllQuyenKy}
              ></Select>
            </Form.Item>
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/khoa"
                  target="_blank"
                >
                  {t("kySo.khoaChiDinh")}
                </a>
              }
              name="khoaChiDinhId"
            >
              <Select
                placeholder={t("kySo.chonKhoaChiDinh")}
                data={listAllKhoa}
              ></Select>
            </Form.Item>
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/khoa"
                  target="_blank"
                >
                  {t("kySo.khoaThucHien")}
                </a>
              }
              name="khoaThucHienId"
            >
              <Select
                placeholder={t("kySo.chonKhoaThucHien")}
                data={listAllKhoa}
              ></Select>
            </Form.Item>
          </FormWraper>
          <div className="button-bottom-modal">
            <Button
              className="button-cancel"
              onClick={handleCancel}
              minWidth={100}
            >
              {"Hủy"}
            </Button>
            <Button
              className="button-ok"
              onClick={handleAdded}
              minWidth={100}
              type={"primary"}
              iconHeight={15}
              rightIcon={
                <img src={require("assets/images/kho/save.png")} alt=""></img>
              }
            >
              {"Lưu [F4]"}
            </Button>
          </div>
        </div>
      </Wrapper>
      <ModalNotification2 ref={refConfirmXoaRow} />
    </BaoCaoChiTietStyle>
  );
};

export default ThongTinThietLapQuyenKy;
