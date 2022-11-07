import React, { useRef } from "react";
import { Main, WrapButtonRight } from "./styled";
import { Row } from "antd";
import TimKiemDanhSachDichVuKho from "./TimKiemDanhSachDichVuKho";
import DanhSachDichVu from "./DanhSachDichVu";
import { Button, Page } from "components";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import ModalCapNhatGia from "../components/ModalCapNhatGia";

const DanhSachDichVuKho = (props) => {
  const { t } = useTranslation();
  const cachXem = useStore("danhSachDichVuKho.cachXem", null);
  const selectedHangHoa = useStore("danhSachDichVuKho.selectedHangHoa", null);

  const refModalCapNhatGia = useRef(null);

  const onCapNhatGia = () => {
    refModalCapNhatGia.current &&
      refModalCapNhatGia.current.show(selectedHangHoa);
  };

  return (
    <Page
      breadcrumb={[
        { title: t("kho.kho"), link: "/kho" },
        { title: t("kho.danhSachTonKho"), link: "/kho/danh-sach-ton-kho" },
      ]}
      title={t("kho.danhSachTonKho")}
      titleRight={
        <WrapButtonRight>
          {cachXem === "2" && (
            <Button onClick={onCapNhatGia} type="primary">
              Cập nhật giá
            </Button>
          )}
        </WrapButtonRight>
      }
    >
      <Main>
        <Row xs={24}>
          <TimKiemDanhSachDichVuKho />
        </Row>
        <DanhSachDichVu />
      </Main>

      <ModalCapNhatGia ref={refModalCapNhatGia} />
    </Page>
  );
};

export default DanhSachDichVuKho;
