import { client, signerPath, scanPath } from "client/request";
import { HISTORY } from "client/api";
import { combineUrlParams } from "utils";
import signProvider from "data-access/sign-provider";
import { message } from "antd";
export default {
  state: {
    fileSigned: "",
    historySigned: [],
    fileName: "",
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    generateFileSignForPatient: (
      {
        file,
        maBieuMau,
        maHoSo,
        chuKySo = 1,
        soPhieu,
        ngayThucHien,
        khoaChiDinhId,
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        signProvider
          .generateFileToSign({
            file,
            maBieuMau,
            maHoSo,
            chuKySo,
            soPhieu,
            ngayThucHien,
            khoaChiDinhId,
          })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getHistorySigned: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getHistory({
            page: "0",
            size: 999,
            sort: "id,desc",
            kiemTraQuyen: false,
            ...payload,
          })
          .then((s) => {
            let histories = s.data;
            let obj = {};
            let arr = [];
            if (histories) {
              //cho phép hiển thị lịch sử ký đã ký hoặc đang trình ký
              histories = histories
                .filter((item) => {
                  return (
                    item.trangThai === 0 ||
                    (item.loaiKy === 1 && item.trangThai === 20) || //trình ký số
                    (item.loaiKy === 0 && item.trangThai === 20) //trình ký điện tử
                  );
                })
                .sort(function (itema, itemb) {
                  //sort theo ngayKy và nhưng lịch sử nào đang trình ký thì hiển thị lên trên
                  return ![20].includes(itema.trangThai) &&
                    [20].includes(itemb.trangThai)
                    ? 1
                    : [20].includes(itema.trangThai) &&
                      ![20].includes(itemb.trangThai)
                    ? -1
                    : itema.ngayKy < itemb.ngayKy
                    ? 1
                    : -1;
                });
              histories.forEach((item) => {
                if (!obj[item.tenFile]) {
                  obj[item.tenFile] = [];
                }
                obj[item.tenFile].push(item);
              });

              let keys = Object.keys(obj);
              keys.forEach((key) => {
                arr.push(obj[key]);
              });

              //sort lại các file nào có ngày ký mới nhất lên trên
              arr = arr.sort((itema, itemb) => {
                return itema[0]?.ngayKy < itemb[0]?.ngayKy ? 1 : -1;
              });
            }
            if (!payload.soPhieu) {
              arr = [];
            }
            dispatch.signer.updateData({
              historySigned: arr,
            });
            resolve(arr);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    signDigital: (params, state) => {
      return new Promise((resolve, reject) => {
        // dispatch.signer.updateData({
        //   isSigning: true,
        // });
        // signProvider
        //   .signDigital(params)
        //   .then((s) => {
        //     dispatch.signer.updateThenSign({ s, data: params });
        //     resolve(s?.data);
        //   })
        //   .catch((e) => {
        //     if (state?.common?.commonConfig?.KY_SO_USB_TOKEN?.giaTri === "Y") {
        //       let data = {
        //         ...params,
        //         ghiChu:
        //           state?.common?.commonConfig?.GHI_CHU_KY_SO_USB_TOKEN
        //             ?.giaTri || "",
        //         coQuan:
        //           state?.common?.commonConfig?.CO_QUAN_KY_SO_USB_TOKEN
        //             ?.giaTri || "",
        //       };
        //       signProvider
        //         .signUSBToken(data)
        //         .then((s) => {
        //           dispatch.signer.updateThenSign({ s, data });
        //           resolve(s?.data);
        //         })
        //         .catch((e) => {
        //           dispatch.signer.updateData({
        //             isSigning: false,
        //           });
        //           message.error(
        //             e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
        //           );
        //           reject(e);
        //         });
        //     } else {
        //       dispatch.signer.updateData({
        //         isSigning: false,
        //       });
        //       message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        //       reject(e);
        //     }
        //   });
      });
    },
    updateThenSign: ({ s, data }, state) => {
      dispatch.signer.updateData({
        isSigning: false,
      });
      if (s.data?.trangThai == 20) {
        message.error(
          s?.message || "Tài khoản không có quyền ký. Đã trình ký thành công!"
        );
        return;
      }
      message.success(s?.message || "Ký thành công");
      let patient = {};// state.patient.patient;
      dispatch.signer.getHistorySigned({
        soPhieu: data?.soPhieu,
        maHoSo: data?.maHoSo,
        maBieuMau: data?.maBieuMau,
      });
      dispatch.signer.loadFileSigned({
        prefix: signerPath,
        url: s.data?.fileSauKy,
        historyItem: s.data,
      });
      dispatch.files.updateData({
        savedId: null,
        quickSign: false,
      });
      if (data?.formId && data?.nbHoSoBaId) {
        dispatch.files.updateFileSignStatus({
          maHoSo: patient?.maHoSo,
          formId: data?.formId,
          nbHoSoBaId: data?.nbHoSoBaId,
          trangThai: "Da_Ky",
        });
      }
    },
    loadFileSigned: ({ prefix, url, historyItem }, rootState) => {
      return new Promise((resolve, reject) => {
        if (!url) {
          reject();
        } else
          signProvider
            .getFileSign({ prefix, url })
            .then((s) => {
              dispatch.signer.updateData({
                fileSigned: s.data,
                historyItem,
              });
              resolve(s);
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
      });
    },
    getOriginFile: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getOriginFile(payload)
          .then((s) => {
            dispatch.signer.loadFileSigned({
              prefix: scanPath,
              url: s.duongDan,
              historyItem: null,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getUserSignImage: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getUserSignImage({ userId: payload })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // clearModalSignPdf: (payload, state) => {
    //   dispatch.drugAllocation.updateData({
    //     showModalPrintHandlingOver: false,
    //     showModalPrintComplete: false,
    //     ListDrugPrint: [],
    //     drugsPrint: [],
    //   });
    //   dispatch.files.updateData({
    //     showModalSign: false,
    //   });
    //   dispatch.signer.updateData({
    //     fileSigned: null,
    //     historySigned: [],
    //     historyItem: null,
    //   });
    // },
  }),
};
