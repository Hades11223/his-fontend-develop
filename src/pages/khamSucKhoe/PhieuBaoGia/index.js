import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import DanhSachPhieuBaoGia from "../components/DanhSachPhieuBaoGia";
import TimKiemPhieuBaoGia from "../components/TimKiemPhieuBaoGia";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Page } from "components";
import { useTranslation } from "react-i18next";
import { PlusCircleOutlined } from "@ant-design/icons";

const KhamSucKhoe = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refCreate = useRef();

  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  useEffect(() => {
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <Page
      breadcrumb={[
        {
          title: t("khamSucKhoe.quanLyKhamSucKhoe"),
          link: "/kham-suc-khoe",
        },
        {
          title: t("khamSucKhoe.danhSachPhieuBaoGia"),
          link: "/kham-suc-khoe/phieu-bao-gia",
        },
      ]}
      title={t("khamSucKhoe.danhSachPhieuBaoGia")}
      titleRight={
        <Button
          type="success"
          onClick={() => {
            history.push("/kham-suc-khoe/phieu-bao-gia/them-moi");
          }}
          iconHeight={15}
          rightIcon={<PlusCircleOutlined />}
        >
          {t("common.themMoi")} [F1]
        </Button>
      }
    >
      <Main>
        <TimKiemPhieuBaoGia layerId={refLayerHotKey.current} />
        <DanhSachPhieuBaoGia />
      </Main>
    </Page>
  );
};

export default KhamSucKhoe;
