import React, { useState, useEffect, useMemo, useRef } from "react";
import { message, Menu, Dropdown, Popover } from "antd";
import { Button } from "components";
import { GlobalStyle, Main } from "./styled";
import PrintIcon from "assets/svg/hoSoBenhAn/print.svg";
import { useDispatch, useSelector } from "react-redux";
import { printJS } from "data-access/print-provider";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import XemTruoc from "components/ModalSignPrint/XemTruoc";
import DanhSachPhieu from "components/ModalSignPrint/DanhSachPhieu";
import { useLoading, useStore } from "hook";
import ModalBieuMauScan from "pages/hoSoBenhAn/components/ModalBieuMauScan";
import ModalDanhSachBieuMauScan from "pages/hoSoBenhAn/components/ModalDanhSachBieuMauScan";
import ModalScanPrint from "pages/hoSoBenhAn/components/ModalScanPrint";

const HoSoKhamBenh = ({ nbDotDieuTriId, ...props }) => {
  const { t } = useTranslation();
  const { selectedIds } = useSelector((state) => state.phieuIn);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);

  const refModalBieuMauScan = useRef(null);
  const refModalDanhSach = useRef(null);
  const refModalScanPrint = useRef();

  const {
    phieuIn: { getPhieuIn, showFileEditor, getFilePhieuIn },
    hoSoBenhAn: { searchDsBaoCao },
    nbGoiDv: { getByNbThongTinId },
  } = useDispatch();
  const listNbGoiDv = useStore("nbGoiDv.listNbGoiDv", []);

  const { showLoading, hideLoading } = useLoading();
  const { id } = useParams();

  const [state, _setState] = useState({
    listPhieu: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (id || nbDotDieuTriId) {
      getPhieuIn({
        nbDotDieuTriId: nbDotDieuTriId || id,
        maManHinh: "001",
        maViTri: "00101",
      }).then((listPhieu) => {
        setState({
          listPhieu: listPhieu.filter((item) => item.type == "editor"),
          show: true,
          data: { nbDotDieuTriId: id, maManHinh: "001", maViTri: "00101" },
        });
      });
      searchDsBaoCao({
        maManHinh: "001",
        maViTri: "00101",
        active: true,
      });
    }
  }, [id, nbDotDieuTriId]);

  useEffect(() => {
    if (thongTinBenhNhan?.nbThongTinId) {
      getByNbThongTinId({ nbThongTinId: thongTinBenhNhan.nbThongTinId });
    }
  }, [thongTinBenhNhan]);

  const onPrint = async (index, value) => {
    if (selectedIds.length <= 0) {
      return message.error(t("phieuIn.vuiLongChonPhieu"));
    }
    try {
      showLoading();
      const { finalFile, dsPhieu } = await getFilePhieuIn({
        selectedIds,
        nbDotDieuTriId: id,
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

  const onPrintPhieu = (item, nbDvKhamId) => () => {
    if (item.key == 0) {
      onPrint();
    } else {
      if (item.type == "editor") {
        showFileEditor({
          phieu: item,
          nbDotDieuTriId: thongTinBenhNhan.id,
          nbThongTinId: thongTinBenhNhan.nbThongTinId,
          nbDvKhamId: nbDvKhamId || item.dsSoPhieu[0]?.soPhieu,
          goiDvId: listNbGoiDv[0]?.id,
        });
      }
    }
  };

  const contentPhieuNhatKyDieuTri = () => {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="nhat-ky"
      >
        {listNbGoiDv.map((x) => {
          return (
            <span
              onClick={() => window.open("/editor/bao-cao/EMR_BA156/" + x.id)}
            >
              {x.tenGoiDv}
            </span>
          );
        })}
      </div>
    );
  };

  const menu = useMemo(() => {
    if (!thongTinBenhNhan) return null;
    const phieus = [
      { key: 0, ten: t("phieuIn.inTatCa") },
      ...(state.listPhieu || []),
    ];
    return (
      <Menu
        items={phieus.map((item, index) => {
          const children = {};
          if (item.dsSoPhieu?.length > 1)
            children.children = item.dsSoPhieu.map((phieu, index2) => {
              return {
                key: index + "-" + index2,
                label: (
                  <a onClick={onPrintPhieu(item, phieu.soPhieu)}>
                    {`${phieu.ma} - ${phieu.ten}`}
                  </a>
                ),
              };
            });

          if (item.ma == "P040" && listNbGoiDv?.length > 1) {
            return {
              key: index + "",
              label: (
                <div style={{ display: "flex" }}>
                  <Popover
                    getPopupContainer={(trigger) => trigger.parentNode}
                    overlayClassName={"popover-hsba-dieu-tri"}
                    placement="left"
                    content={contentPhieuNhatKyDieuTri()}
                  >
                    <div style={{ flex: 1 }}>{item.ten || item.tenBaoCao}</div>
                  </Popover>
                </div>
              ),
            };
          }
          return {
            key: index,
            label: (
              <a
                onClick={
                  !item.dsSoPhieu || item.dsSoPhieu?.length <= 1
                    ? onPrintPhieu(item)
                    : null
                }
              >
                {item.ten || item.tenBaoCao}
              </a>
            ),
            ...children,
          };
        })}
      />
    );
  }, [state.listPhieu, selectedIds, thongTinBenhNhan, listNbGoiDv]);
  const handleClick = (item) => {
    if (item.key === 1) {
      refModalBieuMauScan.current &&
        refModalBieuMauScan.current.show({
          refModalScanPrint: refModalScanPrint.current,
        });
    } else {
      refModalDanhSach.current &&
        refModalDanhSach.current.show({
          refModalBieuMauScan: refModalBieuMauScan.current,
          refModalScanPrint: refModalScanPrint.current,
        });
    }
  };
  return (
    <Main>
      <GlobalStyle />
      <div className="left-content">
        <XemTruoc
          data={state.data}
          isHoSoBenhAn={true}
          title={t("hsba.phieuKhamChung")}
        />
      </div>
      <div className="right-content">
        <DanhSachPhieu
          showButtonPrint={false}
          showIconScan={true}
          handleClick={handleClick}
        />
        <div className="right-print">
          <Dropdown overlay={menu}>
            <Button
              type="primary"
              minWidth={100}
              iconHeight={15}
              rightIcon={<PrintIcon />}
            >
              <span>{t("common.in")}</span>
            </Button>
          </Dropdown>
        </div>
      </div>
      <ModalBieuMauScan ref={refModalBieuMauScan}></ModalBieuMauScan>
      <ModalDanhSachBieuMauScan
        ref={refModalDanhSach}
      ></ModalDanhSachBieuMauScan>
      <ModalScanPrint ref={refModalScanPrint}></ModalScanPrint>
    </Main>
  );
};

export default HoSoKhamBenh;
