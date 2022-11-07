import nbThongTinProvider from "data-access/nb-thong-tin-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import moment from "moment";
import apiBase from "../../../data-access/api-base";

export default {
  state: {
    listThongTinNguoiBenh: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nbThongTinProvider.search,
      KEY_CACHE: "DATA_ALL_DANH_SACH_NB",
      model: "information",
      fieldName: "DsNb",
    }),
    onCheckTrungThongTin: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { variables, value } = payload;
        let {
          tenNb,
          gioiTinh,
          ngaySinh,
          soDienThoai,
          quocTichId,
          danTocId,
          nbDiaChi,
          nbGiayToTuyThan,
          nbNguoiBaoLanh,
          nbTheBaoHiem,
          quocGiaId,
          chiNamSinh,
        } = state.tiepDon;
        ngaySinh =
          ngaySinh?.date instanceof moment
            ? ngaySinh?.date.format("YYYY/MM/DD HH:mm:ss")
            : ngaySinh?.date;
        let sdtNguoiBaoLanh = nbNguoiBaoLanh?.soDienThoai;
        let maSoGiayToTuyThan = nbGiayToTuyThan?.maSo;
        let maTheBhyt = nbTheBaoHiem?.maThe;
        // let tuNgay = nbTheBaoHiem?.tuNgay;
        // let denNgay = nbTheBaoHiem?.denNgay;
        let tinhThanhPhoId = nbDiaChi?.tinhThanhPhoId;
        let quanHuyenId = nbDiaChi?.quanHuyenId;
        let xaPhuongId = nbDiaChi?.xaPhuongId;
        let soNha = nbDiaChi?.soNha;
        let newValue = {};
        if (variables === "diaChi") {
          newValue = {
            xaPhuongId: value?.xaPhuongId,
            quanHuyenId: value?.quanHuyenId,
            tinhThanhPhoId: value?.tinhThanhPhoId,
          };
        } else if (variables == "tenNb") {
          tenNb = value;
          newValue = {
            [variables]: value,
          };
        } else if (variables == "ngaySinh") {
          ngaySinh = value?.date;
          newValue = {
            [variables]: value?.date,
          };
        } else if (variables == "maThe") {
          maTheBhyt = value;
          newValue = {
            maTheBhyt: value,
          };
        } else if (variables == "maSo") {
          maSoGiayToTuyThan = value;
          newValue = {
            maSoGiayToTuyThan: value,
          };
        } else {
          newValue = {
            [variables]: value,
          };
        }
        const giamDinhBaoHiem = (s) => {
          if (
            [
              "tenNb",
              "ngaySinh",
              "gioiTinh",
              "maThe",
              "tuNgay",
              "denNgay",
            ].includes(variables) &&
            tenNb &&
            maTheBhyt &&
            ngaySinh
          ) {
            resolve({
              type: 2,
              data: {
                hoTen: tenNb,
                maThe: maTheBhyt,
                ngaySinh,
              },
            });
          } else {
            resolve({
              type: 0,
              data: s,
            });
          }
        };
        if (
          (variables === "tenNb" &&
            value &&
            (xaPhuongId || quanHuyenId || tinhThanhPhoId)) ||
          (variables === "soDienThoai" && value) ||
          (variables === "sdtNguoiBaoLanh" && value) ||
          (variables === "maSo" && value) ||
          (variables === "maThe" && value) ||
          (variables === "diaChi" && value && tenNb)
        ) {
          //check trung thông tin bệnh nhân
          dispatch.information
            .checkTrungThongTin({
              tenNb: tenNb?.toUpperCase(),
              soDienThoai: soDienThoai?.replaceAll(" ", ""),
              gioiTinh,
              ngaySinh,
              sdtNguoiBaoLanh,
              maSoGiayToTuyThan,
              maTheBhyt,
              quocGiaId,
              tinhThanhPhoId,
              quanHuyenId,
              xaPhuongId,
              soNha,
              chiNamSinh,
              ...newValue,
            })
            .then((s) => {
              if (s.data?.length) {
                resolve({
                  type: 1,
                  data: s.data,
                });
                //tồn tại bệnh nhân
              } else {
                giamDinhBaoHiem(s);
                //không tìm thấy bệnh nhân
              }
            })
            .catch((e) => {
              giamDinhBaoHiem(e);
              //Lỗi tìm kiếm bệnh nhân
            });
        } else {
          giamDinhBaoHiem(newValue);
          //Khôgn đủ điều kiện tìm kiếm bệnh nhân
        }
        return;
        // if (s?.code === 0 && s?.data?.length) showTrungThongTin(s?.data);
        // else if (tenNb?.length && maTheBhyt?.length && ngaySinh) {
        //   onCheckCardInsurance(
        //     {
        //       hoTen: tenNb,
        //       maThe: maTheBhyt,
        //       ngaySinh,
        //     },
        //     { tenNb }
        //   );
        // }
      });
    },
    checkTrungThongTin: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbThongTinProvider
          .searchTrungThongTin(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    onSizeChange: ({ ...rest }, state) => {
      dispatch.information.updateData({
        page: 0,
        ...rest,
      });
      dispatch.information.onSearch({ ...rest });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.information.dataSearch || {}),
        ...payload,
      };
      dispatch.information.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.information.onSearch({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.information.dataSortColumn,
        ...payload,
      };
      dispatch.information.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.information.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onSearch: ({ page = 0, maHoSo, ...payload }, state) => {
      let size = payload.size || state.information.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.information.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.information.dataSearch || {};
      if (!maHoSo) maHoSo = dataSearch.maHoSo;

      nbThongTinProvider
        .search({ page, size, sort, ...dataSearch, maHoSo })
        .then((s) => {
          dispatch.information.updateData({
            listThongTinNguoiBenh: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    getMaNbByMaBhyt: (payload, state) => {
      const { maTheBhyt, id } = payload;
      nbThongTinProvider
        .search({ page: 0, maTheBhyt })
        .then((s) => {
          const data = s.data[0];
          console.log("data: ", data);
          if (!data) {
            dispatch.tiepDon.updateData({
              maNb: null,
            });
            return;
          }
          dispatch.tiepDon.updateData({
            ...data,
            searchThe: true,
            ngaySinh: data?.ngaySinh && {
              str: data?.chiNamSinh
                ? moment(data?.ngaySinh).format("YYYY")
                : moment(data?.ngaySinh).format("DD/MM/YYYY"),
              date: moment(data?.ngaySinh).format("YYYY-MM-DDTHH:mm:ssZ"),
            },
            thangTuoi: data?.thangTuoi,
            tuoi: data?.tuoi,
            nbDiaChi: {
              soNha: data?.soNha,
              xaPhuongId: data?.xaPhuongId,
              xaPhuong: {
                id: data?.xaPhuongId,
                ten: data?.tenXaPhuong,
              },
              quanHuyenId: data?.quanHuyenId,
              quanHuyen: {
                id: data?.quanHuyenId,
                ten: data?.tenQuanHuyen,
              },
              tinhThanhPhoId: data?.tinhThanhPhoId,
              tinhThanhPho: {
                id: data?.tinhThanhPhoId,
                ten: data?.tenTinhThanhPho,
              },
              quocGiaId: data?.quocGiaId,
              quocGia: {
                id: data?.quocGiaId,
                ten: data?.tenQuocGia,
              },
              diaChi:
                data?.diaChi ||
                `${data?.soNha}, ${data?.tenXaPhuong}, ${data?.tenTinhThanhPho}, ${data?.tenQuocGia}`,
            },
            maNb: data?.maNb,
            maHoSo: null,
            id: id,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
  }),
};
