import ScreenPhieuLinh from "pages/quanLyNoiTru/components/ScreenPhieuLinh";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LinhTheoDichVu from "./LinhTheoDichVu";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import ThongTinPhieuSuatAn from "./ThongTinPhieuSuatAn";
import IcSetting from "assets/svg/ic-setting.svg";
import IcCancel from "assets/images/kho/ic-cancel.svg";
import IcSave from "assets/images/kho/ic-save.svg";
import Button from "pages/kho/components/Button";
import { useLoading, useStore } from "hook";
import { Dropdown, Menu } from "antd";
import IcPrint from "assets/svg/pttt/ic-print.svg";
import { useTranslation } from "react-i18next";
import printJS from "print-js";

const ChiTiet = ({}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const dataDetail = useStore("nbPhieuLinhSuatAn.dataDetail", {});
  const isLoading = useStore("nbPhieuLinhSuatAn.isLoading", false);
  const {
    nbPhieuLinhSuatAn: { detail, duyet, huyDuyet, xoaPhieu },
    phieuIn: { getFilePhieuIn, getListPhieu },
  } = useDispatch();
  const refActive = useRef("tab1");
  const refSetting = useRef({});
  const [state, _setState] = useState({
    activeKey: "0",
    collapse: true,
    valuePhieuChiDinh: 1,
    popoverVisible: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    detail(id);
  }, []);

  const onChangeTab = (tab) => {
    refActive.current = "tab" + tab;
  };

  const onSettings = () => {
    refSetting.current &&
      refSetting.current[refActive.current] &&
      refSetting.current[refActive.current]();
  };

  const listPanel = [
    {
      title: "Danh sách lĩnh theo dịch vụ",
      component: <LinhTheoDichVu refSetting={refSetting} />,
    },
    {
      title: "Danh sách người bệnh",
      component: <DanhSachNguoiBenh refSetting={refSetting} />,
    },
  ];

  useEffect(() => {
    if (id)
      getListPhieu({
        nbDotDieuTriId: id,
        maManHinh: "011",
        maViTri: "01101",
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu });
      });
  }, [id]);

  const onPrintPhieu = (item) => async () => {
    try {
      showLoading();
      const { finalFile } = await getFilePhieuIn({
        listPhieus: [item],
        showError: true,
        id: id,
      });
      printJS({
        printable: finalFile,
        type: "pdf",
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const menu = useMemo(() => {
    return (
      <Menu
        items={(state?.listPhieu || []).map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={onPrintPhieu(item)}>
              {item.ten || item.tenBaoCao}
            </a>
          ),
        }))}
      />
    );
  }, [state?.listPhieu, id]);

  return (
    <ScreenPhieuLinh.LayoutChiTiet
      title="Chi tiết phiếu lĩnh suất ăn"
      chains={[
        { title: "Quản lý nội trú", link: "/quan-ly-noi-tru" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          title: "Danh sách phiếu lĩnh suất ăn",
          link: "/quan-ly-noi-tru/danh-sach-phieu-linh-suat-an",
        },
        {
          title: "Chi tiết phiếu lĩnh suất ăn",
          link: "/quan-ly-noi-tru/chi-tiet-phieu-linh/" + id,
        },
      ]}
      listPanel={listPanel}
      ComponentThongTinPhieu={ThongTinPhieuSuatAn}
      tabBarExtraContent={
        <div
          className="tabbar-extra"
          style={{ cursor: "pointer" }}
          onClick={onSettings}
        >
          Thiết lập
          <IcSetting
            onClick={onSettings}
            className="icon"
            style={{ width: 20, height: 20, marginLeft: 5 }}
          />
        </div>
      }
      onChangeTab={onChangeTab}
      xoaPhieu={xoaPhieu}
      dataDetail={dataDetail}
      showStatus={false}
      otherBtn={
        <>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="default"
              rightIcon={<IcPrint className="ic-print" />}
              minWidth={100}
            >
              {t("khamBenh.inGiayTo")}
            </Button>
          </Dropdown>
          {dataDetail.trangThai === 10 ? (
            <Button
              key={6}
              className="right-btn"
              onClick={duyet}
              type={"primary"}
              rightIcon={<IcSave />}
              minWidth={120}
              loading={isLoading}
            >
              Phát suất ăn
            </Button>
          ) : (
            <Button
              key={5}
              className="right-btn"
              onClick={huyDuyet}
              rightIcon={<IcCancel />}
              minWidth={120}
              loading={isLoading}
            >
              Hủy phát
            </Button>
          )}
        </>
      }
    ></ScreenPhieuLinh.LayoutChiTiet>
  );
};

export default ChiTiet;
