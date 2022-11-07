import { Button, HeaderSearch, TableWrapper } from "components";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { Checkbox } from "antd";
import moment from "moment";
import { refConfirm } from "app";
import ModalTheBaoHiem from "../ModalTheBaoHiem";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ENUM } from "constants/index";
import { useEnum, useStore } from "hook";

const DanhSachThe = () => {
  const { t } = useTranslation();
  const modalTheBaoHiemRef = useRef(null);
  const { listDanhSachThe } = useSelector(
    (state) => state.giaHanTheChuyenDoiTuong
  );
  const { getDanhSachThe, deleteGiaHanThe } =
    useDispatch().giaHanTheChuyenDoiTuong;
  const { listAllLoaiDoiTuong } = useSelector((state) => state.loaiDoiTuong);
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const [listkhuVucBHYT] = useEnum(ENUM.KHU_VUC_BHYT);

  const { id } = useParams();
  useEffect(() => {
    if (id) getDanhSachThe({ nbDotDieuTriId: id, page: "", size: "" });
  }, [id]);

  const onDelete = (record) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t(
            "quanLyNoiTru.giaHanThe.banCoChacChanMuonXoaThongTinBaoHiemDangCo"
          )}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          deleteGiaHanThe(record?.id).then(() => {
            getDanhSachThe({ nbDotDieuTriId: id });
          });
        }
      );
  };

  const onCapNhatThe = (data) => {
    modalTheBaoHiemRef.current && modalTheBaoHiemRef.current.show(data);
  };
  const onCreate = () => {
    modalTheBaoHiemRef.current && modalTheBaoHiemRef.current.show();
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, record, index) => index + 1,
    },

    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.capNhatThe")} />,
      width: "70px",
      dataIndex: "",
      key: "",
      align: "center",
      render: (item, record) => {
        return (
          <div className="capNhatThe" onClick={() => onCapNhatThe(record)}>
            <a href={() => false}> Cập nhật</a>
            <img src={IconEdit} alt={IconEdit} />
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.ngayChuyenDoi")} />,
      width: "100px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      render: (item) => item && moment(item).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch title={t("quanLyNoiTru.giaHanThe.nguoiChuyenDoi")} />
      ),
      width: "70px",
      dataIndex: "tenNguoiThucHien",
      key: "tenNguoiThucHien",
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.loaiDoiTuong")} />,
      width: "70px",
      dataIndex: "loaiDoiTuongId",
      key: "loaiDoiTuongId",
      render: (item) =>
        (listAllLoaiDoiTuong || []).find((x) => x.id === item)?.ten,
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.soTheBh")} />,
      width: "100px",
      dataIndex: "maThe",
      key: "maThe",
    },

    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.mucHuong")} />,
      width: "70px",
      dataIndex: "mucHuong",
      key: "mucHuong",
      align: "center",
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.bhTuNgay")} />,
      width: "100px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      render: (item) => item && moment(item).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.bhDenNgay")} />,
      width: "100px",
      dataIndex: "denNgay",
      key: "denNgay",
      render: (item) =>
        item && moment(item).endOf("day").format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.noiDangKy")} />,
      width: "180px",
      dataIndex: "tenNoiDangKy",
      key: "tenNoiDangKy",
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.noiGioiThieu")} />,
      width: "180px",
      dataIndex: "tenNoiGioiThieu",
      key: "tenNoiGioiThieu",
    },

    {
      title: (
        <HeaderSearch title={t("quanLyNoiTru.giaHanThe.bhApDungTuNgay")} />
      ),
      width: "100px",
      dataIndex: "tuNgayApDung",
      key: "tuNgayApDung",
      render: (item) => item && moment(item).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch title={t("quanLyNoiTru.giaHanThe.bhApDungDenNgay")} />
      ),
      width: "100px",
      dataIndex: "denNgayApDung",
      key: "denNgayApDung",
      render: (item) =>
        item && moment(item).endOf("day").format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.giaHanThe.thoiGianDu5NamLienTuc")}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianDu5Nam",
      key: "thoiGianDu5Nam",
      render: (item) => item && moment(item).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.giaHanThe.mienCungChiTraTuNgay")}
        />
      ),
      width: "100px",
      dataIndex: "tuNgayMienCungChiTra",
      key: "tuNgayMienCungChiTra",
      render: (item) => item && moment(item).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.giaHanThe.mienCungChiTraDenNgay")}
        />
      ),
      width: "100px",
      dataIndex: "denNgayMienCungChiTra",
      key: "denNgayMienCungChiTra",
      render: (item) =>
        item && moment(item).endOf("day").format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.maKhuVuc")} />,
      width: "100px",
      dataIndex: "khuVuc",
      key: "khuVuc",
      align: "center",
      render: (item) => (listkhuVucBHYT || []).find((x) => x.id === item)?.ten,
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.dungTuyen")} />,
      width: "60px",
      dataIndex: "dungTuyen",
      key: "dungTuyen",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch title={t("quanLyNoiTru.giaHanThe.mienCungChiTra")} />
      ),
      width: "70px",
      dataIndex: "mienCungChiTra",
      key: "mienCungChiTra",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.capCuu")} />,
      width: "60px",
      dataIndex: "capCuu",
      key: "capCuu",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch title={t("quanLyNoiTru.giaHanThe.coGiayChuyenTuyen")} />
      ),
      width: "80px",
      dataIndex: "giayChuyenTuyen",
      key: "giayChuyenTuyen",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.giaHanThe.100Ktc")} />,
      width: "60px",
      dataIndex: "ktc",
      key: "ktc",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title={t("common.thaoTac")} />,
      width: "50px",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      render: (item, record) => {
        return (
          <img
            src={IconDelete}
            alt={IconDelete}
            onClick={() => onDelete(record)}
          />
        );
      },
    },
  ];

  return (
    <Main>
      {infoPatient?.doiTuong === 2 && listDanhSachThe?.length < 15 && (
        <div className="themMoi">
          <Button
            type="success"
            rightIcon={<PlusCircleOutlined />}
            onClick={onCreate}
          >
            {t("quanLyNoiTru.giaHanThe.themTheMoi")}
          </Button>
        </div>
      )}
      <TableWrapper
        columns={columns}
        dataSource={listDanhSachThe}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 4000 }}
      />
      <ModalTheBaoHiem ref={modalTheBaoHiemRef} />
    </Main>
  );
};

export default DanhSachThe;
