import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { Col, Row, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ThongTinHoaDon from "../component/thongTinHoaDon/ThongTinHoaDon";
import TableDsDichVu from "../component/TableDsDichVu";
import { useTranslation } from "react-i18next";
import { Button } from "components";
const TaoHoaDonDienTu = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const [state, _setState] = useState({
    dsDichVu: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();
  const {
    dsHoaDonDienTu: { getDsDichVuChiTiet, capNhatHoaDon },
    nbDotDieuTri: { getById },
  } = useDispatch();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listDv } = useSelector((state) => state.dsHoaDonDienTu);
  const { maHoSo, hoaDonId, nbDotDieuTriId } = useParams();
  useEffect(() => {
    getById(nbDotDieuTriId);
    getDsDichVuChiTiet({ hoaDonId }).then((s) => {
      let data = (s || []).map((item) => {
        return { ...item, id: item?.nbDichVuId };
      });
      setState({ dsDichVu: data });
    });
  }, []);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const dsDichVuId = (listDv || []).map((item) => {
        return item.id;
      });
      let payload = { ...values, dsDichVuId: dsDichVuId, hoaDonId };
      capNhatHoaDon(payload).then(() => {
        getDsDichVuChiTiet({ hoaDonId }).then((s) => {
          setState({ dsDichVu: s });
        });
      });
    });
  };
  const onCancel = () => {
    history.push(
      `/thu-ngan/chi-tiet-hoa-don/${maHoSo}/${hoaDonId}/${nbDotDieuTriId}`
    );
  };
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: t("thuNgan.thuNgan"), link: "/thu-ngan" },
          {
            title: t("thuNgan.hoaDonDienTu"),
            link: "/thu-ngan/ds-hoa-don-dien-tu",
          },
        ]}
      >
        <Col span={24} className="header-title">
          <div className="title">
            <span>{t("thuNgan.chinhSuaHoaDon")}</span>{" "}
          </div>
        </Col>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={18} className="ds-dich-vu">
              <TableDsDichVu
                nbDotDieuTriId={nbDotDieuTriId}
                setStateParent={setState}
                dsDichVu={state.dsDichVu}
              ></TableDsDichVu>
            </Col>
            <Col span={6} className="info">
              <ThongTinHoaDon
                form={form}
                thongTinHoaDon={thongTinBenhNhan}
              ></ThongTinHoaDon>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="footer-button">
            <Button
              type="default"
              onClick={() => handleSubmit()}
              minWidth={100}
            >
              {t("common.luu")}
            </Button>
            <Button type="primary" onClick={() => onCancel()} minWidth={100}>
              {t("common.quayLai")}
            </Button>
          </div>
        </Col>
      </Breadcrumb>
    </Main>
  );
};

export default TaoHoaDonDienTu;
