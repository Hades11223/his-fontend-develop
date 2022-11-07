import { combineFields } from "utils/editor-utils";
import { message } from "antd";
import editorProvider from "data-access/editor-provider";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import cacheUtils from "utils/cache-utils";
import { t } from "i18next";
let timeout = null;

export default {
  state: {
    isFormDataLoading: false,
    isFileLoading: false,
    isSaveFormLoading: false,
    list: [],
    apiFields: [],
    file: {},
    apiFields: [], //list apiFields json template api
    fileData: {},
    fileDataHIS: {},
    listForm: [],
    fileTemplate: {},
    fileDataTemplate: {},
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getBaoCaoByMaBaoCao: ({
      maBaoCao,
      id,
      queries,
      isGetMultiFile = false,
    }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const baoCaos = await baoCaoProvider.getMauBaoCao({
            ma: maBaoCao,
          });
          if (baoCaos.data) {
            const baoCao = baoCaos.data;
            const fileData = await dispatch.files.getFormData({
              file: baoCao,
              id,
              queries,
              updateState: false,
            });
            if (!isGetMultiFile) {
              dispatch.files.updateData({
                file: baoCao,
                fileData,
              });
            }
            const template = await dispatch.files.getTemplateAPI({
              api: baoCao.apiTemplate || baoCao.api,
              updateState: false,
            });
            if (!isGetMultiFile) {
              dispatch.files.updateData({
                ...template,
              });
              resolve(baoCao);
            } else {
              const data = {
                baoCao,
                template,
                fileData,
              };
              resolve(data);
            }
          } else {
            reject(baoCaos);
          }
        } catch (error) {
          message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },
    getBaoCaoBaoCaoPreview: ({ baoCaoId, templateId }) => {
      return new Promise(async (resolve, reject) => {
        try {
          let baoCao = await baoCaoProvider.getMauBaoCaoById(baoCaoId);
          baoCao = baoCao.data;
          const template = await dispatch.files.getTemplateAPI({
            api: baoCao.apiTemplate || baoCao.api,
            updateState: false,
          });
          dispatch.files.updateData({
            ...template,
            file: baoCao,
            fileData: {},
          });
          resolve(baoCao);
        } catch (error) {
          message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },

    //get danh sách trường dữ liệu
    getTemplateAPI: ({ api, updateState = true }, state) => {
      return new Promise(async (resolve, reject) => {
        let template = await cacheUtils.read(
          "",
          "EDITOR_TEMPLATE_" + api,
          {},
          false
        );
        dispatch.files.updateData(template);
        editorProvider
          .getTemplateAPI({ api })
          .then((s) => {
            const apiFields = combineFields(s?.data);
            let template = {
              fileTemplate: s?.data,
              apiFields: Object.keys(apiFields),
            };
            if (updateState) dispatch.files.updateData(template);
            resolve(template);
            cacheUtils.save("", "EDITOR_TEMPLATE_" + api, template, false);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getFormData: ({
      file,
      id,
      queries = "",
      updateState = true,
      ...payload
    }) => {
      return new Promise((resolve, reject) => {
        // dispatch.files.updateData({
        //   // isFormDataLoading: true,
        //   fileData: {},
        // });
        editorProvider
          .getFormDataEMR({
            api: file.api,
            id,
            queries,
          })
          .then((value) => {
            try {
              const fileData = combineFields(value?.data);
              if (updateState)
                dispatch.files.updateData({
                  // isFormDataLoading: false,
                  fileData,
                });
              resolve(fileData);
            } catch (error) {
              console.log(error);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            if (updateState)
              dispatch.files.updateData({
                // isFormDataLoading: false,
                fileData: null,
              });
            reject(e);
          });
      });
    },

    // getDataMultiForm: (payload = {}, state) => {
    //   let userId = state.auth.auth?.id;
    //   return new Promise(async (resolve, reject) => {
    //     const files = payload.files;
    //     const patientDocument = payload.patientDocument;
    //     const allPromise = files.map((file) => {
    //       if (file)
    //         if (file.type == "emr")
    //           return new Promise(async (resolve, reject) => {
    //             const allPromise2 = [];
    //             allPromise2.push(
    //               new Promise(async (resolve, reject) => {
    //                 let configFile = await cacheUtils.read(
    //                   userId,
    //                   "EDITOR_FILE_" + file.formId,
    //                   null,
    //                   false
    //                 );
    //                 editorProvider
    //                   .getConfigForm(file.formId)
    //                   .then((s) => {
    //                     cacheUtils.save(
    //                       userId,
    //                       "EDITOR_FILE_" + file.formId,
    //                       s?.data,
    //                       false
    //                     );
    //                     if (!configFile) resolve(s.data);
    //                   })
    //                   .catch((e) => {
    //                     if (!configFile) resolve(null);
    //                   });
    //                 if (configFile) resolve(configFile);
    //               })
    //             );
    //             allPromise2.push(
    //               new Promise((resolve, reject) => {
    //                 let promise = [
    //                   editorProvider.getFormDataEMR({
    //                     api: file.api,
    //                     nbHsBaId: file.nbHoSoBaId,
    //                     patientDocument: patientDocument,
    //                   }),
    //                   editorProvider.getFormDataHIS({
    //                     api: file.api,
    //                     patientDocument: patientDocument,
    //                     recordId: file.recordId,
    //                   }),
    //                 ];
    //                 Promise.all(promise)
    //                   .then((values) => {
    //                     resolve({
    //                       fileData: combineFields(values[0]?.data),
    //                       fileDataHIS: combineFields(values[1]?.data),
    //                     });
    //                   })
    //                   .catch((e) => {
    //                     resolve({
    //                       fileData: null,
    //                       fileDataHIS: null,
    //                     });
    //                   });
    //               })
    //             );
    //             allPromise2.push(
    //               new Promise(async (resolve, reject) => {
    //                 let template = await cacheUtils.read(
    //                   userId,
    //                   "EDITOR_TEMPLATE_" + file.api,
    //                   {},
    //                   false
    //                 );
    //                 editorProvider
    //                   .getTemplateAPI({ api: file.api })
    //                   .then((s) => {
    //                     const apiFields = combineFields(s?.data);
    //                     let template2 = {
    //                       apiFields: Object.keys(apiFields),
    //                       fileTemplate: s?.data,
    //                     };
    //                     cacheUtils.save(
    //                       userId,
    //                       "EDITOR_TEMPLATE_" + file.api,
    //                       template2,
    //                       false
    //                     );
    //                     if (!template) {
    //                       resolve(template2);
    //                     }
    //                   })
    //                   .catch((e) => {
    //                     if (!template) resolve(null);
    //                   });
    //                 if (template) {
    //                   resolve(template);
    //                 }
    //               })
    //             );
    //             Promise.all(allPromise2)
    //               .then((s) => {
    //                 resolve({
    //                   file,
    //                   config: s[0],
    //                   data: s[1],
    //                   template: s[2],
    //                 });
    //               })
    //               .catch((e) => {
    //                 resolve({
    //                   file,
    //                 });
    //               });
    //           });
    //         else {
    //           return new Promise((resolve) => {
    //             resolve({ file });
    //           });
    //         }
    //     });
    //     Promise.all(allPromise)
    //       .then((s) => {
    //         resolve(s);
    //       })
    //       .catch((e) => {
    //         reject(e);
    //       });
    //   });
    // },

    // getConfigForm: (payload, state) => {
    //   return new Promise(async (resolve, reject) => {
    //     dispatch.files.updateData({
    //       isFileLoading: true,
    //       file: {
    //         components: [],
    //       },
    //       signStatus: {},
    //     });
    //     let userId = state.auth.auth?.id;
    //     let file = await cacheUtils.read(
    //       userId,
    //       "EDITOR_FILE_" + payload,
    //       null,
    //       false
    //     );
    //     let list = state.files.list || [];
    //     if (file) {
    //       list.push(file);
    //       dispatch.files.updateData({
    //         file,
    //         list: [...list],
    //         isFileLoading: false,
    //       });
    //     }
    //     editorProvider
    //       .getConfigForm(payload)
    //       .then((s) => {
    //         cacheUtils.save(userId, "EDITOR_FILE_" + payload, s?.data, false);
    //         list.push(s?.data);
    //         list = list.filter((item, index, self) => {
    //           return self.findIndex((item2) => item2.id === item.id) === index;
    //         });
    //         dispatch.files.updateData({
    //           isFileLoading: false,
    //           file: s?.data,
    //           list: [...list],
    //         });
    //       })
    //       .catch((e) => {
    //         message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
    //         dispatch.files.updateData({
    //           isFileLoading: false,
    //         });
    //       });
    //   });
    // },

    onSaveForm: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { file, data } = payload || {};
        dispatch.files.updateData({ isSaveFormLoading: true });
        editorProvider
          .onSaveForm({ file, data })
          .then((s) => {
            message.success(s?.message || "Lưu thông tin thành công!");
            // dispatch.documents.getFiles({ maHoSo: payload.patientDocument });
            dispatch.files.updateData({
              // savedId: s?.data?.id, //lưu lại id phiếu vừa lưu
              isSaveFormLoading: false,
              fileData: combineFields(s?.data),
            });
            resolve(s?.data);
          })
          .catch((e) => {
            dispatch.files.updateData({ isSaveFormLoading: false });
            message.error(e?.message || "Lưu thông tin không thành công!");
            reject(e);
          });
      });
    },

    // getAllCriterials: ({ api, ...payload }, state) => {
    //   return new Promise((resolve, reject) => {
    //     if (!api) {
    //       message.error("Chưa khai báo api danh sách tiêu chí");
    //       return;
    //     }
    //     dispatch.files.updateData({
    //       isLoadingCriterial: true,
    //       criterials: [],
    //     });
    //     editorProvider
    //       .getAllCriterials({ api, ...payload })
    //       .then((s) => {
    //         dispatch.files.updateData({
    //           isLoadingCriterial: false,
    //           criterials: s?.data || [],
    //         });
    //       })
    //       .catch((e) => {
    //         dispatch.files.updateData({
    //           isLoadingCriterial: false,
    //         });
    //       });
    //   });
    // },
    updateFileSignStatus: ({ maHoSo, formId, nbHoSoBaId, trangThai }) => {
      return new Promise((resolve, reject) => {
        editorProvider
          .updateFileSignStatus({ formId, nbHoSoBaId, trangThai })
          .then((s) => {
            dispatch.documents.getFiles({ maHoSo });
          })
          .catch((e) => {
            message.error(e.message || "Không thể cập nhật trạng thái ký");
          });
      });
    },
    setSignStatus: (
      {
        componentId,
        block = false,
        levelSign,
        chuKy,
        currentLevel,
        props,
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        if (state.application.viewMultipleFile) return;
        if (timeout != null) {
          clearTimeout(timeout);
        }
        let signStatus = state.files.signStatus || {};
        let status1 = JSON.stringify(signStatus[componentId] || {});
        let status2 = JSON.parse(status1);

        status2.block = block;
        status2.levelSign = levelSign;
        status2.currentLevel = currentLevel;
        status2.chuKy = chuKy;
        if (JSON.stringify(status2) != status1) {
          signStatus[componentId] = status2;
          state.files.signStatus = signStatus;
        }
        timeout = setTimeout(
          (signStatus = {}) => {
            dispatch.files.updateData({
              signStatus: { ...signStatus },
            });
            timeout = null;
          },
          1000,
          signStatus
        );
        resolve();
      });
    },

    checkAllowSign: ({ level, values = {}, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let signComponent = state.files.file.components
          .filter((item) => item.type === "electronicSignature")
          .filter((item) => {
            if (
              level > (item.props?.levelSign || 1) &&
              item.props?.fieldName &&
              // values.hasOwnProperty(item.props?.fieldName + "_chuKy") &&
              !values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => {
            return a.props?.levelSign > b.props?.levelSign ? 1 : -1;
          });
        if (signComponent.length > 0) {
          reject(
            "Vui lòng ký " +
              (signComponent[0].props.signer
                ? signComponent[0].props.signer
                : "cấp " + (signComponent[0].props.levelSign || 1)) +
              " trước"
          );
          return;
        }
        resolve(true);
      });
    },
    checkAllowClearSign: (
      { level, values = {}, fieldName, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        const { authorities = [], username } = state.auth.auth || {};
        const roleAdmin = authorities.find((item) =>
          [
            "ROLE_IsofhAdmin",
            "ROLE_VpOrganizationAdmin",
            "ROLE_AdminTong",
            "ROLE_PstwAdmin",
            "ROLE_Admin",
          ].includes(item)
        );
        if (
          roleAdmin ||
          !values[fieldName + "_username"] ||
          values[fieldName + "_username"] == username
        ) {
          let signComponent = state.files.file.components
            .filter((item) => {
              if (item.type === "electronicSignature") {
                if (
                  level &&
                  level < (item.props?.levelSign || 1) &&
                  item.props?.fieldName &&
                  values[item.props?.fieldName + "_chuKy"]
                ) {
                  return true;
                }
              }
              return false;
            })
            .sort((a, b) => {
              return a.props?.levelSign > b.props?.levelSign ? -1 : 1;
            });
          if (signComponent.length > 0) {
            reject(
              "Vui lòng huỷ ký " +
                (signComponent[0].props.signer
                  ? signComponent[0].props.signer
                  : "cấp " + (signComponent[0].props.levelSign || 1)) +
                " trước"
            );
            return;
          }

          resolve(true);
        } else {
          reject(
            `Yêu cầu chỉ tài khoản ký mới có quyền hủy ký. ${
              values[fieldName + "_username"]
                ? `Tài khoản đã ký ${values[fieldName + "_username"]} - ${
                    values[fieldName + "_hoVaTen"]
                  } `
                : ""
            }`
          );
        }
      });
    },
    clearCurrentFile: () => {
      dispatch.files.updateData({
        file: {},
      });
    },
    setAutoSwitchButtonHSDD: (value) => {
      dispatch.files.updateData({
        isAutoSwitchButtonHSDD: value,
      });
    },
    getTemplateBieuMau: (payload) => {
      return new Promise(async (resolve, reject) => {
        editorProvider
          .getTemplateBieuMau(payload)
          .then((s) => {
            if (payload.id) {
              dispatch.files.updateData({
                templateBieuMau: s.data,
                fileDataTemplate: s.data.find((item) => item.id == payload.id),
              });
            } else {
              dispatch.files.updateData({
                templateBieuMau: s.data,
              });
            }
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message);
            reject(e);
          });
      });
    },
    createTemplateBieuMau: (payload) => {
      return new Promise(async (resolve, reject) => {
        editorProvider
          .createTemplateBieuMau(payload)
          .then((s) => {
            dispatch.files.updateData({
              tenplateBieuMau: s,
            });
            message.success(t("editor.taoDuLieuMauMauThanhCong"));
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message);
            reject(e);
          });
      });
    },
    updateTemplateBieuMau: (payload) => {
      return new Promise(async (resolve, reject) => {
        editorProvider
          .updateTemplateBieuMau(payload)
          .then((s) => {
            message.success(t("common.capNhatThanhCong"));
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.capNhatKhongThanhCong"));
            reject(e);
          });
      });
    },
    deleteTemplateBieuMua: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        editorProvider
          .deleteTemplateBieuMua(payload)
          .then((s) => {
            const templateBieuMau = (state.files.templateBieuMau || []).filter(
              (item) => item.id !== payload.id
            );
            dispatch.files.updateData({
              templateBieuMau,
            });
            message.success(t("common.xoaDuLieuThanhCong"));
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message);
            reject(e);
          });
      });
    },
    getDataMultiForm: async ({ files }) => {
      try {
        const promise = files.map(({ maBaoCao, id, ...payload }) => {
          return dispatch.files.getBaoCaoByMaBaoCao({
            maBaoCao: maBaoCao,
            id: id,
            isGetMultiFile: true,
            queries: payload,
          });
        });
        const data = await Promise.all(promise);
        const newData = data.map((item, index) => ({
          ...item,
          key: files[index]?.key,
        }));
        return newData;
      } catch (error) {
        console.log("error", error);
      }
    },
  }),
};
