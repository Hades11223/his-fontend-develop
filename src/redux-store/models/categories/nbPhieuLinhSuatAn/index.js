import { message } from "antd";
import nbPhieuLinhSuatProvider from "data-access/nb-phieu-linh-suat-an";

export default {
  state: {
    totalElements: null,
    listData: [],
    param: {},
    isLoading: false,
    searchValue: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    search: ({ ...payload }, { nbPhieuLinhSuatAn: { param } }) => {
      const newParam = { ...param, ...payload };
      dispatch.nbPhieuLinhSuatAn.updateData({
        param: newParam,
      });

      nbPhieuLinhSuatProvider
        .search(newParam)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: s?.data,
            isLoading: false,
            totalElements: s?.totalElements,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    detail: (id) => {
      nbPhieuLinhSuatProvider
        .detail(id)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            dataDetail: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    post: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuLinhSuatProvider
          .post(payload)
          .then(resolve)
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e?.message);
          });
      });
    },
    chiTiet: ({ ...payload }, { nbPhieuLinhSuatAn: { paramChiTiet } }) => {
      const newParam = { ...paramChiTiet, ...payload };
      dispatch.nbPhieuLinhSuatAn.updateData({
        paramChiTiet: newParam,
      });

      nbPhieuLinhSuatProvider
        .chiTiet(newParam)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            listDataChiTiet: s?.data,
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    phat: ({ ...payload }, { nbPhieuLinhSuatAn: { dataDetail } }) => {
      dispatch.nbPhieuLinhSuatAn.updateData({
        isLoading: true,
      });
      nbPhieuLinhSuatProvider
        .phat(dataDetail.id)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            isLoading: false,
          });
          message.success("Phát thành công");
          dispatch.nbPhieuLinhSuatAn.detail(dataDetail.id);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    huyPhat: ({ ...payload }, { nbPhieuLinhSuatAn: { dataDetail } }) => {
      dispatch.nbPhieuLinhSuatAn.updateData({
        isLoading: true,
      });
      nbPhieuLinhSuatProvider
        .huyPhat(dataDetail.id)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            isLoading: false,
          });
          message.success("Hủy phát thành công");
          dispatch.nbPhieuLinhSuatAn.detail(dataDetail.id);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    duyet: ({ ...payload }, { nbPhieuLinhSuatAn: { dataDetail } }) => {
      dispatch.nbPhieuLinhSuatAn.updateData({
        isLoading: true,
      });
      nbPhieuLinhSuatProvider
        .duyet(dataDetail.id)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            isLoading: false,
          });
          message.success("Duyệt trả thành công");
          dispatch.nbPhieuLinhSuatAn.detail(dataDetail.id);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    huyDuyet: ({ ...payload }, { nbPhieuLinhSuatAn: { dataDetail } }) => {
      dispatch.nbPhieuLinhSuatAn.updateData({
        isLoading: true,
      });
      nbPhieuLinhSuatProvider
        .huyDuyet(dataDetail.id)
        .then((s) => {
          dispatch.nbPhieuLinhSuatAn.updateData({
            isLoading: false,
          });
          message.success("Hủy duyệt trả thành công");
          dispatch.nbPhieuLinhSuatAn.detail(dataDetail.id);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbPhieuLinhSuatAn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    xoaPhieu: (payload, { nbPhieuLinhSuatAn: { dataDetail } }) => {
      dispatch.nbPhieuLinhSuatAn.updateData({
        isLoading: true,
      });
      return new Promise((resolve, reject) => {
        nbPhieuLinhSuatProvider
          .xoaPhieu(dataDetail.id)
          .then((s) => {
            dispatch.nbPhieuLinhSuatAn.updateData({
              isLoading: false,
            });
            if (s && s.code === 0) {
              resolve(s.data);
            } else {
              message.error(s?.message);
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nbPhieuLinhSuatAn.updateData({
              isLoading: false,
            });
            reject();
          });
      });
    },
  }),
};
