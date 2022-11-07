import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, HeaderSearch, ModalTemplate, TableWrapper } from "components";
import { Main } from "./styled";
import { Row, Col, Checkbox, Card } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEnum, useStore } from "hook";
import { ENUM, LOAI_DICH_VU, TRANG_THAI_DICH_VU } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useDispatch } from "react-redux";
import { firstLetterWordUpperCase } from "utils";
import { PrinterOutlined } from "@ant-design/icons";

const ModalChiTietDichVu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);

  const [state, _setState] = useState({ show: false, ttNb: {} });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { getChiSoConDvXetNghiem } = useDispatch().dvNgoaiTru;
  const { inPhieuKetQua } = useDispatch().chiDinhKhamBenh;
  const { listChiSoCon } = useStore("dvNgoaiTru", {});

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      const { ttDichVu, ttNb } = data || {};

      const gioiTinh =
        (listgioiTinh || []).find((item) => item.id === ttNb?.gioiTinh) || {};
      const tuoi =
        ttNb?.thangTuoi > 36 || ttNb?.tuoi
          ? `${ttNb?.tuoi} ${t("common.tuoi")}`
          : `${ttNb?.thangTuoi} ${t("common.thang")}`;

      setState({ item: ttDichVu, show: true, ttNb, gioiTinh, tuoi });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      if (state?.item?.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM) {
        getChiSoConDvXetNghiem({
          nbDotDieuTriId: state.item?.nbDotDieuTriId,
          nbDvXetNghiemId: state.item?.id,
        });
      }
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show, state?.item]);

  const renderDichVu = (item, data) => {
    if (data.isParent) {
      return data?.tenDichVu;
    } else {
      return <li>{data?.chiSoCon?.ten}</li>;
    }
  };

  const inPhieuKetQuaDichVu = () => {
    inPhieuKetQua({
      loaiDichVu: state.item?.loaiDichVu,
      nbDotDieuTriId: state.item?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: state.item?.chiDinhTuLoaiDichVu,
      chiDinhTuDichVuId: state.item?.chiDinhTuDichVuId,
      dsSoKetNoi: state.item?.soKetNoi ? [state.item?.soKetNoi] : null,
      soPhieuId: state.item?.soPhieuId,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.dichVu")} />,
      width: 140,
      dataIndex: "tenChiSoCon",
      key: "tenChiSoCon",
      align: "left",
      render: renderDichVu,
    },
    {
      title: <HeaderSearch title={t("khamBenh.ketQua.ketQua")} />,
      width: 40,
      dataIndex: "ketQua",
      key: "ketQua",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("khamBenh.ketQua.giaTriThamChieu")} //Với nhóm dịch vụ != Xét nghiệm. Hiển thị tên cột = Kết luận. Lấy giá trị từ kết luận của dịch vụ để hiển thị
        />
      ),
      width: 40,
      dataIndex: "ketLuan",
      key: "ketLuan",
      align: "left",
      render: (value, row, index) => {
        const { ketQuaThamChieu, chiSoThap, chiSoCao } = row;

        return (
          ketQuaThamChieu ||
          (!!chiSoThap && !!chiSoCao && `${chiSoThap} - ${chiSoCao}`)
        );
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.ketQua.ketLuan")} />,
      width: 40,
      dataIndex: "ketLuan",
      key: "ketLuan",
      align: "left",
    },
  ];

  return (
    <ModalTemplate
      ref={refModal}
      width={1266}
      title="Thông tin dịch vụ"
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(state.ttNb?.tenNb)}
          </span>
          {state.gioiTinh?.ten && (
            <span className="normal-weight"> - {state.gioiTinh?.ten} </span>
          )}

          {state.tuoi && <span className="normal-weight">- {state.tuoi}</span>}
        </>
      }
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        [
          TRANG_THAI_DICH_VU.DA_CO_KET_QUA,
          TRANG_THAI_DICH_VU.DA_DUYET,
        ].includes(state.item?.trangThai) && (
          <Button
            iconHeight={15}
            rightIcon={<PrinterOutlined />}
            onClick={inPhieuKetQuaDichVu}
          >
            {t("common.inKetQua")}
          </Button>
        )
      }
    >
      <Main>
        <div className="item tenDv">
          <div className="label">
            <b> {t("common.tenDichVu")}:</b>
          </div>
          <div className="content">{state?.item?.tenDichVu}</div>
        </div>

        <Row className="ttDv">
          <Col span={10} className="item">
            <div className="label">{t("common.trangThai")}:</div>
            <div className="content">
              {
                (listTrangThaiDichVu || []).find(
                  (x) => x.id === state?.item?.trangThai
                )?.ten
              }
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{"Bs chỉ định"}:</div>
            <div className="content">{state?.item?.tenBacSiChiDinh}</div>
          </Col>

          <Col span={4} className="item">
            <div className="label">{t("quanLyNoiTru.daTT")}:</div>
            <div className="content">
              <Checkbox checked={state?.item?.thanhToan}></Checkbox>
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{"Thời gian thực hiện"}:</div>
            <div className="content">
              {" "}
              {state?.item?.thoiGianThucHien &&
                moment(state?.item?.thoiGianThucHien).format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{"Thời gian chỉ định"}:</div>
            <div className="content">
              {state?.item?.thoiGianChiDinh &&
                moment(state?.item?.thoiGianChiDinh).format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
            </div>
          </Col>

          <Col span={4} className="item">
            <div className="label">{t("quanLyNoiTru.khongTinhTien")}:</div>
            <div className="content">
              <Checkbox checked={state?.item?.khongTinhTien}></Checkbox>
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{t("quanLyNoiTru.phongThucHien")}:</div>
            <div className="content">{state?.item?.tenPhongThucHien}</div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{t("quanLyNoiTru.khoaChiDinh")}:</div>
            <div className="content">{state?.item?.tenKhoaChiDinh}</div>
          </Col>

          <Col span={4} className="item">
            <div className="label">{"Tự trả"}:</div>
            <div className="content">
              <Checkbox checked={state?.item?.tuTra}></Checkbox>
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{"Chẩn đoán bệnh"}:</div>
            <div className="content">
              {(state?.item?.dsCdChinh || [])
                .map((x) => {
                  return `${x.ma} - ${x.ten}`;
                })
                .join(", ")}
            </div>
          </Col>

          <Col span={10} className="item">
            <div className="label">{"Chẩn đoán bệnh kèm theo"}:</div>
            <div className="content">
              {(state?.item?.dsCdKemTheo || [])
                .map((x) => {
                  return `${x.ma} - ${x.ten}`;
                })
                .join(", ")}
            </div>
          </Col>
        </Row>

        {state?.item?.loaiDichVu !== LOAI_DICH_VU.XET_NGHIEM && (
          <>
            <div>
              <b>{t("quanLyNoiTru.ketQua")}:</b>
            </div>
            <div>{state?.item?.ketQua}</div>

            <div className="item">
              <div className="label">
                <b>{t("quanLyNoiTru.ketLuan")}:</b>
              </div>
              <div className="content">{state?.item?.ketLuan}</div>
            </div>
          </>
        )}

        {state?.item?.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM && (
          <Card title={t("common.chiTiet")} className="page-body">
            <TableWrapper
              columns={columns}
              dataSource={[{ ...state?.item, isParent: true }, ...listChiSoCon]}
            ></TableWrapper>
          </Card>
        )}
      </Main>
    </ModalTemplate>
  );
};
export default forwardRef(ModalChiTietDichVu);
