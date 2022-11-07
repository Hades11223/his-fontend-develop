import { message } from "antd";
import vitalSignsCommonProvider from "data-access/vital-signs-common-provider";
import { cloneDeep } from "lodash";
export default {
  state: {
    isLoading: false,
    listData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onDelete: ({ id }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.vitalSignsCommon.updateData({
          isLoading: true,
        });
        vitalSignsCommonProvider
          .delete({ id })
          .then((s) => {
            const listData = state.vitalSignsCommon.listData || [];
            dispatch.vitalSignsCommon.updateData({
              listData: listData.filter((item) => item.id != id),
            });
            const { page = 0, size = 10, maHoSo } = state.vitalSignsCommon;
            dispatch.vitalSignsCommon.onSearch({
              page,
              size,
              maHoSo,
            });
            message.success("Xoá thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xoá không thành công");
            dispatch.vitalSignsCommon.updateData({
              isLoading: false,
            });
          });
      });
    },
    onUpdateTime: ({ item, thoiGian }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.vitalSignsCommon.updateData({
          isLoading: true,
        });
        vitalSignsCommonProvider
          .update({ id: item.id, thoiGian })
          .then((s) => {
            const listData = state.vitalSignsCommon.listData || [];

            dispatch.vitalSignsCommon.updateData({
              listData: cloneDeep(
                listData.map((el) => (el.id === item.id ? s.data : el))
              ),
              isLoading: false,
            });
            message.success("Cập nhật thời gian thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Cập nhật thời gian không thành công");
            dispatch.vitalSignsCommon.updateData({
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    onSizeChange: ({ size = 10, maHoSo }) => {
      dispatch.vitalSignsCommon.updateData({
        size,
        page: 0,
        listData: [],
        maHoSo,
      });
      dispatch.vitalSignsCommon.onSearch({
        page: 0,
        reset: true,
        maHoSo,
      });
    },
    onSearch: ({ page, maHoSo, reset = false }, state) => {
      return new Promise((resolve, reject) => {
        let newState = { isLoading: true };
        if (reset) newState.listData = [];
        dispatch.vitalSignsCommon.updateData(newState);
        let size = state.vitalSignsCommon.size || 10;
        vitalSignsCommonProvider
          .search({
            maHoSo,
            page: page + "",
            size: size,
            sort: "thoiGian,desc",
            active: true,
          })
          .then((s) => {
            const listData = [
              ...(page == 0 ? [] : state.vitalSignsCommon.listData || []),
              ...(s?.data || []),
            ];
            const newState = {
              isLoading: false,
              listData,
              total: s?.totalElements || 0,
            };
            if ((s?.data || []).length) {
              newState.page = page;
            }
            dispatch.vitalSignsCommon.updateData(newState);
          })
          .catch((e) => {
            dispatch.vitalSignsCommon.updateData({
              isLoading: false,
            });
            message.error(e?.message || "Tải dữ liệu không thành công");
          });
      });
    },
  }),
};
