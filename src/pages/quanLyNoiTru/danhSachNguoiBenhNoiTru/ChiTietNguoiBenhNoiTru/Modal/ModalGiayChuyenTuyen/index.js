import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { Checkbox, Form } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Button, ModalTemplate, TableWrapper } from "components";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import IcDelete from "assets/svg/ic-delete.svg";
import Icon from "@ant-design/icons";
import { refConfirm } from "app";
import ModalChuyenVien from "../../ThongTinVaoVien/ModalChuyenVien";
import moment from "moment";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const { Column } = TableWrapper;

const ModalGiayChuyenTuyen = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refModalChuyenVien = useRef();
  const [thongTinChiTiet, setThongTinChiTiet] = useState({});

  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    nbChuyenVien: { dsGiayChuyenTuyen = [] },
  } = useSelector((state) => state);

  const {
    nbChuyenVien: { getDsGiayChuyenTuyen, xoaGiayChuyenTuyen },
  } = useDispatch();

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });

      getDsGiayChuyenTuyen(infoPatient?.id);
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  const onDeleteGiay = (item) => (e) => {
    e.stopPropagation();
    e.preventDefault();

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("common.banCoChacMuonXoa")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          xoaGiayChuyenTuyen(item?.id).then((res) => {
            refreshList();
          });
        }
      );
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
      fixed: "left",
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.soPhieu"),
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      i18Name: "quanLyNoiTru.giayChuyenVien.soPhieu",
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.lyDoChuyenTuyen"),
      width: "100px",
      dataIndex: "lyDoChuyenTuyen",
      key: "lyDoChuyenTuyen",
      i18Name: "quanLyNoiTru.giayChuyenVien.lyDoChuyenTuyen",
      render: (item) =>
        item === 1
          ? t("khamBenh.ketLuanKham.chuyenVien.duDieuKienChuyenTuyen")
          : item === 2
          ? t("khamBenh.ketLuanKham.chuyenVien.theoYeuCauCuaNguoiBenh")
          : "",
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.chanDoan"),
      width: "200px",
      dataIndex: "dsCdChinh",
      key: "dsCdChinh",
      i18Name: "quanLyNoiTru.giayChuyenVien.chanDoan",
      render: (item) => (item || []).map((x) => x.ten).join(", "),
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.tinhTrangNb"),
      width: "140px",
      dataIndex: "tinhTrangChuyenVien",
      key: "tinhTrangChuyenVien",
      i18Name: "quanLyNoiTru.giayChuyenVien.tinhTrangNb",
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.thoiGianChuyenTuyen"),
      width: "100px",
      dataIndex: "thoiGianChuyenTuyen",
      key: "thoiGianChuyenTuyen",
      align: "center",
      i18Name: "quanLyNoiTru.giayChuyenVien.thoiGianChuyenTuyen",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.vienChuyenDen"),
      width: "150px",
      dataIndex: "vienChuyenDen",
      key: "vienChuyenDen",
      i18Name: "quanLyNoiTru.giayChuyenVien.vienChuyenDen",
      render: (item) => item && item?.ten,
    }),
    Column({
      title: t("quanLyNoiTru.giayChuyenVien.chuyenTuyenChuyenKhoa"),
      width: "100px",
      dataIndex: "loai",
      key: "loai",
      align: "center",
      i18Name: "quanLyNoiTru.giayChuyenVien.chuyenTuyenChuyenKhoa",
      render: (item) => <Checkbox checked={item == 20} />,
    }),
    Column({
      title: t("common.tienIch"),
      width: "50px",
      align: "center",
      fixed: "right",
      i18Name: "common.tienIch",
      render: (item) => {
        return (
          <>
            <Icon
              className="ic-delete"
              component={IcDelete}
              onClick={onDeleteGiay(item)}
            />
          </>
        );
      },
    }),
  ];

  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        if (refModalChuyenVien.current) {
          setThongTinChiTiet({
            nbChanDoan: {
              dsCdChinhId: infoPatient?.dsCdRaVienId || null,
            },
            nbChuyenVien: record,
          });
          refModalChuyenVien.current.show();
        }
      },
    };
  };

  const onThemMoiGiay = () => {
    if (refModalChuyenVien.current) {
      setThongTinChiTiet({
        nbChanDoan: {
          dsCdChinhId: infoPatient?.dsCdRaVienId || null,
        },
        nbChuyenVien: {
          nbDotDieuTriId: infoPatient.id,
        },
      });
      refModalChuyenVien.current.show();
    }
  };

  function refreshList() {
    getDsGiayChuyenTuyen(infoPatient?.id);
  }

  const checkHienThiBtnThemMoi = useMemo(() => {
    return (dsGiayChuyenTuyen || []).every((x) => x.loai != 10);
  }, [dsGiayChuyenTuyen]);

  return (
    <ModalTemplate
      width={"90%"}
      closable={false}
      ref={refModal}
      title={"Danh sách giấy chuyển tuyến"}
      rightTitle={
        <>
          {checkHienThiBtnThemMoi && (
            <Button
              style={{ height: 24 }}
              type="success"
              onClick={onThemMoiGiay}
            >
              {"Thêm mới"}
            </Button>
          )}
        </>
      }
      onCancel={onClose}
      actionLeft={
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={() => {
            setState({ show: false });
          }}
          leftIcon={<IcArrowLeft />}
        >
          Quay lại
        </Button.Text>
      }
    >
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={dsGiayChuyenTuyen || []}
          rowKey={(record) => `${record.id}`}
          tableName="table_NOITRU_DsGiayChuyenTuyen"
          styleWrap={{ height: 500 }}
          onRow={onRow}
        />

        <ModalChuyenVien
          refModalChuyenVien={refModalChuyenVien}
          thongTinChiTiet={thongTinChiTiet}
          infoNb={infoPatient}
          refreshList={refreshList}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalGiayChuyenTuyen);
