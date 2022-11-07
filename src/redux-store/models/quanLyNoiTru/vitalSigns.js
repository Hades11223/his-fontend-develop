import { cloneDeep } from "lodash";
import { formatName } from "utils/vital-signs/helpers";
import { combineUrlParams } from "utils";
import cacheUtils from "utils/cache-utils";
import nbChiSoSongProvider from "data-access/nb-chi-so-song-provider";
// import userProvider from "data-access/user-provider";
import { client, dataPath } from "client/request";
import {
  NB_CHI_SO_SONG,
  NB_DOT_DIEU_TRI,
  VITAL_SIGNS,
  VITAL_SIGNS_CATEGORY,
  VITAL_SIGNS_PATIENT,
} from "client/api";
import { message } from "antd";
import moment from "moment";
export default {
  state: {
    moreValueIds: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDataVitalSigns: async ({ nbDotDieuTriId }, state) => {
      dispatch.vitalSigns.updateData({ isLoading: true, nbDotDieuTriId });
      nbChiSoSongProvider
        .getDataVitalSigns({ nbDotDieuTriId, sort: "thoiGianThucHien" })
        .then(async (s) => {
          let data = s?.data || [];
          data.sort(
            (a, b) =>
              new Date(a?.thoiGianThucHien).getTime() -
              new Date(b?.thoiGianThucHien).getTime()
          );
          let values = [];
          let moreValueIds = [];
          let vitalSignsCategories = state.chiSoSong._listDataTongHop || [];
          data.map((item) => {
            return (moreValueIds = [
              ...moreValueIds,
              ...(item.dsChiSoSongKhac || []).filter((t) => {
                if (vitalSignsCategories && vitalSignsCategories.length) {
                  if (!vitalSignsCategories.find((y) => y.id === t.chiSoSongId))
                    return false;
                }
                return t.giaTri !== "" && t.giaTri !== undefined;
              }),
            ]);
          });
          moreValueIds = moreValueIds
            .map((item) => item.chiSoSongId)
            .filter((item, index, self) => {
              return self.indexOf(item) === index;
            });
          const currentTime = new Date();
          values = (data || []).map((item = {}, index) => {
            let item2 = {
              ...item,
              thoiGianThucHien: new Date(item.thoiGianThucHien),
              huyetap:
                item.huyetApTamThu === 0
                  ? ""
                  : item.huyetApTamThu +
                    (item.huyetApTamTruong ? "/" + item.huyetApTamTruong : ""),
              nhipTho:
                item.nhipTho && item.bopBong
                  ? `${item.nhipTho}/(bb)`
                  : item.nhipTho,
              tenNguoiThucHien: formatName(item.tenNguoiThucHien || ""),
              isLoading: false,
            };
            return item2;
          });

          let last = data[data.length - 1] || {};
          let obj = {
            thoiGianThucHien: currentTime,
            huyetap: !last.huyetApTamThu
              ? ""
              : last.huyetApTamThu +
                (last.huyetApTamTruong ? "/" + last.huyetApTamTruong : ""),
            canNang: last.canNang,
            nhipTho:
              last.nhipTho && last.bopBong
                ? `${last.nhipTho}/(bb)`
                : last.nhipTho,
            dsChiSoSongKhac: [],
          };
          values.push(obj);
          const newValues = await dispatch.vitalSigns.convertData(values);
          dispatch.vitalSigns.updateData({
            resState: data,
            values: newValues,
            moreValueIds: moreValueIds || [],
            isEditing: false,
            typeValue: 1,
            isDeleting: false,
            allowEdit: false,
            isLoading: false,
            currentCol: -1,
          });
        })
        .catch((e) => {
          dispatch.vitalSigns.updateData({
            isLoading: false,
          });
          throw e;
        });
    },

    getAllVitalSignsCategory: async () => {
      let cache = await cacheUtils.read("", "DATA-CATEGORIES", [], false);
      dispatch.vitalSigns.updateData({
        vitalSignsCategories: cache || [],
      });
      nbChiSoSongProvider
        .searchCategory({ size: 1000, active: true })
        .then((s) => {
          let data = (s.data || []).map((item) => ({
            ten: item.ten,
            id: item.id,
            donVi: item.donVi,
            giaTriLonNhat: item.giaTriLonNhat,
            giaTriNhoNhat: item.giaTriNhoNhat,
          }));
          cacheUtils.save(null, "DATA-CATEGORIES", data, false);
          dispatch.vitalSigns.updateData({
            vitalSignsCategories: data,
          });
        });
    },
    onCreateOrEditCategory: async (payload, state) => {
      if (payload.id) {
        nbChiSoSongProvider
          .updateCategory(payload)
          .then((s) => {
            const categories = (state.vitalSigns.categories || []).map(
              (item) => {
                if (item.id == s.data?.id) return s.data;
                return item;
              }
            );
            dispatch.vitalSigns.updateData({
              categories,
            });
            message.success("Cập nhật thông tin chỉ số thành công");
          })
          .catch((e) => {
            message.error(
              e?.message || "Cập nhật thông tin chỉ số không thành công"
            );
          });
      } else {
        nbChiSoSongProvider
          .createCategory(payload)
          .then((s) => {
            const categories = state.vitalSigns.categories || [];
            dispatch.vitalSigns.updateData({
              categories: [s.data || {}, ...categories],
            });
            message.success("Tạo thông tin chỉ số thành công");
          })
          .catch((e) => {
            message.error(
              e?.message || "Tạo thông tin chỉ số không thành công"
            );
          });
      }
    },
    onDeleteCategory: async (payload) => {
      nbChiSoSongProvider
        .onDeleteCategory(payload)
        .then((s) => {
          message.success(s?.message || "Xóa chỉ số sống thành công");
        })
        .catch((e) => {
          message.error(e?.message || "xóa chỉ số sống không thành công");
        });
    },
    onUpdate: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        dispatch.vitalSigns.updateData({
          isLoading: true,
        });
        const values = cloneDeep(state.vitalSigns.values).map((item) => {
          if (item?.auToAddMach) {
            item.mach = null;
          }
          if (item?.auToAddNhietDo) {
            item.nhietDo = null;
          }
          return item;
        });
        let index = state.vitalSigns.currentCol;
        let huyetap = (values[index].huyetap || "").split("/");
        let id = state.vitalSigns.resState[index].id;
        const splitValues = values[index].nhipTho
          ? (values[index].nhipTho + "").split("/")
          : [];
        let nhietDo = Math.round(values[index].nhietDo * 10) / 10;
        let mach = Math.round(values[index].mach);
        if (state.vitalSigns.isDeleting) {
          if (state.vitalSigns.typeValue === 1) {
            mach = 0;
            values[index].mach = 0;
          }
          if (state.vitalSigns.typeValue === 2) {
            nhietDo = 0;
            values[index].nhietDo = 0;
          }
        }
        nbChiSoSongProvider
          .onUpdate({
            ...values[index],
            id,
            nhietDo,
            mach,
            canNang: values[index].canNang,
            huyetApTamTruong: huyetap[1] || 0,
            huyetApTamThu: huyetap[0] || 0,
            nhipTho: splitValues[0] || "",
            bopBong: !!(splitValues[1] || ""),
            thoiGianThucHien: values[index].thoiGianThucHien,
            nguoiThucHienId: state.auth.auth?.nhanVienId || "",
            dsChiSoSongKhac: values[index].dsChiSoSongKhac || [],
          })
          .then(async (s) => {
            const newValues = await dispatch.vitalSigns.convertData(values);
            dispatch.vitalSigns.updateData({
              isEditing: false,
              allowEdit: false,
              isDeleting: false,
              isLoading: false,
              values: newValues,
            });
            message.success("Lưu thành công");
            resolve(newValues);
          })
          .catch((e) => {
            dispatch.vitalSigns.updateData({
              isLoading: false,
            });
            message.error(e?.message || "Lưu không thành công");
            reject();
          });
      });
    },
    onDelete: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        dispatch.vitalSigns.updateData({
          isLoading: true,
        });
        let index = state.vitalSigns.currentCol; //lấy ra vị trí hiện tại
        let id = state.vitalSigns.resState[index].id; //lấy ra id của item hiện tại
        const values = cloneDeep(state.vitalSigns.values)
          .filter((item) => item.id != id)
          .map((item) => {
            if (item?.auToAddMach) {
              item.mach = null;
            }
            if (item?.auToAddNhietDo) {
              item.nhietDo = null;
            }
            return item;
          });
        const resState = cloneDeep(state.vitalSigns.resState).filter(
          (item) => item.id != id
        );
        const newValues = await dispatch.vitalSigns.convertData(values);
        nbChiSoSongProvider
          .onDelete(id)
          .then((s) => {
            dispatch.vitalSigns.updateData({
              isEditing: false,
              allowEdit: false,
              isDeleting: false,
              isLoading: false,
              values: newValues,
              resState,
            });
            message.success("Lưu thành công");
            resolve(newValues);
          })
          .catch((e) => {
            dispatch.vitalSigns.updateData({
              isLoading: false,
            });
            message.error(e?.message || "Lưu không thành công");
            reject();
          });
      });
    },
    onCreate: async (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.vitalSigns.updateData({
          isLoading: true,
        });
        let values = cloneDeep(state.vitalSigns.values);
        let item = values[values.length - 1];

        const huyetap = ((item.huyetap || "") + "").split("/");
        const nhipTho = ((item.nhipTho || "") + "").split("/");
        if (
          item.huyetap ||
          item.canNang ||
          item.nhietDo ||
          item.nhipTho ||
          item.mach
        ) {
          const data = {
            nhietDo: Math.round(item.nhietDo * 10) / 10,
            mach: Math.round(item.mach),
            canNang: item.canNang,
            huyetApTamThu: huyetap[0] || 0,
            huyetApTamTruong: huyetap[1] || 0,
            nhipTho: nhipTho[0] || "",
            nguoiThucHienId: state.auth.auth?.nhanVienId || "",
            thoiGianThucHien: item.thoiGianThucHien,
            nbDotDieuTriId: payload.nbDotDieuTriId,
            dsChiSoSongKhac: item.dsChiSoSongKhac || [],
            ptTtId: null,
            spo2: null,
            nhomMau: 1,
            chieuCao: null,
            bopBong: item.bopBong,
          };
          nbChiSoSongProvider
            .onCreate({ ...data })
            .then(async (s) => {
              const currentTime = new Date();
              item.id = s?.data?.id;
              item.nguoiThucHienId = s?.data?.nguoiThucHienId;
              let resState = [...values];
              let last = values[values.length - 1] || {};
              let obj = {
                thoiGianThucHien: currentTime,
                huyetap: !last.huyetApTamThu
                  ? ""
                  : last.huyetApTamThu +
                    (last.huyetApTamTruong ? "/" + last.huyetApTamTruong : ""),
                canNang: last.canNang,
                nhipTho: last.nhipTho,
                dsChiSoSongKhac: [],
                bopBong: last.bopBong,
                nhietDo: last.nhietDo,
                mach: last.mach,
              };
              debugger;
              values = [...values, obj];
              dispatch.vitalSigns.updateData({
                isLoading: false,
                resState,
                values: values,
                currentCol: values.length - 1,
              });
              message.success("Lưu thành công");
              resolve(values);
            })
            .catch((e) => {
              dispatch.vitalSigns.updateData({
                isLoading: false,
              });
              message.error(e?.message || "Lưu không thành công");
              reject(false);
            });
        } else {
          dispatch.vitalSigns.updateData({
            isLoading: false,
          });
          message.error("Vui lòng điền ít nhất một thông tin");
        }
      });
    },
    onCancel: (payload, state) => {
      dispatch.vitalSigns.updateData({
        values: [...state.vitalSigns.preValues],
        isDeleting: false,
        isEditing: false,
      });
    },
    getAllDoctor: async () => {
      // let cache = await cacheUtils.read("", "DATA-DOCTORS", [], false);
      // dispatch.vitalSigns.updateData({
      //   doctors: cache || [],
      // });
      // userProvider
      //   .search({
      //     page: "0",
      //     size: 2000,
      //     active: "true",
      //     sort: "fullName",
      //     doctor: "true",
      //   })
      //   .then((s) => {
      //     let data = s.data
      //       .map((item) => ({
      //         id: item.id,
      //         username: item.username,
      //         value: item.value,
      //         fullName: item.fullName + " - " + item.value,
      //         name: item.fullName,
      //         qualificationName: item.qualification?.name,
      //         departmentId: item.departmentId,
      //         departmentName: item.department?.name,
      //       }))
      //       .filter((item, index, self) => {
      //         return self.findIndex((t) => t.id === item.id) === index;
      //       });
      //     cacheUtils.save(null, "DATA-DOCTORS", data, false);
      //     dispatch.vitalSigns.updateData({
      //       doctors: data || [],
      //     });
      //   });
    },
    onCreateSurgery: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbChiSoSongProvider
          .createSurgery(payload)
          .then((s) => {
            if (s.code == 0) {
              let values = state.vitalSigns.values;
              const { vitalSignsId } = payload;
              let item = values.find((i) => i.id === vitalSignsId);
              if (item) {
                item.nbPhauThuat = s.data;
                dispatch.vitalSigns.updateData({
                  values: [...values],
                });
                message.success("Thêm thông tin phẫu thuật thành công");
                resolve(values);
              }
            } else {
              message.error(`${s.message}`);
              resolve(null);
            }
          })
          .catch((e) => {
            message.error(
              `Tạo thông tin phẫu thuật không thành công hoặc thông tin đã tồn tại`
            );
            reject(null);
          });
      });
    },
    onRemoveSurgery: (vitalSignsId, state) => {
      return new Promise((resolve, reject) => {
        let values = state.vitalSigns.values;
        let item = values.find((i) => i.id === vitalSignsId);
        if (item && item.nbPhauThuat) {
          nbChiSoSongProvider
            .deleteSurgery(item.nbPhauThuat.id)
            .then((s) => {
              item.nbPhauThuat = null;
              dispatch.vitalSigns.updateData({
                values: [...values],
                isEditing: false,
                isDeleting: false,
              });
              message.success("Xoá thành công");
              resolve(values);
            })
            .catch((e) => {
              message.error(
                e?.message || "Xoá thông tin phẫu thuật không thành công",
                "danger"
              );
              reject(e);
            });
        } else {
          message.error("Không tồn tại thông tin phẫu thuật");
          reject();
        }
      });
    },
    onUpdateSurgery: ({ id, bacSy, phuongPhapPhauThuat }) => {
      nbChiSoSongProvider
        .updateSurgery({ id, bacSy, phuongPhapPhauThuat })
        .then((s) => {
          message.success(
            s?.message || "Cập nhật thông tin phẫu thuật thành công"
          );
        })
        .catch((e) => {
          message.error(
            e?.message || "Cập nhật thông tin phẫu thuật không thành công"
          );
        });
    },
    getDataToPrint: ({ nbDotDieuTriId }, state) => {
      dispatch.vitalSigns.updateData({
        isLoadingPrint: true,
        dataPrint: null,
      });
      let promises = [];
      //detail patient
      promises.push(
        new Promise(async (resolve, reject) => {
          client
            .get(
              combineUrlParams(
                `${dataPath}${NB_DOT_DIEU_TRI}/noi-tru/${nbDotDieuTriId}`
              )
            )
            .then((res) => {
              if (res?.data?.code === 0 && res?.data?.data) {
                resolve(res?.data?.data || {});
              } else {
                message.error(
                  res?.data?.message || "Không tìm thấy thông tin bệnh nhân"
                );
                reject(null);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Không tìm thấy thông tin bệnh nhân");
              resolve(null);
            });
        })
      );
      promises.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${dataPath}${NB_CHI_SO_SONG}`, {
                nbDotDieuTriId,
              })
            )
            .then((res) => {
              if (res?.data?.code === 0) {
                resolve(res.data.data || []);
              } else {
                message.error(
                  res?.data?.message ||
                    "Tải dữ liệu chức năng sống không thành công"
                );
                reject();
              }
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      Promise.all(promises)
        .then((_values) => {
          let patient = _values[0];
          let values = [];
          let moreValueIds = [];
          _values[1].map((item) => {
            return (moreValueIds = [
              ...moreValueIds,
              ...(item.dsChiSoSongKhac || []).filter(
                (t) => t.giaTri !== "" && t.giaTri !== undefined
              ),
            ]);
          });
          moreValueIds = moreValueIds
            .map((item) => item.chiSoSongId)
            .filter((item, index, self) => {
              return self.indexOf(item) === index;
            });

          values = (_values[1] || [])
            .map((item, index) => {
              let item2 = {
                ...item,
                tenNguoiThucHien: formatName(item.tenNguoiThucHien || ""),
                id: item.id,
                thoiGianThucHien: new Date(item.thoiGianThucHien),
                huyetap:
                  item.huyetApTamThu === 0
                    ? ""
                    : item.huyetApTamThu +
                      (item.huyetApTamTruong
                        ? "/" + item.huyetApTamTruong
                        : ""),
                canNang: item.canNang,
                nhietDo: item.nhietDo,
                nhipTho:
                  item.nhipTho && item.bopBong
                    ? `${item.nhipTho}/(bb)`
                    : item.nhipTho,
                mach: item.mach,
                isLoading: false,
              };
              return item2;
            })
            .sort(
              (a, b) =>
                new Date(a?.thoiGianThucHien).getTime() -
                new Date(b?.thoiGianThucHien).getTime()
            );
          dispatch.vitalSigns.updateData({
            isLoadingPrint: false,
            dataPrint: {
              patient: patient,
              values: values,
              moreValueIds: moreValueIds || [],
            },
          });
        })
        .catch((e) => {});
    },

    onSizeChange: ({ size = 10, ten = "", active }) => {
      dispatch.vitalSigns.updateData({
        size,
        page: 0,
        categories: [],
      });
      dispatch.vitalSigns.onSearch({
        page: 0,
        ten,
        active,
        size,
      });
    },
    onSearch: ({ page, ten = "", active }, state) => {
      let newState = { isLoadingCategory: true, categories: [] };
      dispatch.vitalSigns.updateData(newState);
      let size = state.vitalSigns.size || 10;
      nbChiSoSongProvider
        .searchCategory({ page: page + "", size, ten, active })
        .then((s) => {
          dispatch.vitalSigns.updateData({
            categories: s?.data || [],
            isLoadingCategory: false,
            total: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.vitalSigns.updateData({
            categories: [],
            isLoadingCategory: false,
          });
        });
    },

    convertData: (values) => {
      return new Promise((resolve, reject) => {
        const data = values.map((item, index) => {
          let newValues = {
            auToAddMach: false,
            auToAddNhietDo: false,
          };
          if (!item?.mach) {
            if (values[index - 1]?.mach && values[index + 1]?.mach) {
              let valueMach =
                (+values[index - 1]?.mach + +values[index + 1]?.mach) / 2;
              newValues.mach = valueMach;
              newValues.auToAddMach = true;
            }
          }
          if (!item?.nhietDo) {
            if (values[index - 1]?.nhietDo && values[index + 1]?.nhietDo) {
              let valueNhietDo =
                (+values[index - 1]?.nhietDo + +values[index + 1]?.nhietDo) / 2;
              newValues.nhietDo = valueNhietDo;
              newValues.auToAddNhietDo = true;
            }
          }
          return {
            ...item,
            ...newValues,
          };
        });
        resolve(data);
      });
    },
  }),
};
