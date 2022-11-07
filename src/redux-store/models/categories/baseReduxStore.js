// NOTE: baseStore v2
//  development based on baseStore file: refactor, resolve confusion baseStore v1

import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE, SIZE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
import { combineSort } from "utils";
import i18n from "i18n";

export default ({
  customState = {}, //
  customEffect = () => ({}),
  //   title = "",

  // BẮT BUỘC
  fetchProvider, // phải là provider kết hợp từ apiBase.init({})
  storeName, // name store extracted from src\redux-store\models\index.js
}) => {
  const handleFormatPayload = ({
    state,
    key,
    value,
    initValue,
    format = (data) => data,
  }) => {
    return format(value ?? state[key] ?? initValue);
  };

  const handleMessageResponse = () => {};

  const initState = {
    listData: [],
    listDataTongHop: [],

    totalRecord: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,

    dataSearch: {}, // chứa các param khi search api
    dataParams: {},
    dataSort: {},
    ["listAll" + storeName.upperFirst()]: [],

    filterRecord: {},
    currentItem: {},

    // _dataEdit: {},
    // _dataFilter: {}, // 1 bản ghi thỏa mãn điều kiện lọc
    // dataEditDefault: {},

    ...customState,
  };

  return {
    state: {
      ...initState,
    },
    reducers: {
      updateStore(state, payload = {}) {
        return { ...state, ...payload };
      },
    },
    effects: (dispatch) => ({
      getRecord: (payload, state) => {
        return new Promise((resolve, reject) => {
          let objParams = {};
          let params = {};

          if (payload) {
            const { page, size, dataSort, dataParams, ...restPayload } =
              payload;

            params = { ...state.dataParams, ...dataParams };

            // console.log("dataSort", dataSort);

            objParams = { ...restPayload, ...params };
            // const objParams = {};

            [
              { key: "page", value: page, initValue: PAGE_DEFAULT },
              { key: "size", value: size, initValue: PAGE_SIZE },
              {
                key: "sort",
                value: dataSort,
                initValue: {},
                format: combineSort,
              },
            ].forEach(
              (item) =>
                (objParams[item.key] = handleFormatPayload({
                  state: state[storeName],
                  key: item.key,
                  value: item.value,
                  initValue: item.initValue,
                  format: item.format,
                }))
            );
          }

          fetchProvider
            .search(objParams)
            .then((res) => {
              dispatch[storeName].updateStore({
                listData: res.data,
                // : (res.data || []).map((item, idx) => {
                //   item.index = page * size + idx + 1;
                //   return item;
                // }),
                dataParams: params,
                totalRecord: res.totalElements || 0,
                ...objParams,
              });
              resolve(res);
            })
            .catch((err) => {
              message.error(
                err.message || i18n.t("common.xayRaLoiVuiLongThuLaiSau")
              );
              dispatch[storeName].updateStore({
                listData: [],
                totalRecord: null,
              });
              reject(err);
            });
        });
      },

      getTongHopRecord: async (payload, state) => {
        try {
          const response = await fetchProvider.searchTongHop(payload);
          let {
            data: listDataTongHop,
            totalElements: totalRecord,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch[storeName]._getList({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch[storeName].updateStore({
            listDataTongHop,
            totalRecord,
            page,
            size,
            dataSearch: payload,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },

      postRecord: ({ stateIgnoreMessage, ...payload }, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .post(payload || {})
            .then((res) => {
              if (res.code === 0) {
                stateIgnoreMessage &&
                  message.success(`Thêm mới dữ liệu thành công!`);
              } else {
                stateIgnoreMessage && message.error(res.message);
              }
              resolve(res);
            })
            .catch((err) => {
              stateIgnoreMessage &&
                message.error(
                  err.message || i18n.t("common.xayRaLoiVuiLongThuLaiSau")
                );
              reject(err);
            });
        });
      },

      putRecord: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .put({
              ...payload,
              id: payload?.id,
            })
            .then((res) => {
              if (res.code === 0) {
                dispatch[storeName].updateStore({
                  dataEditDefault: res.data,
                });
                message.success(`Cập nhật thành công dữ liệu!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              message.error(e.message);
              reject(e);
            });
        });
      },

      patchRecord: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .patch({
              ...payload,
              id: payload?.id,
            })
            .then((res) => {
              if (res.code === 0) {
                dispatch[storeName].updateStore({
                  dataEditDefault: res.data,
                });
                message.success(`Cập nhật thành công dữ liệu!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              message.error(e.message);
              reject(e);
            });
        });
      },

      deleteRecord: async (payload, state) => {
        const { page, size, dataParams } = state[storeName];
        return new Promise((resolve, reject) => {
          fetchProvider
            .delete(payload)
            .then((res) => {
              message.success("Xóa bản ghi thành công");
              dispatch[storeName].getRecord({ page, size, ...dataParams });
              resolve(res);
            })
            .catch((res) => {
              message.error(res.message);
              reject(res);
            });
        });
      },

      getRecordById: (id, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .getById(id)
            .then((res) => {
              if (res && res.code === 0) {
                const {
                  data: filterRecord,
                  totalElements: totalRecord,
                  pageNumber: page,
                  pageSize: size,
                } = res;

                dispatch[storeName].updateStore({
                  filterRecord,
                  totalRecord,
                  page,
                  size,
                });
                resolve(filterRecord);
              }
            })
            .catch((err) => {
              message.error(err.message.toString());
              reject(err);
            });
        });
      },

      putOrPostRecord: (payload = {}, state) => {
        if (payload?.id) {
          dispatch[storeName].putRecord(payload);
        } else {
          dispatch[storeName].postRecord(payload);
        }
      },

      patchOrPostRecord: (payload = {}, state) => {
        if (payload?.id) {
          dispatch[storeName].patchRecord(payload);
        } else {
          dispatch[storeName].postRecord(payload);
        }
      },

      onSearchInput: ({ ...payload }, state) => {
        const dataParams = {
          ...(state[storeName].dataParams || {}),
          ...payload,
        };
        dispatch[storeName].updateStore({
          page: 0,
          dataParams,
        });
        dispatch[storeName].getRecord({
          page: 0,
          ...dataParams,
        });
      },

      onSortColumn: ({ ...payload }, state) => {
        const dataSort = {
          ...state[storeName].dataSort,
          ...payload,
        };
        dispatch[storeName].updateStore({
          page: 0,
          dataSort,
        });
        dispatch[storeName].getRecord({
          page: 0,
          dataSort,
        });
      },

      ...apiBase.initReduxGetListAll({
        dispatch,
        api: fetchProvider.searchAll,
        KEY_CACHE: "DATA_ALL_" + storeName,
        model: storeName,
        fieldName: storeName.upperFirst(),
      }),
      ...customEffect({ dispatch }),

      // createOrUpdate: (payload = {}, state) => {
      //   return new Promise((resolve, reject) => {
      //     if (state[storeName]?._dataEdit?.id || payload?.id) {
      //       fetchProvider
      //         .put({
      //           ...payload,
      //           id: state[storeName]?._dataEdit?.id || payload?.id,
      //         })
      //         .then((res) => {
      //           if (res.code === 0) {
      //             dispatch[storeName].updateStore({
      //               dataEditDefault: res.data,
      //             });
      //             message.success(`Cập nhật thành công dữ liệu!`);
      //           } else {
      //             message.error(res.message);
      //           }
      //           resolve(res);
      //         })
      //         .catch((e) => {
      //           message.error(e.message);
      //           reject(e);
      //         });
      //     } else {
      //     }
      //   });
      // },

      //   // lấy 1 bản ghi thỏa mãn điều kiện lọc
      //   _filter: (payload = {}, state) => {
      //     return new Promise((resolve, reject) => {
      //       fetchProvider
      //         .filter(payload)
      //         .then((res) => {
      //           if (res && res.code === 0) {
      //             const {
      //               data: _dataFilter,
      //               totalElements: _totalElements,
      //               pageNumber: _page,
      //               pageSize: _size,
      //             } = res;

      //             dispatch[storeName].updateStore({
      //               _dataFilter,
      //               _totalElements,
      //               _page,
      //               _size,
      //             });
      //             resolve(_dataFilter);
      //           }
      //         })
      //         .catch((err) => {
      //           message.error(err.message.toString());
      //           reject(err);
      //         });
      //     });
      //   },
      //   // lấy danh sách
      //   _getList: async ({ isSave, ...payload } = {}, state) => {
      //     if (isSave) {
      //       dispatch[storeName].updateStore({
      //         _dataSearch: { ...state[storeName]._dataSearch, ...payload },
      //       });
      //     }
      //     return new Promise((resolve, reject) => {
      //       fetchProvider
      //         .search(payload)
      //         .then((res) => {
      //           const {
      //             data: _listData,
      //             totalElements: _totalElements,
      //             message: _message,
      //             pageNumber: _page,
      //             pageSize: _size,
      //             numberOfElements,
      //           } = res;

      //           if (res.code === 0) {
      //             dispatch[storeName].updateStore({
      //               _listData,
      //               _totalElements,
      //               _page,
      //               _size,
      //               _dataSearch: payload,
      //             });
      //           } else {
      //             message.error(_message);
      //           }

      //           resolve(res);
      //         })
      //         .catch((err) => {
      //           message.error(err?.message?.toString());
      //           reject(err);
      //         });
      //     });
      //   },
      //   // lấy danh sách tổng hợp
      //   _getListTongHop: async (payload = {}, state) => {
      //     try {
      //       const response = await fetchProvider.searchTongHop(payload);
      //       let {
      //         data: _listDataTongHop,
      //         totalElements: _totalElements,
      //         pageNumber: _page,
      //         pageSize: _size,
      //         numberOfElements,
      //       } = response;

      //       if (_page > 0 && numberOfElements === 0) {
      //         return dispatch[storeName]._getList({
      //           ...payload,
      //           page: _page - 1,
      //           _size,
      //         });
      //       }

      //       return dispatch[storeName].updateStore({
      //         _listDataTongHop,
      //         _totalElements,
      //         _page,
      //         _size,
      //         _dataSearch: payload,
      //       });
      //     } catch (err) {
      //       message.error(err.message.toString());
      //       return Promise.reject();
      //     }
      //   },
      //   // lấy bản ghi theo id

      //   _createOrEdit: (payload = {}, state) => {
      //     return new Promise((resolve, reject) => {
      //       if (state[storeName]?._dataEdit?.id || payload?.id) {
      //         fetchProvider
      //           .put({
      //             ...payload,
      //             id: state[storeName]?._dataEdit?.id || payload?.id,
      //           })
      //           .then((res) => {
      //             if (res.code === 0) {
      //               dispatch[storeName].updateStore({
      //                 dataEditDefault: res.data,
      //               });
      //               message.success(`Cập nhật thành công dữ liệu!`);
      //             } else {
      //               message.error(res.message);
      //             }
      //             resolve(res);
      //           })
      //           .catch((e) => {
      //             message.error(e.message);
      //             reject(e);
      //           });
      //       } else {
      //         fetchProvider
      //           .post(payload)
      //           .then((res) => {
      //             if (res.code === 0) {
      //               message.success(`Thêm mới thành công dữ liệu!`);
      //             } else {
      //               message.error(res.message);
      //             }
      //             resolve(res);
      //           })
      //           .catch((e) => {
      //             message.error(e.message);
      //             reject(e);
      //           });
      //       }
      //     });
      //   },
    }),
  };
};
