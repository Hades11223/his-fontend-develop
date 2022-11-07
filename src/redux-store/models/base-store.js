import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE, SIZE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";

export default ({
  initState = {},
  customEffect = () => ({}),
  title = "",

  // BẮT BUỘC
  fetchProvider, // phải là provider kết hợp từ apiBase.init({})
  storeName, // tên store
}) => ({
  state: {
    _listData: [],
    _listDataTongHop: [],

    _totalElements: null,
    _page: PAGE_DEFAULT,
    _size: PAGE_SIZE,
    _dataEdit: {},
    _dataFilter: {}, // 1 bản ghi thỏa mãn điều kiện lọc
    _dataSearch: {}, // chứa các param khi search api
    ["listAll" + storeName.upperFirst()]: [],

    totalElements: null,
    page: PAGE_DEFAULT,
    size: SIZE_DEFAULT,
    dataEditDefault: {},
    dataSearch: {},

    ...initState,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // lấy 1 bản ghi thỏa mãn điều kiện lọc
    _filter: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          .filter(payload)
          .then((res) => {
            if (res && res.code === 0) {
              const {
                data: _dataFilter,
                totalElements: _totalElements,
                pageNumber: _page,
                pageSize: _size,
              } = res;

              dispatch[storeName].updateData({
                _dataFilter,
                _totalElements,
                _page,
                _size,
              });
              resolve(_dataFilter);
            }
          })
          .catch((err) => {
            message.error(err.message.toString());
            reject(err);
          });
      });
    },
    // lấy danh sách
    _getList: async ({ isSave, ...payload } = {}, state) => {
      if (isSave) {
        dispatch[storeName].updateData({
          _dataSearch: { ...state[storeName]._dataSearch, ...payload },
        });
      }
      return new Promise((resolve, reject) => {
        fetchProvider
          .search(payload)
          .then((res) => {
            const {
              data: _listData,
              totalElements: _totalElements,
              message: _message,
              pageNumber: _page,
              pageSize: _size,
              numberOfElements,
            } = res;

            if (res.code === 0) {
              dispatch[storeName].updateData({
                _listData,
                _totalElements,
                _page,
                _size,
                _dataSearch: payload,
              });
            } else {
              message.error(_message);
            }

            resolve(res);
          })
          .catch((err) => {
            message.error(err?.message?.toString());
            reject(err);
          });
      });
    },
    // lấy danh sách tổng hợp
    _getListTongHop: async (payload = {}, state) => {
      try {
        const response = await fetchProvider.searchTongHop(payload);
        let {
          data: _listDataTongHop,
          totalElements: _totalElements,
          pageNumber: _page,
          pageSize: _size,
          numberOfElements,
        } = response;

        if (_page > 0 && numberOfElements === 0) {
          return dispatch[storeName]._getList({
            ...payload,
            page: _page - 1,
            _size,
          });
        }

        return dispatch[storeName].updateData({
          _listDataTongHop,
          _totalElements,
          _page,
          _size,
          _dataSearch: payload,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    // lấy bản ghi theo id
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          .getById(id)
          .then((res) => {
            if (res && res.code === 0) {
              const {
                data: _dataFilter,
                totalElements: _totalElements,
                pageNumber: _page,
                pageSize: _size,
              } = res;

              dispatch[storeName].updateData({
                _dataFilter,
                _totalElements,
                _page,
                _size,
              });
              resolve(_dataFilter);
            }
          })
          .catch((err) => {
            message.error(err.message.toString());
            reject(err);
          });
      });
    },
    _createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if (state[storeName]?._dataEdit?.id || payload?.id) {
          fetchProvider
            .put({
              ...payload,
              id: state[storeName]?._dataEdit?.id || payload?.id,
            })
            .then((res) => {
              if (res.code === 0) {
                dispatch[storeName].updateData({
                  dataEditDefault: res.data,
                });
                message.success(`Cập nhật thành công dữ liệu ${title}!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              message.error(e.message);
              reject(e);
            });
        } else {
          fetchProvider
            .post(payload)
            .then((res) => {
              if (res.code === 0) {
                message.success(`Thêm mới thành công dữ liệu ${title}!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              message.error(e.message);
              reject(e);
            });
        }
      });
    },
    _onDelete: async (payload, state) => {
      const { _page: page, _size: size, _dataSearch } = state[storeName];
      return new Promise((resolve, reject) => {
        fetchProvider
          .delete(payload)
          .then((res) => {
            message.success("Xóa bản ghi thành công");
            dispatch[storeName]._getList({ page, size, ..._dataSearch });
            resolve(res);
          })
          .catch((res) => {
            message.error(res.message);
            reject(res);
          });
      });
    },
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: fetchProvider.searchAll,
      KEY_CACHE: "DATA_ALL_" + storeName,
      model: storeName,
      fieldName: storeName.upperFirst(),
    }),
    onDelete: async (payload, state) => {
      return dispatch[storeName]._onDelete(payload);
    },
    ...customEffect({ dispatch }),
  }),
});
