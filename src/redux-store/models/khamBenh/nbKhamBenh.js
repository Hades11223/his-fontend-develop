import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import { combineSort } from "utils";
import { message } from "antd";
import { PAGE_SIZE } from "constants/index";
import { cloneDeep } from "lodash";
import { t } from "i18next";

const initState = {
  phongThucHienId: null,
  dataSearch: {},
  dataSortColumn: {},
  listData: [],
  size: PAGE_SIZE,
};
export default {
  state: cloneDeep(initState),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initState), ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, timKiem = "", ...rest }, state, nextPage) => {
      dispatch.nbKhamBenh.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });

      if (timKiem) {
        rest.timKiem = timKiem;
        return dispatch.nbKhamBenh.onSearch(rest, nextPage);
      } else {
        return dispatch.nbKhamBenh.onSearch(rest, nextPage);
      }
    },
    onSearch: (
      {
        page = 0,
        isSingleSearch = false,
        isGetListData = false,
        chuyenTrangThai,
        ...payload
      },
      state,
      nextPage
    ) => {
      return new Promise((resolve, reject) => {
        const {
          dataSortColumn,
          dataSearch,
          timKiem,
          dsPhongThucHienId,
          ...rest
        } = payload;
        const size = rest.size || state.nbKhamBenh.size;
        const phongThucHienId =
          rest.phongThucHienId || state.nbKhamBenh.phongThucHienId;
        const sort = combineSort(
          dataSortColumn || state.nbKhamBenh.dataSortColumn || {}
        );
        const search = dataSearch || state.nbKhamBenh.dataSearch || {};

        dispatch.nbKhamBenh.updateData({
          phongThucHienId,
        });

        let obj = {
          page,
          size,
          sort,
          dsPhongThucHienId: dsPhongThucHienId || phongThucHienId, //thay thế trường phongThucHienId -> dsPhongThucHienId để request api search
          ...search,
          ...rest,
        };
        if (timKiem) {
          obj.timKiem = timKiem;
        }
        nbDvKhamProvider
          .getDanhSachBN(obj)
          .then((s) => {
            let data = s?.data || [];
            if (isGetListData) {
              // khi load lại url , chỉ lấy giá trị hiện tại, nhưng mất danh sách bệnh nhân , điều kiện này giúp kéo lại danh sách bệnh nhân
              let restCopy = { ...rest };
              delete restCopy.maHoSo;
              nbDvKhamProvider
                .getDanhSachBN({
                  page,
                  size,
                  sort,
                  dsPhongThucHienId: phongThucHienId, //thay thế trường phongThucHienId -> dsPhongThucHienId để request api search
                  ...search,
                  ...restCopy,
                })
                .then((res) => {
                  dispatch.nbKhamBenh.updateData({
                    listData: res?.data.map((item, index) => {
                      item.index = page * size + index + 1;
                      return item;
                    }),
                    totalElements: res?.totalElements || 0,
                    page,
                    size,
                  });
                });
            }
            if (isSingleSearch) {
              if (data[0]) {
                dispatch.khamBenh.onLoadNb({
                  dichVuId: data[0].id,
                  infoNb: data[0] || {},
                  chuyenTrangThai,
                });
              } else {
                //không tìm thấy người bệnh nào
                reject({ code: -1 });
              }
              resolve(data);
            } else {
              dispatch.nbKhamBenh.updateData({
                listData: data.map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                totalElements: s?.totalElements || 0,
                page,
                size,
              });
              if (!nextPage) {
                const infoNb = data.length && data[0];
                if (infoNb)
                  dispatch.khamBenh.updateData({
                    infoNb,
                  });
              }
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.nbKhamBenh.updateData({
              listData: [],
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state, nextPage) => {
      const dataSortColumn = {
        ...state.nbKhamBenh.dataSortColumn,
        ...payload,
      };
      dispatch.nbKhamBenh.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbKhamBenh.onSearch(
        {
          page: 0,
          dataSortColumn,
        },
        nextPage
      );
    },
    onChangeInputSearch: ({ ...payload }, state, nextPage) => {
      const { phongLayMauId } = state.nbKhamBenh;
      const dataSearch = {
        ...(state.nbKhamBenh.dataSearch || {}),
        phongLayMauId,
        ...payload,
      };
      dispatch.nbKhamBenh.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nbKhamBenh.onSearch(
        {
          page: 0,
          dataSearch,
        },
        nextPage
      );
    },
    themThongTin: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .themThongTin(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("common.capNhatThanhCong"));
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message);
          });
      });
    },
  }),
};
