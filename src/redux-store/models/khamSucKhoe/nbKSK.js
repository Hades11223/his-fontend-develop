import { cloneDeep, sortBy } from "lodash";
import { message } from "antd";
import { combineSort } from "utils";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import dmKhoaProvider from "data-access/categories/dm-khoa-provider";

const initData = {
  //list nguoi benh
  listData: [],
  //search
  totalElements: 0,
  page: 0,
  dataSearch: {},

  isLoading: false,

  dsNbLichKham: [],
  dsKhoaNb: [],

  thongTinNb: {},
};

export default {
  state: cloneDeep(initData),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initData), ...payload };
    },
  },
  effects: (dispatch) => ({
    //phieu bao gia
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.nbKSK.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.nbKSK.onSearch({ ...rest });
    },

    searchNBKSKByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...payload,
        },
      };

      dispatch.nbKSK.updateData({
        page: 0,
        ...obj,
      });
      dispatch.nbKSK.onSearch({ ...obj });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbKSK.updateData(newState);
      let size = payload.size || state.nbKSK.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbKSK.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nbKSK.dataSearch || {};

      nbDotDieuTriProvider
        .getListNbKSK({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nbKSK.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbKSK.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    postNBKSK: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .postNbKSK(rest)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Thêm mới người bệnh khám sức khỏe thành công");
              resolve(s.data);
            } else {
              message.error(s?.message);
              reject();
            }
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    patchNbKSK: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .patchNbKSK({ id, ...rest })
          .then((s) => {
            if (s?.code == 0) {
              message.success("Cập nhật người bệnh khám sức khỏe thành công");
              resolve(s.data);
            } else {
              message.error(s?.message);
              reject();
            }
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    getNBKSK: (id) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getById(id)
          .then((s) => {
            dispatch.nbKSK.updateData({
              thongTinNb: s?.data || {},
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    onSelectAddress: (data, state) => {
      return new Promise((resolve, reject) => {
        const nbDiaChi = {};
        let address = {};

        if (data?.tinhThanhPho && data?.quanHuyen) {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.tinhThanhPho?.id,
            quanHuyenId: data?.quanHuyen?.id,
            xaPhuongId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
          };
        } else if (data?.tinhThanhPho) {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.tinhThanhPho?.id,
            quanHuyenId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
          };
        } else {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.quocGia?.id || nbDiaChi?.quocGiaId,
          };
        }

        resolve(address);
      });
    },

    tiepDonNBKSK: (idNBs) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .postTiepNhanNbKSK(idNBs)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Tiếp đón người bệnh khám sức khỏe thành công");
              resolve(s.data);
            } else {
              message.error(s?.message);
              reject();
            }
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    getNbLichKhamKSK: (params) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getNbLichKhamKSK(params)
          .then((s) => {
            dispatch.nbKSK.updateData({
              dsNbLichKham: sortBy(s?.data || [], ["stt"], "asc"),
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getKhoaImport: (params) => {
      return new Promise((resolve, reject) => {
        dmKhoaProvider
          .searchAll(params)
          .then((s) => {
            dispatch.nbKSK.updateData({
              dsKhoaNb: s?.data || [],
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    postLichKhamKSK: (idNBs) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .postLichKhamKSK(idNBs)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Tiếp đón người bệnh khám sức khỏe thành công");
              resolve(s.data);
            } else {
              message.error(s?.message);
              reject();
            }
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    postImport: (payload, state) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        payload?.hopDongKskId &&
          formData.append("hopDongKskId", payload.hopDongKskId);
        payload?.khoaId && formData.append("khoaId", payload.khoaId);
        payload?.dong && formData.append("dong", payload.dong);
        payload.sheet && formData.append("sheet", payload.sheet);
        payload?.file && formData.append("file", payload.file[0]);

        nbDotDieuTriProvider
          .postImport(formData)
          .then((s) => {
            const blob = new Blob([new Uint8Array(s)], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `${payload?.file?.[0]?.name}`);
            document.body.appendChild(link);
            link.click();

            resolve(s);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },
  }),
};
