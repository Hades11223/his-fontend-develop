import cacheUtils from "utils/cache-utils";
import xaPhuongProvider from "data-access/categories/dm-xa-phuong-provider";
import orderBy from "lodash/orderBy";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllData: async (payload, state) => {
      let dataCache = await cacheUtils.read("DATA_DIA_CHI", "", {}, false);
      dispatch.address.updateData(dataCache?.data || {});
      const syncTime = localStorage.getItem("TIME_RELOAD");
      if (
        !Number.isInteger(dataCache?.date) ||
        new Date().getTime() - dataCache.date > 600000 ||
        syncTime - dataCache.date > 0
      ) {
        xaPhuongProvider.searchAll({ page: null, size: null }).then((s) => {
          let _listTinhTp = {};
          let _listQuanHuyen = {};
          let listXaPhuong = [];
          // let _listQuocGia = {};
          (s.data || []).forEach((item) => {
            if (!_listTinhTp[item.tinhThanhPho?.id]) {
              item.tinhThanhPho.quocGia = item.quocGia;
              _listTinhTp[item.tinhThanhPho?.id] = item.tinhThanhPho;
            }
            if (!_listQuanHuyen[item.quanHuyen?.id]) {
              item.quanHuyen.tinhThanhPho = item.tinhThanhPho;
              if (item.quanHuyen.tinhThanhPho) {
                item.quanHuyen.tinhThanhPho.quocGia = item.quocGia;
              }
              item.quanHuyen.tinhThanhPhoId = item.tinhThanhPho?.id;
              _listQuanHuyen[item.quanHuyen?.id] = item.quanHuyen;
            }
            // if (!_listQuocGia[item.quocGia?.id]) {
            //   _listQuocGia[item.quocGia?.id] = item.quocGia;
            // }
            if (item.tinhThanhPho) {
              item.tinhThanhPho.quocGia = item.quocGia;
            }
            delete item.quocGia;
            listXaPhuong.push(item);
          });
          listXaPhuong = orderBy(listXaPhuong, "ten", "asc");
          // let listQuocGia = orderBy(
          //   Object.keys(_listQuocGia).map((key) => {
          //     return _listQuocGia[key];
          //   }),
          //   "ten",
          //   "asc"
          // );
          let listTinhTp = orderBy(
            Object.keys(_listTinhTp).map((key) => {
              return _listTinhTp[key];
            }),
            "ten",
            "asc"
          );
          let listQuanHuyen = orderBy(
            Object.keys(_listQuanHuyen).map((key) => {
              return _listQuanHuyen[key];
            }),
            "ten",
            "asc"
          );
          cacheUtils.save(
            "DATA_DIA_CHI",
            "",
            {
              data: {
                listXaPhuong,
                // listQuocGia,
                listTinhTp,
                listQuanHuyen,
              },
              date: new Date().getTime(),
            },
            false
          );
          dispatch.address.updateData({
            listXaPhuong,
            // listQuocGia,
            listTinhTp,
            listQuanHuyen,
          });
        });
      }
    },
  }),
};
