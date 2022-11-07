import React, { memo, useState, useEffect, useRef, useMemo } from "react";
import { Main, GlobalStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ButtonNguoiBenhTiepTheo from "../../../components/ButtonNguoiBenhTiepTheo";
import { message, Dropdown, Menu, Popover, Radio, Space } from "antd";
import { Button } from "components";
import IcPrint from "assets/images/utils/print.png";
import ModalSignPrint from "components/ModalSignPrint";
import { addPrefixNumberZero } from "utils";
import moment from "moment";
import { useParams } from "react-router-dom";
import { groupBy, flatten } from "lodash";
import { useTranslation } from "react-i18next";
import { printJS } from "data-access/print-provider";
import { refConfirm } from "app";
import { useLoading, useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import SettingIc from "assets/images/utils/setting.png";
import nbDvKyThuat from "data-access/nb-dv-ky-thuat-provider.js";
import ModalInChiDinhTheoDV from "../ModalInChiDinhTheoDV";
import { LOAI_DICH_VU } from "constants/index";
import Box2 from "pages/tiepDon/components/Box2";
import PhatHanhThe from "pages/tiepDon/components/PhatHanhThe";

const reducer = (accumulator, currentValue) =>
  accumulator + (currentValue || 0);

const TongTien = ({ layerId }) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const { id } = useParams();
  const refModalInChiDinhTheoDV = useRef(null);

  const refModalSignPrint = useRef(null);
  const refIsProcessing = useRef(null);
  const history = useHistory();
  const { doiTuong, khoaId } = useSelector((state) => state.tiepDon);
  const { listDvChoose } = useSelector((state) => state.tiepDonDichVu);
  const { nbTiepTheo } = useSelector((state) => state.goiSo);
  const {
    goiSo: { tuChonQuayTiepDon },
    tiepDonDichVu: {
      getPhieuKhamBenh,
      keDichVuKham,
      tamTinhTien,
      updateData,
      getListonSearchNbDv,
      tongTien,
    },
    phieuIn: {
      getListPhieu,
      getFilePhieuIn,
      showFileEditor,
      getDataDanhSachPhieu,
    },
  } = useDispatch();
  const tienDieuTri = useStore("tiepDonDichVu.tienDieuTri", {});
  const listDvDaTiepDon = useStore("tiepDonDichVu.listDvDaTiepDon", []);

  const [state, _setState] = useState({
    listPhieu: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    cacheUtils
      .read("", "TIEP_DON_OPTION_IN_PHIEU_CHI_DINH", 1)
      .then((valuePhieuChiDinh) => {
        setState({ valuePhieuChiDinh });
      });
  }, []);

  useEffect(() => {
    if (id) {
      tongTien({
        nbDotDieuTriId: id,
        thanhToan: false,
        dsChiDinhTuLoaiDichVu: LOAI_DICH_VU.TIEP_DON,
      });
    }
  }, [id]);
  useEffect(() => {
    setState({
      thanhTien: 0,
      tienNbPhuThu: 0,
      tienNbCungChiTra: 0,
    });
    tuChonQuayTiepDon();
  }, []);
  const {
    thanhTien,
    tienNbPhuThu,
    tienBhThanhToan,
    tienNbCungChiTra,
    tienNbTuTra,
  } = state;
  const onKeDichVu = (e, payload = {}) => {
    showLoading();
    if (refIsProcessing.current) {
      return;
    }
    refIsProcessing.current = true;
    let data = (listDvChoose || []).map((item) => {
      return {
        nbDotDieuTriId: id,
        bacSiKhamId: item?.bacSiKhamId,
        nbDvKyThuat: {
          phongThucHienId: item?.phongId,
        },
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item?.soLuong || 1,
          chiDinhTuDichVuId: id,
          chiDinhTuLoaiDichVu: LOAI_DICH_VU.TIEP_DON,
          loaiDichVu: item.loaiDichVu,
          khoaChiDinhId: khoaId,
          nbGoiDvId: item.nbGoiDvId || undefined,
          nbGoiDvChiTietId: item?.nbGoiDvChiTietId || undefined,
          loaiHinhThanhToanId: item?.loaiHinhThanhToanId,
        },
      };
    });
    const checkPhongThucHien = (data || []).filter(
      (item) => !item.nbDvKyThuat.phongThucHienId
    );
    if (checkPhongThucHien.length) {
      message.error(t("tiepDon.cacDichVuPhaiChonPhong"));
      refIsProcessing.current = false;
      hideLoading();
      return;
    }
    keDichVuKham({ data })
      .then(async (s) => {
        hideLoading();
        if (s) {
          let isError = false; //đánh dấu không có lỗi
          s.forEach((item) => {
            //duyệt qua các response
            if (item.code != 0) {
              //nếu có response có lỗi
              isError = true; //thì đánh dấu là có lỗi
              (item.message || []).forEach((mes) => {
                //đồng thời print ra lỗi
                message.error(mes);
              });
              (item.data || []).forEach((dv) => {
                //duyệt qua danh sách dịch vụ đã thêm thành công
                const dvKe = listDvChoose?.find(
                  //tìm kiếm dịch vụ đã kê trùng với dịch vụ kê thành công
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //nếu tìm thấy thì set id cho dịch vụ đã kê
              });
            } else {
              (item.data || []).forEach((dv) => {
                //duyệt qua danh sách dịch vụ đã thêm thành công
                const dvKe = listDvChoose?.find(
                  //tìm kiếm dịch vụ đã kê trùng với dịch vụ kê thành công
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //nếu tìm thấy thì set id cho dịch vụ đã kê
              });
            }
          });
          refIsProcessing.current = false;
          if (!isError) {
            if (payload.isInPhieu) {
              refModalSignPrint.current.show({
                nbDotDieuTriId: id,
                maManHinh: "002",
                maViTri: "00201",
                dsChiDinhTuLoaiDichVu: [200, 230, 240],
              });
              if (data.length > 0) {
                getListonSearchNbDv({
                  nbDotDieuTriId: id,
                  dsChiDinhTuLoaiDichVu: [200, 230, 240],
                  dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
                }).then((res) => {
                  console.log("res: ", res);
                  const serviceSelected = groupBy(res, "loaiDichVu");
                  const promises = Object.keys(serviceSelected).map(
                    (loaiDichVu) => {
                      return new Promise((resolve, reject) => {
                        tamTinhTien({
                          data: serviceSelected[loaiDichVu].map((dv) => {
                            console.log("tamTinhTien", dv);

                            return {
                              nbDotDieuTriId: id,
                              nbDichVu: {
                                dichVuId: dv.dichVuId,
                                soLuong: dv.soLuong || 1,
                                loaiDichVu: dv.loaiDichVu,
                                nbGoiDvId: dv.nbGoiDvId || undefined,
                              },
                            };
                          }),
                          loaiDichVu: parseInt(loaiDichVu),
                        })
                          .then((s) => {
                            resolve(s.data || []);
                          })
                          .catch((e) => {
                            resolve([]);
                          });
                      });
                    }
                  );
                  Promise.all(promises).then((s) => {
                    let newListDvChoose = res.map((item) => {
                      //duyệt qua danh sách dịch vụ đã chọn
                      s.forEach(async (tts) => {
                        //tìm tính tiền tương ứng với dịch vụ
                        const tt = await tts.find((y) => {
                          return y.nbDichVu?.dichVuId == item.dichVuId;
                        });
                        //cập nhật giá trị tiền vào dịch vụ
                        item.tinhTien = tt?.nbDichVu || item?.tinhTien || {}; // thêm item.tinhTien vì khi lặp khi không tìm được sẽ gán giá trị không tìm được là undefined
                      });
                      item.tenPhong = item.tenPhongThucHien;

                      return item;
                    });
                    console.log("newListDvChoose: ", newListDvChoose);
                    updateData({
                      listDvChoose: [...newListDvChoose],
                    });
                  });
                });
              }
            } else {
              if (data.length > 0) {
                getPhieuKhamBenh({ id, data });
              }
              await updateData({ listDvChoose: [], listDvDaTiepDon: [] });
              let item = (s || [])
                .filter((x) => x.data.length)
                .map((x1) => x1.data);
              let messageWarning =
                item.length && item[item.length - 1].filter((x) => x.message);
              let content = messageWarning[messageWarning?.length - 1]?.message;
              if (content) {
                refConfirm.current &&
                  refConfirm.current.show(
                    {
                      title: t("common.canhBao"),
                      content: content,
                      cancelText: t("common.huy"),
                      classNameOkText: "button-error",
                      showImg: true,
                      typeModal: "warning",
                    },
                    () => {},
                    () => {
                      history.push(`/tiep-don`);
                    }
                  );
              } else {
                history.push(`/tiep-don`);
              }
            }
          }
        }
      })
      .catch((e) => {
        hideLoading();
        refIsProcessing.current = false;
      });
  };
  const convertData = (value) => {
    return (
      listDvChoose
        ?.filter(
          (option) =>
            (!option.thanhToanBaoHiem || !option.thanhToanDichVu) &&
            !option.thanhToan
        )
        .map((item) => {
          let gia =
            Object.keys(item?.tinhTien || {})?.length > 0
              ? item?.tinhTien[`${value}`]
              : 0;
          return gia;
        }) ?? []
    );
  };
  useEffect(() => {
    if (id)
      getListPhieu({
        nbDotDieuTriId: id,
        maManHinh: "002",
        maViTri: "00201",
        dsChiDinhTuLoaiDichVu: [200, 230, 240],
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu || [] });
      });
  }, [id]);
  useEffect(() => {
    let tienBhThanhToan = 0;
    let tienNbPhuThu = 0;
    let tienNbCungChiTra = 0;
    let tienNbTuTra = 0;
    let thanhTien =
      (tienDieuTri?.tienNbPhuThu || 0) +
      (tienDieuTri?.tienNbCungChiTra || 0) +
      (tienDieuTri?.tienNbTuTra || 0);
    //đối tượng = 1 là không bảo hiểm , 2 là bảo hiểm
    if (listDvChoose?.length || tienDieuTri) {
      let datathanhTien = convertData("thanhTien") || [];
      if ((datathanhTien && datathanhTien.length) || thanhTien) {
        thanhTien = datathanhTien.reduce(reducer, 0) + thanhTien;
      }
      if (doiTuong === 2) {
        let datatienNbCungChiTra = convertData("tienNbCungChiTra") || [];
        if (
          (datatienNbCungChiTra && datatienNbCungChiTra.length) ||
          tienDieuTri?.tienNbCungChiTra
        ) {
          tienNbCungChiTra =
            datatienNbCungChiTra.reduce(reducer, 0) +
            (tienDieuTri.tienNbCungChiTra || 0);
        }
        let datatienNbPhuThu = convertData("tienNbPhuThu") || [];
        if (
          (datatienNbPhuThu && datatienNbPhuThu.length) ||
          tienDieuTri?.tienNbPhuThu
        ) {
          tienNbPhuThu =
            datatienNbPhuThu.reduce(reducer, 0) +
            (tienDieuTri.tienNbPhuThu || 0);
        }
        let datatienNbTuTra = convertData("tienNbTuTra") || [];
        if (
          (datatienNbTuTra && datatienNbTuTra.length) ||
          tienDieuTri?.tienNbTuTra
        ) {
          tienNbTuTra =
            datatienNbTuTra.reduce(reducer, 0) + (tienDieuTri.tienNbTuTra || 0);
        }
        let datatienBhThanhToan = convertData("tienBhThanhToan") || [];
        if (
          (datatienBhThanhToan && datatienBhThanhToan.length) ||
          tienDieuTri?.tienBhThanhToan
        ) {
          tienBhThanhToan =
            datatienBhThanhToan.reduce(reducer, 0) +
            (tienDieuTri.tienBhThanhToan || 0);
        }
      }
      setState({
        thanhTien: thanhTien,
        tienBhThanhToan: tienBhThanhToan,
        tienNbPhuThu: tienNbPhuThu,
        tienNbCungChiTra: tienNbCungChiTra,
        tienNbTuTra: tienNbTuTra,
      });
    } else {
      setState({
        thanhTien: tienDieuTri.thanhTien || 0,
        tienNbPhuThu: tienDieuTri.tienNbPhuThu || 0,
        tienBhThanhToan: tienDieuTri.tienBhThanhToan || 0,
        tienNbCungChiTra: tienDieuTri.tienNbCungChiTra || 0,
        tienNbTuTra: tienDieuTri.tienNbTuTra || 0,
      });
    }
  }, [listDvChoose, tienDieuTri]);
  const onPrintPhieu = (item) => async () => {
    if (item.key == 0) {
      onKeDichVu(null, { isInPhieu: true });
    } else {
      if (item.type == "editor") {
        showFileEditor({ phieu: item, nbDotDieuTriId: id });
      } else {
        try {
          showLoading();
          const { finalFile, dsPhieu } = await getFilePhieuIn({
            listPhieus: [item],
            nbDotDieuTriId: id,
            dsChiDinhTuLoaiDichVu: [200, 230, 240],
            showError: true,
          });
          printJS({
            printable: finalFile,
            type: "pdf",
          });
        } catch (error) {
        } finally {
          hideLoading();
        }
      }
    }
  };
  const contentPhieuChiDinh = () => {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Radio.Group
          value={state.valuePhieuChiDinh || 2}
          onChange={(e) => {
            setState({
              valuePhieuChiDinh: e.target.value,
              popoverVisible: false,
            });
            cacheUtils.save(
              "",
              "TIEP_DON_OPTION_IN_PHIEU_CHI_DINH",
              e.target.value
            );
          }}
        >
          <Space direction="vertical">
            <Radio value={1}>{t("khamBenh.tatCaChiDinh")}</Radio>
            <Radio value={2}>{t("khamBenh.chiDinhChuaIn")}</Radio>
            <Radio value={3}>{t("khamBenh.inChiDinhTheoDichVu")}</Radio>
          </Space>
        </Radio.Group>
      </div>
    );
  };

  const onPrint = async () => {
    let res = null;
    try {
      res = await nbDvKyThuat.getPhieuChiDinhTongHop({
        nbDotDieuTriId: id,
        chiDinhTuDichVuId: id,
        dschiDinhTuLoaiDichVu: 200,
      });
    } catch (e) {
      message.error(e?.message);
      return null;
    }

    const dsFilePdf = Array.isArray(res?.data)
      ? res?.data.map((itemChild) => itemChild.file.pdf)
      : res?.data.file.pdf
      ? [res?.data.file.pdf]
      : [];
    if (!dsFilePdf.length) {
      return null;
    }
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrintPhieuChuaIn = async () => {
    let res = null;
    try {
      res = await nbDvKyThuat.getPhieuChiDinhTongHop({
        nbDotDieuTriId: id,
        chiDinhTuDichVuId: id,
        dschiDinhTuLoaiDichVu: 200,
        inPhieuChiDinh: false,
      });
    } catch (e) {
      message.error(e?.message);
      return null;
    }
    if (res?.length === 0) {
      message.error(t("khamBenh.khongConPhieuChiDinhChuaIn"));
      return null;
    }
    const dsFilePdf = Array.isArray(res?.data)
      ? res?.data.map((itemChild) => itemChild.file.pdf)
      : res?.data.file.pdf
      ? [res?.data.file.pdf]
      : [];
    if (!dsFilePdf.length) {
      return null;
    }
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrintTheoDichVu = async () => {
    let res = await nbDvKyThuat.getDvPhieuChiDinh({
      nbDotDieuTriId: id,
      chiDinhTuDichVuId: id,
      dschiDinhTuLoaiDichVu: 200,
    });
    refModalInChiDinhTheoDV.current.show(res.data);
  };

  const onPrintPhieuChiDinh = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    showLoading();
    switch (state.valuePhieuChiDinh) {
      case 1: {
        // tất cả chỉ định
        await onPrint();
        break;
      }
      case 2: {
        // chỉ định chưa in
        await onPrintPhieuChuaIn();
        break;
      }
      case 3: {
        // in chỉ định theo dịch vụ
        await onPrintTheoDichVu();
        break;
      }
      default:
        // tất cả chỉ định
        await onPrint();
        break;
    }
    hideLoading();
  };

  const menu = useMemo(() => {
    const phieus = [
      { key: 0, ten: t("phieuIn.inTatCa") },
      ...(state.listPhieu || []),
    ];
    return (
      <Menu
        items={(phieus || []).map((item, index) => {
          if (item.ma === "P075") {
            return {
              key: index + "",
              label: (
                <div style={{ display: "flex" }}>
                  <div onClick={onPrintPhieuChiDinh} style={{ flex: 1 }}>
                    {item.ten || item.tenBaoCao}
                  </div>

                  <Popover
                    getPopupContainer={(trigger) => trigger.parentNode}
                    overlayClassName={"tiep-don-in-options right"}
                    placement="rightBottom"
                    content={contentPhieuChiDinh()}
                    trigger="click"
                    visible={state.popoverVisible}
                  >
                    <img
                      src={SettingIc}
                      alt=""
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setState({ popoverVisible: !state.popoverVisible });
                      }}
                    />
                  </Popover>
                </div>
              ),
            };
          }
          return {
            key: index + "",
            label: (
              <div onClick={onPrintPhieu(item)}>
                {item.ten || item.tenBaoCao}
              </div>
            ),
          };
        })}
      />
    );
  }, [state.listPhieu, state?.valuePhieuChiDinh, state.popoverVisible]);

  return (
    <Main>
      <GlobalStyle />
      <Box2 title={t("common.tongTien")} className="tong-tien">
        <div className="main">
          <div className="note">
            <span>{t("common.ghiChu")}: </span>
            {t(
              "tiepDon.soTienChinhXacDuocXacDinhTaiQuayThuNganSauApDungChinhSachGiamGia"
            )}
          </div>
          <div className="not-pay">{t("tiepDon.chuaThanhToan")}</div>
          <div className="content-main">
            {doiTuong == 2 ? ( //đối tượng 2 là đối tượng bảo hiểm, check !== 2 là sai
              <>
                <div className="item">
                  <div className="title">
                    {t("tiepDon.nguoiBenhCungChiTra")}
                  </div>
                  <div className="price">
                    {tienNbCungChiTra?.formatPrice()} đ
                  </div>
                </div>
                <div className="item">
                  <div className="title">{t("tiepDon.phuThu")}</div>
                  <div className="price">{tienNbPhuThu?.formatPrice()} đ</div>
                </div>
                <div className="item">
                  <div className="title">{t("tiepDon.tienBHChiTra")}</div>
                  <div className="price ">
                    {tienBhThanhToan?.formatPrice()} đ
                  </div>
                </div>
                <div className="item">
                  <div className="title">{t("tiepDon.tienNbTuTra")}</div>
                  <div className="price ">{tienNbTuTra?.formatPrice()} đ</div>
                </div>
              </>
            ) : null}
            <div className="item">
              <div className="title">{t("common.tongTien")}</div>
              <div className="price">{thanhTien?.formatPrice()} đ</div>
            </div>
          </div>
        </div>
      </Box2>

      <div className="footer">
        <PhatHanhThe />

        <Dropdown overlay={menu}>
          <Button
            type="default"
            // onClick={onPrint}
            rightIcon={<img src={IcPrint} alt="" />}
            iconHeight={15}
          >
            <span>{t("tiepDon.inGiayTo")}</span>
          </Button>
        </Dropdown>
        <ButtonNguoiBenhTiepTheo onClick={onKeDichVu} layerId={layerId} />
      </div>
      {nbTiepTheo && (
        <div className="next-patient">
          BNS-
          {nbTiepTheo?.stt && <b>{addPrefixNumberZero(nbTiepTheo?.stt)} </b>}
          {nbTiepTheo?.tenNb && <span>{nbTiepTheo?.tenNb}</span>}
          {nbTiepTheo?.ngaySinh && (
            <span>
              {" - "}
              {moment(nbTiepTheo?.ngaySinh)?._d?.getAge()}
            </span>
          )}
        </div>
      )}
      <ModalSignPrint ref={refModalSignPrint} />
      <ModalInChiDinhTheoDV ref={refModalInChiDinhTheoDV} />
    </Main>
  );
};
export default memo(TongTien);
