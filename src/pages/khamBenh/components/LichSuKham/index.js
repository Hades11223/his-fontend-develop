import React, { useEffect, useState, useRef, useMemo } from "react";
import { Collapse, Popover, Tooltip } from "antd";
import { Main, HistoryTitle, HistoryContent, GlobalStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { groupBy, isNil } from "lodash";
import CollapseIcon from "assets/images/khamBenh/collapse.png";
import CollapseIconGray from "assets/images/khamBenh/collapse-gray.png";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import IcSaoChep from "assets/svg/kham-benh/icSaoChep.svg";
import ModalSaoChepDichVu from "../ModalSaoChepDichVu";
const { Panel } = Collapse;

export const LichSuKham = ({ collapse }) => {
  const { t } = useTranslation();
  const [listHuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);
  const { listHistory, infoNb, totalElementsLichSuKham } = useSelector(
    (state) => state.khamBenh
  );
  const refSaoChepDichVu = useRef(null);
  const {
    khamBenh: { getHistory },
  } = useDispatch();

  const refListScrollOld = useRef([]);
  const refMaNguoiBenh = useRef([]);
  const [state, _setState] = useState({ size: 10 });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});

  useEffect(() => {
    if (!infoNb?.maNb || refMaNguoiBenh.current == infoNb.maNb) return;
    refMaNguoiBenh.current = infoNb.maNb;
    getHistory({ maNb: infoNb.maNb, page: 0, size: 10 });
  }, [infoNb?.maNb]);

  const onSaoChep = (item) => {
    refSaoChepDichVu.current && refSaoChepDichVu.current.show(item);
  };
  const contentPopover = (history, children) => {
    return (
      <Popover
        title={<div className="popover-title">{history.tenDichVu}</div>}
        visible={collapse ? undefined : false}
        overlayClassName="lich-su-kham-popover"
        content={
          <>
            {renderHistoryContent(history, true)}
            <div style={{ textAlign: "right" }}>
              <img
                title={t("khamBenh.lichSuKham.xemChiTietHoSoBenhAn")}
                style={{ cursor: "pointer" }}
                src={CollapseIconGray}
                alt="..."
                onClick={() => {
                  window.open(
                    `/ho-so-benh-an/chi-tiet-nguoi-benh/${history.nbDotDieuTriId}`
                  );
                }}
              />
            </div>
          </>
        }
      >
        {children}
      </Popover>
    );
  };
  const renderHistoryTitle = (history, data) => {
    const { thoiGianVaoVien, chuyenKhoa, thoiGianKetLuan } = history;
    return (
      <>
        <div className="history-title">
          {contentPopover(
            history,
            <div className="left">
              {thoiGianKetLuan
                ? moment(thoiGianKetLuan).format("DD/MM/YYYY")
                : thoiGianVaoVien &&
                  moment(thoiGianVaoVien).format("DD/MM/YYYY")}
              {!collapse &&
                chuyenKhoa &&
                ` - ${
                  thoiGianKetLuan
                    ? `Khám ${chuyenKhoa.toLowerCase()}`
                    : chuyenKhoa
                }`}
            </div>
          )}
          {data.length === 1 && (
            <div className="right" onClick={() => onSaoChep(history)}>
              <IcSaoChep />
            </div>
          )}
        </div>

        <div className="subtitle">
          {data?.length > 1 &&
            data.map((item) => {
              return (
                <div className="history-subtitle">
                  {contentPopover(
                    item,

                    <div className="subtitle-left">
                      {`-`}
                      &nbsp;&nbsp;
                      {item?.tenDichVu}
                    </div>
                  )}

                  {item?.id !== thongTinChiTiet?.id && (
                    <div
                      className="subtitle-right"
                      onClick={() => onSaoChep(item)}
                    >
                      <IcSaoChep />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </>
    );
  };

  const renderHistoryContent = (history, ignoreTenDV) => {
    const {
      tenDichVu,
      thoiGianKetLuan,
      tenBacSiKetLuan,
      dsCdChinh,
      dsCdKemTheo,
      soNgayHenKham,
      khoaNhapVien,
      vienChuyenDen,
      ghiChu,
      loiDan,
      huongDieuTri,
    } = history;

    const huongDieuTriObj = listHuongDieuTriKham.find(
      (huongdt) => huongdt.id === huongDieuTri
    );

    const showContentHistory = (value, title, subContent) => {
      return (
        <span>
          {!isNil(value) && (
            <>
              <span className="collapse-content__title">{title}: </span>
              {value}
              {subContent}
            </>
          )}
        </span>
      );
    };

    return (
      <div className="collapse-content">
        <div className="collapse-content__box">
          {!ignoreTenDV && tenDichVu + " - "}
          {thoiGianKetLuan && `${moment(thoiGianKetLuan).format("DD/MM/YYYY")}`}
          {tenBacSiKetLuan && ` - ${tenBacSiKetLuan}`}
        </div>
        <div className="collapse-content__box">
          {dsCdChinh && dsCdChinh.length > 0 && (
            <>
              <span className="collapse-content__title">
                {t("khamBenh.lichSuKham.chanDoanBenh")}:
              </span>
              {dsCdChinh.map(
                (ds, index, arr) =>
                  `${ds.ma} - ${
                    arr.length - 1 === index ? ds.ten : `${ds.ten}; `
                  }`
              )}
            </>
          )}
        </div>
        <div className="collapse-content__box">
          {dsCdKemTheo && dsCdKemTheo.length > 0 && (
            <>
              <span className="collapse-content__title">
                {t("khamBenh.lichSuKham.chanDoanKhac")}:
              </span>
              {dsCdKemTheo.map(
                (ds, index, arr) =>
                  `${ds.ma} - ${
                    arr.length - 1 === index ? ds.ten : `${ds.ten}; `
                  }`
              )}
            </>
          )}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(
            huongDieuTriObj?.ten,
            t("khamBenh.lichSuKham.huongDieuTri")
          )}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(
            soNgayHenKham,
            t("khamBenh.lichSuKham.henKham"),
            " ngày"
          )}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(khoaNhapVien, t("khamBenh.lichSuKham.nhapVien"))}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(
            vienChuyenDen,
            t("khamBenh.lichSuKham.chuyenVien")
          )}
        </div>

        <div className="collapse-content__box">
          {showContentHistory(ghiChu, t("khamBenh.lichSuKham.ghiChu"))}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(loiDan, t("khamBenh.lichSuKham.loiDan"))}
        </div>
      </div>
    );
  };
  const listHistoryMemo = useMemo(() => {
    return groupBy(listHistory, "maHoSo");
  }, [listHistory]);
  return (
    <Main>
      <GlobalStyle />
      <HistoryTitle className="history-title">
        <div className="title-left">
          {t("khamBenh.lichSuKham.title")}
          <img
            title={t("khamBenh.xemChiTietHSBA")}
            style={{ marginLeft: 10, cursor: "pointer" }}
            src={CollapseIcon}
            alt="..."
            onClick={() => {
              window.open(`/ho-so-benh-an/chi-tiet-nguoi-benh/${infoNb.id}`);
              // onSearchInformation({ page: 0, size: 10, maHoSo: "2108120002" })
            }}
          />
        </div>
        <div className="title-right">
          {t("khamBenh.bnDaKhamNLan")}{" "}
          <span className="title-right--bold">
            {totalElementsLichSuKham} {t("common.lan")}
          </span>
        </div>
      </HistoryTitle>
      <HistoryContent
        onScroll={(event) => {
          let element = event.target;
          if (
            element.scrollHeight - element.scrollTop === element.clientHeight &&
            refListScrollOld.current.length !== listHistory.length
          ) {
            // do something at end of scroll
            setState({ size: state.size + 10 });
            getHistory({ maNb: infoNb?.maNb, page: 0, size: state.size + 10 });
            refListScrollOld.current = listHistory;
          }
        }}
      >
        {listHistory.length > 0 ? (
          <Collapse expandIconPosition="right">
            {Object.keys(listHistoryMemo || []).map((key, index) => {
              let item = listHistoryMemo[key];
              let history = item[0];
              return (
                <Panel
                  key={index}
                  collapsible={collapse ? "disabled" : null}
                  showArrow={!collapse}
                  header={
                    <span className="collapse-title">
                      {renderHistoryTitle(history, item)}
                    </span>
                  }
                >
                  {renderHistoryContent(history)}
                  <div style={{ textAlign: "right" }}>
                    <img
                      title={t("khamBenh.lichSuKham.xemChiTietHoSoBenhAn")}
                      style={{ cursor: "pointer" }}
                      src={CollapseIconGray}
                      alt="..."
                      onClick={() => {
                        window.open(
                          `/ho-so-benh-an/chi-tiet-nguoi-benh/${history.nbDotDieuTriId}`
                        );
                      }}
                    />
                  </div>
                </Panel>
              );
            })}
            {/* {listHistory.map((history, index) => {
              
            })} */}
          </Collapse>
        ) : (
          <>
            <div>{t("khamBenh.lichSuKham.nBChuaCoLichSuKham")}</div>
            <div>{t("khamBenh.lichSuKham.note")}</div>
          </>
        )}
      </HistoryContent>
      <ModalSaoChepDichVu ref={refSaoChepDichVu} />
    </Main>
  );
};

export default React.memo(LichSuKham);
