import React from "react";
import { Main, GlobalStyle } from "./styled";
import { Popover, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { TableWrapper, HeaderSearch } from "components";
import IcInfo from "assets/svg/ic-info.svg";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ModalTrangThaiKham = () => {
  const { t } = useTranslation();

  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const { data } = useSelector((state) => state.nbDotDieuTri);

  const columns = [
    {
      title: <HeaderSearch title={t("common.trangThai")} />,
      dataIndex: "trangThai",
      key: "trangThai",
      width: "20%",
      render: (item) => {
        return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("common.phong")} />,
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      width: "20%",
    },
    {
      title: <HeaderSearch title={t("thuNgan.bsKham")} />,
      dataIndex: "tenBacSiKham",
      key: "tenBacSiKham",
      width: "20%",
    },
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "40%",
    },
  ];
  const content = () => (
    <Main>
      <div className="content-popover">
        <TableWrapper
          columns={columns}
          dataSource={data?.dsTrangThaiKham || []}
          // onRow={onRow}
          rowKey={(record) => record?.id}
        />
      </div>
    </Main>
  );
  return (
    <div>
      <GlobalStyle />
      <Popover
        content={content}
        overlayClassName="popover-trang-thai-thanh-toan"
        trigger="click"
        placement={"bottomRight"}
        style={{ borderRadius: "16px" }}
      >
        <Tooltip title={t("thuNgan.chiTietDichVuKham")} placement="bottom">
          <IcInfo className="icon" />
        </Tooltip>
      </Popover>
    </div>
  );
};

export default ModalTrangThaiKham;
