import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import printProvider from "data-access/print-provider";
import { cloneDeep, flatten } from "lodash";
import stringUtils from "mainam-react-native-string-utils";
import { message } from "antd";
import { t } from "i18next";
import { LIST_PHIEU_IN_EDITOR, LIST_PHIEU_IN_POPUP } from "constants/index";

export default {
  state: {
    isLoadingListPhieu: false,
    listPhieu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListPhieu: ({
      nbDotDieuTriId,
      chiDinhTuLoaiDichVu,
      dsChiDinhTuLoaiDichVu,
      chiDinhTuDichVuId,
      ...payload
    }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const listPhieu =
            (
              await nbDotDieuTriProvider.getPhieuIn({
                nbDotDieuTriId,
                chiDinhTuLoaiDichVu,
                dsChiDinhTuLoaiDichVu,
                chiDinhTuDichVuId,
                ...payload,
              })
            ).data || [];

          resolve(
            listPhieu.map((item) => {
              item.key = stringUtils.guid();
              if (LIST_PHIEU_IN_EDITOR.includes(item.ma)) {
                item.type = "editor";
              }
              if (LIST_PHIEU_IN_POPUP.includes(item.ma)) {
                item.type = "popup";
              }
              return item;
            })
          );
        } catch (error) {
          console.log(error);
          resolve([]);
        }
      });
    },
    getThongTinPhieu: (
      {
        phieu: item,
        nbDotDieuTriId,
        chiDinhTuLoaiDichVu,
        dsChiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
        showError,
        ...payload
      },
      state
    ) => {
      return nbDotDieuTriProvider.getThongTinPhieu({
        phieu: item,
        nbDotDieuTriId,
        chiDinhTuLoaiDichVu,
        dsChiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
        showError,
        ...payload,
      });
    },
    getPhieuIn: (
      {
        nbDotDieuTriId,
        chiDinhTuLoaiDichVu,
        dsChiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
        isThuNgan,
        ...payload
      } = {},
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch.phieuIn.updateData({
            isLoadingListPhieu: true,
          });
          const data = await dispatch.phieuIn.getListPhieu({
            nbDotDieuTriId,
            chiDinhTuLoaiDichVu,
            dsChiDinhTuLoaiDichVu,
            chiDinhTuDichVuId,
            ...payload,
          });

          let listPhieu = cloneDeep(data).filter(
            (item) => item.type != "editor" && item.type != "popup"
          );
          listPhieu = listPhieu.reduce((list, item) => {
            //nếu là phiếu thu thì chỉ hiển thị phiếu thu đang xem
            if (item.ma == "P033") {
              item.dsSoPhieu = item.dsSoPhieu.filter(
                (x) => x.soPhieu == payload?.phieuThuId
              );
            }
            //nếu là phiếu chi thì hiển thị tất cả phiếu chi
            if (item.ma == "P034") {
              item.dsSoPhieu.forEach((x) => {
                list.push({
                  ...item,
                  key: stringUtils.guid(),
                  dsSoPhieu: [x],
                });
              });
              return list;
            }
            list.push(item);
            return list;
          }, []);
          //nếu có phiếu
          if (listPhieu.length) {
            //thì mặc định load phiếu đầu tiên để hiển thị ra trước
            const phieu = await dispatch.phieuIn.getThongTinPhieu({
              phieu: listPhieu[0],
              nbDotDieuTriId,
              chiDinhTuLoaiDichVu,
              dsChiDinhTuLoaiDichVu,
              chiDinhTuDichVuId,
              ...payload,
            });
            if (phieu && !phieu.code) {
              //nếu load thành công thì gắn thông tin vào field data của phiếu
              listPhieu[0].data = phieu;
              if (phieu.filePdf) {
                //sau đó tải file về
                const urlFileLocal =
                  await dispatch.phieuIn.getDataDanhSachPhieu({
                    dsFile: phieu.filePdf,
                  });
                phieu.urlFileLocal = urlFileLocal;
              }
            }
          }
          const listSelected = listPhieu.map((item) => item.key);
          dispatch.phieuIn.updateData({
            elementScrollingPdfKey: listSelected[0],
            selectedIds: flatten(listSelected),
            listPhieu: listPhieu,
          });
          //sau đó tải ngầm những phiếu còn lại
          dispatch.phieuIn.silentLoadingFile({
            listPhieu,
            data: {
              nbDotDieuTriId,
              chiDinhTuLoaiDichVu,
              dsChiDinhTuLoaiDichVu,
              chiDinhTuDichVuId,
              ...payload,
            },
          });
          resolve(data);
        } catch (error) {
          console.log(error);
          resolve([]);
        } finally {
          dispatch.phieuIn.updateData({
            isLoadingListPhieu: false,
          });
        }
      });
    },
    silentLoadingFile: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        const data = payload.data || {};
        const listPhieu = (payload.listPhieu || []).filter(
          (item, index) => !item.data && index != 0
        );
        const promises = listPhieu.map((phieu, index) => {
          return dispatch.phieuIn.getThongTinPhieu({
            phieu: phieu,
            ...data,
          });
        });
        Promise.all(promises)
          .then((values) => {
            values.forEach((s, index) => {
              listPhieu[index].data = s;
            });
            dispatch.phieuIn.updateData({
              listPhieu: [...state.phieuIn.listPhieu],
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    getDataDanhSachPhieu: ({ dsFile, mode, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        printProvider
          .getMergePdf(dsFile)
          .then((s) => {
            console.info("Print success");
            resolve(s);
          })
          .catch((err) => {
            console.error("Print fail", err);
            resolve(null);
          });
      });
    },
    updatePhieu: ({ key, data }, state) => {
      return new Promise((resolve, reject) => {
        const listPhieu = state.phieuIn.listPhieu || [];
        const phieu = listPhieu.find((item) => item.key == key);
        if (phieu) {
          phieu.data = data;
        }
        dispatch.phieuIn.updateData({
          listPhieu: [...listPhieu],
        });
      });
    },
    showFileEditor: ({ phieu, ...payload }, state) => {
      switch (phieu.ma) {
        case "P037":
          window.open("/editor/bao-cao/EMR_BA154/" + payload.nbDotDieuTriId);
          break;
        case "P038":
          window.open("/editor/bao-cao/EMR_BA155/" + payload.nbDvKhamId);
          break;
        case "P039":
          window.open("/editor/bao-cao/EMR_BA173/" + payload.nbDvKhamId);
          break;
        case "P040":
          window.open("/editor/bao-cao/EMR_BA156/" + payload.goiDvId);
          break;
        case "P041":
          window.open("/editor/bao-cao/EMR_BA153/" + payload.nbThongTinId);
          break;
        case "P042":
          window.open("/editor/bao-cao/EMR_BA155/" + payload.nbDvKhamId);
          break;
        case "P043":
          window.open("/editor/bao-cao/EMR_BA173/" + payload.nbDvKhamId);
          break;
        case "P044":
          window.open("/editor/bao-cao/EMR_BA098/" + payload.nbDotDieuTriId);
          break;
        case "P073":
          window.open("/editor/bao-cao/EMR_BA092/" + payload.id);
          break;
        case "P074":
          window.open("/editor/bao-cao/EMR_BA089/" + payload.id);
          break;
        case "P056":
          window.open("/editor/bao-cao/EMR_BA138/" + payload.nbDotDieuTriId);
          break;
        case "P079":
          window.open("/editor/bao-cao/EMR_BA051/" + payload.nbDotDieuTriId);
          break;
        case "P077":
          window.open("/editor/bao-cao/EMR_HSDD020/" + payload.id);
          break;
        case "P087":
          window.open("/editor/bao-cao/EMR_BA069/" + payload.nbDotDieuTriId);
          break;
        case "P088":
          window.open("/editor/bao-cao/EMR_BA077/" + payload.id);
          break;
        case "P095":
          window.open("/editor/bao-cao/EMR_BA213/" + payload.nbDotDieuTriId);
          break;
        case "P062":
          let data = {};
          window.open(
            `/multiFile?baoCaos=${JSON.stringify({
              id: payload.id,
              ma: payload.ma,
              maBaoCao: payload.maBaoCao,
              tongHop: true,
            })}`
          );
          break;
        case "P032":
          window.open(
            `/multiFile?baoCaos=${JSON.stringify({
              id: payload.id,
              ma: payload.ma,
              maBaoCao: payload.maBaoCao,
            })}`
          );
          break;
        case "P090":
          window.open("/editor/bao-cao/EMR_HSDD009/" + payload.nbDotDieuTriId);
          break;
        default:
          break;
      }
    },
    getFilePhieuIn: ({ listPhieus, selectedIds, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let dsPhieu = listPhieus;
          if (!dsPhieu) {
            const data = state.phieuIn.listPhieu || [];
            dsPhieu = (selectedIds || [])
              .map((id) => {
                const phieu = data?.find((item) => item.key == id);
                return phieu;
              })
              .filter((item) => item);
          }
          if (dsPhieu?.length) {
            let promise = dsPhieu.map((phieu) => {
              return dispatch.phieuIn.getThongTinPhieu({ phieu, ...payload });
            });
            dsPhieu = (await Promise.all(promise)).filter(
              (item) => item && !item.code
            );
            promise = dsPhieu.map((phieu) => {
              return dispatch.phieuIn.getDataDanhSachPhieu({
                dsFile: flatten(phieu.filePdf),
                mode: 0,
              });
            });
            let values = (await Promise.all(promise)).filter((item) => item);
            if (!values?.length) {
              reject({ message: t("phieuIn.khongTonTaiPhieuIn") });
              return;
            }
            let file = null;
            file = await printProvider.getMergePdf(values);
            resolve({ finalFile: file, dsPhieu });
          } else {
            message.error(t("phieuIn.khongTonTaiPhieuIn"));
            reject({ message: t("phieuIn.khongTonTaiPhieuIn") });
          }
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
  }),
};
