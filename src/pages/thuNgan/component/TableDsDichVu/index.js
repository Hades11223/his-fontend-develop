import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import { groupBy } from "lodash";
import Pagination from "components/Pagination";
import Icon from "@ant-design/icons";
import IconCreate from "assets/svg/thuNgan/iconCreate.svg";
import IconDelete from "assets/svg/kho/delete.svg";
import ModalAddDichVu from "../ModalAddDv";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { ENUM } from "constants/index";
import { useEnum } from "hook";
const TableDsDichVu = (props) => {
  const { dsDichVu, totalElements = 10, isChiTiet } = props;
  const [state, _setState] = useState({
    listData: [],
    size: 20,
    page: 0,
    dsDichVu: [],
    listPhieuThuId: [],
  });
  const { t } = useTranslation();
  const refModalAllDichVu = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const {
    dsHoaDonDienTu: { getDsDichVu, updateData },
  } = useDispatch();
  useEffect(() => {
    const groupPhieu = groupBy(state.dsDichVuDefault, "soPhieuThu");
    setState({
      dsDichVu: state.dsDichVuDefault,
      groupPhieu,
    });
  }, [state.dsDichVuDefault]);
  useEffect(() => {
    if (Array.isArray(state.dsDichVu)) {
      const newData = state.dsDichVu
        .map((item) => ({
          ...item,
          countSophieuThu: state?.groupPhieu[item.soPhieuThu]?.length,
        }))
        .sort((a, b) => +a.soPhieuThu - +b.soPhieuThu);
      setState({
        AllListData: newData,
      });
    }
  }, [state.dsDichVu, state.groupPhieu]);
  useEffect(() => {
    if (Array.isArray(state.AllListData)) {
      const dataDefault = [...state.AllListData].slice(0, 20);
      setState({
        listData: dataDefault,
      });
    }
  }, [state.AllListData]);
  useEffect(() => {
    setState({ dsDichVuDefault: dsDichVu });
  }, [dsDichVu]);
  const handleSizeChange = (size) => {
    const newData = [...state.AllListData].slice(0, size);
    setState({
      page: 0,
      listData: newData,
      size,
    });
  };
  const handleChangePage = (page) => {
    const newData = [...state.AllListData].slice(
      (page - 1) * state.size,
      (page - 1) * state.size + state.size
    );
    setState({
      page: page - 1,
      listData: newData,
    });
  };
  const handleShowModal = () => {
    if (refModalAllDichVu.current) {
      refModalAllDichVu.current.show(
        {},
        ({ listPhieuThuId, nbDotDieuTriId }) => {
          getDsDichVu({
            listId: listPhieuThuId,
            nbDotDieuTriId,
          }).then((s) => {
            const data = s[0];
            const dvTrung = state.dsDichVu.filter((item) =>
              data.some((el) => el.id === item.id)
            );
            let dsDichVu = [...state.dsDichVu, ...data];
            dsDichVu = dsDichVu.filter((item, index, self) => {
              return self.findIndex((t) => t.id === item.id) === index;
            });
            const groupPhieu = groupBy(dsDichVu, "soPhieuThu");
            setState({
              dsDichVu: dsDichVu,
              groupPhieu,
            });
            if (dvTrung?.length) {
              message.error(
                t("thuNgan.dichVuDaThemDuocVaoHoaDon").replace(
                  "{0}",
                  dvTrung.map((item) => item.tenDichVu).toString()
                )
              );
            }
          });
        }
      );
    }
  };
  const renderTrangThai = (trangThaiId) => {
    if (listTrangThaiDichVu?.length) {
      const trangThai = listTrangThaiDichVu.find(
        (item) => item.id === trangThaiId
      );
      return trangThai ? trangThai.ten : "";
    }
  };
  const handleRemove = (soPhieu) => () => {
    const newData = state.dsDichVu.filter(
      (item) => +item.soPhieuThu !== +soPhieu
    );
    const AllListData = state.AllListData.filter(
      (item) => +item.soPhieuThu !== +soPhieu
    );
    const groupPhieu = groupBy(newData, "soPhieuThu");
    setState({
      dsDichVu: newData,
      groupPhieu,
      AllListData,
    });
  };
  useEffect(() => {
    if (!isChiTiet) {
      if (Array.isArray(state.AllListData)) {
        let price = 0;
        (state.AllListData || []).forEach((e) => {
          price += e.thanhTien;
        });
        updateData({ price, listDv: state.AllListData });
      }
    }
  }, [state.AllListData]);
  return (
    <Main>
      <div className="title">
        <span> {t("common.danhSachDichVu")} </span>
        {!isChiTiet && (
          <Icon component={IconCreate} onClick={handleShowModal}></Icon>
        )}
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>{t("common.stt")}</th>
              <th style={{ width: "400px" }}>{t("common.tenDichVu")}</th>
              <th>{t("thuNgan.dvt")}</th>
              <th>{t("thuNgan.sl")}</th>
              <th>{t("common.trangThai")}</th>
              <th>{t("common.thanhTien")}</th>
              <th>{t("thuNgan.soPhieuThu")}</th>
              {!isChiTiet && <th>{t("common.tienIch")}</th>}
            </tr>
          </thead>
          <tbody>
            {state.listData.map((item, index, data) => {
              let check = false;
              // check : check xem co gop hang k nếu = true thì gộp
              const itemNext = data[index + 1];
              if (item?.soPhieuThu === itemNext?.soPhieuThu) {
                check = true;
              }
              let check2 = false;
              // check2 : check xem item trc đã gộp chưa nếu gộp rồi thì k hiện số phiếu thu và tiện ích
              const itemPrev = data[index - 1];
              if (item?.soPhieuThu === itemPrev?.soPhieuThu) {
                check2 = true;
              }
              return (
                <tr key={index} className={index % 2 !== 0 ? "odd" : ""}>
                  <td className="center">
                    {state.page * state.size + index + 1}
                  </td>
                  <td className="left">{item?.tenDichVu}</td>
                  <td className="right">{item?.tenDonViTinh}</td>
                  <td className="right">{item?.soLuong}</td>
                  <td className="left">{renderTrangThai(item?.trangThai)}</td>
                  <td className="right">{item?.thanhTien?.formatPrice()}</td>
                  {!check2 ? (
                    <>
                      <td
                        className="left noBg"
                        rowSpan={check ? item.countSophieuThu : 1}
                      >
                        {item?.soPhieuThu}
                      </td>
                      {!isChiTiet && (
                        <td
                          className="center noBg"
                          rowSpan={check ? item.countSophieuThu : 1}
                        >
                          <Icon
                            className="icon-delete"
                            component={IconDelete}
                            onClick={handleRemove(item.soPhieuThu)}
                          ></Icon>
                        </td>
                      )}
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalElements ? (
        <Pagination
          listData={state.listData}
          onChange={handleChangePage}
          current={state.page + 1}
          pageSize={state.size}
          total={state?.AllListData?.length || 0}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
      {!isChiTiet && (
        <ModalAddDichVu
          nbDotDieuTriId={props.nbDotDieuTriId}
          ref={refModalAllDichVu}
        ></ModalAddDichVu>
      )}
    </Main>
  );
};

export default React.memo(TableDsDichVu);
