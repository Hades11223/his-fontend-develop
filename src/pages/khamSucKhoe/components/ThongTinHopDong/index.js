import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, HeaderSearch } from "components";
import { formatDecimal } from "../../../../utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import IcDelete from "assets/images/khamBenh/delete.png";
import { refConfirm } from "app";
import { Tooltip } from "antd";
import { useStore } from "hook";
import IcCreate from "assets/images/kho/IcCreate.png";
import ModalThanhToanHopDong from "pages/khamSucKhoe/modals/ModalThanhToanHopDong";
import IcThanhToan from "assets/svg/kham-suc-khoe/thanh-toan.svg";
import IcHuyThanhToan from "assets/svg/kham-suc-khoe/huy-thanh-toan.svg";
import Icon from "@ant-design/icons";

const ThongTinHopDong = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  //ref
  const refModalThanhToanHopDong = useRef(null);
  //redux
  const {
    hopDongKSK: {
      getTrangThaiTT,
      getDsPhieuThu,
      huyThanhToanPhieuThu,
      getHopDong,
      xoaPhieuThu,
      updateData,
    },
    utils: { getUtils },
    dichVuKSK: { getListGiamGia },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  const {
    hopDongKSK: { dsPhieuThu },
  } = useSelector((state) => state);

  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);

  //effect
  useEffect(() => {
    if (id) {
      getDsPhieuThu(id);

      getTrangThaiTTByLoaiDV(id);
      getListGiamGia({ hopDongKskId: id });
    }
  }, [id]);

  useEffect(() => {
    getUtils({ name: "trangThaiDichVu" });
    getListAllNhanVien({ page: "", size: "", active: true });
  }, []);

  //function
  async function getTrangThaiTTByLoaiDV(hopDongKskId) {
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 10 });
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 20 });
    await getTrangThaiTT({ hopDongKskId, loaiDichVu: 30 });
  }

  function onHuyThanhToan(item) {
    return () => {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.canhBao"),
            content: `Bạn có chắc chắn muốn Hủy thanh toán hợp đồng?`,
            cancelText: t("common.huy"),
            okText: t("common.xacNhan"),
            showImg: false,
            showBtnOk: true,
            typeModal: "warning",
          },
          () => {
            huyThanhToanPhieuThu(item?.id).then(() => {
              getHopDong(id);
              getDsPhieuThu(id);
            });
          }
        );
    };
  }

  function onXoaPhieu(item) {
    return () => {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.canhBao"),
            content: `Bạn có chắc chắn muốn xóa phiếu thu?`,
            cancelText: t("common.huy"),
            okText: t("common.xacNhan"),
            showImg: false,
            showBtnOk: true,
            typeModal: "warning",
          },
          () => {
            xoaPhieuThu(item?.id).then(() => {
              getHopDong(id);
              getDsPhieuThu(id);
            });
          }
        );
    };
  }

  const onThanhToanHopDong = (item) => {
    updateData({ selectedPhieuThu: item || null });

    refModalThanhToanHopDong.current && refModalThanhToanHopDong.current.show();
  };

  //columns
  const thongTinTTColumns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.thanhToan.tongTienCanTT")} />,
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: 200,
      render: (item) => {
        return <span>{formatDecimal(item)}</span>;
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.thanhToan.tongTienDV")} />,
      dataIndex: "tongTien",
      key: "tongTien",
      width: 120,
      render: (item) => {
        return <span>{formatDecimal(item)}</span>;
      },
    },
    {
      title: (
        <HeaderSearch title={t("khamSucKhoe.thanhToan.tongTienMienGiam")} />
      ),
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      width: 120,
      render: (item) => {
        return <span>{formatDecimal(item)}</span>;
      },
    },
    // {
    //   title: <HeaderSearch title={t("khamSucKhoe.thanhToan.slNbHoanThanh")} />,
    //   dataIndex: "slNbHoanThanh",
    //   key: "slNbHoanThanh",
    //   width: 120,
    //   render: (item, list, index) => list?.phieuThuKsk?.slNbHoanThanh || "",
    // },
    // {
    //   title: (
    //     <HeaderSearch title={t("khamSucKhoe.thanhToan.slNbChuaHoanThanh")} />
    //   ),
    //   dataIndex: "slNbChuaHoanThanh",
    //   key: "slNbChuaHoanThanh",
    //   width: 120,
    //   render: (item, list, index) => list?.phieuThuKsk?.slNbChuaHoanThanh || "",
    // },
    {
      title: <HeaderSearch title={t("khamSucKhoe.thanhToan.soPhieu")} />,
      dataIndex: "soPhieu",
      key: "soPhieu",
      width: 120,
    },
    {
      title: (
        <HeaderSearch title={t("khamSucKhoe.thanhToan.thoiGianThanhToan")} />
      ),
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      width: 120,
      render: (item) => (item ? moment(item).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.thanhToan.thuNgan")} />,
      dataIndex: "thuNganId",
      key: "thuNganId",
      width: 120,
      render: (item) => {
        return listAllNhanVien.find((x) => x.id === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title={t("khamSucKhoe.thanhToan.trangThai")} />,
      dataIndex: "thanhToan",
      key: "thanhToan",
      width: 150,
      render: (item) => (!!item ? "Đã thanh toán" : "Chưa thanh toán"),
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      align: "center",
      fixed: "right",
      width: 80,
      render: (item) => (
        <div className="ic-action">
          {item?.thanhToan && (
            <Tooltip title="Hủy thanh toán hợp đồng">
              <Icon component={IcHuyThanhToan} onClick={onHuyThanhToan(item)} />
            </Tooltip>
          )}

          {!item?.thanhToan && (
            <Tooltip title="Thanh toán hợp đồng">
              <Icon
                component={IcThanhToan}
                onClick={() => onThanhToanHopDong(item)}
              />
            </Tooltip>
          )}

          {!item?.thanhToan && (
            <Tooltip title="Xóa">
              <img src={IcDelete} alt="..." onClick={onXoaPhieu(item)}></img>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <Main>
      <div className="payment-table-title">
        <label>Thông tin thanh toán hợp đồng</label>
        <Button
          type="primary"
          onClick={() => onThanhToanHopDong()}
          iconHeight={15}
          className="button-header"
        >
          Thêm mới
          <img src={IcCreate} alt="IcCreate" />
        </Button>
      </div>
      <TableWrapper
        bordered
        columns={thongTinTTColumns}
        dataSource={dsPhieuThu || []}
      />

      <ModalThanhToanHopDong modalCheckoutRef={refModalThanhToanHopDong} />
    </Main>
  );
};

export default ThongTinHopDong;
