import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import dmDvKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import nbDvNgoaiDieuTriProvider from "data-access/nb-dv-ngoai-dieu-tri-provider";
import { message } from "antd";

export default {
  state: {
    listChooseDv: [],
    dsDvNgoaiDieuTri: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.chiDinhNgoaiDieuTri.updateData({
        page: 0,
        ...rest,
      });
      dispatch.chiDinhNgoaiDieuTri.getDsDvNgoaiDieuTri({ rest });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.chiDinhNgoaiDieuTri.dataSearch || {}),
        ...payload,
      };
      dispatch.chiDinhNgoaiDieuTri.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.chiDinhNgoaiDieuTri.getDsDvNgoaiDieuTri({
        page: 0,
        dataSearch,
      });
    },

    getDsDvNgoaiDieuTri: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.chiDinhNgoaiDieuTri.size || 10;
      const dataSearch =
        payload.dataSearch || state.dvNgoaiDieuTri.dataSearch || {};

      dmDvKyThuatProvider
        .searchTongHop({
          page,
          size,
          loaiDichVu: 60,
          // dsDoiTuongSuDung: [20],
          ...dataSearch,
        })
        .then((s) => {
          dispatch.chiDinhNgoaiDieuTri.updateData({
            dsDvNgoaiDieuTri: s?.data || [],
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },

    chiDinhNgoaiDieuTri: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        let { dsDichVuCanBoSung = [], dataTamTinhTien } = payload;

        nbDvNgoaiDieuTriProvider
          .chiDinhNgoaiDieuTri(dataTamTinhTien)
          .then((s) => {
            if ((s?.data || []).every((x) => x.code === 0)) {
              resolve(s);
              message.success("Chỉ định thành công");
            } else {
              let errMessage = [];

              const updatingRecord = s?.data.filter(
                (item) => item.code && item.code !== 0
              );
              const listMessages = s?.data
                .filter((item) => item.code && item.code !== 0)
                .map(
                  (item2) =>
                    `(${item2?.nbDichVu?.dichVu?.ten} - ${item2.message})`
                );
              errMessage = [...errMessage, ...listMessages];
              dsDichVuCanBoSung = [...dsDichVuCanBoSung, ...updatingRecord];

              errMessage = [...new Set(errMessage)];
              if (errMessage.length) {
                message.error(errMessage.join());
              } else {
                message.success("Chỉ định thành công");
              }
              resolve(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    tamTinhTien: ({
      nbDotDieuTriId,
      khoaChiDinhId,
      chiDinhTuDichVuId,
      chiDinhTuLoaiDichVu,
      dsDichVu,
    }) => {
      return new Promise((resolve, reject) => {
        nbDvNgoaiDieuTriProvider
          .tamTinhTienDVNgoaiDieuTri(dsDichVu)
          .then((s) => {
            const data = (s?.data || []).map((item) => ({
              nbDotDieuTriId,
              nbDichVu: {
                dichVu: item.nbDichVu?.dichVu,
                dichVuId: item.nbDichVu?.dichVuId,
                soLuong: item.nbDichVu?.soLuong,
                chiDinhTuDichVuId,
                chiDinhTuLoaiDichVu,
                khoaChiDinhId,
                thanhTien: item.nbDichVu?.thanhTien,
              },
              phongThucHienId: item.phongThucHienId,
            }));
            dispatch.chiDinhNgoaiDieuTri.updateData({
              dataTamTinhTien: data,
            });
            resolve(data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
