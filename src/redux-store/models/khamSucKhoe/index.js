import { cloneDeep } from "lodash";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";
import { message } from "antd";
import { combineSort } from "utils";
import apiBase from "../../../data-access/api-base";
import dmHopDongKskTrangThaiTTProvider from "data-access/dm-hd-ksk-trang-thai-tt-provider";
import { t } from "i18next";

const initData = {
  //list phieu
  listData: [],

  //phieu
  ttPhieu: {
    ten: "",
    doiTacId: null,
  },
  validTTPhieu: {
    ten: true,
    doiTacId: true,
  },
  chiTietPhieu: {},
  isEditPhieu: false,

  //search
  totalElements: 0,
  page: 0,
  dataSearch: {},
  dataSortColumn: {
    thoiGianTao: "desc",
  },

  isLoading: false,

  //tab list
  listDVChiTiet: [],
  listDVLe: [],
  listDVKSK: [],
  listGoiDVKSK: [],
  listChooseDV: [],
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
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: dmHopDongKskProvider.searchAll,
      KEY_CACHE: "DATA_ALL_PHIEU_BAO_GIA",
      model: "khamSucKhoe",
      fieldName: "PhieuBaoGia",
    }),
    //phieu bao gia
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.khamSucKhoe.updateData({
        page: 0,
        ...rest,
      });
      dispatch.khamSucKhoe.onSearch({ ...rest });
    },

    searchPhieuBaoGiaByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.khamSucKhoe.dataSearch,
          ...payload,
        },
      };

      dispatch.khamSucKhoe.updateData({
        page: 0,
        ...obj,
      });
      dispatch.khamSucKhoe.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.khamSucKhoe.dataSortColumn,
        ...payload,
      };
      dispatch.khamSucKhoe.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.khamSucKhoe.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.khamSucKhoe.updateData(newState);
      let size = payload.size || state.khamSucKhoe.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.khamSucKhoe.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.khamSucKhoe.dataSearch || {};

      dmHopDongKskProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.khamSucKhoe.updateData({
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
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.khamSucKhoe.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    postPhieuBaoGia: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .post(rest)
          .then((s) => {
            message.success(t("khamSucKhoe.themMoiThanhCongPhieu"));
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    saoChepPhieu: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .saoChepPhieu(rest)
          .then((s) => {
            message.success(t("khamSucKhoe.saoChepThanhCongPhieu"));
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    baoGiaThanhCong: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .postBaoGiaThanhCong({ ...rest })
          .then((s) => {
            message.success(t("khamSucKhoe.baoGiaThanhCong"));
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    baoGiaThatBai: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .postBaoGiaThatBai({ ...rest })
          .then((s) => {
            message.success(t("khamSucKhoe.baoGiaThatBai"));
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    getPhieuBaoGia: (id) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .getById(id)
          .then((s) => {
            dispatch.khamSucKhoe.updateData({ chiTietPhieu: s.data });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    deletePhieuBaoGia: (id) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .delete(id)
          .then((s) => {
            message.success(t("khamSucKhoe.xoaThanhCongPhieu"));
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    updatePhieuBaoGia: ({ id, ...payload }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .patch({ id, ...payload })
          .then((s) => {
            message.success(t("khamSucKhoe.capNhatThanhCongPhieu"));
            dispatch.khamSucKhoe.getPhieuBaoGia(id);
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    getTrangThaiTT: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskTrangThaiTTProvider.get(payload).then((s) => {
          let listTrangThaiTT = cloneDeep(state.khamSucKhoe.listTrangThaiTT);

          if (s.data != null) {
            const index = listTrangThaiTT.findIndex(
              (x) => x.loaiDichVu === s.data.loaiDichVu
            );

            if (index !== -1) {
              listTrangThaiTT[index] = { ...listTrangThaiTT[index], ...s.data };
              dispatch.khamSucKhoe.updateData({
                listTrangThaiTT,
              });
            }
          }
          resolve(s.data);
        });
      });
    },

    //validate
    validateTTPhieu: (payload, state) => {
      return new Promise((resolve, reject) => {
        let _validTTPhieu = {
          ten: true,
          doiTacId: true,
        };

        if (state.khamSucKhoe.ttPhieu.ten == "") {
          _validTTPhieu = {
            ..._validTTPhieu,
            ten: false,
          };
        }

        // if (state.khamSucKhoe.ttPhieu.doiTacId == null) {
        //   _validTTPhieu = {
        //     ..._validTTPhieu,
        //     doiTacId: false,
        //   };
        // }

        dispatch.khamSucKhoe.updateData({
          validTTPhieu: _validTTPhieu,
        });

        const areTrue = Object.values(_validTTPhieu).every(
          (value) => value === true
        );

        if (areTrue) resolve();
        else reject();
      });
    },
  }),
};
