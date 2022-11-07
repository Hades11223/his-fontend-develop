import goiSoProvider from "data-access/goi-so-provider";
import { message } from "antd";
import moment from "moment";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    readOnlyDsGoiNho: false,
    daThanhToan: true, // kiểm tra nb đã thanh toán nếu nhập mã nb
    messageChuaThanhToan: "", // nội dung thông báo chưa thanh toán
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    tuChonQuayTiepDon: async (payload, state) => {
      if (state.goiSo.quayTiepDonId) return; //Nếu có quầy rồi thì bỏ qua
      let quayTiepDonId = await cacheUtils.read("COUNTERS_ID", "", null, false); //đọc thông tin quầy tiếp đón đã lưu trước đó
      if (!quayTiepDonId) {
        //nếu không có thông tin
        const listAllQuayTiepDon = state.quayTiepDon.listAllQuayTiepDon;
        if (listAllQuayTiepDon?.length) {
          const list = listAllQuayTiepDon.map((item) => item.id);
          quayTiepDonId = list[~~(Math.random() * list.length)]; // random quầy
        }
      }
      if (quayTiepDonId) {
        dispatch.goiSo.dongQuay({
          quayHienTai: quayTiepDonId,
          quayMoi: quayTiepDonId,
        });
      }
    },
    setQuayTiepDon: async (quayTiepDonId = "", state) => {
      dispatch.goiSo.updateData({
        quayTiepDonId,
        readOnlyDsGoiNho: !quayTiepDonId,
      });
      cacheUtils.save("COUNTERS_ID", "", quayTiepDonId, false);
      return true;
    },
    searchGoiSo: (payload, state, ignoreCheckCardInsurance) => {
      return new Promise((resolve, reject) => {
        dispatch.tiepDon.updateData({ onSearchTime: new Date() }); //đánh dấu thời điểm search
        goiSoProvider
          .search(payload)
          .then((s) => {
            if (s?.code === 0 && s?.data?.length) {
              let data = s?.data?.length ? s.data[0] : {};
              if (data?.trangThai === 50) {
                message.error(
                  "STT đã tiếp đón, không thể tiếp đón lại trong ngày!"
                );
                reject(s);
              } else {
                dispatch.tiepDon.loadNguoiBenh(data, ignoreCheckCardInsurance);
                dispatch.goiSo.getNbTiepTheo({
                  id: state.goiSo.quayTiepDonId,
                  data: {
                    nbTiepTheoId: data.id, //sau khi search bệnh nhân tiếp đón theo stt thì gọi lệnh get người bệnh tiếp theo bỏ qua người bệnh hiện tại
                  },
                });
                resolve(data);
              }
            } else if (s?.data?.length === 0 && s?.code === 0) {
              message.error("Số thứ tự không tồn tại trong ngày!");
              reject(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    dongQuay: ({ quayHienTai, quayMoi = "" }, state) => {
      return new Promise((resolve, reject) => {
        const id = state.tiepDon.nbLaySo?.id; //lấy id người bệnh lấy số hiện tại đang tiếp đón, để next bệnh nhân
        if (quayHienTai)
          goiSoProvider
            .dongQuay(quayHienTai)
            .then((s) => {
              dispatch.goiSo.setQuayTiepDon(quayMoi);
              if (quayMoi) {
                dispatch.goiSo.getNbTiepTheo({
                  id: quayMoi,
                  data: { nbTiepTheoId: id }, //khi đổi quầy thì bỏ qua nb đang tiếp đón
                });
              }
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message);
              reject(e);
            });
        else {
          dispatch.goiSo.setQuayTiepDon(quayMoi);
          if (quayMoi) {
            dispatch.goiSo.getNbTiepTheo({
              id: quayMoi,
              data: { nbTiepTheoId: id }, //khi đổi quầy thì bỏ qua nb đang tiếp đón
            });
          }
          resolve(true);
        }
      });
    },
    getListGoiNho: (payload) => {
      return new Promise((resolve, reject) => {
        goiSoProvider
          .getListGoiNho(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListDaTiepDon: (payload) => {
      return new Promise((resolve, reject) => {
        goiSoProvider
          .getListDaTiepDon(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListSlTheoPhong: (payload) => {
      return new Promise((resolve, reject) => {
        goiSoProvider
          .getListSlTheoPhong(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getNbTiepTheo: (payload = {}, state) => {
      const { id } = payload;
      if (!id) {
        return;
      }
      if (payload.isLoadNguoiBenhTiepDon) {
        if (state?.goiSo?.nbTiepTheo?.stt) {
          dispatch.tiepDon.loadNguoiBenh(state?.goiSo?.nbTiepTheo, true);
        } else {
          dispatch.tiepDon.resetData({});
        }
      }
      return new Promise((resolve, reject) => {
        goiSoProvider
          .getNbTiepTheo(payload)
          .then((s) => {
            dispatch.goiSo.updateData({
              nbTiepTheo: s?.data?.nbTiepTheo || null, // mặc định dữ liệu bằng null nếu undefined để tránh useeffect check 2 lần
            });
            if (!payload.isGet && payload.goiNho) {
              dispatch.tiepDon.loadNguoiBenh(s?.data?.nbDangTiepDon, true);
            }
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            dispatch.goiSo.updateData({ nbTiepTheo: null });
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    huyTiepDon: (quayTiepDonId) => {
      return new Promise((resolve, reject) => {
        goiSoProvider
          .huyTiepDon(quayTiepDonId)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getInfoFromQr: ({ qrText, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            data: { code, data },
          } = await goiSoProvider.getInfoFromQr({ qrText });
          if (code == 0) {
            const ngheNghiep = state.ngheNghiep.listAllNgheNghiep?.find(
              (item) => item.ma == data?.ngheNghiep?.ma
            );
            const quocTich = state.ttHanhChinh.listAllQuocGia?.find(
              (item) => item?.ma == data?.quocTich?.ma
            );
            const tinh = state.ttHanhChinh.listAllTinh?.find(
              (item) => item?.ma == data?.tinhThanhPho?.ma
            );
            const quanHuyen = state.ttHanhChinh.listAllQuanHuyen?.find(
              (item) => item?.ma == data?.quanHuyen?.ma
            );
            const xaPhuong = state.ttHanhChinh.listAllXaPhuong?.find(
              (item) => item?.ma == data?.xaPhuong?.ma
            );
            let newData = {
              ...data,
              ngheNghiepId: ngheNghiep?.id,
              ngheNghiep,
              quocTichId: quocTich?.id,
              quocTich,
              // id: data?.id,
              id: null,
              tenNb: data?.hoVaTen,
              gioiTinh: data?.gioiTinh,
              ngaySinh: data.ngaySinh && {
                str: data?.chiNamSinh
                  ? moment(data.ngaySinh).format("YYYY")
                  : moment(data.ngaySinh).format("DD/MM/YYYY"),
                date: moment(data.ngaySinh).format("YYYY-MM-DDTHH:mm:ssZ"),
              },
              ngheNghiepId: ngheNghiep?.id,
              ngheNghiep,
              thangTuoi: Math.ceil(
                moment
                  .duration(moment().diff(moment(data?.ngaySinh)))
                  .asMonths()
              ),
              tuoi: Math.ceil(
                moment.duration(moment().diff(moment(data?.ngaySinh))).asYears()
              ),
              soDienThoai: data.soDienThoai,
              nbNguoiBaoLanh: {
                ...data?.nguoiBaoHo,
                soDienThoai: data?.sdtNguoiBaoHo,
              },
              nbGiayToTuyThan: { loaiGiayTo: 2 },
              nbDiaChi: {
                soNha: data?.soNha,
                xaPhuong: { ...xaPhuong },
                xaPhuongId: xaPhuong?.id,
                quanHuyen: { ...quanHuyen },
                quanHuyenId: quanHuyen?.id,
                tinhThanhPho: { ...tinh },
                tinhThanhPhoId: tinh?.id,
                quocGia: { ...quocTich },
                quocGiaId: quocTich?.id,
                diaChi: `${data?.soNha}, ${data?.quanHuyen?.ten}, ${data?.tinhThanhPho?.ten}, ${quocTich?.ten}`,
              },
            };
            dispatch.tiepDon.updateData({ ...newData });
            resolve(data);
          } else reject(data);
        } catch (e) {
          reject(e);
        }
      });
    },
  }),
};
