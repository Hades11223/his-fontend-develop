import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { Col, Row, Form } from "antd";
import Button from "pages/kho/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ThongTinHoaDon from "../component/thongTinHoaDon/ThongTinHoaDon";
import TableDsDichVu from "../component/TableDsDichVu";
import Icon from "@ant-design/icons";
import IconList from "assets/svg/iconList.svg";
import IconXuatHd from "assets/svg/thuNgan/iconXuatHd.svg";
import { useTranslation } from "react-i18next";

const TaoHoaDonDienTu = (props) => {
  const { t } = useTranslation();

  const {
    dsHoaDonDienTu: {
      getDsDichVuDefault,
      xuatHoaDon,
      getFileHoaDon,
      luuNhapHoaDon,
    },
    nbDotDieuTri: { getById },
  } = useDispatch();
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
  const { listDv } = useSelector((state) => state.dsHoaDonDienTu);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { nbDotDieuTriId, phieuThuId  } = useParams();
  useEffect(() => {
    getById(nbDotDieuTriId);
    getDsDichVuDefault({ id: nbDotDieuTriId, phieuThuId : phieuThuId }).then((s) => {
      setState({ dsDichVu: s.data });
    });
  }, []);
  const handleRedirect = () => {
    history.push("/thu-ngan/ds-hoa-don-dien-tu");
  };
  const handleSubmit = (value) => () => {
    form.validateFields().then(async (values) => {
      if (value) {
        setState({
          isLoadingXuatHDDT: true,
        });
      } else {
        setState({
          isLoadingLuuNhap: true,
        });
      }
      const dsDichVuId = listDv.map((item) => {
        return item.id;
      });
      if (value) {
        try {
          const hoaDon = (
            await xuatHoaDon({
              ...values,
              dsDichVuId: dsDichVuId,
              nbDotDieuTriId,
            })
          ).data;
          const dataHoaDon = await getFileHoaDon({
            id: hoaDon?.id,
            lanGoi: 1,
            soLanGoi: 5,
          });
          var w = window.open(
            "",
            "",
            "_blank visible=none width=1000, height=600,left=300,top=100 menubar=no, status=no, location=no, resizable=yes, scrollbars=yes"
          );
          w.document.write(dataHoaDon);
          setTimeout(() => {
            w.print();
          }, 1000);
          history.push(
            `/thu-ngan/chi-tiet-hoa-don/${thongTinBenhNhan?.maHoSo}/${hoaDon.id}/${nbDotDieuTriId}`
          );
        } catch (error) {
          setState({
            isLoadingXuatHDDT: false,
          });
        }
      } else {
        luuNhapHoaDon({
          ...values,
          dsDichVuId: dsDichVuId,
          nbDotDieuTriId,
        })
          .then((s) => {
            setState({
              isLoadingLuuNhap: false,
            });
            history.push(
              `/thu-ngan/chi-tiet-hoa-don/${thongTinBenhNhan?.maHoSo}/${s.data.id}/${nbDotDieuTriId}`
            );
          })
          .catch(() => {
            setState({
              isLoadingLuuNhap: false,
            });
          });
      }
    });
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
            <span>{t("thuNgan.themMoiHoaDon")}</span>{" "}
            <Icon component={IconList} onClick={handleRedirect}></Icon>
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
              loading={state?.isLoadingLuuNhap}
              onClick={handleSubmit(false)}
              type={"default"}
            >
              {t("thuNgan.luuNhap")}
            </Button>
            <Button
              loading={state?.isLoadingXuatHDDT}
              onClick={handleSubmit(true)}
              type={"primary"}
              rightIcon={<Icon component={IconXuatHd}></Icon>}
            >
              {t("thuNgan.xuatHoaDonDienTu")}
            </Button>
          </div>
        </Col>
      </Breadcrumb>
    </Main>
  );
};

export default TaoHoaDonDienTu;
