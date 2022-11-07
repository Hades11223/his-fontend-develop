import nbDvKhoProvider from "data-access/kho/nb-dv-kho-provider";

export default {
  state: {
    dsNbDvKho: [],
    nbTonTaiVatTu: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getNbDvKho: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvKhoProvider
          .getNbDvKho(payload)
          .then((res) => {
            dispatch.nbDvKho.updateData({
              dsNbDvKho: res.data,
            });
            resolve(res);
          })
          .catch((e) => reject(e));
      });
    },

    getDsTraKho: (payload) => {
      nbDvKhoProvider
        .getDsTraKho(payload)
        .then((res) => {
          dispatch.nbDvKho.updateData({
            dsNbDvKho: res.data,
          });
        })
        .catch();
    },
    getNbTonTaiTraKho: (payload) => {
      nbDvKhoProvider
        .getNbTonTaiTraKho(payload)
        .then((res) => {
          dispatch.nbDvKho.updateData({
            nbTonTaiVatTu: res.data,
          });
        })
        .catch();
    },
  }),
};
