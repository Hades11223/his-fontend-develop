import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DOT_DIEU_TRI } from "client/api";
import { message } from "antd";
import { t } from "i18next";
import nbPhieuThuProvider from "data-access/nb-phieu-thu-provider";
import nbPhieuDoiTraProvider from "data-access/nb-phieu-doi-tra-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvCdhaTdcnPtTtProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import dichVuProvider from "data-access/dich-vu-provider";
import { LIST_PHIEU_IN_EDITOR } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import nbChuyenVienProvider from "data-access/noiTru/nb-chuyen-vien-provider";
import nbDvHoanProvider from "data-access/nb-dv-hoan-provider";
import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import nbDvNgoaiDieuTriProvider from "./nb-dv-ngoai-dieu-tri-provider";
import nbDvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import nbGoiDvProvider from "./nb-goi-dv-provider";
import { groupBy } from "lodash";
import nbPhieuLinhSuatAnProvider from "data-access/nb-phieu-linh-suat-an";
import nbDichVuProvider from "./nb-dich-vu-provider";

const nbDotDieuTriProvider = {
  kiemTraThanhToan: ({ maNb = "", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/kiem-tra-thanh-toan`,
            {
              maNb,
              ...payload,
            }
          )
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  kiemTraRaVien: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/kiem-tra-ra-vien/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tongTienDieuTri: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-tien/${id}`, {})
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchNBDotDieuTri: ({
    page = 0,
    active = true,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchNBDotDieuTriTongHop: ({
    nbThongTinId,
    page = 0,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-hop`, {
            nbThongTinId,
            page: page,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  capNhatDotDieuTri: (data) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DOT_DIEU_TRI}/${data.id}`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getPhieuIn: ({
    nbDotDieuTriId,
    maManHinh,
    maViTri,
    chiDinhTuDichVuId,
    chiDinhTuLoaiDichVu,
    dsChiDinhTuLoaiDichVu,
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/phieu-in/${nbDotDieuTriId}`,
            {
              maManHinh,
              maViTri,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu,
              dsChiDinhTuLoaiDichVu,
            }
          )
        )
        .then((s) => {
          if (s.data.code === 0 && s.data.data) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getThongTinPhieu: ({
    phieu: item,
    nbDotDieuTriId,
    chiDinhTuLoaiDichVu,
    dsChiDinhTuLoaiDichVu,
    chiDinhTuDichVuId,
    trangThai,
    showError,
    ...payload
  }) => {
    let promise = null;
    if (LIST_PHIEU_IN_EDITOR.includes(item.ma)) {
      promise = new Promise((resolve, reject) => {
        item.id = stringUtils.guid();
        resolve({
          code: 0,
          data: item,
          type: "editor",
        });
      });
      return promise;
    }
    const dsSoPhieu = item?.dsSoPhieu || [];
    const maPhieu = item.ma;
    const id = payload.id;

    // console.log("maPhieu", maPhieu);
    switch (maPhieu) {
      case "P001":
        promise = nbDvKhamProvider.phieuKhamBenh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P002":
        promise = nbDvKhamProvider.phieuKhamBenhTheoId({
          nbDvKhamId: chiDinhTuDichVuId,
        });
        break;
      case "P004":
        if (chiDinhTuDichVuId)
          promise = dichVuProvider.getPhieuKhamBenhKetLuan(chiDinhTuDichVuId);
        else
          promise = dichVuProvider.getPhieuKhamBenhKetLuanParams({
            nbDotDieuTriId,
          });
        break;
      case "P005":
        promise = nbDvThuocProvider.getDonChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P006":
        promise = dichVuProvider.getPhieuGiuTheBHYT(nbDotDieuTriId);
        break;
      case "P007":
        promise = dichVuProvider.getCamKetDieuTriCovid(nbDotDieuTriId);
        break;
      case "P008":
        promise = dichVuProvider.getVongTayNguoiBenh(nbDotDieuTriId);
        break;
      case "P009":
        promise = nbDvKhamProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P010":
        promise = nbDvXetNghiemProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P011":
      case "P017":
      case "P020":
        promise = nbDvCdhaTdcnPtTtProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
          loaiDichVu: 30, //phiếu chỉ định cdha
        });
        break;
      case "P012":
        promise = nbDvXetNghiemProvider.getPhieuKetQua({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P014":
        promise = nbDvCdhaTdcnPtTtProvider.getPhieuKetQua({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P015":
        promise = nbDvKhamProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P016":
        promise = nbDvXetNghiemProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P018":
        promise = nbDvKhamProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P019":
        promise = nbDvXetNghiemProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P046":
        promise = nbDvCdhaTdcnPtTtProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
          loaiDichVu: 40, //phiếu phẫu thuật thủ thuật
        });
        break;
      case "P022":
        promise = new Promise((resolve, reject) => {
          nbDvXetNghiemProvider
            .getPhieuKetQua({
              nbDotDieuTriId,
              chiDinhTuLoaiDichVu,
              dsChiDinhTuLoaiDichVu,
              chiDinhTuDichVuId,
            })
            .then((s) => {
              s.data = [
                ...(s.data?.dsPhieuHis || []),
                ...(s.data?.dsPhieuLis || []).map((item) => {
                  item.file = { pdf: item.duongDan };
                  return item;
                }),
              ];
              resolve(s);
            })
            .catch((e) => {
              resolve({
                code: 1,
              });
            });
        });
        break;
      case "P013":
      case "P023":
        promise = new Promise((resolve, reject) => {
          nbDvCdhaTdcnPtTtProvider
            .getPhieuKetQua({
              nbDotDieuTriId,
              chiDinhTuLoaiDichVu,
              dsChiDinhTuLoaiDichVu,
              chiDinhTuDichVuId,
            })
            .then((s) => {
              let dsPhieuPacs = groupBy(s.data?.dsPhieuPacs || [], "soPhieuId");
              dsPhieuPacs = Object.keys(dsPhieuPacs).map((key) => {
                const item = dsPhieuPacs[key].sort((a, b) => {
                  return a.thoiGianCoKetQua > b.thoiGianCoKetQua ? -1 : 1;
                })[0];
                item.file = { pdf: item.duongDan };
                return item;
              });
              s.data = [
                ...dsPhieuPacs,
                ...(s.data?.dsPhieuHis || []),
                ...(s.data?.dsPhieuLis || []).map((item) => {
                  item.file = { pdf: item.duongDan };
                  return item;
                }),
              ];
              resolve(s);
            })
            .catch((e) => {
              resolve({
                code: 1,
              });
            });
        });

        // console.log(
        //   "promise",
        //   promise.then((res) => console.log("res", res))
        // );
        break;

      case "P025":
        promise = nbDvThuocProvider.getDonChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P027":
        promise = nbDvThuocProvider.getDonThuocTongHop({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P028":
        promise = nbDvThuocProvider.getDonChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P029":
        promise = dichVuProvider.getPhieuHuongDan({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P030":
        promise = dichVuProvider.getPhieuHuongDan({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
          ...payload,
        });
        break;
      case "P031":
        promise = dichVuProvider.getPhieuHuongDan({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P032":
        promise = nbDotDieuTriProvider.getBangKeChiPhi({ nbDotDieuTriId });
        break;
      case "P033":
        if (dsSoPhieu[0]?.soPhieu)
          promise = nbPhieuThuProvider.getInPhieuThu(dsSoPhieu[0]?.soPhieu);
        else
          return new Promise((resolve, reject) =>
            resolve({
              data: { message: t("thuNgan.khongTonTaiPhieuThuPhuHop") },
              code: 1,
            })
          );
        break;
      case "P034":
        if (dsSoPhieu[0]?.soPhieu)
          promise = nbPhieuDoiTraProvider.getInPhieuChi(dsSoPhieu[0]?.soPhieu);
        break;
      case "P036":
        promise = nbDotDieuTriProvider.getPhieuRaVien(nbDotDieuTriId);
        break;
      case "P045":
        if (item?.dsSoPhieu && item?.dsSoPhieu[0]?.soPhieu) {
          promise = nbTamUngProvider.inPhieuTamUng(item?.dsSoPhieu[0]?.soPhieu);
        }
        break;
      case "P050":
        promise = nbDvXetNghiemProvider.getPhieuKetQua({
          nbDotDieuTriId,
        });
        break;
      case "P052":
        promise = nbDvHoanProvider.inPhieuHoanDoiTra({
          nbDotDieuTriId,
          trangThai,
        });
        break;
      case "P053":
        promise = nbDvKhamProvider.inGiayKskNb({
          nbDotDieuTriId,
          id: chiDinhTuDichVuId,
          ...payload,
        });
        break;
      case "P054":
        promise = nbChuyenVienProvider.getPhieuChuyenVien({ nbDotDieuTriId });
        break;
      case "P055":
        promise = nbDotDieuTriProvider.getPhieuHenKham(nbDotDieuTriId);
        break;
      case "P059":
      case "P064":
        promise = nbDvCdhaTdcnPtTtProvider.phieuPTTT(id);
        break;
      case "P060":
      case "P065":
        promise = nbDvCdhaTdcnPtTtProvider.giayChungNhanPTTT(id);
        break;
      case "P062":
        promise = nbDotDieuTriProvider.getBangKeChiPhi({
          nbDotDieuTriId,
          tongHop: true,
        });
        break;
      case "P063":
        promise = nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
          nbDotDieuTriId,
        });
        break;
      case "P066":
        promise = nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
        });
        break;
      case "P067":
        promise = nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          dsChiDinhTuLoaiDichVu,
        });
        break;
      case "P068":
        promise = nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P069":
        promise = nbDvCdhaTdcnPtTtProvider.bangKeChiPhiThuocTrongPT(id);
        break;
      case "P070":
        promise = nbDvCdhaTdcnPtTtProvider.bangKeChiPhiVatTuTrongPT(id);
        break;
      case "P071":
        promise = nbDvCdhaTdcnPtTtProvider.phieuThanhToanPT(id);
        break;
      case "P072":
        promise = nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
        });
        break;
      case "P075":
        promise = nbDvKyThuatProvider.getPhieuChiDinhTongHop({
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
          chiDinhTuDichVuId,
        });
        break;
      case "P082":
        promise = nbDvKyThuatProvider.getPhieuXacNhanThucHienDichVu({
          nbDotDieuTriId,
          ...payload,
        });
        break;
      case "P061":
        if (payload.nbGoiDvId) {
          promise = nbGoiDvProvider.getPhieuTongHop({
            nbGoiDvId: payload.nbGoiDvId,
          });
        }
        break;
      case "P085":
        promise = nbPhieuLinhSuatAnProvider.phieuLinhSuatAn({
          id,
          tongHop: true,
        });
        break;
      case "P084":
        promise = nbPhieuLinhSuatAnProvider.phieuLinhSuatAn({
          id,
          tongHop: false,
        });
        break;
      case "P083":
        promise = nbDvKhamProvider.inPhieuKskNb({
          nbDotDieuTriId,
          ...payload,
        });
        break;
      case "P092":
        promise = nbDichVuProvider.inPhieuCongKhai({
          nbDotDieuTriId,
          ...payload,
        });
        break;
      case "P094":
        promise = nbDotDieuTriProvider.getPhieuBaoTu(nbDotDieuTriId);
        break;
      default:
        if (showError) {
          message.error(t("phieuIn.chuaDuocCauHinhThongTinPhieu"));
        }
        break;
    }
    if (promise) {
      return new Promise((resolve, reject) => {
        promise
          .then((phieu) => {
            let item = phieu.data;
            const data = phieu.data;
            if (Array.isArray(data)) {
              if (!data.length) {
                //SAKURA-11314 FE [Khám bệnh - in phiếu hoàn đổi] Lỗi: không hiển thị thông báo khi không có phiếu hoàn đổi
                if (maPhieu == "P052") {
                  throw {
                    message: t("phieuIn.khongTonTaiPhieuYeuCauHoanDoi"),
                  };
                }
                resolve(null);
                return;
              }
            }
            if (Array.isArray(item?.file?.pdf)) {
              item.filePdf = item?.file?.pdf?.map((x) => x);
            } else {
              if (Array.isArray(item)) {
                item = { data: item };
                item.filePdf = item.data.map((item) => item.file.pdf);
              } else item.filePdf = [item?.file?.pdf];
            }
            item.type = phieu?.type;
            resolve(item);
          })
          .catch((e) => {
            if (showError)
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            resolve({ data: e, code: 1 });
          });
      });
    }
    return promise;
  },
  getPhieuHenKham: (nbDotDieuTriId) => {
    // /api/his/v1/nb-dv-kham/phieu-ket-luan/38065
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/phieu-hen-kham/${nbDotDieuTriId}`
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBangKeChiPhiKb_Cb: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/bang-ke-chi-phi/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyTiepDon: ({ active, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/huy-tiep-don`), {
          ...payload,
          active,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getNbDotDieuTriTongHopTheoId: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-hop/${id}`, {})
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/${id}`)
        .then((s) => {
          if (s.data?.code === 0 && s.data?.data) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  macDinh: () => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/mac-dinh`, {}))
        .then((s) => {
          if (s.data?.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        });
    });
  },
  getNbLapBenhAn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/lap-benh-an`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbLapBenhAnById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/lap-benh-an/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postLapBenhAn: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/lap-benh-an/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  xoaBenhAn: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/xoa-benh-an/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyBenhAn: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/huy-benh-an/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbNoiTru: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/noi-tru`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbRaVien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/ra-vien`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbNoiTruById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/noi-tru/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getListNbKSK: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/ksk`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  postNbKSK: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  patchNbKSK: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DOT_DIEU_TRI}/${id}`, rest)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  hoanThanhKSK: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ksk/hoan-thanh/${id}`, rest)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  huyHoanThanhKSK: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ksk/huy-hoan-thanh/${id}`, rest)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  tiepNhanVaoKhoa: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/tiep-nhan-vao-khoa/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tuChoiVaoKhoa: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/tu-choi-vao-khoa/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyTiepNhanVaoKhoa: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DOT_DIEU_TRI}/huy-tiep-nhan-vao-khoa/${id}`,
          payload
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  postTiepNhanNbKSK: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ksk`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  mienGiam: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DOT_DIEU_TRI}/mien-giam/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateThongTinRaVien: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DOT_DIEU_TRI}/tong-ket-ra-vien/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getThongTinRaVien: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/tong-ket-ra-vien/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getBangKeChiPhi: ({ nbDotDieuTriId, ...payload }) => {
    // https://api-sakura-test.isofh.vn/api/his/v1/nb-dot-dieu-tri/bang-ke-chi-phi/\{nb-dot-dieu-tri-id}?
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/bang-ke-chi-phi/${nbDotDieuTriId}`,
            payload
          )
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuRaVien: (nbDotDieuTriId) => {
    // https://api-sakura-test.isofh.vn/api/his/v1/nb-dot-dieu-tri/bang-ke-chi-phi/\{nb-dot-dieu-tri-id}?
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/phieu-ra-vien/${nbDotDieuTriId}`)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  putPhieuRaVien: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DOT_DIEU_TRI}/phieu-ra-vien/${id}`, rest)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getPhieuBaoTu: (nbDotDieuTriId) => {
    // /api/his/v1/nb-dot-dieu-tri/phieu-bao-tu/{nbDotDieuTriId} (phiếu thường)
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/phieu-bao-tu/${nbDotDieuTriId}`)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getNbLichKhamKSK: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/ksk/lich-kham`,
            params
          )
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  postLichKhamKSK: (body) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ksk/lich-kham`, body)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  postImport: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ksk/import`, payload, {
          responseType: "arraybuffer",
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  ketThucDieuTri: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ra-vien/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  choVaoVienLai: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/huy-ra-vien/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  duKienRaVien: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/du-kien-ra-vien/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  ngatDieuTri: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/ngat-dieu-tri/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  dayPhieuRaVienById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/day-phieu-ra-vien/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  dayPhieuRaVien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/day-phieu-ra-vien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  huyPhieuRaVienById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DOT_DIEU_TRI}/huy-phieu-ra-vien/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default nbDotDieuTriProvider;
