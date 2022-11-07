import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Row, Form, Input, Radio, Button } from "antd";
import Select from "components/Select";
import ModalDichVuMoi from "../ModalDichVuMoi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
const ModalDoiDichVu = (props, ref) => {
  const { t } = useTranslation();
  const {
    utils: { listgioiTinh },
    lyDoDoiTra: { listAllLyDoDoiTra },
    chiDinhDichVuVatTu: { listDvVatTu },
    chiDinhDichVuTuTruc: { listDvThuoc },
    dsBenhNhan: { khoaId },
    phongThucHien: { listDanhSachPhong },
    auth: { auth },
  } = useSelector((state) => state);
  const {
    dichVuKyThuat: { onChangeInputSearch },
    nbDvHoan: { doiDichVu, doiDichVuChuaTT },
    phongThucHien: { getListPhongTheoDichVu },
    chiDinhDichVuVatTu: { getListDichVuVatTu },
    chiDinhDichVuTuTruc: { getListDichVuThuoc },
    choTiepDonDV: { getTongHopDichVuCLS },
    lyDoDoiTra: { getListAllLyDoDoiTra },
  } = useDispatch();
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const serviceRef = useRef(null);
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    onChangeInputSearch({});
  }, []);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      console.log("data", data);
      setState({
        show: true,
        currentItem: cloneDeep(data),
        currentItem2: { tuoi: data.tuoi },
      });

      getListAllLyDoDoiTra();
    },
  }));
  useEffect(() => {
    if (state.currentItem) {
      getListDichVuVatTu({
        nbDotDieuTriId: state.currentItem?.nbDotDieuTriId,
      });
      getListDichVuThuoc({
        nbDotDieuTriId: state.currentItem?.nbDotDieuTriId,
      });
    }
  }, [state?.currentItem]);

  const onCancel = () => {
    setState({ show: false, dichVuMoiId: null });
    form.resetFields();
  };

  const onOk = () => {
    form.submit();
  };

  const onChangeRadio = (e) => {
    setState({ hoanThuoc: e.target.value });
  };

  const onHandleSubmit = (values) => {
    const { lyDoDoiTraId, phongId } = values;
    let dsDichVu = [
      {
        nbDichVuCuId: state?.currentItem?.id,
        dichVuMoiId: state?.dichVuMoiId,
        phongThucHienId: phongId,
      },
    ];
    let data = {
      id: state?.currentItem?.id,
      hoanThuocVatTu: state?.hoanThuoc === 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId,
      nguoiYeuCauId: auth?.nhanVienId,
    };

    if (state.currentItem?.thanhToan) {
      doiDichVu(data).then(() =>
        getTongHopDichVuCLS(
          { nbDotDieuTriId: state.currentItem?.nbDotDieuTriId },
          paramCheck
        )
      );
    } else {
      doiDichVuChuaTT({
        id: state?.currentItem?.id,
        nbDichVu: { dichVuId: state?.dichVuMoiId },
      }).then(() =>
        getTongHopDichVuCLS(
          { nbDotDieuTriId: state.currentItem?.nbDotDieuTriId },
          paramCheck
        )
      );
    }

    onCancel();
  };
  const onShowModalService = (data, dichVuMoiId) => {
    const values = { dichVuMoiId, ...data };
    serviceRef.current && serviceRef.current.show(values);
  };
  const onChangeService = (data) => {
    setState({ dichVuMoiId: data[0]?.id });
    getListPhongTheoDichVu({ dsDichVuId: data[0]?.id, khoaChiDinhId: khoaId });
    form.setFieldsValue({ tenDichVuMoi: data[0]?.dichVu?.ten });
  };
  const disabled = state?.dichVuMoiId ? false : true;

  return (
    <ModalStyled
      width={640}
      height={428}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span style={{ fontWeight: "bold" }}>
              {t("cdha.yeuCauDoiDichVu")}
            </span>
          </div>
          <div className="header__right">
            <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
              state?.currentItem?.tenNb
            } - ${
              listgioiTinh?.find((x) => x.id === state?.currentItem?.gioiTinh)
                ?.ten
            } - ${state?.currentItem?.tuoi} tuổi`}</span>
          </div>
        </Row>
        <Row style={{ background: "#fff", padding: "20px" }}>
          {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
            <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
              {t("cdha.canhBaoTonTaiThuocVatTuKemTheo")}
            </span>
          )}
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
              <Form.Item>
                <Radio.Group
                  onChange={onChangeRadio}
                  defaultValue={state?.hoanThuoc}
                >
                  <Radio value={1}>{t("cdha.hoanThuocVatTuKemTheo")}</Radio>
                  <Radio value={2}>
                    {t("cdha.khongHoanThuocVatTuKemTheo")}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item label={t("cdha.dichVuCu")}>
              <Input value={state?.currentItem?.tenDichVu} disabled></Input>
            </Form.Item>
            <Form.Item
              label={t("cdha.dichVuMoi")}
              name="tenDichVuMoi"
              rules={[
                {
                  required: true,
                  message: t("cdha.vuiLongChonDichVuMoi"),
                },
              ]}
            >
              <Input
                onClick={() =>
                  onShowModalService(state?.currentItem, state?.dichVuMoiId)
                }
              ></Input>
            </Form.Item>
            <Form.Item
              label={t("xetNghiem.phongThucHien")}
              name="phongId"
              rules={[
                {
                  required: true,
                  message: t("khamBenh.chiDinh.vuiLongChonPhong"),
                },
              ]}
            >
              <Select disabled={disabled} data={listDanhSachPhong}></Select>
            </Form.Item>
            <Form.Item
              label={t("common.lyDo")}
              name="lyDoDoiTraId"
              rules={[
                {
                  required: true,
                  message: t("common.vuiLongChonLyDo"),
                },
              ]}
            >
              <Select data={listAllLyDoDoiTra}></Select>
            </Form.Item>
          </Form>
          <Row className="footer">
            <Button className="btn-cancel" onClick={onCancel}>
              {t("common.huy")}
            </Button>
            <Button className="btn-save" onClick={onOk}>
              {t("common.dongY")}
            </Button>
          </Row>
        </Row>
      </Main>
      <ModalDichVuMoi ref={serviceRef} onChangeService={onChangeService} />
    </ModalStyled>
  );
};

export default forwardRef(ModalDoiDichVu);
