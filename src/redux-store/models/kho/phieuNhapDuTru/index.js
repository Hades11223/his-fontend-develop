import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listPhieuNhapDuTru: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { active: 2 },
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    isValidData: (data) => {
      return new Promise((resolve, reject) => {
        let check = true;
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (!element) {
              check = false;
              break;
            }
          }
        }
        resolve(check);
      });
    },
    checkSoLuongDuTru: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        const { dsNhapXuatChiTiet } = state.phieuNhapXuat;
        let data = (dsNhapXuatChiTiet || []).reduce((acc, item, index) => {
          acc[item?.dichVuId] = {
            ...acc[item?.dichVuId],
            soLuongKhaDung: item?.soLuongKhaDung || 0,
            soLuongYeuCau:
              parseFloat(item?.soLuongYeuCau || 0) +
              parseFloat(acc[item?.dichVuId]?.soLuongYeuCau || 0),
          };
          return acc;
        }, {});
        let isValid = true;
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (element?.soLuongYeuCau > element?.soLuongKhaDung)
              isValid = false;
          }
        }
        // resolve(isValid);
        resolve(true);
      });
    },    
  }),
};
