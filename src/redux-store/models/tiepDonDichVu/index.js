import dichVuProvider from "data-access/dich-vu-provider";
import dichVuKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import dichVuXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbDvNgoaiDieuTriProvider from "data-access/nb-dv-ngoai-dieu-tri-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { combineSort } from "utils";
import { groupBy, flatten, random } from "lodash";
import printProvider from "data-access/print-provider";
import dmBoChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import nbGoiDvProvider from "data-access/nb-goi-dv-provider";
import nbGoiDvChiTietProvider from "data-access/nb-goi-dv-chi-tiet-provider";
import { t } from "i18next";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvCdhaTdcnPtTtProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { LOAI_DICH_VU } from "constants/index";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { refConfirm } from "app";

export default {
  state: {
    elementScrollingPdfKey: 1,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchDvTiepDon: async (payload = {}, state) => {
      let userId = state.auth.auth?.id;
      let listDvKham = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_${payload?.loaiDichVu}`,
        [],
        false
      );
      dispatch.tiepDonDichVu.updateData({ listDvKham });

      if (payload?.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU) {
        return new Promise((resolve, reject) => {
          dmBoChiDinhProvider
            .searchTongHop({
              ...payload,
              dsDoiTuongSuDung: 10,
              dsLoaiDichVu: [
                LOAI_DICH_VU.KHAM,
                LOAI_DICH_VU.XET_NGHIEM,
                LOAI_DICH_VU.CDHA,
                LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
                LOAI_DICH_VU.NGOAI_DIEU_TRI,
              ],
            })
            .then((s) => {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKham)) {
                dispatch.tiepDonDichVu.updateData({ listDvKham: data });
                cacheUtils.save(
                  userId,
                  `DATA_DICH_VU_KHAM_${payload?.loaiDichVu}`,
                  data,
                  false
                );
              }
              resolve(s);
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          dichVuKyThuatProvider
            .searchDMDichVuTachPhong({ ...payload, dsDoiTuongSuDung: 10 })
            .then((s) => {
              if (s?.code === 0) {
                let data = s?.data || [];
                if (JSON.stringify(data) !== JSON.stringify(listDvKham)) {
                  dispatch.tiepDonDichVu.updateData({ listDvKham: data });
                  cacheUtils.save(
                    userId,
                    `DATA_DICH_VU_KHAM_${payload?.loaiDichVu}`,
                    data,
                    false
                  );
                }
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            });
        });
      }
    },
    searchDvKSKTiepDon: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        dichVuKyThuatProvider
          .searchDMDichVuTachPhong({ ...payload, dsDoiTuongSuDung: 40 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.tiepDonDichVu.updateData({ listDvKham: data });

              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    keDichVuKham: ({ data }, state) => {
      return new Promise((resolve, reject) => {
        const dataKham = data.filter(
          (item) => item.nbDichVu?.loaiDichVu === 10
        );

        const dataXN = data.filter((item) => item.nbDichVu?.loaiDichVu === 20);
        const dataCLS = data.filter((item) =>
          [30, 40].includes(item.nbDichVu?.loaiDichVu)
        );
        const dataNgoaiDieuTri = data
          .filter((item) => [60].includes(item.nbDichVu?.loaiDichVu))
          .map((item) => {
            return {
              nbDotDieuTriId: item.nbDotDieuTriId,
              nbDichVu: item.nbDichVu,
              phongThucHienId: item.nbDvKyThuat.phongThucHienId,
            };
          });
        const thens = (resolve, reject) => (s) => {
          if (s.code == 0) {
            const errors = s.data
              .filter((item) => item.code !== 0 && !item.id)
              .map((item) => item.message)
              .filter((item, index, self) => self.indexOf(item) == index);
            // if (errors.length)
            resolve({
              code: errors.length ? 1 : 0,
              data: s.data.filter((item) => item.id),
              message: errors,
            });
            return;
            // else {
            //   resolve({ code: 0, data: [] });
            // }
          }
          resolve({
            code: 1,
            message: [s.message],
            data: [],
          });
        };

        const catchs = (resolve, reject) => (e) => {
          resolve({ code: 1, message: [e.message], data: [] });
        };
        const chiDinhKham = dataKham.length
          ? new Promise((resolve, reject) => {
              return nbDvKhamProvider
                .chiDinhDVKham(dataKham)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };

        const chiDinhXN = dataXN.length
          ? new Promise((resolve, reject) => {
              return dichVuXNProvider
                .chiDinhXN(dataXN)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };

        const chiDinhCLS = dataCLS.length
          ? new Promise((resolve, reject) => {
              return nbDvCLSProvider
                .chiDinhCLS(dataCLS)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };
        const chiDinhNgoaiDieuTri = dataNgoaiDieuTri.length
          ? new Promise((resolve, reject) => {
              return nbDvNgoaiDieuTriProvider
                .chiDinhNgoaiDieuTri(dataNgoaiDieuTri)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };
        Promise.all([chiDinhKham, chiDinhXN, chiDinhCLS, chiDinhNgoaiDieuTri])
          .then((values) => {
            resolve(values);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    thayDoiThongTinDichVuDaChon: ({ data }, state) => {
      const dataKham = data.nbDichVu?.loaiDichVu === 10 && data;
      const dataXN = data.nbDichVu?.loaiDichVu === 20 && data;
      const dataCLS =
        (data.nbDichVu?.loaiDichVu === 30 ||
          data.nbDichVu?.loaiDichVu === 40) &&
        data;
      const dataNgoaiDieuTri = data.nbDichVu?.loaiDichVu === 60 && data;
      const thens = (resolve, reject) => (s) => {
        if (s.code == 0) {
          const errors = s.data
            .filter((item) => item.code !== 0 && !item.id)
            .map((item) => item.message)
            .filter((item, index, self) => self.indexOf(item) == index);
          // if (errors.length)
          resolve({
            code: errors.length ? 1 : 0,
            data: s.data.filter((item) => item.id),
            message: errors,
          });
          return;
          // else {
          //   resolve({ code: 0, data: [] });
          // }
        }
        resolve({
          code: 1,
          message: [s.message],
          data: [],
        });
      };

      const catchs = (resolve, reject) => (e) => {
        resolve({ code: 1, message: [e.message], data: [] });
      };

      const chiDinhKham =
        Object.keys(dataKham).length > 0
          ? new Promise((resolve, reject) => {
              return nbDvKhamProvider
                .themThongTinDV(dataKham, dataKham.id)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };

      const chiDinhXN =
        Object.keys(dataXN).length > 1
          ? new Promise((resolve, reject) => {
              return dichVuXNProvider
                .themThongTinDV(dataXN, dataXN.id)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };

      const chiDinhCLS =
        Object.keys(dataCLS).length > 0
          ? new Promise((resolve, reject) => {
              return nbDvCLSProvider
                .themThongTinDV(dataCLS, dataCLS.id)
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };

      const chiDinhNgoaiDieuTri =
        Object.keys(dataNgoaiDieuTri).length > 0
          ? new Promise((resolve, reject) => {
              return nbDvNgoaiDieuTriProvider
                .patchDVNgoaiDieuTri([
                  {
                    id: dataNgoaiDieuTri.id,
                    nbDichVu: dataNgoaiDieuTri.nbDichVu,
                    phongThucHienId:
                      dataNgoaiDieuTri?.nbDvKyThuat?.phongThucHienId,
                  },
                ])
                .then(thens(resolve, reject))
                .catch(catchs(resolve, reject));
            })
          : { code: 0, data: [] };
      return Promise.all([
        chiDinhKham,
        chiDinhXN,
        chiDinhCLS,
        chiDinhNgoaiDieuTri,
      ]);
    },
    themDichVu: ({ dsDichVu, nbDotDieuTriId }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { khoaTiepDonId } = state.tiepDon;
          const listDvChoose = state.tiepDonDichVu.listDvChoose || [];
          const data = await Promise.all(
            dsDichVu.map((dichVu) => {
              return new Promise(async (resolve, reject) => {
                let obj = {
                  nbDotDieuTriId: nbDotDieuTriId,
                  nbDichVu: {
                    dichVuId: dichVu?.dichVuId,
                    soLuong: dichVu?.soLuongMacDinh || dichVu?.soLuong || 1,
                    loaiDichVu: dichVu?.loaiDichVu,
                    khoaChiDinhId: khoaTiepDonId,
                    nbGoiDvId: dichVu?.nbGoiDvId || undefined,
                    nbGoiDvChiTietId: dichVu?.nbGoiDvChiTietId || undefined,
                    chiDinhTuLoaiDichVu: 200,
                  },
                };
                const tinhTien = (
                  await dispatch.tiepDonDichVu.tamTinhTien({
                    data: [obj],
                    loaiDichVu: dichVu?.loaiDichVu,
                  })
                ).data[0];

                if (tinhTien?.message) {
                  refConfirm.current &&
                    refConfirm.current.show(
                      {
                        title: t("common.canhBao"),
                        content: `<b>${tinhTien?.message} </b>  <br/> B???n c?? ch???c ch???n mu???n <b> ti???p t???c ch??? ?????nh d???ch v??? </b>?`,
                        cancelText: t("common.quayLai"),
                        okText: t("common.dongY"),
                        classNameOkText: "button-warning",
                        showBtnOk: true,
                        typeModal: "warning",
                      },
                      () => {
                        delete dichVu.id;
                        dichVu.tinhTien = tinhTien?.nbDichVu || {};
                        dichVu.thanhToan = false;
                        dichVu.soLuong =
                          dichVu?.soLuongMacDinh || dichVu.soLuong || 1;
                        dichVu.isNew = true;
                        dichVu.newId = random(1, 100000);
                        dichVu.phongId = dichVu.phongId
                          ? dichVu.phongId
                          : dichVu?.dsPhongThucHien?.length === 1
                          ? dichVu?.dsPhongThucHien[0]?.phongId
                          : [];
                        resolve(dichVu);
                      },
                      () => {
                        reject({ message: tinhTien?.message });
                        return;
                      }
                    );
                } else {
                  delete dichVu.id;
                  dichVu.tinhTien = tinhTien?.nbDichVu || {};
                  dichVu.thanhToan = false;
                  dichVu.soLuong =
                    dichVu?.soLuongMacDinh || dichVu.soLuong || 1;
                  dichVu.isNew = true;
                  dichVu.newId = random(1, 100000);
                  dichVu.phongId = dichVu.phongId
                    ? dichVu.phongId
                    : dichVu?.dsPhongThucHien?.length === 1
                    ? dichVu?.dsPhongThucHien[0]?.phongId
                    : [];
                  resolve(dichVu);
                }
              });
            })
          );
          const finalData = [...data, ...listDvChoose];
          dispatch.tiepDonDichVu.updateData({
            listDvChoose: finalData,
          });
          resolve(finalData);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
    xoaDichVu: ({ dsDichVu }, state) => {
      return new Promise((resolve, reject) => {
        const listDvChoose = state.tiepDonDichVu.listDvChoose || [];
        dsDichVu.forEach((element) => {
          let index = listDvChoose.findIndex((x) => {
            return (
              x?.dichVuId === element?.dichVuId &&
              (element?.phongId ? x?.phongId === element?.phongId : true)
            );
          });
          if (index !== -1) listDvChoose.splice(index, 1);
        });
        const finalData = [...listDvChoose];
        dispatch.tiepDonDichVu.updateData({ listDvChoose: finalData });
        resolve(finalData);
      });
    },
    themBo: ({ boChiDinhId, nbDotDieuTriId }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const dsDichVu = (
            await dichVuKyThuatProvider.searchAll({
              boChiDinhId,
              dsDoiTuongSuDung: 10,
            })
          ).data;
          const result = await dispatch.tiepDonDichVu.themDichVu({
            dsDichVu,
            nbDotDieuTriId,
          });
          resolve(result);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
    xoaBo: ({ boChiDinhId }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const dsDichVu = (
            await dichVuKyThuatProvider.searchAll({
              boChiDinhId,
              dsDoiTuongSuDung: 10,
            })
          ).data;
          const result = dispatch.tiepDonDichVu.xoaDichVu({ dsDichVu });
          resolve(result);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
    onSearchNbDv: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        // const currentNbDotDieuTriId = state.tiepDonDichVu.currentNbDotDieuTriId; //l???y th??ng tin nbdotdieutri trong redux
        // const listDvChoose = state.tiepDonDichVu?.listDvChoose;
        // const { khoaTiepDonId } = state.tiepDon;
        const page = rest.page || 0;
        const size = rest.size || 10;
        dichVuProvider
          .searchNbDvTongHop({ nbDotDieuTriId, page, size, ...rest })
          .then((s) => {
            if (s?.code === 0) {
              let data = s.data || [];
              dispatch.tiepDonDichVu.updateData({
                listDvDaTiepDon: data.map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                totalElements: s?.totalElements || 0,
                page,
                size,
              });

              // const serviceSelected = groupBy(data, "loaiDichVu"); //gom nh??m theo lo???i d???ch v???
              // const promises = Object.keys(serviceSelected).map(
              //   //tao list promise theo lo???i d???ch v???
              //   (loaiDichVu) => {
              //     return new Promise((resolve, reject) => {
              //       dispatch.tiepDonDichVu
              //         .tamTinhTien({
              //           //voi m???i lo???i d???ch v??? th?? g???i api tinh tien
              //           data: serviceSelected[loaiDichVu].map((dv) => {
              //             //{"data":[{"nbDotDieuTriId":"1255","nbDichVu":{"dichVuId":57,"soLuong":1,"loaiDichVu":10}}],"loaiDichVu":10}
              //             //generate body api tam t??nh ti???n theo form ph??a tr??n
              //             return {
              //               nbDotDieuTriId:
              //                 serviceSelected[loaiDichVu][0].nbDotDieuTriId,
              //               nbDichVu: {
              //                 dichVuId: dv.dichVuId,
              //                 soLuong: dv.soLuong,
              //                 loaiDichVu: dv.loaiDichVu,
              //               },
              //             };
              //           }),
              //           loaiDichVu: parseInt(loaiDichVu),
              //         })
              //         .then((s) => {
              //           resolve(s.data || []);
              //         })
              //         .catch((e) => {
              //           resolve([]);
              //         });
              //     });
              //   }
              // );
              // Promise.all(promises)
              //   .then(async (s) => {
              //     //sau khi g???i xong t???t c??? api t???m t??nh ti???n
              //     data = data.map((item) => {
              //       //duy???t qua danh s??ch d???ch v??? ???? ch???n
              //       s.forEach(async (tts) => {
              //         //t??m t??nh ti???n t????ng ???ng v???i d???ch v???
              //         const tt = await tts.find((y) => {
              //           return y.nbDichVu?.dichVuId == item.dichVuId;
              //         });
              //         //c???p nh???t gi?? tr??? ti???n v??o d???ch v???
              //         item.tinhTien = tt?.nbDichVu || item?.tinhTien || {}; // th??m item.tinhTien v?? khi l???p khi kh??ng t??m ???????c s??? g??n gi?? tr??? kh??ng t??m ???????c l?? undefined
              //       });
              //       item.tenPhong = item.tenPhongThucHien;

              //       return item;
              //     });
              //     let dataListDvChoose = data;
              //     if (currentNbDotDieuTriId == nbDotDieuTriId) {
              //       //check n???u tr??ng v???i th??ng tin ??ang request th?? b??? qua, kh??ng load ds dich vu ra n???a
              //       //muc ????ch l?? ????? hi???n th??? c??c d??? li???u caching tr?????c ?????y ch??a ???????c submit
              //       //t??nh l???i t???ng ti???n theo ng?????i b???nh bhyt v?? nb kh??ng kh??m b???o hi???m , khi quay l???i s???a th??ng tin
              //       let dataAfterChoose = listDvChoose?.filter((item) => {
              //         return data?.some(
              //           (item1) =>
              //             !(item1.dichVuId === item.dichVuId) && !item.id
              //         );
              //       });
              //       let checkData =
              //         dataAfterChoose?.length > 0
              //           ? [...dataAfterChoose, ...data]
              //           : data;
              //       const dataCustom =
              //         data.length === 0 ? listDvChoose : checkData;
              //       dataListDvChoose = dataCustom;
              //     }

              //     //dispart action
              //     let listPhong = [];
              //     try {
              //       listPhong =
              //         await dispatch.phongThucHien.getListPhongTheoDichVu({
              //           page: "",
              //           size: "",
              //           dsDichVuId: dataListDvChoose.map(
              //             (item) => item.dichVuId
              //           ),
              //           khoaChiDinhId: khoaTiepDonId,
              //         });
              //     } catch (error) {
              //       listPhong = [];
              //     }
              //     const phongByDichVuId = groupBy(listPhong, "dichVuId");
              //     dataListDvChoose.forEach((dichVu) => {
              //       dichVu.listPhongDv = phongByDichVuId[dichVu?.dichVuId];
              //     });
              //     dispatch.tiepDonDichVu.updateData({
              //       listDvChoose: dataListDvChoose,
              //       currentNbDotDieuTriId: nbDotDieuTriId, //c???p nh???t l???i thong tin nbdotdieutriId
              //     });
              //     resolve(s);
              //   })
              //   .catch((e) => {
              //     dispatch.tiepDonDichVu.updateData({
              //       listDvChoose: [],
              //       currentNbDotDieuTriId: nbDotDieuTriId, //c???p nh???t l???i thong tin nbdotdieutriId
              //     });
              //     reject(e);
              //   });
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getListonSearchNbDv: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        dichVuProvider
          .searchNbDvTongHop({ nbDotDieuTriId, ...rest })
          .then((s) => {
            dispatch.tiepDonDichVu.updateData({
              listDvChoose: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    tamTinhTien: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { data, loaiDichVu } = payload;
        const api =
          loaiDichVu === 10
            ? nbDvKhamProvider.tamTinhTienDVKham
            : loaiDichVu === 20
            ? dichVuXNProvider.tamTinhTienDVXN
            : loaiDichVu === 30
            ? nbDvCLSProvider.tamTinhTienDVCLS
            : loaiDichVu === 40
            ? nbDvCLSProvider.tamTinhTienDVCLS
            : loaiDichVu === 60
            ? nbDvNgoaiDieuTriProvider.tamTinhTienDVNgoaiDieuTri
            : null;
        if (api) {
          api(data)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        }
      });
    },
    onDeleteDichVu: ({ id, loaiDichVu, data, index }, state) => {
      return new Promise((resolve, reject) => {
        if (id) {
          let api =
            loaiDichVu === 10
              ? nbDvKhamProvider.onDeleteDichVu
              : loaiDichVu === 20
              ? dichVuXNProvider.onDeleteDichVu
              : loaiDichVu === 30
              ? nbDvCLSProvider.onDeleteDichVu
              : loaiDichVu === 40
              ? nbDvCLSProvider.onDeleteDichVu
              : loaiDichVu === 60
              ? nbDvNgoaiDieuTriProvider.onDeleteDichVu
              : null;

          api &&
            api({ id })
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                  message.error(s.message);
                }
              })
              .catch((e) => {
                reject(e);
                message.error(e?.message);
              });
        }
        const { listDvKham, listDvChoose } = state.tiepDonDichVu;

        if (listDvKham && listDvChoose) {
          let indexLeft =
            listDvChoose?.findIndex((x) => x?.dichVuId === data?.dichVuId) ??
            -1;
          if (indexLeft >= 0) {
            listDvChoose.splice(index, 1);
            dispatch.tiepDonDichVu.updateData({
              listDvChoose: [...listDvChoose],
            });
          }
        }
      });
    },
    getPhieuKhamBenh: ({ id, data }, state, payload) => {
      const nbTiepTheoId = state.goiSo.nbTiepTheo?.id;
      const dataKham = data.filter((item) => item.nbDichVu?.loaiDichVu === 10);
      const dataXN = data.filter((item) => item.nbDichVu?.loaiDichVu === 20);
      const dataCLS = data.filter((item) =>
        [30, 40].includes(item.nbDichVu?.loaiDichVu)
      );
      const dataNgoaiDieuTri = data.filter(
        (item) => item.nbDichVu?.loaiDichVu === 60
      );
      let promises = [];
      if (dataKham?.length > 0) {
        promises.push(
          nbDvKhamProvider.getPhieuChiDinh({ nbDotDieuTriId: id, ...payload })
        );
      }
      if (dataXN?.length > 0) {
        promises.push(
          nbDvXetNghiemProvider.getPhieuChiDinh({
            nbDotDieuTriId: id,
            ...payload,
          })
        );
      }
      if (dataCLS?.length > 0) {
        promises.push(
          nbDvCdhaTdcnPtTtProvider.getPhieuChiDinh({
            nbDotDieuTriId: id,
            ...payload,
          })
        );
      }
      if (dataNgoaiDieuTri?.length > 0) {
        promises.push(
          nbDvNgoaiDieuTriProvider.getPhieuChiDinh({
            nbDotDieuTriId: id,
            ...payload,
          })
        );
      }
      return Promise.all(promises).then((res) => {
        let list = flatten(
          res.reduce((init, item) => {
            if (Array.isArray(item?.data)) {
              let listPdfChild = item.data.map(
                (itemChild) => itemChild?.file?.pdf
              );
              init = [...init, ...listPdfChild];
              return init;
            }
            init = [...init, item?.data?.file?.pdf];
            return init;
          }, [])
        );
        if (list?.length > 0) {
          printProvider
            .printMergePdf(list)
            .then(() => {
              console.info("Print success");
            })
            .catch((err) => {
              console.error("Print fail", err);
            });
        }
        dispatch.tiepDon.resetData({});
        if (state.goiSo.quayTiepDonId)
          //n???u ??ang ch???n qu???y ti???p ????n th?? get nbTi???p Theo
          dispatch.goiSo.getNbTiepTheo({
            id: state.goiSo.quayTiepDonId,
            data: {
              nbTiepTheoId: nbTiepTheoId,
            },
            isLoadNguoiBenhTiepDon: true,
          });
        dispatch.tiepDonDichVu.updateData({
          listDvChoose: [],
        });
      });
    },
    getDsGoiDvChiTiet: (params) => {
      return new Promise((resolve, reject) => {
        nbGoiDvChiTietProvider
          .search(params)
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((x) => ({
                ...x,
                ten: x.tenDichVu,
                ma: x.maDichVu,
                id: undefined,
                nbGoiDvChiTietId: x.id,
              }));
              dispatch.tiepDonDichVu.updateData({ listDvKham: data });
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    postNbGoiDv: (params) => {
      return new Promise((resolve, reject) => {
        nbGoiDvProvider
          .post(params)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Th??m m???i th??nh c??ng g??i d???ch v??? cho ng?????i b???nh");
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    tongTien: (params) => {
      return new Promise((resolve, reject) => {
        nbDichVuProvider
          .tongTien(params)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.tiepDonDichVu.updateData({
                tienDieuTri: s.data,
              });
              resolve(s?.data);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
