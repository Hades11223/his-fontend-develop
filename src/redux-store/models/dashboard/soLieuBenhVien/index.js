import soLieuBenhVienProvider from "data-access/dashboard/dashboard-hospital-general";
import moment from "moment";
export default {
  state: {
    inpatient: [],
    ngoaiTru: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDataSoLieu: ({ the, key, selectedDate }) => {
      let params = { ngay: selectedDate };
      if (key === "luotTiepDon" || key === "dataDoanhThuBieuDo") {
        params = {
          tuNgay: moment(selectedDate).subtract(6, "day").format("DD-MM-YYYY"),
          denNgay: moment(selectedDate).format("DD-MM-YYYY"),
        };
      }

      soLieuBenhVienProvider.getDataSoLieu({ the, params }).then((s) => {
        dispatch.soLieuBenhVien.updateData({ [key]: s.data });
      });
    },
  }),
};
