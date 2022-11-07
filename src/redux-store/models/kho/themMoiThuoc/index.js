import themMoiThuocProvider from "data-access/kho/them-moi-thuoc-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import tiepDonProvider from "data-access/tiepdon-provider";
import { cloneDeep } from "lodash";
const initData = {};

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
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      return new Promise((resolve, reject) => {
        try {
          themMoiThuocProvider
            .post(payload)
            .then((s) => {
              if (s?.code === 0) {
                message.success("Thêm mới thành công dữ liệu đơn thuốc");
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                  nguoiBenhId: s?.data.phieuXuatId,
                });
                resolve(s?.data);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
              reject(e);
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          // return Promise.reject(error);
          reject(error);
        }
      });
    },
    macDinh: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .macDinh()
          .then((s) => {
            let nbDiaChi = state.themMoiThuoc?.nbDotDieuTri?.nbDiaChi || {};
            nbDiaChi.quocGiaId = s?.data?.quocGia?.id;
            if (s?.code === 0) {
              if (id) {
                dispatch.themMoiThuoc.updateData({
                  dataMacDinh: s?.data || {},
                });
              } else {
                let doiTuong = s?.data?.doiTuong;
                dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
                  doiTuong: doiTuong,
                });
                dispatch.themMoiThuoc.updateData({
                  nbDotDieuTri: {
                    nbDiaChi: {
                      ...nbDiaChi,
                      quocTichId: s?.data?.quocTich?.id,
                    },
                    // doiTuong: doiTuong,
                    // loaiDoiTuongId: s?.data?.loaiDoiTuong?.id,
                    // quocTichId: s?.data?.quocTich?.id,
                    // danTocId: s?.data?.danToc?.id,
                    // nbDiaChi: { ...nbDiaChi },
                    // dataMacDinh: s?.data || {},
                  },
                });
              }
            }
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
