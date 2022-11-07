import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  Col,
  Input,
  Row,
  Form,
  Checkbox,
  InputNumber,
  Select as SelectAntd,
} from "antd";
import Button from "pages/kho/components/Button";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { useTranslation } from "react-i18next";
import { DateTimePicker, Select } from "components";
import moment from "moment";
import { useSelector } from "react-redux";
import { useStore } from "hook";
import { LOAI_DICH_VU } from "constants/index";

const ChinhSuaDVKyThuat = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [form] = Form.useForm();
  const [state, _setState] = useState({ data: [] });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    chiDinhKhamBenh: { themThongTinDV, getDsSoPhieuCLS },
    phongThucHien: { onSearchParams: searchPhongThucHien },
    nhanVien: { getListAllNhanVien },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();

  const listPhongThucHien = useSelector(
    (state) => state.phongThucHien.listData
  );
  const { chiTietNb } = useSelector((state) => state.nbDotDieuTri);

  const listLoaiHinhThanhToanCuaDoiTuong = useStore(
    "loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong",
    []
  );
  const listMucDichSuDung = useStore("mucDichSuDung.listMucDichSuDung", []);
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const soPhieuCls = useSelector((state) => state.chiDinhKhamBenh.soPhieuCls);

  const listAllLoaiHinhThanhToan = useMemo(() => {
    return listLoaiHinhThanhToanCuaDoiTuong.map((item) => ({
      ...item.loaiHinhThanhToan,
    }));
  }, [listLoaiHinhThanhToanCuaDoiTuong]);

  useEffect(() => {
    getListAllNhanVien({ page: "", size: "", active: true });
  }, []);

  const dataPhongThucHien = useMemo(() => {
    return (listPhongThucHien || []).map((item) => ({
      id: item.phongId,
      ten: `${item?.ma} - ${item?.ten}`,
      dichVuId: item.dichVuId,
    }));
  }, [listPhongThucHien]);

  useImperativeHandle(ref, () => ({
    show: (record = {}, callback) => {
      setState({
        data: [],
        show: true,
        record: record,
        disabledField:
          !record.thanhToan && [155, 160].includes(record.trangThai),
      });

      form.setFieldsValue({
        ...record,
        soPhieu: record?.soPhieuId,
        thoiGianThucHien: moment(record?.thoiGianThucHien),
      });
      console.log("record", record);

      getListLoaiDoiTuongTT({
        page: "",
        size: "",
        loaiDoiTuongId: chiTietNb?.loaiDoiTuongId,
        active: true,
      });

      searchPhongThucHien({
        dsDichVuId: [record.dichVuId],
      });
      getDsSoPhieuCLS({
        loaiDichVu: record.loaiDichVu,
        nbDotDieuTriId: record.nbDotDieuTriId,
      });

      refModal.current && refModal.current.show();
      refCallback.current = callback;
    },
  }));

  const onCancel = () => {
    setState({ show: false, disabledButton: false });
    form.resetFields();
    refModal.current && refModal.current.hide();
  };
  const onSave = () => {
    form.submit();
  };

  const onHandledSubmit = (values) => {
    form.validateFields().then((values) => {
      let {
        ghiChu,
        tuTra,
        benhPhamId,
        soLuong,
        thoiGianThucHien,
        khongTinhTien,
        loaiPtTt,
        tyLeTtDv,
        loaiHinhThanhToanId,
        phongThucHienId,
        mucDichId,
        tuVanVienId,
        ...rest
      } = values;
      let obj = {
        body:
          state.record.loaiDichVu === 60
            ? [
                {
                  id: state.record.id,
                  nbDichVu: {
                    ghiChu,
                    tuTra,
                    soLuong,
                    khongTinhTien,
                    dichVuId: state.record.dichVuId,
                    phongThucHienId,
                  },
                  nbDvKyThuat: {
                    phongThucHienId,
                    tuVanVienId,
                  },
                },
              ]
            : {
                benhPhamId,
                nbDvKyThuat: {
                  phongThucHienId,
                  tuVanVienId,
                  ...rest,
                },
                nbDichVu: {
                  ghiChu,
                  tuTra,
                  soLuong,
                  tyLeTtDv,
                  thoiGianThucHien,
                  khongTinhTien,
                  loaiHinhThanhToanId,
                  mucDichId,
                },
                loaiPtTt: loaiPtTt,
              },
        id: state.record.id,
        loaiDichVu: state.record.loaiDichVu,
      };

      themThongTinDV(obj).then((s) => {
        if (s.code === 0) {
          if (refCallback.current) refCallback.current();
          onCancel();
        }
      });
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      title={"Thông tin dịch vụ"}
      onCancel={onCancel}
      width={650}
      actionLeft={
        <Button.Text type="default" minWidth={100} onClick={onCancel}>
          {t("common.huy")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          disabled={state?.disabledButton}
          onClick={onSave}
        >
          <span> {t("common.dongY")}</span>
        </Button>
      }
    >
      <Main>
        <div className="info-content">
          <Form form={form} layout="vertical" onFinish={onHandledSubmit}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label={t("common.soLuong")}
                  name="soLuong"
                  rules={[
                    {
                      required: true,
                      message: t("common.vuiLongNhapSoLuong"),
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={1}
                    placeholder={t("common.vuiLongNhapSoLuong")}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.chiDinh.phongThucHien")}
                  name="phongThucHienId"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "khamBenh.chiDinh.vuiLongNhapTenPhongThucHien"
                      ),
                    },
                  ]}
                >
                  <SelectAntd
                    allowClear
                    placeholder={t("khamBenh.chiDinh.chonTenPhongThucHien")}
                  >
                    {dataPhongThucHien.map((item, index) => {
                      return (
                        <SelectAntd.Option key={index} value={item?.id}>
                          {`${item?.ten}`}
                        </SelectAntd.Option>
                      );
                    })}
                  </SelectAntd>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={t("common.luuY")} name="ghiChu">
                  <Input
                    className="input-option"
                    placeholder={t("khamBenh.chiDinh.vuiLongNhapLuuY")}
                  />
                </Form.Item>
              </Col>

              {![LOAI_DICH_VU.KHAM, LOAI_DICH_VU.NGOAI_DIEU_TRI].includes(
                state?.record?.loaiDichVu
              ) && (
                <Col span={12}>
                  <Form.Item
                    label={t("khamBenh.chiDinh.soPhieu")}
                    name="soPhieu"
                    rules={[
                      {
                        required: true,
                        message: t("khamBenh.chiDinh.vuiLongNhapSoPhieu"),
                      },
                    ]}
                  >
                    <Select
                      data={soPhieuCls}
                      placeholder={t("khamBenh.chiDinh.chonSoPhieu")}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item label=" " name="tuTra" valuePropName="checked">
                  <Checkbox disabled={listMucDichSuDung.length}>
                    {t("khamBenh.chiDinh.tuTra")}
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  label=" "
                  name="khongTinhTien"
                  valuePropName="checked"
                >
                  <Checkbox disabled={listMucDichSuDung.length}>
                    {t("common.khongTinhTien")}
                  </Checkbox>
                </Form.Item>
              </Col>

              {![LOAI_DICH_VU.NGOAI_DIEU_TRI].includes(
                state?.record?.loaiDichVu
              ) && (
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Form.Item
                    label={t("quanLyNoiTru.ngayThucHien")}
                    name="thoiGianThucHien"
                    style={{ width: "100%" }}
                  >
                    <DateTimePicker
                      disabled={state?.disabledField}
                    ></DateTimePicker>
                  </Form.Item>
                </Col>
              )}

              <Col span={12}>
                <Form.Item
                  label={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                  name="loaiHinhThanhToanId"
                >
                  <Select
                    data={listAllLoaiHinhThanhToan}
                    placeholder={t("khamBenh.chiDinh.loaiHinhThanhToan")}
                    disabled={listMucDichSuDung.length || state?.disabledField}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="TT35" name="mucDichId">
                  <Select
                    disabled={state?.disabledField}
                    data={listMucDichSuDung}
                    placeholder="TT35"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Tư vấn viên" name="tuVanVienId">
                  <Select
                    disabled={state?.disabledField}
                    data={listAllNhanVien}
                    valueNumber={true}
                    placeholder="Tư vấn viên"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ChinhSuaDVKyThuat);
