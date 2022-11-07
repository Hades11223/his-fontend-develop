import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { Col, Row, Form } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import IcSave from "assets/svg/ic-save.svg";
import ThongTinDieuTri from "./ThongTinDieuTri";
import ThongTinChaMe from "./ThongTinChaMe";
import FormWraper from "components/FormWraper";
import moment from "moment";

const ModalChiTietRaVien = (props, ref) => {
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [form] = Form.useForm();
  const { nbThongTinRaVien, thongTinBenhNhan } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const { listNhanVien } = useSelector((state) => state.nhanVien);

  const {
    nbDotDieuTri: { getById, getThongTinRaVien, putPhieuRaVien },
  } = useDispatch();

  const { t } = useTranslation();
  const [state, _setState] = useState({
    requiredTuoiThai: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      const { nbDotDieuTriId } = data;

      setState({
        show: true,
        nbDotDieuTriId,
      });

      getById(nbDotDieuTriId);
      getThongTinRaVien(nbDotDieuTriId);

      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    const {
      phuongPhapDieuTri,
      loiDanBacSi,
      soBaoHiemXaHoi,
      treEmKhongThe,
      tuoiThai,
      dinhChiThaiNghen,
      denThoiGianNghiNgoaiTru,
      tuThoiGianNghiNgoaiTru,
      thoiGianChungTu,
      thoiGianRaVien,
      truongKhoa,
      truongKhoaId,
      thuTruongDonVi,
      dsCdChinh,
    } = nbThongTinRaVien || {};

    setState({
      requiredTuoiThai: dinhChiThaiNghen === 1,
    });

    form.setFieldsValue({
      phuongPhapDieuTri,
      loiDanBacSi,
      soBaoHiemXaHoi,
      treEmKhongThe: treEmKhongThe != null ? `${treEmKhongThe}` : treEmKhongThe,
      tuoiThai,
      dinhChiThaiNghen,
      denThoiGianNghiNgoaiTru: denThoiGianNghiNgoaiTru
        ? moment(denThoiGianNghiNgoaiTru)
        : null,
      tuThoiGianNghiNgoaiTru: tuThoiGianNghiNgoaiTru
        ? moment(tuThoiGianNghiNgoaiTru)
        : null,
      thoiGianChungTu: thoiGianChungTu ? moment(thoiGianChungTu) : null,
      thoiGianRaVien: thoiGianRaVien ? moment(thoiGianRaVien) : null,
      chungChi: truongKhoa?.chungChi,
      truongKhoaId,
      thuTruongDonVi,
      dsCdChinh: (dsCdChinh || []).map((x) => x.ten).join(", "),
    });
  }, [nbThongTinRaVien]);

  useEffect(() => {
    const { maKhoaNb, khoaNbId, doiTuong } = thongTinBenhNhan || {};
    form.setFieldsValue({
      maKhoaNb,
      khoaNbId,
      doiTuong,
    });
  }, [thongTinBenhNhan]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const handleClickBack = () => {
    form.resetFields();
    setState({ show: false });
  };

  const handleClickNext = () => {
    form.validateFields().then((values) => {
      const { chungChi, dsCdChinh, ...rest } = values;

      const payload = {
        ...nbThongTinRaVien,
        id: state.nbDotDieuTriId,
        ...rest,
      };
      putPhieuRaVien(payload).then(() => {
        if (refCallback.current) refCallback.current();
        handleClickBack();
      });
    });
  };

  const checkChangeField = (changedFields) => {
    if (changedFields?.truongKhoaId) {
      const nvItem = listNhanVien.find(
        (x) => x.id === changedFields?.truongKhoaId
      );
      if (nvItem) {
        form.setFieldsValue({
          chungChi: nvItem.chungChi,
        });
      }
    }

    if (changedFields?.dinhChiThaiNghen !== undefined) {
      setState({
        requiredTuoiThai: changedFields?.dinhChiThaiNghen === 1,
      });
    }
  };

  return (
    <ModalTemplate
      width={"90%"}
      ref={refModal}
      closable={false}
      onCancel={handleClickBack}
      title="Chi tiết ra viện"
      actionLeft={
        <Button height={30} minWidth={60} onClick={handleClickBack}>
          {t("common.quayLai")}
        </Button>
      }
      actionRight={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type={"primary"}
            height={30}
            minWidth={60}
            onClick={handleClickNext}
            rightIcon={<IcSave />}
          >
            {t("common.luu")}
          </Button>
        </div>
      }
    >
      <Main>
        <Row>
          <Col span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <FormWraper
          form={form}
          style={{ width: "100%" }}
          labelCol={{
            span: 8,
          }}
          labelAlign={"left"}
          wrapperCol={{
            span: 16,
          }}
          onValuesChange={checkChangeField}
        >
          <Row className="main-content">
            <Col span={24}>
              <ThongTinDieuTri requiredTuoiThai={state.requiredTuoiThai} />
            </Col>

            <Col span={24}>
              <ThongTinChaMe />
            </Col>
          </Row>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietRaVien);
